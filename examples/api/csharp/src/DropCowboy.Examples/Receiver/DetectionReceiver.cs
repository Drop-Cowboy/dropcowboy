using System.Diagnostics;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Receiver;

public sealed record DetectionReceiverOptions(
    int Port,
    string PublicUrl,
    string TwilioAuthToken,
    string DetectionKey,
    string StartTwiml,
    CallEvents Events,
    TextWriter Log,
    TimeProvider? Time = null);

/// <summary>
/// The detect-twilio receiver. Four routes: the TwiML Twilio asks for when the call is
/// answered, Twilio's status callbacks, Detection's signed webhooks, and a health check.
/// The handlers verify, record and answer. They never call Twilio or Drop Cowboy; the
/// recipe acts on what they recorded.
/// </summary>
public sealed class DetectionReceiver : IAsyncDisposable
{
    public const string VoicePath = "/twilio/voice";
    public const string StatusPath = "/twilio/status";
    public const string DetectionPath = "/webhooks/detection";

    private const int MaxBodyBytes = 1024 * 1024;

    private readonly WebApplication _app;

    private DetectionReceiver(WebApplication app)
    {
        _app = app;
        Port = new Uri(app.Urls.First()).Port;
    }

    public int Port { get; }

    /// <summary>Builds the app, starts it and returns it. Port 0 picks a free port.</summary>
    public static async Task<DetectionReceiver> StartAsync(DetectionReceiverOptions options, CancellationToken ct)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions());
        builder.Logging.SetMinimumLevel(LogLevel.Warning);
        builder.WebHost.UseUrls(options.Port == 0 ? "http://127.0.0.1:0" : $"http://localhost:{options.Port}");
        builder.WebHost.ConfigureKestrel(kestrel => kestrel.Limits.MaxRequestBodySize = MaxBodyBytes);

        var app = builder.Build();
        var routes = new DetectionRoutes(options);
        app.MapGet("/health", () => Results.Json(new JsonObject { ["ok"] = true }));
        app.MapPost(VoicePath, routes.HandleVoiceAsync);
        app.MapPost(StatusPath, routes.HandleStatusAsync);
        app.MapPost(DetectionPath, routes.HandleDetectionAsync);

        try
        {
            await app.StartAsync(ct);
        }
        catch (IOException ex)
        {
            await app.DisposeAsync();
            throw new RecipeException($"Could not listen on port {options.Port}: {ex.Message} Set PORT to a free port.");
        }

        return new DetectionReceiver(app);
    }

    public async ValueTask DisposeAsync()
    {
        await _app.StopAsync();
        await _app.DisposeAsync();
    }
}

internal sealed class DetectionRoutes(DetectionReceiverOptions options)
{
    private readonly TimeProvider _time = options.Time ?? TimeProvider.System;

    /// <summary>POST /twilio/voice: Twilio asks for the call's TwiML when the call is answered.</summary>
    public async Task<IResult> HandleVoiceAsync(HttpRequest request, CancellationToken ct)
    {
        var form = await ReadFormAsync(request, ct);
        if (!SignedByTwilio(request, DetectionReceiver.VoicePath, form))
        {
            options.Log.WriteLine("[twilio voice] refused: missing or wrong X-Twilio-Signature");
            return Results.StatusCode(403);
        }

        if (!options.Events.IsThisCall(Value(form, "CallSid")))
        {
            options.Log.WriteLine("[twilio voice] refused: not the call this run created");
            return Results.StatusCode(403);
        }

        options.Log.WriteLine("[twilio voice] call answered; sent the TwiML that starts Detection");
        return Results.Content(options.StartTwiml, "text/xml");
    }

