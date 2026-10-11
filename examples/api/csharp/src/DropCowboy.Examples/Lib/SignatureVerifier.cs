using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace DropCowboy.Examples.Lib;

public enum SignatureResult
{
    Valid,
    MissingSignature,
    StaleTimestamp,
    InvalidSignature
}

/// <summary>
/// Verifies the X-Signature header on a webhook delivery. The signature is
/// HMAC-SHA256 over "{timestamp}.{raw body}", keyed with the webhook's signing
/// secret. Always pass the exact bytes you received: parsing the JSON and writing it
/// back can change spacing or key order, and then no signature matches.
/// </summary>
public static class SignatureVerifier
{
    public const int ToleranceSeconds = 300;

    private const string Prefix = "sha256=";
    private const string SupportedVersion = "v1";

    public static SignatureResult Verify(
        ReadOnlySpan<byte> rawBody,
        string? signatureHeader,
        string? timestampHeader,
        string? versionHeader,
        IReadOnlyList<string> secrets,
        long nowSeconds)
    {
        if (string.IsNullOrEmpty(signatureHeader) || string.IsNullOrEmpty(timestampHeader))
        {
            return SignatureResult.MissingSignature;
        }

        var parsed = long.TryParse(timestampHeader, NumberStyles.None, CultureInfo.InvariantCulture, out var signedAt);
        if (!parsed || Math.Abs(nowSeconds - signedAt) > ToleranceSeconds)
        {
            return SignatureResult.StaleTimestamp;
        }

        if (!string.IsNullOrEmpty(versionHeader) && versionHeader != SupportedVersion)
        {
            return SignatureResult.InvalidSignature;
        }

        if (!signatureHeader.StartsWith(Prefix, StringComparison.Ordinal))
        {
            return SignatureResult.InvalidSignature;
        }

        var provided = Encoding.UTF8.GetBytes(signatureHeader);

        // One secret per webhook, so accept any of them. Check every secret
        // instead of stopping at the first match, so timing does not reveal which
        // one matched.
        var matched = false;
        foreach (var secret in secrets)
        {
            var expected = Encoding.UTF8.GetBytes(Sign(secret, timestampHeader, rawBody));
            matched |= CryptographicOperations.FixedTimeEquals(expected, provided);
        }

        return matched ? SignatureResult.Valid : SignatureResult.InvalidSignature;
    }

    public static string Sign(string secret, string timestamp, ReadOnlySpan<byte> rawBody)
    {
        var prefix = Encoding.UTF8.GetBytes(timestamp + ".");
        var message = new byte[prefix.Length + rawBody.Length];
        prefix.CopyTo(message, 0);
        rawBody.CopyTo(message.AsSpan(prefix.Length));

        var hash = HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), message);
        return Prefix + Convert.ToHexString(hash).ToLowerInvariant();
    }

    public static string ErrorCode(SignatureResult result)
    {
        return result switch
        {
            SignatureResult.MissingSignature => "missing_signature",
            SignatureResult.StaleTimestamp => "stale_timestamp",
            SignatureResult.InvalidSignature => "invalid_signature",
            _ => throw new ArgumentOutOfRangeException(nameof(result), result, "A valid signature has no error code.")
        };
    }
}
