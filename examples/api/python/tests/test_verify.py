"""The shared signature vectors (examples/api/fixtures/signature-vectors.json).

Send only to people who agreed to hear from you. Test with numbers you own.
"""
from __future__ import annotations

from dropcowboy_examples.verify import verify_signature


def check(vectors, **overrides):
    arguments = {
        "raw_body": vectors["raw_body"].encode("utf-8"),
        "signature": vectors["signature"],
        "timestamp": vectors["timestamp"],
        "secrets": [vectors["secret"]],
        "now": vectors["now_seconds_valid"],
    }
    arguments.update(overrides)
    return verify_signature(**arguments)


def test_valid_signature_is_accepted(vectors):
    result = check(vectors)
    assert result.valid is True
    assert result.error is None


def test_stale_timestamp_is_rejected(vectors):
    result = check(vectors, now=vectors["now_seconds_stale"])
    assert (result.valid, result.error) == (False, "stale_timestamp")


def test_tampered_body_is_rejected(vectors):
    result = check(vectors, raw_body=vectors["tampered_raw_body"].encode("utf-8"))
    assert (result.valid, result.error) == (False, "invalid_signature")


def test_signature_from_another_secret_is_rejected(vectors):
    result = check(vectors, signature=vectors["signature_from_other_secret"])
    assert (result.valid, result.error) == (False, "invalid_signature")


def test_second_of_two_secrets_matching_is_accepted(vectors):
    result = check(vectors, secrets=[vectors["other_secret"], vectors["secret"]])
    assert result.valid is True


def test_missing_signature_or_timestamp(vectors):
    assert check(vectors, signature=None).error == "missing_signature"
    assert check(vectors, timestamp=None).error == "missing_signature"
    assert check(vectors, signature="").error == "missing_signature"


def test_signature_without_sha256_prefix_is_rejected(vectors):
    bare = vectors["signature"].replace("sha256=", "")
    result = check(vectors, signature=bare)
    assert (result.valid, result.error) == (False, "invalid_signature")


def test_non_numeric_timestamp_is_stale(vectors):
    for bad in ("yesterday", "12.5", "-5", " 1774041960", "1774041960\n"):
        result = check(vectors, timestamp=bad)
        assert (result.valid, result.error) == (False, "stale_timestamp"), bad


def test_unsupported_signature_version_is_rejected(vectors):
    result = check(vectors, version="v2")
    assert (result.valid, result.error) == (False, "invalid_signature")


def test_version_v1_is_accepted(vectors):
    assert check(vectors, version="v1").valid is True


def test_no_configured_secret_never_verifies(vectors):
    assert check(vectors, secrets=[]).valid is False


def test_the_body_is_verified_as_bytes_not_as_parsed_json(vectors):
    reformatted = vectors["raw_body"].replace(",", ", ").encode("utf-8")
    result = check(vectors, raw_body=reformatted)
    assert (result.valid, result.error) == (False, "invalid_signature")
