"""Post a sample result to your endpoints the way Drop Cowboy does, and explain the answer.

Send only to people who agreed to hear from you. Test with numbers you own.

Run: python check_receiver.py <callback-url> [webhook-url]

Nothing is sent to the API, and no API key is needed.

- callback: an unsigned sample callback body. Drop Cowboy tries a callback once and
  waits 10 seconds.
- webhook: a sample contact.rvm.status event, signed with the first secret in
  DC_WEBHOOK_SECRET and a fresh timestamp. Drop Cowboy waits 5 seconds, and
  retries only 408, 429, 5xx and timeouts.

Any answer other than 2xx means a real result would be lost or dropped, and a 404 is
never retried. Settings > API Logs shows what your endpoint answered for real sends.
"""
from __future__ import annotations

import copy
import ipaddress
import json
import sys
import time
import uuid
from dataclasses import dataclass
from typing import Any, Callable, Dict, List, Optional
from urllib.parse import urlsplit

import requests

from dropcowboy_examples.config import Config, ConfigError, last4, load_config
from dropcowboy_examples.hints import API_LOGS_HINT
from dropcowboy_examples.output import say
from dropcowboy_examples.samples import is_sample_value, sample_message
from dropcowboy_examples.verify import sign

CALLBACK_TIMEOUT_SECONDS = 10.0
WEBHOOK_TIMEOUT_SECONDS = 5.0
WEB_API_NO_ACTION = "No action was found on the controller"
MAX_BODY_CHARACTERS = 4000

# The same bodies as ../fixtures/callback.rvm-success.json and
# ../fixtures/webhook.rvm-status.json (a test keeps them in step).
SAMPLE_CALLBACK: Dict[str, Any] = {
    "drop_id": "b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52",
    "team_id": "3f6c2a1e-8b4d-4c7a-9e2f-5a1b3c4d6e7f",
    "session_id": "6b2e9d4a-8f1c-4a7e-9d3b-5c8f2a6e1d47",
    "log_id": "2f8c4a6e-1b9d-4e3f-a7c5-8d2b6f4e9a13",
    "contact_id": "5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d",
    "phone_number": "+13125550142",
    "caller_id": "+12125550100",
    "product_code": "rvm",
    "status": "success",
    "reason": "",
    "reason_code": 0,
    "quantity": 1,
    "product_cost": 0.04,
    "compliance_fee": 0,
    "tts_fee": 0,
    "dnc": False,
    "attempt_date": "2026-03-20T15:04:05.000Z",
    "foreign_id": "7c1e5a93-2d4b-4f68-a0b9-3e6d8c1f5a27",
    "proof_of_delivery_url": "https://api-v2.dropcowboy.com/campaign/public/receipts/"
                             "i9aI2nYpHEzKX0vysXph0ZGIYphbAduqA2PRRge0ICQ",
}

SAMPLE_WEBHOOK: Dict[str, Any] = {
    "event_id": "2694f968-93fd-44ca-9b92-2110ed1ee61e",
    "event": "contact.rvm.status",
    "event_at": 1774041912000,
    "data": {
        "team_id": "3f6c2a1e-8b4d-4c7a-9e2f-5a1b3c4d6e7f",
        "contact_id": "5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d",
        "drop_id": "b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52",
        "campaign_id": None,
        "campaign_type": "rvm",
        "status": "success",
        "reason": "",
        "reason_code": 0,
        "to": "+13125550142",
        "from": "+12125550100",
    },
}

Output = Callable[[str], None]


@dataclass
class Verdict:
    verdict: str
    ok: bool
    explanation: str


@dataclass
class CheckResult:
    kind: str
    url: str
    status: Optional[int]
    elapsed_ms: int
    verdict: str
    ok: bool


