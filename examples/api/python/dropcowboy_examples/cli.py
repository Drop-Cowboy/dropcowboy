"""Run a command safely: load settings, call it, and turn expected failures into exit codes.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import sys
from typing import Callable

from .client import DcClient, DcError
from .config import Config, ConfigError, load_config
from .output import CONSENT_LINE, say

INTERRUPTED = 130

Command = Callable[[Config, DcClient], int]


def run_main(command: Command) -> int:
    """Load settings, run `command`, and turn every expected failure into a short message and exit 1."""
    say(CONSENT_LINE)
    try:
        config = load_config()
        config.require_credentials()
        client = DcClient(config.key, config.secret, config.base_url)
        return command(config, client)
    except ConfigError as error:
        print("Setup problem: " + str(error), file=sys.stderr)
        return 1
    except DcError as error:
        print_api_error(error)
        return 1
    except TimeoutError as error:
        print(str(error), file=sys.stderr)
        return 1
    except OSError as error:
        print("Could not start the receiver: " + str(error), file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print("Interrupted.", file=sys.stderr)
        return INTERRUPTED


def print_api_error(error: DcError) -> None:
    """Show what the API said. Headers and credentials are never part of an error."""
    print("The request failed.", file=sys.stderr)
    print("  status: " + (str(error.status) if error.status else "no response"), file=sys.stderr)
    for label, value in (("title", error.title), ("detail", error.detail),
                         ("code", error.code), ("request id", error.request_id)):
        if value:
            print("  " + label + ": " + value, file=sys.stderr)
