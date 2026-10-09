"""A web server with the two routes that receive send results.

Send only to people who agreed to hear from you. Test with numbers you own.

    POST /callbacks/dropcowboy   the per-send `callback_url`. Unsigned.
    POST /webhooks/dropcowboy    a subscribed webhook. Signed.
    GET  /health                 liveness check

Run it on its own with `python -m dropcowboy_examples.receiver`. The recipes
also start it themselves, in the same process, to wait for a result.
"""
from __future__ import annotations

import json
import logging
import re
import sys
import threading
import time
from dataclasses import dataclass
from typing import Any, Callable, Dict, List, Optional, Set

from flask import Flask, jsonify, request
from werkzeug.serving import make_server

from . import api
from .client import DcClient, DcError
from .config import CALLBACK_PATH, WEBHOOK_PATH, Config, ConfigError, last4, load_config
from .output import say
from .verify import verify_signature

MAX_BODY_BYTES = 1024 * 1024
CALLBACK_FIELDS = (
    "status", "reason", "reason_code", "caller_id", "phone_number",
    "foreign_id", "drop_id", "contact_id", "proof_of_delivery_url",
)
UNSAFE_CHARACTERS = re.compile(r"[^\x20-\x7e]")


@dataclass(frozen=True)
class ReceivedEvent:
    """One accepted callback or webhook. `source` is "callback" or "webhook"."""

    source: str
    name: str
    data: Dict[str, Any]


class Receiver:
    """Holds what the routes received, so a recipe can wait for its own result."""

    def __init__(
        self,
        signing_secrets: Optional[List[str]] = None,
        clock: Callable[[], float] = time.time,
        out: Callable[[str], None] = say,
    ) -> None:
        self.signing_secrets = list(signing_secrets or [])
        self._clock = clock
        self._out = out
        self._events: List[ReceivedEvent] = []
        self._seen_event_ids: Set[str] = set()
        self._changed = threading.Condition()
        self.app = self._build_app()

    def received_events(self) -> List[ReceivedEvent]:
        """A copy of everything received so far, oldest first."""
        with self._changed:
            return list(self._events)

    def wait_for(
        self,
        matches: Callable[[ReceivedEvent], bool],
        timeout_seconds: float,
        since: int = 0,
    ) -> Optional[ReceivedEvent]:
        """Block until an event after index `since` satisfies `matches`, or the timeout passes."""
        deadline = time.monotonic() + timeout_seconds
        checked = since
        with self._changed:
            while True:
                for event in self._events[checked:]:
                    if matches(event):
                        return event
                checked = len(self._events)
                remaining = deadline - time.monotonic()
                if remaining <= 0:
                    return None
                self._changed.wait(remaining)

    def _build_app(self) -> Flask:
        app = Flask(__name__)
        app.config["MAX_CONTENT_LENGTH"] = MAX_BODY_BYTES

        @app.get("/health")
        def health():
            return jsonify({"ok": True})

        @app.post(CALLBACK_PATH)
        def callback():
            return self._handle_callback()

        @app.post(WEBHOOK_PATH)
        def webhook():
            return self._handle_webhook()

        return app

    def _handle_callback(self):
        # The callback is not signed, so anyone who learns this URL can post to it.
        # Treat it as a hint: keep only the fields we need, and let the recipe match
        # `foreign_id` against the sends it made before trusting the result.
        body = _json_object(request.get_data())
        if body is None:
            return jsonify({"error": "invalid_body"}), 400
        data = {name: body[name] for name in CALLBACK_FIELDS if name in body}
        self._record(ReceivedEvent("callback", "callback", data))
        self._out(
            "Callback: status=" + printable(data.get("status"))
            + " reason=" + printable(data.get("reason"))
            + " reason_code=" + printable(data.get("reason_code"))
            + " caller_id=" + printable(data.get("caller_id"))
            + " foreign_id=" + printable(data.get("foreign_id"))
        )
        return jsonify({"received": True})

    def _handle_webhook(self):
        if not self.signing_secrets:
            return jsonify({"error": "no_signing_secret"}), 503

        # Verify the raw bytes. Parsing the JSON and serializing it again can change
        # spacing or key order, and then no signature would match.
        raw_body = request.get_data()
        check = verify_signature(
            raw_body,
            request.headers.get("X-Signature"),
            request.headers.get("X-Timestamp"),
            self.signing_secrets,
            version=request.headers.get("X-Signature-Version"),
            now=self._clock(),
        )
        if not check.valid:
            return jsonify({"error": check.error}), 401

        event = _json_object(raw_body)
        if event is None:
            return jsonify({"error": "invalid_body"}), 400

        # The same event can arrive more than once (retries, other webhooks).
        # An in-memory set is enough here. In production use a database unique index.
        event_id = event.get("event_id") or request.headers.get("X-Event-Id")
        if event_id and not self._first_sighting(str(event_id)):
            return jsonify({"received": True, "duplicate": True})

        name = event.get("event") if isinstance(event.get("event"), str) else "unknown"
        data = event.get("data") if isinstance(event.get("data"), dict) else {}
        self._record(ReceivedEvent("webhook", name, data))
        self._out(_describe_webhook(name, data))
        return jsonify({"received": True})

    def _first_sighting(self, event_id: str) -> bool:
        with self._changed:
            if event_id in self._seen_event_ids:
                return False
            self._seen_event_ids.add(event_id)
            return True

    def _record(self, event: ReceivedEvent) -> None:
        with self._changed:
            self._events.append(event)
            self._changed.notify_all()