def check_receiver(
    config: Config,
    callback_url: str,
    webhook_url: Optional[str] = None,
    out: Output = say,
    session: Optional[requests.Session] = None,
    callback_timeout: float = CALLBACK_TIMEOUT_SECONDS,
    webhook_timeout: float = WEBHOOK_TIMEOUT_SECONDS,
) -> List[CheckResult]:
    """Post the sample callback (and the signed sample webhook). Returns one result per URL."""
    _check_url("callback-url", callback_url)
    if webhook_url:
        _check_url("webhook-url", webhook_url)
    secret = _webhook_secret(config) if webhook_url else ""

    urls = [callback_url] + ([webhook_url] if webhook_url else [])
    for url in urls:
        if not is_public_https(url):
            out("Note: " + url + " is not a public https:// address. Drop Cowboy only calls public HTTPS URLs, "
                "so this checks your code, not your setup.")

    http = session or requests.Session()
    results = [_check_one(http, "callback", callback_url, json.dumps(SAMPLE_CALLBACK).encode("utf-8"),
                          {"Content-Type": "application/json"}, callback_timeout, out)]
    if webhook_url:
        raw_body = _fresh_webhook_body()
        timestamp = str(int(time.time()))
        out("Signing the webhook with the secret ending in " + last4(secret))
        headers = {
            "Content-Type": "application/json",
            "X-Signature": sign(secret, timestamp, raw_body),
            "X-Timestamp": timestamp,
            "X-Signature-Version": "v1",
            "X-Event-Id": json.loads(raw_body)["event_id"],
            "X-Attempt": "1",
        }
        results.append(_check_one(http, "webhook", webhook_url, raw_body, headers, webhook_timeout, out))

    if all(result.ok for result in results):
        out("All checks passed.")
    else:
        out("Some checks failed. " + API_LOGS_HINT)
    return results


def classify(
    kind: str,
    url: str,
    status: Optional[int],
    elapsed_ms: int,
    timed_out: bool,
    network_error: Optional[str],
    timeout_seconds: float,
    body: str = "",
) -> Verdict:
    """One of ok, route, auth, slow, unreachable, rejected, with what it means."""
    seconds = int(round(timeout_seconds))
    if timed_out or (status is not None and elapsed_ms > timeout_seconds * 1000):
        retry = ("A callback is tried once, so a slow answer loses the result." if kind == "callback"
                 else "A webhook that times out is retried, at most 3 attempts in all, then dropped.")
        return Verdict("slow", False, "Too slow: Drop Cowboy stops waiting after " + str(seconds) + " seconds. "
                       + retry + " Answer 2xx first, then do the work.")
    if network_error:
        return Verdict("unreachable", False, "Could not connect (" + network_error + "). Check the server or tunnel "
                       "is running, the host is public, and the URL is right.")
    if status is not None and 200 <= status < 300:
        return Verdict("ok", True, "OK: your endpoint accepted the " + kind + ".")
    if status in (404, 405):
        explanation = ("The route or the verb is wrong (" + str(status) + "). The endpoint must accept POST at "
                       "exactly this path: " + (urlsplit(url).path or "/") + ". " + _loss(kind, status))
        if WEB_API_NO_ACTION in body:
            explanation += (" This is ASP.NET Web API saying no action matches: mark the method [HttpPost] with "
                            "[Route(\"...\")] for this exact path, and call config.MapHttpAttributeRoutes(). "
                            "See the C# README.")
        return Verdict("route", False, explanation)
    if status in (401, 403):
        if kind == "webhook":
            why = ("The signature check is failing. Compute HMAC-SHA256 of X-Timestamp + \".\" + the raw body with "
                   "the signing secret of this webhook, compare it with X-Signature in constant time, and do "
                   "it before you parse the JSON. Check DC_WEBHOOK_SECRET is that secret.")
        else:
            why = ("Callbacks carry no signature and no credentials, so an endpoint that asks for authentication "
                   "refuses every callback. Let this path through without authentication, and treat the body as "
                   "a hint.")
        return Verdict("auth", False, why + " (" + str(status) + ") " + _loss(kind, status))
    return Verdict("rejected", False, "Your endpoint answered " + str(status) + ", which is not 2xx. "
                   + _loss(kind, status))


