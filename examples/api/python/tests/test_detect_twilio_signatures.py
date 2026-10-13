"""detect-twilio: the shared Detection and Twilio signature vectors, and XML escaping.

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

import base64
import hashlib
import hmac

from dropcowboy_examples.detection import play_twiml, verify_detection_signature, xml_escape
from dropcowboy_examples.twilio import twilio_signature, verify_twilio_signature

from .detect_support import DETECTION_VECTORS, TWILIO_VECTORS


def detection_check(raw_body=None, signature=None, timestamp=None, key=None, now=None):
    v = DETECTION_VECTORS
    return verify_detection_signature(
        (raw_body if raw_body is not None else v["raw_body"]).encode("utf-8"),
        v["signature"] if signature is None else signature,
        v["timestamp_ms"] if timestamp is None else timestamp,
        key or v["detection_key"],
        now_ms=v["now_ms_valid"] if now is None else now,
    )


# --- Detection -----------------------------------------------------------------


def test_detection_signature_verifies_at_the_valid_time():
    assert detection_check() == (True, None)


def test_detection_signature_is_stale_after_300000_ms():
    assert detection_check(now=DETECTION_VECTORS["now_ms_stale"]) == (False, "stale_timestamp")


def test_detection_tampered_body_is_invalid():
    assert detection_check(raw_body=DETECTION_VECTORS["tampered_raw_body"]) == (False, "invalid_signature")


def test_detection_signature_from_another_key_is_invalid():
    assert detection_check(signature=DETECTION_VECTORS["signature_from_other_key"]) == (False, "invalid_signature")


def test_detection_missing_header_or_timestamp_is_missing_signature():
    assert detection_check(signature="") == (False, "missing_signature")
    assert detection_check(timestamp="") == (False, "missing_signature")


def test_detection_digest_without_the_scheme_is_invalid():
    digest_only = DETECTION_VECTORS["signature"].split(",", 1)[1]
    assert detection_check(signature=digest_only) == (False, "invalid_signature")


def test_detection_other_scheme_is_invalid():
    digest = DETECTION_VECTORS["signature"].split(",", 1)[1]
    assert detection_check(signature="v2=hmac-sha256," + digest) == (False, "invalid_signature")
    assert detection_check(signature="v1=hmac-sha256") == (False, "invalid_signature")


def test_detection_non_numeric_timestamp_is_stale():
    assert detection_check(timestamp="soon") == (False, "stale_timestamp")


def test_detection_any_later_item_may_match():
    digest = DETECTION_VECTORS["signature"].split(",", 1)[1]
    assert detection_check(signature="v1=hmac-sha256," + "0" * 64 + "," + digest) == (True, None)


def test_detection_key_is_the_hmac_key():
    assert detection_check(key=DETECTION_VECTORS["other_detection_key"]) == (False, "invalid_signature")


# --- Twilio --------------------------------------------------------------------


def test_twilio_signature_matches_the_vector():
    v = TWILIO_VECTORS
    assert twilio_signature(v["url"], v["params"], v["auth_token"]) == v["signature"]
    assert verify_twilio_signature(v["url"], v["params"], v["signature"], v["auth_token"])


def test_twilio_tampered_params_fail():
    v = TWILIO_VECTORS
    assert not verify_twilio_signature(v["url"], v["tampered_params"], v["signature"], v["auth_token"])


def test_twilio_a_different_url_fails():
    v = TWILIO_VECTORS
    assert not verify_twilio_signature(v["url"].replace("/status", "/voice"), v["params"], v["signature"],
                                       v["auth_token"])
    assert not verify_twilio_signature("http://127.0.0.1:3000/twilio/status", v["params"], v["signature"],
                                       v["auth_token"])


def test_twilio_signature_from_another_token_fails():
    v = TWILIO_VECTORS
    assert not verify_twilio_signature(v["url"], v["params"], v["signature_from_other_token"], v["auth_token"])
    assert twilio_signature(v["url"], v["params"], v["other_auth_token"]) == v["signature_from_other_token"]


def test_twilio_missing_header_fails():
    v = TWILIO_VECTORS
    assert not verify_twilio_signature(v["url"], v["params"], None, v["auth_token"])
    assert not verify_twilio_signature(v["url"], v["params"], "", v["auth_token"])


def test_twilio_params_order_does_not_matter_but_a_repeated_name_keeps_its_value_order():
    v = TWILIO_VECTORS
    reversed_pairs = list(reversed(list(v["params"].items())))
    assert twilio_signature(v["url"], reversed_pairs, v["auth_token"]) == v["signature"]

    pairs = [("StatusCallbackEvent", "initiated"), ("A", "1"), ("StatusCallbackEvent", "ringing")]
    data = v["url"] + "A1" + "StatusCallbackEventinitiated" + "StatusCallbackEventringing"
    expected = base64.b64encode(hmac.new(v["auth_token"].encode(), data.encode(), hashlib.sha1).digest()).decode()
    assert twilio_signature(v["url"], pairs, v["auth_token"]) == expected


# --- XML -----------------------------------------------------------------------


def test_xml_escape_handles_all_five_characters():
    assert xml_escape("a&b<c>d\"e'f") == "a&amp;b&lt;c&gt;d&quot;e&apos;f"


def test_play_twiml_for_audio_and_for_text():
    assert play_twiml(("play", "https://audio.example.org/a.mp3?x=1&y=2")) == (
        '<Response><Stop><Stream name="detection"/></Stop>'
        "<Play>https://audio.example.org/a.mp3?x=1&amp;y=2</Play><Hangup/></Response>"
    )
    assert play_twiml(("say", "Hi <Pat> & \"friends\"")) == (
        '<Response><Stop><Stream name="detection"/></Stop>'
        "<Say>Hi &lt;Pat&gt; &amp; &quot;friends&quot;</Say><Hangup/></Response>"
    )
