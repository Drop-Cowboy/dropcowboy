using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Lib;

public enum ResultSource
{
    Callback,
    Webhook
}

/// <summary>One result the receiver accepted, from a callback or a signed webhook.</summary>
public sealed record ReceivedEvent(
    ResultSource Source,
    string EventName,
    string? EventId,
    string? ForeignId,
    string? To,
    string? From,
    string? Status,
    string? Reason,
    int? ReasonCode,
    string? ProofOfDeliveryUrl)
{
    public const string RvmStatus = "contact.rvm.status";
    public const string RvmReceipt = "contact.rvm.receipt";

    /// <summary>The body POSTed to a callback_url. It echoes foreign_id and names the number it sent from as caller_id.</summary>
    public static ReceivedEvent FromCallback(JsonObject body)
    {
        return new ReceivedEvent(
            ResultSource.Callback,
            "callback",
            null,
            Json.String(body, "foreign_id"),
            Json.String(body, "phone_number"),
            Json.String(body, "caller_id"),
            Json.String(body, "status"),
            Json.String(body, "reason"),
            Json.Int(body, "reason_code"),
            Json.String(body, "proof_of_delivery_url"));
    }

    /// <summary>A signed webhook envelope: { event_id, event, event_at, data }. Webhooks carry no foreign_id.</summary>
    public static ReceivedEvent FromWebhook(JsonObject envelope, string? eventId)
    {
        var data = Json.Get(envelope, "data");
        return new ReceivedEvent(
            ResultSource.Webhook,
            Json.String(envelope, "event") ?? "unknown",
            eventId,
            null,
            Json.String(data, "to"),
            Json.String(data, "from"),
            Json.String(data, "status"),
            Json.String(data, "reason"),
            Json.Int(data, "reason_code"),
            Json.String(data, "proof_of_delivery_url"));
    }
}

/// <summary>
/// The in-process list of results the receiver has accepted. Recipes wait on it for
/// the result of their own send. A real service would write to a database or a job
/// queue of its own instead.
/// </summary>
public sealed class ReceivedEvents
{
    private readonly object _gate = new();
    private readonly List<ReceivedEvent> _items = [];
    private TaskCompletionSource _changed = NewSignal();

    public IReadOnlyList<ReceivedEvent> Snapshot()
    {
        lock (_gate)
        {
            return _items.ToArray();
        }
    }

    public void Add(ReceivedEvent received)
    {
        TaskCompletionSource previous;
        lock (_gate)
        {
            _items.Add(received);
            previous = _changed;
            _changed = NewSignal();
        }

        previous.SetResult();
    }

    /// <summary>
    /// Returns the first event that matches, whether it arrived before or after this call.
    /// Returns null when the token is cancelled first (a timeout, or Ctrl-C).
    /// </summary>
    public async Task<ReceivedEvent?> WaitForAsync(Func<ReceivedEvent, bool> matches, CancellationToken ct)
    {
        while (true)
        {
            Task changed;
            lock (_gate)
            {
                foreach (var item in _items)
                {
                    if (matches(item))
                    {
                        return item;
                    }
                }

                changed = _changed.Task;
            }

            try
            {
                await changed.WaitAsync(ct);
            }
            catch (OperationCanceledException)
            {
                return null;
            }
        }
    }

    private static TaskCompletionSource NewSignal() => new(TaskCreationOptions.RunContinuationsAsynchronously);
}
