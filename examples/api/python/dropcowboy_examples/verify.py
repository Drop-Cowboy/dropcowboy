"""Verify the signature on a Drop Cowboy webhook delivery.

Send only to people who agreed to hear from you. Test with numbers you own.

The signature is HMAC-SHA256 over `timestamp + "." + raw body`, keyed with the
signing secret of the webhook, sent as `X-Signature: sha256=<hex>`.
"""
from __future__ import annotations

import hashlib
import hmac
import re
import time
from typing import NamedTuple, Optional, Sequence

TOLERANCE_SECONDS = 300
SIGNATURE_PREFIX = "sha256="
SUPPORTED_VERSION = "v1"

MISSING_SIGNATURE = "missing_signature"
STALE_TIMESTAMP = "stale_timestamp"
INVALID_SIGNATURE = "invalid_signature"

_DIGITS = re.compile(r"[0-9]+")


class Verification(NamedTuple):
    valid: bool
    error: Optional[str] = None


def verify_signature(
    raw_body: bytes,
    signature: Optional[str],
    timestamp: Optional[str],
    secrets: Sequence[str],
    version: Optional[str] = None,
    now: Optional[float] = None,
) -> Verification:
    """Check one delivery against every configured signing secret.

    `raw_body` must be the exact bytes that arrived. Parsing the JSON and
    serializing it again can change spacing or key order, and then no
    signature matches. `now` is in seconds and exists so tests can pin the clock.

    There is one secret per webhook, and this receiver can serve several
    webhooks, so the delivery is accepted when any secret matches.
    """
    if not signature or not timestamp:
        return Verification(False, MISSING_SIGNATURE)

    if not _DIGITS.fullmatch(timestamp):
        return Verification(False, STALE_TIMESTAMP)
    current = time.time() if now is None else now
    if abs(current - int(timestamp)) > TOLERANCE_SECONDS:
        return Verification(False, STALE_TIMESTAMP)

    if version is not None and version != SUPPORTED_VERSION:
        return Verification(False, INVALID_SIGNATURE)
    if not signature.startswith(SIGNATURE_PREFIX):
        return Verification(False, INVALID_SIGNATURE)

    signed_payload = timestamp.encode("ascii") + b"." + raw_body
    provided = signature.encode("utf-8")
    matched = False
    for secret in secrets:
        digest = hmac.new(secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
        expected = (SIGNATURE_PREFIX + digest).encode("ascii")
        # compare_digest takes the same time however many leading bytes match.
        if hmac.compare_digest(provided, expected):
            matched = True
    if not matched:
        return Verification(False, INVALID_SIGNATURE)
    return Verification(True)


def sign(secret: str, timestamp: str, raw_body: bytes) -> str:
    """The X-Signature value Drop Cowboy sends: sha256= and the hex HMAC of timestamp.raw_body."""
    signed_payload = timestamp.encode("ascii") + b"." + raw_body
    return SIGNATURE_PREFIX + hmac.new(secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
