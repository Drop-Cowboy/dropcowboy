"""Shared pieces for the detect-twilio tests: settings, mock Twilio routes, signed requests.

Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
(The tests place no call: Twilio and Drop Cowboy are mock servers on ephemeral ports.)
"""
from __future__ import annotations

import json
import threading
import time
from typing import Any, Callable, Dict, List, Optional, Tuple

import requests

from dropcowboy_examples.detection import sign_detection
from dropcowboy_examples.recipes import detect_twilio
from dropcowboy_examples.twilio import twilio_signature

from .conftest import API_KEY, API_SECRET, FIXTURES, PUBLIC_URL, RECIPIENT


def load_fixture(name: str) -> Any:
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


TWILIO_VECTORS = load_fixture("twilio-signature-vectors.json")
DETECTION_VECTORS = load_fixture("detection-signature-vectors.json")
STATUS_FIXTURE = load_fixture("twilio.status-completed.json")

# The fixtures' all-zero Account SID is refused as a setting, so the settings use the
# next placeholder in the same pattern. The CallSid is the fixtures' own placeholder.
ACCOUNT_SID = "AC00000000000000000000000000000001"
ZERO_ACCOUNT_SID = "AC00000000000000000000000000000000"
CALL_SID = STATUS_FIXTURE["CallSid"]
AUTH_TOKEN = TWILIO_VECTORS["auth_token"]
DETECTION_KEY = DETECTION_VECTORS["detection_key"]
TWILIO_FROM = STATUS_FIXTURE["From"]
VM_AUDIO_URL = "https://audio.example.org/voicemail/hello.mp3"
LIVE_AUDIO_URL = "https://audio.example.org/voicemail/live.wav"
TEMP_KEY_ID = "4b8d2f6a-1c3e-4a57-9b0d-6e2f8a4c1d39"
TEMP_API_KEY = "test-temporary-detection-key-not-real-7d31"
LEFTOVER_KEY_ID = "8e1a5c3f-7b9d-4e26-a0c4-2f6b8d1e3a75"
OTHER_KEY_ID = "2c7f9a1e-5d3b-4f80-8e6a-1b9d3f5c7e24"
OTHER_CALL_ID = "6d0b4f8a-2e6c-4a19-b3d7-5f9a1c3e7b02"

ACCOUNT_PATH = "/2010-04-01/Accounts/" + ACCOUNT_SID
CALLS_PATH = ACCOUNT_PATH + "/Calls.json"
UPDATE_PATH = ACCOUNT_PATH + "/Calls/" + CALL_SID + ".json"
KEYS_PATH = "/register/public/detection-keys"


def base_env(dc_mock, twilio_mock, **extra: str) -> Dict[str, str]:
    env = {
        "TWILIO_ACCOUNT_SID": ACCOUNT_SID,
        "TWILIO_AUTH_TOKEN": AUTH_TOKEN,
        "TWILIO_FROM": TWILIO_FROM,
        "TWILIO_BASE_URL": twilio_mock.base_url,
        "DC_TO": RECIPIENT,
        "DC_PUBLIC_URL": PUBLIC_URL,
        "DC_DETECTION_KEY": DETECTION_KEY,
        "DC_BASE_URL": dc_mock.base_url,
        "DC_VM_AUDIO_URL": VM_AUDIO_URL,
        "PORT": "0",
        "DC_WAIT_SECONDS": "60",
    }
    env.update(extra)
    return {name: value for name, value in env.items() if value is not None}


def temp_key_env(dc_mock, twilio_mock, **extra: str) -> Dict[str, str]:
    env = base_env(dc_mock, twilio_mock, DC_KEY=API_KEY, DC_SECRET=API_SECRET, **extra)
    env.pop("DC_DETECTION_KEY")
    return env


def ok(data: Any) -> Tuple[int, Any]:
    return 200, {"data": data, "meta": {"request_id": "1f6b3d9e-4a2c-4e85-b7d1-9c3e5a7f2b40"}}


def twilio_routes(
    mock,
    account: Optional[Dict[str, Any]] = None,
    incoming: Optional[List[Dict[str, Any]]] = None,
    outgoing: Optional[List[Dict[str, Any]]] = None,
    call: Any = None,
    update: Any = None,
) -> None:
    mock.route("GET", ACCOUNT_PATH + ".json",
               (200, account if account is not None else {"sid": ACCOUNT_SID, "type": "Full", "status": "active"}))
    mock.route("GET", ACCOUNT_PATH + "/IncomingPhoneNumbers.json",
               (200, {"incoming_phone_numbers": incoming if incoming is not None else [{"phone_number": TWILIO_FROM}]}))
    mock.route("GET", ACCOUNT_PATH + "/OutgoingCallerIds.json",
               (200, {"outgoing_caller_ids": outgoing if outgoing is not None else []}))
    mock.route("POST", CALLS_PATH, call if call is not None else (201, {"sid": CALL_SID, "status": "queued"}))
    if isinstance(update, list):
        mock.route("POST", UPDATE_PATH, *update)
    else:
        updated = (200, {"sid": CALL_SID, "status": "in-progress"})
        mock.route("POST", UPDATE_PATH, update if update is not None else updated)


def key_routes(mock, listed: Optional[List[Dict[str, Any]]] = None, create: Any = None) -> None:
    mock.route("GET", KEYS_PATH, ok(listed if listed is not None else []))
    mock.route("POST", KEYS_PATH, create if create is not None else (201, {"data": {
        "key_id": TEMP_KEY_ID, "name": detect_twilio.TEMPORARY_KEY_NAME, "api_key": TEMP_API_KEY,
        "key_hint": TEMP_API_KEY[-4:], "created_at": 1774041600000, "expires_at": 1774045200000,
    }}))
    for key_id in (TEMP_KEY_ID, LEFTOVER_KEY_ID, OTHER_KEY_ID):
        mock.route("DELETE", KEYS_PATH + "/" + key_id, ok({"key_id": key_id, "revoked": True}))


