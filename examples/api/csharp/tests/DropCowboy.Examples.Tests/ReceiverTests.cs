using System.Net;
using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;

namespace DropCowboy.Examples.Tests;

/// <summary>A clock that always reads the same second, so signatures stay fresh.</summary>
public sealed class FixedTime(long unixSeconds) : TimeProvider
{
    public override DateTimeOffset GetUtcNow() => DateTimeOffset.FromUnixTimeSeconds(unixSeconds);
}

public sealed class ReceiverTests : IAsyncLifetime
{
    private static readonly SignatureVector V = Fixtures.Vector();

    private readonly StringWriter _log = new();
    private readonly ReceivedEvents _events = new();
    private readonly HttpClient _http = new();
    private WebApplication _app = null!;
    private string _baseUrl = string.Empty;

    public async Task InitializeAsync()
    {
        await StartAsync([V.Secret]);
    }

    public async Task DisposeAsync()
    {
        _http.Dispose();
        await _app.StopAsync();
        await _app.DisposeAsync();
    }

    private async Task StartAsync(IReadOnlyList<string> secrets)
    {
        if (_app is not null)
        {
            await _app.StopAsync();
            await _app.DisposeAsync();
        }

        var options = new ReceiverOptions(0, secrets, _events, TextWriter.Synchronized(_log), new FixedTime(V.NowValid));
        _app = await ReceiverApp.StartReceiver(options, CancellationToken.None);
        _baseUrl = $"http://127.0.0.1:{ReceiverApp.PortOf(_app)}";
    }

