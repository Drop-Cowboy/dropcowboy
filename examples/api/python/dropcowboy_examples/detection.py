"""Detection on a Twilio call: verify Detection webhooks, build the TwiML, decide what to do.

Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.

A Detection webhook is signed with the Detection API key:
`X-Signature: v1=hmac-sha256,<hex>` where the hex is HMAC-SHA256 over
`X-Timestamp + "." + raw body`, and `X-Timestamp` is in milliseconds.
"""
from __future__ import annotations

import hashlib
import hmac
import re
import time
from typing import Any, Callable, Dict, NamedTuple, Optional, Tuple

from .receiver import printable
from .verify import INVALID_SIGNATURE, MISSING_SIGNATURE, STALE_TIMESTAMP, Verification

TOLERANCE_MS = 300000
SIGNATURE_SCHEME = "v1=hmac-sha256"
WEBHOOK_EVENTS = "detection,beep,screening,timeout,error,close"
STREAM_NAME = "detection"

TERMINAL_STATUSES = ("completed", "busy", "no-answer", "failed", "canceled")
NOT_ANSWERED_STATUSES = ("busy", "no-answer", "failed", "canceled")

# Verdict `type` values Detection sends.
HUMAN_PREFIX = "speech.human."
VOICEMAIL_GREETING = "speech.voicemail.greeting"
VOICEMAIL_UNAVAILABLE_TYPES = ("speech.voicemail.full", "speech.voicemail.not_setup")
SILENCE = "speech.silence"

# Outcomes printed in the summary.
VOICEMAIL_ON_BEEP = "voicemail_on_beep"
VOICEMAIL_NO_BEEP = "voicemail_no_beep"
VOICEMAIL_UNAVAILABLE = "voicemail_unavailable"
LIVE_PERSON = "live_person"
NO_ANSWER_DETECTED = "no_answer_detected"
DETECTION_ERROR = "detection_error"
NOT_ANSWERED = "not_answered"
ENDED_BEFORE_ACTION = "ended_before_action"
NO_RESULT = "no_result"

# What the recipe does to the call.
PLAY_VOICEMAIL = "play_voicemail"
PLAY_LIVE = "play_live"
HANG_UP = "hang_up"
NOTHING = "nothing"

_DIGITS = re.compile(r"[0-9]+")
_XML_ESCAPES = (("&", "&amp;"), ("<", "&lt;"), (">", "&gt;"), ('"', "&quot;"), ("'", "&apos;"))

Output = Callable[[str], None]