# Signed requests -------------------------------------------------------------

def detection_body(fixture: str, call_id: str, **changes: Any) -> bytes:
    """A Detection fixture with this run's call_id swapped in, serialized the compact way Detection sends it."""
    body = load_fixture(fixture)
    body["call_id"] = call_id
    body["twilio_call_sid"] = CALL_SID
    data_changes = changes.pop("data", None)
    body.update(changes)
    if data_changes:
        body["data"].update(data_changes)
    return json.dumps(body, separators=(",", ":")).encode("utf-8")


def post_detection(
    base_url: str,
    raw_body: bytes,
    key: str = DETECTION_KEY,
    timestamp_ms: Optional[str] = None,
    signature: Optional[str] = None,
    headers: Optional[Dict[str, str]] = None,
) -> requests.Response:
    timestamp_ms = timestamp_ms or str(int(time.time() * 1000))
    all_headers = {
        "Content-Type": "application/json",
        "X-Timestamp": timestamp_ms,
        "X-Signature": signature or sign_detection(key, timestamp_ms, raw_body),
        "X-Event": "detection",
        "X-Source": "twilio",
    }
    all_headers.update(headers or {})
    return requests.post(base_url + "/webhooks/detection", data=raw_body, headers=all_headers, timeout=5)


def post_twilio(
    base_url: str,
    path: str,
    params: List[Tuple[str, str]],
    auth_token: str = AUTH_TOKEN,
    public_url: str = PUBLIC_URL,
    signature: Optional[str] = None,
) -> requests.Response:
    """Post the way Twilio does: form-encoded, signed over the PUBLIC URL, sent to the local server."""
    headers = {"X-Twilio-Signature": signature or twilio_signature(public_url + path, params, auth_token)}
    return requests.post(base_url + path, data=params, headers=headers, timeout=5)


def voice_params(call_sid: str = CALL_SID) -> List[Tuple[str, str]]:
    return [
        ("AccountSid", ACCOUNT_SID), ("ApiVersion", "2010-04-01"), ("CallSid", call_sid),
        ("CallStatus", "in-progress"), ("Direction", "outbound-api"), ("From", TWILIO_FROM), ("To", RECIPIENT),
    ]


def status_params(status: str, duration: Optional[str] = None, call_sid: str = CALL_SID) -> List[Tuple[str, str]]:
    params = []
    for name, value in STATUS_FIXTURE.items():
        if name == "CallDuration":
            if duration is not None:
                params.append((name, duration))
            continue
        if name == "CallStatus":
            value = status
        elif name == "CallSid":
            value = call_sid
        params.append((name, value))
    return params


# A full run ------------------------------------------------------------------

class CallPlayer:
    """Plays Twilio and Detection against the recipe's own receiver while `run()` executes.

    Once the recipe creates the call, it fetches the TwiML like Twilio, then runs `script`.
    After every call update it posts `completed`, as Twilio does when the message ends or
    the call is hung up, unless `complete_on_update` is False.
    """

    def __init__(self, twilio_mock, script: Optional[Callable[["CallPlayer"], None]] = None,
                 complete_on_update: bool = True, detection_key: str = DETECTION_KEY) -> None:
        self.server = None
        self.script = script
        self.complete_on_update = complete_on_update
        self.detection_key = detection_key
        self.voice_response: Optional[requests.Response] = None
        self.errors: List[BaseException] = []
        twilio_mock.after("POST", CALLS_PATH, self._on_call_created)
        twilio_mock.after("POST", UPDATE_PATH, self._on_update)

    def health_base(self, server) -> str:
        self.server = server
        return server.base_url

    @property
    def receiver(self):
        return self.server.receiver

    @property
    def call_id(self) -> str:
        return self.receiver.call_id

    def detection(self, fixture: str, **changes: Any) -> requests.Response:
        call_id = changes.pop("call_id", self.call_id)
        response = post_detection(self.server.base_url, detection_body(fixture, call_id, **changes),
                                  key=self.detection_key)
        self._expect_200("Detection " + fixture, response)
        return response

    def status(self, status: str, duration: Optional[str] = None) -> requests.Response:
        response = post_twilio(self.server.base_url, "/twilio/status", status_params(status, duration))
        self._expect_200("status " + status, response)
        return response

    def _expect_200(self, what: str, response: requests.Response) -> None:
        if response.status_code != 200:
            self.errors.append(AssertionError(what + " answered " + str(response.status_code)))

    def _on_call_created(self, _recorded) -> None:
        try:
            deadline = time.monotonic() + 5
            while not self.receiver.call_sid and time.monotonic() < deadline:
                time.sleep(0.01)
            self.voice_response = post_twilio(self.server.base_url, "/twilio/voice", voice_params())
            if self.script:
                self.script(self)
        except BaseException as error:  # recorded and asserted by the test
            self.errors.append(error)

    def _on_update(self, _recorded) -> None:
        if not self.complete_on_update:
            return
        try:
            self.status("completed", "21")
        except requests.RequestException:
            pass  # the run already finished and closed the receiver


def run_with_player(settings, player: CallPlayer, lines: List[str]) -> int:
    return detect_twilio.run(settings, out=lines.append, health_base_url_for=player.health_base)


def parallel(*calls: Callable[[], Any]) -> None:
    threads = [threading.Thread(target=call) for call in calls]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
