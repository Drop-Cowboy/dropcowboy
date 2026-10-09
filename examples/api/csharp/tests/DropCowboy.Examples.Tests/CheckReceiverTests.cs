using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

/// <summary>check-receiver against a local endpoint (the mock) that answers however a test tells it to.</summary>
public class CheckReceiverTests
{
    private const string WebhookSecret = "e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30";
    private const string WebApi404 = """{"Message":"No HTTP resource was found that matches the request URI.","MessageDetail":"No action was found on the controller 'Dropcowboy' that matches the request."}""";

    private static Task<RunResult> Check(MockApi endpoint, Dictionary<string, string> env, params string[] paths)
    {
        var args = new[] { "check-receiver" }.Concat(paths.Select(p => endpoint.BaseUrl + p)).ToArray();
        return RunAsync(endpoint, env, args);
    }

    private static Dictionary<string, string> NoSecrets(MockApi api, params (string, string?)[] extra)
    {
        return Env(api, [("DC_WEBHOOK_SECRET", null), .. extra]);
    }

    [Fact]
    public async Task PostsTheCallbackAndACorrectlySignedFreshWebhook()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks/dropcowboy", 200, "{}");
        endpoint.Reply("POST", "/webhooks/dropcowboy", 204, "");

        var result = await Check(endpoint, NoSecrets(endpoint, ("DC_WEBHOOK_SECRET", WebhookSecret)),
            "/callbacks/dropcowboy", "/webhooks/dropcowboy");

        Assert.Equal(0, result.ExitCode);
        var callback = endpoint.Requests[0];
        var webhook = endpoint.Requests[1];
        Assert.True(JsonNode.DeepEquals(JsonNode.Parse(CheckReceiver.SampleCallback), callback.Json));
        Assert.Null(callback.Header("x-signature"));

        var now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        Assert.Equal(SignatureResult.Valid, SignatureVerifier.Verify(
            webhook.RawBytes, webhook.Header("x-signature"), webhook.Header("x-timestamp"), webhook.Header("x-signature-version"),
            [WebhookSecret], now));
        Assert.True(Math.Abs(now - long.Parse(webhook.Header("x-timestamp")!)) < 60);
        var body = webhook.Json!;
        var sample = JsonNode.Parse(CheckReceiver.SampleWebhook)!;
        Assert.NotEqual(sample["event_id"]!.GetValue<string>(), body["event_id"]!.GetValue<string>());
        Assert.Equal(body["event_id"]!.GetValue<string>(), webhook.Header("x-event-id"));
        Assert.Equal("1", webhook.Header("x-attempt"));
        Assert.True(JsonNode.DeepEquals(sample["data"], body["data"]));

