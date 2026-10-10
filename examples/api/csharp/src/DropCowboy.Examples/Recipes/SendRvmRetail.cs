// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Retail accounts send from a phone line you own, so the request names a
// phone_line_id and never a caller_id. The audio is DC_MEDIA_ID, else DC_AUDIO_FILE
// (uploaded first), else DC_TTS_BODY, else DC_AUDIO_URL, else your first media file.
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Recipes;

public static class SendRvmRetail
{
    public static async Task<int> RunAsync(RecipeContext ctx, CancellationToken ct)
    {
        // Check everything that needs no network first, so a typo fails fast.
        var to = RecipeSteps.RequireNumber(ctx.Config, "DC_TO");
        var audio = AudioSource.FromConfig(ctx.Config);

        var lineId = await RecipeSteps.ResolveDefaultLineAsync(ctx, ct);
        audio = audio is null
            ? AudioSource.ForMedia(await RecipeSteps.FirstMediaIdAsync(ctx, ct))
            : await RecipeSteps.CompleteAudioAsync(ctx, audio, ct);

        var body = new JsonObject { ["to"] = to, ["phone_line_id"] = lineId };
        audio.WriteTo(body);

        await Delivery.SendAndWaitAsync(ctx, body, ct);
        return 0;
    }
}
