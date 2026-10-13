// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// detect-twilio: calls DC_TO from TWILIO_FROM through your own Twilio account, forks the
// call audio to Detection with <Start><Stream>, receives Detection's signed webhooks, and
// redirects the live call with Twilio's REST API when the beep arrives (or a live person
// answers). Twilio is called over plain HTTPS, like the Drop Cowboy API: no SDK.
//
// The receiver's handlers only verify, record and answer. This file reads what they
// recorded and makes at most one change to the call.
using System.Diagnostics;
using System.Globalization;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;

namespace DropCowboy.Examples.Recipes;

/// <summary>Tests shorten the run and send the tunnel check straight to the receiver.</summary>
public sealed record DetectTwilioOptions
{
    /// <summary>Replaces DC_WAIT_SECONDS.</summary>
    public TimeSpan? Wait { get; init; }

    /// <summary>Replaces DC_PUBLIC_URL + "/health" for the tunnel check.</summary>
    public string? HealthCheckUrl { get; init; }

    /// <summary>First delay between retried Twilio GETs.</summary>
    public TimeSpan? RetryBaseDelay { get; init; }
}

public static class DetectTwilio
{
    public const string BillingLine = "This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.";
    public const string TemporaryKeyName = "Twilio detection recipe (temporary)";
    public const int TemporaryKeySeconds = 3600;
    public const string LivePersonPrefix = "speech.human.";

    public const string TrialMessage =
        "Twilio trial accounts play a notice and wait for a key press before your TwiML runs, so detection "
        + "would hear the notice. Upgrade the Twilio account to run this recipe.";

    public const string NotOnAccountMessage = "TWILIO_FROM is not a number in this Twilio account or a verified caller ID on it.";

    public const string NoResultMessage =
        "No Detection result arrived. Check that the Detection key is active and the balance covers Detection, "
        + "and look for stream errors in the Twilio Console debugger.";

    public const string NoWebhookMessage =
        "No Detection webhook arrived at all. A refused Detection key closes the stream before any webhook is sent.";

    public static readonly IReadOnlyDictionary<string, string> KeyRefusalHints = new Dictionary<string, string>
    {
        ["byoc-required"] = "Detection keys need Building Blocks on your account. Enable Building Blocks, then run this again.",
        ["team-not-verified"] = "Finish verifying your account in the dashboard, then run this again.",
        ["trial_feature_blocked"] = "Detection keys are not available on a trial account. Choose a plan, then run this again."
    };

    private static readonly string[] TerminalStatuses = ["completed", "busy", "no-answer", "failed", "canceled"];

    public static bool IsTerminal(string? status) => status is not null && TerminalStatuses.Contains(status);

    public static async Task<int> RunAsync(
        Config config, TextWriter output, TextWriter error, CancellationToken ct, DetectTwilioOptions? options = null)
    {
        output.WriteLine(BillingLine);
        var settings = DetectTwilioSettings.Load(config);
        using var run = new DetectTwilioRun(config, settings, output, error, options ?? new DetectTwilioOptions());
        return await run.ExecuteAsync(ct);
    }
}

internal sealed class DetectTwilioRun : IDisposable
{
    private const string KeysPath = "/register/public/detection-keys";

    private readonly Config _config;
    private readonly DetectTwilioSettings _s;
    private readonly TextWriter _out;
    private readonly TextWriter _err;
    private readonly DetectTwilioOptions _options;
    private readonly CallEvents _events = new(Guid.NewGuid().ToString());
    private readonly TwilioClient _twilio;
    private readonly Stopwatch _clock = new();

    private DcClient? _dc;
    private string? _temporaryKeyId;
    private DetectionReceiver? _receiver;
    private string? _callSid;

    // What happened to the call. Only the recipe's loop touches these, one event at a time.
    private bool _acted;
    private bool _hungUp;
    private bool _callOver;
    private string? _outcome;
    private TimeSpan? _beepDue;
    private DetectionEvent? _lastVerdict;
    private DetectionEvent? _beep;
    private long? _latencyMs;
    private string? _lastStatus;
    private string? _duration;

    public DetectTwilioRun(Config config, DetectTwilioSettings settings, TextWriter output, TextWriter error, DetectTwilioOptions options)
    {
        _config = config;
        _s = settings;
        _out = output;
        _err = error;
        _options = options;
        _twilio = new TwilioClient(settings.TwilioBaseUrl, settings.AccountSid, settings.AuthToken, options.RetryBaseDelay);
    }