def is_public_https(url: str) -> bool:
    parts = urlsplit(url)
    if parts.scheme != "https" or not parts.hostname:
        return False
    host = parts.hostname.lower()
    if host == "localhost" or host.endswith(".local"):
        return False
    try:
        address = ipaddress.ip_address(host)
    except ValueError:
        return True
    return not (address.is_private or address.is_loopback or address.is_link_local)


def _loss(kind: str, status: Optional[int]) -> str:
    if kind == "webhook" and status is not None and (status in (408, 429) or status >= 500):
        return "A webhook answered with " + str(status) + " is retried, at most 3 attempts in all, then dropped."
    if kind == "webhook":
        return "A webhook answered with " + str(status) + " is not retried, so the event is lost."
    return "A callback is not retried, so that result is lost."


def _check_one(
    http: requests.Session,
    kind: str,
    url: str,
    raw_body: bytes,
    headers: Dict[str, str],
    timeout_seconds: float,
    out: Output,
) -> CheckResult:
    """One POST, no retries and no redirects, like Drop Cowboy."""
    started = time.monotonic()
    status: Optional[int] = None
    body = ""
    timed_out = False
    network_error: Optional[str] = None
    try:
        response = http.post(url, data=raw_body, headers=headers, timeout=timeout_seconds, allow_redirects=False)
        status = response.status_code
        body = response.text[:MAX_BODY_CHARACTERS]
    except requests.Timeout:
        timed_out = True
    except requests.RequestException as exc:
        network_error = type(exc).__name__
    elapsed_ms = int((time.monotonic() - started) * 1000)

    verdict = classify(kind, url, status, elapsed_ms, timed_out, network_error, timeout_seconds, body)
    shown = str(status) if status is not None else ("no answer (timeout)" if timed_out else "no answer")
    out(kind + " " + url)
    out("  answered: " + shown + " in " + str(elapsed_ms) + " ms")
    out("  " + verdict.explanation)
    return CheckResult(kind, url, status, elapsed_ms, verdict.verdict, verdict.ok)


def _fresh_webhook_body() -> bytes:
    """A fresh event_id and event_at, so a receiver that drops repeated event ids still handles this one."""
    body = copy.deepcopy(SAMPLE_WEBHOOK)
    body["event_id"] = str(uuid.uuid4())
    body["event_at"] = int(time.time() * 1000)
    return json.dumps(body).encode("utf-8")


def _webhook_secret(config: Config) -> str:
    secret = config.signing_secrets[0] if config.signing_secrets else ""
    if not secret:
        raise ConfigError("Set DC_WEBHOOK_SECRET to the signing secret of your webhook, so the sample "
                          "webhook is signed the way your endpoint expects.")
    return secret


def _check_url(name: str, value: str) -> None:
    parts = urlsplit(value)
    if parts.scheme not in ("http", "https") or not parts.netloc:
        raise ConfigError(name + " must be a full http:// or https:// URL, for example "
                          "https://abc123.example.com/callbacks/dropcowboy")
    if is_sample_value(value):
        raise ConfigError(sample_message(name, value))


def main(argv: Optional[List[str]] = None) -> int:
    args = sys.argv[1:] if argv is None else argv
    if not args or len(args) > 2:
        print("Usage: python check_receiver.py <callback-url> [webhook-url]", file=sys.stderr)
        return 1
    try:
        config = load_config()
        results = check_receiver(config, args[0], args[1] if len(args) > 1 else None)
    except ConfigError as error:
        print("Setup problem: " + str(error), file=sys.stderr)
        return 1
    return 0 if all(result.ok for result in results) else 1


if __name__ == "__main__":
    sys.exit(main())
