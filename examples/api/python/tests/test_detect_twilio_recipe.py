"""detect-twilio end to end: mock Twilio and mock Drop Cowboy on ephemeral ports, the recipe's
own receiver driven over real HTTP with signed Twilio and Detection requests.

Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
(These tests place no call.)
"""
from __future__ import annotations

import base64
import dataclasses
from typing import Any, Callable, List, NamedTuple, Optional

import pytest

from dropcowboy_examples.recipes import detect_twilio
from dropcowboy_examples.recipes.detect_twilio import (
    CLEANUP_FAILED,
    NO_RESULT_MESSAGE,
    NO_WEBHOOK_MESSAGE,
    NOT_ON_ACCOUNT,
    TEMPORARY_KEY_NAME,
    TRIAL_ACCOUNT,
    RecipeStop,
    load_detect_settings,
)

from .conftest import API_SECRET, PUBLIC_URL, RECIPIENT
from .detect_support import (
    ACCOUNT_PATH,
    ACCOUNT_SID,
    AUTH_TOKEN,
    CALL_SID,
    CALLS_PATH,
    DETECTION_KEY,
    KEYS_PATH,
    LEFTOVER_KEY_ID,
    LIVE_AUDIO_URL,
    OTHER_CALL_ID,
    OTHER_KEY_ID,
    TEMP_API_KEY,
    TEMP_KEY_ID,
    TWILIO_FROM,
    UPDATE_PATH,
    VM_AUDIO_URL,
    CallPlayer,
    base_env,
    key_routes,
    parallel,
    run_with_player,
    temp_key_env,
    twilio_routes,
)
from .mock_api import MockApi

CONSENT_LINE = "Send only to people who agreed to hear from you. Test with numbers you own."
BILLING_LINE = "This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session."
HANG_UP = [("Status", "completed")]
GONE = (404, {"code": 20404, "message": "The requested resource was not found", "status": 404,
              "more_info": "https://www.twilio.com/docs/errors/20404"})


class Result(NamedTuple):
    code: Optional[int]
    lines: List[str]
    dc: MockApi
    twilio: MockApi
    player: CallPlayer
    raised: Optional[BaseException]

    @property
    def text(self) -> str:
        return "\n".join(self.lines)

    def updates(self) -> List[List[Any]]:
        return [r.form() for r in self.twilio.find("POST", UPDATE_PATH)]


def play_twiml(verb: str, value: str) -> str:
    return ('<Response><Stop><Stream name="detection"/></Stop><' + verb + ">" + value + "</" + verb
            + "><Hangup/></Response>")


