"""The web server the detect-twilio recipe runs: Twilio's TwiML and status routes, and Detection's webhooks.

Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.

    GET  /health               liveness check
    POST /twilio/voice         Twilio asks for the call's TwiML when it is answered. Signed by Twilio.
    POST /webhooks/detection   Detection events for the call. Signed with the Detection key.
    POST /twilio/status        Twilio's status callback. Signed by Twilio.

Each route only verifies, dedupes, records and answers. None of them calls Twilio or
Drop Cowboy: the recipe reads what was recorded and acts on it from its own thread.
Serve `DetectionReceiver(...).app` the same way as the other receiver, for example with
`EmbeddedServer` from receiver.py.
"""
from __future__ import annotations

import threading
import time
from dataclasses import dataclass
from typing import Any, Callable, Dict, List, Optional, Set

from flask import Flask, Response, jsonify, request

from .detection import verify_detection_signature
from .output import say
from .receiver import _json_object, printable
from .twilio import verify_twilio_signature

MAX_BODY_BYTES = 1024 * 1024
VOICE_PATH = "/twilio/voice"
STATUS_PATH = "/twilio/status"
DETECTION_PATH = "/webhooks/detection"

DETECTION = "detection"
STATUS = "status"


@dataclass(frozen=True)
class RecordedEvent:
    """One accepted Detection webhook (`kind` "detection") or Twilio status (`kind` "status").

    `name` is the Detection event name, or the Twilio `CallStatus`. `received_at` is
    `time.monotonic()` when the route recorded it. `ignored` marks a Detection event for
    another `call_id`, which is never acted on.
    """

    kind: str
    name: str
    data: Dict[str, Any]
    received_at: float
    ignored: bool = False
    call_sid: str = ""


@dataclass
class Counts:
    """Detection webhooks accepted (including ignored ones), repeats answered as duplicates, and
    accepted ones for another call_id."""

    received: int = 0
    duplicates: int = 0
    ignored: int = 0


