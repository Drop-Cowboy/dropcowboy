using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Recipes;

/// <summary>
/// The detect-twilio settings, checked before any request. Every problem is reported at
/// once, in a fixed order, so one run shows everything to fix.
/// </summary>
public sealed partial record DetectTwilioSettings(
    string AccountSid,
    string AuthToken,
    string From,
    string TwilioBaseUrl,
    string To,
    string PublicUrl,
    string? DetectionKey,
    string DetectionUrl,
    VoiceMessage Voicemail,
    VoiceMessage? Live,
    int RingSeconds,
    int WaitSeconds,
    int Port)
{
    public const string DefaultDetectionUrl = "wss://detect.dropcowboy.com/carrier/ws/twilio";
    public const int MaxTextCharacters = 1000;
    public const string ZeroSidMessage = "this is the placeholder from our fixtures; use your own";

    [GeneratedRegex(@"^\+\d{8,15}$")]
    private static partial Regex E164();

    [GeneratedRegex("^AC[0-9a-fA-F]{32}$")]
    private static partial Regex AccountSidShape();

    [GeneratedRegex("^AC0{32}$")]
    private static partial Regex ZeroAccountSid();

    /// <summary>Reads and checks every setting. Throws a RecipeException listing every problem.</summary>
    public static DetectTwilioSettings Load(Config config)
    {
        var problems = new List<string>();

        // 1. Required settings.
        var accountSid = Required(config, problems, "TWILIO_ACCOUNT_SID", "the Account SID from the Twilio Console (AC followed by 32 characters).");
        var authToken = Required(config, problems, "TWILIO_AUTH_TOKEN", "the Auth Token from the Twilio Console.");
        var from = Required(config, problems, "TWILIO_FROM", "a number in your Twilio account, or a verified caller ID on it, in E.164.");
        var to = Required(config, problems, "DC_TO", "the number to call, in E.164. Call only people who agreed to hear from you.");
        var publicUrlRaw = Required(config, problems, "DC_PUBLIC_URL", "the public https:// address of a tunnel to this receiver.");

        var detectionKey = config.Get("DC_DETECTION_KEY");
        if (detectionKey is null)
        {
            var hasKey = config.Get("DC_KEY") is not null;
            var hasSecret = config.Get("DC_SECRET") is not null;
            if (!hasKey && !hasSecret)
            {
                problems.Add("Set DC_DETECTION_KEY to a Detection key, or set DC_KEY and DC_SECRET so the recipe creates a temporary key and deletes it at the end.");
            }
            else if (!hasSecret)
            {
                problems.Add("DC_SECRET is required with DC_KEY (or set DC_DETECTION_KEY instead).");
            }
            else if (!hasKey)
            {
                problems.Add("DC_KEY is required with DC_SECRET (or set DC_DETECTION_KEY instead).");
            }
        }

        var vmAudio = config.Get("DC_VM_AUDIO_URL");
        var vmText = config.Get("DC_VM_TEXT");
        if (vmAudio is null && vmText is null)
        {
            problems.Add("Set DC_VM_AUDIO_URL (an https:// .mp3 or .wav) or DC_VM_TEXT: the message Twilio plays on the beep.");
        }

        // 2. E.164 numbers.
        CheckNumber(problems, "DC_TO", to);
        CheckNumber(problems, "TWILIO_FROM", from);

        // 3. Account SID shape.
        if (accountSid is not null && !AccountSidShape().IsMatch(accountSid))
        {
            problems.Add("TWILIO_ACCOUNT_SID must be AC followed by 32 hexadecimal characters, as shown in the Twilio Console.");
        }

        // 4. The public URL.
        string publicUrl = string.Empty;
        if (publicUrlRaw is not null)
        {
            var problem = PublicUrlProblem(publicUrlRaw);
            if (problem is null)
            {
                publicUrl = publicUrlRaw.TrimEnd('/');
            }
            else
            {
                problems.Add(problem);
            }
        }

        // 5. Messages and the Detection URL.
        CheckAudioUrl(problems, "DC_VM_AUDIO_URL", vmAudio);
        var liveAudio = config.Get("DC_LIVE_AUDIO_URL");
        CheckAudioUrl(problems, "DC_LIVE_AUDIO_URL", liveAudio);
        var liveText = config.Get("DC_LIVE_TEXT");
        CheckText(problems, "DC_VM_TEXT", vmText);
        CheckText(problems, "DC_LIVE_TEXT", liveText);

        var detectionUrl = config.Get("DC_DETECTION_URL") ?? DefaultDetectionUrl;
        var detectionUrlValid = detectionUrl.StartsWith("wss://", StringComparison.OrdinalIgnoreCase)
            && Uri.TryCreate(detectionUrl, UriKind.Absolute, out _);
        if (!detectionUrlValid)
        {
            problems.Add($"DC_DETECTION_URL must start with wss://. Leave it unset to use {DefaultDetectionUrl}.");
        }

        var twilioBaseUrl = (config.Get("TWILIO_BASE_URL") ?? TwilioClient.DefaultBaseUrl).TrimEnd('/');
        var twilioBaseValid = Uri.TryCreate(twilioBaseUrl, UriKind.Absolute, out var twilioBase)
            && (twilioBase.Scheme == Uri.UriSchemeHttps || twilioBase.Scheme == Uri.UriSchemeHttp);
        if (!twilioBaseValid)
        {
            problems.Add($"TWILIO_BASE_URL must be a full URL. Leave it unset to use {TwilioClient.DefaultBaseUrl}.");
        }

        // 6. Numeric ranges.
        var ring = WholeNumber(config, problems, "DC_RING_SECONDS", 30, 5, 60);
        int wait;
        if (config.Get("DC_WAIT_SECONDS") == "0")
        {
            problems.Add("DC_WAIT_SECONDS=0 is not allowed: this recipe has to listen for Detection and Twilio. Use 60 to 600.");
            wait = 0;
        }
        else
        {
            wait = WholeNumber(config, problems, "DC_WAIT_SECONDS", 180, 60, 600);
        }

        var port = Config.DefaultPort;
        try
        {
            port = config.Port;
        }
        catch (RecipeException ex)
        {
            problems.Add(ex.Message);
        }

        // 7. In the same pass, after the problems above: values copied from our docs and fixtures.
        problems.AddRange(SampleValues.Find(config));
        if (SampleValues.IsSample(from))
        {
            problems.Add(SampleValues.Describe("TWILIO_FROM", from!));
        }

        if (accountSid is not null && ZeroAccountSid().IsMatch(accountSid))
        {
            problems.Add($"TWILIO_ACCOUNT_SID={accountSid}: {ZeroSidMessage}.");
        }

        if (problems.Count > 0)
        {
            throw new RecipeException(string.Join(Environment.NewLine, problems));
        }

        return new DetectTwilioSettings(
            accountSid!,
            authToken!,
            from!,
            twilioBaseUrl,
            to!,
            publicUrl,
            detectionKey,
            detectionUrl,
            vmAudio is not null ? VoiceMessage.Audio(vmAudio) : VoiceMessage.Text(vmText!),
            liveAudio is not null ? VoiceMessage.Audio(liveAudio) : liveText is not null ? VoiceMessage.Text(liveText) : null,
            ring,
            wait,
            port);
    }

    /// <summary>
    /// Detection posts only to https:// on port 443, and Twilio fetches TwiML from the same
    /// place, so the address has to be a public HTTPS name such as a tunnel's.
    /// </summary>
    public static string? PublicUrlProblem(string raw)
    {
        var trimmed = raw.TrimEnd('/');
        if (!Uri.TryCreate(trimmed, UriKind.Absolute, out var uri))
        {
            return "DC_PUBLIC_URL must be a full https:// URL, such as your tunnel's address.";
        }

        if (uri.Scheme != Uri.UriSchemeHttps)
        {
            return "DC_PUBLIC_URL must start with https://: Twilio and Detection call only HTTPS URLs.";
        }

        if (trimmed.Contains('?') || trimmed.Contains('#'))
        {
            return "DC_PUBLIC_URL must not have a query string or a fragment.";
        }

        if (uri.Port != 443)
        {
            return "DC_PUBLIC_URL must not name a port other than 443: Detection accepts only port 443. Use the tunnel's https:// address and point the tunnel at PORT.";
        }

        if (!IsPublicHost(uri))
        {
            return "DC_PUBLIC_URL must be a public address, not localhost, .local or a private or link-local address. Use your tunnel's https:// address.";
        }

        return null;
    }

    private static bool IsPublicHost(Uri uri)
    {
        var host = uri.IdnHost.Trim('[', ']').TrimEnd('.').ToLowerInvariant();
        if (host == "localhost" || host.EndsWith(".localhost", StringComparison.Ordinal) || host.EndsWith(".local", StringComparison.Ordinal))
        {
            return false;
        }

        if (!IPAddress.TryParse(host, out var address))
        {
            return true;
        }

        if (address.IsIPv4MappedToIPv6)
        {
            address = address.MapToIPv4();
        }

        if (IPAddress.IsLoopback(address) || address.Equals(IPAddress.Any) || address.Equals(IPAddress.IPv6Any))
        {
            return false;
        }

        if (address.AddressFamily == AddressFamily.InterNetworkV6)
        {
            return !(address.IsIPv6LinkLocal || address.IsIPv6SiteLocal || address.IsIPv6UniqueLocal);
        }

        var b = address.GetAddressBytes();
        return !(b[0] == 0 || b[0] == 10 || b[0] == 127 || (b[0] == 172 && b[1] >= 16 && b[1] <= 31)
            || (b[0] == 192 && b[1] == 168) || (b[0] == 169 && b[1] == 254));
    }

    private static string? Required(Config config, List<string> problems, string name, string meaning)
    {
        var value = config.Get(name);
        if (value is null)
        {
            problems.Add($"{name} is required: {meaning}");
        }

        return value;
    }

    private static void CheckNumber(List<string> problems, string name, string? value)
    {
        if (value is not null && !E164().IsMatch(value))
        {
            problems.Add($"{name} must be in E.164 format: a plus sign and 8 to 15 digits, for example +13125550142.");
        }
    }

    private static void CheckAudioUrl(List<string> problems, string name, string? value)
    {
        if (value is null)
        {
            return;
        }

        var valid = Uri.TryCreate(value, UriKind.Absolute, out var uri)
            && uri.Scheme == Uri.UriSchemeHttps
            && (uri.AbsolutePath.EndsWith(".mp3", StringComparison.OrdinalIgnoreCase)
                || uri.AbsolutePath.EndsWith(".wav", StringComparison.OrdinalIgnoreCase));
        if (!valid)
        {
            problems.Add($"{name} must be a public https:// address of a .mp3 or .wav file that Twilio can fetch.");
        }
    }

    // Counted in characters (Unicode code points), not UTF-16 units.
    private static void CheckText(List<string> problems, string name, string? value)
    {
        if (value is null)
        {
            return;
        }

        var length = value.EnumerateRunes().Count();
        if (length > MaxTextCharacters)
        {
            problems.Add($"{name} must be 1,000 characters or fewer (it has {length.ToString("N0", CultureInfo.InvariantCulture)}).");
        }
    }

    private static int WholeNumber(Config config, List<string> problems, string name, int fallback, int min, int max)
    {
        var raw = config.Get(name);
        if (raw is null)
        {
            return fallback;
        }

        var parsed = int.TryParse(raw, NumberStyles.None, CultureInfo.InvariantCulture, out var number);
        if (!parsed || number < min || number > max)
        {
            problems.Add($"{name} must be a whole number from {min} to {max}.");
            return fallback;
        }

        return number;
    }
}
