// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Puts an audio file on your account and prints its media_id. Set DC_AUDIO_FILE to a
// .mp3 or .wav on this computer (signed upload), or to an https:// address of one
// (import). DC_MEDIA_NAME names it in your media library; it defaults to the file name.
// The key needs the media:write scope. Then set DC_MEDIA_ID to the id this prints.
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Recipes;

namespace DropCowboy.Examples;

public static class UploadMedia
{
    public static async Task<int> RunAsync(RecipeContext ctx, CancellationToken ct)
    {
        var value = ctx.Config.Require("DC_AUDIO_FILE", "Set it to a .mp3 or .wav file on this computer, or to an https:// address of one.");
        var source = AudioFile.FromValue(value, ctx.Config.Get("DC_MEDIA_NAME"));

        var mediaId = await MediaUpload.UploadAsync(ctx.Client, source, ctx.Out, ct);
        ctx.Out.WriteLine($"media_id: {mediaId}");
        ctx.Out.WriteLine($"To send it, set DC_MEDIA_ID={mediaId}");
        return 0;
    }
}
