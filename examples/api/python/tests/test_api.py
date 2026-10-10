"""Helpers that wrap single routes.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import pytest

from dropcowboy_examples import api

from .test_recipes import IMPORT_JOB_ID, ok


def test_wait_for_import_polls_until_completed(mock, make_config, make_client):
    mock.route(
        "GET", "/phone/public/numbers/import/" + IMPORT_JOB_ID,
        ok({"status": "processing"}), ok({"status": "processing"}), ok({"status": "completed", "result": {"added": 1}}),
    )
    config = make_config()
    sleeps = []

    job = api.wait_for_import(make_client(config), IMPORT_JOB_ID, poll_seconds=2, sleep=sleeps.append)

    assert job["status"] == "completed"
    assert len(mock.requests) == 3
    assert sleeps == [2, 2]


def test_wait_for_import_returns_a_failed_job(mock, make_config, make_client):
    mock.route("GET", "/phone/public/numbers/import/" + IMPORT_JOB_ID, ok({"status": "failed", "error": "bad file"}))
    config = make_config()

    job = api.wait_for_import(make_client(config), IMPORT_JOB_ID, poll_seconds=0)

    assert job["status"] == "failed"
    assert job["error"] == "bad file"


def test_wait_for_import_times_out(mock, make_config, make_client):
    mock.route("GET", "/phone/public/numbers/import/" + IMPORT_JOB_ID, ok({"status": "processing"}))
    config = make_config()

    with pytest.raises(TimeoutError):
        api.wait_for_import(make_client(config), IMPORT_JOB_ID, poll_seconds=0, max_polls=3)

    assert len(mock.requests) == 3
