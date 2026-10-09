using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Lib;

public enum AudioKind
{
    Media,
    File,
    TextToSpeech,
    Url
}

/// <summary>
/// The audio for one send. POST /rvm takes exactly one audio option, so this type
/// writes exactly one: media_id, or tts_body with voice_id, or audio_url. A File is
/// uploaded first and sent as the media_id it gets.
/// </summary>
public sealed record AudioSource(AudioKind Kind, string? MediaId, string? TtsBody, string? VoiceId, string? AudioUrl)
{
    public const int MaxTtsCharacters = 1200;

    public const string Variables = "DC_MEDIA_ID, DC_AUDIO_FILE, DC_TTS_BODY or DC_AUDIO_URL";

    /// <summary>The DC_AUDIO_FILE to upload, when Kind is File.</summary>
    public AudioFile? File { get; init; }

    /// <summary>
    /// Picks the audio from the environment. If more than one variable is set the first
    /// of DC_MEDIA_ID, DC_AUDIO_FILE, DC_TTS_BODY, DC_AUDIO_URL wins. Returns null when none is set.
    /// A bad DC_AUDIO_FILE stops here, before any request.
    /// </summary>
    public static AudioSource? FromConfig(Config config)
    {
        if (config.Get("DC_MEDIA_ID") is { } mediaId)
        {
            return ForMedia(mediaId);
        }

        if (config.Get("DC_AUDIO_FILE") is { } file)
        {
            return new AudioSource(AudioKind.File, null, null, null, null)
            {
                File = AudioFile.FromValue(file, config.Get("DC_MEDIA_NAME"))
            };
        }

        if (config.Get("DC_TTS_BODY") is { } text)
        {
            return ForTts(text, config.Get("DC_VOICE_ID"));
        }

        return config.Get("DC_AUDIO_URL") is { } url ? new AudioSource(AudioKind.Url, null, null, null, url) : null;
    }

    public static AudioSource RequireFromConfig(Config config)
    {
        return FromConfig(config) ?? throw new RecipeException(
            "Choose the audio to send. Set one of DC_MEDIA_ID (audio you uploaded), DC_AUDIO_FILE (a .mp3 or .wav to upload), "
            + "DC_TTS_BODY (text to speak) or DC_AUDIO_URL (a hosted mp3 or wav; it must be enabled by support).");
    }

    public static AudioSource ForMedia(string mediaId) => new(AudioKind.Media, mediaId, null, null, null);

    public static AudioSource ForTts(string text, string? voiceId) => new(AudioKind.TextToSpeech, null, text, voiceId, null);

    public AudioSource WithVoice(string voiceId) => this with { VoiceId = voiceId };

    /// <summary>The API rejects longer text with reason code 3021, so check before sending.</summary>
    public void CheckTtsLength()
    {
        if (TtsBody is null)
        {
            return;
        }

        var characters = TtsBody.EnumerateRunes().Count();
        if (characters > MaxTtsCharacters)
        {
            throw new RecipeException(
                $"DC_TTS_BODY has {characters} characters. The most is {MaxTtsCharacters}, counted after merge fields are filled in.");
        }
    }

    public void WriteTo(JsonObject body)
    {
        switch (Kind)
        {
            case AudioKind.Media:
                body["media_id"] = MediaId;
                break;
            case AudioKind.TextToSpeech:
                // The API refuses tts_body without voice_id (3002) and voice_id without
                // tts_body (3015), so they always travel together.
                body["tts_body"] = TtsBody;
                body["voice_id"] = VoiceId ?? throw new InvalidOperationException("Resolve the voice before writing text to speech.");
                break;
            case AudioKind.Url:
                body["audio_url"] = AudioUrl;
                break;
            case AudioKind.File:
                throw new InvalidOperationException("Upload the file before writing the request.");
            default:
                throw new InvalidOperationException($"Unknown audio kind {Kind}.");
        }
    }
}
