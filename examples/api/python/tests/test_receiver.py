"""The receiver, through the real HTTP stack on an ephemeral port.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import hashlib
import hmac
import json
import threading

import pytest
import requests

from dropcowboy_examples.config import CALLBACK_PATH, WEBHOOK_PATH
from dropcowboy_examples.receiver import EmbeddedServer, Receiver, printable

from .conftest import FOREIGN_ID


def sign(secret: str, timestamp: str, raw_body: str) -> str:
    digest = hmac.new(secret.encode(), (timestamp + "." + raw_body).encode(), hashlib.sha256)
    return "sha256=" + digest.hexdigest()


@pytest.fixture
def served(vectors):
    receiver = Receiver([vectors["secret"]], clock=lambda: vectors["now_seconds_valid"], out=lambda _line: None)
    with EmbeddedServer(receiver) as server:
        yield receiver, server


def post_webhook(server, vectors, body=None, signature=None, timestamp=None, extra_headers=None):
    body = vectors["raw_body"] if body is None else body
    headers = {
        "Content-Type": "application/json",
        "X-Signature": signature or vectors["signature"],
        "X-Timestamp": timestamp or vectors["timestamp"],
    }
    headers.update(extra_headers or {})
    return requests.post(server.base_url + WEBHOOK_PATH, data=body.encode("utf-8"), headers=headers, timeout=5)


def test_good_signature_answers_200(served, vectors):
    receiver, server = served
    response = post_webhook(server, vectors)
    assert response.status_code == 200
    assert response.json() == {"received": True}
    events = receiver.received_events()
    assert [(event.source, event.name) for event in events] == [("webhook", "contact.rvm.status")]
    assert events[0].data["to"] == "+13125550142"


def test_tampered_body_answers_401(served, vectors):
    receiver, server = served
    response = post_webhook(server, vectors, body=vectors["tampered_raw_body"])
    assert response.status_code == 401
    assert response.json() == {"error": "invalid_signature"}
    assert receiver.received_events() == []


def test_stale_timestamp_answers_401(vectors):
    receiver = Receiver([vectors["secret"]], clock=lambda: vectors["now_seconds_stale"], out=lambda _line: None)
    with EmbeddedServer(receiver) as server:
        response = post_webhook(server, vectors)
    assert response.status_code == 401
    assert response.json() == {"error": "stale_timestamp"}


def test_signature_from_another_secret_answers_401(served, vectors):
    _receiver, server = served
    response = post_webhook(server, vectors, signature=vectors["signature_from_other_secret"])
    assert response.status_code == 401


def test_missing_headers_answer_401(served, vectors):
    _receiver, server = served
    response = requests.post(server.base_url + WEBHOOK_PATH, data=vectors["raw_body"], timeout=5)
    assert response.status_code == 401
    assert response.json() == {"error": "missing_signature"}


def test_a_repeated_event_is_a_duplicate(served, vectors):
    receiver, server = served
    first = post_webhook(server, vectors)
    second = post_webhook(server, vectors)
    assert first.json() == {"received": True}
    assert second.status_code == 200
    assert second.json() == {"received": True, "duplicate": True}
    assert len(receiver.received_events()) == 1


def test_the_event_id_header_dedupes_when_the_body_has_none(vectors):
    receiver = Receiver([vectors["secret"]], clock=lambda: vectors["now_seconds_valid"], out=lambda _line: None)
    body = '{"event":"contact.rvm.status","data":{"to":"+13125550142"}}'
    signature = sign(vectors["secret"], vectors["timestamp"], body)
    with EmbeddedServer(receiver) as server:
        headers = {"X-Event-Id": "0c7e4a2d-9b1f-4d63-8a5e-3f1c7b9d2e46"}
        first = post_webhook(server, vectors, body=body, signature=signature, extra_headers=headers)
        second = post_webhook(server, vectors, body=body, signature=signature, extra_headers=headers)
    assert first.json() == {"received": True}
    assert second.json() == {"received": True, "duplicate": True}


def test_no_signing_secret_answers_503(vectors):
    receiver = Receiver([], out=lambda _line: None)
    with EmbeddedServer(receiver) as server:
        response = post_webhook(server, vectors)
    assert response.status_code == 503


def test_a_signed_json_array_answers_400(vectors):
    receiver = Receiver([vectors["secret"]], clock=lambda: vectors["now_seconds_valid"], out=lambda _line: None)
    body = "[1,2,3]"
    signature = sign(vectors["secret"], vectors["timestamp"], body)
    with EmbeddedServer(receiver) as server:
        response = post_webhook(server, vectors, body=body, signature=signature)
    assert response.status_code == 400


def test_callback_route_accepts_the_fixture(served, callback_fixture):
    receiver, server = served
    response = requests.post(server.base_url + CALLBACK_PATH, json=callback_fixture, timeout=5)
    assert response.status_code == 200
    assert response.json() == {"received": True}
    event = receiver.received_events()[0]
    assert event.source == "callback"
    assert event.data["foreign_id"] == FOREIGN_ID
    assert event.data["status"] == "success"


def test_callback_route_accepts_a_body_without_a_json_content_type(served, callback_fixture):
    receiver, server = served
    response = requests.post(server.base_url + CALLBACK_PATH, data=json.dumps(callback_fixture), timeout=5)
    assert response.status_code == 200
    assert len(receiver.received_events()) == 1


@pytest.mark.parametrize("body", ["[1,2]", '"text"', "12", "not json", ""])
def test_callback_route_rejects_anything_but_a_json_object(served, body):
    receiver, server = served
    response = requests.post(server.base_url + CALLBACK_PATH, data=body, timeout=5)
    assert response.status_code == 400
    assert receiver.received_events() == []


def test_callback_keeps_only_the_fields_the_example_uses(served, callback_fixture):
    receiver, server = served
    callback_fixture["surprise"] = "value"
    requests.post(server.base_url + CALLBACK_PATH, json=callback_fixture, timeout=5)
    data = receiver.received_events()[0].data
    assert "surprise" not in data
    assert "product_cost" not in data


def test_health(served):
    _receiver, server = served
    response = requests.get(server.base_url + "/health", timeout=5)
    assert response.json() == {"ok": True}


def test_wait_for_returns_when_an_event_arrives_from_another_thread(served, callback_fixture):
    receiver, server = served
    sender = threading.Thread(
        target=lambda: requests.post(server.base_url + CALLBACK_PATH, json=callback_fixture, timeout=5)
    )
    sender.start()
    event = receiver.wait_for(lambda e: e.data.get("foreign_id") == FOREIGN_ID, timeout_seconds=5)
    sender.join()
    assert event is not None


def test_wait_for_times_out_and_ignores_events_before_the_marker(served, callback_fixture):
    receiver, server = served
    requests.post(server.base_url + CALLBACK_PATH, json=callback_fixture, timeout=5)
    marker = len(receiver.received_events())
    assert receiver.wait_for(lambda e: True, timeout_seconds=0.2, since=marker) is None


def test_the_server_stops_cleanly(vectors):
    receiver = Receiver([vectors["secret"]], out=lambda _line: None)
    with EmbeddedServer(receiver) as server:
        port = server.port
    with pytest.raises(requests.ConnectionError):
        requests.get("http://127.0.0.1:" + str(port) + "/health", timeout=2)


def test_printable_replaces_control_characters_and_truncates():
    assert printable("ok\x1b[31m\n") == "ok?[31m?"
    assert len(printable("a" * 1000)) == 200
