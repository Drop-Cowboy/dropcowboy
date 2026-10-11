using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

public class DcClientTests
{
    private static DcClient ClientFor(MockApi api) => new(api.BaseUrl, Key, Secret, TimeSpan.FromMilliseconds(1));

    [Fact]
    public async Task Get_RetriesA429_HonoringTheAnswer_ThenSucceeds()
    {
        await using var api = await MockApi.StartAsync();
        api.ReplySequence("GET", "/media/public/media", (429, """{"title":"Too Many Requests"}"""), (200, Wrap("{}")));
        using var client = ClientFor(api);

        var result = await client.GetAsync("/media/public/media", CancellationToken.None);

        Assert.NotNull(result);
        Assert.Equal(2, api.Requests.Count);
    }

    [Fact]
    public async Task Get_GivesUpAfterThreeTries_AndRaisesTheLastError()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/media/public/media", 503, """{"title":"Service Unavailable","code":"unavailable"}""");
        using var client = ClientFor(api);

        var error = await Assert.ThrowsAsync<DcError>(() => client.GetAsync("/media/public/media", CancellationToken.None));

        Assert.Equal(503, error.Status);
        Assert.Equal(3, api.Requests.Count);
    }

    [Fact]
    public async Task Get_DoesNotRetryA4xx()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/media/public/media", 401, """{"title":"Unauthorized"}""");
        using var client = ClientFor(api);

        await Assert.ThrowsAsync<DcError>(() => client.GetAsync("/media/public/media", CancellationToken.None));

        Assert.Single(api.Requests);
    }

    [Fact]
    public async Task PostRvm_IsNeverRetried_EvenOnA500()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 500, """{"title":"Internal Server Error"}""");
        using var client = ClientFor(api);

        var error = await Assert.ThrowsAsync<DcError>(() => client.SendRvmAsync(new JsonObject { ["to"] = RecipientNumber }, CancellationToken.None));

        Assert.Equal(500, error.Status);
        Assert.Single(api.Requests);
    }

    [Fact]
    public async Task Requests_CarryTheAuthHeaders_AndAJsonBody()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);
        using var client = ClientFor(api);

        var messageId = await client.SendRvmAsync(new JsonObject { ["to"] = RecipientNumber }, CancellationToken.None);

        Assert.Equal(MessageId, messageId);
        var request = Assert.Single(api.Requests);
        Assert.Equal(Key, request.Header("x-key"));
        Assert.Equal(Secret, request.Header("x-secret"));
        Assert.StartsWith("application/json", request.Header("content-type"));
        Assert.True(Guid.TryParse(request.Header("idempotency-key"), out _));
        Assert.Contains("\"to\":\"+13125550142\"", request.Body);
    }

    [Fact]
    public async Task Error_CarriesStatusTitleDetailCodeAndRequestId_WithoutTheSecrets()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 422, """
            {"title":"Unprocessable","detail":"audio_url is not allowed","code":"3014","meta":{"request_id":"e7a3c9d1-5b2f-4a8e-9c6d-1f4b8a2e7c35"}}
            """);
        using var client = ClientFor(api);

        var error = await Assert.ThrowsAsync<DcError>(() => client.SendRvmAsync(new JsonObject(), CancellationToken.None));

        Assert.Equal(422, error.Status);
        Assert.Equal("Unprocessable", error.Title);
        Assert.Equal("audio_url is not allowed", error.Detail);
        Assert.Equal("3014", error.Code);
        Assert.Equal("e7a3c9d1-5b2f-4a8e-9c6d-1f4b8a2e7c35", error.RequestId);
        var report = string.Join("\n", error.Report());
        Assert.DoesNotContain(Secret, report);
        Assert.DoesNotContain(Key, report);
    }

    [Fact]
    public void Error_ReadsTheRequestIdFromTheHeader_WhenTheBodyHasNone()
    {
        var error = DcError.FromResponse(404, """{"title":"Not Found"}""", "0b9c4e7a-2d5f-4a13-8e6b-7c1d3f5a9e20");

        Assert.Equal("0b9c4e7a-2d5f-4a13-8e6b-7c1d3f5a9e20", error.RequestId);
    }

    [Fact]
    public void Error_SurvivesABodyThatIsNotJson()
    {
        var error = DcError.FromResponse(502, "<html>Bad Gateway</html>", null);

        Assert.Equal(502, error.Status);
        Assert.NotEmpty(error.Report());
    }

    [Fact]
    public async Task ANetworkFailure_BecomesADcErrorWithStatusZero()
    {
        var (url, _) = FreeReceiver();
        using var client = new DcClient(url, Key, Secret, TimeSpan.FromMilliseconds(1));

        var error = await Assert.ThrowsAsync<DcError>(() => client.GetAsync("/media/public/media", CancellationToken.None));

        Assert.Equal(0, error.Status);
        Assert.DoesNotContain(Secret, error.Message);
    }

    [Fact]
    public async Task CancellationIsHonored()
    {
        await using var api = await MockApi.StartAsync();
        api.Handle("GET", "/media/public/media", async _ =>
        {
            await Task.Delay(TimeSpan.FromSeconds(10));
            return MockResponse.Json(200, "{}");
        });
        using var client = ClientFor(api);
        using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(100));

        await Assert.ThrowsAnyAsync<OperationCanceledException>(() => client.GetAsync("/media/public/media", cts.Token));
    }
}