        Assert.Contains("All checks passed.", result.Output);
        Assert.DoesNotContain(WebhookSecret, result.Output);
        Assert.Contains("7c30", result.Output);
    }

    [Fact]
    public async Task SignsWithTheFirstSecretInTheList()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks", 200, "{}");
        endpoint.Reply("POST", "/webhooks", 200, "{}");
        var vector = Fixtures.Vector();

        await Check(endpoint, Env(endpoint, ("DC_WEBHOOK_SECRET", vector.OtherSecret + "," + vector.Secret)), "/callbacks", "/webhooks");

        var webhook = endpoint.Requests[1];
        Assert.Equal(SignatureResult.Valid, SignatureVerifier.Verify(
            webhook.RawBytes, webhook.Header("x-signature"), webhook.Header("x-timestamp"), null,
            [vector.OtherSecret], DateTimeOffset.UtcNow.ToUnixTimeSeconds()));
    }

    [Fact]
    public async Task AWebhookUrlNeedsASecret_ACallbackAloneDoesNot()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks", 200, "{}");

        var refused = await Check(endpoint, NoSecrets(endpoint), "/callbacks", "/webhooks");
        Assert.Equal(1, refused.ExitCode);
        Assert.Contains("DC_WEBHOOK_SECRET", refused.Error);
        Assert.Empty(endpoint.Requests);

        var alone = await Check(endpoint, NoSecrets(endpoint), "/callbacks");
        Assert.Equal(0, alone.ExitCode);
        Assert.Single(endpoint.Requests);
    }

    [Theory]
    [InlineData(404)]
    [InlineData(405)]
    public async Task NotFoundAndMethodNotAllowed_MeanTheRouteOrVerbIsWrong(int status)
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks", status, "{}");

        var result = await Check(endpoint, NoSecrets(endpoint), "/callbacks");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("The route or the verb is wrong", result.Output);
        Assert.Contains("exactly this path: /callbacks", result.Output);
        Assert.Contains("not retried", result.Output);
        Assert.Contains("Some checks failed. " + Hints.ApiLogs, result.Output);
    }

    [Fact]
    public async Task TheWebApiNoActionAnswer_GetsTheAttributeRoutingFix()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/api/dropcowboy/callback", 404, WebApi404);

        var result = await Check(endpoint, NoSecrets(endpoint), "/api/dropcowboy/callback");

        Assert.Contains("[HttpPost]", result.Output);
        Assert.Contains("config.MapHttpAttributeRoutes()", result.Output);
        Assert.Contains("C# README", result.Output);
    }

    [Theory]
    [InlineData(401)]
    [InlineData(403)]
    public async Task UnauthorizedAndForbidden_MeanTheSignatureCheckIsFailing(int status)
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks", 200, "{}");
        endpoint.Reply("POST", "/webhooks", status, "{}");

        var result = await Check(endpoint, NoSecrets(endpoint, ("DC_WEBHOOK_SECRET", WebhookSecret)), "/callbacks", "/webhooks");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("The signature check is failing", result.Output);
    }

    [Fact]
    public async Task ACallbackBehindAuthentication_IsExplained()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks", 401, "{}");

        var result = await Check(endpoint, NoSecrets(endpoint), "/callbacks");

        Assert.Contains("Callbacks carry no signature", result.Output);
    }

    [Fact]
    public async Task TooSlow()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Handle("POST", "/callbacks", async _ =>
        {
            await Task.Delay(600);
            return new MockResponse(200, "{}");
        });
        var output = new StringWriter();

        var results = await CheckReceiver.RunAsync(
            new Config(new Dictionary<string, string>()), [endpoint.BaseUrl + "/callbacks"], output, CancellationToken.None,
            callbackTimeout: TimeSpan.FromMilliseconds(200));

        Assert.Equal("slow", results[0].Verdict);
        Assert.Contains("Too slow", output.ToString());
    }

    [Theory]
    [InlineData(500, true)]
    [InlineData(503, true)]
    [InlineData(429, true)]
    [InlineData(400, false)]
    [InlineData(422, false)]
    public async Task OtherNon2xxOnAWebhook(int status, bool retried)
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks", 200, "{}");
        endpoint.Reply("POST", "/webhooks", status, "{}");

        var result = await Check(endpoint, NoSecrets(endpoint, ("DC_WEBHOOK_SECRET", WebhookSecret)), "/callbacks", "/webhooks");

        Assert.Equal(1, result.ExitCode);
        Assert.Equal(retried, result.Output.Contains("is retried, at most 3 attempts", StringComparison.Ordinal));
        Assert.Equal(!retried, result.Output.Contains("is not retried, so the event is lost", StringComparison.Ordinal));
    }

    [Fact]
    public async Task ARedirectIsNotFollowed()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Handle("POST", "/callbacks", _ => Task.FromResult(
            new MockResponse(301, "", new Dictionary<string, string> { ["Location"] = "/elsewhere" })));

        var result = await Check(endpoint, NoSecrets(endpoint), "/callbacks");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("answered: 301", result.Output);
        Assert.Equal(["POST /callbacks"], endpoint.Calls);
    }

    [Fact]
    public async Task Unreachable()
    {
        await using var endpoint = await MockApi.StartAsync();
        var (closedUrl, _) = FreeReceiver();

        var result = await RunAsync(endpoint, NoSecrets(endpoint), "check-receiver", closedUrl + "/callbacks");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("Could not connect", result.Output);
    }

    [Fact]
    public async Task ALocalAddressGetsANote()
    {
        await using var endpoint = await MockApi.StartAsync();
        endpoint.Reply("POST", "/callbacks", 200, "{}");

        var result = await Check(endpoint, NoSecrets(endpoint), "/callbacks");

        Assert.Contains("is not a public https:// address", result.Output);
    }

    [Theory]
    [InlineData("https://receiver.example.com/callbacks", "callback-url=https://receiver.example.com/callbacks: this is a sample value from our docs; use your own.")]
    [InlineData("callbacks/dropcowboy", "callback-url must be a full http:// or https:// URL")]
    public async Task SampleAndMalformedUrlsAreRefusedBeforePosting(string url, string message)
    {
        await using var endpoint = await MockApi.StartAsync();

        var result = await RunAsync(endpoint, NoSecrets(endpoint), "check-receiver", url);

        Assert.Equal(1, result.ExitCode);
        Assert.Contains(message, result.Error);
        Assert.Empty(endpoint.Requests);
    }

    [Fact]
    public async Task NoUrlPrintsTheUsage()
    {
        await using var endpoint = await MockApi.StartAsync();

        var result = await RunAsync(endpoint, NoSecrets(endpoint), "check-receiver");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("check-receiver <callback-url> [webhook-url]", result.Error);
    }

    [Fact]
    public void TheEmbeddedBodiesMatchTheFixtures()
    {
        Assert.True(JsonNode.DeepEquals(JsonNode.Parse(Fixtures.Read("callback.rvm-success.json")), JsonNode.Parse(CheckReceiver.SampleCallback)));
        Assert.True(JsonNode.DeepEquals(JsonNode.Parse(Fixtures.Read("webhook.rvm-status.json")), JsonNode.Parse(CheckReceiver.SampleWebhook)));
    }

    [Theory]
    [InlineData("callback", 200, 10, false, null, "ok")]
    [InlineData("callback", 204, 10, false, null, "ok")]
    [InlineData("callback", 404, 10, false, null, "route")]
    [InlineData("webhook", 405, 10, false, null, "route")]
    [InlineData("webhook", 401, 10, false, null, "auth")]
    [InlineData("webhook", 403, 10, false, null, "auth")]
    [InlineData("callback", null, 10000, true, null, "slow")]
    [InlineData("webhook", 200, 6000, false, null, "slow")]
    [InlineData("callback", null, 3, false, "ConnectionError", "unreachable")]
    [InlineData("callback", 500, 10, false, null, "rejected")]
    [InlineData("webhook", 422, 10, false, null, "rejected")]
    public void Classify(string kind, int? status, long elapsedMs, bool timedOut, string? networkError, string verdict)
    {
        var timeout = kind == "callback" ? CheckReceiver.CallbackTimeout : CheckReceiver.WebhookTimeout;

        var result = CheckReceiver.Classify(kind, "https://abc123.example.test/hook", status, elapsedMs, timedOut, networkError, timeout);

        Assert.Equal(verdict, result.Verdict);
        Assert.Equal(verdict == "ok", result.Ok);
    }
}