    private Task<HttpResponseMessage> PostWebhookAsync(
        string body, string? signature, string? timestamp = null, string? version = null, string? eventId = null)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, _baseUrl + ReceiverApp.WebhookPath)
        {
            Content = new StringContent(body, Encoding.UTF8, "application/json")
        };
        if (signature is not null)
        {
            request.Headers.Add("X-Signature", signature);
        }

        request.Headers.Add("X-Timestamp", timestamp ?? V.Timestamp);
        if (version is not null)
        {
            request.Headers.Add("X-Signature-Version", version);
        }

        if (eventId is not null)
        {
            request.Headers.Add("X-Event-Id", eventId);
        }

        return _http.SendAsync(request);
    }

    private static string Signed(string secret, string body)
    {
        return SignatureVerifier.Sign(secret, V.Timestamp, Encoding.UTF8.GetBytes(body));
    }

    private static async Task<JsonNode?> ReadJsonAsync(HttpResponseMessage response)
    {
        return JsonNode.Parse(await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Webhook_GoodSignature_Answers200AndRecordsTheEvent()
    {
        var response = await PostWebhookAsync(V.RawBody, V.Signature);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await ReadJsonAsync(response);
        Assert.True(body!["received"]!.GetValue<bool>());
        Assert.Null(body["duplicate"]);

        var recorded = Assert.Single(_events.Snapshot());
        Assert.Equal(ResultSource.Webhook, recorded.Source);
        Assert.Equal("contact.rvm.status", recorded.EventName);
        Assert.Equal("+13125550142", recorded.To);
        Assert.Equal("success", recorded.Status);
    }

    [Fact]
    public async Task Webhook_BadSignature_Answers401WithTheCode()
    {
        var response = await PostWebhookAsync(V.TamperedRawBody, V.Signature);

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        Assert.Equal("invalid_signature", (await ReadJsonAsync(response))!["error"]!.GetValue<string>());
        Assert.Empty(_events.Snapshot());
    }

    [Fact]
    public async Task Webhook_MissingSignature_Answers401()
    {
        var response = await PostWebhookAsync(V.RawBody, signature: null);

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        Assert.Equal("missing_signature", (await ReadJsonAsync(response))!["error"]!.GetValue<string>());
    }

    [Fact]
    public async Task Webhook_StaleTimestamp_Answers401()
    {
        var stale = (V.NowValid - 3600).ToString();
        var signature = SignatureVerifier.Sign(V.Secret, stale, Encoding.UTF8.GetBytes(V.RawBody));

        var response = await PostWebhookAsync(V.RawBody, signature, stale);

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        Assert.Equal("stale_timestamp", (await ReadJsonAsync(response))!["error"]!.GetValue<string>());
    }

    [Fact]
    public async Task Webhook_UnsupportedSignatureVersion_Answers401()
    {
        var response = await PostWebhookAsync(V.RawBody, V.Signature, version: "v2");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Webhook_RepeatedEventId_AnswersDuplicateAndRecordsOnce()
    {
        var first = await PostWebhookAsync(V.RawBody, V.Signature);
        var second = await PostWebhookAsync(V.RawBody, V.Signature);

        Assert.Equal(HttpStatusCode.OK, first.StatusCode);
        Assert.Equal(HttpStatusCode.OK, second.StatusCode);
        Assert.True((await ReadJsonAsync(second))!["duplicate"]!.GetValue<bool>());
        Assert.Single(_events.Snapshot());
    }

    [Fact]
    public async Task Webhook_FallsBackToTheEventIdHeader()
    {
        var body = """{"event":"contact.rvm.status","data":{"to":"+13125550142","status":"success"}}""";
        var signature = Signed(V.Secret, body);

        await PostWebhookAsync(body, signature, eventId: "5b0a7d3e-9c14-4f6a-8e21-7d3c9a1b5e40");
        var second = await PostWebhookAsync(body, signature, eventId: "5b0a7d3e-9c14-4f6a-8e21-7d3c9a1b5e40");

        Assert.True((await ReadJsonAsync(second))!["duplicate"]!.GetValue<bool>());
    }

    [Fact]
    public async Task Webhook_NoSecretsConfigured_Answers503()
    {
        await StartAsync([]);

        var response = await PostWebhookAsync(V.RawBody, V.Signature);

        Assert.Equal(HttpStatusCode.ServiceUnavailable, response.StatusCode);
    }

    [Fact]
    public async Task Webhook_SecondConfiguredSecretMatches()
    {
        await StartAsync([V.OtherSecret, V.Secret]);

        var response = await PostWebhookAsync(V.RawBody, V.Signature);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Webhook_SignedNonObjectBody_Answers400()
    {
        var body = "[1,2,3]";

        var response = await PostWebhookAsync(body, Signed(V.Secret, body));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Webhook_UnknownEventType_IsAcceptedAndLoggedByName()
    {
        var body = """{"event_id":"c3a9e7f1-2b4d-4c8a-9e6f-1d5b7a3c9e24","event":"contact.created","data":{}}""";

        var response = await PostWebhookAsync(body, Signed(V.Secret, body));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains("contact.created", _log.ToString());
    }

    [Fact]
    public async Task Webhook_ReceiptEvent_IsRecordedWithItsProofLink()
    {
        var body = Fixtures.Read("webhook.rvm-receipt.json");

        var response = await PostWebhookAsync(body, Signed(V.Secret, body));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var recorded = Assert.Single(_events.Snapshot());
        Assert.Equal("contact.rvm.receipt", recorded.EventName);
        Assert.StartsWith("https://", recorded.ProofOfDeliveryUrl);
    }

    [Fact]
    public async Task Webhook_LogsNeverContainTheSecretOrTheSignature()
    {
        await PostWebhookAsync(V.RawBody, V.Signature);

        var log = _log.ToString();
        Assert.DoesNotContain(V.Secret, log);
        Assert.DoesNotContain(V.Signature, log);
    }

    [Fact]
    public async Task Callback_AcceptsTheFixtureAndRecordsIt()
    {
        var body = Fixtures.Read("callback.rvm-success.json");

        var response = await _http.PostAsync(
            _baseUrl + ReceiverApp.CallbackPath, new StringContent(body, Encoding.UTF8, "application/json"));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True((await ReadJsonAsync(response))!["received"]!.GetValue<bool>());
        var recorded = Assert.Single(_events.Snapshot());
        Assert.Equal(ResultSource.Callback, recorded.Source);
        Assert.Equal(JsonNode.Parse(body)!["foreign_id"]!.GetValue<string>(), recorded.ForeignId);
        Assert.Equal("+12125550100", recorded.From);
        Assert.Equal("+13125550142", recorded.To);
        Assert.Contains("caller_id=+12125550100", _log.ToString());
    }

    [Theory]
    [InlineData("[1,2]")]
    [InlineData("\"text\"")]
    [InlineData("not json")]
    [InlineData("")]
    public async Task Callback_RejectsAnythingButAJsonObject(string body)
    {
        var response = await _http.PostAsync(
            _baseUrl + ReceiverApp.CallbackPath, new StringContent(body, Encoding.UTF8, "application/json"));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Empty(_events.Snapshot());
    }

    [Fact]
    public async Task Callback_StripsControlCharactersFromTheLog()
    {
        var body = "{\"status\":\"failure\",\"reason\":\"line one\\nFAKE LOG LINE\"}";

        await _http.PostAsync(_baseUrl + ReceiverApp.CallbackPath, new StringContent(body, Encoding.UTF8, "application/json"));

        Assert.DoesNotContain("\nFAKE LOG LINE", _log.ToString());
    }

    [Fact]
    public async Task Health_AnswersOk()
    {
        var response = await _http.GetAsync(_baseUrl + "/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True((await ReadJsonAsync(response))!["ok"]!.GetValue<bool>());
    }
}
