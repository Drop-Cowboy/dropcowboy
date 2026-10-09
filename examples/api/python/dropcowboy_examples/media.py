"""Put an audio file on your account and get its media_id.

Send only to people who agreed to hear from you. Test with numbers you own.

Two ways in. Both need an API key with the `media:write` scope.

A file on this computer (signed upload):

1. `POST /media/public/media {name, type: "rvm", signed_upload: true}` answers with
   the `media_id` and one upload URL per format: `upload.mp3` and `upload.wav`,
   each `{url, content_type}`.
2. PUT the file's bytes to the URL for its format, with a `Content-Type` header of
   exactly that `content_type`. The URL is already signed, so it never gets your
   key or secret.
3. `POST /media/public/media/{media_id}/complete`. Until then the file cannot be sent.

A file at a public URL (import): `POST /media/public/media {name, type: "rvm", url, ext}`.
The file is fetched and ready when the call returns.
"""
from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any, Callable, Dict, Optional
from urllib.parse import unquote, urlsplit

import requests

from . import api
from .client import DcClient
from .config import ConfigError
from .hints import UPLOAD_403
from .output import say

FORMATS = (".mp3", ".wav")
UPLOAD_TIMEOUT_SECONDS = 120

Output = Callable[[str], None]


@dataclass
class AudioFile:
    """What DC_AUDIO_FILE names. `kind` is "file" (a path) or "url" (an http(s) address)."""
    kind: str
    location: str
    ext: str
    name: str


def audio_file_source(value: str, media_name: str = "") -> AudioFile:
    """Read DC_AUDIO_FILE, checked before any request so a typo stops the run early."""
    if value.lower().startswith(("http://", "https://")):
        path = urlsplit(value).path
        ext = _format_of(path)
        return AudioFile("url", value, ext, media_name or unquote(path.rsplit("/", 1)[-1]))
    ext = _format_of(value)
    if not os.path.isfile(value):
        raise ConfigError("DC_AUDIO_FILE: there is no file at " + value + ".")
    if os.path.getsize(value) == 0:
        raise ConfigError("DC_AUDIO_FILE: " + value + " is empty.")
    return AudioFile("file", value, ext, media_name or os.path.basename(value))


def upload_media(
    client: DcClient,
    source: AudioFile,
    out: Output = say,
    session: Optional[requests.Session] = None,
) -> str:
    """Upload or import the file. Returns its media_id."""
    if source.kind == "url":
        out("Importing " + source.location + " as \"" + source.name + "\"...")
        media_id = _media_id_of(api.import_media(client, source.name, source.location, source.ext))
        out("Imported: media_id=" + media_id)
        return media_id

    with open(source.location, "rb") as handle:
        content = handle.read()
    created = api.create_media_for_upload(client, source.name)
    media_id = _media_id_of(created)
    target = _upload_target(created, source.ext)

    out("Uploading " + source.name + " (" + str(len(content)) + " bytes, " + target["content_type"] + ")...")
    _put_file(session or requests.Session(), target["url"], target["content_type"], content)

    api.complete_media(client, media_id)
    out("Uploaded: media_id=" + media_id)
    return media_id


def _put_file(session: requests.Session, url: str, content_type: str, content: bytes) -> None:
    """Sending x-key or x-secret here would hand them to the storage service, and a
    Content-Type other than the exact one returned breaks the signature (403)."""
    try:
        response = session.put(url, data=content, headers={"Content-Type": content_type},
                               timeout=UPLOAD_TIMEOUT_SECONDS, allow_redirects=False)
    except requests.Timeout:
        raise ConfigError("The upload did not finish within " + str(UPLOAD_TIMEOUT_SECONDS)
                          + " seconds. Try again, or import the file from a public URL.") from None
    except requests.RequestException as exc:
        raise ConfigError("Could not reach the upload URL: " + type(exc).__name__) from None
    if response.status_code == 403:
        raise ConfigError(UPLOAD_403)
    if not 200 <= response.status_code < 300:
        raise ConfigError("The upload URL answered " + str(response.status_code)
                          + ". Run upload_media.py again for fresh URLs.")


def _format_of(name: str) -> str:
    ext = os.path.splitext(name)[1].lower()
    if ext not in FORMATS:
        raise ConfigError("DC_AUDIO_FILE must name a .mp3 or .wav file.")
    return ext


def _media_id_of(data: Dict[str, Any]) -> str:
    media_id = data.get("media_id")
    if not isinstance(media_id, str) or not media_id:
        raise ConfigError("The API did not return a media_id.")
    return media_id


def _upload_target(data: Dict[str, Any], ext: str) -> Dict[str, str]:
    target = (data.get("upload") or {}).get(ext[1:])
    if not isinstance(target, dict) or not isinstance(target.get("url"), str) \
            or not isinstance(target.get("content_type"), str):
        raise ConfigError("The API did not return an upload URL for " + ext + " files.")
    return target
