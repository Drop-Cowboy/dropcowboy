using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;

namespace DropCowboy.Examples.Tests;

public sealed class FixedMilliseconds(long unixMs) : TimeProvider
{
    public override DateTimeOffset GetUtcNow() => DateTimeOffset.FromUnixTimeMilliseconds(unixMs);
}

/// <summary>The detect-twilio receiver's four routes, over real HTTP on an ephemeral port.</summary>
public sealed class DetectTwilioReceiverTests : IAsyncLifetime
{
    private const string StartTwiml = "<Response><Pause length=\"1\"/></Response>";

    private static readonly JsonNode Vector = DetectTwilioScenario.DetectionVector();
    private static readonly string Key = Vector["detection_key"]!.GetValue<string>();
    private static readonly string Timestamp = Vector["timestamp_ms"]!.GetValue<string>();
    private static readonly long NowValid = Vector["now_ms_valid"]!.GetValue<long>();
    private static readonly string RawBody = Vector["raw_body"]!.GetValue<string>();
    private static readonly string Signature = Vector["signature"]!.GetValue<string>();

    // The vector's body carries this call_id, so these tests make it the run's own.
    private static readonly string VectorCallId = JsonNode.Parse(RawBody)!["call_id"]!.GetValue<string>();

    private readonly HttpClient _http = new() { Timeout = TimeSpan.FromSeconds(10) };
    private readonly StringWriter _log = new();
    private CallEvents _events = null!;
    private DetectionReceiver _receiver = null!;
    private string _url = string.Empty;

    public async Task InitializeAsync()
    {
        _events = new CallEvents(VectorCallId) { CallSid = DetectTwilioScenario.CallSid };
        var options = new DetectionReceiverOptions(
            0, DetectTwilioScenario.PublicUrl, DetectTwilioScenario.AuthToken, Key, StartTwiml, _events,
            TextWriter.Synchronized(_log), new FixedMilliseconds(NowValid));
        _receiver = await DetectionReceiver.StartAsync(options, CancellationToken.None);
        _url = $"http://127.0.0.1:{_receiver.Port}";
    }

    public async Task DisposeAsync()
    {
        _http.Dispose();
        await _receiver.DisposeAsync();
    }

    [Fact]
    public async Task HealthAnswersOk()
    {
        using var response = await _http.GetAsync(_url + "/health");

        Assert.Equal(200, (int)response.StatusCode);
        Assert.Equal("""{"ok":true}""", await response.Content.ReadAsStringAsync());
    }

    // ---- /twilio/voice -----------------------------------------------------------------