    private string CallPath => $"{_twilio.AccountPath}/Calls/{_callSid}.json";

    public async Task<int> ExecuteAsync(CancellationToken ct)
    {
        _out.WriteLine($"call_id: {_events.CallId}");
        bool cleanedUp;
        try
        {
            var key = await ResolveDetectionKeyAsync(ct);
            await PreflightTwilioAsync(ct);
            await StartReceiverAsync(key, ct);
            await CheckTunnelAsync(ct);
            await CreateCallAsync(ct);
            await FollowCallAsync(ct);
            PrintSummary();
        }
        finally
        {
            cleanedUp = await CleanUpAsync();
        }

        // An error or Ctrl-C has already left with its own exit code by this point.
        if (!cleanedUp)
        {
            _err.WriteLine("A cleanup step failed (see above), so the run exits 1.");
            return 1;
        }

        return 0;
    }

    public void Dispose()
    {
        _twilio.Dispose();
        _dc?.Dispose();
    }

    // Step 3. Use DC_DETECTION_KEY, or create a temporary key that the cleanup deletes.
    private async Task<string> ResolveDetectionKeyAsync(CancellationToken ct)
    {
        if (_s.DetectionKey is { } configured)
        {
            _out.WriteLine($"Detection key: DC_DETECTION_KEY (ends {Redact.Tail(configured)}).");
            return configured;
        }

        _dc = DcClient.FromConfig(_config);

        // Leftovers from a run that was killed before its cleanup.
        var existing = await _dc.GetAsync(KeysPath, ct);
        foreach (var item in Json.Items(existing, "data"))
        {
            if (Json.String(item, "name") == DetectTwilio.TemporaryKeyName && Json.String(item, "key_id") is { } leftover)
            {
                await _dc.DeleteAsync($"{KeysPath}/{Uri.EscapeDataString(leftover)}", ct);
                _out.WriteLine($"Deleted a leftover temporary Detection key: key_id={Redact.Safe(leftover, 60)}");
            }
        }

        JsonNode? created;
        try
        {
            var body = new JsonObject
            {
                ["name"] = DetectTwilio.TemporaryKeyName,
                ["expires_in_seconds"] = DetectTwilio.TemporaryKeySeconds
            };
            created = await _dc.PostAsync(KeysPath, body, ct);
        }
        catch (DcError ex) when (ex.Status == 403)
        {
            throw new RecipeException(DescribeKeyRefusal(ex));
        }

        _temporaryKeyId = Json.String(created, "data", "key_id");
        var apiKey = Json.String(created, "data", "api_key");
        if (_temporaryKeyId is null || apiKey is null)
        {
            throw new RecipeException("The API answered the key request without a key_id or api_key.");
        }

        _out.WriteLine($"Temporary Detection key created: key_id={Redact.Safe(_temporaryKeyId, 60)} (ends {Redact.Tail(apiKey)}). It is deleted at the end of the run.");
        return apiKey;
    }

    private static string DescribeKeyRefusal(DcError ex)
    {
        var lines = new List<string>(ex.Report());
        var detailsCode = Json.String(ex.Body, "details", "code");
        if (detailsCode is not null && detailsCode != ex.Code)
        {
            lines.Add($"  details.code: {Redact.Safe(detailsCode, 60)}");
        }

        var code = detailsCode ?? LastSegment(Json.String(ex.Body, "type")) ?? ex.Code;
        if (code is not null && DetectTwilio.KeyRefusalHints.TryGetValue(code, out var hint))
        {
            lines.Add("What to do: " + hint);
        }

        return string.Join(Environment.NewLine, lines);
    }

    private static string? LastSegment(string? type)
    {
        return type is null ? null : type[(type.LastIndexOf('/') + 1)..];
    }