def play_call(
    script: Optional[Callable[[CallPlayer], None]] = None,
    temp: bool = False,
    env: Optional[dict] = None,
    changes: Optional[dict] = None,
    complete_on_update: bool = True,
    out: Optional[Callable[[str], None]] = None,
    delete_temp_key: Any = None,
    **routes: Any,
) -> Result:
    listed = routes.pop("listed", None)
    with MockApi() as dc_mock, MockApi() as twilio_mock:
        twilio_routes(twilio_mock, **routes)
        key_routes(dc_mock, listed)
        if delete_temp_key is not None:
            dc_mock.route("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID, delete_temp_key)
        settings = load_detect_settings((temp_key_env if temp else base_env)(dc_mock, twilio_mock, **(env or {})))
        if changes:
            settings = dataclasses.replace(settings, **changes)
        player = CallPlayer(twilio_mock, script, complete_on_update, TEMP_API_KEY if temp else DETECTION_KEY)
        lines: List[str] = []

        def record(line: str) -> None:
            lines.append(line)
            if out is not None:
                out(line)

        code: Optional[int] = None
        raised: Optional[BaseException] = None
        try:
            code = detect_twilio.run(settings, out=record, health_base_url_for=player.health_base)
        except BaseException as error:  # asserted by the test that caused it
            raised = error
    if raised is not None and out is None:
        raise raised
    return Result(code, lines, dc_mock, twilio_mock, player, raised)


def beep(player: CallPlayer) -> None:
    player.detection("detection.voicemail.json")
    player.detection("detection.beep.json")


def assert_clean(result: Result) -> None:
    assert result.code == 0
    assert result.player.errors == []
    assert result.player.voice_response is not None and result.player.voice_response.status_code == 200


# --- The call sequence ---------------------------------------------------------


def test_beep_plays_the_voicemail_message_with_the_exact_twiml():
    result = play_call(beep)
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Play", VM_AUDIO_URL))]]
    assert result.twilio.calls() == [
        ("GET", ACCOUNT_PATH + ".json"),
        ("GET", ACCOUNT_PATH + "/IncomingPhoneNumbers.json"),
        ("POST", CALLS_PATH),
        ("POST", UPDATE_PATH),
    ]
    assert result.twilio.find("GET", ACCOUNT_PATH + "/IncomingPhoneNumbers.json")[0].query == {
        "PhoneNumber": TWILIO_FROM}
    assert "Waiting up to 20 seconds for the beep." in result.lines
    assert "  outcome: voicemail_on_beep" in result.lines
    assert "  beep: timestamp_ms=6420 duration_ms=380" in result.lines
    assert "  CallStatus: completed" in result.lines
    assert "  CallDuration: 21" in result.lines
    assert "  CallSid: " + CALL_SID in result.lines
    assert any(line.startswith("Twilio answered the update ") and line.endswith(
        " ms after the receiver recorded the beep.") for line in result.lines)


def test_text_messages_are_spoken_and_escaped():
    result = play_call(beep, env={"DC_VM_AUDIO_URL": None, "DC_VM_TEXT": "Hi, it's Pat & <the team>."})
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Say", "Hi, it&apos;s Pat &amp; &lt;the team&gt;."))]]


def test_the_calls_json_form_body_is_exact():
    result = play_call(beep)
    created = result.twilio.find("POST", CALLS_PATH)[0]
    assert created.form() == [
        ("To", RECIPIENT),
        ("From", TWILIO_FROM),
        ("Url", PUBLIC_URL + "/twilio/voice"),
        ("Method", "POST"),
        ("StatusCallback", PUBLIC_URL + "/twilio/status"),
        ("StatusCallbackMethod", "POST"),
        ("StatusCallbackEvent", "initiated"),
        ("StatusCallbackEvent", "ringing"),
        ("StatusCallbackEvent", "answered"),
        ("StatusCallbackEvent", "completed"),
        ("Timeout", "30"),
    ]
    assert "MachineDetection" not in created.raw.decode()
    assert created.headers["content-type"] == "application/x-www-form-urlencoded"
    assert created.headers["accept"] == "application/json"
    expected_auth = "Basic " + base64.b64encode((ACCOUNT_SID + ":" + AUTH_TOKEN).encode()).decode()
    for request in result.twilio.requests:
        assert request.headers["authorization"] == expected_auth


def test_the_twiml_carries_this_runs_settings():
    result = play_call(beep, env={"DC_DETECTION_STRATEGY": "beep_only", "DC_DETECTION_TIMEOUT_SEC": "30",
                                  "DC_BEEP_WAIT_SECONDS": "15"})
    twiml = result.player.voice_response.text
    assert '<Parameter name="api_key" value="' + DETECTION_KEY + '"/>' in twiml
    assert '<Parameter name="strategy" value="beep_only"/>' in twiml
    assert '<Parameter name="call_id" value="' + result.player.call_id + '"/>' in twiml
    assert '<Parameter name="detection_timeout_sec" value="30"/>' in twiml
    assert '<Pause length="55"/>' in twiml


@pytest.mark.parametrize("threshold,confidence", [("0.7", 0.7), ("0.7", 0.88)])
def test_a_live_person_at_or_above_the_threshold_plays_the_live_message(threshold, confidence):
    result = play_call(lambda p: p.detection("detection.live-person.json", data={"confidence": confidence}),
                       env={"DC_LIVE_AUDIO_URL": LIVE_AUDIO_URL, "DC_LIVE_CONFIDENCE": threshold})
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Play", LIVE_AUDIO_URL))]]
    assert "  outcome: live_person" in result.lines
    assert "  last verdict: speech.human.unknown (confidence " + str(confidence) + ")" in result.lines


def test_the_default_threshold_acts_on_an_early_0_6_live_person_verdict():
    result = play_call(lambda p: p.detection("detection.live-person.json"), env={"DC_LIVE_TEXT": "Hello there"})
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Say", "Hello there"))]]
    assert "Detection: speech.human.unknown (confidence 0.6)" in result.lines
    assert "  outcome: live_person" in result.lines


def test_another_human_subtype_plays_the_live_message():
    result = play_call(lambda p: p.detection("detection.live-person.json",
                                             data={"type": "speech.human.adult", "confidence": 0.8}),
                       env={"DC_LIVE_TEXT": "Hello there"})
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Say", "Hello there"))]]
    assert "  outcome: live_person" in result.lines


def test_a_live_person_below_the_threshold_does_nothing():
    def script(p):
        p.detection("detection.live-person.json", data={"confidence": 0.5})
        p.status("completed", "4")
    result = play_call(script, env={"DC_LIVE_TEXT": "Hello there"})
    assert_clean(result)
    assert result.updates() == []
    assert ("Detection: speech.human.unknown (confidence 0.5), below DC_LIVE_CONFIDENCE 0.6, not acted on."
            in result.lines)
    assert "  outcome: ended_before_action" in result.lines


@pytest.mark.parametrize("verdict", ["live_person", "speech.ivr", "speech.screening", "speech.carrier.intercept",
                                     "speech.unknown", "human"])
def test_other_verdicts_are_printed_and_not_acted_on(verdict):
    def script(p):
        p.detection("detection.live-person.json", data={"type": verdict, "confidence": 0.95})
        p.status("completed", "4")
    result = play_call(script, env={"DC_LIVE_TEXT": "Hello there"})
    assert_clean(result)
    assert result.updates() == []
    assert "Detection: " + verdict + " (confidence 0.95): no action." in result.lines
    assert "  outcome: ended_before_action" in result.lines


def test_the_live_message_falls_back_to_the_voicemail_message():
    result = play_call(lambda p: p.detection("detection.live-person.json"))
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Play", VM_AUDIO_URL))]]


def test_live_text_is_used_for_a_live_person():
    result = play_call(lambda p: p.detection("detection.live-person.json"), env={"DC_LIVE_TEXT": "Hello there"})
    assert result.updates() == [[("Twiml", play_twiml("Say", "Hello there"))]]


def test_a_voicemail_greeting_with_no_beep_plays_after_the_timer():
    result = play_call(lambda p: p.detection("detection.voicemail.json"), changes={"beep_wait_seconds": 0.3})
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Play", VM_AUDIO_URL))]]
    assert "Detection: speech.voicemail.greeting (confidence 0.91)" in result.lines
    assert "Waiting up to 0.3 seconds for the beep." in result.lines
    assert "No beep within 0.3 seconds. Playing the message anyway." in result.lines
    assert "  outcome: voicemail_no_beep" in result.lines
    assert "  beep: timestamp_ms=6420 duration_ms=380" not in result.lines


def test_a_voicemail_greeting_then_a_beep_plays_on_the_beep():
    result = play_call(beep, changes={"beep_wait_seconds": 30})
    assert_clean(result)
    assert result.updates() == [[("Twiml", play_twiml("Play", VM_AUDIO_URL))]]
    lines = result.lines
    assert lines.index("Detection: speech.voicemail.greeting (confidence 0.91)") < lines.index(
        "Beep: timestamp_ms=6420 duration_ms=380")
    assert not any(line.startswith("No beep within") for line in lines)
    assert "  outcome: voicemail_on_beep" in lines


@pytest.mark.parametrize("verdict", ["speech.voicemail.full", "speech.voicemail.not_setup"])
def test_a_mailbox_that_cannot_take_a_message_hangs_up(verdict):
    result = play_call(lambda p: p.detection("detection.voicemail.json", data={"type": verdict}))
    assert_clean(result)
    assert result.updates() == [HANG_UP]
    assert "The mailbox cannot take a message (" + verdict + "), so the call is hung up." in result.lines
    assert not any(line.startswith("Waiting up to") for line in result.lines)
    assert "  outcome: voicemail_unavailable" in result.lines


@pytest.mark.parametrize("fixture,changes,outcome", [
    ("detection.voicemail.json", {"data": {"type": "speech.silence", "confidence": 0.9}}, "no_answer_detected"),
    ("detection.close.json", {"event": "timeout", "data": {"timeout_ms": 45000}}, "no_answer_detected"),
    ("detection.close.json", {"event": "error", "data": {"code": "stream_failed", "error": "audio stream ended",
                                                         "recoverable": False}}, "detection_error"),
    ("detection.close.json", {"event": "error", "data": {"code": "stream_failed", "error": "audio stream ended"}},
     "detection_error"),
])
def test_silence_timeout_and_a_non_recoverable_error_hang_up(fixture, changes, outcome):
    result = play_call(lambda p: p.detection(fixture, **changes))
    assert_clean(result)
    assert result.updates() == [HANG_UP]
    assert "  outcome: " + outcome in result.lines


def test_a_recoverable_error_does_not_act():
    def script(p):
        p.detection("detection.close.json", event="error",
                    data={"code": "decoder_reset", "error": "audio decoder restarted", "recoverable": True})
        p.detection("detection.beep.json")
    result = play_call(script)
    assert_clean(result)
    assert "Detection error: code=decoder_reset error=audio decoder restarted recoverable=true" in result.lines
    assert result.updates() == [[("Twiml", play_twiml("Play", VM_AUDIO_URL))]]
    assert "  outcome: voicemail_on_beep" in result.lines


def test_only_one_action_when_events_race():
    def script(p):
        parallel(lambda: p.detection("detection.beep.json"),
                 lambda: p.detection("detection.live-person.json"),
                 lambda: p.detection("detection.voicemail.json", data={"type": "speech.silence"}))
    result = play_call(script, env={"DC_LIVE_TEXT": "Hello there"})
    assert_clean(result)
    assert len(result.updates()) == 1
    assert sum(1 for line in result.lines if line.startswith("  outcome: ")) == 1


def test_a_repeated_delivery_is_acted_on_once():
    def script(p):
        p.detection("detection.beep.json")
        p.detection("detection.beep.json")
        p.status("completed", "12")
    result = play_call(script, complete_on_update=False)
    assert_clean(result)
    assert len(result.updates()) == 1
    assert "  Detection webhooks: 1 received, 1 duplicates, 0 ignored" in result.lines


def test_another_call_id_is_ignored():
    def script(p):
        p.detection("detection.beep.json", call_id=OTHER_CALL_ID)
        p.status("completed", "9")
    result = play_call(script)
    assert_clean(result)
    assert result.updates() == []
    assert any(line.startswith("Ignored Detection beep for call_id " + OTHER_CALL_ID) for line in result.lines)
    assert "  Detection webhooks: 1 received, 0 duplicates, 1 ignored" in result.lines
    assert "  outcome: ended_before_action" in result.lines


@pytest.mark.parametrize("status", ["busy", "no-answer", "failed", "canceled"])
def test_not_answered_ends_with_no_update(status):
    result = play_call(lambda p: p.status(status))
    assert_clean(result)
    assert result.updates() == []
    assert "The call ended before any action (" + status + "). No update sent." in result.lines
    assert "  outcome: not_answered (" + status + ")" in result.lines


def test_an_update_after_the_call_ended_is_reported_not_raised():
    result = play_call(beep, update=(400, {"code": 21220, "message": "Call is not in-progress. Cannot redirect.",
                                           "status": 400}), complete_on_update=False,
                       changes={"wait_seconds": 1})
    assert result.code == 0
    assert any(line.startswith("The call had already ended (HTTP 400 | code: 21220") for line in result.lines)
    assert result.updates() == [[("Twiml", play_twiml("Play", VM_AUDIO_URL))]]


# --- No result before the deadline ---------------------------------------------


def test_no_webhook_at_all_hangs_up_at_the_deadline():
    result = play_call(None, changes={"wait_seconds": 0.5}, complete_on_update=False)
    assert result.code == 0
    assert NO_RESULT_MESSAGE in result.lines
    assert NO_WEBHOOK_MESSAGE in result.lines
    assert result.updates() == [HANG_UP]
    assert "  outcome: no_result" in result.lines


def test_a_webhook_with_no_verdict_still_hangs_up_at_the_deadline():
    result = play_call(lambda p: p.detection("detection.close.json"), changes={"wait_seconds": 0.8},
                       complete_on_update=False)
    assert result.code == 0
    assert NO_RESULT_MESSAGE in result.lines
    assert NO_WEBHOOK_MESSAGE not in result.lines
    assert result.updates() == [HANG_UP]


def test_a_404_on_the_deadline_hang_up_is_not_an_error():
    result = play_call(None, changes={"wait_seconds": 0.5}, complete_on_update=False, update=GONE)
    assert result.code == 0
    assert any(line.startswith("The call had already ended (HTTP 404") for line in result.lines)
    assert result.updates() == [HANG_UP]
    assert "  outcome: no_result" in result.lines


# --- Statuses before the CallSid is known --------------------------------------


def test_a_completed_status_that_beats_the_create_call_response_is_kept():
    holder: List[CallPlayer] = []
    early: List[int] = []

    def create_call(_recorded):
        early.append(holder[0].status("completed", "0").status_code)
        return 201, {"sid": CALL_SID, "status": "queued"}

    with MockApi() as dc_mock, MockApi() as twilio_mock:
        twilio_routes(twilio_mock, call=create_call)
        settings = load_detect_settings(base_env(dc_mock, twilio_mock))
        player = CallPlayer(twilio_mock)
        holder.append(player)
        lines: List[str] = []
        code = run_with_player(settings, player, lines)
    # The run ends on that status and closes the receiver, so the player's later TwiML fetch may fail.
    assert code == 0
    assert early == [200]
    assert "Twilio call status: completed" in lines
    assert "  outcome: ended_before_action" in lines
    assert "  CallDuration: 0" in lines
    assert twilio_mock.find("POST", UPDATE_PATH) == []


# --- finally -------------------------------------------------------------------


def interrupt_on(prefix: str) -> Callable[[str], None]:
    def out(line: str) -> None:
        if line.startswith(prefix):
            raise KeyboardInterrupt
    return out


def test_finally_hangs_up_a_call_that_is_still_up_and_deletes_the_temporary_key():
    result = play_call(None, temp=True, complete_on_update=False, out=interrupt_on("Call created"))
    assert isinstance(result.raised, KeyboardInterrupt)
    assert result.updates() == [HANG_UP]
    assert "Hung up the call." in result.lines
    assert result.dc.calls()[-1] == ("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID)
    assert "Temporary Detection key deleted." in result.lines


def test_finally_treats_a_404_hang_up_as_done():
    result = play_call(None, complete_on_update=False, out=interrupt_on("Call created"), update=GONE)
    assert isinstance(result.raised, KeyboardInterrupt)
    assert result.updates() == [HANG_UP]
    assert "The call had already ended." in result.lines


def test_finally_skips_the_hang_up_after_a_terminal_status():
    result = play_call(beep)
    assert len(result.updates()) == 1
    assert "Hung up the call." not in result.lines


def test_a_failed_key_deletion_exits_1_even_after_a_good_outcome():
    failure = (500, {"title": "Internal Server Error", "status": 500, "detail": "try again later"})
    result = play_call(beep, temp=True, delete_temp_key=failure)
    assert result.player.errors == []
    assert result.code == 1
    assert "  outcome: voicemail_on_beep" in result.lines
    assert any(line.startswith("Could not delete the temporary Detection key " + TEMP_KEY_ID)
               for line in result.lines)
    assert result.lines[-1] == CLEANUP_FAILED
    assert len(result.dc.find("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID)) == 1


def test_a_failed_hang_up_in_finally_exits_1():
    failure = (500, {"code": 20500, "message": "Internal Server Error", "status": 500})
    result = play_call(beep, complete_on_update=False, changes={"wait_seconds": 0.8},
                       update=[(200, {"sid": CALL_SID, "status": "in-progress"}), failure])
    assert result.code == 1
    assert "  outcome: voicemail_on_beep" in result.lines
    assert result.updates() == [[("Twiml", play_twiml("Play", VM_AUDIO_URL))], HANG_UP]
    assert any(line.startswith("Could not hang up the call: HTTP 500") for line in result.lines)
    assert result.lines[-1] == CLEANUP_FAILED


def test_a_temporary_key_that_is_already_gone_is_not_a_failure():
    result = play_call(beep, temp=True, delete_temp_key=(404, {"title": "Not Found", "status": 404}))
    assert result.code == 0
    assert "The temporary Detection key was already gone." in result.lines
    assert CLEANUP_FAILED not in result.lines


# --- The Detection key ---------------------------------------------------------


def test_with_dc_detection_key_no_drop_cowboy_request_is_made():
    result = play_call(beep)
    assert_clean(result)
    assert result.dc.requests == []
    assert "Using DC_DETECTION_KEY ending in ..." + DETECTION_KEY[-4:] + "." in result.lines


def test_temporary_key_list_delete_leftovers_create_then_delete():
    listed = [
        {"key_id": LEFTOVER_KEY_ID, "name": TEMPORARY_KEY_NAME, "key_hint": "a1b2", "status": "active"},
        {"key_id": OTHER_KEY_ID, "name": "Outbound dialer", "key_hint": "c3d4", "status": "active"},
    ]
    result = play_call(beep, temp=True, listed=listed)
    assert_clean(result)
    assert "  outcome: voicemail_on_beep" in result.lines
    assert result.dc.calls() == [
        ("GET", KEYS_PATH),
        ("DELETE", KEYS_PATH + "/" + LEFTOVER_KEY_ID),
        ("POST", KEYS_PATH),
        ("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID),
    ]
    assert result.dc.find("POST", KEYS_PATH)[0].body == {"name": TEMPORARY_KEY_NAME, "expires_in_seconds": 3600}
    assert '<Parameter name="api_key" value="' + TEMP_API_KEY + '"/>' in result.player.voice_response.text
    created = "Created a temporary Detection key: key_id " + TEMP_KEY_ID + ", key ending in ..." + TEMP_API_KEY[-4:]
    assert created + "." in result.lines
    assert "Temporary Detection key deleted." in result.lines


def test_a_leftover_that_is_already_gone_is_fine():
    listed = [{"key_id": LEFTOVER_KEY_ID, "name": TEMPORARY_KEY_NAME, "key_hint": "a1b2", "status": "active"}]
    with MockApi() as dc_mock, MockApi() as twilio_mock:
        twilio_routes(twilio_mock)
        key_routes(dc_mock, listed)
        dc_mock.route("DELETE", KEYS_PATH + "/" + LEFTOVER_KEY_ID, (404, {"title": "Not Found", "status": 404}))
        settings = load_detect_settings(temp_key_env(dc_mock, twilio_mock))
        player = CallPlayer(twilio_mock, beep, detection_key=TEMP_API_KEY)
        lines: List[str] = []
        assert run_with_player(settings, player, lines) == 0
    assert player.errors == []
    assert "  outcome: voicemail_on_beep" in lines
    assert [c[0] for c in dc_mock.calls()] == ["GET", "DELETE", "POST", "DELETE"]


# --- Preflight -----------------------------------------------------------------


def preflight(account=None, incoming=None, outgoing=None, temp=False):
    with MockApi() as dc_mock, MockApi() as twilio_mock:
        twilio_routes(twilio_mock, account=account, incoming=incoming, outgoing=outgoing)
        key_routes(dc_mock)
        settings = load_detect_settings((temp_key_env if temp else base_env)(dc_mock, twilio_mock))
        lines: List[str] = []
        with pytest.raises(RecipeStop) as caught:
            detect_twilio.run(settings, out=lines.append, health_base_url_for=lambda server: server.base_url)
    return str(caught.value), twilio_mock, dc_mock, lines


def test_a_trial_account_stops():
    message, twilio_mock, _dc, _lines = preflight(account={"sid": ACCOUNT_SID, "type": "Trial", "status": "active"})
    assert message == TRIAL_ACCOUNT
    assert twilio_mock.calls() == [("GET", ACCOUNT_PATH + ".json")]


def test_an_inactive_account_stops():
    message, twilio_mock, _dc, _lines = preflight(account={"sid": ACCOUNT_SID, "type": "Full",
                                                           "status": "suspended"})
    assert "status is suspended, not active" in message
    assert twilio_mock.calls() == [("GET", ACCOUNT_PATH + ".json")]


def test_neither_a_number_nor_a_caller_id_stops_before_any_call():
    message, twilio_mock, _dc, _lines = preflight(incoming=[], outgoing=[])
    assert message == NOT_ON_ACCOUNT
    assert twilio_mock.find("POST", CALLS_PATH) == []
    assert twilio_mock.calls()[-1] == ("GET", ACCOUNT_PATH + "/OutgoingCallerIds.json")


def test_a_stop_still_deletes_the_temporary_key():
    _message, twilio_mock, dc_mock, lines = preflight(incoming=[], outgoing=[], temp=True)
    assert dc_mock.calls()[-1] == ("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID)
    assert twilio_mock.find("POST", CALLS_PATH) == []
    assert "Temporary Detection key deleted." in lines


def test_an_incoming_number_passes_without_the_caller_id_call():
    result = play_call(beep)
    assert ("GET", ACCOUNT_PATH + "/OutgoingCallerIds.json") not in result.twilio.calls()
    assert "TWILIO_FROM " + TWILIO_FROM + " is a number in this Twilio account." in result.lines


def test_a_verified_caller_id_passes():
    result = play_call(beep, incoming=[], outgoing=[{"phone_number": TWILIO_FROM}])
    assert_clean(result)
    assert result.twilio.find("GET", ACCOUNT_PATH + "/OutgoingCallerIds.json")[0].query == {
        "PhoneNumber": TWILIO_FROM}
    assert "TWILIO_FROM " + TWILIO_FROM + " is a verified caller ID on this Twilio account." in result.lines
    assert len(result.updates()) == 1


def test_an_unreachable_tunnel_stops_before_the_call():
    with MockApi() as dc_mock, MockApi() as twilio_mock:
        twilio_routes(twilio_mock)
        settings = load_detect_settings(base_env(dc_mock, twilio_mock))
        with pytest.raises(RecipeStop) as caught:
            detect_twilio.run(settings, out=lambda _line: None,
                              health_base_url_for=lambda _server: "http://127.0.0.1:9")
    assert "did not reach this receiver" in str(caught.value)
    assert twilio_mock.find("POST", CALLS_PATH) == []


# --- main: exit codes, hints, and secrets ---------------------------------------


def run_main(monkeypatch, temp=True, healthy: Any = True, **routes):
    listed = routes.pop("listed", None)
    create = routes.pop("create", None)
    delete = routes.pop("delete", None)

    def health(_url):
        if isinstance(healthy, BaseException) or (isinstance(healthy, type) and issubclass(healthy, BaseException)):
            raise healthy
        return healthy

    monkeypatch.setattr(detect_twilio, "_healthy", health)
    with MockApi() as dc_mock, MockApi() as twilio_mock:
        twilio_routes(twilio_mock, **routes)
        key_routes(dc_mock, listed, create)
        if delete is not None:
            dc_mock.route("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID, delete)
        env = (temp_key_env if temp else base_env)(dc_mock, twilio_mock)
        code = detect_twilio.main(env)
    return code, dc_mock, twilio_mock


def assert_no_secrets(text: str) -> None:
    for secret in (AUTH_TOKEN, API_SECRET, DETECTION_KEY, TEMP_API_KEY, ACCOUNT_SID):
        assert secret not in text


def test_a_twilio_error_prints_its_hint_and_still_deletes_the_key(monkeypatch, capsys):
    code, dc_mock, twilio_mock = run_main(monkeypatch, call=(400, {
        "code": 21210, "status": 400, "more_info": "https://www.twilio.com/docs/errors/21210",
        "message": "The source phone number provided, " + TWILIO_FROM + ", is not yet verified for account "
                   + ACCOUNT_SID + ".",
    }))
    captured = capsys.readouterr()
    assert code == 1
    assert captured.out.startswith(CONSENT_LINE + "\n" + BILLING_LINE + "\n")
    assert "  code: 21210" in captured.err
    assert ("What to do: TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it."
            in captured.err)
    assert dc_mock.calls()[-1] == ("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID)
    assert twilio_mock.find("POST", UPDATE_PATH) == []
    assert_no_secrets(captured.out + captured.err)
    assert "Twilio account ..." + ACCOUNT_SID[-4:] + " is active." in captured.out


@pytest.mark.parametrize("code_value,hint", [
    ("byoc-required",
     "Detection keys need Building Blocks on your account. Enable Building Blocks, then run this again."),
    ("team-not-verified", "Finish verifying your account in the dashboard, then run this again."),
    ("trial_feature_blocked",
     "Detection keys are not available on a trial account. Choose a plan, then run this again."),
])
def test_a_refused_key_prints_its_hint(monkeypatch, capsys, code_value, hint):
    code, dc_mock, twilio_mock = run_main(monkeypatch, create=(403, {
        "type": "https://api-v2.dropcowboy.com/problems/forbidden", "title": "Forbidden", "status": 403,
        "detail": "Detection keys are not available for this account.", "details": {"code": code_value},
    }))
    captured = capsys.readouterr()
    assert code == 1
    assert "Detection keys are not available for this account." in captured.err
    assert code_value in captured.err
    assert "What to do: " + hint in captured.err
    assert twilio_mock.requests == []
    assert [c[0] for c in dc_mock.calls()] == ["GET", "POST"]
    assert_no_secrets(captured.out + captured.err)


def test_another_key_refusal_prints_no_hint(monkeypatch, capsys):
    code, _dc, _twilio = run_main(monkeypatch, create=(403, {
        "title": "Forbidden", "status": 403, "detail": "Missing scope.", "code": "insufficient_scope"}))
    captured = capsys.readouterr()
    assert code == 1
    assert "What to do:" not in captured.err


def test_ctrl_c_exits_130_after_the_clean_up(monkeypatch, capsys):
    code, dc_mock, twilio_mock = run_main(monkeypatch, healthy=KeyboardInterrupt)
    captured = capsys.readouterr()
    assert code == 130
    assert "Interrupted." in captured.err
    assert "Temporary Detection key deleted." in captured.out
    assert dc_mock.calls()[-1] == ("DELETE", KEYS_PATH + "/" + TEMP_KEY_ID)
    assert twilio_mock.find("POST", CALLS_PATH) == []


def test_ctrl_c_still_exits_130_when_a_clean_up_step_fails(monkeypatch, capsys):
    code, _dc, _twilio = run_main(monkeypatch, healthy=KeyboardInterrupt,
                                  delete=(500, {"title": "Internal Server Error", "status": 500}))
    captured = capsys.readouterr()
    assert code == 130
    assert "Could not delete the temporary Detection key " + TEMP_KEY_ID in captured.out


def test_a_thrown_error_still_deletes_the_key(monkeypatch, capsys):
    with pytest.raises(RuntimeError):
        run_main(monkeypatch, healthy=RuntimeError("boom"))
    captured = capsys.readouterr()
    assert "Temporary Detection key deleted." in captured.out


def test_a_trial_account_exits_1_with_the_message(monkeypatch, capsys):
    code, _dc, twilio_mock = run_main(monkeypatch, temp=False,
                                      account={"sid": ACCOUNT_SID, "type": "Trial", "status": "active"})
    captured = capsys.readouterr()
    assert code == 1
    assert TRIAL_ACCOUNT in captured.err
    assert twilio_mock.find("POST", CALLS_PATH) == []


def test_twilio_error_text_never_shows_the_full_account_sid(monkeypatch, capsys):
    code, _dc, _twilio = run_main(monkeypatch, temp=False, account=None, call=(401, {
        "code": 20003, "status": 401, "message": "Authenticate " + ACCOUNT_SID + " " + AUTH_TOKEN,
        "more_info": "https://www.twilio.com/docs/errors/20003?account=" + ACCOUNT_SID,
    }))
    captured = capsys.readouterr()
    assert code == 1
    assert "What to do: Twilio rejected TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN." in captured.err
    assert_no_secrets(captured.out + captured.err)


def test_a_full_run_prints_no_secret():
    result = play_call(beep, temp=True)
    assert_clean(result)
    assert "  outcome: voicemail_on_beep" in result.lines
    assert_no_secrets(result.text)
    assert "Twilio account ..." + ACCOUNT_SID[-4:] + " is active." in result.lines
