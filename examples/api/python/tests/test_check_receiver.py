"""check_receiver.py against a local endpoint that answers however a test tells it to.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import json
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Dict, List, Tuple

import pytest

import check_receiver
from dropcowboy_examples.config import ConfigError, load_config
from dropcowboy_examples.verify import verify_signature

from .conftest import FIXTURES

SECRET = "e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30"
OTHER_SECRET = "3a8d6f1c-9e4b-4c27-a5d0-7b2e9f6c1a84"
WEB_API_404 = json.dumps({"Message": "No HTTP resource was found that matches the request URI.",
                          "MessageDetail": "No action was found on the controller 'Dropcowboy' that matches "
                                           "the request."})


class Endpoint:
    """Records each POST and answers with (status, body, delay seconds) per path."""

    def __init__(self) -> None:
        self.answers: Dict[str, Tuple[int, str, float]] = {}
        self.received: List[Dict[str, Any]] = []
        endpoint = self

        class Handler(BaseHTTPRequestHandler):
            def do_POST(self):
                length = int(self.headers.get("Content-Length") or 0)
                raw = self.rfile.read(length)
                endpoint.received.append({"path": self.path, "raw": raw,
                                          "headers": {k.lower(): v for k, v in self.headers.items()}})
                status, body, delay = endpoint.answers.get(self.path, (200, "", 0.0))
                if delay:
                    time.sleep(delay)
                payload = body.encode("utf-8")
                try:
                    self.send_response(status)
                    if status in (301, 302):
                        self.send_header("Location", "/elsewhere")
                    self.send_header("Content-Length", str(len(payload)))
                    self.end_headers()
                    self.wfile.write(payload)
                except OSError:
                    pass

            def log_message(self, *args):
                pass

        self._server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self._thread = threading.Thread(target=self._server.serve_forever, kwargs={"poll_interval": 0.05})

    def url(self, path: str) -> str:
        return "http://127.0.0.1:" + str(self._server.server_port) + path

    def __enter__(self) -> "Endpoint":
        self._thread.start()
        return self

    def __exit__(self, *exc_info: Any) -> None:
        self._server.shutdown()
        self._thread.join()
        self._server.server_close()


@pytest.fixture
def endpoint():
    with Endpoint() as server:
        yield server


def config(**extra: str):
    return load_config(dict(extra))


def run(endpoint_or_urls, *urls, **settings):
    lines: List[str] = []
    timeouts = {key: settings.pop(key) for key in ("callback_timeout", "webhook_timeout") if key in settings}
    results = check_receiver.check_receiver(config(**settings), *urls, out=lines.append, **timeouts)
    return results, "\n".join(lines)


def test_posts_the_callback_and_a_correctly_signed_fresh_webhook(endpoint):
    results, text = run(endpoint, endpoint.url("/callbacks/dropcowboy"), endpoint.url("/webhooks/dropcowboy"),
                        DC_WEBHOOK_SECRET=SECRET)

    assert [r.verdict for r in results] == ["ok", "ok"]
    callback, webhook = endpoint.received
    assert callback["path"] == "/callbacks/dropcowboy"
    assert json.loads(callback["raw"]) == check_receiver.SAMPLE_CALLBACK
    assert "x-signature" not in callback["headers"]

    headers = webhook["headers"]
    assert verify_signature(webhook["raw"], headers["x-signature"], headers["x-timestamp"], [SECRET],
                            headers["x-signature-version"]).valid
    assert abs(int(headers["x-timestamp"]) - time.time()) < 60
    body = json.loads(webhook["raw"])
    assert body["event_id"] != check_receiver.SAMPLE_WEBHOOK["event_id"]
    assert headers["x-event-id"] == body["event_id"]
    assert headers["x-attempt"] == "1"
    assert body["data"] == check_receiver.SAMPLE_WEBHOOK["data"]
    assert "All checks passed." in text
    assert SECRET not in text
    assert "7c30" in text


def test_signs_with_the_first_secret_in_the_list(endpoint):
    run(endpoint, endpoint.url("/callbacks"), endpoint.url("/webhooks"), DC_WEBHOOK_SECRET=OTHER_SECRET + "," + SECRET)

    headers = endpoint.received[1]["headers"]
    assert verify_signature(endpoint.received[1]["raw"], headers["x-signature"], headers["x-timestamp"],
                            [OTHER_SECRET]).valid


def test_a_webhook_url_needs_a_secret(endpoint):
    with pytest.raises(ConfigError, match="DC_WEBHOOK_SECRET"):
        run(endpoint, endpoint.url("/callbacks"), endpoint.url("/webhooks"))
    assert endpoint.received == []


def test_only_a_callback_needs_no_secret(endpoint):
    results, _text = run(endpoint, endpoint.url("/callbacks"))
    assert [r.kind for r in results] == ["callback"]
    assert len(endpoint.received) == 1


@pytest.mark.parametrize("status", [404, 405])
def test_404_and_405_mean_the_route_or_verb_is_wrong(endpoint, status):
    endpoint.answers["/callbacks"] = (status, "", 0.0)
    results, text = run(endpoint, endpoint.url("/callbacks"))
    assert results[0].verdict == "route"
    assert "exactly this path: /callbacks" in text
    assert "not retried" in text
    assert "Some checks failed." in text and "Settings > API Logs" in text


def test_the_web_api_no_action_answer_gets_the_attribute_routing_fix(endpoint):
    endpoint.answers["/api/dropcowboy/callback"] = (404, WEB_API_404, 0.0)
    _results, text = run(endpoint, endpoint.url("/api/dropcowboy/callback"))
    assert "[HttpPost]" in text and "config.MapHttpAttributeRoutes()" in text and "C# README" in text


@pytest.mark.parametrize("status", [401, 403])
def test_401_and_403_mean_the_signature_check_is_failing(endpoint, status):
    endpoint.answers["/webhooks"] = (status, "", 0.0)
    results, text = run(endpoint, endpoint.url("/callbacks"), endpoint.url("/webhooks"), DC_WEBHOOK_SECRET=SECRET)
    assert [r.verdict for r in results] == ["ok", "auth"]
    assert "signature check is failing" in text


def test_a_callback_behind_authentication_is_explained(endpoint):
    endpoint.answers["/callbacks"] = (401, "", 0.0)
    results, text = run(endpoint, endpoint.url("/callbacks"))
    assert results[0].verdict == "auth"
    assert "Callbacks carry no signature" in text


def test_too_slow(endpoint):
    endpoint.answers["/callbacks"] = (200, "", 0.6)
    results, text = run(endpoint, endpoint.url("/callbacks"), callback_timeout=0.2)
    assert results[0].verdict == "slow"
    assert "Too slow" in text


@pytest.mark.parametrize("status,retried", [(500, True), (503, True), (429, True), (400, False), (422, False)])
def test_other_non_2xx_on_a_webhook(endpoint, status, retried):
    endpoint.answers["/webhooks"] = (status, "", 0.0)
    results, text = run(endpoint, endpoint.url("/callbacks"), endpoint.url("/webhooks"), DC_WEBHOOK_SECRET=SECRET)
    assert results[1].verdict == "rejected"
    assert ("is retried, at most 3 attempts" in text) is retried
    assert ("is not retried, so the event is lost" in text) is not retried


def test_a_redirect_is_not_followed(endpoint):
    endpoint.answers["/callbacks"] = (301, "", 0.0)
    results, _text = run(endpoint, endpoint.url("/callbacks"))
    assert results[0].status == 301 and results[0].verdict == "rejected"
    assert len(endpoint.received) == 1


def test_unreachable():
    with Endpoint() as closed:
        url = closed.url("/callbacks")
    results, text = run(None, url)
    assert results[0].verdict == "unreachable"
    assert "Could not connect" in text


def test_a_local_address_gets_a_note(endpoint):
    _results, text = run(endpoint, endpoint.url("/callbacks"))
    assert "is not a public https:// address" in text


def test_sample_and_malformed_urls_are_refused_before_posting(endpoint):
    with pytest.raises(ConfigError, match="callback-url=https://receiver.example.com/callbacks: this is a sample"):
        run(endpoint, "https://receiver.example.com/callbacks")
    with pytest.raises(ConfigError, match="webhook-url="):
        run(endpoint, endpoint.url("/callbacks"), "https://hooks.example.com/webhooks", DC_WEBHOOK_SECRET=SECRET)
    with pytest.raises(ConfigError, match="full http"):
        run(endpoint, "callbacks/dropcowboy")
    assert endpoint.received == []


def test_main_exits_1_on_a_failed_check_and_on_usage(endpoint, monkeypatch, capsys):
    for name in ("DC_WEBHOOK_SECRET",):
        monkeypatch.delenv(name, raising=False)
    endpoint.answers["/callbacks"] = (404, "", 0.0)
    assert check_receiver.main([endpoint.url("/callbacks")]) == 1
    assert check_receiver.main([]) == 1
    assert "Usage" in capsys.readouterr().err
    endpoint.answers["/callbacks"] = (200, "", 0.0)
    assert check_receiver.main([endpoint.url("/callbacks")]) == 0


def test_the_embedded_bodies_match_the_fixtures():
    callback = json.loads((FIXTURES / "callback.rvm-success.json").read_text(encoding="utf-8"))
    webhook = json.loads((FIXTURES / "webhook.rvm-status.json").read_text(encoding="utf-8"))
    assert check_receiver.SAMPLE_CALLBACK == callback
    assert check_receiver.SAMPLE_WEBHOOK == webhook


@pytest.mark.parametrize("kind,status,elapsed,timed_out,error,verdict", [
    ("callback", 200, 10, False, None, "ok"),
    ("callback", 204, 10, False, None, "ok"),
    ("callback", 404, 10, False, None, "route"),
    ("webhook", 405, 10, False, None, "route"),
    ("webhook", 401, 10, False, None, "auth"),
    ("webhook", 403, 10, False, None, "auth"),
    ("callback", None, 10000, True, None, "slow"),
    ("webhook", 200, 6000, False, None, "slow"),
    ("callback", None, 3, False, "ConnectionError", "unreachable"),
    ("callback", 500, 10, False, None, "rejected"),
    ("webhook", 422, 10, False, None, "rejected"),
])
def test_classify(kind, status, elapsed, timed_out, error, verdict):
    timeout = check_receiver.CALLBACK_TIMEOUT_SECONDS if kind == "callback" else check_receiver.WEBHOOK_TIMEOUT_SECONDS
    result = check_receiver.classify(kind, "https://abc123.example.test/hook", status, elapsed, timed_out, error,
                                     timeout)
    assert result.verdict == verdict
    assert result.ok is (verdict == "ok")
