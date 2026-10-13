"""Place a call through your own Twilio account and let Detection say when to play your message.

Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.

Run: python -m dropcowboy_examples.recipes.detect_twilio

The recipe dials DC_TO from TWILIO_FROM. When the call is answered, its TwiML forks the
audio to Detection with <Start><Stream> and waits silently. Detection posts signed
webhooks to this receiver: a verdict such as speech.voicemail.greeting,
speech.human.unknown or speech.silence, then the beep.
On the beep (or a live person) the recipe redirects the live call with Twilio's REST API
to play your message, then hang up. Twilio is called over plain HTTPS: no Twilio SDK.

The Detection key travels in the TwiML, so it shows in the Twilio Console request logs.
Use a dedicated key and delete it when done. Without DC_DETECTION_KEY the recipe creates
a temporary key with DC_KEY and DC_SECRET and deletes it at the end. Twilio trial
accounts are not supported: they play a notice before your TwiML runs.
"""
from __future__ import annotations

import ipaddress
import math
import os
import re
import sys
import time
import uuid
from dataclasses import dataclass
from typing import Callable, List, Mapping, Optional, Tuple
from urllib.parse import urlsplit

import requests

from .. import api
from .. import config as config_module
from ..cli import INTERRUPTED, print_api_error
from ..client import DcClient, DcError
from ..config import DEFAULT_BASE_URL, DEFAULT_PORT, ConfigError, last4
from ..detection import (
    HANG_UP,
    NO_RESULT,
    NOT_ANSWERED,
    PLAY_LIVE,
    PLAY_VOICEMAIL,
    TERMINAL_STATUSES,
    Action,
    CallDecision,
    play_twiml,
    voice_twiml,
)
from ..detection_receiver import DETECTION_PATH, STATUS, STATUS_PATH, VOICE_PATH, DetectionReceiver, RecordedEvent
from ..output import CONSENT_LINE, say
from ..receiver import EmbeddedServer, printable
from ..samples import find_sample_values, is_sample_value, sample_message
from ..twilio import DEFAULT_TWILIO_BASE_URL, TwilioClient, TwilioError, twilio_hint

BILLING_LINE = "This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session."
DEFAULT_DETECTION_URL = "wss://detect.dropcowboy.com/carrier/ws/twilio"
STRATEGIES = ("standard", "beep_only", "live_check")
TEMPORARY_KEY_NAME = "Twilio detection recipe (temporary)"
TEMPORARY_KEY_SECONDS = 3600
TEXT_LIMIT = 1000
HEALTH_TIMEOUT_SECONDS = 10
STATUS_CALLBACK_EVENTS = ("initiated", "ringing", "answered", "completed")
HANG_UP_FORM = [("Status", "completed")]

PHONE = re.compile(r"^\+[0-9]{8,15}$")
ACCOUNT_SID = re.compile(r"^AC[0-9a-fA-F]{32}$")
ZERO_ACCOUNT_SID = re.compile(r"^AC0{32}$")

TRIAL_ACCOUNT = (
    "Twilio trial accounts play a notice and wait for a key press before your TwiML runs, so "
    "detection would hear the notice. Upgrade the Twilio account to run this recipe."
)
NOT_ON_ACCOUNT = "TWILIO_FROM is not a number in this Twilio account or a verified caller ID on it."
NO_RESULT_MESSAGE = (
    "No Detection result arrived. Check that the Detection key is active and the balance covers "
    "Detection, and look for stream errors in the Twilio Console debugger."
)
NO_WEBHOOK_MESSAGE = "No Detection webhook arrived at all. A refused key closes the stream before any webhook is sent."
CLEANUP_FAILED = "A clean-up step failed (see above), so this run exits 1."

KEY_HINTS = {
    "byoc-required": "Detection keys need Building Blocks on your account. Enable Building Blocks, then run this "
                     "again.",
    "team-not-verified": "Finish verifying your account in the dashboard, then run this again.",
    "trial_feature_blocked": "Detection keys are not available on a trial account. Choose a plan, then run this "
                             "again.",
}

Output = Callable[[str], None]
Message = Tuple[str, str]


