"""Console output.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations


CONSENT_LINE = "Send only to people who agreed to hear from you. Test with numbers you own."


def say(line: str) -> None:
    """Print one line right away. When output goes to a pipe or a log file, Python holds
    it back until a buffer fills, and a receiver's lines would show up long after the event."""
    print(line, flush=True)