    // Step 4. A trial account would play its notice into Detection, and the caller ID
    // must belong to the account.
    private async Task PreflightTwilioAsync(CancellationToken ct)
    {
        var account = await _twilio.GetAsync(_twilio.AccountPath + ".json", ct);
        var type = Json.String(account, "type");
        var status = Json.String(account, "status");
        if (string.Equals(type, "Trial", StringComparison.OrdinalIgnoreCase))
        {
            throw new RecipeException(DetectTwilio.TrialMessage);
        }

        if (status != "active")
        {
            throw new RecipeException($"The Twilio account status is {Redact.Safe(status ?? "(none)", 40)}, not active, so it cannot place calls.");
        }

        _out.WriteLine($"Twilio account {Redact.Tail(_s.AccountSid)}: {Redact.Safe(type ?? "(no type)", 40)}, active.");

        var phone = Uri.EscapeDataString(_s.From);
        var incoming = await _twilio.GetAsync($"{_twilio.AccountPath}/IncomingPhoneNumbers.json?PhoneNumber={phone}", ct);
        if (Json.Items(incoming, "incoming_phone_numbers").Any())
        {
            _out.WriteLine("TWILIO_FROM is a number in this Twilio account.");
            return;
        }

        var verified = await _twilio.GetAsync($"{_twilio.AccountPath}/OutgoingCallerIds.json?PhoneNumber={phone}", ct);
        if (Json.Items(verified, "outgoing_caller_ids").Any())
        {
            _out.WriteLine("TWILIO_FROM is a verified caller ID on this Twilio account.");
            return;
        }

        throw new RecipeException(DetectTwilio.NotOnAccountMessage);
    }

    private async Task StartReceiverAsync(string detectionKey, CancellationToken ct)
    {
        var stream = new DetectionStream(
            _s.DetectionUrl,
            detectionKey,
            _s.PublicUrl + DetectionReceiver.DetectionPath,
            _s.Strategy,
            _events.CallId,
            _s.DetectionTimeoutSec,
            _s.BeepWaitSeconds);
        var options = new DetectionReceiverOptions(
            _s.Port, _s.PublicUrl, _s.AuthToken, detectionKey, Twiml.StartDetection(stream), _events, _out);
        _receiver = await DetectionReceiver.StartAsync(options, ct);
        _out.WriteLine($"Receiver listening on port {_receiver.Port}.");
    }

    // Step 5. Twilio and Detection reach the receiver only through the tunnel.
    private async Task CheckTunnelAsync(CancellationToken ct)
    {
        var shown = _s.PublicUrl + "/health";
        using var http = new HttpClient { Timeout = TimeSpan.FromSeconds(10) };
        int? status = null;
        JsonNode? body = null;
        string? failure = null;
        try
        {
            using var response = await http.GetAsync(_options.HealthCheckUrl ?? shown, ct);
            status = (int)response.StatusCode;
            body = Json.Parse(await response.Content.ReadAsStringAsync(ct));
        }
        catch (HttpRequestException ex)
        {
            failure = $"could not connect ({ex.HttpRequestError})";
        }
        catch (TaskCanceledException) when (!ct.IsCancellationRequested)
        {
            failure = "got no answer within 10 seconds";
        }

        if (status == 200 && Json.Bool(body, "ok") == true)
        {
            _out.WriteLine("The tunnel reaches this receiver.");
            return;
        }

        failure ??= status == 200 ? "answered 200 without {\"ok\": true}" : $"answered {status}";
        throw new RecipeException(
            $"The tunnel does not reach this receiver: GET {shown} {failure}. Start the tunnel, point it at port {_s.Port}, "
            + "and set DC_PUBLIC_URL to its https:// address.");
    }

    // Step 6. Never retried, and no MachineDetection: Detection does that job.
    private async Task CreateCallAsync(CancellationToken ct)
    {
        var form = new List<KeyValuePair<string, string>>
        {
            new("To", _s.To),
            new("From", _s.From),
            new("Url", _s.PublicUrl + DetectionReceiver.VoicePath),
            new("Method", "POST"),
            new("StatusCallback", _s.PublicUrl + DetectionReceiver.StatusPath),
            new("StatusCallbackMethod", "POST"),
            new("StatusCallbackEvent", "initiated"),
            new("StatusCallbackEvent", "ringing"),
            new("StatusCallbackEvent", "answered"),
            new("StatusCallbackEvent", "completed"),
            new("Timeout", _s.RingSeconds.ToString(CultureInfo.InvariantCulture))
        };

        _clock.Start();
        var created = await _twilio.PostFormAsync($"{_twilio.AccountPath}/Calls.json", form, ct);
        var sid = Json.String(created, "sid") ?? throw new RecipeException("Twilio answered the call request without a sid.");
        _callSid = sid;
        _events.CallSid = sid;
        _out.WriteLine($"Calling {_s.To} from {_s.From}. CallSid: {Redact.Safe(sid, 60)}");
    }

