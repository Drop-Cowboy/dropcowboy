"""Read settings from environment variables.

Send only to people who agreed to hear from you. Test with numbers you own.

Credentials never live in the repo. They come from the environment, or from a
local `.env` file that is listed in `.gitignore`.
"""
from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from typing import List, Mapping, Optional

from .samples import find_sample_values

DEFAULT_BASE_URL = "https://api-v2.dropcowboy.com"
DEFAULT_PORT = 3000
DEFAULT_WAIT_SECONDS = 300
DEFAULT_LINE_NAME = "Local presence"

CALLBACK_PATH = "/callbacks/dropcowboy"
WEBHOOK_PATH = "/webhooks/dropcowboy"

E164 = re.compile(r"^\+[1-9]\d{1,14}$")
UUID = re.compile(
    r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
)


class ConfigError(Exception):
    """A setting is missing or invalid. The message says what to change."""


@dataclass
class Config:
    key: str = ""
    secret: str = ""
    base_url: str = DEFAULT_BASE_URL
    to: str = ""
    public_url: str = ""
    port: int = DEFAULT_PORT
    signing_secrets: List[str] = field(default_factory=list)
    phone_line_id: str = ""
    caller_id: str = ""
    audio_url: str = ""
    audio_file: str = ""
    media_name: str = ""
    media_id: str = ""
    tts_body: str = ""
    voice_id: str = ""
    mode: str = "retail"
    preview: bool = False
    sti_orig_id: str = ""
    sti_attestation: str = ""
    line_name: str = DEFAULT_LINE_NAME
    numbers: List[str] = field(default_factory=list)
    area_codes: List[str] = field(default_factory=list)
    rent: bool = False
    wait_seconds: int = DEFAULT_WAIT_SECONDS

    @property
    def callback_url(self) -> Optional[str]:
        """The per-send callback address, or None when no public URL is set."""
        if not self.public_url:
            return None
        return self.public_url + CALLBACK_PATH

    @property
    def webhook_url(self) -> Optional[str]:
        if not self.public_url:
            return None
        return self.public_url + WEBHOOK_PATH

    def require_credentials(self) -> None:
        if not self.key or not self.secret:
            raise ConfigError("Set DC_KEY and DC_SECRET (Developers > API Keys in the dashboard).")

    def require_recipient(self) -> str:
        if not self.to:
            raise ConfigError("Set DC_TO to a number you own, in E.164 format, for example +13125550142.")
        if not E164.match(self.to):
            raise ConfigError("DC_TO must be in E.164 format: a + sign, the country code, then the number.")
        return self.to

    def require_caller_id(self) -> str:
        if not self.caller_id:
            raise ConfigError("Set DC_CALLER_ID to your own number at your carrier, in E.164 format.")
        if not E164.match(self.caller_id):
            raise ConfigError("DC_CALLER_ID must be in E.164 format: a + sign, the country code, then the number.")
        return self.caller_id

    def byoc_options(self) -> Optional[dict]:
        """The `byoc` object for a send, or None unless both STIR/SHAKEN values are set."""
        if not (self.sti_orig_id and self.sti_attestation):
            return None
        if not UUID.match(self.sti_orig_id):
            raise ConfigError("DC_STI_ORIG_ID must be a UUID (the API answers 3017 otherwise).")
        if self.sti_attestation not in ("A", "B", "C"):
            raise ConfigError(
                "DC_STI_ATTESTATION is not valid. The level your carrier assigned to the number: A, B or C. "
                "Never send a higher level than your carrier gave you. (The API answers 3018 otherwise.)"
            )
        return {"sti_orig_id": self.sti_orig_id, "sti_attestation": self.sti_attestation}


def load_config(env: Optional[Mapping[str, str]] = None) -> Config:
    """Build a Config from `env`, or from the process environment plus any `.env` file.

    A setting that holds a sample value from our docs stops here, before any request.
    """
    if env is None:
        _load_dotenv_file()
        env = os.environ

    found = find_sample_values(env)
    if found:
        raise ConfigError("\n".join(found))

    def text(name: str, default: str = "") -> str:
        return (env.get(name) or default).strip()

    public_url = text("DC_PUBLIC_URL").rstrip("/")
    if public_url and not public_url.startswith("https://"):
        raise ConfigError("DC_PUBLIC_URL must start with https:// (use the address your tunnel prints).")

    mode = text("DC_MODE", "retail").lower()
    if mode not in ("retail", "byoc"):
        raise ConfigError("DC_MODE must be retail or byoc.")

    return Config(
        key=text("DC_KEY"),
        secret=text("DC_SECRET"),
        base_url=text("DC_BASE_URL", DEFAULT_BASE_URL).rstrip("/"),
        to=text("DC_TO"),
        public_url=public_url,
        port=_integer(text("PORT", str(DEFAULT_PORT)), "PORT", minimum=0),
        signing_secrets=_split(text("DC_WEBHOOK_SECRET")),
        phone_line_id=text("DC_PHONE_LINE_ID"),
        caller_id=text("DC_CALLER_ID"),
        audio_url=text("DC_AUDIO_URL"),
        audio_file=text("DC_AUDIO_FILE"),
        media_name=text("DC_MEDIA_NAME"),
        media_id=text("DC_MEDIA_ID"),
        tts_body=env.get("DC_TTS_BODY") or "",
        voice_id=text("DC_VOICE_ID"),
        mode=mode,
        preview=text("DC_PREVIEW").lower() == "yes",
        sti_orig_id=text("DC_STI_ORIG_ID"),
        sti_attestation=text("DC_STI_ATTESTATION").upper(),
        line_name=text("DC_LINE_NAME", DEFAULT_LINE_NAME),
        numbers=_split(text("DC_NUMBERS")),
        area_codes=_split(text("DC_AREA_CODES")),
        rent=text("DC_RENT") == "yes",
        wait_seconds=_integer(text("DC_WAIT_SECONDS", str(DEFAULT_WAIT_SECONDS)), "DC_WAIT_SECONDS", minimum=0),
    )


def last4(value: str) -> str:
    """The only part of a secret that may be shown."""
    return "..." + value[-4:] if len(value) >= 4 else "..."


def _split(value: str) -> List[str]:
    return [part.strip() for part in value.split(",") if part.strip()]


def _integer(value: str, name: str, minimum: int) -> int:
    try:
        number = int(value)
    except ValueError:
        raise ConfigError(name + " must be a whole number.") from None
    if number < minimum:
        raise ConfigError(name + " must be " + str(minimum) + " or more.")
    return number


def _load_dotenv_file() -> None:
    """Load the first `.env` found from the working directory upward. Variables already set in the shell win."""
    from dotenv import find_dotenv, load_dotenv

    load_dotenv(find_dotenv(usecwd=True))