class RecipeStop(Exception):
    """A preflight check failed. The message says why and what to change. Exits 1."""


@dataclass
class DetectSettings:
    account_sid: str
    auth_token: str
    twilio_from: str
    to: str
    public_url: str
    twilio_base_url: str = DEFAULT_TWILIO_BASE_URL
    detection_key: str = ""
    dc_key: str = ""
    dc_secret: str = ""
    dc_base_url: str = DEFAULT_BASE_URL
    detection_url: str = DEFAULT_DETECTION_URL
    vm_audio_url: str = ""
    vm_text: str = ""
    live_audio_url: str = ""
    live_text: str = ""
    strategy: str = "standard"
    detection_timeout_sec: int = 45
    live_confidence: float = 0.6
    beep_wait_seconds: float = 20
    ring_seconds: int = 30
    wait_seconds: float = 180
    port: int = DEFAULT_PORT

    def voicemail_message(self) -> Message:
        """("play", url) or ("say", text). Audio wins when both are set."""
        return ("play", self.vm_audio_url) if self.vm_audio_url else ("say", self.vm_text)

    def live_message(self) -> Message:
        """The message for a live person. With neither live setting, the voicemail message."""
        if self.live_audio_url:
            return ("play", self.live_audio_url)
        if self.live_text:
            return ("say", self.live_text)
        return self.voicemail_message()


