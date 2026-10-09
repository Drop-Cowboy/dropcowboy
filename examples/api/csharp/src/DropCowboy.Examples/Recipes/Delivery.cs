using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;

namespace DropCowboy.Examples.Recipes;

/// <summary>What a send produced: the message id, our correlation id and the result, if one arrived.</summary>
public sealed record SendOutcome(string? MessageId, string ForeignId, ReceivedEvent? Result);

/// <summary>
/// The tail of every recipe: start the receiver, POST /rvm, then wait for the result.
/// A result reaches you two ways, and this waits for whichever comes first:
/// the callback_url on the send, or a webhook for contact.rvm.status.
/// </summary>
public static class Delivery
{
    public static async Task<SendOutcome> SendAndWaitAsync(RecipeContext ctx, JsonObject body, CancellationToken ct)
    {
        var config = ctx.Config;
        var wantsResult = config.WaitSeconds > 0;
        var recipient = body["to"]?.GetValue<string>() ?? string.Empty;

        // Start listening before sending so a fast result cannot arrive with nobody there.
        ReceiverSession? receiver = null;
        try
        {
            if (wantsResult && config.CallbackUrl is not null)
            {
                receiver = await ReceiverSession.StartAsync(config, ctx.Client, ctx.Out, ct);
                ctx.Out.WriteLine($"Receiver listening on port {receiver.Port}. Callback URL: {config.CallbackUrl}");
            }
            else if (config.CallbackUrl is null)
            {
                ctx.Out.WriteLine(
                    "DC_PUBLIC_URL is not set, so this send has no callback_url and its result will not arrive here. "
                    + "A webhook still gets it. See the README for the HTTPS tunnel setup.");
            }

            var foreignId = Guid.NewGuid().ToString();
            body["foreign_id"] = foreignId;
            if (config.CallbackUrl is not null)
            {
                body["callback_url"] = config.CallbackUrl;
            }

            var messageId = await ctx.Client.SendRvmAsync(body, ct);
            ctx.Out.WriteLine($"Accepted (202). message_id={messageId} foreign_id={foreignId}");
            ctx.Out.WriteLine("Accepted means the API took the request, not that anything reached the recipient. The status that follows says what happened to it.");

            if (receiver is null)
            {
                if (!wantsResult)
                {
                    ctx.Out.WriteLine("DC_WAIT_SECONDS is 0, so this is not waiting for a result.");
                }

                ctx.Out.WriteLine(Hints.ApiLogs);

                return new SendOutcome(messageId, foreignId, null);
            }

            var result = await WaitForResultAsync(ctx, receiver, foreignId, recipient, ct);
            return new SendOutcome(messageId, foreignId, result);
        }
        finally
        {
            if (receiver is not null)
            {
                await receiver.DisposeAsync();
            }
        }
    }

    private static async Task<ReceivedEvent?> WaitForResultAsync(
        RecipeContext ctx, ReceiverSession receiver, string foreignId, string recipient, CancellationToken ct)
    {
        ctx.Out.WriteLine($"Waiting up to {ctx.Config.WaitSeconds} seconds for the result (Ctrl-C to stop)...");

        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(ct);
        timeout.CancelAfter(TimeSpan.FromSeconds(ctx.Config.WaitSeconds));

        var result = await receiver.Events.WaitForAsync(e => IsResultFor(e, foreignId, recipient), timeout.Token);
        ct.ThrowIfCancellationRequested();

        if (result is null)
        {
            ctx.Out.WriteLine(
                "No result has arrived yet. It can still arrive later: keep \"dotnet run -- receiver\" running, "
                + "or read it from the webhook you subscribed.");
            ctx.Out.WriteLine(Hints.ApiLogs);
            return null;
        }

        PrintResult(ctx.Out, result);
        return result;
    }

    // Callbacks carry the foreign_id. Webhook events do not, so those match on the recipient.
    // Receipt events report a later stage and never end the wait.
    private static bool IsResultFor(ReceivedEvent e, string foreignId, string recipient)
    {
        return e.Source == ResultSource.Callback
            ? e.ForeignId == foreignId
            : e.EventName == ReceivedEvent.RvmStatus && e.To == recipient;
    }

    public static void PrintResult(TextWriter output, ReceivedEvent result)
    {
        var via = result.Source == ResultSource.Callback ? "callback" : "webhook";
        output.WriteLine($"Result (from the {via}):");
        output.WriteLine($"  status:      {Redact.Safe(result.Status ?? "(none)")}");
        output.WriteLine($"  reason:      {Redact.Safe(string.IsNullOrEmpty(result.Reason) ? "(none)" : result.Reason)}");
        output.WriteLine($"  reason_code: {result.ReasonCode?.ToString() ?? "(none)"}");
        if (!string.IsNullOrEmpty(result.From))
        {
            output.WriteLine($"  from:        {Redact.Safe(result.From)}");
        }

        if (!string.IsNullOrEmpty(result.ProofOfDeliveryUrl))
        {
            output.WriteLine($"  proof:       {Redact.Safe(result.ProofOfDeliveryUrl, 400)}");
        }

        if (Hints.ForOutcome(result.ReasonCode) is { } hint)
        {
            output.WriteLine("What to do: " + hint);
        }
    }
}
