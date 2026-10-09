using System.Text.RegularExpressions;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Recipes;

/// <summary>Lookups that more than one recipe needs: phone line, voice, media, audio.</summary>
public static partial class RecipeSteps
{
    public const string Reminder = "Send only to people who agreed to hear from you. Test with numbers you own.";

    [GeneratedRegex(@"^\+[1-9]\d{1,14}$")]
    private static partial Regex E164();

    public static string RequireNumber(Config config, string name)
    {
        var value = config.Require(name, "Use E.164 format, for example +13125550142.");
        if (!E164().IsMatch(value))
        {
            throw new RecipeException($"{name} must be in E.164 format: a plus sign, the country code and the number, for example +13125550142.");
        }

        return value;
    }

    /// <summary>DC_PHONE_LINE_ID, else the account's default phone line.</summary>
    public static async Task<string> ResolveDefaultLineAsync(RecipeContext ctx, CancellationToken ct)
    {
        if (ctx.Config.Get("DC_PHONE_LINE_ID") is { } configured)
        {
            return configured;
        }

        var response = await ctx.Client.GetAsync("/phone/public/lines", ct);
        foreach (var line in Json.Items(response, "data"))
        {
            // The route reports the default line as "default" in the OpenAPI spec and as
            // "is_default" in the stored record, so accept either.
            var isDefault = Json.Bool(line, "default") == true || Json.Bool(line, "is_default") == true;
            if (isDefault && Json.String(line, "ivr_id") is { } lineId)
            {
                return lineId;
            }
        }

        throw new RecipeException(
            "No phone line to send from. Set DC_PHONE_LINE_ID to a line from GET /phone/public/lines, "
            + "or make one of your lines the default. Without either, the API would answer reason code 4010.");
    }

    /// <summary>DC_VOICE_ID, else the first voice whose status is "ready".</summary>
    public static async Task<string> ResolveVoiceAsync(RecipeContext ctx, CancellationToken ct)
    {
        if (ctx.Config.Get("DC_VOICE_ID") is { } configured)
        {
            return configured;
        }

        var response = await ctx.Client.GetAsync("/voice/public/voices", ct);
        foreach (var voice in Json.Items(response, "data", "voices"))
        {
            if (Json.String(voice, "status") == "ready" && Json.String(voice, "voice_id") is { } voiceId)
            {
                return voiceId;
            }
        }

        throw new RecipeException("No voice is ready. Set DC_VOICE_ID, or create a voice and wait until its status is ready (GET /voice/public/voices).");
    }

    /// <summary>The first media file you uploaded, preferring one approved for API sends.</summary>
    public static async Task<string> FirstMediaIdAsync(RecipeContext ctx, CancellationToken ct)
    {
        var response = await ctx.Client.GetAsync("/media/public/media?limit=20", ct);
        string? first = null;
        foreach (var media in Json.Items(response, "data", "medias"))
        {
            var mediaId = Json.String(media, "media_id");
            if (mediaId is null)
            {
                continue;
            }

            if (Json.Bool(media, "api_allowed") == true)
            {
                return mediaId;
            }

            first ??= mediaId;
        }

        return first ?? throw new RecipeException(
            $"No audio to send. Set {AudioSource.Variables}, or upload a file first (dotnet run -- upload-media).");
    }

    /// <summary>
    /// Makes the audio ready to write: uploads a DC_AUDIO_FILE and sends its media_id,
    /// checks text-to-speech length and fills in the voice when none was given.
    /// </summary>
    public static async Task<AudioSource> CompleteAudioAsync(RecipeContext ctx, AudioSource audio, CancellationToken ct)
    {
        if (audio.Kind == AudioKind.File)
        {
            return AudioSource.ForMedia(await MediaUpload.UploadAsync(ctx.Client, audio.File!, ctx.Out, ct));
        }

        if (audio.Kind == AudioKind.Url)
        {
            ctx.Out.WriteLine("About DC_AUDIO_URL: " + Hints.AudioUrlSupport);
            return audio;
        }

        audio.CheckTtsLength();
        if (audio.Kind != AudioKind.TextToSpeech || audio.VoiceId is not null)
        {
            return audio;
        }

        return audio.WithVoice(await ResolveVoiceAsync(ctx, ct));
    }
}
