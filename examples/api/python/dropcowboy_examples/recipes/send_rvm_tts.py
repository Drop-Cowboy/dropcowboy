"""Send one ringless voicemail that speaks text you provide.

Send only to people who agreed to hear from you. Test with numbers you own.

Run: python -m dropcowboy_examples.recipes.send_rvm_tts

Set DC_TTS_BODY to the text. DC_MODE=retail (the default) sends from a phone
line. DC_MODE=byoc sends from DC_CALLER_ID on your own carrier. Text to speech is
billed per character.
"""
from __future__ import annotations

import sys
import uuid
from typing import Any, Callable, Dict, Optional

from .. import api
from ..audio import check_tts_length, tts_fields
from ..client import DcClient
from ..config import Config
from ..output import say
from ..receiver import Receiver
from ..cli import run_main
from .flow import send_and_wait, with_result_fields
from .send_rvm_retail import resolve_phone_line


def build_body(config: Config, sender: Dict[str, str], speech: Dict[str, str], foreign_id: str) -> Dict[str, Any]:
    """`sender` is {"phone_line_id": ...} or {"caller_id": ...}. `speech` is `tts_body` and `voice_id`.

    Never add `media_id` or `audio_url` here: the API takes exactly one audio source.
    """
    body: Dict[str, Any] = {"to": config.require_recipient()}
    body.update(sender)
    body.update(speech)
    return with_result_fields(body, config, foreign_id)


def run(
    config: Config,
    client: DcClient,
    out: Callable[[str], None] = say,
    receiver: Optional[Receiver] = None,
) -> int:
    config.require_recipient()
    check_tts_length(config.tts_body)
    if config.mode == "byoc":
        sender = {"caller_id": config.require_caller_id()}
    else:
        sender = {"phone_line_id": resolve_phone_line(config, client)}
    speech = tts_fields(config, client)

    if config.preview:
        preview = api.synthesize_preview(client, speech["voice_id"], speech["tts_body"])
        out("Preview audio: " + str(preview.get("audio_url")))
        out("  expires_at: " + str(preview.get("expires_at")))
        out("  tts_characters: " + str(preview.get("tts_characters")) + " (billed per character)")

    foreign_id = str(uuid.uuid4())
    body = build_body(config, sender, speech, foreign_id)
    send_and_wait(config, client, body, foreign_id, out=out, receiver=receiver)
    return 0


def main() -> int:
    return run_main(run)


if __name__ == "__main__":
    sys.exit(main())