class DetectionReceiver:
    """Holds what the four routes received. Every field is guarded by one lock."""

    def __init__(
        self,
        public_url: str,
        auth_token: str,
        detection_key: str,
        call_id: str,
        voice_twiml: str,
        clock_ms: Optional[Callable[[], float]] = None,
        out: Callable[[str], None] = say,
    ) -> None:
        self.public_url = public_url
        self.call_id = call_id
        self._auth_token = auth_token
        self._detection_key = detection_key
        self._voice_twiml = voice_twiml
        self._clock_ms = clock_ms or (lambda: time.time() * 1000)
        self._out = out
        self._call_sid = ""
        self._events: List[RecordedEvent] = []
        self._seen_delivery_ids: Set[str] = set()
        self._counts = Counts()
        self._changed = threading.Condition()
        self.app = self._build_app()

    # What the recipe reads ----------------------------------------------------

    def expect_call(self, call_sid: str) -> None:
        """Accept /twilio/voice and statuses for this CallSid only. Set as soon as the call exists."""
        with self._changed:
            self._call_sid = call_sid
            self._changed.notify_all()

    @property
    def call_sid(self) -> str:
        with self._changed:
            return self._call_sid

    def events_since(self, index: int, timeout_seconds: float) -> List[RecordedEvent]:
        """Events recorded after position `index`, oldest first. Waits up to the timeout for one."""
        deadline = time.monotonic() + max(0.0, timeout_seconds)
        with self._changed:
            while len(self._events) <= index:
                remaining = deadline - time.monotonic()
                if remaining <= 0:
                    return []
                self._changed.wait(remaining)
            return list(self._events[index:])

    def received_events(self) -> List[RecordedEvent]:
        with self._changed:
            return list(self._events)

    def counts(self) -> Counts:
        with self._changed:
            return Counts(self._counts.received, self._counts.duplicates, self._counts.ignored)

    # Routes -------------------------------------------------------------------

    def _build_app(self) -> Flask:
        app = Flask(__name__)
        app.config["MAX_CONTENT_LENGTH"] = MAX_BODY_BYTES

        @app.get("/health")
        def health():
            return jsonify({"ok": True})

        @app.post(VOICE_PATH)
        def voice():
            return self._handle_voice()

        @app.post(DETECTION_PATH)
        def detection():
            return self._handle_detection()

        @app.post(STATUS_PATH)
        def status():
            return self._handle_status()

        return app

    def _handle_voice(self):
        if not self._twilio_signed(VOICE_PATH):
            return _empty(403)
        call_sid = request.form.get("CallSid", "")
        expected = self.call_sid
        if not expected or call_sid != expected:
            self._out("Refused TwiML for CallSid " + printable(call_sid) + ": not the call this run created.")
            return _empty(403)
        self._out("Twilio asked for the TwiML. Streaming the call audio to Detection.")
        return Response(self._voice_twiml, status=200, content_type="text/xml")

    def _handle_status(self):
        if not self._twilio_signed(STATUS_PATH):
            return _empty(403)
        call_sid = request.form.get("CallSid", "")
        status = request.form.get("CallStatus", "")
        expected = self.call_sid
        # Before the recipe learns its CallSid, keep the status with its CallSid; the recipe
        # filters on its own. After that, statuses for any other call are dropped.
        if status and (not expected or call_sid == expected):
            data = {"CallStatus": status}
            if request.form.get("CallDuration"):
                data["CallDuration"] = request.form.get("CallDuration")
            self._record(RecordedEvent(STATUS, status, data, time.monotonic(), call_sid=call_sid))
        return _empty(200)

    def _handle_detection(self):
        # Verify the raw bytes. Parsing the JSON and serializing it again can change
        # spacing or key order, and then no signature would match.
        raw_body = request.get_data()
        check = verify_detection_signature(
            raw_body,
            request.headers.get("X-Signature"),
            request.headers.get("X-Timestamp"),
            self._detection_key,
            now_ms=self._clock_ms(),
        )
        if not check.valid:
            return jsonify({"error": check.error}), 401

        event = _json_object(raw_body)
        if event is None:
            return jsonify({"error": "invalid_body"}), 400

        # Detection retries a delivery with the same id, so dedupe is required. An
        # in-memory set is enough here. In production use a database unique index.
        delivery_id = event.get("delivery_id") or request.headers.get("X-Delivery-Id")
        name = event.get("event") if isinstance(event.get("event"), str) else "unknown"
        data = event.get("data") if isinstance(event.get("data"), dict) else {}
        ignored = event.get("call_id") != self.call_id

        with self._changed:
            if delivery_id:
                if str(delivery_id) in self._seen_delivery_ids:
                    self._counts.duplicates += 1
                    return jsonify({"received": True, "duplicate": True})
                self._seen_delivery_ids.add(str(delivery_id))
            self._counts.received += 1
            if ignored:
                self._counts.ignored += 1
            self._events.append(RecordedEvent(DETECTION, name, data, time.monotonic(), ignored=ignored))
            self._changed.notify_all()

        if ignored:
            self._out("Ignored Detection " + printable(name) + " for call_id " + printable(event.get("call_id"))
                      + ": not this run's call_id.")
        return jsonify({"received": True})

    def _twilio_signed(self, path: str) -> bool:
        params = list(request.form.items(multi=True))
        valid = verify_twilio_signature(
            self.public_url + path, params, request.headers.get("X-Twilio-Signature"), self._auth_token
        )
        if not valid:
            self._out("Refused a request to " + path + ": the X-Twilio-Signature does not match. Check "
                      "TWILIO_AUTH_TOKEN and that DC_PUBLIC_URL is exactly the address Twilio calls.")
        return valid

    def _record(self, event: RecordedEvent) -> None:
        with self._changed:
            self._events.append(event)
            self._changed.notify_all()


def _empty(status: int) -> Response:
    return Response(b"", status=status)
