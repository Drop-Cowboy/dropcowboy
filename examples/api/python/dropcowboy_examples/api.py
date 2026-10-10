"""One function per API route the examples call.

Send only to people who agreed to hear from you. Test with numbers you own.

Responses are wrapped as `{"data": ..., "meta": {"request_id": ...}}`. The one
exception is `POST /rvm`, which answers `202 {"status": "queued", "message_id": ...}`.
"""
from __future__ import annotations

import time
import uuid
from typing import Any, Callable, Dict, List, Optional

from .client import DcClient

IMPORT_POLL_SECONDS = 2.0
IMPORT_MAX_POLLS = 30


def data_of(body: Any) -> Any:
    """The `data` member of a wrapped response, or None."""
    return body.get("data") if isinstance(body, dict) else None


# Phone lines -----------------------------------------------------------------

def default_phone_line_id(client: DcClient) -> Optional[str]:
    """The account's default voice line, if it has one."""
    for line in _list(client.get("/phone/public/lines", params={"type": "voice"})):
        # The OpenAPI schema names this field `default`; the phone service stores `is_default`.
        if line.get("default") is True or line.get("is_default") is True:
            return line.get("ivr_id")
    return None


def find_phone_line(client: DcClient, name: str) -> Optional[Dict[str, Any]]:
    """The voice line whose name matches exactly. `search_term` alone is a contains-match."""
    body = client.get("/phone/public/lines", params={"search_term": name, "type": "voice"})
    for line in _list(body):
        if line.get("name") == name and line.get("type", "voice") == "voice":
            return line
    return None


def create_phone_line(client: DcClient, name: str) -> Dict[str, Any]:
    """Create a voice line. Its `ivr_id` is the `phone_line_id` you send with."""
    body = client.post("/phone/public/lines", {"name": name, "type": "voice"})
    return data_of(body) or {}


def list_line_numbers(client: DcClient, line_id: str) -> List[Dict[str, Any]]:
    return _list(client.get("/phone/public/lines/" + line_id + "/numbers"))


# Numbers ---------------------------------------------------------------------

def import_numbers(client: DcClient, numbers: List[str], line_id: str) -> str:
    """Start loading numbers you own onto a line. Returns the job id to poll."""
    body = client.post("/phone/public/numbers/import", {"phone_numbers": numbers, "phone_line_id": line_id})
    return data_of(body)["long_job_id"]


def wait_for_import(
    client: DcClient,
    job_id: str,
    poll_seconds: float = IMPORT_POLL_SECONDS,
    max_polls: int = IMPORT_MAX_POLLS,
    sleep: Callable[[float], None] = time.sleep,
) -> Dict[str, Any]:
    """Poll until the import is `completed` or `failed`, for about a minute by default.

    Raises TimeoutError if the job is still running after the last poll.
    """
    for _ in range(max_polls):
        job = data_of(client.get("/phone/public/numbers/import/" + job_id)) or {}
        if job.get("status") in ("completed", "failed"):
            return job
        sleep(poll_seconds)
    raise TimeoutError("Import " + job_id + " is still running. Check it again later.")


def search_available_numbers(client: DcClient, area_code: str, limit: int = 3) -> List[Dict[str, Any]]:
    body = client.post(
        "/phone/public/numbers/available",
        {"country_iso": "US", "pattern": area_code, "type": "local", "limit": limit},
    )
    return _list(body)


def rent_numbers(client: DcClient, numbers: List[str], line_id: str) -> List[str]:
    body = client.post("/phone/public/numbers/rent", {"numbers": numbers, "voice_ivr_id": line_id})
    return (data_of(body) or {}).get("numbers", numbers)


# Audio -----------------------------------------------------------------------

def first_media_id(client: DcClient) -> Optional[str]:
    body = client.get("/media/public/media", params={"limit": "10"})
    medias = (data_of(body) or {}).get("medias") or []
    return medias[0].get("media_id") if medias else None


