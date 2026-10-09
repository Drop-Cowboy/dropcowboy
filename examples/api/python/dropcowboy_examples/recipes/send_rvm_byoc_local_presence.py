"""Send from a phone line that holds several of your numbers (local presence).

Send only to people who agreed to hear from you. Test with numbers you own.

Run: python -m dropcowboy_examples.recipes.send_rvm_byoc_local_presence

The steps: find or create a phone line, put numbers on it, then send with
`phone_line_id` only. The platform picks which number on the line to show. It
chooses the number on the line closest to the recipient and falls back to a
number on the line when it cannot place the recipient. This recipe never sends
`caller_id`, because naming one would bypass that choice.

Renting numbers charges your carrier, so it only happens when DC_RENT=yes.
Without it, searching for numbers is a dry run.
"""
from __future__ import annotations

import sys
import uuid
from typing import Any, Callable, Dict, List, Optional

from .. import api
from ..audio import audio_from_env
from ..client import DcClient
from ..config import Config, ConfigError
from ..output import say
from ..receiver import Receiver
from ..cli import run_main
from .flow import send_and_wait, sent_from, with_result_fields

Output = Callable[[str], None]


def build_body(config: Config, phone_line_id: str, audio: Dict[str, str], foreign_id: str) -> Dict[str, Any]:
    body = {"to": config.require_recipient(), "phone_line_id": phone_line_id}
    body.update(audio)
    return with_result_fields(body, config, foreign_id)


def run(
    config: Config,
    client: DcClient,
    out: Output = say,
    receiver: Optional[Receiver] = None,
    poll_seconds: float = api.IMPORT_POLL_SECONDS,
) -> int:
    config.require_recipient()
    audio = audio_from_env(config, client, retail=False, out=out)

    line_id = find_or_create_line(config, client, out)
    if config.numbers:
        load_numbers(config, client, line_id, out, poll_seconds)
    if config.area_codes:
        search_and_maybe_rent(config, client, line_id, out)

    numbers = api.list_line_numbers(client, line_id)
    out("The line has " + str(len(numbers)) + " number(s)" + (":" if numbers else "."))
    for number in numbers:
        out("  " + str(number.get("phone_number")))
    if not numbers:
        raise ConfigError(
            "A line with no numbers cannot send. Set DC_NUMBERS to numbers you own, or "
            "DC_AREA_CODES with DC_RENT=yes to rent some."
        )

    foreign_id = str(uuid.uuid4())
    body = build_body(config, line_id, audio, foreign_id)
    event = send_and_wait(config, client, body, foreign_id, out=out, receiver=receiver)
    if event is not None:
        explain_pick(sent_from(event), out)
    return 0


def find_or_create_line(config: Config, client: DcClient, out: Output) -> str:
    if config.phone_line_id:
        out("Using phone line " + config.phone_line_id)
        return config.phone_line_id
    existing = api.find_phone_line(client, config.line_name)
    if existing:
        out("Using the existing phone line named " + repr(config.line_name))
        return existing["ivr_id"]
    created = api.create_phone_line(client, config.line_name)
    if not created.get("ivr_id"):
        raise ConfigError("The API created a line but returned no ivr_id.")
    out("Created the phone line named " + repr(config.line_name))
    return created["ivr_id"]


def load_numbers(config: Config, client: DcClient, line_id: str, out: Output, poll_seconds: float) -> None:
    """Load numbers you already own onto the line (BYOC accounts only)."""
    job_id = api.import_numbers(client, config.numbers, line_id)
    out("Loading " + str(len(config.numbers)) + " number(s). Import job " + job_id)
    job = api.wait_for_import(client, job_id, poll_seconds=poll_seconds)
    if job.get("status") == "failed":
        raise ConfigError("The import failed: " + str(job.get("error")))
    result = job.get("result") or {}
    out("Import finished: added " + str(result.get("added")) + ", updated " + str(result.get("updated"))
        + ", invalid " + str(result.get("invalid")) + ", conflicts " + str(result.get("conflicts")))


def search_and_maybe_rent(config: Config, client: DcClient, line_id: str, out: Output) -> None:
    to_rent: List[str] = []
    for area_code in config.area_codes:
        candidates = api.search_available_numbers(client, area_code, limit=3)
        out("Area code " + area_code + ": " + str(len(candidates)) + " number(s) available")
        for candidate in candidates:
            out("  " + str(candidate.get("phone_number")))
        if candidates and candidates[0].get("phone_number"):
            to_rent.append(candidates[0]["phone_number"])

    if not to_rent:
        return
    if not config.rent:
        out("Dry run: set DC_RENT=yes to rent " + ", ".join(to_rent) + ". Renting charges your carrier.")
        return
    rented = api.rent_numbers(client, to_rent, line_id)
    out("Rented " + ", ".join(rented))


def explain_pick(sent_from_number: Optional[str], out: Output) -> None:
    if not sent_from_number:
        return
    out("The platform picked " + sent_from_number + " from your line.")
    out("It chooses the number on the line closest to the recipient, and falls back to a number on "
        "the line when it cannot place the recipient.")
    out("Always identify your business location truthfully when asked by recipients.")


def main() -> int:
    return run_main(run)


if __name__ == "__main__":
    sys.exit(main())
