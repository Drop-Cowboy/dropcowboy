"""Send one ringless voicemail from a phone line on your account.

Send only to people who agreed to hear from you. Test with numbers you own.

Run: python -m dropcowboy_examples.recipes.send_rvm_retail

Retail accounts send from a phone line. The audio is DC_MEDIA_ID, else
DC_AUDIO_FILE (uploaded first), else DC_TTS_BODY, else DC_AUDIO_URL, else the
first file in your media library. There is no `caller_id` on the request: the
line decides which of its numbers the recipient sees.
"""
from __future__ import annotations

import sys
import uuid
from typing import Any, Callable, Dict, Optional

from .. import api
from ..audio import audio_file_from_env, audio_from_env
from ..client import DcClient
from ..config import Config, ConfigError
from ..output import say
from ..receiver import Receiver
from ..cli import run_main
from .flow import send_and_wait, with_result_fields


def build_body(config: Config, phone_line_id: str, audio: Dict[str, str], foreign_id: str) -> Dict[str, Any]:
    body = {"to": config.require_recipient(), "phone_line_id": phone_line_id}
    body.update(audio)
    return with_result_fields(body, config, foreign_id)


def resolve_phone_line(config: Config, client: DcClient) -> str:
    """DC_PHONE_LINE_ID, else the account's default line."""
    line_id = config.phone_line_id or api.default_phone_line_id(client)
    if not line_id:
        raise ConfigError(
            "No phone line to send from. Set DC_PHONE_LINE_ID, or make one of your lines the "
            "default. Without either the API answers 4010 (No Caller ID)."
        )
    return line_id


def run(
    config: Config,
    client: DcClient,
    out: Callable[[str], None] = say,
    receiver: Optional[Receiver] = None,
) -> int:
    config.require_recipient()
    audio_file_from_env(config)
    phone_line_id = resolve_phone_line(config, client)
    audio = audio_from_env(config, client, retail=True, out=out)
    foreign_id = str(uuid.uuid4())
    body = build_body(config, phone_line_id, audio, foreign_id)
    send_and_wait(config, client, body, foreign_id, out=out, receiver=receiver)
    return 0


def main() -> int:
    return run_main(run)


if __name__ == "__main__":
    sys.exit(main())