def load_detect_settings(env: Optional[Mapping[str, str]] = None) -> DetectSettings:
    """Read and check every setting before any request. Raises ConfigError listing every problem found."""
    if env is None:
        config_module._load_dotenv_file()
        env = os.environ

    def text(name: str, default: str = "") -> str:
        return (env.get(name) or default).strip()

    problems: List[str] = []

    account_sid = text("TWILIO_ACCOUNT_SID")
    auth_token = text("TWILIO_AUTH_TOKEN")
    twilio_from = text("TWILIO_FROM")
    to = text("DC_TO")
    public_url = text("DC_PUBLIC_URL").rstrip("/")
    detection_key = text("DC_DETECTION_KEY")
    dc_key = text("DC_KEY")
    dc_secret = text("DC_SECRET")
    vm_audio_url = text("DC_VM_AUDIO_URL")
    vm_text = text("DC_VM_TEXT")
    live_audio_url = text("DC_LIVE_AUDIO_URL")
    live_text = text("DC_LIVE_TEXT")

    # 1. Required settings.
    required = (
        ("TWILIO_ACCOUNT_SID", account_sid, "your Twilio Account SID (it starts with AC)"),
        ("TWILIO_AUTH_TOKEN", auth_token, "your Twilio auth token"),
        ("TWILIO_FROM", twilio_from, "a number in your Twilio account, or a verified caller ID on it, in E.164 format"),
        ("DC_TO", to, "a number you own, in E.164 format"),
        ("DC_PUBLIC_URL", public_url, "the https:// address your tunnel prints; Twilio and Detection both call it"),
    )
    for name, value, meaning in required:
        if not value:
            problems.append("Set " + name + " to " + meaning + ".")
    if not vm_audio_url and not vm_text:
        problems.append("Set DC_VM_AUDIO_URL (a public https:// .mp3 or .wav) or DC_VM_TEXT (text to speak) "
                        "for the message played on the beep.")
    if not detection_key and not (dc_key and dc_secret):
        problems.append("Set DC_DETECTION_KEY to a Detection key, or set DC_KEY and DC_SECRET so the recipe can "
                        "create a temporary key and delete it at the end.")

    # 2. E.164 numbers.
    for name, value in (("DC_TO", to), ("TWILIO_FROM", twilio_from)):
        if value and not PHONE.match(value):
            problems.append(name + " must be in E.164 format: a + sign, then 8 to 15 digits.")

    # 3. Account SID shape.
    if account_sid and not ACCOUNT_SID.match(account_sid):
        problems.append("TWILIO_ACCOUNT_SID must be AC followed by 32 hexadecimal characters (34 in all).")

    # 4. The public URL.
    if public_url:
        problem = public_url_problem(public_url)
        if problem:
            problems.append(problem)

    # 5. The messages.
    for name, value in (("DC_VM_AUDIO_URL", vm_audio_url), ("DC_LIVE_AUDIO_URL", live_audio_url)):
        if value and not _is_audio_url(value):
            problems.append(name + " must be a public https:// address whose path ends in .mp3 or .wav.")
    for name, value in (("DC_VM_TEXT", vm_text), ("DC_LIVE_TEXT", live_text)):
        if len(value) > TEXT_LIMIT:
            problems.append(name + " is " + str(len(value)) + " characters; the limit is " + str(TEXT_LIMIT) + ".")

    # 6. Numeric ranges.
    timeout_sec = _whole(text("DC_DETECTION_TIMEOUT_SEC"), "DC_DETECTION_TIMEOUT_SEC", 45, 5, 120, problems)
    beep_wait = _whole(text("DC_BEEP_WAIT_SECONDS"), "DC_BEEP_WAIT_SECONDS", 20, 1, 60, problems)
    ring_seconds = _whole(text("DC_RING_SECONDS"), "DC_RING_SECONDS", 30, 5, 60, problems)
    if text("DC_WAIT_SECONDS") in ("0", "00"):
        problems.append("DC_WAIT_SECONDS=0 is not allowed: this recipe has to listen for Detection and Twilio. "
                        "Use 60 to 600.")
        wait_seconds = 180
    else:
        wait_seconds = _whole(text("DC_WAIT_SECONDS"), "DC_WAIT_SECONDS", 180, 60, 600, problems)
    live_confidence = _fraction(text("DC_LIVE_CONFIDENCE"), "DC_LIVE_CONFIDENCE", 0.6, problems)
    port = _whole(text("PORT"), "PORT", DEFAULT_PORT, 0, 65535, problems)

    # 7. Strategy and the Detection address.
    strategy = text("DC_DETECTION_STRATEGY", "standard")
    if strategy not in STRATEGIES:
        problems.append("DC_DETECTION_STRATEGY must be standard, beep_only or live_check, in lowercase.")
    detection_url = text("DC_DETECTION_URL", DEFAULT_DETECTION_URL)
    if not detection_url.lower().startswith("wss://"):
        problems.append("DC_DETECTION_URL must start with wss://.")

    # 8. Sample values from our docs, and the placeholder SID from our fixtures.
    problems.extend(find_sample_values(env))
    if is_sample_value(twilio_from):
        problems.append(sample_message("TWILIO_FROM", twilio_from))
    if ZERO_ACCOUNT_SID.match(account_sid):
        problems.append("TWILIO_ACCOUNT_SID=" + account_sid
                        + ": this is the placeholder from our fixtures; use your own.")

    if problems:
        raise ConfigError("\n".join(problems))

    return DetectSettings(
        account_sid=account_sid,
        auth_token=auth_token,
        twilio_from=twilio_from,
        to=to,
        public_url=public_url,
        twilio_base_url=text("TWILIO_BASE_URL", DEFAULT_TWILIO_BASE_URL).rstrip("/"),
        detection_key=detection_key,
        dc_key=dc_key,
        dc_secret=dc_secret,
        dc_base_url=text("DC_BASE_URL", DEFAULT_BASE_URL).rstrip("/"),
        detection_url=detection_url,
        vm_audio_url=vm_audio_url,
        vm_text=vm_text,
        live_audio_url=live_audio_url,
        live_text=live_text,
        strategy=strategy,
        detection_timeout_sec=timeout_sec,
        live_confidence=live_confidence,
        beep_wait_seconds=beep_wait,
        ring_seconds=ring_seconds,
        wait_seconds=wait_seconds,
        port=port,
    )


