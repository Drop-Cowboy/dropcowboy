namespace DropCowboy.Examples.Lib;

/// <summary>What to do next, for the problems a first integration runs into most.</summary>
public static class Hints
{
    public const string ApiLogs = "Check Settings > API Logs, which shows the outcome and what your endpoint answered.";

    public const string AudioUrlSupport =
        "audio_url is an option for BYOC plans only and must be enabled by support. "
        + "Contact support to enable it. If you're testing on a retail account before connecting your carrier, "
        + "support can enable it for testing, and you can then send only to your test numbers. "
        + "Otherwise, upload the file and send media_id, or use text to speech.";

    public const string Upload403 =
        "The upload URL refused the file (403). Usually one of two things: the Content-Type "
        + "header did not match exactly the content_type returned with the URL, or the URL expired (upload URLs "
        + "last 2 days). Run \"dotnet run -- upload-media\" again for fresh URLs, or import the file from a public URL "
        + "instead: set DC_AUDIO_FILE to an https:// address of the .mp3 or .wav file.";

    public static readonly IReadOnlyDictionary<int, string> Outcomes = new Dictionary<int, string>
    {
        [3001] = "Audio file not valid: for example a media_id that is not on your account, or an audio_url that "
            + "could not be downloaded or is not MP3 or WAV. Upload the file with \"dotnet run -- upload-media\" and "
            + "send the media_id it prints.",
        [3014] = "Not allowed audio_url. " + AudioUrlSupport,
        [3040] = "Test Numbers Only: this account can send only to its test numbers right now, and this number is "
            + "not one of them. Send to one of your test numbers, or ask support to end testing mode."
    };

    /// <summary>The hint for a reason code, or null when there is none for it.</summary>
    public static string? ForOutcome(int? reasonCode)
    {
        return reasonCode is { } code && Outcomes.TryGetValue(code, out var hint) ? hint : null;
    }
}
