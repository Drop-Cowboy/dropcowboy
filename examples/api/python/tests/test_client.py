"""The HTTP client: headers, errors, retries.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import pytest

from dropcowboy_examples.client import DcClient, DcError

from .conftest import API_KEY, API_SECRET


def client_for(mock, sleeps=None):
    recorded = sleeps if sleeps is not None else []
    return DcClient(API_KEY, API_SECRET, mock.base_url, sleep=recorded.append), recorded


def test_headers_are_sent(mock):
    mock.route("GET", "/thing", (200, {"data": {}, "meta": {}}))
    client, _ = client_for(mock)
    client.get("/thing")
    headers = mock.requests[0].headers
    assert headers["x-key"] == API_KEY
    assert headers["x-secret"] == API_SECRET
    assert headers["accept"] == "application/json"


def test_post_sends_json_and_the_idempotency_key(mock):
    mock.route("POST", "/thing", (202, {"status": "queued"}))
    client, _ = client_for(mock)
    client.post("/thing", {"a": 1}, idempotency_key="3b9f1c7e-5a2d-4e84-9c06-7d1b3e5f8a29")
    request = mock.requests[0]
    assert request.body == {"a": 1}
    assert request.headers["content-type"].startswith("application/json")
    assert request.headers["idempotency-key"] == "3b9f1c7e-5a2d-4e84-9c06-7d1b3e5f8a29"


def test_error_carries_status_body_and_request_id_from_meta(mock):
    problem = {"title": "Bad Request", "status": 400, "detail": "to is required", "code": "invalid_phone_numbers",
               "meta": {"request_id": "c2a6e8f4-3b9d-4c1e-8a7f-5d3b1e9c6a24"}}
    mock.route("POST", "/rvm", (400, problem))
    client, _ = client_for(mock)
    with pytest.raises(DcError) as caught:
        client.post("/rvm", {})
    error = caught.value
    assert error.status == 400
    assert error.title == "Bad Request"
    assert error.detail == "to is required"
    assert error.code == "invalid_phone_numbers"
    assert error.request_id == "c2a6e8f4-3b9d-4c1e-8a7f-5d3b1e9c6a24"


def test_request_id_falls_back_to_the_response_header(mock):
    mock.route("GET", "/thing", (403, {"title": "Forbidden"}, {"x-request-id": "5e1a7c3b-9d2f-4b68-8a40-6c2e9f1b3d57"}))
    client, _ = client_for(mock)
    with pytest.raises(DcError) as caught:
        client.get("/thing")
    assert caught.value.request_id == "5e1a7c3b-9d2f-4b68-8a40-6c2e9f1b3d57"


def test_an_error_never_holds_the_credentials(mock):
    mock.route("GET", "/thing", (401, {"title": "Unauthorized"}))
    client, _ = client_for(mock)
    with pytest.raises(DcError) as caught:
        client.get("/thing")
    text = repr(caught.value) + str(caught.value) + caught.value.summary() + repr(vars(caught.value))
    assert API_SECRET not in text


def test_get_retries_429_then_succeeds_and_honors_retry_after(mock):
    mock.route("GET", "/thing", (429, {"title": "Too Many Requests"}, {"Retry-After": "2"}), (200, {"data": {"ok": 1}}))
    client, sleeps = client_for(mock)
    body = client.get("/thing")
    assert body == {"data": {"ok": 1}}
    assert len(mock.requests) == 2
    assert sleeps == [2]


def test_get_gives_up_after_three_tries(mock):
    mock.route("GET", "/thing", (503, {"title": "Unavailable"}))
    client, sleeps = client_for(mock)
    with pytest.raises(DcError) as caught:
        client.get("/thing")
    assert caught.value.status == 503
    assert len(mock.requests) == 3
    assert len(sleeps) == 2


def test_get_does_not_retry_a_client_error(mock):
    mock.route("GET", "/thing", (404, {"title": "Not Found"}))
    client, _ = client_for(mock)
    with pytest.raises(DcError):
        client.get("/thing")
    assert len(mock.requests) == 1


@pytest.mark.parametrize("status", [429, 500, 502])
def test_post_is_never_retried(mock, status):
    mock.route("POST", "/rvm", (status, {"title": "Try later"}))
    client, sleeps = client_for(mock)
    with pytest.raises(DcError):
        client.post("/rvm", {"to": "+13125550142"}, idempotency_key="8d4f2a6c-1e3b-4a57-9c80-2b5d7f1a3e69")
    assert len(mock.requests) == 1
    assert sleeps == []


def test_a_connection_failure_becomes_a_dc_error():
    client = DcClient(API_KEY, API_SECRET, "http://127.0.0.1:1", timeout=2, sleep=lambda _s: None)
    with pytest.raises(DcError) as caught:
        client.post("/rvm", {})
    assert caught.value.status == 0
    assert API_SECRET not in caught.value.summary()


def test_a_redirect_is_an_error_not_followed(mock):
    mock.route("GET", "/thing", (302, {"data": {}}, {"Location": "http://127.0.0.1:1/elsewhere"}))
    client, _ = client_for(mock)
    with pytest.raises(DcError):
        client.get("/thing")
    assert len(mock.requests) == 1
