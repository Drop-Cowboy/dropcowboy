"""Put an audio file on your account and print its media_id.

Send only to people who agreed to hear from you. Test with numbers you own.

Run: python upload_media.py

Set DC_AUDIO_FILE to a .mp3 or .wav file on this computer (signed upload), or to
an https:// address of one (import). DC_MEDIA_NAME names it in your media
library; it defaults to the file name. The key needs the `media:write` scope.

Then send it: set DC_MEDIA_ID to the id this prints.
"""
from __future__ import annotations

import sys
from typing import Callable

from dropcowboy_examples.cli import run_main
from dropcowboy_examples.client import DcClient
from dropcowboy_examples.config import Config, ConfigError
from dropcowboy_examples.media import audio_file_source, upload_media
from dropcowboy_examples.output import say


def run(config: Config, client: DcClient, out: Callable[[str], None] = say) -> int:
    if not config.audio_file:
        raise ConfigError("Set DC_AUDIO_FILE to a .mp3 or .wav file on this computer, or to an https:// address "
                          "of one.")
    source = audio_file_source(config.audio_file, config.media_name)
    media_id = upload_media(client, source, out)
    out("media_id: " + media_id)
    out("To send it, set DC_MEDIA_ID=" + media_id)
    return 0


def main() -> int:
    return run_main(run)


if __name__ == "__main__":
    sys.exit(main())
