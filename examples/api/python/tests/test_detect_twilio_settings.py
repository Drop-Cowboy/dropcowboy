"""detect-twilio: every setting is checked, and every problem listed, before any request.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import pytest

from dropcowboy_examples.config import ConfigError
from dropcowboy_examples.recipes import detect_twilio
from dropcowboy_examples.recipes.detect_twilio import load_detect_settings

from .detect_support import ACCOUNT_SID, DETECTION_KEY, TWILIO_FROM, VM_AUDIO_URL, ZERO_ACCOUNT_SID
from .conftest import API_KEY, API_SECRET, PUBLIC_URL, RECIPIENT
from .mock_api import MockApi

CONSENT_LINE = "Send only to people who agreed to hear from you. Test with numbers you own."
BILLING_LINE = "This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session."


def env(**changes):
    values = {
        "TWILIO_ACCOUNT_SID": ACCOUNT_SID,
        "TWILIO_AUTH_TOKEN": "test-twilio-auth-token-not-real-0042",
        "TWILIO_FROM": TWILIO_FROM,
        "DC_TO": RECIPIENT,
        "DC_PUBLIC_URL": PUBLIC_URL,
        "DC_DETECTION_KEY": DETECTION_KEY,
        "DC_VM_AUDIO_URL": VM_AUDIO_URL,
    }
    values.update(changes)
    return {name: value for name, value in values.items() if value is not None}


def problems(**changes):
    with pytest.raises(ConfigError) as caught:
        load_detect_settings(env(**changes))
    return str(caught.value)


def test_defaults():
    settings = load_detect_settings(env(DC_PUBLIC_URL=PUBLIC_URL + "/"))
    assert settings.public_url == PUBLIC_URL
    assert settings.detection_url == "wss://detect.dropcowboy.com/carrier/ws/twilio"
    assert settings.twilio_base_url == "https://api.twilio.com"
    assert settings.dc_base_url == "https://api-v2.dropcowboy.com"
    assert (settings.strategy, settings.detection_timeout_sec, settings.live_confidence) == ("standard", 45, 0.6)
    assert (settings.beep_wait_seconds, settings.ring_seconds, settings.wait_seconds, settings.port) == (20, 30, 180,
                                                                                                         3000)
    assert settings.voicemail_message() == ("play", VM_AUDIO_URL)
    assert settings.live_message() == ("play", VM_AUDIO_URL)


@pytest.mark.parametrize("name", ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_FROM", "DC_TO", "DC_PUBLIC_URL"])
def test_each_required_setting(name):
    assert "Set " + name + " " in problems(**{name: None})


def test_a_voicemail_message_is_required():
    message = problems(DC_VM_AUDIO_URL=None)
    assert "DC_VM_AUDIO_URL" in message and "DC_VM_TEXT" in message


def test_audio_wins_over_text_and_live_falls_back():
    settings = load_detect_settings(env(DC_VM_TEXT="Hello"))
    assert settings.voicemail_message() == ("play", VM_AUDIO_URL)
    settings = load_detect_settings(env(DC_VM_AUDIO_URL=None, DC_VM_TEXT="Hello", DC_LIVE_TEXT="Hi there"))
    assert settings.voicemail_message() == ("say", "Hello")
    assert settings.live_message() == ("say", "Hi there")
    settings = load_detect_settings(env(DC_LIVE_TEXT="Hi", DC_LIVE_AUDIO_URL="https://audio.example.org/live.WAV"))
    assert settings.live_message() == ("play", "https://audio.example.org/live.WAV")


def test_a_detection_key_or_an_api_key_pair_is_required():
    message = problems(DC_DETECTION_KEY=None)
    assert "DC_DETECTION_KEY" in message and "DC_KEY and DC_SECRET" in message
    assert "DC_DETECTION_KEY" in problems(DC_DETECTION_KEY=None, DC_KEY=API_KEY)
    settings = load_detect_settings(env(DC_DETECTION_KEY=None, DC_KEY=API_KEY, DC_SECRET=API_SECRET))
    assert settings.detection_key == "" and settings.dc_key == API_KEY


def test_the_detection_key_wins_over_the_api_key_pair():
    settings = load_detect_settings(env(DC_KEY=API_KEY, DC_SECRET=API_SECRET))
    assert settings.detection_key == DETECTION_KEY


@pytest.mark.parametrize("url", [
    "http://abc123.example.test",
    "abc123.example.test",
    "https://abc123.example.test:8443",
    "https://abc123.example.test:80",
    "https://abc123.example.test/?q=1",
    "https://abc123.example.test/#top",
    "https://localhost",
    "https://my-laptop.local",
    "https://10.0.0.8",
    "https://192.168.1.20",
    "https://172.16.4.2",
    "https://127.0.0.1",
    "https://169.254.10.1",
    "https://[::1]",
    "https://[fe80::1]",
    "https://",
])
def test_every_public_url_rejection(url):
    assert "DC_PUBLIC_URL" in problems(DC_PUBLIC_URL=url)


@pytest.mark.parametrize("url", ["https://abc123.example.test:443", "https://abc123.example.test/prefix",
                                 "https://203.0.113.0.example.test"])
def test_public_url_that_works(url):
    assert load_detect_settings(env(DC_PUBLIC_URL=url)).public_url == url


@pytest.mark.parametrize("name,value", [
    ("DC_TO", "3125550142"), ("DC_TO", "+1312555"), ("DC_TO", "+1312555014299999"), ("DC_TO", "+1 312 555 0142"),
    ("TWILIO_FROM", "13125550147"), ("TWILIO_FROM", "+1-312-555-0147"),
])
def test_bad_e164(name, value):
    assert name + " must be in E.164 format" in problems(**{name: value})


@pytest.mark.parametrize("sid", ["AC123", "CA00000000000000000000000000000001", "AC0000000000000000000000000000000g",
                                 "AC000000000000000000000000000000011"])
def test_bad_account_sid(sid):
    assert "TWILIO_ACCOUNT_SID must be AC followed by 32 hexadecimal characters" in problems(TWILIO_ACCOUNT_SID=sid)


def test_the_zero_account_sid_from_the_fixtures_is_refused():
    message = problems(TWILIO_ACCOUNT_SID=ZERO_ACCOUNT_SID)
    assert message == ("TWILIO_ACCOUNT_SID=" + ZERO_ACCOUNT_SID
                       + ": this is the placeholder from our fixtures; use your own.")


@pytest.mark.parametrize("name,value", [
    ("DC_VM_AUDIO_URL", "http://audio.example.org/a.mp3"),
    ("DC_VM_AUDIO_URL", "https://audio.example.org/a.ogg"),
    ("DC_VM_AUDIO_URL", "https://audio.example.org/a.mp3/"),
    ("DC_LIVE_AUDIO_URL", "https://audio.example.org/live"),
])
def test_audio_urls_must_be_https_mp3_or_wav(name, value):
    assert name + " must be a public https:// address" in problems(**{name: value})


def test_audio_url_extension_is_case_insensitive_and_ignores_the_query():
    settings = load_detect_settings(env(DC_VM_AUDIO_URL="https://audio.example.org/A.MP3?v=2"))
    assert settings.vm_audio_url == "https://audio.example.org/A.MP3?v=2"


def test_text_limit_is_1000_characters():
    load_detect_settings(env(DC_VM_AUDIO_URL=None, DC_VM_TEXT="a" * 1000))
    assert "DC_VM_TEXT is 1001 characters" in problems(DC_VM_AUDIO_URL=None, DC_VM_TEXT="a" * 1001)
    assert "DC_LIVE_TEXT is 1001 characters" in problems(DC_LIVE_TEXT="a" * 1001)


@pytest.mark.parametrize("name,value", [
    ("DC_DETECTION_TIMEOUT_SEC", "4"), ("DC_DETECTION_TIMEOUT_SEC", "121"), ("DC_DETECTION_TIMEOUT_SEC", "4.5"),
    ("DC_BEEP_WAIT_SECONDS", "0"), ("DC_BEEP_WAIT_SECONDS", "61"),
    ("DC_RING_SECONDS", "4"), ("DC_RING_SECONDS", "61"),
    ("DC_WAIT_SECONDS", "59"), ("DC_WAIT_SECONDS", "601"), ("DC_WAIT_SECONDS", "abc"),
    ("DC_LIVE_CONFIDENCE", "1.1"), ("DC_LIVE_CONFIDENCE", "-0.1"), ("DC_LIVE_CONFIDENCE", "high"),
    ("DC_LIVE_CONFIDENCE", "nan"),
    ("PORT", "70000"), ("PORT", "-1"),
])
def test_numeric_ranges(name, value):
    assert name + " must be" in problems(**{name: value})


def test_the_live_confidence_message_names_the_default():
    assert "DC_LIVE_CONFIDENCE must be a number from 0 to 1 (default 0.6)." in problems(DC_LIVE_CONFIDENCE="high")


def test_numeric_edges_are_accepted():
    settings = load_detect_settings(env(DC_DETECTION_TIMEOUT_SEC="120", DC_BEEP_WAIT_SECONDS="1", DC_RING_SECONDS="5",
                                        DC_WAIT_SECONDS="600", DC_LIVE_CONFIDENCE="1", PORT="0"))
    assert (settings.detection_timeout_sec, settings.beep_wait_seconds, settings.ring_seconds) == (120, 1, 5)
    assert (settings.wait_seconds, settings.live_confidence, settings.port) == (600, 1.0, 0)


def test_wait_seconds_zero_is_refused_because_the_recipe_must_listen():
    assert "DC_WAIT_SECONDS=0 is not allowed" in problems(DC_WAIT_SECONDS="0")


@pytest.mark.parametrize("strategy", ["Standard", "BEEP_ONLY", "Live_Check", "fast", "beep-only"])
def test_strategy_is_an_exact_lowercase_match(strategy):
    assert "DC_DETECTION_STRATEGY must be standard, beep_only or live_check, in lowercase." in problems(
        DC_DETECTION_STRATEGY=strategy)


def test_strategy_and_detection_url():
    for strategy in ("standard", "beep_only", "live_check"):
        assert load_detect_settings(env(DC_DETECTION_STRATEGY=strategy)).strategy == strategy
    assert "DC_DETECTION_URL must start with wss://" in problems(DC_DETECTION_URL="ws://detect.example.org/ws")


@pytest.mark.parametrize("name,value", [
    ("DC_TO", "+13125550100"),
    ("TWILIO_FROM", "+12125550100"),
    ("DC_PUBLIC_URL", "https://receiver.example.com"),
    ("DC_VM_AUDIO_URL", "https://cdn.example.com/voicemail.mp3"),
    ("DC_DETECTION_KEY", "1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80"),
])
def test_sample_values_are_refused(name, value):
    assert name + "=" + value + ": this is a sample value from our docs; use your own." in problems(**{name: value})


def test_every_problem_is_listed_in_order():
    message = problems(TWILIO_AUTH_TOKEN=None, DC_TO="12345", TWILIO_ACCOUNT_SID="AC1",
                       DC_PUBLIC_URL="http://abc123.example.test", DC_RING_SECONDS="2", DC_DETECTION_STRATEGY="x",
                       TWILIO_FROM="+12125550100")
    lines = message.split("\n")
    assert len(lines) == 7
    assert lines[0].startswith("Set TWILIO_AUTH_TOKEN")
    assert lines[1].startswith("DC_TO must be in E.164")
    assert lines[2].startswith("TWILIO_ACCOUNT_SID must be AC")
    assert lines[3].startswith("DC_PUBLIC_URL must be")
    assert lines[4].startswith("DC_RING_SECONDS must be")
    assert lines[5].startswith("DC_DETECTION_STRATEGY must be")
    assert lines[6] == "TWILIO_FROM=+12125550100: this is a sample value from our docs; use your own."


def test_sample_and_zero_sid_messages_follow_the_validation_problems_in_one_list():
    message = problems(TWILIO_ACCOUNT_SID=ZERO_ACCOUNT_SID, DC_TO="+13125550100", DC_PUBLIC_URL="http://x.example.test",
                       DC_DETECTION_STRATEGY="Standard", DC_RING_SECONDS="99")
    assert message.split("\n") == [
        "DC_PUBLIC_URL must be the public https:// address your tunnel prints: it must start with https://.",
        "DC_RING_SECONDS must be a whole number from 5 to 60.",
        "DC_DETECTION_STRATEGY must be standard, beep_only or live_check, in lowercase.",
        "DC_TO=+13125550100: this is a sample value from our docs; use your own.",
        "TWILIO_ACCOUNT_SID=" + ZERO_ACCOUNT_SID + ": this is the placeholder from our fixtures; use your own.",
    ]


@pytest.mark.parametrize("changes", [
    {"DC_TO": None},
    {"DC_PUBLIC_URL": "http://abc123.example.test"},
    {"TWILIO_ACCOUNT_SID": ZERO_ACCOUNT_SID},
    {"DC_WAIT_SECONDS": "0"},
    {"DC_TO": "+13125550100"},
    {"DC_DETECTION_KEY": None},
])
def test_a_settings_problem_exits_1_with_no_request(changes, monkeypatch, capsys):
    with MockApi() as dc_mock, MockApi() as twilio_mock:
        values = env(DC_BASE_URL=dc_mock.base_url, TWILIO_BASE_URL=twilio_mock.base_url, DC_KEY=API_KEY,
                     DC_SECRET=API_SECRET, **changes)
        if changes.get("DC_DETECTION_KEY", "") is None:
            values.pop("DC_KEY")
        exit_code = detect_twilio.main(values)
    captured = capsys.readouterr()
    assert exit_code == 1
    assert dc_mock.requests == [] and twilio_mock.requests == []
    assert captured.out.startswith(CONSENT_LINE + "\n" + BILLING_LINE + "\n")
    assert captured.err.startswith("Setup problem: ")


def test_settings_come_from_the_environment(monkeypatch):
    for name, value in env().items():
        monkeypatch.setenv(name, value)
    assert load_detect_settings().to == RECIPIENT
