using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace DropCowboy.Examples.Lib;

/// <summary>
/// Verifies a Detection webhook. X-Signature is "v1=hmac-sha256," followed by the hex
/// HMAC-SHA256 of X-Timestamp (milliseconds) + "." + the raw body, keyed with the Detection
/// API key the stream was opened with. Pass the exact bytes you received, before any parsing.
/// </summary>
public static class DetectionSignature
{
    public const long ToleranceMs = 300_000;
    public const string Scheme = "v1=hmac-sha256";

    public static SignatureResult Verify(
        ReadOnlySpan<byte> rawBody,
        string? signatureHeader,
        string? timestampHeader,
        string detectionKey,
        long nowMs)
    {
        if (string.IsNullOrEmpty(signatureHeader) || string.IsNullOrEmpty(timestampHeader))
        {
            return SignatureResult.MissingSignature;
        }

        var parsed = long.TryParse(timestampHeader, NumberStyles.None, CultureInfo.InvariantCulture, out var signedAt);
        if (!parsed || Math.Abs(nowMs - signedAt) > ToleranceMs)
        {
            return SignatureResult.StaleTimestamp;
        }

        // The first item names the scheme. Every item after it is a digest; accept any match.
        var items = signatureHeader.Split(',');
        if (items.Length < 2 || items[0] != Scheme)
        {
            return SignatureResult.InvalidSignature;
        }

        var expected = Encoding.UTF8.GetBytes(Digest(detectionKey, timestampHeader, rawBody));
        var matched = false;
        for (var i = 1; i < items.Length; i++)
        {
            matched |= CryptographicOperations.FixedTimeEquals(expected, Encoding.UTF8.GetBytes(items[i]));
        }

        return matched ? SignatureResult.Valid : SignatureResult.InvalidSignature;
    }

    public static string Sign(string detectionKey, string timestamp, ReadOnlySpan<byte> rawBody)
    {
        return Scheme + "," + Digest(detectionKey, timestamp, rawBody);
    }

    private static string Digest(string detectionKey, string timestamp, ReadOnlySpan<byte> rawBody)
    {
        var prefix = Encoding.UTF8.GetBytes(timestamp + ".");
        var message = new byte[prefix.Length + rawBody.Length];
        prefix.CopyTo(message, 0);
        rawBody.CopyTo(message.AsSpan(prefix.Length));

        var hash = HMACSHA256.HashData(Encoding.UTF8.GetBytes(detectionKey), message);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }
}
