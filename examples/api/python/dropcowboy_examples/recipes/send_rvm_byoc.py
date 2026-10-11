"""Send one ringless voicemail from your own number on your own carrier.

Send only to people who agreed to hear from you. Test with numbers you own.

Run: python -m dropcowboy_examples.recipes.send_rvm_byoc

Bring-your-own-carrier (BYOC) accounts name the caller ID on the request and
usually host their own audio. There is no `phone_line_id`: when both are sent
the line wins, and a number that is not loaded into Drop Cowboy is not on a line.

The caller ID must be a number you are entitled to use.
Always identify your business location truthfully when asked by recipients.
"""
from __future__ import annotations

import sys
import uuid
from typing import Any, Callable, Dict, Optional

from .. import api
from ..audio import audio_from_env, require_audio_setting
from ..client import DcClient
from ..config import Config, ConfigError
from ..output import say
from ..receiver import Receiver
from ..cli import run_main
from .flow import send_and_wait, with_result_fields

CONNECT_GUIDE = "https://www.dropcowboy.com/developers/api/bring-your-own-carrier"


def build_body(config: Config, audio: Dict[str, str], foreign_id: str) -> Dict[str, Any]:
    body: Dict[str, Any] = {"to": config.require_recipient(), "caller_id": config.require_caller_id()}
    body.update(audio)
    byoc = config.byoc_options()
    if byoc:
        body["byoc"] = byoc
    return with_result_fields(body, config, foreign_id)


def run(
    config: Config,
    client: DcClient,
    out: Callable[[str], None] = say,
    receiver: Optional[Receiver] = None,
) -> int:
    config.require_recipient()
    config.require_caller_id()
    config.byoc_options()
    require_audio_setting(config)

    # A send does not fail on the request when no carrier is connected: it answers 202
    # and the failure arrives later. Checking first gives a clearer message.
    if not api.byoc_connected(client):
        raise ConfigError("No carrier is connected to this account. Connect one first: " + CONNECT_GUIDE)
    audio = audio_from_env(config, client, retail=False, out=out)

    out("DC_CALLER_ID must be a number you are entitled to use.")
    out("Always identify your business location truthfully when asked by recipients.")
    foreign_id = str(uuid.uuid4())
    body = build_body(config, audio, foreign_id)
    send_and_wait(config, client, body, foreign_id, out=out, receiver=receiver)
    return 0


def main() -> int:
    return run_main(run)


if __name__ == "__main__":
    sys.exit(main())