def create_media_for_upload(client: DcClient, name: str) -> Dict[str, Any]:
    """Create a media file to upload into. Answers with its `media_id` and, in `upload`, one
    signed URL per format: `{"mp3": {"url", "content_type"}, "wav": {...}}`."""
    body = client.post("/media/public/media", {"name": name, "type": "rvm", "signed_upload": True})
    return data_of(body) or {}


def complete_media(client: DcClient, media_id: str) -> Dict[str, Any]:
    """Mark an upload finished. Until then the file cannot be sent."""
    return data_of(client.post("/media/public/media/" + media_id + "/complete", {})) or {}


def import_media(client: DcClient, name: str, url: str, ext: str) -> Dict[str, Any]:
    """Fetch a file from a public URL into your media library. It is ready when this returns."""
    body = client.post("/media/public/media", {"name": name, "type": "rvm", "url": url, "ext": ext})
    return data_of(body) or {}


def first_ready_voice_id(client: DcClient) -> Optional[str]:
    body = client.get("/voice/public/voices")
    for voice in (data_of(body) or {}).get("voices") or []:
        if voice.get("status") == "ready":
            return voice.get("voice_id")
    return None


def synthesize_preview(client: DcClient, voice_id: str, text: str) -> Dict[str, Any]:
    """Speak `text` once so you can listen before sending. Billed per character."""
    body = client.post("/voice/public/tts/synthesize", {"voice_id": voice_id, "text": text})
    return data_of(body) or {}


# Carrier ---------------------------------------------------------------------

def byoc_connected(client: DcClient) -> bool:
    return bool((data_of(client.get("/integration/public/byoc")) or {}).get("connected"))


# Sends and webhooks ----------------------------------------------------------

def send_rvm(client: DcClient, body: Dict[str, Any], idempotency_key: Optional[str] = None) -> Dict[str, Any]:
    """Queue one ringless voicemail. A `202` means received, not sent: wait for the result.

    The key makes a retry of the same request safe, so a timeout or a 5xx can be retried
    with the same key and body without sending twice.
    """
    key = idempotency_key or str(uuid.uuid4())
    return client.post("/rvm", body, idempotency_key=key)


def create_webhook(client: DcClient, event_types: List[str], hook_url: str) -> Dict[str, Any]:
    """Create one webhook: a URL, the event types it receives and its own signing secret.

    An account holds any number of webhooks; creating one never replaces another. The
    answer carries the `webhook_id` and, only this once, the `signing_secret`."""
    body = client.post("/register/public/webhooks", {"hook_url": hook_url, "event_types": event_types})
    return data_of(body) or {}


def list_webhooks(client: DcClient) -> List[Dict[str, Any]]:
    """Every webhook on the account, without signing secrets."""
    return _list(client.get("/register/public/webhooks"))


def update_webhook(client: DcClient, webhook_id: str, changes: Dict[str, Any]) -> Dict[str, Any]:
    """Change one webhook. Send only what changes: `hook_url`, `event_types` (replaces the whole
    set) and `name`; at least one is required. The `webhook_id` and the signing secret stay
    the same, and the answer never carries the secret."""
    body = client.put("/register/public/webhooks/" + webhook_id, changes)
    return data_of(body) or {}


def delete_webhook(client: DcClient, webhook_id: str) -> None:
    """Delete one webhook by its `webhook_id`. No other webhook is touched."""
    client.delete("/register/public/webhooks/" + webhook_id)


def rotate_webhook_secret(client: DcClient, webhook_id: str) -> Dict[str, Any]:
    """Issue a new signing secret for one webhook. Deliveries are signed with it from now on."""
    body = client.post("/register/public/webhooks/" + webhook_id + "/rotate-secret", {})
    return data_of(body) or {}


def webhook_signing_secrets(client: DcClient) -> List[str]:
    """One secret per webhook: each entry is `{webhook_id, event_types, hook_type, signing_secret}`."""
    body = client.get("/register/public/account/webhook-signing-secret")
    return [entry["signing_secret"] for entry in _list(body) if entry.get("signing_secret")]


def _list(body: Any) -> List[Dict[str, Any]]:
    data = data_of(body)
    return data if isinstance(data, list) else []