def verify_detection_signature(
    raw_body: bytes,
    signature: Optional[str],
    timestamp_ms: Optional[str],
    detection_key: str,
    now_ms: Optional[float] = None,
) -> Verification:
    """Check one Detection delivery. `raw_body` must be the exact bytes that arrived.

    `now_ms` is in milliseconds and exists so tests can pin the clock.
    """
    if not signature or not timestamp_ms:
        return Verification(False, MISSING_SIGNATURE)

    if not _DIGITS.fullmatch(timestamp_ms):
        return Verification(False, STALE_TIMESTAMP)
    current = time.time() * 1000 if now_ms is None else now_ms
    if abs(current - int(timestamp_ms)) > TOLERANCE_MS:
        return Verification(False, STALE_TIMESTAMP)

    items = signature.split(",")
    if items[0] != SIGNATURE_SCHEME or len(items) < 2:
        return Verification(False, INVALID_SIGNATURE)

    signed_payload = timestamp_ms.encode("ascii") + b"." + raw_body
    expected = hmac.new(detection_key.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest().encode("ascii")
    matched = False
    for item in items[1:]:
        # compare_digest takes the same time however many leading bytes match.
        if hmac.compare_digest(item.strip().encode("utf-8"), expected):
            matched = True
    if not matched:
        return Verification(False, INVALID_SIGNATURE)
    return Verification(True)


def sign_detection(detection_key: str, timestamp_ms: str, raw_body: bytes) -> str:
    """The X-Signature value Detection sends."""
    signed_payload = timestamp_ms.encode("ascii") + b"." + raw_body
    return SIGNATURE_SCHEME + "," + hmac.new(detection_key.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()


def xml_escape(value: Any) -> str:
    """Escape &, <, >, " and ' so a value is safe inside an XML attribute or element."""
    text = str(value)
    for character, entity in _XML_ESCAPES:
        text = text.replace(character, entity)
    return text


def voice_twiml(
    detection_url: str,
    detection_key: str,
    public_url: str,
    strategy: str,
    call_id: str,
    detection_timeout_sec: int,
    beep_wait_seconds: int,
) -> str:
    """The TwiML Twilio runs when the call is answered.

    `<Start><Stream>` forks the caller's audio to Detection and lets the TwiML go on,
    so the call waits silently in `<Pause>` while Detection listens. The `<Hangup/>`
    ends a call nobody acted on. The Detection key is in here, so it shows in the
    Twilio Console request logs: use a dedicated key and delete it when done.
    """
    def parameter(name: str, value: Any) -> str:
        return '      <Parameter name="' + name + '" value="' + xml_escape(value) + '"/>'

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        "<Response>",
        "  <Start>",
        '    <Stream name="' + STREAM_NAME + '" url="' + xml_escape(detection_url) + '" track="inbound_track">',
        parameter("api_key", detection_key),
        parameter("webhook_url", public_url + "/webhooks/detection"),
        parameter("webhook_events", WEBHOOK_EVENTS),
        parameter("strategy", strategy),
        parameter("call_id", call_id),
        parameter("detection_timeout_sec", detection_timeout_sec),
        "    </Stream>",
        "  </Start>",
        '  <Pause length="' + str(detection_timeout_sec + beep_wait_seconds + 10) + '"/>',
        "  <Hangup/>",
        "</Response>",
    ]
    return "\n".join(lines)


def play_twiml(message: Tuple[str, str]) -> str:
    """TwiML that stops the Detection stream, plays or speaks the message, then hangs up.

    `message` is ("play", audio_url) or ("say", text). Stopping the stream ends the
    Detection session, which then sends `close` with reason `normal`.
    """
    kind, value = message
    verb = "<Play>" + xml_escape(value) + "</Play>" if kind == "play" else "<Say>" + xml_escape(value) + "</Say>"
    return "<Response><Stop><Stream name=\"" + STREAM_NAME + "\"/></Stop>" + verb + "<Hangup/></Response>"


class Action(NamedTuple):
    kind: str
    outcome: str


class CallDecision:
    """Decides, from Detection events and Twilio statuses, the one thing to do to the call.

    The recipe feeds events in the order the receiver recorded them. The first event
    that calls for an action wins; everything after it is printed and nothing more.
    """

    def __init__(self, live_confidence: float, beep_wait_seconds: float, out: Output) -> None:
        self.live_confidence = live_confidence
        self.beep_wait_seconds = beep_wait_seconds
        self.action: Optional[Action] = None
        self.beep_deadline: Optional[float] = None
        self.last_verdict: Optional[Tuple[str, Any]] = None
        self.beep: Optional[Dict[str, Any]] = None
        self._out = out

    def on_detection_event(self, name: str, data: Dict[str, Any], now: float) -> Optional[Action]:
        """`now` is a monotonic time in seconds, used to start the beep timer."""
        if name == "beep":
            self.beep = data
            self._out("Beep: timestamp_ms=" + printable(data.get("timestamp_ms"))
                      + " duration_ms=" + printable(data.get("duration_ms")))
            return self._take(Action(PLAY_VOICEMAIL, VOICEMAIL_ON_BEEP))

        if name == "detection":
            return self._on_verdict(data, now)

        if name == "screening":
            self._out("Call screener: screening_type=" + printable(data.get("screening_type"))
                      + " suggested_action=" + printable(data.get("suggested_action"))
                      + " suggested_dtmf=" + printable(data.get("suggested_dtmf")))
            return None

        if name == "timeout":
            self._out("Detection timed out with no verdict.")
            return self._take(Action(HANG_UP, NO_ANSWER_DETECTED))

        if name == "error":
            recoverable = data.get("recoverable") is True
            self._out("Detection error: code=" + printable(data.get("code")) + " error="
                      + printable(data.get("error")) + " recoverable=" + ("true" if recoverable else "false"))
            if recoverable:
                return None
            return self._take(Action(HANG_UP, DETECTION_ERROR))

        if name == "close":
            self._out("Detection session closed: reason=" + printable(data.get("reason")))
            return None

        self._out("Detection event " + printable(name) + ": no action.")
        return None

    def on_call_status(self, status: str) -> Optional[Action]:
        """A Twilio status before any action can end the run with no Twilio request."""
        if status in NOT_ANSWERED_STATUSES:
            return self._take(Action(NOTHING, NOT_ANSWERED))
        if status == "completed":
            return self._take(Action(NOTHING, ENDED_BEFORE_ACTION))
        return None

    def on_timer(self, now: float) -> Optional[Action]:
        """After a voicemail greeting verdict, play anyway once DC_BEEP_WAIT_SECONDS pass with no beep."""
        if self.action is None and self.beep_deadline is not None and now >= self.beep_deadline:
            self._out("No beep within " + _number(self.beep_wait_seconds) + " seconds. Playing the message anyway.")
            return self._take(Action(PLAY_VOICEMAIL, VOICEMAIL_NO_BEEP))
        return None

    def _on_verdict(self, data: Dict[str, Any], now: float) -> Optional[Action]:
        verdict = data.get("type")
        confidence = data.get("confidence")
        self.last_verdict = (verdict, confidence)
        line = "Detection: " + printable(verdict) + " (confidence " + printable(confidence) + ")"

        if isinstance(verdict, str) and verdict.startswith(HUMAN_PREFIX):
            if _at_least(confidence, self.live_confidence):
                self._out(line)
                return self._take(Action(PLAY_LIVE, LIVE_PERSON))
            self._out(line + ", below DC_LIVE_CONFIDENCE " + _number(self.live_confidence) + ", not acted on.")
            return None

        if verdict == VOICEMAIL_GREETING:
            self._out(line)
            if self.action is None and self.beep_deadline is None:
                self.beep_deadline = now + self.beep_wait_seconds
                self._out("Waiting up to " + _number(self.beep_wait_seconds) + " seconds for the beep.")
            return None

        if verdict in VOICEMAIL_UNAVAILABLE_TYPES:
            self._out(line)
            if self.action is None:
                self._out("The mailbox cannot take a message (" + verdict + "), so the call is hung up.")
            return self._take(Action(HANG_UP, VOICEMAIL_UNAVAILABLE))

        if verdict == SILENCE:
            self._out(line)
            return self._take(Action(HANG_UP, NO_ANSWER_DETECTED))

        self._out(line + ": no action.")
        return None

    def _take(self, action: Action) -> Optional[Action]:
        """At most one action per call: the first one wins, later ones are dropped."""
        if self.action is not None:
            return None
        self.action = action
        return action


def _at_least(value: Any, threshold: float) -> bool:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return False
    return value >= threshold


def _number(value: float) -> str:
    return str(int(value)) if float(value).is_integer() else str(value)
