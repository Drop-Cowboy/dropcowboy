"""Choose the one audio field that goes on the wire.

Send only to people who agreed to hear from you. Test with numbers you own.

`POST /rvm` takes its audio as exactly one of `media_id`, `tts_body` with
`voice_id`, or `audio_url`. Sending two of them is a mistake the API answers
after the `202`, so this module makes it impossible by construction.
"""
from __future__ import annotations

from typing import Callable, Dict, Optional

from . import api
from .client import DcClient
from .config import Config, ConfigError
from .hints import AUDIO_URL_SUPPORT
from .media import AudioFile, audio_file_source, upload_media
from .output import say

TTS_MAX_CHARACTERS = 1200

AUDIO_SETTINGS = "DC_MEDIA_ID, DC_AUDIO_FILE, DC_TTS_BODY or DC_AUDIO_URL"


def audio_file_from_env(config: Config) -> Optional[AudioFile]:
    """DC_AUDIO_FILE, checked locally, when it is the audio that will be used."""
    if config.media_id or not config.audio_file:
        return None
    return audio_file_source(config.audio_file, config.media_name)


def require_audio_setting(config: Config) -> None:
    """Stop before any request when no audio is set (for recipes with no fallback)."""
    if not (config.media_id or config.audio_file or config.tts_body or config.audio_url):
        raise ConfigError("No audio to send. Set one of " + AUDIO_SETTINGS + ".")
    audio_file_from_env(config)


def audio_from_env(
    config: Config,
    client: DcClient,
    retail: bool,
    out: Callable[[str], None] = say,
) -> Dict[str, str]:
    """Pick the audio fields, in this order.

    1. DC_MEDIA_ID    -> media_id
    2. DC_AUDIO_FILE  -> uploaded (or imported from a URL), then sent as media_id
    3. DC_TTS_BODY    -> tts_body and voice_id
    4. DC_AUDIO_URL   -> audio_url, with a note on when the API accepts it
    5. Retail only: the first file in your media library.
    """
    if config.media_id:
        return {"media_id": config.media_id}
    audio_file = audio_file_from_env(config)
    if audio_file is not None:
        return {"media_id": upload_media(client, audio_file, out)}
    if config.tts_body:
        return tts_fields(config, client)
    if config.audio_url:
        out("About DC_AUDIO_URL: " + AUDIO_URL_SUPPORT)
        return {"audio_url": config.audio_url}

    if retail:
        media_id = api.first_media_id(client)
        if not media_id:
            raise ConfigError(
                "No audio to send. Set one of " + AUDIO_SETTINGS + ", or upload a file to your media library."
            )
        return {"media_id": media_id}
    raise ConfigError("No audio to send. Set one of " + AUDIO_SETTINGS + ".")


def tts_fields(config: Config, client: DcClient) -> Dict[str, str]:
    """Text to speech needs a voice. Use DC_VOICE_ID, else the first voice that is ready."""
    text = check_tts_length(config.tts_body)
    voice_id = config.voice_id or api.first_ready_voice_id(client)
    if not voice_id:
        raise ConfigError("No voice is ready. Set DC_VOICE_ID, or create or clone a voice first.")
    return {"tts_body": text, "voice_id": voice_id}


def check_tts_length(text: str) -> str:
    """Check the length before any API call. The API counts after merge fields are filled in."""
    if not text.strip():
        raise ConfigError("Set DC_TTS_BODY to the text to speak.")
    if len(text) > TTS_MAX_CHARACTERS:
        raise ConfigError(
            "DC_TTS_BODY is " + str(len(text)) + " characters. The limit is "
            + str(TTS_MAX_CHARACTERS) + " once merge fields are filled in (the API answers 3021)."
        )
    return text
