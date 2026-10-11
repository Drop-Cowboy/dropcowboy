"""Refuse the sample values from our docs.

Send only to people who agreed to hear from you. Test with numbers you own.

The ids, phone numbers and hosts in our docs are samples. They exist on no
account, so a request that carries one fails later, often with nothing more
than a reason code. Settings are checked against this list before any request.
The list matches ../fixtures/doc-sample-values.json (a test keeps the two in
step), and is copied here so this folder works on its own.
"""
from __future__ import annotations

from typing import List, Mapping, Optional
from urllib.parse import urlsplit

SAMPLE_MESSAGE = "this is a sample value from our docs; use your own"

SAMPLE_VALUES = {
    "ids": [
        "1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80",
        "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28",
        "7d2a9e4b-1c6f-4b3a-8e5d-2f9c7a1b4e63",
        "c4a7e1d2-9b3f-4a68-8d05-2e7f6b1a9c34",
        "55b9e55e-23f1-4c16-8865-f4b6261ebeea",
        "a9c3e8f1-4b2d-4a7c-8e9b-1c2d3e4f5a6b",
        "0786a81e-e11e-4e53-ab64-71f552db23b3",
        "234ecab5-1811-4c7d-a7a9-8c9ad9ca2e08",
        "9c4e7a2f-1b8d-4f3e-a6c5-2d9b4e7f1a63",
    ],
    "phone_numbers": [
        "+12125550100",
        "+17735550188",
        "+13125550100",
    ],
    "url_hosts": [
        "hooks.example.com",
        "cdn.example.com",
        "media.example.com",
        "files.example.com",
        "receiver.example.com",
        "your-server.example.com",
    ],
}


def is_sample_value(value: Optional[str]) -> bool:
    """True for a sample id, a sample number, or a URL on a sample host."""
    if not isinstance(value, str):
        return False
    trimmed = value.strip()
    if not trimmed:
        return False
    if trimmed.lower() in SAMPLE_VALUES["ids"] or trimmed in SAMPLE_VALUES["phone_numbers"]:
        return True
    host = _host_of(trimmed)
    return host is not None and host in SAMPLE_VALUES["url_hosts"]


def sample_message(name: str, value: str) -> str:
    return name + "=" + value + ": " + SAMPLE_MESSAGE + "."


def find_sample_values(env: Mapping[str, str]) -> List[str]:
    """One message per sample value in a DC_ setting, checking each item of a comma separated list."""
    found = []
    for name in sorted(key for key in env.keys() if key.startswith("DC_")):
        value = env.get(name)
        if not isinstance(value, str):
            continue
        for item in value.split(","):
            if is_sample_value(item):
                found.append(sample_message(name, item.strip()))
    return found


def _host_of(value: str) -> Optional[str]:
    if not value.lower().startswith(("http://", "https://")):
        return None
    try:
        host = urlsplit(value).hostname
    except ValueError:
        return None
    return host.lower() if host else None
