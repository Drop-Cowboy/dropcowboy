"""Steps every recipe shares: send, wait for the result, report.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

from typing import Any, Callable, Dict, Optional

from .. import api
from ..client import DcClient
from ..config import Config
from ..hints import API_LOGS_HINT, outcome_hint
from ..output import say
from ..receiver import EmbeddedServer, ReceivedEvent, Receiver, load_signing_secrets, printable

OUTCOMES_URL = "https://www.dropcowboy.com/developers/api/outcomes"

Output = Callable[[str], None]


def with_result_fields(body: Dict[str, Any], config: Config, foreign_id: str) -> Dict[str, Any]:
    """Add the fields that let you find the result later.

    `foreign_id` comes back on the callback only. Status webhooks do not carry it.
    The callback is unsigned and is tried once, so treat it as a hint and rely on a
    subscribed webhook for anything that matters.
    """
    body["foreign_id"] = foreign_id
    if config.callback_url:
        body["callback_url"] = config.callback_url
    return body


def send_and_wait(
    config: Config,
    client: DcClient,
    body: Dict[str, Any],
    foreign_id: str,
    out: Output = say,
    receiver: Optional[Receiver] = None,
) -> Optional[ReceivedEvent]:
    """Send one voicemail, then wait up to DC_WAIT_SECONDS for its result.

    The receiver starts before the send, so a fast result cannot arrive while nobody is
    listening. Pass `receiver` to use one that is already serving (the tests do).
    Returns the matching event, or None when nothing arrived.
    """
    out("Sending a ringless voicemail to " + body["to"])
    out("  foreign_id: " + foreign_id)

    if not config.callback_url or config.wait_seconds == 0:
        _send(client, body, out)
        out(_not_waiting_notice(config))
        out(API_LOGS_HINT)
        return None

    if receiver is not None:
        return _send_then_wait(config, client, body, foreign_id, out, receiver)

    receiver = Receiver(load_signing_secrets(config, client, out))
    with EmbeddedServer(receiver, port=config.port) as server:
        out("Receiver listening on " + server.base_url + ", reached through " + config.public_url)
        return _send_then_wait(config, client, body, foreign_id, out, receiver)


def sent_from(event: ReceivedEvent) -> Optional[str]:
    """The number the platform sent from: `caller_id` on a callback, `from` on a webhook."""
    value = event.data.get("caller_id") if event.source == "callback" else event.data.get("from")
    return value if isinstance(value, str) and value else None


def _send_then_wait(
    config: Config,
    client: DcClient,
    body: Dict[str, Any],
    foreign_id: str,
    out: Output,
    receiver: Receiver,
) -> Optional[ReceivedEvent]:
    already_received = len(receiver.received_events())
    _send(client, body, out)

    out("Waiting up to " + str(config.wait_seconds) + " seconds for the result...")
    event = receiver.wait_for(
        lambda candidate: _is_result_for(candidate, foreign_id, body["to"]),
        config.wait_seconds,
        since=already_received,
    )
    if event is None:
        out("No result arrived within " + str(config.wait_seconds) + " seconds. It can still arrive "
            "at the receiver or on your subscribed webhook.")
        out(API_LOGS_HINT)
        return None
    _print_result(event, out)
    return event


def _is_result_for(event: ReceivedEvent, foreign_id: str, to: str) -> bool:
    """A callback names our `foreign_id`. A status webhook carries no `foreign_id`, so match on `to`."""
    if event.source == "callback":
        return event.data.get("foreign_id") == foreign_id
    return event.name == "contact.rvm.status" and event.data.get("to") == to


def _send(client: DcClient, body: Dict[str, Any], out: Output) -> None:
    queued = api.send_rvm(client, body)
    out("Accepted by the API (202, " + str(queued.get("status")) + "). message_id: " + str(queued.get("message_id")))
    out("A 202 means the request was received. The result arrives later.")


def _not_waiting_notice(config: Config) -> str:
    if not config.callback_url:
        return ("No DC_PUBLIC_URL is set, so this send has no callback_url and the result will not "
                "arrive here. Set DC_PUBLIC_URL to your tunnel address to see it (see the README).")
    return ("DC_WAIT_SECONDS is 0, so not waiting. The result goes to " + config.callback_url
            + " and to any subscribed webhook.")


def _print_result(event: ReceivedEvent, out: Output) -> None:
    data = event.data
    out("Result from the " + event.source + ":")
    out("  status: " + printable(data.get("status")))
    out("  reason: " + (printable(data.get("reason")) or "(none)"))
    out("  reason_code: " + printable(data.get("reason_code")))
    from_number = sent_from(event)
    if from_number:
        out("  sent from: " + printable(from_number))
    hint = outcome_hint(data.get("reason_code"))
    if hint:
        out("What to do: " + hint)
    out("What each reason_code means: " + OUTCOMES_URL)
