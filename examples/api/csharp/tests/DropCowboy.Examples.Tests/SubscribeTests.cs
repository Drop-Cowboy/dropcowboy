using System.Text.Json.Nodes;
using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

public class SubscribeTests
{
    private const string NewSecret = "e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30";
    private const string RotatedSecret = "0b9d4f7a-2c6e-4a18-9e3b-7d5a1c8f4e62";
    private const string WebhookId = "5c9e3a7f-2b6d-4e1a-8f4c-9d3b7e1a5c62";
    private const string OtherWebhookId = "8c2e6a4f-1d7b-4b93-a5e0-6f3c9d1b7a24";
    private static string Created => Wrap($$"""{"webhook_id":"{{WebhookId}}","signing_secret":"{{NewSecret}}"}""");

    [Fact]
    public async Task CreatesOneWebhookForStatusEvents_AndPrintsOnlyTheLastFourOfTheSecret()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/register/public/webhooks", 201, Created);

        var result = await RunAsync(api, Env(api, ("DC_PUBLIC_URL", "https://abc123.example.com/")), "subscribe");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["POST /register/public/webhooks"], result.Calls);
        var body = (JsonObject)result.Single("POST", "/register/public/webhooks").Json!;
        Assert.Equal(["contact.rvm.status"], body["event_types"]!.AsArray().Select(n => n!.GetValue<string>()).ToArray());
        Assert.Equal("https://abc123.example.com/webhooks/dropcowboy", body["hook_url"]!.GetValue<string>());
        Assert.Equal(2, body.Count);

        Assert.Contains(WebhookId, result.Output);
        Assert.Contains(NewSecret[^4..], result.Output);
        Assert.DoesNotContain(NewSecret, result.Output);
        Assert.DoesNotContain(NewSecret, result.Error);
        Assert.Contains("never replaces this one", result.Output);
        RetailRecipeTests.AssertCommonRules(result);
    }

    [Fact]
    public async Task ReceiptFlag_PutsBothEventsInOneWebhook()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/register/public/webhooks", 201, Created);

        var result = await RunAsync(api, Env(api, ("DC_PUBLIC_URL", "https://abc123.example.com")), "subscribe", "--receipt");

        Assert.Equal(0, result.ExitCode);
        var request = Assert.Single(api.Requests);
        var types = request.Json!["event_types"]!.AsArray().Select(n => n!.GetValue<string>()).ToArray();
        Assert.Equal(["contact.rvm.status", "contact.rvm.receipt"], types);
        Assert.Null(request.Json!["hook_type"]);
    }

    [Fact]
    public async Task EventsFlag_SendsExactlyTheEventTypesGiven()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/register/public/webhooks", 201, Created);

        var result = await RunAsync(api, Env(api, ("DC_PUBLIC_URL", "https://abc123.example.com")), "subscribe", "--events", "contact.rvm.status, contact.rvm.receipt");

        Assert.Equal(0, result.ExitCode);
        var types = Assert.Single(api.Requests).Json!["event_types"]!.AsArray().Select(n => n!.GetValue<string>()).ToArray();
        Assert.Equal(["contact.rvm.status", "contact.rvm.receipt"], types);
    }

    [Fact]
    public async Task ListsTheWebhooks_WithoutAPublicUrl()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/register/public/webhooks", 200, Wrap($$"""
            [{"webhook_id":"{{WebhookId}}","hook_url":"https://abc123.example.com/webhooks/dropcowboy","event_types":["contact.rvm.status","contact.rvm.receipt"]},
             {"webhook_id":"{{OtherWebhookId}}","hook_url":"https://abc123.example.com/webhooks/dropcowboy","event_types":["*"]}]
            """));

        var result = await RunAsync(api, Env(api), "subscribe", "--list");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["GET /register/public/webhooks"], result.Calls);
        Assert.Contains($"{WebhookId}  contact.rvm.status, contact.rvm.receipt  https://abc123.example.com/webhooks/dropcowboy", result.Output);
        Assert.Contains($"{OtherWebhookId}  *  ", result.Output);
    }

    [Fact]
    public async Task DeletesOneWebhookByItsWebhookId()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("DELETE", $"/register/public/webhooks/{WebhookId}", 200, Wrap("""{"result":true}"""));

        var result = await RunAsync(api, Env(api), "subscribe", "--delete", WebhookId);

        Assert.Equal(0, result.ExitCode);
        Assert.Equal([$"DELETE /register/public/webhooks/{WebhookId}"], result.Calls);
        Assert.Contains("Your other webhooks are unchanged", result.Output);
    }

    [Fact]
    public async Task RotatesOneSecret_AndPrintsOnlyTheLastFourOfTheNewOne()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", $"/register/public/webhooks/{WebhookId}/rotate-secret", 200,
            Wrap($$"""{"webhook_id":"{{WebhookId}}","signing_secret":"{{RotatedSecret}}","signing_secret_created_at":1774214999000}"""));

        var result = await RunAsync(api, Env(api), "subscribe", "--rotate", WebhookId);

        Assert.Equal(0, result.ExitCode);
        Assert.Equal([$"POST /register/public/webhooks/{WebhookId}/rotate-secret"], result.Calls);
        Assert.Contains(RotatedSecret[^4..], result.Output);
        Assert.DoesNotContain(RotatedSecret, result.Output);
        Assert.Contains("keep the old secret there until in-flight deliveries have arrived", result.Output);
    }

    private static string Updated(string name = "2 events", string url = "https://abc123.example.com/webhooks/dropcowboy", string events = """["contact.rvm.status","contact.rvm.receipt"]""", string extra = "") =>
        Wrap($$"""{"webhook_id":"{{WebhookId}}","name":"{{name}}","hook_url":"{{url}}","url":"{{url}}","event_types":{{events}},"hook_type":null,"signing_secret_created_at":1774214712000{{extra}}}""");

    [Fact]
    public async Task Update_ReplacesTheEventTypesWithPut_AndSendsNothingElse()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("PUT", $"/register/public/webhooks/{WebhookId}", 200, Updated(events: """["contact.rvm.status"]"""));

        var result = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId, "--events", "contact.rvm.status");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal([$"PUT /register/public/webhooks/{WebhookId}"], result.Calls);
        var body = (JsonObject)Assert.Single(api.Requests).Json!;
        Assert.Single(body);
        Assert.Equal(["contact.rvm.status"], body["event_types"]!.AsArray().Select(n => n!.GetValue<string>()).ToArray());
        Assert.Contains($"Updated webhook {WebhookId}", result.Output);
        Assert.Contains("events: contact.rvm.status", result.Output);
        Assert.Contains("The signing secret did not change", result.Output);
    }

    [Fact]
    public async Task Update_SendsTheUrlAndTheName_WithoutAPublicUrl_AndNeverPrintsASecret()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("PUT", $"/register/public/webhooks/{WebhookId}", 200,
            Updated(name: "Receipts", url: "https://new.example.com/hook", extra: $$""","signing_secret":"{{NewSecret}}" """));

        var result = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId, "--url", "https://new.example.com/hook", "--name", "Receipts");

        Assert.Equal(0, result.ExitCode);
        var body = (JsonObject)Assert.Single(api.Requests).Json!;
        Assert.Equal("https://new.example.com/hook", body["hook_url"]!.GetValue<string>());
        Assert.Equal("Receipts", body["name"]!.GetValue<string>());
        Assert.Equal(2, body.Count);
        Assert.Contains("name:   Receipts", result.Output);
        Assert.Contains("url:    https://new.example.com/hook", result.Output);
        Assert.DoesNotContain(NewSecret, result.Output);
    }

    [Fact]
    public async Task Update_WithReceipt_SendsBothEvents()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("PUT", $"/register/public/webhooks/{WebhookId}", 200, Updated());

        var result = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId, "--receipt");

        Assert.Equal(0, result.ExitCode);
        var types = Assert.Single(api.Requests).Json!["event_types"]!.AsArray().Select(n => n!.GetValue<string>()).ToArray();
        Assert.Equal(["contact.rvm.status", "contact.rvm.receipt"], types);
    }

    [Fact]
    public async Task Update_WithNothingToChange_OrABadValue_FailsBeforeAnyRequest()
    {
        await using var api = await MockApi.StartAsync();

        var nothing = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId);
        var http = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId, "--url", "http://localhost:3000");
        var longName = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId, "--name", new string('x', 101));
        var orphan = await RunAsync(api, Env(api), "subscribe", "--name", "Receipts");
        var conflict = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId, "--delete", WebhookId, "--name", "x");

        Assert.Contains("Nothing to update", nothing.Error);
        Assert.Contains("HTTPS", http.Error);
        Assert.Contains("at most 100", longName.Error);
        Assert.Contains("go with --update", orphan.Error);
        Assert.Contains("only one of", conflict.Error);
        Assert.All(new[] { nothing, http, longName, orphan, conflict }, r => Assert.Equal(1, r.ExitCode));
        Assert.Empty(api.Requests);
    }

    [Fact]
    public async Task Update_OfAnUnknownWebhookId_FailsWithTheApiError()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("PUT", $"/register/public/webhooks/{WebhookId}", 404, """{"title":"Not Found","detail":"Webhook not found"}""");

        var result = await RunAsync(api, Env(api), "subscribe", "--update", WebhookId, "--name", "x");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("404", result.Error);
    }

    [Fact]
    public async Task AnUnknownWebhookId_FailsWithTheApiError()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("DELETE", $"/register/public/webhooks/{WebhookId}", 404, """{"title":"Not Found","detail":"Webhook not found"}""");

        var result = await RunAsync(api, Env(api), "subscribe", "--delete", WebhookId);

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("404", result.Error);
    }

    [Fact]
    public async Task AFlagWithNoValue_OrConflictingFlags_FailBeforeAnyRequest()
    {
        await using var api = await MockApi.StartAsync();

        var noValue = await RunAsync(api, Env(api), "subscribe", "--delete");
        var conflict = await RunAsync(api, Env(api), "subscribe", "--list", "--delete", WebhookId);

        Assert.Equal(1, noValue.ExitCode);
        Assert.Contains("--delete needs a value", noValue.Error);
        Assert.Equal(1, conflict.ExitCode);
        Assert.Contains("only one of", conflict.Error);
        Assert.Empty(api.Requests);
    }

    [Fact]
    public async Task WithoutAPublicUrl_FailsBeforeAnyRequest()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api), "subscribe");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
        Assert.Contains("DC_PUBLIC_URL", result.Error);
    }

    [Theory]
    [InlineData("abc123.example.com")]
    [InlineData("ftp://abc123.example.com")]
    public async Task ABadPublicUrlIsRejected(string url)
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_PUBLIC_URL", url)), "subscribe");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("DC_PUBLIC_URL", result.Error);
    }
}