def public_url_problem(url: str) -> Optional[str]:
    """Why DC_PUBLIC_URL cannot work, or None. Detection posts only to https:// on port 443."""
    prefix = "DC_PUBLIC_URL must be the public https:// address your tunnel prints"
    if not url.lower().startswith("https://"):
        return prefix + ": it must start with https://."
    try:
        parts = urlsplit(url)
        port = parts.port
    except ValueError:
        return prefix + ": it is not a valid URL."
    if parts.query or parts.fragment or "?" in url or "#" in url:
        return prefix + ", with no query string or fragment."
    if port is not None and port != 443:
        return prefix + ", with no port other than 443. Detection calls only port 443."
    host = (parts.hostname or "").lower()
    if not host:
        return prefix + ": it has no host name."
    if host == "localhost" or host.endswith(".local"):
        return prefix + ". " + host + " cannot be reached from the internet."
    try:
        address = ipaddress.ip_address(host)
    except ValueError:
        return None
    if address.is_private or address.is_loopback or address.is_link_local or address.is_unspecified:
        return prefix + ". " + host + " is a private address that cannot be reached from the internet."
    return None


def run(
    settings: DetectSettings,
    out: Output = say,
    health_base_url_for: Optional[Callable[[EmbeddedServer], str]] = None,
) -> int:
    """Steps 3 to 11 of the call sequence. Returns 0 for any outcome in the summary, or 1 when
    a clean-up step failed. Errors, including Ctrl+C, propagate after the clean-up has run.

    `health_base_url_for` picks where the health check goes. By default it goes through
    DC_PUBLIC_URL, which proves the tunnel reaches this receiver. Tests point it at the
    receiver directly.
    """
    return _DetectRun(settings, out).execute(health_base_url_for)


