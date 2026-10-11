"""Uploading audio, the four audio sources on POST /rvm, sample values and outcome hints.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import json

import pytest

import upload_media
from dropcowboy_examples import samples
from dropcowboy_examples.config import ConfigError, load_config
from dropcowboy_examples.hints import API_LOGS_HINT, OUTCOME_HINTS, outcome_hint
from dropcowboy_examples.media import audio_file_source, upload_media as upload
from dropcowboy_examples.receiver import ReceivedEvent
from dropcowboy_examples.recipes import send_rvm_byoc, send_rvm_retail, send_rvm_tts
from dropcowboy_examples.recipes.flow import _print_result

from .conftest import AUDIO_URL, CALLER_ID, FIXTURES, LINE_ID, MEDIA_ID, RECIPIENT, VOICE_ID
from .test_recipes import QUEUED, ok, rvm_body

UPLOADED_MEDIA_ID = "2c7a9e4f-6b1d-4f58-8a3e-0d9c5b2f7e41"
IMPORTED_MEDIA_ID = "4e9b1f6c-8a3d-4c27-b6e1-5f0a2d8c4b73"
UPLOAD_PATH = "/uploads/" + UPLOADED_MEDIA_ID
CONTENT_TYPES = {"mp3": "audio/mpeg", "wav": "audio/wav"}
AUDIO_BYTES = b"ID3\x03\x00\x00\x00\x00\x00\x00 not really audio"


def media_upload_routes(mock):
    """The create, storage PUT and complete routes. A PUT with any Content-Type but the
    exact one returned is refused with 403, like the real storage service."""

    def create(recorded):
        if recorded.body.get("signed_upload"):
            upload = {}
            for ext, content_type in CONTENT_TYPES.items():
                upload[ext] = {"url": mock.base_url + UPLOAD_PATH + "." + ext
                               + "?expires=1774214712&signature=5d0c7e2a9b41f3e8", "content_type": content_type}
            return 201, {"data": {"media_id": UPLOADED_MEDIA_ID, "upload": upload}}
        return 201, {"data": {"media_id": IMPORTED_MEDIA_ID, "name": recorded.body["name"]}}

    def storage(ext):
        def answer(recorded):
            if recorded.headers.get("content-type") != CONTENT_TYPES[ext]:
                return 403, "<Error><Code>SignatureDoesNotMatch</Code></Error>"
            return 200, ""
        return answer

    mock.route("POST", "/media/public/media", create)
    mock.route("PUT", UPLOAD_PATH + ".mp3", storage("mp3"))
    mock.route("PUT", UPLOAD_PATH + ".wav", storage("wav"))
    mock.route("POST", "/media/public/media/" + UPLOADED_MEDIA_ID + "/complete", ok({"media_id": UPLOADED_MEDIA_ID}))


@pytest.fixture
def audio_file(tmp_path):
    path = tmp_path / "offer.mp3"
    path.write_bytes(AUDIO_BYTES)
    return path


# --- upload-media -------------------------------------------------------------

def test_upload_creates_then_puts_with_the_exact_content_type_then_completes(
        mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    config = make_config(DC_AUDIO_FILE=str(audio_file))
    lines = []

    assert upload_media.run(config, make_client(config), out=lines.append) == 0

    assert mock.calls() == [
        ("POST", "/media/public/media"),
        ("PUT", UPLOAD_PATH + ".mp3"),
        ("POST", "/media/public/media/" + UPLOADED_MEDIA_ID + "/complete"),
    ]
    assert mock.requests[0].body == {"name": "offer.mp3", "type": "rvm", "signed_upload": True}
    put = mock.requests[1]
    assert put.headers["content-type"] == "audio/mpeg"
    assert put.raw == AUDIO_BYTES
    assert "x-key" not in put.headers and "x-secret" not in put.headers
    assert mock.requests[2].body == {}
    assert "media_id: " + UPLOADED_MEDIA_ID in lines
    assert "To send it, set DC_MEDIA_ID=" + UPLOADED_MEDIA_ID in lines
    assert not any("signature=" in line for line in lines)


def test_upload_uses_the_wav_url_for_a_wav_file_and_the_media_name(mock, make_config, make_client, tmp_path):
    media_upload_routes(mock)
    path = tmp_path / "GREETING.WAV"
    path.write_bytes(b"RIFF....WAVE")
    config = make_config(DC_AUDIO_FILE=str(path), DC_MEDIA_NAME="October follow-up")

    upload_media.run(config, make_client(config), out=lambda _l: None)

    assert mock.requests[0].body["name"] == "October follow-up"
    assert mock.requests[1].path == UPLOAD_PATH + ".wav"
    assert mock.requests[1].headers["content-type"] == "audio/wav"


def test_a_403_on_the_put_explains_content_type_and_expiry_and_does_not_complete(
        mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    mock.route("PUT", UPLOAD_PATH + ".mp3", (403, "<Error><Code>AccessDenied</Code></Error>"))
    config = make_config(DC_AUDIO_FILE=str(audio_file))

    with pytest.raises(ConfigError) as caught:
        upload_media.run(config, make_client(config), out=lambda _l: None)

    assert "Content-Type" in str(caught.value)
    assert "last 2 days" in str(caught.value)
    assert "https://" in str(caught.value)
    assert mock.find("POST", "/media/public/media/" + UPLOADED_MEDIA_ID + "/complete") == []


def test_an_https_audio_file_is_imported_by_url(mock, make_config, make_client):
    media_upload_routes(mock)
    config = make_config(DC_AUDIO_FILE="https://audio.example.com/offer.mp3")
    lines = []

    upload_media.run(config, make_client(config), out=lines.append)

    assert mock.calls() == [("POST", "/media/public/media")]
    assert mock.requests[0].body == {"name": "offer.mp3", "type": "rvm",
                                     "url": "https://audio.example.com/offer.mp3", "ext": ".mp3"}
    assert "media_id: " + IMPORTED_MEDIA_ID in lines


@pytest.mark.parametrize("value,message", [
    ("missing.mp3", "there is no file at"),
    ("notes.txt", ".mp3 or .wav"),
    ("https://audio.example.com/offer.ogg", ".mp3 or .wav"),
])
def test_a_bad_audio_file_stops_before_any_request(mock, make_config, make_client, tmp_path, value, message):
    config = make_config(DC_AUDIO_FILE=value if value.startswith("https") else str(tmp_path / value))

    with pytest.raises(ConfigError, match=message):
        upload_media.run(config, make_client(config), out=lambda _l: None)

    assert mock.requests == []


def test_an_empty_audio_file_stops_before_any_request(mock, make_config, make_client, tmp_path):
    path = tmp_path / "empty.mp3"
    path.write_bytes(b"")

    with pytest.raises(ConfigError, match="is empty"):
        audio_file_source(str(path))
    config = make_config(DC_AUDIO_FILE=str(path))
    with pytest.raises(ConfigError):
        upload_media.run(config, make_client(config), out=lambda _l: None)
    assert mock.requests == []


def test_upload_media_needs_dc_audio_file(mock, make_config, make_client):
    config = make_config()
    with pytest.raises(ConfigError, match="DC_AUDIO_FILE"):
        upload_media.run(config, make_client(config), out=lambda _l: None)
    assert mock.requests == []


def test_the_upload_helper_returns_the_media_id(mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    config = make_config()
    assert upload(make_client(config), audio_file_source(str(audio_file)), out=lambda _l: None) == UPLOADED_MEDIA_ID


# --- the exact POST /rvm body for each audio source -----------------------------

def test_retail_body_for_each_audio_source(mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    mock.route("GET", "/voice/public/voices", ok({"voices": [{"voice_id": VOICE_ID, "status": "ready"}]}))
    mock.route("POST", "/rvm", QUEUED)
    sources = [
        ({"DC_MEDIA_ID": MEDIA_ID}, {"media_id": MEDIA_ID}),
        ({"DC_AUDIO_FILE": str(audio_file)}, {"media_id": UPLOADED_MEDIA_ID}),
        ({"DC_TTS_BODY": "Hello there.", "DC_VOICE_ID": VOICE_ID}, {"tts_body": "Hello there.", "voice_id": VOICE_ID}),
        ({"DC_AUDIO_URL": AUDIO_URL}, {"audio_url": AUDIO_URL}),
    ]
    for settings, audio in sources:
        mock.requests.clear()
        config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_CALLER_ID=CALLER_ID, DC_WAIT_SECONDS="0", **settings)

        send_rvm_retail.run(config, make_client(config), out=lambda _l: None)

        body = rvm_body(mock)
        expected = {"to": RECIPIENT, "phone_line_id": LINE_ID, "foreign_id": body["foreign_id"]}
        expected.update(audio)
        assert body == expected, settings
        assert "caller_id" not in body


def test_retail_uploads_the_file_before_sending(mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_AUDIO_FILE=str(audio_file), DC_WAIT_SECONDS="0")

    send_rvm_retail.run(config, make_client(config), out=lambda _l: None)

    assert mock.calls() == [
        ("POST", "/media/public/media"),
        ("PUT", UPLOAD_PATH + ".mp3"),
        ("POST", "/media/public/media/" + UPLOADED_MEDIA_ID + "/complete"),
        ("POST", "/rvm"),
    ]


def test_audio_precedence_media_then_file_then_tts_then_url(mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    mock.route("POST", "/rvm", QUEUED)
    every = {"DC_MEDIA_ID": MEDIA_ID, "DC_AUDIO_FILE": str(audio_file), "DC_TTS_BODY": "Hello there.",
             "DC_VOICE_ID": VOICE_ID, "DC_AUDIO_URL": AUDIO_URL}
    expected = [
        ("DC_MEDIA_ID", {"media_id": MEDIA_ID}),
        ("DC_AUDIO_FILE", {"media_id": UPLOADED_MEDIA_ID}),
        ("DC_TTS_BODY", {"tts_body": "Hello there.", "voice_id": VOICE_ID}),
        ("DC_AUDIO_URL", {"audio_url": AUDIO_URL}),
    ]
    settings = dict(every)
    for winner, audio in expected:
        mock.requests.clear()
        config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_WAIT_SECONDS="0", **settings)

        send_rvm_retail.run(config, make_client(config), out=lambda _l: None)

        body = rvm_body(mock)
        for field in ("media_id", "tts_body", "voice_id", "audio_url"):
            assert body.get(field) == audio.get(field), winner
        settings.pop(winner)
        if winner == "DC_TTS_BODY":
            settings.pop("DC_VOICE_ID")


def test_byoc_body_for_an_uploaded_file_checks_the_carrier_first(mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    mock.route("GET", "/integration/public/byoc", ok({"connected": True}))
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_CALLER_ID=CALLER_ID, DC_AUDIO_FILE=str(audio_file), DC_WAIT_SECONDS="0")

    send_rvm_byoc.run(config, make_client(config), out=lambda _l: None)

    assert mock.calls()[0] == ("GET", "/integration/public/byoc")
    body = rvm_body(mock)
    assert body == {"to": RECIPIENT, "caller_id": CALLER_ID, "media_id": UPLOADED_MEDIA_ID,
                    "foreign_id": body["foreign_id"]}


def test_byoc_without_a_carrier_does_not_upload(mock, make_config, make_client, audio_file):
    media_upload_routes(mock)
    mock.route("GET", "/integration/public/byoc", ok({"connected": False}))
    config = make_config(DC_CALLER_ID=CALLER_ID, DC_AUDIO_FILE=str(audio_file))

    with pytest.raises(ConfigError, match="No carrier"):
        send_rvm_byoc.run(config, make_client(config), out=lambda _l: None)

    assert mock.calls() == [("GET", "/integration/public/byoc")]


# --- sample values from the docs --------------------------------------------------

def test_the_sample_values_match_the_fixture():
    fixture = json.loads((FIXTURES / "doc-sample-values.json").read_text(encoding="utf-8"))
    for key in ("ids", "phone_numbers", "url_hosts"):
        assert samples.SAMPLE_VALUES[key] == fixture[key], key


@pytest.mark.parametrize("name,value", [
    ("DC_MEDIA_ID", "1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80"),
    ("DC_MEDIA_ID", "1B7E3C9A-4D2F-4A8B-9E6C-7F2A1D5B3C80"),
    ("DC_CALLER_ID", "+12125550100"),
    ("DC_TO", "+17735550188"),
    ("DC_PUBLIC_URL", "https://hooks.example.com"),
    ("DC_AUDIO_URL", "https://cdn.example.com/voicemails/offer.mp3"),
    ("DC_AUDIO_FILE", "https://media.example.com/offer.mp3"),
])
def test_a_sample_value_is_refused_before_any_request(name, value):
    env = {"DC_KEY": "6f1d3c8a-2b7e-4a95-8c4d-1e9f3a7b5c20", "DC_SECRET": "b8a4e2d6-7c3f-4915-a0e8-4d2b6f9c1a73",
           "DC_TO": RECIPIENT, name: value}
    with pytest.raises(ConfigError) as caught:
        load_config(env)
    assert str(caught.value) == name + "=" + value + ": this is a sample value from our docs; use your own."


def test_each_item_of_a_list_is_checked():
    found = samples.find_sample_values({"DC_NUMBERS": "+13125550161, +12125550100", "OTHER": "+12125550100"})
    assert found == ["DC_NUMBERS=+12125550100: this is a sample value from our docs; use your own."]


def test_values_that_only_look_like_samples_are_allowed():
    assert samples.find_sample_values({
        "DC_TO": RECIPIENT, "DC_AUDIO_URL": "https://audio.example.com/a.mp3",
        "DC_PUBLIC_URL": "https://abc123.example.test", "DC_NOTE": "hooks.example.com",
    }) == []


def test_every_command_refuses_a_sample_value(mock, monkeypatch, capsys):
    import subscribe
    for name, value in (("DC_MEDIA_ID", "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28"), ("DC_CALLER_ID", "+13125550100")):
        monkeypatch.setenv("DC_KEY", "6f1d3c8a-2b7e-4a95-8c4d-1e9f3a7b5c20")
        monkeypatch.setenv("DC_SECRET", "b8a4e2d6-7c3f-4915-a0e8-4d2b6f9c1a73")
        monkeypatch.setenv("DC_BASE_URL", mock.base_url)
        monkeypatch.setenv("DC_TO", RECIPIENT)
        monkeypatch.setenv(name, value)
        for main in (send_rvm_retail.main, send_rvm_byoc.main, send_rvm_tts.main, upload_media.main,
                     lambda: subscribe.main([])):
            assert main() == 1
            assert "this is a sample value from our docs; use your own" in capsys.readouterr().err
        monkeypatch.delenv(name)
    assert mock.requests == []


# --- outcome hints ---------------------------------------------------------------

def test_outcome_hints_for_3001_3014_and_3040():
    assert set(OUTCOME_HINTS) == {3001, 3014, 3040}
    assert "media_id" in outcome_hint(3001)
    assert "audio_url is an option for BYOC plans only" in outcome_hint("3014")
    assert outcome_hint(3040).startswith("Test Numbers Only")
    assert outcome_hint(0) is None
    assert outcome_hint(None) is None
    assert outcome_hint("") is None


def test_the_hint_follows_the_result():
    lines = []
    event = ReceivedEvent("callback", "rvm", {"status": "failed", "reason": "Test Numbers Only", "reason_code": 3040})

    _print_result(event, lines.append)

    index = lines.index("  reason_code: 3040")
    assert lines[index + 1] == "What to do: " + OUTCOME_HINTS[3040]


def test_no_hint_for_a_success():
    lines = []
    _print_result(ReceivedEvent("callback", "rvm", {"status": "success", "reason": "", "reason_code": 0}),
                  lines.append)
    assert not any(line.startswith("What to do:") for line in lines)


def test_not_waiting_points_at_the_api_logs(mock, make_config, make_client):
    mock.route("POST", "/rvm", QUEUED)
    config = make_config(DC_PHONE_LINE_ID=LINE_ID, DC_MEDIA_ID=MEDIA_ID, DC_WAIT_SECONDS="0")
    lines = []

    send_rvm_retail.run(config, make_client(config), out=lines.append)

    assert API_LOGS_HINT in lines
