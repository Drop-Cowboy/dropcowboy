using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Lib;

/// <summary>Something the detect-twilio receiver recorded. RecordedAt is a Stopwatch timestamp.</summary>
public abstract record CallEvent(long RecordedAt);

/// <summary>A verified Detection webhook. Ignored means its call_id is not this run's.</summary>
public sealed record DetectionEvent(string Name, string? DeliveryId, string? CallId, bool Ignored, JsonObject Body, long RecordedAt)
    : CallEvent(RecordedAt)
{
    public JsonNode? Data => Json.Get(Body, "data");
}

/// <summary>A verified Twilio status callback.</summary>
public sealed record TwilioStatusEvent(string CallSid, string Status, string? Duration, long RecordedAt)
    : CallEvent(RecordedAt);

public sealed record CallEventCounts(int Received, int Duplicates, int Ignored);

/// <summary>
/// The in-process, ordered record of one detect-twilio run: Detection webhooks and Twilio
/// status callbacks. The receiver's handlers only add to it. The recipe reads it and decides,
/// so no handler ever calls Twilio. Every member is safe to call from several threads.
/// </summary>
public sealed class CallEvents(string callId)
{
    private readonly object _gate = new();
    private readonly List<CallEvent> _items = [];

    // Delivery ids already handled. Detection retries a delivery with the same id. In
    // production keep these in a database table with a unique index.
    private readonly HashSet<string> _deliveryIds = [];
    private TaskCompletionSource _changed = NewSignal();
    private string? _callSid;
    private int _received;
    private int _duplicates;
    private int _ignored;

    /// <summary>The run's own call_id, sent to Detection as a stream parameter and echoed on every event.</summary>
    public string CallId => callId;

    /// <summary>The CallSid of the call this run created, once Twilio has answered.</summary>
    public string? CallSid
    {
        get
        {
            lock (_gate)
            {
                return _callSid;
            }
        }

        set
        {
            lock (_gate)
            {
                _callSid = value;
            }
        }
    }

    public CallEventCounts Counts
    {
        get
        {
            lock (_gate)
            {
                return new CallEventCounts(_received, _duplicates, _ignored);
            }
        }
    }

    public bool IsThisCall(string? callSid) => callSid is not null && callSid == CallSid;

    /// <summary>True the first time a delivery id is seen. A repeat counts as a duplicate.</summary>
    public bool FirstDelivery(string deliveryId)
    {
        lock (_gate)
        {
            if (_deliveryIds.Add(deliveryId))
            {
                return true;
            }

            _duplicates++;
            return false;
        }
    }

    public void Add(CallEvent item)
    {
        TaskCompletionSource previous;
        lock (_gate)
        {
            _items.Add(item);
            if (item is DetectionEvent detection)
            {
                _received++;
                if (detection.Ignored)
                {
                    _ignored++;
                }
            }

            previous = _changed;
            _changed = NewSignal();
        }

        previous.SetResult();
    }

    /// <summary>
    /// Everything recorded from this index on, plus a task that completes on the next Add.
    /// Both come from one lock, so nothing added after the snapshot can be missed.
    /// </summary>
    public (IReadOnlyList<CallEvent> Items, Task Changed) Since(int index)
    {
        lock (_gate)
        {
            var items = index < _items.Count ? _items.GetRange(index, _items.Count - index) : [];
            return (items, _changed.Task);
        }
    }

    private static TaskCompletionSource NewSignal() => new(TaskCreationOptions.RunContinuationsAsynchronously);
}
