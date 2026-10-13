"""Call Twilio's REST API over plain HTTPS, and check Twilio's request signature.

Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.

No Twilio SDK: every request is `requests` with Basic auth and a form-encoded body,
the same way the Drop Cowboy examples call the Drop Cowboy API.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import time
from typing import Any, Callable, Dict, List, Mapping, Optional, Sequence, Tuple, Union

import requests

DEFAULT_TWILIO_BASE_URL = "https://api.twilio.com"
API_VERSION = "/2010-04-01"
TIMEOUT_SECONDS = 30
GET_TRIES = 3
MAX_RETRY_DELAY_SECONDS = 30.0
RETRYABLE_STATUSES = (429, 500, 502, 503, 504)

# Twilio answers 21220 when you update a call that has already ended.
CALL_NOT_IN_PROGRESS = 21220

TWILIO_HINTS = {
    21210: "TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.",
    21212: "TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.",
    21215: "Twilio's Voice geographic permissions block calls to this country. Enable it in the Twilio Console.",
    21219: "Trial accounts can call only verified numbers. Upgrade the Twilio account to run this recipe.",
    20003: "Twilio rejected TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN.",
}

FormPairs = List[Tuple[str, str]]
Params = Union[Mapping[str, str], Sequence[Tuple[str, str]]]


class TwilioError(Exception):
    """A non-2xx answer from Twilio, or a request that never got one (status 0).

    Twilio's error body is `{code, message, more_info, status}`. The request headers,
    and so the auth token, are never stored here.
    """

    def __init__(
        self,
        status: int,
        code: Optional[int] = None,
        message: Optional[str] = None,
        more_info: Optional[str] = None,
        retry_after: Optional[float] = None,
    ) -> None:
        self.status = status
        self.code = code
        self.message = message
        self.more_info = more_info
        self.retry_after = retry_after
        super().__init__(self.summary())

    @property
    def call_already_ended(self) -> bool:
        """True when an update was refused because the call is over: a 404, or Twilio code 21220."""
        return self.status == 404 or self.code == CALL_NOT_IN_PROGRESS

    def summary(self) -> str:
        parts = ["HTTP " + str(self.status) if self.status else "No response"]
        for label, value in (("code", self.code), ("message", self.message), ("more_info", self.more_info)):
            if value:
                parts.append(label + ": " + str(value))
        return " | ".join(parts)


class TwilioClient:
    """Plain HTTPS to Twilio with Basic auth `TWILIO_ACCOUNT_SID:TWILIO_AUTH_TOKEN`."""

    def __init__(
        self,
        account_sid: str,
        auth_token: str,
        base_url: str = DEFAULT_TWILIO_BASE_URL,
        timeout: float = TIMEOUT_SECONDS,
        session: Optional[requests.Session] = None,
        sleep: Callable[[float], None] = time.sleep,
    ) -> None:
        self.account_sid = account_sid
        self._auth = (account_sid, auth_token)
        self._auth_token = auth_token
        self._base_url = base_url.rstrip("/")
        self._timeout = timeout
        self._session = session or requests.Session()
        self._sleep = sleep

    # Routes the recipe uses -------------------------------------------------

    def get_account(self) -> Dict[str, Any]:
        return self.get(self._account_path() + ".json")

    def incoming_numbers(self, phone_number: str) -> List[Dict[str, Any]]:
        body = self.get(self._account_path() + "/IncomingPhoneNumbers.json", {"PhoneNumber": phone_number})
        return _list(body, "incoming_phone_numbers")

    def outgoing_caller_ids(self, phone_number: str) -> List[Dict[str, Any]]:
        body = self.get(self._account_path() + "/OutgoingCallerIds.json", {"PhoneNumber": phone_number})
        return _list(body, "outgoing_caller_ids")

    def create_call(self, form: FormPairs) -> Dict[str, Any]:
        """Place the call. Never retried: a retry could place a second call."""
        return self.post(self._account_path() + "/Calls.json", form)

    def update_call(self, call_sid: str, form: FormPairs) -> Dict[str, Any]:
        """Redirect a live call with new TwiML, or end it with Status=completed."""
        return self.post(self._account_path() + "/Calls/" + call_sid + ".json", form)

    # HTTP -------------------------------------------------------------------

    def get(self, path: str, params: Optional[Dict[str, str]] = None) -> Any:
        """GET and parse the JSON answer. Retries 429 and 5xx, because reads are safe to repeat."""
        for attempt in range(1, GET_TRIES + 1):
            try:
                return self._send("GET", path, params=params)
            except TwilioError as error:
                if error.status not in RETRYABLE_STATUSES or attempt == GET_TRIES:
                    raise
                self._sleep(_retry_delay(error, attempt))
        raise AssertionError("unreachable")

    def post(self, path: str, form: FormPairs) -> Any:
        """POST a form once. A write is never retried here."""
        return self._send("POST", path, form=form)

    def _account_path(self) -> str:
        return API_VERSION + "/Accounts/" + self.account_sid

    def _send(
        self,
        method: str,
        path: str,
        params: Optional[Dict[str, str]] = None,
        form: Optional[FormPairs] = None,
    ) -> Any:
        try:
            response = self._session.request(
                method,
                self._base_url + path,
                params=params,
                data=form,
                auth=self._auth,
                headers={"Accept": "application/json"},
                timeout=self._timeout,
                allow_redirects=False,
            )
        except requests.RequestException as exc:
            raise TwilioError(0, message="Network error: " + type(exc).__name__) from None

        parsed = _parse_body(response)
        if not 200 <= response.status_code < 300:
            code = parsed.get("code") if isinstance(parsed.get("code"), int) else None
            raise TwilioError(
                response.status_code,
                code=code,
                message=self._redact(_text(parsed, "message")),
                more_info=self._redact(_text(parsed, "more_info")),
                retry_after=_seconds(response.headers.get("Retry-After")),
            )
        return parsed

    def _redact(self, text: Optional[str]) -> Optional[str]:
        """Twilio's messages can quote the request URL, which holds the Account SID. Show its last 4 only."""
        if not text:
            return text
        if self._auth_token:
            text = text.replace(self._auth_token, "[redacted]")
        if self.account_sid:
            text = text.replace(self.account_sid, "..." + self.account_sid[-4:])
        return text