    // Steps 7 to 9: act on what the receiver records, at most once, then wait for the end.
    private async Task FollowCallAsync(CancellationToken ct)
    {
        var wait = _options.Wait ?? TimeSpan.FromSeconds(_s.WaitSeconds);
        var index = 0;
        while (true)
        {
            var (items, changed) = _events.Since(index);
            index += items.Count;
            foreach (var item in items)
            {
                if (item is DetectionEvent detection && !detection.Ignored)
                {
                    await OnDetectionAsync(detection, ct);
                }
                else if (item is TwilioStatusEvent status && status.CallSid == _callSid)
                {
                    OnStatus(status);
                }

                if (_callOver)
                {
                    return;
                }
            }

            if (!_acted && _beepDue is { } due && _clock.Elapsed >= due)
            {
                _out.WriteLine($"No beep within {_s.BeepWaitSeconds} seconds of the voicemail verdict. Playing the voicemail message anyway.");
                await ActAsync(_s.Voicemail, "voicemail_no_beep", Stopwatch.GetTimestamp(), "the beep timer ran out", ct);
                continue;
            }

            var remaining = wait - _clock.Elapsed;
            if (remaining <= TimeSpan.Zero)
            {
                await OnWaitOverAsync(wait, ct);
                return;
            }

            var nap = remaining;
            if (!_acted && _beepDue is { } next && next - _clock.Elapsed < nap)
            {
                nap = next - _clock.Elapsed;
            }

            try
            {
                await changed.WaitAsync(nap < TimeSpan.Zero ? TimeSpan.Zero : nap, ct);
            }
            catch (TimeoutException)
            {
                // Time to check the beep timer or the overall wait.
            }
        }
    }

    private async Task OnDetectionAsync(DetectionEvent e, CancellationToken ct)
    {
        var data = e.Data;
        if (e.Name == "detection")
        {
            _lastVerdict = e;
        }

        if (e.Name == "beep")
        {
            _beep ??= e;
        }

        if (_acted)
        {
            _out.WriteLine(e.Name == "close"
                ? $"Detection closed the stream (reason={Field(data, "reason") ?? "(none)"})."
                : $"Detection event {Redact.Safe(e.Name, 40)} after the action: nothing more to do.");
            return;
        }

        switch (e.Name)
        {
            case "beep":
                _out.WriteLine($"Beep at {Field(data, "timestamp_ms") ?? "?"} ms (duration {Field(data, "duration_ms") ?? "?"} ms). Playing the voicemail message.");
                await ActAsync(_s.Voicemail, "voicemail_on_beep", e.RecordedAt, "the beep", ct);
                break;
            case "detection":
                await OnVerdictAsync(e, data, ct);
                break;
            case "timeout":
                _out.WriteLine($"Detection gave no verdict within {_s.DetectionTimeoutSec} seconds. Hanging up.");
                await ActAsync(null, "no_answer_detected", e.RecordedAt, "the timeout", ct);
                break;
            case "error" when Json.Bool(data, "recoverable") != true:
                _out.WriteLine($"Detection error: code={Field(data, "code") ?? "(none)"} error={Field(data, "error") ?? "(none)"}. Not marked recoverable, so hanging up.");
                await ActAsync(null, "detection_error", e.RecordedAt, "the error", ct);
                break;
            case "error":
                _out.WriteLine($"Detection error: code={Field(data, "code") ?? "(none)"} error={Field(data, "error") ?? "(none)"}. Recoverable, so no action.");
                break;
            case "screening":
                _out.WriteLine($"Call screener: screening_type={Field(data, "screening_type") ?? "(none)"} "
                    + $"suggested_action={Field(data, "suggested_action") ?? "(none)"} suggested_dtmf={Field(data, "suggested_dtmf") ?? "(none)"}. No action.");
                break;
            case "close":
                _out.WriteLine($"Detection closed the stream (reason={Field(data, "reason") ?? "(none)"}) before any action. Still waiting for Twilio's call status.");
                break;
            default:
                _out.WriteLine($"Detection event {Redact.Safe(e.Name, 40)}: no action.");
                break;
        }
    }