class _DetectRun:
    def __init__(self, settings: DetectSettings, out: Output) -> None:
        self.settings = settings
        self.out = out
        self.call_id = str(uuid.uuid4())
        self.twilio = TwilioClient(settings.account_sid, settings.auth_token, settings.twilio_base_url)
        self.dc: Optional[DcClient] = None
        self.detection_key = ""
        self.temporary_key_id = ""
        self.receiver: Optional[DetectionReceiver] = None
        self.server: Optional[EmbeddedServer] = None
        self.call_sid = ""
        self.call_started = 0.0
        self.call_status = ""
        self.call_duration = ""
        self.call_closed = False
        self.latency_ms: Optional[int] = None
        self.decision = CallDecision(settings.live_confidence, settings.beep_wait_seconds, out)

    def execute(self, health_base_url_for: Optional[Callable[[EmbeddedServer], str]]) -> int:
        """0 for any outcome in the summary, 1 when a clean-up step failed. Errors propagate after clean-up."""
        self.out("call_id: " + self.call_id)
        try:
            self._detection_key()
            self._twilio_preflight()
            self._start_receiver(health_base_url_for)
            self._create_call()
            self._act_on_events()
            self._summary()
        finally:
            cleaned_up = self._clean_up()
        if not cleaned_up:
            self.out(CLEANUP_FAILED)
            return 1
        return 0

    # Step 3 -------------------------------------------------------------------

    def _detection_key(self) -> None:
        settings = self.settings
        if settings.detection_key:
            self.detection_key = settings.detection_key
            self.out("Using DC_DETECTION_KEY ending in " + last4(self.detection_key) + ".")
            return

        self.dc = DcClient(settings.dc_key, settings.dc_secret, settings.dc_base_url)
        # Leftovers from a run that was killed before it could clean up.
        for key in api.list_detection_keys(self.dc):
            if key.get("name") == TEMPORARY_KEY_NAME and key.get("key_id"):
                try:
                    api.delete_detection_key(self.dc, key["key_id"])
                except DcError as error:
                    if error.status != 404:
                        raise
                self.out("Deleted a leftover temporary Detection key: key_id " + printable(key["key_id"]))

        created = api.create_detection_key(self.dc, TEMPORARY_KEY_NAME, TEMPORARY_KEY_SECONDS)
        key_id, api_key = created.get("key_id"), created.get("api_key")
        if not key_id or not api_key:
            raise RecipeStop("The API created no Detection key (no key_id or api_key in the answer).")
        self.temporary_key_id = key_id
        self.detection_key = api_key
        self.out("Created a temporary Detection key: key_id " + key_id + ", key ending in " + last4(api_key) + ".")

    # Step 4 -------------------------------------------------------------------

    def _twilio_preflight(self) -> None:
        account = self.twilio.get_account()
        if account.get("type") == "Trial":
            raise RecipeStop(TRIAL_ACCOUNT)
        if account.get("status") != "active":
            raise RecipeStop("The Twilio account status is " + printable(account.get("status"))
                             + ", not active. Reactivate it in the Twilio Console to run this recipe.")
        self.out("Twilio account " + last4(self.settings.account_sid) + " is active.")

        if self.twilio.incoming_numbers(self.settings.twilio_from):
            self.out("TWILIO_FROM " + self.settings.twilio_from + " is a number in this Twilio account.")
        elif self.twilio.outgoing_caller_ids(self.settings.twilio_from):
            self.out("TWILIO_FROM " + self.settings.twilio_from + " is a verified caller ID on this Twilio account.")
        else:
            raise RecipeStop(NOT_ON_ACCOUNT)

    # Step 5 -------------------------------------------------------------------

    def _start_receiver(self, health_base_url_for: Optional[Callable[[EmbeddedServer], str]]) -> None:
        settings = self.settings
        twiml = voice_twiml(
            settings.detection_url, self.detection_key, settings.public_url, settings.strategy, self.call_id,
            settings.detection_timeout_sec, int(settings.beep_wait_seconds),
        )
        self.receiver = DetectionReceiver(
            settings.public_url, settings.auth_token, self.detection_key, self.call_id, twiml, out=self.out,
        )
        self.server = EmbeddedServer(self.receiver, port=settings.port).start()
        self.out("Receiver listening on " + self.server.base_url + ", reached through " + settings.public_url)
        self.out("  routes: GET /health, POST " + VOICE_PATH + ", POST " + DETECTION_PATH + ", POST " + STATUS_PATH)

        base = health_base_url_for(self.server) if health_base_url_for else settings.public_url
        if not _healthy(base + "/health"):
            raise RecipeStop(
                "GET " + settings.public_url + "/health did not reach this receiver, so Twilio and Detection "
                "could not either. Check that the tunnel is running, that it forwards to port "
                + str(self.server.port) + ", and that DC_PUBLIC_URL is its address."
            )
        self.out("The tunnel reaches this receiver.")

    # Step 6 -------------------------------------------------------------------

    def _create_call(self) -> None:
        settings = self.settings
        form = [
            ("To", settings.to),
            ("From", settings.twilio_from),
            ("Url", settings.public_url + VOICE_PATH),
            ("Method", "POST"),
            ("StatusCallback", settings.public_url + STATUS_PATH),
            ("StatusCallbackMethod", "POST"),
        ]
        for event in STATUS_CALLBACK_EVENTS:
            form.append(("StatusCallbackEvent", event))
        form.append(("Timeout", str(settings.ring_seconds)))

        self.out("Calling " + settings.to + " from " + settings.twilio_from + "...")
        self.call_started = time.monotonic()
        created = self.twilio.create_call(form)
        call_sid = created.get("sid")
        if not isinstance(call_sid, str) or not call_sid:
            raise RecipeStop("Twilio created the call but returned no sid.")
        self.call_sid = call_sid
        assert self.receiver is not None
        self.receiver.expect_call(call_sid)
        self.out("Call created. CallSid: " + call_sid)

    # Steps 7 to 9 -------------------------------------------------------------

    def _act_on_events(self) -> None:
        assert self.receiver is not None
        deadline = self.call_started + self.settings.wait_seconds
        index = 0
        while True:
            now = time.monotonic()
            action = self.decision.on_timer(now)
            if action is not None:
                self._perform(action, now, "the beep wait ran out")
            if self._call_ended():
                break
            remaining = deadline - now
            if remaining <= 0:
                break
            wait = remaining
            if self.decision.action is None and self.decision.beep_deadline is not None:
                wait = min(wait, max(0.0, self.decision.beep_deadline - now))
            events = self.receiver.events_since(index, wait)
            index += len(events)
            for event in events:
                self._handle(event)

        if self.decision.action is None:
            self.out(NO_RESULT_MESSAGE)
            if self._own_webhook_count() == 0:
                self.out(NO_WEBHOOK_MESSAGE)
            self.out("Hanging up.")
            self._update(HANG_UP_FORM, hangs_up=True)

    def _handle(self, event: RecordedEvent) -> None:
        if event.kind == STATUS:
            if event.call_sid != self.call_sid:
                return
            self.call_status = event.name
            if event.data.get("CallDuration"):
                self.call_duration = event.data["CallDuration"]
            self.out("Twilio call status: " + printable(event.name))
            if self.decision.action is None:
                action = self.decision.on_call_status(event.name)
                if action is not None:
                    self._perform(action, event.received_at, "")
            return
        if event.ignored:
            return
        action = self.decision.on_detection_event(event.name, event.data, event.received_at)
        if action is not None:
            what = event.data.get("type") if event.name == "detection" else event.name
            self._perform(action, event.received_at, "the receiver recorded the " + printable(what))

    def _perform(self, action: Action, recorded_at: float, since: str) -> None:
        if action.kind == PLAY_VOICEMAIL:
            self.out("Playing the voicemail message.")
            self._update([("Twiml", play_twiml(self.settings.voicemail_message()))], recorded_at, since)
        elif action.kind == PLAY_LIVE:
            self.out("Playing the live-person message.")
            self._update([("Twiml", play_twiml(self.settings.live_message()))], recorded_at, since)
        elif action.kind == HANG_UP:
            self.out("Hanging up.")
            self._update(HANG_UP_FORM, recorded_at, since, hangs_up=True)
        else:
            self.out("The call ended before any action (" + printable(self.call_status) + "). No update sent.")

    def _update(
        self,
        form: List[Tuple[str, str]],
        recorded_at: Optional[float] = None,
        since: str = "",
        hangs_up: bool = False,
    ) -> None:
        """Redirect or end the live call. A call that already ended is reported, not an error.

        With `recorded_at`, prints how long after that moment Twilio answered the update.
        """
        try:
            self.twilio.update_call(self.call_sid, form)
        except TwilioError as error:
            if not error.call_already_ended:
                raise
            self.out("The call had already ended (" + error.summary() + ").")
            self.call_closed = True
            return
        if hangs_up:
            self.call_closed = True
        if recorded_at is not None:
            self.latency_ms = int(round((time.monotonic() - recorded_at) * 1000))
            self.out("Twilio answered the update " + str(self.latency_ms) + " ms after " + since + ".")

    def _call_ended(self) -> bool:
        return self.call_status in TERMINAL_STATUSES

    def _own_webhook_count(self) -> int:
        counts = self.receiver.counts() if self.receiver else None
        return (counts.received - counts.ignored) if counts else 0

    # Step 10 ------------------------------------------------------------------

    def _summary(self) -> None:
        decision = self.decision
        outcome = decision.action.outcome if decision.action else NO_RESULT
        if outcome == NOT_ANSWERED:
            outcome += " (" + printable(self.call_status) + ")"
        self.out("Summary:")
        self.out("  outcome: " + outcome)
        if decision.last_verdict:
            verdict, confidence = decision.last_verdict
            self.out("  last verdict: " + printable(verdict) + " (confidence " + printable(confidence) + ")")
        else:
            self.out("  last verdict: (none)")
        if decision.beep:
            self.out("  beep: timestamp_ms=" + printable(decision.beep.get("timestamp_ms"))
                     + " duration_ms=" + printable(decision.beep.get("duration_ms")))
        latency = str(self.latency_ms) + " ms" if self.latency_ms is not None else "(no update)"
        self.out("  update latency: " + latency)
        self.out("  CallStatus: " + (printable(self.call_status) or "(none)"))
        self.out("  CallDuration: " + (printable(self.call_duration) or "(none)"))
        self.out("  CallSid: " + self.call_sid)
        self.out("  call_id: " + self.call_id)
        counts = self.receiver.counts() if self.receiver else None
        if counts:
            self.out("  Detection webhooks: " + str(counts.received) + " received, " + str(counts.duplicates)
                     + " duplicates, " + str(counts.ignored) + " ignored")

    # Step 11 ------------------------------------------------------------------

    def _clean_up(self) -> bool:
        """Runs on success, on any error and on Ctrl+C. Each step runs even if an earlier one failed.

        Returns False when any step failed; the run then exits 1 even if the call itself went well.
        """
        ok = True
        if self.call_sid and not self._call_ended() and not self.call_closed:
            try:
                self.twilio.update_call(self.call_sid, HANG_UP_FORM)
                self.out("Hung up the call.")
            except TwilioError as error:
                if error.call_already_ended:
                    self.out("The call had already ended.")
                else:
                    ok = False
                    self.out("Could not hang up the call: " + error.summary())
            except Exception as error:
                ok = False
                self.out("Could not hang up the call: " + type(error).__name__)

        if self.temporary_key_id and self.dc is not None:
            try:
                api.delete_detection_key(self.dc, self.temporary_key_id)
                self.out("Temporary Detection key deleted.")
            except DcError as error:
                if error.status == 404:
                    self.out("The temporary Detection key was already gone.")
                else:
                    ok = False
                    self.out("Could not delete the temporary Detection key " + self.temporary_key_id + " ("
                             + error.summary() + "). Delete it in the dashboard; it expires within an hour anyway.")
            except Exception as error:
                ok = False
                self.out("Could not delete the temporary Detection key " + self.temporary_key_id + ": "
                         + type(error).__name__)

        if self.server is not None:
            try:
                self.server.stop()
            except Exception as error:
                ok = False
                self.out("Could not stop the receiver: " + type(error).__name__)
        return ok


