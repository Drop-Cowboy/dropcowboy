// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Text to speech: the API turns text into audio with one of your voices. The request
// carries tts_body and voice_id together, and no media_id or audio_url.
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Recipes;

public static class SendRvmTts
{
    public static async Task<int> RunAsync(RecipeContext ctx, CancellationToken ct)
    {
        var config = ctx.Config;
        var to = RecipeSteps.RequireNumber(config, "DC_TO");
        var text = config.Require("DC_TTS_BODY", $"Text to speak, {AudioSource.MaxTtsCharacters} characters or fewer.");
        var byoc = IsByocMode(config);
        var callerId = byoc ? RecipeSteps.RequireNumber(config, "DC_CALLER_ID") : null;

        var audio = AudioSource.ForTts(text, voiceId: null);
        audio.CheckTtsLength();

        var lineId = byoc ? null : await RecipeSteps.ResolveDefaultLineAsync(ctx, ct);
        audio = audio.WithVoice(await RecipeSteps.ResolveVoiceAsync(ctx, ct));

        if (config.IsYes("DC_PREVIEW"))
        {
            await PreviewAsync(ctx, audio, ct);
        }

        var body = new JsonObject { ["to"] = to };
        if (byoc)
        {
            body["caller_id"] = callerId;
        }
        else
        {
            body["phone_line_id"] = lineId;
        }

        audio.WriteTo(body);

        await Delivery.SendAndWaitAsync(ctx, body, ct);
        return 0;
    }

    private static bool IsByocMode(Config config)
    {
        var mode = config.Get("DC_MODE")?.ToLowerInvariant() ?? "retail";
        return mode switch
        {
            "retail" => false,
            "byoc" => true,
            _ => throw new RecipeException("DC_MODE must be retail or byoc.")
        };
    }

    // Synthesizing a preview bills per character, the same as a send does.
    private static async Task PreviewAsync(RecipeContext ctx, AudioSource audio, CancellationToken ct)
    {
        var request = new JsonObject { ["voice_id"] = audio.VoiceId, ["text"] = audio.TtsBody };
        var response = await ctx.Client.PostAsync("/voice/public/tts/synthesize", request, ct);

        ctx.Out.WriteLine("Preview:");
        ctx.Out.WriteLine($"  audio_url:      {Redact.Safe(Json.String(response, "data", "audio_url") ?? "(none)", 400)}");
        ctx.Out.WriteLine($"  expires_at:     {ExpiryText(Json.Long(response, "data", "expires_at"))}");
        ctx.Out.WriteLine($"  tts_characters: {Json.Int(response, "data", "tts_characters")?.ToString() ?? "(none)"} (billed per character)");
    }

    private static string ExpiryText(long? epochMilliseconds)
    {
        return epochMilliseconds is { } value
            ? DateTimeOffset.FromUnixTimeMilliseconds(value).ToString("yyyy-MM-dd'T'HH:mm:ss'Z'", System.Globalization.CultureInfo.InvariantCulture)
            : "(none)";
    }
}
