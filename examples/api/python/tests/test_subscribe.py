"""subscribe.py.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import pytest

import subscribe
from dropcowboy_examples.config import ConfigError

from .conftest import PUBLIC_URL
from .test_recipes import ok

SECRET = "e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30"
ROTATED_SECRET = "0b9d4f7a-2c6e-4a18-9e3b-7d5a1c8f4e62"
WEBHOOK_ID = "5c9e3a7f-2b6d-4e1a-8f4c-9d3b7e1a5c62"
OTHER_WEBHOOK_ID = "8c2e6a4f-1d7b-4b93-a5e0-6f3c9d1b7a24"
HOOK_URL = PUBLIC_URL + "/webhooks/dropcowboy"


def test_creates_one_webhook_for_the_status_event_and_prints_only_the_end_of_the_secret(mock, make_config, make_client):
    created = {"webhook_id": WEBHOOK_ID, "event_types": ["contact.rvm.status"], "signing_secret": SECRET}
    mock.route("POST", "/register/public/webhooks", ok(created))
    config = make_config(DC_PUBLIC_URL=PUBLIC_URL)
    lines = []

    assert subscribe.subscribe(config, make_client(config), [subscribe.STATUS_EVENT], out=lines.append) == 0

    assert mock.requests[0].body == {"hook_url": HOOK_URL, "event_types": ["contact.rvm.status"]}
    text = "\n".join(lines)
    assert WEBHOOK_ID in text
    assert SECRET not in text
    assert "7c30" in text
    assert "never replaces this one" in text


def test_receipt_puts_both_events_in_one_webhook(mock, make_config, make_client):
    mock.route("POST", "/register/public/webhooks", ok({"webhook_id": WEBHOOK_ID, "signing_secret": SECRET}))
    config = make_config(DC_PUBLIC_URL=PUBLIC_URL)

    subscribe.subscribe(config, make_client(config), [subscribe.STATUS_EVENT, subscribe.RECEIPT_EVENT],
                        out=lambda _l: None)

    assert len(mock.requests) == 1
    assert mock.requests[0].body["event_types"] == ["contact.rvm.status", "contact.rvm.receipt"]
    assert "hook_type" not in mock.requests[0].body


def test_a_public_url_is_required(mock, make_config, make_client):
    config = make_config()
    with pytest.raises(ConfigError, match="DC_PUBLIC_URL"):
        subscribe.subscribe(config, make_client(config), [subscribe.STATUS_EVENT], out=lambda _l: None)
    assert mock.requests == []


def test_lists_the_webhooks(mock, make_config, make_client):
    mock.route("GET", "/register/public/webhooks", ok([
        {"webhook_id": WEBHOOK_ID, "event_types": ["contact.rvm.status", "contact.rvm.receipt"], "hook_url": HOOK_URL},
        {"webhook_id": OTHER_WEBHOOK_ID, "event_types": ["*"], "hook_url": HOOK_URL},
    ]))
    config = make_config()
    lines = []

    assert subscribe.list_webhooks(make_client(config), out=lines.append) == 0

    assert lines[0] == WEBHOOK_ID + "  contact.rvm.status, contact.rvm.receipt  " + HOOK_URL
    assert lines[1] == OTHER_WEBHOOK_ID + "  *  " + HOOK_URL


def test_says_so_when_there_are_no_webhooks(mock, make_config, make_client):
    mock.route("GET", "/register/public/webhooks", ok([]))
    lines = []
    subscribe.list_webhooks(make_client(make_config()), out=lines.append)
    assert "No webhooks yet" in lines[0]


def test_deletes_one_webhook_by_its_webhook_id(mock, make_config, make_client):
    mock.route("DELETE", "/register/public/webhooks/" + WEBHOOK_ID, ok({"result": True}))
    lines = []

    assert subscribe.delete_webhook(make_client(make_config()), WEBHOOK_ID, out=lines.append) == 0

    assert mock.calls() == [("DELETE", "/register/public/webhooks/" + WEBHOOK_ID)]
    assert "Your other webhooks are unchanged" in "\n".join(lines)


def test_rotates_one_secret_and_prints_only_the_end_of_it(mock, make_config, make_client):
    mock.route("POST", "/register/public/webhooks/" + WEBHOOK_ID + "/rotate-secret",
               ok({"webhook_id": WEBHOOK_ID, "signing_secret": ROTATED_SECRET,
                   "signing_secret_created_at": 1774214999000}))
    lines = []

    assert subscribe.rotate_secret(make_client(make_config()), WEBHOOK_ID, out=lines.append) == 0

    text = "\n".join(lines)
    assert mock.calls() == [("POST", "/register/public/webhooks/" + WEBHOOK_ID + "/rotate-secret")]
    assert "4e62" in text
    assert ROTATED_SECRET not in text
    assert "keep the old secret there until in-flight deliveries have arrived" in text


def _updated(**overrides):
    webhook = {"webhook_id": WEBHOOK_ID, "name": "2 events", "hook_url": HOOK_URL, "url": HOOK_URL,
               "event_types": ["contact.rvm.status", "contact.rvm.receipt"], "hook_type": None,
               "signing_secret_created_at": 1774214712000}
    webhook.update(overrides)
    return webhook


def test_update_replaces_the_event_types_with_put_and_sends_nothing_else(mock, make_config, make_client):
    mock.route("PUT", "/register/public/webhooks/" + WEBHOOK_ID,
               ok(_updated(event_types=["contact.rvm.status"], hook_type="contact.rvm.status")))
    lines = []

    changes = {"event_types": ["contact.rvm.status"]}
    assert subscribe.update_webhook(make_client(make_config()), WEBHOOK_ID, changes, out=lines.append) == 0

    assert mock.calls() == [("PUT", "/register/public/webhooks/" + WEBHOOK_ID)]
    assert mock.requests[0].body == {"event_types": ["contact.rvm.status"]}
    text = "\n".join(lines)
    assert "Updated webhook " + WEBHOOK_ID in text
    assert "events: contact.rvm.status" in lines[3]
    assert "The signing secret did not change" in text


def test_update_prints_the_name_and_url_and_never_a_secret(mock, make_config, make_client):
    mock.route("PUT", "/register/public/webhooks/" + WEBHOOK_ID,
               ok(_updated(name="Receipts", hook_url="https://new.example.com/hook", signing_secret=SECRET)))
    lines = []

    subscribe.update_webhook(make_client(make_config()), WEBHOOK_ID,
                             {"hook_url": "https://new.example.com/hook", "name": "Receipts"}, out=lines.append)

    text = "\n".join(lines)
    assert mock.requests[0].body == {"hook_url": "https://new.example.com/hook", "name": "Receipts"}
    assert "name:   Receipts" in text
    assert "url:    https://new.example.com/hook" in text
    assert SECRET not in text


def test_update_with_nothing_to_change_is_an_error_before_any_request(mock, make_config, make_client):
    with pytest.raises(ConfigError, match="Nothing to update"):
        subscribe.update_webhook(make_client(make_config()), WEBHOOK_ID, {}, out=lambda _l: None)
    assert mock.requests == []


def test_main_update_builds_the_changes_from_the_flags(mock, monkeypatch, capsys):
    monkeypatch.setenv("DC_KEY", "6f1d3c8a-2b7e-4a95-8c4d-1e9f3a7b5c20")
    monkeypatch.setenv("DC_SECRET", "b8a4e2d6-7c3f-4915-a0e8-4d2b6f9c1a73")
    monkeypatch.setenv("DC_BASE_URL", mock.base_url)
    mock.route("PUT", "/register/public/webhooks/" + WEBHOOK_ID, ok(_updated()))

    assert subscribe.main(["--update", WEBHOOK_ID, "--receipt", "--name", "Both"]) == 0
    url = "https://x.example.com/h"
    assert subscribe.main(["--update", WEBHOOK_ID, "--events", "a.b, c.d", "--url", url]) == 0
    assert subscribe.main(["--update", WEBHOOK_ID]) == 1
    assert subscribe.main(["--update", WEBHOOK_ID, "--url", "http://localhost:3000"]) == 1
    assert subscribe.main(["--update", WEBHOOK_ID, "--name", "x" * 101]) == 1

    bodies = [request.body for request in mock.requests]
    assert bodies == [
        {"event_types": ["contact.rvm.status", "contact.rvm.receipt"], "name": "Both"},
        {"hook_url": url, "event_types": ["a.b", "c.d"]},
    ]
    with pytest.raises(SystemExit):
        subscribe.main(["--name", "Receipts"])
    with pytest.raises(SystemExit):
        subscribe.main(["--update", WEBHOOK_ID, "--delete", WEBHOOK_ID])
    capsys.readouterr()


def test_update_lets_an_unknown_webhook_fail_with_the_api_error(mock, make_config, make_client):
    from dropcowboy_examples.client import DcError
    mock.route("PUT", "/register/public/webhooks/" + WEBHOOK_ID, (404, {"title": "Not Found", "status": 404}))
    with pytest.raises(DcError) as caught:
        subscribe.update_webhook(make_client(make_config()), WEBHOOK_ID, {"name": "x"}, out=lambda _l: None)
    assert caught.value.status == 404


def test_main_routes_the_flags(mock, monkeypatch, capsys):
    monkeypatch.setenv("DC_KEY", "6f1d3c8a-2b7e-4a95-8c4d-1e9f3a7b5c20")
    monkeypatch.setenv("DC_SECRET", "b8a4e2d6-7c3f-4915-a0e8-4d2b6f9c1a73")
    monkeypatch.setenv("DC_BASE_URL", mock.base_url)
    monkeypatch.setenv("DC_PUBLIC_URL", PUBLIC_URL)
    mock.route("GET", "/register/public/webhooks", ok([]))
    mock.route("POST", "/register/public/webhooks", ok({"webhook_id": WEBHOOK_ID, "signing_secret": SECRET}))

    assert subscribe.main(["--list"]) == 0
    assert subscribe.main(["--events", "contact.rvm.status, contact.rvm.receipt"]) == 0

    assert mock.requests[1].body["event_types"] == ["contact.rvm.status", "contact.rvm.receipt"]
    with pytest.raises(SystemExit):
        subscribe.main(["--list", "--delete", WEBHOOK_ID])
    capsys.readouterr()
