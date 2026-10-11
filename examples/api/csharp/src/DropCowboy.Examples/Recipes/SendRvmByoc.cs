// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Building Blocks accounts bring their own carrier. The request names the caller_id
// to show, which must be a number you are entitled to use, and never a phone_line_id.
// Always identify your business location truthfully when asked by recipients.
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Recipes;

public static class SendRvmByoc
{
    public static async Task<int> RunAsync(RecipeContext ctx, CancellationToken ct)
    {
        var to = RecipeSteps.RequireNumber(ctx.Config, "DC_TO");
        var callerId = RecipeSteps.RequireNumber(ctx.Config, "DC_CALLER_ID");
        var audio = AudioSource.RequireFromConfig(ctx.Config);

        await RequireConnectedCarrierAsync(ctx, ct);
        audio = await RecipeSteps.CompleteAudioAsync(ctx, audio, ct);

        var body = new JsonObject { ["to"] = to, ["caller_id"] = callerId };
        audio.WriteTo(body);
        AddSignedCallingDetails(body, ctx.Config);

        await Delivery.SendAndWaitAsync(ctx, body, ct);
        return 0;
    }

    public static async Task RequireConnectedCarrierAsync(RecipeContext ctx, CancellationToken ct)
    {
        var status = await ctx.Client.GetAsync("/integration/public/byoc", ct);
        if (Json.Bool(status, "data", "connected") != true)
        {
            throw new RecipeException(
                "No carrier is connected to this account. Connect one first with POST /integration/public/byoc/connect "
                + "(see the BYOC connect guide), then run this again.");
        }
    }

    // Optional. Set both to pass your own signed-calling (STIR/SHAKEN) details with the send.
    // DC_STI_ATTESTATION: The level your carrier assigned to the number: A, B or C. Never send a higher level than your carrier gave you.
    private static void AddSignedCallingDetails(JsonObject body, Config config)
    {
        var originId = config.Get("DC_STI_ORIG_ID");
        var attestation = config.Get("DC_STI_ATTESTATION");
        if (originId is null || attestation is null)
        {
            return;
        }

        body["byoc"] = new JsonObject { ["sti_orig_id"] = originId, ["sti_attestation"] = attestation };
    }
}
