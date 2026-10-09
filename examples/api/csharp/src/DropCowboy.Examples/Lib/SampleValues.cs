namespace DropCowboy.Examples.Lib;

/// <summary>
/// The ids, phone numbers and hosts in our docs are samples. They exist on no account,
/// so a request that carries one fails later, often with nothing more than a reason code.
/// Every command checks its settings against this list before any request. The list
/// matches ../fixtures/doc-sample-values.json (a test keeps the two in step), and is
/// copied here so this folder works on its own.
/// </summary>
public static class SampleValues
{
    public const string Message = "this is a sample value from our docs; use your own";

    public static readonly IReadOnlyList<string> Ids =
    [
        "1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80",
        "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28",
        "7d2a9e4b-1c6f-4b3a-8e5d-2f9c7a1b4e63",
        "c4a7e1d2-9b3f-4a68-8d05-2e7f6b1a9c34",
        "55b9e55e-23f1-4c16-8865-f4b6261ebeea",
        "a9c3e8f1-4b2d-4a7c-8e9b-1c2d3e4f5a6b",
        "0786a81e-e11e-4e53-ab64-71f552db23b3",
        "234ecab5-1811-4c7d-a7a9-8c9ad9ca2e08",
        "9c4e7a2f-1b8d-4f3e-a6c5-2d9b4e7f1a63"
    ];

    public static readonly IReadOnlyList<string> PhoneNumbers =
    [
        "+12125550100",
        "+17735550188",
        "+13125550100"
    ];

    public static readonly IReadOnlyList<string> UrlHosts =
    [
        "hooks.example.com",
        "cdn.example.com",
        "media.example.com",
        "files.example.com",
        "receiver.example.com",
        "your-server.example.com"
    ];

    /// <summary>True for a sample id, a sample number, or an http(s) URL on a sample host.</summary>
    public static bool IsSample(string? value)
    {
        var trimmed = value?.Trim();
        if (string.IsNullOrEmpty(trimmed))
        {
            return false;
        }

        if (Ids.Contains(trimmed.ToLowerInvariant()) || PhoneNumbers.Contains(trimmed))
        {
            return true;
        }

        var isWebUrl = Uri.TryCreate(trimmed, UriKind.Absolute, out var uri)
            && (uri.Scheme == Uri.UriSchemeHttps || uri.Scheme == Uri.UriSchemeHttp);
        return isWebUrl && UrlHosts.Contains(uri!.Host.ToLowerInvariant());
    }

    public static string Describe(string name, string value) => $"{name}={value}: {Message}.";

    /// <summary>One message per sample value in a DC_ setting, checking each item of a comma separated list.</summary>
    public static IReadOnlyList<string> Find(Config config)
    {
        var found = new List<string>();
        foreach (var (name, value) in config.Entries.OrderBy(e => e.Key, StringComparer.Ordinal))
        {
            if (!name.StartsWith("DC_", StringComparison.Ordinal))
            {
                continue;
            }

            foreach (var item in value.Split(','))
            {
                if (IsSample(item))
                {
                    found.Add(Describe(name, item.Trim()));
                }
            }
        }

        return found;
    }

    /// <summary>Stops the command before any request when a setting holds a sample value.</summary>
    public static void Refuse(Config config)
    {
        var found = Find(config);
        if (found.Count > 0)
        {
            throw new RecipeException(string.Join(Environment.NewLine, found));
        }
    }
}
