"""A small HTTP client for the Drop Cowboy v2 API.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import time
from typing import Any, Callable, Dict, Optional

import requests

from .config import DEFAULT_BASE_URL

TIMEOUT_SECONDS = 30
GET_TRIES = 3
MAX_RETRY_DELAY_SECONDS = 30.0
RETRYABLE_STATUSES = (429, 500, 502, 503, 504)


class DcError(Exception):
    """A non-2xx answer, or a request that never got one (status 0).

    Only the status, the problem details and the request id are kept. The
    request headers are never stored, so printing an error cannot leak a key.
    """

    def __init__(
        self,
        status: int,
        body: Any = None,
        request_id: Optional[str] = None,
        retry_after: Optional[float] = None,
    ) -> None:
        self.status = status
        self.body = body
        self.request_id = _request_id_from_body(body) or request_id
        self.retry_after = retry_after
        super().__init__(self.summary())

    @property
    def title(self) -> Optional[str]:
        return _text(self.body, "title") or _text(self.body, "message")

    @property
    def detail(self) -> Optional[str]:
        return _text(self.body, "detail") or _text(self.body, "error")

    @property
    def code(self) -> Optional[str]:
        """A stable reason such as byoc_required, from the body or the error type."""
        if not isinstance(self.body, dict):
            return None
        details = self.body.get("details")
        for candidate in (self.body.get("code"), details.get("code") if isinstance(details, dict) else None):
            if isinstance(candidate, str) and candidate:
                return candidate
        error_type = self.body.get("type")
        if isinstance(error_type, str) and "/errors/" in error_type:
            return error_type.rsplit("/", 1)[-1]
        return None

    def summary(self) -> str:
        parts = ["HTTP " + str(self.status) if self.status else "No response"]
        for label, value in (("title", self.title), ("detail", self.detail), ("code", self.code),
                             ("request id", self.request_id)):
            if value:
                parts.append(label + ": " + value)
        return " | ".join(parts)


class DcClient:
    """Plain HTTP with `x-key` and `x-secret`. No SDK."""

    def __init__(
        self,
        key: str,
        secret: str,
        base_url: str = DEFAULT_BASE_URL,
        timeout: float = TIMEOUT_SECONDS,
        session: Optional[requests.Session] = None,
        sleep: Callable[[float], None] = time.sleep,
    ) -> None:
        self._base_url = base_url.rstrip("/")
        self._headers = {
            "x-key": key,
            "x-secret": secret,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        self._timeout = timeout
        self._session = session or requests.Session()
        self._sleep = sleep

    def get(self, path: str, params: Optional[Dict[str, str]] = None) -> Any:
        """GET and parse the JSON answer. Retries 429 and 5xx, because reads are safe to repeat."""
        for attempt in range(1, GET_TRIES + 1):
            try:
                return self._send("GET", path, params=params)
            except DcError as error:
                if error.status not in RETRYABLE_STATUSES or attempt == GET_TRIES:
                    raise
                self._sleep(_retry_delay(error, attempt))
        raise AssertionError("unreachable")

    def post(self, path: str, body: Dict[str, Any], idempotency_key: Optional[str] = None) -> Any:
        """POST JSON once. A write is never retried here: a retry could send twice.

        To retry a send safely, call again with the same `idempotency_key` and the same body.
        """
        headers = {"Idempotency-Key": idempotency_key} if idempotency_key else None
        return self._send("POST", path, json_body=body, extra_headers=headers)

    def put(self, path: str, body: Dict[str, Any]) -> Any:
        """PUT JSON once and parse the JSON answer. Like any write, it is never retried here."""
        return self._send("PUT", path, json_body=body)

    def delete(self, path: str) -> Any:
        """DELETE once and parse the JSON answer. Like a write, it is never retried here."""
        return self._send("DELETE", path)

    def _send(
        self,
        method: str,
        path: str,
        params: Optional[Dict[str, str]] = None,
        json_body: Optional[Dict[str, Any]] = None,
        extra_headers: Optional[Dict[str, str]] = None,
    ) -> Any:
        headers = dict(self._headers)
        if extra_headers:
            headers.update(extra_headers)
        try:
            response = self._session.request(
                method,
                self._base_url + path,
                params=params,
                json=json_body,
                headers=headers,
                timeout=self._timeout,
                allow_redirects=False,
            )
        except requests.RequestException as exc:
            raise DcError(0, {"title": "Network error", "detail": type(exc).__name__}) from None

        parsed = _parse_body(response)
        if not 200 <= response.status_code < 300:
            raise DcError(
                response.status_code,
                parsed,
                request_id=response.headers.get("x-request-id"),
                retry_after=_seconds(response.headers.get("Retry-After")),
            )
        return parsed


def _parse_body(response: requests.Response) -> Any:
    if not response.content:
        return {}
    try:
        return response.json()
    except ValueError:
        return {"detail": response.text[:200]}


def _retry_delay(error: DcError, attempt: int) -> float:
    """Honor Retry-After when the server sends one, else back off 1s, 2s, 4s."""
    if error.retry_after is not None:
        return min(error.retry_after, MAX_RETRY_DELAY_SECONDS)
    return min(2.0 ** (attempt - 1), MAX_RETRY_DELAY_SECONDS)


def _seconds(header: Optional[str]) -> Optional[float]:
    """Retry-After as a number of seconds. A date form is ignored and the backoff applies."""
    if header is None:
        return None
    try:
        return max(0.0, float(header))
    except ValueError:
        return None


def _text(body: Any, key: str) -> Optional[str]:
    if isinstance(body, dict):
        value = body.get(key)
        if isinstance(value, str) and value:
            return value
    return None


def _request_id_from_body(body: Any) -> Optional[str]:
    if not isinstance(body, dict):
        return None
    meta = body.get("meta")
    if isinstance(meta, dict) and isinstance(meta.get("request_id"), str):
        return meta["request_id"]
    value = body.get("request_id")
    return value if isinstance(value, str) else None
