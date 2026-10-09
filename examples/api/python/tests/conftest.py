"""Shared test setup.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict

import pytest

from dropcowboy_examples import config as config_module
from dropcowboy_examples.client import DcClient
from dropcowboy_examples.config import Config, load_config

from .mock_api import MockApi

FIXTURES = Path(__file__).resolve().parents[2] / "fixtures"

API_KEY = "6f1d3c8a-2b7e-4a95-8c4d-1e9f3a7b5c20"
API_SECRET = "b8a4e2d6-7c3f-4915-a0e8-4d2b6f9c1a73"
LINE_ID = "9a3c5e7f-1b2d-4f68-8a0c-2e4d6b8f1a35"
MEDIA_ID = "4c8e2a6f-3d1b-4795-9e5a-7b1d3f5c9e82"
VOICE_ID = "2d6a8c0e-5f3b-4c17-8d9a-3e5f7b1c4a60"
RECIPIENT = "+13125550142"
CALLER_ID = "+13125550177"
# The number the result fixtures say the voicemail came from.
SENT_FROM = "+12125550100"
AUDIO_URL = "https://example.com/audio/message.mp3"
PUBLIC_URL = "https://abc123.example.test"
FOREIGN_ID = "0e8d4b2a-6c1f-4a73-9d50-8b3e5f7a1c92"


@pytest.fixture(autouse=True)
def no_dotenv_file(monkeypatch):
    """A developer's own .env must never leak into a test."""
    monkeypatch.setattr(config_module, "_load_dotenv_file", lambda: None)


@pytest.fixture
def vectors() -> Dict[str, Any]:
    return json.loads((FIXTURES / "signature-vectors.json").read_text(encoding="utf-8"))


@pytest.fixture
def callback_fixture() -> Dict[str, Any]:
    callback = json.loads((FIXTURES / "callback.rvm-success.json").read_text(encoding="utf-8"))
    callback["foreign_id"] = FOREIGN_ID
    return callback


@pytest.fixture
def mock():
    with MockApi() as api:
        yield api


@pytest.fixture
def make_config(mock):
    """Build a Config that talks to the mock API, with any extra settings."""

    def build(**extra: str) -> Config:
        env = {
            "DC_KEY": API_KEY,
            "DC_SECRET": API_SECRET,
            "DC_BASE_URL": mock.base_url,
            "DC_TO": RECIPIENT,
            "DC_WAIT_SECONDS": "5",
        }
        env.update(extra)
        return load_config(env)

    return build


@pytest.fixture
def make_client():
    def build(config: Config) -> DcClient:
        return DcClient(config.key, config.secret, config.base_url, sleep=lambda _seconds: None)

    return build