class EmbeddedServer:
    """A real threaded werkzeug server around a Receiver. Use it as a context manager.

    Port 0 picks a free port. Leaving the `with` block stops the server and joins its
    thread, so nothing is left running.
    """

    def __init__(self, receiver: Receiver, host: str = "127.0.0.1", port: int = 0) -> None:
        # werkzeug logs every request at INFO. Keep the recipe output readable.
        logging.getLogger("werkzeug").setLevel(logging.WARNING)
        self.receiver = receiver
        self._server = make_server(host, port, receiver.app, threaded=True)
        self._thread = threading.Thread(target=self._serve, name="receiver")

    def _serve(self) -> None:
        self._server.serve_forever(poll_interval=0.05)

    @property
    def port(self) -> int:
        return self._server.server_port

    @property
    def base_url(self) -> str:
        return "http://127.0.0.1:" + str(self.port)

    def start(self) -> "EmbeddedServer":
        self._thread.start()
        return self

    def stop(self) -> None:
        if self._thread.is_alive():
            self._server.shutdown()
            self._thread.join()
        self._server.server_close()

    def wait_forever(self) -> None:
        """Block the calling thread until Ctrl-C."""
        while self._thread.is_alive():
            self._thread.join(timeout=0.5)

    def __enter__(self) -> "EmbeddedServer":
        return self.start()

    def __exit__(self, *exc_info: Any) -> None:
        self.stop()


def load_signing_secrets(config: Config, client: Optional[DcClient], out: Callable[[str], None] = say) -> List[str]:
    """Use DC_WEBHOOK_SECRET when set, else ask the API for the account's secrets.

    If neither works the webhook route answers 503 and the callback route still works.
    """
    if config.signing_secrets:
        secrets = config.signing_secrets
    elif client is None:
        secrets = []
    else:
        try:
            secrets = api.webhook_signing_secrets(client)
        except DcError as error:
            out("Could not load signing secrets (" + error.summary() + "). The webhook route will answer 503.")
            return []
    if secrets:
        out("Loaded " + str(len(secrets)) + " signing secret(s), ending in "
            + ", ".join(last4(secret) for secret in secrets) + ".")
    else:
        out("No signing secret loaded. Subscribe first (python subscribe.py) or set DC_WEBHOOK_SECRET. "
            "The webhook route will answer 503.")
    return secrets


def _json_object(raw: bytes) -> Optional[Dict[str, Any]]:
    """Parse `raw` as JSON. Only an object counts: arrays, strings and numbers are refused."""
    try:
        parsed = json.loads(raw)
    except ValueError:
        return None
    return parsed if isinstance(parsed, dict) else None


def _describe_webhook(name: str, data: Dict[str, Any]) -> str:
    if name == "contact.rvm.status":
        return (
            "Webhook " + name + ": status=" + printable(data.get("status"))
            + " reason=" + printable(data.get("reason"))
            + " reason_code=" + printable(data.get("reason_code"))
            + " to=" + printable(data.get("to"))
            + " from=" + printable(data.get("from"))
        )
    if name == "contact.rvm.receipt":
        return "Webhook " + name + ": proof_of_delivery_url=" + printable(data.get("proof_of_delivery_url"))
    return "Webhook " + printable(name) + ": accepted, not handled by this example"


def printable(value: Any) -> str:
    """Make a received value safe to print: printable ASCII only, and short."""
    return UNSAFE_CHARACTERS.sub("?", str(value))[:200]


def main(argv: Optional[List[str]] = None) -> int:
    try:
        config = load_config()
        client = None
        if config.key and config.secret:
            client = DcClient(config.key, config.secret, config.base_url)
        secrets = load_signing_secrets(config, client)
        receiver = Receiver(secrets)
        with EmbeddedServer(receiver, port=config.port) as server:
            say("Listening on " + server.base_url + " (Ctrl-C to stop)")
            say("  callback route: POST " + CALLBACK_PATH)
            say("  webhook route:  POST " + WEBHOOK_PATH)
            if config.public_url:
                say("  public URL:     " + config.public_url)
            try:
                server.wait_forever()
            except KeyboardInterrupt:
                say("Stopping.")
    except ConfigError as error:
        print("Setup problem: " + str(error), file=sys.stderr)
        return 1
    except OSError as error:
        print("Could not start the receiver: " + str(error), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
