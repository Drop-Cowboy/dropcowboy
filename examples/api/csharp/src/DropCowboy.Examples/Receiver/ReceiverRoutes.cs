using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Receiver;

/// <summary>
/// The two result routes. Each one answers fast: read the bytes, check them, record
/// the result, answer. Slow work (a database write, a follow-up send) belongs on a
/// job queue of your own, after you have answered.
/// </summary>
internal sealed class ReceiverRoutes(ReceiverOptions options)
{
    private readonly TimeProvider _time = options.Time ?? TimeProvider.System;
    private readonly object _gate = new();

    // Event ids already handled. Fine for an example. In production use a database
    // table with a unique index on event_id, so a repeat is refused even after a restart.
    private readonly HashSet<string> _seenEventIds = [];

    /// <summary>
    /// POST /callbacks/dropcowboy: the unsigned result of one send. Anyone who learns the
    /// URL can post to it, so treat the body as a hint. Match foreign_id against sends you
    /// made, and use only the fields you need.
    /// </summary>
    public async Task<IResult> HandleCallbackAsync(HttpRequest request, CancellationToken ct)
    {
        var body = Json.ParseObject(await ReadBodyAsync(request, ct));
        if (body is null)
        {
            return Reply(400, new JsonObject { ["error"] = "body_must_be_a_json_object" });
        }

        Record(ReceivedEvent.FromCallback(body));
        return Reply(200, new JsonObject { ["received"] = true });
    }

    /// <summary>POST /webhooks/dropcowboy: a signed event for a subscribed event type.</summary>
    public async Task<IResult> HandleWebhookAsync(HttpRequest request, CancellationToken ct)
    {
        if (options.SigningSecrets.Count == 0)
        {
            return Reply(503, new JsonObject { ["error"] = "no_signing_secret_configured" });
        }

        // Read the raw bytes first. The signature covers exactly these bytes, so never
        // bind the body to a model, or parse it, before it is verified.
        var raw = await ReadBodyAsync(request, ct);

        var verdict = SignatureVerifier.Verify(
            raw,
            Header(request, "X-Signature"),
            Header(request, "X-Timestamp"),
            Header(request, "X-Signature-Version"),
            options.SigningSecrets,
            _time.GetUtcNow().ToUnixTimeSeconds());
        if (verdict != SignatureResult.Valid)
        {
            return Reply(401, new JsonObject { ["error"] = SignatureVerifier.ErrorCode(verdict) });
        }

        var envelope = Json.ParseObject(raw);
        if (envelope is null)
        {
            return Reply(400, new JsonObject { ["error"] = "body_must_be_a_json_object" });
        }

        // The same event can arrive more than once (retries, or several webhooks),
        // so record its id and skip repeats.
        var eventId = Json.String(envelope, "event_id") ?? Header(request, "X-Event-Id");
        if (eventId is not null && !FirstTimeSeen(eventId))
        {
            return Reply(200, new JsonObject { ["received"] = true, ["duplicate"] = true });
        }

        Record(ReceivedEvent.FromWebhook(envelope, eventId));
        return Reply(200, new JsonObject { ["received"] = true });
    }

    private static async Task<byte[]> ReadBodyAsync(HttpRequest request, CancellationToken ct)
    {
        using var buffer = new MemoryStream();
        await request.Body.CopyToAsync(buffer, ct);
        return buffer.ToArray();
    }

    private static string? Header(HttpRequest request, string name)
    {
        var value = request.Headers[name].ToString();
        return value.Length == 0 ? null : value;
    }

    private static IResult Reply(int status, JsonObject body) => Results.Json(body, statusCode: status);

    private bool FirstTimeSeen(string eventId)
    {
        lock (_gate)
        {
            return _seenEventIds.Add(eventId);
        }
    }

    private void Record(ReceivedEvent received)
    {
        options.Log.WriteLine(Describe(received));
        options.Events.Add(received);
    }

    private static string Describe(ReceivedEvent e)
    {
        var line = new StringBuilder();
        line.Append(e.Source == ResultSource.Callback ? "[callback]" : $"[webhook {Redact.Safe(e.EventName, 60)}]");

        if (e.Source == ResultSource.Webhook && e.EventName is not (ReceivedEvent.RvmStatus or ReceivedEvent.RvmReceipt))
        {
            return line.Append(" event accepted, no handler for this type").ToString();
        }

        Append(line, "status", e.Status);
        Append(line, "reason", e.Reason is null ? null : $"\"{e.Reason}\"");
        Append(line, "reason_code", e.ReasonCode?.ToString());
        Append(line, e.Source == ResultSource.Callback ? "caller_id" : "from", e.From);
        Append(line, e.Source == ResultSource.Callback ? "phone_number" : "to", e.To);
        Append(line, "foreign_id", e.ForeignId);
        Append(line, "proof_of_delivery_url", e.ProofOfDeliveryUrl);
        return line.ToString();
    }

    // Every value came from the request body, so strip control characters before printing.
    private static void Append(StringBuilder line, string name, string? value)
    {
        if (!string.IsNullOrEmpty(value))
        {
            line.Append(' ').Append(name).Append('=').Append(Redact.Safe(value));
        }
    }
}
