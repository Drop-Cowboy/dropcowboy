using System.Security.Cryptography;
using System.Text;

namespace DropCowboy.Examples.Lib;

/// <summary>
/// Checks the X-Twilio-Signature header Twilio sends with every request to your URLs.
/// The signature is base64 of HMAC-SHA1, keyed with your Auth Token, over the full URL
/// Twilio called followed by every POST parameter name and its value, sorted by name.
/// Always use the public URL you gave Twilio, never the Host the request arrived with:
/// a tunnel rewrites the Host, and then no signature matches.
/// </summary>
public static class TwilioSignature
{
    public const string Header = "X-Twilio-Signature";

    public static string Compute(string authToken, string url, IEnumerable<KeyValuePair<string, string>> parameters)
    {
        var data = new StringBuilder(url);

        // OrderBy is a stable sort, so a repeated name keeps its values in the order received.
        foreach (var (name, value) in parameters.OrderBy(p => p.Key, StringComparer.Ordinal))
        {
            data.Append(name).Append(value);
        }

        var hash = HMACSHA1.HashData(Encoding.UTF8.GetBytes(authToken), Encoding.UTF8.GetBytes(data.ToString()));
        return Convert.ToBase64String(hash);
    }

    public static bool Verify(
        string authToken, string url, IEnumerable<KeyValuePair<string, string>> parameters, string? signatureHeader)
    {
        if (string.IsNullOrEmpty(signatureHeader))
        {
            return false;
        }

        var expected = Encoding.UTF8.GetBytes(Compute(authToken, url, parameters));
        return CryptographicOperations.FixedTimeEquals(expected, Encoding.UTF8.GetBytes(signatureHeader));
    }
}
