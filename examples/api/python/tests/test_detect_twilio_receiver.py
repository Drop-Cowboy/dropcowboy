"""detect-twilio: the four receiver routes, through the real HTTP stack on an ephemeral port.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import json
import time

import pytest
import requests

from dropcowboy_examples.detection import sign_detection, voice_twiml
from dropcowboy_examples.detection_receiver import DetectionReceiver
from dropcowboy_examples.receiver import EmbeddedServer

from .conftest import PUBLIC_URL
from .detect_support import (
    AUTH_TOKEN,
    CALL_SID,
    DETECTION_KEY,
    DETECTION_VECTORS,
    OTHER_CALL_ID,
    TWILIO_VECTORS,
    detection_body,
    post_detection,
    post_twilio,
    status_params,
    voice_params,
)

CALL_ID = "3a9e5c1f-7b2d-4e68-9f04-8c6a2e4b1d97"


def expected_twiml(detection_url="wss://detect.dropcowboy.com/carrier/ws/twilio", key=DETECTION_KEY,
                   strategy="standard", timeout=45, pause=75):
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        "<Response>\n"
        "  <Start>\n"
        '    <Stream name="detection" url="' + detection_url + '" track="inbound_track">\n'
        '      <Parameter name="api_key" value="' + key + '"/>\n'
        '      <Parameter name="webhook_url" value="' + PUBLIC_URL + '/webhooks/detection"/>\n'
        '      <Parameter name="webhook_events" value="detection,beep,screening,timeout,error,close"/>\n'
        '      <Parameter name="strategy" value="' + strategy + '"/>\n'
        '      <Parameter name="call_id" value="' + CALL_ID + '"/>\n'
        '      <Parameter name="detection_timeout_sec" value="' + str(timeout) + '"/>\n'
        "    </Stream>\n"
        "  </Start>\n"
        '  <Pause length="' + str(pause) + '"/>\n'
        "  <Hangup/>\n"
        "</Response>"
    )


def make_receiver(twiml=None, clock_ms=None, lines=None):
    twiml = twiml or voice_twiml("wss://detect.dropcowboy.com/carrier/ws/twilio", DETECTION_KEY, PUBLIC_URL,
                                 "standard", CALL_ID, 45, 20)
    out = lines.append if lines is not None else (lambda _line: None)
    return DetectionReceiver(PUBLIC_URL, AUTH_TOKEN, DETECTION_KEY, CALL_ID, twiml, clock_ms=clock_ms, out=out)


@pytest.fixture
def served():
    receiver = make_receiver()
    receiver.expect_call(CALL_SID)
    with EmbeddedServer(receiver) as server:
        yield receiver, server


# --- TwiML ---------------------------------------------------------------------


def test_voice_twiml_is_exact():
    twiml = voice_twiml("wss://detect.dropcowboy.com/carrier/ws/twilio", DETECTION_KEY, PUBLIC_URL, "standard",
                        CALL_ID, 45, 20)
    assert twiml == expected_twiml()


def test_voice_twiml_pause_and_settings():
    twiml = voice_twiml("wss://detect.dropcowboy.com/carrier/ws/twilio", DETECTION_KEY, PUBLIC_URL, "live_check",
                        CALL_ID, 30, 5)
    assert twiml == expected_twiml(strategy="live_check", timeout=30, pause=45)


def test_voice_twiml_escapes_attribute_values():
    twiml = voice_twiml("wss://detect.example.org/ws?a=1&b=2", "k&<>\"'y", PUBLIC_URL, "standard", CALL_ID, 45, 20)
    assert twiml == expected_twiml(detection_url="wss://detect.example.org/ws?a=1&amp;b=2",
                                   key="k&amp;&lt;&gt;&quot;&apos;y")


def test_voice_route_answers_the_twiml_as_text_xml(served):
    _receiver, server = served
    response = post_twilio(server.base_url, "/twilio/voice", voice_params())
    assert response.status_code == 200
    assert response.headers["Content-Type"].startswith("text/xml")
    assert response.text == expected_twiml()


@pytest.mark.parametrize("token,public_url,signature", [
    ("test-twilio-auth-token-not-real-0043", PUBLIC_URL, None),
    (AUTH_TOKEN, "https://other.example.test", None),
    (AUTH_TOKEN, PUBLIC_URL, "AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
])
def test_voice_route_refuses_a_bad_signature_with_an_empty_403(served, token, public_url, signature):
    _receiver, server = served
    response = post_twilio(server.base_url, "/twilio/voice", voice_params(), auth_token=token, public_url=public_url,
                           signature=signature)
    assert response.status_code == 403
    assert response.content == b""


def test_voice_route_refuses_a_missing_signature(served):
    _receiver, server = served
    response = requests.post(server.base_url + "/twilio/voice", data=voice_params(), timeout=5)
    assert response.status_code == 403
    assert response.content == b""


def test_the_signature_is_checked_against_the_public_url_not_the_local_host(served):
    _receiver, server = served
    response = post_twilio(server.base_url, "/twilio/voice", voice_params(), public_url=server.base_url)
    assert response.status_code == 403


def test_voice_route_refuses_another_call_sid(served):
    _receiver, server = served
    response = post_twilio(server.base_url, "/twilio/voice", voice_params("CA00000000000000000000000000000002"))
    assert response.status_code == 403


def test_voice_route_refuses_everything_before_the_call_exists():
    with EmbeddedServer(make_receiver()) as server:
        response = post_twilio(server.base_url, "/twilio/voice", voice_params())
    assert response.status_code == 403


# --- Detection webhooks --------------------------------------------------------


def test_a_signed_detection_event_is_recorded(served):
    receiver, server = served
    response = post_detection(server.base_url, detection_body("detection.beep.json", CALL_ID))
    assert response.status_code == 200
    assert response.json() == {"received": True}
    events = receiver.received_events()
    assert [(e.kind, e.name, e.ignored) for e in events] == [("detection", "beep", False)]
    assert events[0].data["duration_ms"] == 380


def test_the_vector_body_through_http():
    v = DETECTION_VECTORS
    receiver = DetectionReceiver(PUBLIC_URL, AUTH_TOKEN, v["detection_key"], "fa6de30e-9e3a-40c4-97fc-1fdad5f21338",
                                 "<Response/>", clock_ms=lambda: v["now_ms_valid"], out=lambda _line: None)
    with EmbeddedServer(receiver) as server:
        good = post_detection(server.base_url, v["raw_body"].encode(), timestamp_ms=v["timestamp_ms"],
                              signature=v["signature"])
        tampered = post_detection(server.base_url, v["tampered_raw_body"].encode(), timestamp_ms=v["timestamp_ms"],
                                  signature=v["signature"])
    assert good.status_code == 200
    assert tampered.status_code == 401 and tampered.json() == {"error": "invalid_signature"}


def test_a_stale_timestamp_answers_401():
    v = DETECTION_VECTORS
    receiver = make_receiver(clock_ms=lambda: v["now_ms_stale"])
    with EmbeddedServer(receiver) as server:
        response = post_detection(server.base_url, v["raw_body"].encode(), key=v["detection_key"],
                                  timestamp_ms=v["timestamp_ms"])
    assert response.status_code == 401
    assert response.json() == {"error": "stale_timestamp"}


@pytest.mark.parametrize("signature,timestamp,error", [
    (None, "now", "missing_signature"),
    ("good", None, "missing_signature"),
    ("good", "later", "stale_timestamp"),
    ("v1=hmac-sha256," + "0" * 64, "now", "invalid_signature"),
    ("sha256=" + "0" * 64, "now", "invalid_signature"),
])
def test_detection_route_401s(served, signature, timestamp, error):
    receiver, server = served
    raw = detection_body("detection.beep.json", CALL_ID)
    now = str(int(time.time() * 1000))
    headers = {"Content-Type": "application/json"}
    if timestamp is not None:
        headers["X-Timestamp"] = now if timestamp == "now" else timestamp
    if signature is not None:
        headers["X-Signature"] = sign_detection(DETECTION_KEY, now, raw) if signature == "good" else signature
    response = requests.post(server.base_url + "/webhooks/detection", data=raw, headers=headers, timeout=5)
    assert response.status_code == 401
    assert response.json() == {"error": error}
    assert receiver.received_events() == []


def test_a_signature_from_another_key_answers_401(served):
    _receiver, server = served
    response = post_detection(server.base_url, detection_body("detection.beep.json", CALL_ID),
                              key=DETECTION_VECTORS["other_detection_key"])
    assert response.status_code == 401
    assert response.json() == {"error": "invalid_signature"}


@pytest.mark.parametrize("body", [b"[1,2]", b'"text"', b"12", b"not json", b""])
def test_a_signed_body_that_is_not_an_object_answers_400(served, body):
    receiver, server = served
    response = post_detection(server.base_url, body)
    assert response.status_code == 400
    assert receiver.received_events() == []


def test_a_repeated_delivery_id_is_a_duplicate(served):
    receiver, server = served
    raw = detection_body("detection.voicemail.json", CALL_ID)
    first = post_detection(server.base_url, raw)
    second = post_detection(server.base_url, raw)
    assert first.json() == {"received": True}
    assert second.status_code == 200
    assert second.json() == {"received": True, "duplicate": True}
    assert len(receiver.received_events()) == 1
    counts = receiver.counts()
    assert (counts.received, counts.duplicates, counts.ignored) == (1, 1, 0)


def test_the_delivery_id_header_dedupes_when_the_body_has_none(served):
    receiver, server = served
    body = json.loads(detection_body("detection.voicemail.json", CALL_ID))
    del body["delivery_id"]
    raw = json.dumps(body).encode()
    headers = {"X-Delivery-Id": "7c3e9a1f-5b2d-4e80-9a6c-1d3f5b7e9c24"}
    first = post_detection(server.base_url, raw, headers=headers)
    second = post_detection(server.base_url, raw, headers=headers)
    assert first.json() == {"received": True}
    assert second.json() == {"received": True, "duplicate": True}
    assert len(receiver.received_events()) == 1


def test_another_call_id_is_recorded_as_ignored_and_logged():
    lines = []
    receiver = make_receiver(lines=lines)
    with EmbeddedServer(receiver) as server:
        response = post_detection(server.base_url, detection_body("detection.beep.json", OTHER_CALL_ID))
    assert response.json() == {"received": True}
    events = receiver.received_events()
    assert len(events) == 1 and events[0].ignored
    assert receiver.counts().ignored == 1
    assert any("Ignored Detection beep for call_id " + OTHER_CALL_ID in line for line in lines)


# --- Twilio status -------------------------------------------------------------


def test_a_signed_status_is_recorded_with_its_duration(served):
    receiver, server = served
    response = post_twilio(server.base_url, "/twilio/status", status_params("completed", "21"))
    assert response.status_code == 200
    assert response.content == b""
    events = receiver.received_events()
    assert [(e.kind, e.name, e.call_sid) for e in events] == [("status", "completed", CALL_SID)]
    assert events[0].data == {"CallStatus": "completed", "CallDuration": "21"}


def test_status_without_duration(served):
    receiver, server = served
    post_twilio(server.base_url, "/twilio/status", status_params("ringing"))
    assert receiver.received_events()[0].data == {"CallStatus": "ringing"}


def test_status_with_a_bad_or_missing_signature_answers_403(served):
    receiver, server = served
    bad = post_twilio(server.base_url, "/twilio/status", status_params("completed"),
                      signature=TWILIO_VECTORS["signature_from_other_token"])
    missing = requests.post(server.base_url + "/twilio/status", data=status_params("completed"), timeout=5)
    assert bad.status_code == 403 and missing.status_code == 403
    assert receiver.received_events() == []


def test_a_status_before_the_call_sid_is_known_is_kept_with_its_call_sid():
    receiver = make_receiver()
    with EmbeddedServer(receiver) as server:
        response = post_twilio(server.base_url, "/twilio/status", status_params("completed", "0"))
    assert response.status_code == 200
    events = receiver.received_events()
    assert [(e.kind, e.name, e.call_sid) for e in events] == [("status", "completed", CALL_SID)]


def test_status_for_another_call_is_not_recorded(served):
    receiver, server = served
    response = post_twilio(server.base_url, "/twilio/status",
                           status_params("completed", call_sid="CA00000000000000000000000000000002"))
    assert response.status_code == 200
    assert receiver.received_events() == []


def test_health(served):
    _receiver, server = served
    assert requests.get(server.base_url + "/health", timeout=5).json() == {"ok": True}


def test_the_fixture_status_verifies_against_its_vector_url():
    receiver = DetectionReceiver("https://tunnel.example.org", TWILIO_VECTORS["auth_token"], DETECTION_KEY, CALL_ID,
                                 "<Response/>", out=lambda _line: None)
    receiver.expect_call(CALL_SID)
    with EmbeddedServer(receiver) as server:
        response = requests.post(server.base_url + "/twilio/status", data=TWILIO_VECTORS["params"],
                                 headers={"X-Twilio-Signature": TWILIO_VECTORS["signature"]}, timeout=5)
    assert response.status_code == 200
    assert receiver.received_events()[0].data == {"CallStatus": "completed", "CallDuration": "21"}
