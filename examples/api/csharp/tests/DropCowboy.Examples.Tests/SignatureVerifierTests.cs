using System.Text;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Tests;

public class SignatureVerifierTests
{
    private static readonly SignatureVector V = Fixtures.Vector();

    private static SignatureResult Verify(
        string body, string? signature, string? timestamp, long now, string? version = null, params string[] secrets)
    {
        var configured = secrets.Length == 0 ? new[] { V.Secret } : secrets;
        return SignatureVerifier.Verify(Encoding.UTF8.GetBytes(body), signature, timestamp, version, configured, now);
    }

    [Fact]
    public void Vector1_ValidSignatureVerifies()
    {
        Assert.Equal(SignatureResult.Valid, Verify(V.RawBody, V.Signature, V.Timestamp, V.NowValid));
    }

    [Fact]
    public void Vector2_StaleTimestampIsRejected()
    {
        var result = Verify(V.RawBody, V.Signature, V.Timestamp, V.NowStale);

        Assert.Equal(SignatureResult.StaleTimestamp, result);
        Assert.Equal("stale_timestamp", SignatureVerifier.ErrorCode(result));
    }

    [Fact]
    public void Vector3_TamperedBodyIsInvalid()
    {
        var result = Verify(V.TamperedRawBody, V.Signature, V.Timestamp, V.NowValid);

        Assert.Equal(SignatureResult.InvalidSignature, result);
        Assert.Equal("invalid_signature", SignatureVerifier.ErrorCode(result));
    }

    [Fact]
    public void Vector4_SignatureFromAnotherSecretIsInvalid()
    {
        Assert.Equal(SignatureResult.InvalidSignature, Verify(V.RawBody, V.SignatureFromOtherSecret, V.Timestamp, V.NowValid));
    }

    [Fact]
    public void Vector5_AnyConfiguredSecretMayMatch()
    {
        Assert.Equal(
            SignatureResult.Valid,
            Verify(V.RawBody, V.Signature, V.Timestamp, V.NowValid, null, V.OtherSecret, V.Secret));
    }

    [Theory]
    [InlineData(null, "1774041960")]
    [InlineData("sha256=abc", null)]
    [InlineData("", "1774041960")]
    public void Vector6_MissingSignatureOrTimestamp(string? signature, string? timestamp)
    {
        var result = Verify(V.RawBody, signature, timestamp, V.NowValid);

        Assert.Equal(SignatureResult.MissingSignature, result);
        Assert.Equal("missing_signature", SignatureVerifier.ErrorCode(result));
    }

    [Fact]
    public void Vector7_HeaderWithoutPrefixIsInvalid()
    {
        var withoutPrefix = V.Signature["sha256=".Length..];

        Assert.Equal(SignatureResult.InvalidSignature, Verify(V.RawBody, withoutPrefix, V.Timestamp, V.NowValid));
    }

    [Fact]
    public void Vector8_NonNumericTimestampIsStale()
    {
        Assert.Equal(SignatureResult.StaleTimestamp, Verify(V.RawBody, V.Signature, "yesterday", V.NowValid));
    }

    [Fact]
    public void Vector9_UnsupportedVersionIsInvalid()
    {
        Assert.Equal(SignatureResult.InvalidSignature, Verify(V.RawBody, V.Signature, V.Timestamp, V.NowValid, "v2"));
        Assert.Equal(SignatureResult.Valid, Verify(V.RawBody, V.Signature, V.Timestamp, V.NowValid, "v1"));
    }

    [Fact]
    public void ToleranceIsFiveMinutesInBothDirections()
    {
        var timestamp = long.Parse(V.Timestamp);
        var signature = SignatureVerifier.Sign(V.Secret, V.Timestamp, Encoding.UTF8.GetBytes(V.RawBody));

        Assert.Equal(SignatureResult.Valid, Verify(V.RawBody, signature, V.Timestamp, timestamp + 300));
        Assert.Equal(SignatureResult.StaleTimestamp, Verify(V.RawBody, signature, V.Timestamp, timestamp + 301));
        Assert.Equal(SignatureResult.StaleTimestamp, Verify(V.RawBody, signature, V.Timestamp, timestamp - 301));
    }

    [Fact]
    public void SignMatchesTheVector()
    {
        Assert.Equal(V.Signature, SignatureVerifier.Sign(V.Secret, V.Timestamp, Encoding.UTF8.GetBytes(V.RawBody)));
    }

    [Fact]
    public void ANonAsciiBodyIsVerifiedAsRawBytes()
    {
        var body = Encoding.UTF8.GetBytes("{\"reason\":\"caf\u00e9\"}");
        var signature = SignatureVerifier.Sign(V.Secret, V.Timestamp, body);

        var result = SignatureVerifier.Verify(body, signature, V.Timestamp, null, [V.Secret], V.NowValid);

        Assert.Equal(SignatureResult.Valid, result);
    }
}
