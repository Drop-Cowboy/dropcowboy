"""Settings and audio choice.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import pytest

from dropcowboy_examples.audio import audio_from_env, check_tts_length
from dropcowboy_examples.config import ConfigError, last4, load_config

from .conftest import AUDIO_URL, MEDIA_ID, VOICE_ID


def test_defaults():
    config = load_config({"DC_KEY": "k", "DC_SECRET": "s"})
    assert config.base_url == "https://api-v2.dropcowboy.com"
    assert config.port == 3000
    assert config.wait_seconds == 300
    assert config.mode == "retail"
    assert config.callback_url is None and config.rent is False


def test_public_url_must_be_https_and_loses_a_trailing_slash():
    assert load_config({"DC_PUBLIC_URL": "https://a.example.test/"}).callback_url == \
        "https://a.example.test/callbacks/dropcowboy"
    with pytest.raises(ConfigError):
        load_config({"DC_PUBLIC_URL": "http://a.example.test"})


def test_mode_must_be_retail_or_byoc():
    with pytest.raises(ConfigError):
        load_config({"DC_MODE": "other"})


def test_several_signing_secrets_are_split_on_commas():
    config = load_config({"DC_WEBHOOK_SECRET": "one, two"})
    assert config.signing_secrets == ["one", "two"]


def test_to_must_be_e164():
    with pytest.raises(ConfigError):
        load_config({"DC_TO": "3125550142"}).require_recipient()


def test_last4_never_returns_the_whole_value():
    assert last4("e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30") == "...7c30"


def test_audio_precedence_media_then_tts_then_audio_url(mock, make_config, make_client):
    config = make_config(DC_MEDIA_ID=MEDIA_ID, DC_TTS_BODY="Hello", DC_VOICE_ID=VOICE_ID, DC_AUDIO_URL=AUDIO_URL)
    assert audio_from_env(config, make_client(config), retail=False) == {"media_id": MEDIA_ID}

    config = make_config(DC_TTS_BODY="Hello", DC_VOICE_ID=VOICE_ID, DC_AUDIO_URL=AUDIO_URL)
    assert audio_from_env(config, make_client(config), retail=False) == {"tts_body": "Hello", "voice_id": VOICE_ID}

    config = make_config(DC_AUDIO_URL=AUDIO_URL)
    assert audio_from_env(config, make_client(config), retail=False) == {"audio_url": AUDIO_URL}
    assert mock.requests == []


def test_no_audio_source_names_the_four_settings(mock, make_config, make_client):
    config = make_config()
    with pytest.raises(ConfigError) as caught:
        audio_from_env(config, make_client(config), retail=False)
    for name in ("DC_MEDIA_ID", "DC_AUDIO_FILE", "DC_TTS_BODY", "DC_AUDIO_URL"):
        assert name in str(caught.value)


def test_tts_length_limit():
    check_tts_length("a" * 1200)
    with pytest.raises(ConfigError):
        check_tts_length("a" * 1201)
