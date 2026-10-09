"""What to do next, for the problems a first integration runs into most.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

from typing import Any, Optional

API_LOGS_HINT = "Check Settings > API Logs, which shows the outcome and what your endpoint answered."

AUDIO_URL_SUPPORT = (
    "audio_url is an option for BYOC plans only and must be enabled by support. "
    "Contact support to enable it. If you're testing on a retail account before connecting your carrier, "
    "support can enable it for testing, and you can then send only to your test numbers. "
    "Otherwise, upload the file and send media_id, or use text to speech."
)

UPLOAD_403 = (
    "The upload URL refused the file (403). Usually one of two things: the Content-Type "
    "header did not match exactly the content_type returned with the URL, or the URL expired (upload URLs "
    "last 2 days). Run upload_media.py again for fresh URLs, or import the file from a public URL instead: "
    "set DC_AUDIO_FILE to an https:// address of the .mp3 or .wav file."
)

OUTCOME_HINTS = {
    3001: (
        "Audio file not valid: for example a media_id that is not on your account, or an audio_url that "
        "could not be downloaded or is not MP3 or WAV. Upload the file with upload_media.py and send the "
        "media_id it prints."
    ),
    3014: "Not allowed audio_url. " + AUDIO_URL_SUPPORT,
    3040: (
        "Test Numbers Only: this account can send only to its test numbers right now, and this number is "
        "not one of them. Send to one of your test numbers, or ask support to end testing mode."
    ),
}


def outcome_hint(reason_code: Any) -> Optional[str]:
    """The hint for a reason code, or None when there is none for it."""
    try:
        code = int(reason_code)
    except (TypeError, ValueError):
        return None
    return OUTCOME_HINTS.get(code)