    private async Task OnVerdictAsync(DetectionEvent e, JsonNode? data, CancellationToken ct)
    {
        var type = Json.String(data, "type");
        var confidence = Json.Double(data, "confidence");
        var shown = $"{Redact.Safe(type ?? "(none)", 40)} (confidence {Format(confidence)})";
        var livePerson = type is not null && type.StartsWith(DetectTwilio.LivePersonPrefix, StringComparison.Ordinal);
        switch (type)
        {
            case not null when livePerson && confidence >= _s.LiveConfidence:
                _out.WriteLine($"Verdict: {shown}. Playing the live message.");
                await ActAsync(_s.Live ?? _s.Voicemail, "live_person", e.RecordedAt, "the live person verdict", ct);
                break;
            case not null when livePerson:
                _out.WriteLine($"Verdict: {shown}, below DC_LIVE_CONFIDENCE {Format(_s.LiveConfidence)}. Logged, not acted on.");
                break;
            case "speech.voicemail.greeting" when _beepDue is null:
                _beepDue = _clock.Elapsed + TimeSpan.FromSeconds(_s.BeepWaitSeconds);
                _out.WriteLine($"Verdict: {shown}. Waiting up to {_s.BeepWaitSeconds} seconds for the beep.");
                break;
            case "speech.voicemail.greeting":
                _out.WriteLine($"Verdict: {shown}. Still waiting for the beep.");
                break;
            case "speech.voicemail.full" or "speech.voicemail.not_setup":
                _out.WriteLine($"The mailbox cannot take a message ({type}), so the call is hung up.");
                await ActAsync(null, "voicemail_unavailable", e.RecordedAt, "the mailbox verdict", ct);
                break;
            case "speech.silence":
                _out.WriteLine($"Verdict: {shown}. Hanging up.");
                await ActAsync(null, "no_answer_detected", e.RecordedAt, "the silence verdict", ct);
                break;
            default:
                _out.WriteLine($"Verdict: {shown}. No action.");
                break;
        }
    }

    private void OnStatus(TwilioStatusEvent status)
    {
        _lastStatus = status.Status;
        _duration = status.Duration ?? _duration;
        if (!DetectTwilio.IsTerminal(status.Status))
        {
            return;
        }

        _callOver = true;
        if (_acted)
        {
            _out.WriteLine($"The call ended: CallStatus={Redact.Safe(status.Status, 40)}.");
        }
        else if (status.Status == "completed")
        {
            _outcome = "ended_before_action";
            _out.WriteLine("The call ended before Detection reported anything to act on.");
        }
        else
        {
            _outcome = "not_answered";
            _out.WriteLine($"The call was not answered (CallStatus={Redact.Safe(status.Status, 40)}). Nothing to redirect.");
        }
    }

    // One update to the live call: play or speak a message, or hang up (message null).
    private async Task ActAsync(VoiceMessage? message, string outcome, long triggeredAt, string trigger, CancellationToken ct)
    {
        _acted = true;
        _outcome = outcome;
        var form = message is null
            ? new[] { new KeyValuePair<string, string>("Status", "completed") }
            : new[] { new KeyValuePair<string, string>("Twiml", Twiml.PlayMessage(message)) };
        try
        {
            await _twilio.PostFormAsync(CallPath, form, ct);
            _latencyMs = (long)Stopwatch.GetElapsedTime(triggeredAt).TotalMilliseconds;
            _hungUp = message is null;
            _out.WriteLine($"Twilio accepted the update {_latencyMs} ms after {trigger} was recorded.");
        }
        catch (TwilioError ex) when (ex.CallAlreadyEnded)
        {
            _callOver = true;
            _out.WriteLine($"The call had already ended ({ex.Message}). Going on to the summary.");
        }
    }

    private async Task OnWaitOverAsync(TimeSpan wait, CancellationToken ct)
    {
        if (_acted)
        {
            _out.WriteLine($"Twilio sent no final call status within {wait.TotalSeconds:0} seconds.");
            return;
        }

        _outcome = "no_result";
        _out.WriteLine(DetectTwilio.NoResultMessage);
        var counts = _events.Counts;
        if (counts.Received - counts.Ignored == 0)
        {
            _out.WriteLine(DetectTwilio.NoWebhookMessage);
        }

        await HangUpAsync(ct);
    }

