using System.Globalization;
using System.Security;

namespace DropCowboy.Examples.Lib;

/// <summary>A message Twilio plays (an https:// .mp3 or .wav) or speaks (text).</summary>
public sealed record VoiceMessage(bool IsAudio, string Value)
{
    public static VoiceMessage Audio(string url) => new(true, url);

    public static VoiceMessage Text(string text) => new(false, text);
}

/// <summary>What the stream TwiML tells Detection: where to connect, the key, and the options.</summary>
public sealed record DetectionStream(
    string DetectionUrl,
    string DetectionKey,
    string WebhookUrl,
    string Strategy,
    string CallId,
    int DetectionTimeoutSec,
    int BeepWaitSeconds);

/// <summary>
/// The two TwiML documents the recipe uses. Every value is XML-escaped, so a "&amp;" in a
/// URL or an apostrophe in the text cannot break the document.
/// </summary>
public static class Twiml
{
    public const string StreamName = "detection";
    public const string WebhookEvents = "detection,beep,screening,timeout,error,close";

    /// <summary>Escapes the five XML special characters: &amp; &lt; &gt; " '.</summary>
    public static string Escape(string value) => SecurityElement.Escape(value) ?? string.Empty;

    /// <summary>
    /// Answers the call. Start forks the audio to Detection and lets the TwiML go on, so the
    /// call waits silently in Pause while Detection listens. Hangup ends a call nobody acted on.
    /// </summary>
    public static string StartDetection(DetectionStream stream)
    {
        var pause = stream.DetectionTimeoutSec + stream.BeepWaitSeconds + 10;
        string[] lines =
        [
            "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
            "<Response>",
            "  <Start>",
            $"    <Stream name=\"{StreamName}\" url=\"{Escape(stream.DetectionUrl)}\" track=\"inbound_track\">",
            Parameter("api_key", stream.DetectionKey),
            Parameter("webhook_url", stream.WebhookUrl),
            Parameter("webhook_events", WebhookEvents),
            Parameter("strategy", stream.Strategy),
            Parameter("call_id", stream.CallId),
            Parameter("detection_timeout_sec", stream.DetectionTimeoutSec.ToString(CultureInfo.InvariantCulture)),
            "    </Stream>",
            "  </Start>",
            $"  <Pause length=\"{pause.ToString(CultureInfo.InvariantCulture)}\"/>",
            "  <Hangup/>",
            "</Response>"
        ];
        return string.Join("\n", lines);
    }

    /// <summary>
    /// Replaces the running TwiML: stop the stream (which ends the Detection session),
    /// play or speak the message, hang up.
    /// </summary>
    public static string PlayMessage(VoiceMessage message)
    {
        var play = message.IsAudio
            ? $"<Play>{Escape(message.Value)}</Play>"
            : $"<Say>{Escape(message.Value)}</Say>";
        return $"<Response><Stop><Stream name=\"{StreamName}\"/></Stop>{play}<Hangup/></Response>";
    }

    private static string Parameter(string name, string value)
    {
        return $"      <Parameter name=\"{name}\" value=\"{Escape(value)}\"/>";
    }
}