def twilio_hint(code: Optional[int]) -> Optional[str]:
    return TWILIO_HINTS.get(code) if code is not None else None


def twilio_signature(url: str, params: Params, auth_token: str) -> str:
    """The X-Twilio-Signature Twilio sends: base64 of HMAC-SHA1 over the URL and the sorted parameters.

    Each parameter adds its name and then its value, with nothing between them. Names
    are sorted in byte order. A name sent more than once adds each value, in the order
    received (the sort is stable, so equal names keep that order).
    """
    pairs = list(params.items()) if isinstance(params, Mapping) else list(params)
    pairs.sort(key=lambda pair: pair[0].encode("utf-8"))
    data = url
    for name, value in pairs:
        data += name + value
    digest = hmac.new(auth_token.encode("utf-8"), data.encode("utf-8"), hashlib.sha1).digest()
    return base64.b64encode(digest).decode("ascii")


def verify_twilio_signature(url: str, params: Params, signature: Optional[str], auth_token: str) -> bool:
    """Check X-Twilio-Signature. `url` must be the public URL Twilio requested, not the local one.

    A tunnel rewrites the Host header, so rebuilding the URL from the request would
    never match. Compare against DC_PUBLIC_URL plus the route path.
    """
    if not signature or not auth_token:
        return False
    expected = twilio_signature(url, params, auth_token)
    return hmac.compare_digest(signature.encode("utf-8"), expected.encode("ascii"))


def _list(body: Any, key: str) -> List[Dict[str, Any]]:
    value = body.get(key) if isinstance(body, dict) else None
    return value if isinstance(value, list) else []


def _parse_body(response: requests.Response) -> Dict[str, Any]:
    if not response.content:
        return {}
    try:
        parsed = response.json()
    except ValueError:
        return {"message": response.text[:200]}
    return parsed if isinstance(parsed, dict) else {}


def _retry_delay(error: TwilioError, attempt: int) -> float:
    """Honor Retry-After when Twilio sends one, else back off 1s, 2s, 4s."""
    if error.retry_after is not None:
        return min(error.retry_after, MAX_RETRY_DELAY_SECONDS)
    return min(2.0 ** (attempt - 1), MAX_RETRY_DELAY_SECONDS)


def _seconds(header: Optional[str]) -> Optional[float]:
    if header is None:
        return None
    try:
        return max(0.0, float(header))
    except ValueError:
        return None


def _text(body: Mapping[str, Any], key: str) -> Optional[str]:
    value = body.get(key)
    return value if isinstance(value, str) and value else None
