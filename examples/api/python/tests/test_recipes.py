"""Each recipe against the mock API: ordered requests and exact POST /rvm bodies.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import re
import uuid

import pytest
import requests

from dropcowboy_examples.config import CALLBACK_PATH, WEBHOOK_PATH, ConfigError
from dropcowboy_examples.receiver import EmbeddedServer, Receiver
from dropcowboy_examples.recipes import (
    send_rvm_byoc,
    send_rvm_byoc_local_presence,
    send_rvm_retail,
    send_rvm_tts,
)

from .conftest import (
    API_KEY,
    API_SECRET,
    AUDIO_URL,
    CALLER_ID,
    LINE_ID,
    MEDIA_ID,
    PUBLIC_URL,
    RECIPIENT,
    SENT_FROM,
    VOICE_ID,
)

UUID_V4 = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$")
MESSAGE_ID = "7e2a9c4d-1b6f-4a38-8d05-9c3e5b7a1f24"
NEW_LINE_ID = "1b5d9f3a-7c2e-4a64-8e08-4d6b2f9a3c71"
IMPORT_JOB_ID = "1d5b9f3e-7a2c-4e8d-b6f1-3c7a9e5d2b84"

QUEUED = (202, {"status": "queued", "message_id": MESSAGE_ID})


def ok(data):
    return 200, {"data": data, "meta": {"request_id": "c2a6e8f4-3b9d-4c1e-8a7f-5d3b1e9c6a24"}}


def rvm_body(mock):
    sends = mock.find("POST", "/rvm")
    assert len(sends) == 1
    return sends[0].body


def assert_send_headers(mock):
    send = mock.find("POST", "/rvm")[0]
    assert send.headers["x-key"] == API_KEY
    assert send.headers["x-secret"] == API_SECRET
    assert UUID_V4.match(send.headers["idempotency-key"])


def assert_foreign_id(body):
    assert UUID_V4.match(body["foreign_id"])


# --- retail -------------------------------------------------------------------


def test_retail_with_everything_set(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID)

    assert send_rvm_retail.run(config, make_client(config), out=lambda _l: None) == 0

    assert mock.calls() == [("POST", "/rvm")]
    body = rvm_body(mock)
    assert_foreign_id(body)
    assert body == {"to": RECIPIENT, "phone_line_id": LINE_ID, "media_id": MEDIA_ID, "foreign_id": body["foreign_id"]}
    assert_send_headers(mock)


def test_retail_looks_up_the_default_line_and_first_media(mock, make_config, make_client):
    mock.route("GET", "/phone/public/lines", ok([
        {"ivr_id": "0f4b8d2a-6c1e-4793-9a5d-3e7b1c9f2a58", "name": "Other"},
        {"ivr_id": LINE_ID, "name": "Main", "default": True},
    ]))
    mock.route("GET", "/media/public/media", ok({"medias": [{"media_id": MEDIA_ID}]}))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config()

    send_rvm_retail.run(config, make_client(config), out=lambda _l: None)

    assert mock.calls() == [
        ("GET", "/phone/public/lines"),
        ("GET", "/media/public/media"),
        ("POST", "/rvm"),
    ]
    body = rvm_body(mock)
    assert body["phone_line_id"] == LINE_ID
    assert body["media_id"] == MEDIA_ID


def test_retail_accepts_the_stored_field_name_is_default(mock, make_config, make_client):
    mock.route("GET", "/phone/public/lines", ok([{"ivr_id": LINE_ID, "is_default": True}]))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_MEDIA_ID=MEDIA_ID)

    send_rvm_retail.run(config, make_client(config), out=lambda _l: None)

    assert rvm_body(mock)["phone_line_id"] == LINE_ID


def test_retail_without_a_default_line_stops_before_sending(mock, make_config, make_client):
    mock.route("GET", "/phone/public/lines", ok([{"ivr_id": LINE_ID, "default": False}]))
    config = make_config(DC_MEDIA_ID=MEDIA_ID)

    with pytest.raises(ConfigError, match="4010"):
        send_rvm_retail.run(config, make_client(config), out=lambda _l: None)

    assert mock.find("POST", "/rvm") == []


def test_retail_sends_audio_url_when_it_is_the_only_audio_and_says_when_the_api_accepts_it(
        mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_AUDIO_URL=AUDIO_URL, DC_CALLER_ID=CALLER_ID,
                         DC_WAIT_SECONDS="0")
    lines = []

    send_rvm_retail.run(config, make_client(config), out=lines.append)

    body = rvm_body(mock)
    assert sorted(body) == ["audio_url", "foreign_id", "phone_line_id", "to"]
    assert body["audio_url"] == AUDIO_URL
    text = "\n".join(lines)
    assert "audio_url is an option for BYOC plans only and must be enabled by support." in text
    assert "you can then send only to your test numbers" in text


def test_retail_audio_precedence_media_over_tts_and_audio_url(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_TTS_BODY="Hello", DC_VOICE_ID=VOICE_ID,
                         DC_AUDIO_URL=AUDIO_URL)

    send_rvm_retail.run(config, make_client(config), out=lambda _l: None)

    body = rvm_body(mock)
    assert body["media_id"] == MEDIA_ID
    assert "tts_body" not in body and "voice_id" not in body and "audio_url" not in body


def test_callback_url_is_added_only_when_a_public_url_is_set(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    lines = []
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_WAIT_SECONDS="0")

    send_rvm_retail.run(config, make_client(config), out=lines.append)

    assert "callback_url" not in rvm_body(mock)
    assert any("DC_PUBLIC_URL" in line for line in lines)


def test_retail_waits_for_the_callback_and_prints_the_result(mock, make_config, make_client, callback_fixture):
    mock.route("POST", "/rvm", QUEUED)
    receiver = Receiver([], out=lambda _l: None)
    with EmbeddedServer(receiver) as server:
        def post_callback(recorded):
            payload = dict(callback_fixture, foreign_id=recorded.body["foreign_id"])
            requests.post(server.base_url + CALLBACK_PATH, json=payload, timeout=5)

        mock.after("POST", "/rvm", post_callback)
        config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_PUBLIC_URL=PUBLIC_URL)
        lines = []

        send_rvm_retail.run(config, make_client(config), out=lines.append, receiver=receiver)

    body = rvm_body(mock)
    assert body["callback_url"] == PUBLIC_URL + CALLBACK_PATH
    text = "\n".join(lines)
    assert "Accepted by the API (202" in text
    assert "status: success" in text
    assert "sent from: " + SENT_FROM in text
    assert "delivered" not in text.lower()


def test_a_callback_for_another_send_is_not_taken_as_the_result(mock, make_config, make_client, callback_fixture):
    mock.route("POST", "/rvm", QUEUED)
    receiver = Receiver([], out=lambda _l: None)
    with EmbeddedServer(receiver) as server:
        def post_stray(_recorded):
            requests.post(server.base_url + CALLBACK_PATH, json=callback_fixture, timeout=5)

        mock.after("POST", "/rvm", post_stray)
        config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_PUBLIC_URL=PUBLIC_URL,
                             DC_WAIT_SECONDS="1")
        lines = []

        send_rvm_retail.run(config, make_client(config), out=lines.append, receiver=receiver)

    assert any(line.startswith("No result arrived within 1 seconds") for line in lines)


def test_retail_waits_for_a_status_webhook_matched_on_the_recipient(mock, make_config, make_client, vectors):
    mock.route("POST", "/rvm", QUEUED)
    receiver = Receiver([vectors["secret"]], clock=lambda: float(vectors["timestamp"]), out=lambda _l: None)
    with EmbeddedServer(receiver) as server:
        def post_webhook(_recorded):
            requests.post(
                server.base_url + WEBHOOK_PATH,
                data=vectors["raw_body"].encode("utf-8"),
                headers={"X-Signature": vectors["signature"], "X-Timestamp": vectors["timestamp"]},
                timeout=5,
            )

        mock.after("POST", "/rvm", post_webhook)
        config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_PUBLIC_URL=PUBLIC_URL)
        lines = []

        send_rvm_retail.run(config, make_client(config), out=lines.append, receiver=receiver)

    text = "\n".join(lines)
    assert "Result from the webhook" in text
    assert "sent from: +12125550100" in text


def test_the_embedded_receiver_is_started_and_stopped_by_the_recipe(mock, make_config, make_client):
    mock.route("GET", "/register/public/account/webhook-signing-secret",
               ok([{"webhook_id": "5c9e3a7f-2b6d-4e1a-8f4c-9d3b7e1a5c62", "event_types": ["contact.rvm.status"],
                    "hook_type": "contact.rvm.status", "signing_secret": "d0c4a8e2-6b1f-4d37-9a05-7e3b5c1f9a99"}]))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_PUBLIC_URL=PUBLIC_URL,
                         DC_WAIT_SECONDS="1", PORT="0")
    lines = []

    send_rvm_retail.run(config, make_client(config), out=lines.append)

    assert mock.calls() == [("GET", "/register/public/account/webhook-signing-secret"), ("POST", "/rvm")]
    assert any(line.startswith("Receiver listening on http://127.0.0.1:") for line in lines)
    port = int(re.search(r"127\.0\.0\.1:(\d+)", "\n".join(lines)).group(1))
    with pytest.raises(requests.ConnectionError):
        requests.get("http://127.0.0.1:" + str(port) + "/health", timeout=2)
    assert "d0c4a8e2-6b1f-4d37-9a05-7e3b5c1f9a99" not in "\n".join(lines)
    assert "9a99" in "\n".join(lines)


# --- bring your own carrier ---------------------------------------------------


def test_byoc_sends_caller_id_and_no_phone_line(mock, make_config, make_client):
    mock.route("GET", "/integration/public/byoc", ok({"connected": True, "provider": "custom"}))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_CALLER_ID=CALLER_ID, DC_AUDIO_URL=AUDIO_URL)

    assert send_rvm_byoc.run(config, make_client(config), out=lambda _l: None) == 0

    assert mock.calls() == [("GET", "/integration/public/byoc"), ("POST", "/rvm")]
    body = rvm_body(mock)
    assert body == {"to": RECIPIENT, "caller_id": CALLER_ID, "audio_url": AUDIO_URL, "foreign_id": body["foreign_id"]}
    assert "phone_line_id" not in body
    assert_send_headers(mock)


def test_byoc_passes_sti_options(mock, make_config, make_client):
    mock.route("GET", "/integration/public/byoc", ok({"connected": True}))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_CALLER_ID=CALLER_ID, DC_AUDIO_URL=AUDIO_URL,
                         DC_STI_ORIG_ID="c3a8e1f5-9b2d-4764-8e0a-5d1f7b3c9a26",
                         DC_STI_ATTESTATION="B")

    send_rvm_byoc.run(config, make_client(config), out=lambda _l: None)

    assert rvm_body(mock)["byoc"] == {
        "sti_orig_id": "c3a8e1f5-9b2d-4764-8e0a-5d1f7b3c9a26",
        "sti_attestation": "B",
    }


def test_byoc_stops_when_no_carrier_is_connected(mock, make_config, make_client):
    mock.route("GET", "/integration/public/byoc", ok({"connected": False}))
    config = make_config(DC_CALLER_ID=CALLER_ID, DC_AUDIO_URL=AUDIO_URL)

    with pytest.raises(ConfigError, match="bring-your-own-carrier"):
        send_rvm_byoc.run(config, make_client(config), out=lambda _l: None)

    assert mock.find("POST", "/rvm") == []


def test_byoc_requires_a_caller_id_and_audio(mock, make_config, make_client):
    with pytest.raises(ConfigError, match="DC_CALLER_ID"):
        send_rvm_byoc.run(make_config(DC_AUDIO_URL=AUDIO_URL), make_client(make_config()), out=lambda _l: None)
    with pytest.raises(ConfigError, match="DC_AUDIO_URL"):
        send_rvm_byoc.run(make_config(DC_CALLER_ID=CALLER_ID), make_client(make_config()), out=lambda _l: None)
    assert mock.requests == []


# --- text to speech -----------------------------------------------------------


def test_tts_retail_body_has_no_other_audio_field(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_VOICE_ID=VOICE_ID, DC_TTS_BODY="Your table is ready.",
                         DC_MEDIA_ID=MEDIA_ID, DC_AUDIO_URL=AUDIO_URL)

    send_rvm_tts.run(config, make_client(config), out=lambda _l: None)

    assert mock.calls() == [("POST", "/rvm")]
    body = rvm_body(mock)
    assert body == {"to": RECIPIENT, "phone_line_id": LINE_ID, "tts_body": "Your table is ready.",
                    "voice_id": VOICE_ID, "foreign_id": body["foreign_id"]}
    assert_send_headers(mock)


def test_tts_byoc_mode_sends_caller_id(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_MODE="byoc", DC_CALLER_ID=CALLER_ID, DC_VOICE_ID=VOICE_ID, DC_TTS_BODY="Hello there.")

    send_rvm_tts.run(config, make_client(config), out=lambda _l: None)

    body = rvm_body(mock)
    assert body["caller_id"] == CALLER_ID
    assert "phone_line_id" not in body and "media_id" not in body and "audio_url" not in body


def test_tts_picks_the_first_ready_voice(mock, make_config, make_client):
    mock.route("GET", "/voice/public/voices", ok({"voices": [
        {"voice_id": "a1111111-1111-4111-8111-111111111111", "status": "processing"},
        {"voice_id": VOICE_ID, "status": "ready"},
    ]}))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_TTS_BODY="Hello there.")

    send_rvm_tts.run(config, make_client(config), out=lambda _l: None)

    assert mock.calls() == [("GET", "/voice/public/voices"), ("POST", "/rvm")]
    assert rvm_body(mock)["voice_id"] == VOICE_ID


def test_tts_with_no_ready_voice_stops(mock, make_config, make_client):
    mock.route("GET", "/voice/public/voices", ok({"voices": []}))
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_TTS_BODY="Hello there.")

    with pytest.raises(ConfigError, match="voice"):
        send_rvm_tts.run(config, make_client(config), out=lambda _l: None)

    assert mock.find("POST", "/rvm") == []


def test_tts_preview_runs_before_the_send(mock, make_config, make_client):
    mock.route("POST", "/voice/public/tts/synthesize", ok({
        "audio_url": "https://example.com/preview.mp3", "expires_at": "2026-10-07T12:00:00.000Z", "tts_characters": 12,
    }))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_VOICE_ID=VOICE_ID, DC_TTS_BODY="Hello there.", DC_PREVIEW="yes")
    lines = []

    send_rvm_tts.run(config, make_client(config), out=lines.append)

    assert mock.calls() == [("POST", "/voice/public/tts/synthesize"), ("POST", "/rvm")]
    assert mock.requests[0].body == {"voice_id": VOICE_ID, "text": "Hello there."}
    text = "\n".join(lines)
    assert "tts_characters: 12" in text and "billed per character" in text


def test_tts_over_1200_characters_is_refused_before_any_call(mock, make_config, make_client):
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_VOICE_ID=VOICE_ID, DC_TTS_BODY="a" * 1201)

    with pytest.raises(ConfigError, match="limit is 1200"):
        send_rvm_tts.run(config, make_client(config), out=lambda _l: None)

    assert mock.requests == []


def test_tts_exactly_1200_characters_is_allowed(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_VOICE_ID=VOICE_ID, DC_TTS_BODY="a" * 1200)

    send_rvm_tts.run(config, make_client(config), out=lambda _l: None)

    assert len(rvm_body(mock)["tts_body"]) == 1200


# --- local presence -----------------------------------------------------------


def local_presence_routes(mock, job_responses=None, line_numbers=None):
    mock.route("GET", "/phone/public/lines", ok([]))
    mock.route("POST", "/phone/public/lines", (201, {"data": {"ivr_id": NEW_LINE_ID, "name": "Local presence"}}))
    mock.route("POST", "/phone/public/numbers/import", (202, {"data": {"long_job_id": IMPORT_JOB_ID}}))
    mock.route(
        "GET", "/phone/public/numbers/import/" + IMPORT_JOB_ID,
        *(job_responses or [ok({"long_job_id": IMPORT_JOB_ID, "status": "completed",
                                "result": {"added": 2, "updated": 0, "invalid": 0, "conflicts": 0}})])
    )
    mock.route("POST", "/phone/public/numbers/available", ok([
        {"phone_number": "+12125550111"}, {"phone_number": "+12125550112"},
    ]))
    mock.route("POST", "/phone/public/numbers/rent", ok({"numbers": ["+12125550111", "+13125550122"]}))
    mock.route("GET", "/phone/public/lines/" + NEW_LINE_ID + "/numbers",
               ok(line_numbers if line_numbers is not None else [{"phone_number": "+12125550100"}]))
    mock.route("POST", "/rvm", QUEUED)


def test_local_presence_full_sequence_without_renting(mock, make_config, make_client):
    local_presence_routes(mock, job_responses=[
        ok({"long_job_id": IMPORT_JOB_ID, "status": "processing"}),
        ok({"long_job_id": IMPORT_JOB_ID, "status": "completed",
            "result": {"added": 2, "updated": 0, "invalid": 0, "conflicts": 0}}),
    ])
    config = make_config(DC_AUDIO_URL=AUDIO_URL, DC_NUMBERS="+13125550161,+13125550101", DC_AREA_CODES="212,312")
    lines = []

    assert send_rvm_byoc_local_presence.run(config, make_client(config), out=lines.append, poll_seconds=0) == 0

    assert mock.calls() == [
        ("GET", "/phone/public/lines"),
        ("POST", "/phone/public/lines"),
        ("POST", "/phone/public/numbers/import"),
        ("GET", "/phone/public/numbers/import/" + IMPORT_JOB_ID),
        ("GET", "/phone/public/numbers/import/" + IMPORT_JOB_ID),
        ("POST", "/phone/public/numbers/available"),
        ("POST", "/phone/public/numbers/available"),
        ("GET", "/phone/public/lines/" + NEW_LINE_ID + "/numbers"),
        ("POST", "/rvm"),
    ]
    assert mock.find("GET", "/phone/public/lines")[0].query == {"search_term": "Local presence", "type": "voice"}
    create = mock.find("POST", "/phone/public/lines")[0]
    assert create.body == {"name": "Local presence", "type": "voice"}
    assert "idempotency-key" not in create.headers
    for request in mock.requests:
        if request.method == "POST" and request.path != "/rvm":
            assert "idempotency-key" not in request.headers, request.path
    assert mock.find("POST", "/phone/public/numbers/import")[0].body == {
        "phone_numbers": ["+13125550161", "+13125550101"], "phone_line_id": NEW_LINE_ID}
    assert [r.body for r in mock.find("POST", "/phone/public/numbers/available")] == [
        {"country_iso": "US", "pattern": "212", "type": "local", "limit": 3},
        {"country_iso": "US", "pattern": "312", "type": "local", "limit": 3},
    ]
    assert mock.find("POST", "/phone/public/numbers/rent") == []
    assert any("Dry run: set DC_RENT=yes" in line for line in lines)
    assert any("added 2" in line for line in lines)

    body = rvm_body(mock)
    assert body == {"to": RECIPIENT, "phone_line_id": NEW_LINE_ID, "audio_url": AUDIO_URL,
                    "foreign_id": body["foreign_id"]}
    assert "caller_id" not in body
    assert_send_headers(mock)


def test_local_presence_rents_only_when_asked(mock, make_config, make_client):
    local_presence_routes(mock)
    config = make_config(DC_AUDIO_URL=AUDIO_URL, DC_AREA_CODES="212", DC_RENT="yes")

    send_rvm_byoc_local_presence.run(config, make_client(config), out=lambda _l: None, poll_seconds=0)

    rents = mock.find("POST", "/phone/public/numbers/rent")
    assert len(rents) == 1
    assert rents[0].body == {"numbers": ["+12125550111"], "voice_ivr_id": NEW_LINE_ID}
    calls = mock.calls()
    assert calls.index(("POST", "/phone/public/numbers/rent")) < calls.index(("POST", "/rvm"))


@pytest.mark.parametrize("value", ["", "no", "YES", "true", "1", "y"])
def test_local_presence_does_not_rent_for_anything_but_yes(mock, make_config, make_client, value):
    local_presence_routes(mock)
    config = make_config(DC_AUDIO_URL=AUDIO_URL, DC_AREA_CODES="212", DC_RENT=value)

    send_rvm_byoc_local_presence.run(config, make_client(config), out=lambda _l: None, poll_seconds=0)

    assert mock.find("POST", "/phone/public/numbers/rent") == []


def test_local_presence_reuses_a_line_with_the_same_name(mock, make_config, make_client):
    local_presence_routes(mock)
    mock.route("GET", "/phone/public/lines", ok([
        {"ivr_id": "5f1a3c7e-9b2d-4e64-8a08-1d3b5f7a9c42", "name": "Local presence extra", "type": "voice"},
        {"ivr_id": NEW_LINE_ID, "name": "Local presence", "type": "voice"},
    ]))
    config = make_config(DC_AUDIO_URL=AUDIO_URL)

    send_rvm_byoc_local_presence.run(config, make_client(config), out=lambda _l: None, poll_seconds=0)

    assert mock.find("POST", "/phone/public/lines") == []
    assert rvm_body(mock)["phone_line_id"] == NEW_LINE_ID


def test_local_presence_uses_dc_phone_line_id_without_searching(mock, make_config, make_client):
    local_presence_routes(mock)
    mock.route("GET", "/phone/public/lines/" + LINE_ID + "/numbers", ok([{"phone_number": "+12125550100"}]))
    config = make_config(DC_AUDIO_URL=AUDIO_URL, DC_PHONE_LINE_ID=LINE_ID)

    send_rvm_byoc_local_presence.run(config, make_client(config), out=lambda _l: None, poll_seconds=0)

    assert mock.calls() == [("GET", "/phone/public/lines/" + LINE_ID + "/numbers"), ("POST", "/rvm")]
    assert rvm_body(mock)["phone_line_id"] == LINE_ID


def test_local_presence_stops_when_the_import_fails(mock, make_config, make_client):
    local_presence_routes(mock, job_responses=[
        ok({"long_job_id": IMPORT_JOB_ID, "status": "processing"}),
        ok({"long_job_id": IMPORT_JOB_ID, "status": "failed", "error": "carrier rejected the file"}),
    ])
    config = make_config(DC_AUDIO_URL=AUDIO_URL, DC_NUMBERS="+13125550161")

    with pytest.raises(ConfigError, match="carrier rejected the file"):
        send_rvm_byoc_local_presence.run(config, make_client(config), out=lambda _l: None, poll_seconds=0)

    assert mock.find("POST", "/rvm") == []


def test_local_presence_stops_when_the_line_has_no_numbers(mock, make_config, make_client):
    local_presence_routes(mock, line_numbers=[])
    config = make_config(DC_AUDIO_URL=AUDIO_URL)

    with pytest.raises(ConfigError, match="no numbers"):
        send_rvm_byoc_local_presence.run(config, make_client(config), out=lambda _l: None, poll_seconds=0)

    assert mock.find("POST", "/rvm") == []


def test_local_presence_explains_the_pick_in_plain_words(mock, make_config, make_client, callback_fixture):
    local_presence_routes(mock)
    receiver = Receiver([], out=lambda _l: None)
    with EmbeddedServer(receiver) as server:
        def post_callback(recorded):
            payload = dict(callback_fixture, foreign_id=recorded.body["foreign_id"])
            requests.post(server.base_url + CALLBACK_PATH, json=payload, timeout=5)

        mock.after("POST", "/rvm", post_callback)
        config = make_config(DC_AUDIO_URL=AUDIO_URL, DC_PUBLIC_URL=PUBLIC_URL)
        lines = []

        send_rvm_byoc_local_presence.run(config, make_client(config), out=lines.append, receiver=receiver,
                                         poll_seconds=0)

    text = "\n".join(lines)
    assert "The platform picked " + SENT_FROM + " from your line." in text
    assert "closest to the recipient" in text
    assert "falls back to a number on the line" in text
    assert "Always identify your business location truthfully when asked by recipients." in text
    assert "answer rate" not in text.lower()


# --- the outputs never carry the credentials ----------------------------------


def test_credentials_and_signing_secrets_never_appear_in_output(mock, make_config, make_client, capsys, vectors):
    mock.route("GET", "/register/public/account/webhook-signing-secret",
               ok([{"webhook_id": "5c9e3a7f-2b6d-4e1a-8f4c-9d3b7e1a5c62",
                    "event_types": ["contact.rvm.status", "contact.rvm.receipt"], "hook_type": None,
                    "signing_secret": vectors["secret"]}]))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_PUBLIC_URL=PUBLIC_URL, DC_WAIT_SECONDS="1",
                         PORT="0")

    send_rvm_retail.run(config, make_client(config))

    captured = capsys.readouterr()
    everything = captured.out + captured.err
    assert "Loaded 1 signing secret(s)" in everything
    assert API_SECRET not in everything
    assert vectors["secret"] not in everything
    assert vectors["secret"][-4:] in everything


def test_an_api_error_prints_status_title_detail_code_and_request_id_but_no_secret(
        mock, monkeypatch, capsys):
    problem = {"title": "Forbidden", "status": 403, "detail": "This account is not a bring-your-own-carrier account.",
               "code": "byoc_required", "meta": {"request_id": "9b4d2f6a-8c1e-4a73-8d50-2e6f1b3a7c94"}}
    mock.route("POST", "/rvm", (403, problem))
    for name, value in (("DC_KEY", API_KEY), ("DC_SECRET", API_SECRET), ("DC_BASE_URL", mock.base_url),
                        ("DC_TO", RECIPIENT), ("DC_PHONE_LINE_ID", LINE_ID), ("DC_MEDIA_ID", MEDIA_ID)):
        monkeypatch.setenv(name, value)

    exit_code = send_rvm_retail.main()

    captured = capsys.readouterr()
    assert exit_code == 1
    for expected in ("status: 403", "title: Forbidden", "detail: This account is not", "code: byoc_required",
                     "request id: 9b4d2f6a-8c1e-4a73-8d50-2e6f1b3a7c94"):
        assert expected in captured.err
    assert API_SECRET not in captured.out + captured.err
    assert "x-secret" not in (captured.out + captured.err).lower()


def test_missing_credentials_exit_1_with_a_setup_message(monkeypatch, capsys):
    for name in ("DC_KEY", "DC_SECRET"):
        monkeypatch.delenv(name, raising=False)

    exit_code = send_rvm_retail.main()

    assert exit_code == 1
    assert "DC_KEY" in capsys.readouterr().err


def test_idempotency_keys_are_fresh_for_every_send(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID)
    client = make_client(config)

    send_rvm_retail.run(config, client, out=lambda _l: None)
    send_rvm_retail.run(config, client, out=lambda _l: None)

    first, second = mock.find("POST", "/rvm")
    assert first.headers["idempotency-key"] != second.headers["idempotency-key"]
    assert first.body["foreign_id"] != second.body["foreign_id"]
    assert uuid.UUID(first.body["foreign_id"]).version == 4


# --- the consent line ---------------------------------------------------------

CONSENT_LINE = "Send only to people who agreed to hear from you. Test with numbers you own."

RECIPES = [
    (send_rvm_retail, {"DC_PHONE_LINE_ID": LINE_ID, "DC_MEDIA_ID": MEDIA_ID}),
    (send_rvm_byoc, {"DC_CALLER_ID": CALLER_ID, "DC_AUDIO_URL": AUDIO_URL}),
    (send_rvm_tts, {"DC_PHONE_LINE_ID": LINE_ID, "DC_VOICE_ID": VOICE_ID, "DC_TTS_BODY": "Hello there."}),
    (send_rvm_byoc_local_presence, {"DC_PHONE_LINE_ID": LINE_ID, "DC_AUDIO_URL": AUDIO_URL}),
]


def use_environment(monkeypatch, mock, extra):
    values = {"DC_KEY": API_KEY, "DC_SECRET": API_SECRET, "DC_BASE_URL": mock.base_url, "DC_TO": RECIPIENT,
              "DC_WAIT_SECONDS": "0"}
    values.update(extra)
    for name in ("DC_PUBLIC_URL", "DC_PHONE_LINE_ID", "DC_MEDIA_ID", "DC_CALLER_ID", "DC_AUDIO_URL", "DC_VOICE_ID",
                 "DC_TTS_BODY", "DC_AUDIO_FILE", "DC_MEDIA_NAME", "DC_WEBHOOK_SECRET"):
        monkeypatch.delenv(name, raising=False)
    for name, value in values.items():
        monkeypatch.setenv(name, value)


@pytest.mark.parametrize("recipe,extra", RECIPES, ids=[r.__name__.rsplit(".", 1)[-1] for r, _ in RECIPES])
def test_every_recipe_prints_the_consent_line_once_before_any_request(recipe, extra, mock, monkeypatch, capsys):
    mock.route("GET", "/integration/public/byoc", ok({"connected": True}))
    mock.route("GET", "/phone/public/lines/" + LINE_ID + "/numbers", ok([{"phone_number": "+12125550100"}]))
    mock.route("POST", "/rvm", QUEUED)
    use_environment(monkeypatch, mock, extra)

    assert recipe.main() == 0

    output = capsys.readouterr().out
    assert output.count(CONSENT_LINE) == 1
    assert output.startswith(CONSENT_LINE)
    assert len(mock.requests) > 0


@pytest.mark.parametrize("recipe,extra", RECIPES, ids=[r.__name__.rsplit(".", 1)[-1] for r, _ in RECIPES])
def test_the_consent_line_comes_first_even_when_setup_fails(recipe, extra, mock, monkeypatch, capsys):
    use_environment(monkeypatch, mock, extra)
    monkeypatch.delenv("DC_KEY")

    assert recipe.main() == 1

    captured = capsys.readouterr()
    assert captured.out.count(CONSENT_LINE) == 1
    assert mock.requests == []


def test_an_invalid_attestation_explains_the_rule(make_config):
    with pytest.raises(ConfigError, match="Never send a higher level than your carrier gave you"):
        make_config(DC_STI_ORIG_ID="c3a8e1f5-9b2d-4764-8e0a-5d1f7b3c9a26", DC_STI_ATTESTATION="D").byoc_options()


def test_byoc_says_the_caller_id_must_be_one_you_may_use(mock, make_config, make_client):
    mock.route("GET", "/integration/public/byoc", ok({"connected": True}))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_CALLER_ID=CALLER_ID, DC_AUDIO_URL=AUDIO_URL)
    lines = []

    send_rvm_byoc.run(config, make_client(config), out=lines.append)

    assert "DC_CALLER_ID must be a number you are entitled to use." in lines
    assert "Always identify your business location truthfully when asked by recipients." in lines