def _healthy(url: str) -> bool:
    try:
        response = requests.get(url, timeout=HEALTH_TIMEOUT_SECONDS, allow_redirects=False)
        return response.status_code == 200 and response.json() == {"ok": True}
    except (requests.RequestException, ValueError):
        return False


def _is_audio_url(value: str) -> bool:
    if not value.lower().startswith("https://"):
        return False
    try:
        parts = urlsplit(value)
    except ValueError:
        return False
    return bool(parts.hostname) and parts.path.lower().endswith((".mp3", ".wav"))


def _whole(value: str, name: str, default: int, low: int, high: int, problems: List[str]) -> int:
    if not value:
        return default
    message = name + " must be a whole number from " + str(low) + " to " + str(high) + "."
    if not re.fullmatch(r"[0-9]+", value):
        problems.append(message)
        return default
    number = int(value)
    if number < low or number > high:
        problems.append(message)
        return default
    return number


def _fraction(value: str, name: str, default: float, problems: List[str]) -> float:
    if not value:
        return default
    message = name + " must be a number from 0 to 1 (default " + str(default) + ")."
    try:
        number = float(value)
    except ValueError:
        problems.append(message)
        return default
    if math.isnan(number) or number < 0 or number > 1:
        problems.append(message)
        return default
    return number