    /// <summary>POST /twilio/status: Twilio's status callback for the call.</summary>
    public async Task<IResult> HandleStatusAsync(HttpRequest request, CancellationToken ct)
    {
        var form = await ReadFormAsync(request, ct);
        if (!SignedByTwilio(request, DetectionReceiver.StatusPath, form))
        {
            options.Log.WriteLine("[twilio status] refused: missing or wrong X-Twilio-Signature");
            return Results.StatusCode(403);
        }

        var callSid = Value(form, "CallSid");
        var status = Value(form, "CallStatus");
        if (callSid is null || status is null)
        {
            return Results.Ok();
        }

        // A status can arrive before Twilio's answer to the create request reaches the
        // recipe, so record every signed status with its CallSid. The recipe reads only its own.
        var duration = Value(form, "CallDuration");
        options.Log.WriteLine($"[twilio status] CallStatus={Redact.Safe(status, 40)}"
            + (duration is null ? string.Empty : $" CallDuration={Redact.Safe(duration, 20)}"));
        options.Events.Add(new TwilioStatusEvent(callSid, status, duration, Stopwatch.GetTimestamp()));
        return Results.Ok();
    }

    /// <summary>POST /webhooks/detection: a signed Detection event.</summary>
    public async Task<IResult> HandleDetectionAsync(HttpRequest request, CancellationToken ct)
    {
        // The signature covers exactly these bytes, so read them before parsing anything.
        var raw = await ReadBodyAsync(request, ct);
        var verdict = DetectionSignature.Verify(
            raw,
            Header(request, "X-Signature"),
            Header(request, "X-Timestamp"),
            options.DetectionKey,
            _time.GetUtcNow().ToUnixTimeMilliseconds());
        if (verdict != SignatureResult.Valid)
        {
            return Reply(401, new JsonObject { ["error"] = SignatureVerifier.ErrorCode(verdict) });
        }

        var body = Json.ParseObject(raw);
        if (body is null)
        {
            return Reply(400, new JsonObject { ["error"] = "body_must_be_a_json_object" });
        }

        var deliveryId = Json.String(body, "delivery_id") ?? Header(request, "X-Delivery-Id");
        if (deliveryId is not null && !options.Events.FirstDelivery(deliveryId))
        {
            options.Log.WriteLine($"[detection webhook] duplicate delivery_id={Redact.Safe(deliveryId, 60)}, already handled");
            return Reply(200, new JsonObject { ["received"] = true, ["duplicate"] = true });
        }

        var name = Json.String(body, "event") ?? "unknown";
        var callId = Json.String(body, "call_id");
        var ignored = callId != options.Events.CallId;
        options.Log.WriteLine($"[detection webhook] event={Redact.Safe(name, 40)}"
            + (ignored ? $" call_id={Redact.Safe(callId ?? "(none)", 60)} is not this run's call: ignored" : string.Empty));
        options.Events.Add(new DetectionEvent(name, deliveryId, callId, ignored, body, Stopwatch.GetTimestamp()));
        return Reply(200, new JsonObject { ["received"] = true });
    }

    // Twilio signs the URL it called. Behind a tunnel that is DC_PUBLIC_URL, not the Host header.
    private bool SignedByTwilio(HttpRequest request, string path, IReadOnlyList<KeyValuePair<string, string>> form)
    {
        return TwilioSignature.Verify(options.TwilioAuthToken, options.PublicUrl + path, form, Header(request, TwilioSignature.Header));
    }

    private static async Task<IReadOnlyList<KeyValuePair<string, string>>> ReadFormAsync(HttpRequest request, CancellationToken ct)
    {
        var fields = new List<KeyValuePair<string, string>>();
        if (!request.HasFormContentType)
        {
            return fields;
        }

        var form = await request.ReadFormAsync(ct);
        foreach (var (name, values) in form)
        {
            foreach (var value in values)
            {
                fields.Add(new KeyValuePair<string, string>(name, value ?? string.Empty));
            }
        }

        return fields;
    }

    private static string? Value(IReadOnlyList<KeyValuePair<string, string>> form, string name)
    {
        foreach (var (key, value) in form)
        {
            if (key == name && value.Length > 0)
            {
                return value;
            }
        }

        return null;
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
}
