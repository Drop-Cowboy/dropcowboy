"""A tiny stand-in for the Drop Cowboy API, served on an ephemeral port.

Send only to people who agreed to hear from you. Test with numbers you own.

Tests point DC_BASE_URL at it. It records every request, in order, so a test can
assert the exact calls a recipe made. It also plays the storage service that a
signed upload URL points at, so it takes PUT and keeps each request's raw bytes.
"""
from __future__ import annotations

import json
import threading
from dataclasses import dataclass
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Callable, Dict, List, Optional, Tuple, Union
from urllib.parse import parse_qs, urlsplit

Response = Tuple[int, Any, Optional[Dict[str, str]]]


@dataclass
class Recorded:
    method: str
    path: str
    query: Dict[str, str]
    headers: Dict[str, str]
    body: Any
    raw: bytes = b""


Handler = Union[Response, Tuple[int, Any], Callable[[Recorded], Tuple]]


class MockApi:
    def __init__(self) -> None:
        self.requests: List[Recorded] = []
        self._routes: Dict[Tuple[str, str], List[Handler]] = {}
        self._hooks: Dict[Tuple[str, str], Callable[[Recorded], None]] = {}
        self._hook_threads: List[threading.Thread] = []
        self._lock = threading.Lock()
        self._server = ThreadingHTTPServer(("127.0.0.1", 0), self._handler_class())
        self._thread = threading.Thread(target=self._serve, name="mock-api")

    def _serve(self) -> None:
        self._server.serve_forever(poll_interval=0.05)

    @property
    def base_url(self) -> str:
        return "http://127.0.0.1:" + str(self._server.server_port)

    def route(self, method: str, path: str, *responses: Handler) -> None:
        """Answer `method path` with `responses` in turn. The last one repeats."""
        self._routes[(method, path)] = list(responses)

    def after(self, method: str, path: str, hook: Callable[[Recorded], None]) -> None:
        """Run `hook` in its own thread once the response is sent, like a platform that
        posts a result a moment after it queues a send. `stop` joins the thread."""
        self._hooks[(method, path)] = hook

    def calls(self) -> List[Tuple[str, str]]:
        return [(request.method, request.path) for request in self.requests]

    def find(self, method: str, path: str) -> List[Recorded]:
        return [r for r in self.requests if r.method == method and r.path == path]

    def start(self) -> "MockApi":
        self._thread.start()
        return self

    def stop(self) -> None:
        self._server.shutdown()
        self._thread.join()
        self._server.server_close()
        for thread in self._hook_threads:
            thread.join(timeout=10)

    def __enter__(self) -> "MockApi":
        return self.start()

    def __exit__(self, *exc_info: Any) -> None:
        self.stop()

    def _answer(self, recorded: Recorded) -> Response:
        key = (recorded.method, recorded.path)
        with self._lock:
            self.requests.append(recorded)
            queue = self._routes.get(key)
            handler = None
            if queue:
                handler = queue.pop(0) if len(queue) > 1 else queue[0]
        if handler is None:
            return 404, {"title": "Not Found", "status": 404, "detail": "no mock route"}, None
        if callable(handler):
            handler = handler(recorded)
        if len(handler) == 2:
            return handler[0], handler[1], None
        return handler

    def _handler_class(self):
        api = self

        class RequestHandler(BaseHTTPRequestHandler):
            def do_GET(self):
                self._serve()

            def do_POST(self):
                self._serve()

            def do_PUT(self):
                self._serve()

            def do_DELETE(self):
                self._serve()

            def _serve(self):
                parts = urlsplit(self.path)
                length = int(self.headers.get("Content-Length") or 0)
                raw = self.rfile.read(length) if length else b""
                recorded = Recorded(
                    method=self.command,
                    path=parts.path,
                    query={k: v[0] for k, v in parse_qs(parts.query).items()},
                    headers={k.lower(): v for k, v in self.headers.items()},
                    body=_json_or_none(raw),
                    raw=raw,
                )
                status, body, headers = api._answer(recorded)
                payload = json.dumps(body).encode("utf-8")
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(payload)))
                for name, value in (headers or {}).items():
                    self.send_header(name, value)
                self.end_headers()
                self.wfile.write(payload)
                hook = api._hooks.get((recorded.method, recorded.path))
                if hook:
                    thread = threading.Thread(target=hook, args=(recorded,), name="mock-hook")
                    api._hook_threads.append(thread)
                    thread.start()

            def log_message(self, *args):
                pass

        return RequestHandler


def _json_or_none(raw: bytes) -> Any:
    if not raw:
        return None
    try:
        return json.loads(raw)
    except ValueError:
        return None