def print_twilio_error(error: TwilioError) -> None:
    """Show what Twilio said. The auth token and request headers are never part of an error."""
    print("The Twilio request failed.", file=sys.stderr)
    print("  status: " + (str(error.status) if error.status else "no response"), file=sys.stderr)
    for label, value in (("code", error.code), ("message", error.message), ("more_info", error.more_info)):
        if value:
            print("  " + label + ": " + str(value), file=sys.stderr)
    hint = twilio_hint(error.code)
    if hint:
        print("What to do: " + hint, file=sys.stderr)


def main(env: Optional[Mapping[str, str]] = None) -> int:
    say(CONSENT_LINE)
    say(BILLING_LINE)
    try:
        settings = load_detect_settings(env)
    except ConfigError as error:
        print("Setup problem: " + str(error), file=sys.stderr)
        return 1
    try:
        return run(settings)
    except (RecipeStop, ConfigError) as error:
        print(str(error), file=sys.stderr)
        return 1
    except DcError as error:
        print_api_error(error)
        hint = KEY_HINTS.get(error.code or "") if error.status == 403 else None
        if hint:
            print("What to do: " + hint, file=sys.stderr)
        return 1
    except TwilioError as error:
        print_twilio_error(error)
        return 1
    except OSError as error:
        print("Could not start the receiver: " + str(error), file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print("Interrupted.", file=sys.stderr)
        return INTERRUPTED


if __name__ == "__main__":
    sys.exit(main())
