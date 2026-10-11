"""Manage the webhooks that deliver ringless voicemail results to your receiver.

Send only to people who agreed to hear from you. Test with numbers you own.

Run: python subscribe.py                      (one webhook for contact.rvm.status)
     python subscribe.py --receipt            (one webhook for status and contact.rvm.receipt)
     python subscribe.py --events a,b         (one webhook for exactly these event types)
     python subscribe.py --list               (your webhooks, by webhook_id)
     python subscribe.py --update WEBHOOK_ID --events a,b --url URL --name "My hook"
                                              (change one webhook; send only what changes)
     python subscribe.py --rotate WEBHOOK_ID  (a new signing secret for that webhook)
     python subscribe.py --delete WEBHOOK_ID  (delete that webhook, and no other)

Creating a webhook needs DC_PUBLIC_URL, the public HTTPS address of your
receiver. The other commands do not. The key needs the `webhooks:write` scope.

A webhook is one URL, the event types it receives and its own signing secret.
An account holds any number of them; creating one never replaces another.
"""
from __future__ import annotations

import argparse
import sys
from typing import Any, Callable, Dict, List, Optional

from dropcowboy_examples import api
from dropcowboy_examples.cli import run_main
from dropcowboy_examples.client import DcClient
from dropcowboy_examples.config import Config, ConfigError, last4
from dropcowboy_examples.output import say

STATUS_EVENT = "contact.rvm.status"
RECEIPT_EVENT = "contact.rvm.receipt"
MAX_NAME_LENGTH = 100


def subscribe(config: Config, client: DcClient, event_types: List[str], out: Callable[[str], None] = say) -> int:
    """Create ONE webhook that carries every event type in `event_types`."""
    hook_url = config.webhook_url
    if not hook_url:
        raise ConfigError("Set DC_PUBLIC_URL to the public HTTPS address of your receiver (see the README).")

    created = api.create_webhook(client, event_types, hook_url)
    out("Created webhook " + str(created.get("webhook_id", "unknown")) + " for " + ", ".join(event_types)
        + " at " + hook_url)
    out("  signing secret ends in " + last4(created.get("signing_secret", "")))
    out("The receiver loads the signing secrets by itself, or set DC_WEBHOOK_SECRET.")
    out("Creating another webhook adds to the list; it never replaces this one. "
        "To change a secret, rotate it: python subscribe.py --rotate WEBHOOK_ID")
    return 0


def list_webhooks(client: DcClient, out: Callable[[str], None] = say) -> int:
    webhooks = api.list_webhooks(client)
    if not webhooks:
        out('No webhooks yet. Run "python subscribe.py" to create one.')
        return 0
    for hook in webhooks:
        events = ", ".join(hook.get("event_types") or [])
        out(str(hook.get("webhook_id")) + "  " + events + "  " + str(hook.get("hook_url") or hook.get("url")))
    return 0


def update_webhook(client: DcClient, webhook_id: str, changes: Dict[str, Any],
                   out: Callable[[str], None] = say) -> int:
    """Send only the fields in `changes`. `event_types` replaces the whole set of this webhook.
    The webhook_id and the signing secret do not change."""
    if not changes:
        raise ConfigError("Nothing to update. Pass at least one of --url, --events (or --receipt) and --name.")
    updated = api.update_webhook(client, webhook_id, changes)
    out("Updated webhook " + str(updated.get("webhook_id") or webhook_id))
    out("  name:   " + str(updated.get("name") or "none"))
    out("  url:    " + str(updated.get("hook_url") or updated.get("url") or "unknown"))
    out("  events: " + (", ".join(updated.get("event_types") or []) or "unknown"))
    out("The signing secret did not change.")
    return 0


def delete_webhook(client: DcClient, webhook_id: str, out: Callable[[str], None] = say) -> int:
    api.delete_webhook(client, webhook_id)
    out("Deleted webhook " + webhook_id + ". Your other webhooks are unchanged.")
    return 0


def rotate_secret(client: DcClient, webhook_id: str, out: Callable[[str], None] = say) -> int:
    """Deliveries are signed with the new secret from now on. The receiver accepts a delivery
    signed with any secret it holds, so add the new one and keep the old one until the
    deliveries already in flight have arrived."""
    rotated = api.rotate_webhook_secret(client, webhook_id)
    out("Rotated the signing secret of webhook " + webhook_id + ". The new secret ends in "
        + last4(rotated.get("signing_secret", "")) + ".")
    out("New deliveries are signed with it. Add it to the receiver (restart it, or set DC_WEBHOOK_SECRET) "
        "and keep the old secret there until in-flight deliveries have arrived.")
    return 0


def _named_event_types(args: argparse.Namespace) -> Optional[List[str]]:
    if args.events is not None:
        events = [event.strip() for event in args.events.split(",") if event.strip()]
        if not events:
            raise ConfigError("--events needs a comma separated list, for example "
                              "--events contact.rvm.status,contact.rvm.receipt")
        return events
    return [STATUS_EVENT, RECEIPT_EVENT] if args.receipt else None


def _event_types(args: argparse.Namespace) -> List[str]:
    return _named_event_types(args) or [STATUS_EVENT]


def _changes(args: argparse.Namespace) -> Dict[str, Any]:
    changes: Dict[str, Any] = {}
    if args.url is not None:
        url = args.url.strip()
        if not url.lower().startswith("https://"):
            raise ConfigError("--url must be a public HTTPS address, "
                              "for example https://abc123.example.com/webhooks/dropcowboy")
        changes["hook_url"] = url
    event_types = _named_event_types(args)
    if event_types is not None:
        changes["event_types"] = event_types
    if args.name is not None:
        name = args.name.strip()
        if not name or len(name) > MAX_NAME_LENGTH:
            raise ConfigError("--name must be 1 to " + str(MAX_NAME_LENGTH) + " characters.")
        changes["name"] = name
    return changes


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Create, list, update, rotate and delete webhooks for ringless voicemail results.")
    parser.add_argument("--receipt", action="store_true",
                        help="also receive " + RECEIPT_EVENT + " (the link to the recording)")
    parser.add_argument("--events", metavar="A,B",
                        help="comma separated event types for the new webhook, or with --update the new set")
    parser.add_argument("--url", metavar="URL", help="with --update: the new public HTTPS delivery URL")
    parser.add_argument("--name", metavar="NAME", help="with --update: the new name, 1 to 100 characters")
    action = parser.add_mutually_exclusive_group()
    action.add_argument("--list", action="store_true", help="list your webhooks")
    action.add_argument("--update", metavar="WEBHOOK_ID",
                        help="change one webhook; send only what changes (--url, --events/--receipt, --name)")
    action.add_argument("--delete", metavar="WEBHOOK_ID", help="delete one webhook")
    action.add_argument("--rotate", metavar="WEBHOOK_ID", help="issue a new signing secret for one webhook")
    args = parser.parse_args(argv)
    if not args.update and (args.url is not None or args.name is not None):
        parser.error("--url and --name go with --update WEBHOOK_ID")

    if args.list:
        return run_main(lambda config, client: list_webhooks(client))
    if args.update:
        return run_main(lambda config, client: update_webhook(client, args.update.strip(), _changes(args)))
    if args.delete:
        return run_main(lambda config, client: delete_webhook(client, args.delete.strip()))
    if args.rotate:
        return run_main(lambda config, client: rotate_secret(client, args.rotate.strip()))
    return run_main(lambda config, client: subscribe(config, client, _event_types(args)))


if __name__ == "__main__":
    sys.exit(main())
