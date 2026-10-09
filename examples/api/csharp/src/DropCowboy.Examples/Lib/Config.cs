using System.Collections;
using System.Globalization;

namespace DropCowboy.Examples.Lib;

/// <summary>
/// Settings read from environment variables. The class takes a plain dictionary so
/// tests can build one without touching the process environment.
/// </summary>
public sealed class Config
{
    public const string DefaultBaseUrl = "https://api-v2.dropcowboy.com";
    public const int DefaultPort = 3000;
    public const int DefaultWaitSeconds = 300;

    private readonly IReadOnlyDictionary<string, string> _values;

    public Config(IReadOnlyDictionary<string, string> values)
    {
        _values = values;
    }

    public static Config FromEnvironment()
    {
        var values = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (DictionaryEntry entry in Environment.GetEnvironmentVariables())
        {
            if (entry.Key is not string name || entry.Value is not string value)
            {
                continue;
            }

            if (name.StartsWith("DC_", StringComparison.Ordinal) || name == "PORT")
            {
                values[name] = value;
            }
        }

        return new Config(values);
    }

    /// <summary>Every setting as given, for checks that look at all of them.</summary>
    public IEnumerable<KeyValuePair<string, string>> Entries => _values;

    public string BaseUrl => (Get("DC_BASE_URL") ?? DefaultBaseUrl).TrimEnd('/');

    public string? PublicUrl => ParsePublicUrl(Get("DC_PUBLIC_URL"));

    public string? CallbackUrl => PublicUrl is null ? null : PublicUrl + "/callbacks/dropcowboy";

    public int Port => ParseInt("PORT", DefaultPort, max: 65535);

    public int WaitSeconds => ParseInt("DC_WAIT_SECONDS", DefaultWaitSeconds, max: 86400);

    public string? Get(string name)
    {
        return _values.TryGetValue(name, out var value) && !string.IsNullOrWhiteSpace(value) ? value.Trim() : null;
    }

    public string Require(string name, string? hint = null)
    {
        return Get(name) ?? throw new RecipeException(hint is null ? $"{name} is required." : $"{name} is required. {hint}");
    }

    public IReadOnlyList<string> GetList(string name)
    {
        var raw = Get(name);
        if (raw is null)
        {
            return [];
        }

        return raw.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
    }

    // The switch settings (DC_RENT, DC_PREVIEW) count only the exact lowercase word "yes",
    // untrimmed, so "YES", "true", "1" and " yes" all mean no. This matches the other languages.
    public bool IsYes(string name) => _values.TryGetValue(name, out var value) && value == "yes";

    private int ParseInt(string name, int fallback, int max)
    {
        var raw = Get(name);
        if (raw is null)
        {
            return fallback;
        }

        if (!int.TryParse(raw, NumberStyles.None, CultureInfo.InvariantCulture, out var number) || number > max)
        {
            throw new RecipeException($"{name} must be a whole number from 0 to {max}.");
        }

        return number;
    }

    private static string? ParsePublicUrl(string? raw)
    {
        if (raw is null)
        {
            return null;
        }

        var trimmed = raw.TrimEnd('/');
        var valid = Uri.TryCreate(trimmed, UriKind.Absolute, out var uri)
            && (uri.Scheme == Uri.UriSchemeHttps || uri.Scheme == Uri.UriSchemeHttp);
        if (!valid)
        {
            throw new RecipeException("DC_PUBLIC_URL must be a full URL such as https://abc123.example.com.");
        }

        return trimmed;
    }
}