    [Fact]
    public async Task VoiceAnswersTheTwimlAsXml()
    {
        using var response = await PostTwilioAsync(DetectionReceiver.VoicePath, CallSim.VoiceParams());

        Assert.Equal(200, (int)response.StatusCode);
        Assert.Equal("text/xml", response.Content.Headers.ContentType?.MediaType);
        Assert.Equal(StartTwiml, await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task VoiceRefusesAWrongSignatureWithAnEmptyBody()
    {
        var fields = CallSim.VoiceParams();
        using var response = await PostTwilioAsync(DetectionReceiver.VoicePath, fields, token: "test-twilio-auth-token-not-real-0043");

        Assert.Equal(403, (int)response.StatusCode);
        Assert.Equal(string.Empty, await response.Content.ReadAsStringAsync());
        Assert.Empty(_events.Since(0).Items);
    }

    [Fact]
    public async Task VoiceRefusesAMissingSignature()
    {
        using var response = await PostTwilioAsync(DetectionReceiver.VoicePath, CallSim.VoiceParams(), signature: string.Empty);

        Assert.Equal(403, (int)response.StatusCode);
        Assert.Equal(string.Empty, await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task VoiceChecksTheSignatureAgainstThePublicUrlNotTheHost()
    {
        var fields = CallSim.VoiceParams();
        var signedForHost = TwilioSignature.Compute(DetectTwilioScenario.AuthToken, _url + DetectionReceiver.VoicePath, fields);
        using var response = await PostTwilioAsync(DetectionReceiver.VoicePath, fields, signature: signedForHost);

        Assert.Equal(403, (int)response.StatusCode);
    }

    [Fact]
    public async Task VoiceRefusesAnotherCallSid()
    {
        using var response = await PostTwilioAsync(DetectionReceiver.VoicePath, CallSim.VoiceParams("CA00000000000000000000000000000002"));

        Assert.Equal(403, (int)response.StatusCode);
        Assert.Equal(string.Empty, await response.Content.ReadAsStringAsync());
    }

    // ---- /twilio/status ----------------------------------------------------------------

    [Fact]
    public async Task StatusRecordsTheCallStatusAndDuration()
    {
        using var response = await PostTwilioAsync(DetectionReceiver.StatusPath, CallSim.StatusParams("completed", "21"));

        Assert.Equal(200, (int)response.StatusCode);
        Assert.Equal(string.Empty, await response.Content.ReadAsStringAsync());
        var recorded = Assert.IsType<TwilioStatusEvent>(Assert.Single(_events.Since(0).Items));
        Assert.Equal(DetectTwilioScenario.CallSid, recorded.CallSid);
        Assert.Equal("completed", recorded.Status);
        Assert.Equal("21", recorded.Duration);
    }

    [Fact]
    public async Task StatusForAnotherCallSidIsAnswered200()
    {
        using var response = await PostTwilioAsync(
            DetectionReceiver.StatusPath, CallSim.StatusParams("busy", null, "CA00000000000000000000000000000002"));

        Assert.Equal(200, (int)response.StatusCode);
        Assert.Equal(string.Empty, await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task StatusRefusesATamperedBody()
    {
        var signed = CallSim.StatusParams("completed", "21");
        var signature = TwilioSignature.Compute(DetectTwilioScenario.AuthToken, DetectTwilioScenario.PublicUrl + DetectionReceiver.StatusPath, signed);
        using var response = await PostTwilioAsync(DetectionReceiver.StatusPath, CallSim.StatusParams("busy", "21"), signature: signature);

        Assert.Equal(403, (int)response.StatusCode);
        Assert.Empty(_events.Since(0).Items);
    }

    // ---- /webhooks/detection -----------------------------------------------------------

    [Fact]
    public async Task DetectionAcceptsTheVectorThenFlagsTheRepeatAsDuplicate()
    {
        using var first = await PostDetectionAsync(RawBody, Signature, Timestamp);
        using var second = await PostDetectionAsync(RawBody, Signature, Timestamp);

        Assert.Equal(200, (int)first.StatusCode);
        Assert.Equal("""{"received":true}""", await first.Content.ReadAsStringAsync());
        Assert.Equal(200, (int)second.StatusCode);
        Assert.Equal("""{"received":true,"duplicate":true}""", await second.Content.ReadAsStringAsync());

        var recorded = Assert.IsType<DetectionEvent>(Assert.Single(_events.Since(0).Items));
        Assert.Equal("beep", recorded.Name);
        Assert.False(recorded.Ignored);
        Assert.Equal(new CallEventCounts(1, 1, 0), _events.Counts);
    }

    [Fact]
    public async Task DetectionMissingSignatureOrTimestampIsMissingSignature()
    {
        using var noSignature = await PostDetectionAsync(RawBody, null, Timestamp);
        using var noTimestamp = await PostDetectionAsync(RawBody, Signature, null);

        await AssertError(noSignature, 401, "missing_signature");
        await AssertError(noTimestamp, 401, "missing_signature");
    }

    [Fact]
    public async Task DetectionStaleOrNonNumericTimestampIsStale()
    {
        var stale = (NowValid - DetectionSignature.ToleranceMs - 1).ToString(System.Globalization.CultureInfo.InvariantCulture);
        using var old = await PostDetectionAsync(RawBody, DetectionSignature.Sign(Key, stale, Encoding.UTF8.GetBytes(RawBody)), stale);
        using var words = await PostDetectionAsync(RawBody, Signature, "soon");

        await AssertError(old, 401, "stale_timestamp");
        await AssertError(words, 401, "stale_timestamp");
    }

    [Fact]
    public async Task DetectionBadSignaturesAreInvalid()
    {
        using var tampered = await PostDetectionAsync(Vector["tampered_raw_body"]!.GetValue<string>(), Signature, Timestamp);
        using var otherKey = await PostDetectionAsync(RawBody, Vector["signature_from_other_key"]!.GetValue<string>(), Timestamp);
        using var noScheme = await PostDetectionAsync(RawBody, Signature["v1=hmac-sha256,".Length..], Timestamp);

        await AssertError(tampered, 401, "invalid_signature");
        await AssertError(otherKey, 401, "invalid_signature");
        await AssertError(noScheme, 401, "invalid_signature");
        Assert.Empty(_events.Since(0).Items);
    }

    [Fact]
    public async Task DetectionBodyThatIsNotAnObjectIs400()
    {
        const string raw = "[1,2,3]";
        using var response = await PostDetectionAsync(raw, DetectionSignature.Sign(Key, Timestamp, Encoding.UTF8.GetBytes(raw)), Timestamp);

        Assert.Equal(400, (int)response.StatusCode);
        Assert.Empty(_events.Since(0).Items);
    }

    [Fact]
    public async Task DetectionForAnotherCallIsRecordedAsIgnored()
    {
        var body = JsonNode.Parse(RawBody)!.AsObject();
        body["call_id"] = "7e3b9c1a-2f4d-4a68-b5e9-0c8d2a6f4b13";
        var raw = body.ToJsonString();
        using var response = await PostDetectionAsync(raw, DetectionSignature.Sign(Key, Timestamp, Encoding.UTF8.GetBytes(raw)), Timestamp);

        Assert.Equal(200, (int)response.StatusCode);
        Assert.True(Assert.IsType<DetectionEvent>(Assert.Single(_events.Since(0).Items)).Ignored);
        Assert.Equal(new CallEventCounts(1, 0, 1), _events.Counts);
        Assert.Contains("is not this run's call: ignored", _log.ToString());
    }

    [Fact]
    public async Task DetectionDedupesOnTheDeliveryIdHeaderWhenTheBodyHasNone()
    {
        var body = JsonNode.Parse(RawBody)!.AsObject();
        body.Remove("delivery_id");
        var raw = body.ToJsonString();
        var signature = DetectionSignature.Sign(Key, Timestamp, Encoding.UTF8.GetBytes(raw));
        const string deliveryId = "5c1e8a3f-9b2d-4f7e-a6c4-3d8b1e9f2a70";

        using var first = await PostDetectionAsync(raw, signature, Timestamp, deliveryId);
        using var second = await PostDetectionAsync(raw, signature, Timestamp, deliveryId);

        Assert.Equal("""{"received":true}""", await first.Content.ReadAsStringAsync());
        Assert.Equal("""{"received":true,"duplicate":true}""", await second.Content.ReadAsStringAsync());
        Assert.Equal(deliveryId, Assert.IsType<DetectionEvent>(Assert.Single(_events.Since(0).Items)).DeliveryId);
    }

    private static async Task AssertError(HttpResponseMessage response, int status, string code)
    {
        Assert.Equal(status, (int)response.StatusCode);
        Assert.Equal($$"""{"error":"{{code}}"}""", await response.Content.ReadAsStringAsync());
    }

    private async Task<HttpResponseMessage> PostTwilioAsync(
        string path, List<KeyValuePair<string, string>> fields, string? signature = null, string? token = null)
    {
        using var message = new HttpRequestMessage(HttpMethod.Post, _url + path) { Content = new FormUrlEncodedContent(fields) };
        var header = signature ?? TwilioSignature.Compute(token ?? DetectTwilioScenario.AuthToken, DetectTwilioScenario.PublicUrl + path, fields);
        if (header.Length > 0)
        {
            message.Headers.Add(TwilioSignature.Header, header);
        }

        return await _http.SendAsync(message);
    }

    private async Task<HttpResponseMessage> PostDetectionAsync(string raw, string? signature, string? timestamp, string? deliveryId = null)
    {
        using var message = new HttpRequestMessage(HttpMethod.Post, _url + DetectionReceiver.DetectionPath)
        {
            Content = new StringContent(raw, Encoding.UTF8, "application/json")
        };
        if (signature is not null)
        {
            message.Headers.TryAddWithoutValidation("X-Signature", signature);
        }

        if (timestamp is not null)
        {
            message.Headers.Add("X-Timestamp", timestamp);
        }

        if (deliveryId is not null)
        {
            message.Headers.Add("X-Delivery-Id", deliveryId);
        }

        return await _http.SendAsync(message);
    }
}