    private async Task HangUpAsync(CancellationToken ct)
    {
        try
        {
            await _twilio.PostFormAsync(CallPath, [new KeyValuePair<string, string>("Status", "completed")], ct);
            _hungUp = true;
            _out.WriteLine("Hung up the call.");
        }
        catch (TwilioError ex) when (ex.CallAlreadyEnded)
        {
            _callOver = true;
            _out.WriteLine($"The call had already ended ({ex.Message}).");
        }
    }

    private void PrintSummary()
    {
        var counts = _events.Counts;
        var verdictData = _lastVerdict?.Data;
        var beepData = _beep?.Data;
        _out.WriteLine("Summary:");
        _out.WriteLine($"  outcome:            {_outcome ?? "no_result"}"
            + (_outcome == "not_answered" ? $" ({Redact.Safe(_lastStatus, 40)})" : string.Empty));
        _out.WriteLine(_lastVerdict is null
            ? "  last verdict:       (none)"
            : $"  last verdict:       {Redact.Safe(Json.String(verdictData, "type") ?? "(none)", 40)}, confidence {Format(Json.Double(verdictData, "confidence"))}");
        _out.WriteLine(_beep is null
            ? "  beep:               (none)"
            : $"  beep:               timestamp_ms={Field(beepData, "timestamp_ms") ?? "?"} duration_ms={Field(beepData, "duration_ms") ?? "?"}");
        _out.WriteLine($"  update latency:     {(_latencyMs is null ? "(none)" : $"{_latencyMs} ms")}");
        _out.WriteLine($"  CallStatus:         {Redact.Safe(_lastStatus ?? "(none)", 40)}");
        _out.WriteLine($"  CallDuration:       {Redact.Safe(_duration ?? "(none)", 20)}");
        _out.WriteLine($"  CallSid:            {Redact.Safe(_callSid, 60)}");
        _out.WriteLine($"  call_id:            {_events.CallId}");
        _out.WriteLine($"  Detection webhooks: {counts.Received} received, {counts.Duplicates} duplicates, {counts.Ignored} ignored");
    }

    // Step 11. Runs on success, on any error and on Ctrl-C. Each step runs even when an
    // earlier one failed, and they use no cancellation token: Ctrl-C has already fired.
    // Returns false when any step failed.
    private async Task<bool> CleanUpAsync()
    {
        var ok = true;
        if (_callSid is not null && !_callOver && !_hungUp)
        {
            try
            {
                await HangUpAsync(CancellationToken.None);
            }
            catch (Exception ex)
            {
                ok = false;
                _err.WriteLine($"Could not hang up the call: {Describe(ex)} Hang it up in the Twilio Console.");
            }
        }

        if (_temporaryKeyId is not null && _dc is not null)
        {
            try
            {
                await _dc.DeleteAsync($"{KeysPath}/{Uri.EscapeDataString(_temporaryKeyId)}", CancellationToken.None);
                _out.WriteLine("Temporary Detection key deleted.");
            }
            catch (Exception ex)
            {
                ok = false;
                _err.WriteLine($"Could not delete the temporary Detection key {Redact.Safe(_temporaryKeyId, 60)}: {Describe(ex)} "
                    + "Delete it in the dashboard. It expires within an hour anyway.");
            }
        }

        if (_receiver is not null)
        {
            try
            {
                await _receiver.DisposeAsync();
            }
            catch (Exception ex)
            {
                ok = false;
                _err.WriteLine($"Could not stop the receiver: {Describe(ex)}");
            }
        }

        return ok;
    }

    private static string Describe(Exception ex) => Redact.Safe(ex.Message, 300);

    // A field of an event payload, printable whatever its JSON type.
    private static string? Field(JsonNode? data, string name)
    {
        var node = Json.Get(data, name);
        if (node is null)
        {
            return null;
        }

        return Redact.Safe(node is JsonValue value && value.TryGetValue<string>(out var text) ? text : node.ToJsonString(), 120);
    }

    private static string Format(double? number)
    {
        return number is { } value ? value.ToString("0.###", CultureInfo.InvariantCulture) : "(none)";
    }
}
