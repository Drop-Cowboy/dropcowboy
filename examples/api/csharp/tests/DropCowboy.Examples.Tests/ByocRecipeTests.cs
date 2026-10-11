using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

public class ByocRecipeTests
{
    private const string Connected = """{"connected":true,"providers":[{"provider":"twilio","enabled":true,"default":true}],"pool_id":null}""";
    private const string AudioUrl = "https://audio.example.com/offer.mp3";
    private const string CallerId = "+13125550177";

    [Fact]
    public async Task ChecksTheCarrier_ThenSendsACallerIdAndAnAudioUrl()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Handle("POST", "/rvm", AcceptThenCallBack(callerId: CallerId));
        var (publicUrl, port) = FreeReceiver();

        var result = await RunAsync(api, Env(api,
            ("DC_CALLER_ID", CallerId), ("DC_AUDIO_URL", AudioUrl), ("DC_PUBLIC_URL", publicUrl), ("PORT", port)), "byoc");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["GET /integration/public/byoc", "POST /rvm"], result.Calls);
        RetailRecipeTests.AssertCommonRules(result);
        RetailRecipeTests.AssertIdempotencyKey(result.Single("POST", "/rvm"));

        var body = result.RvmBody();
        Assert.Equal(
            ["to", "caller_id", "audio_url", "foreign_id", "callback_url"],
            body.Select(p => p.Key).ToArray());
        Assert.Equal(CallerId, body["caller_id"]!.GetValue<string>());
        Assert.Equal(AudioUrl, body["audio_url"]!.GetValue<string>());
        Assert.Null(body["phone_line_id"]);
        Assert.Null(body["byoc"]);
        Assert.Contains("Result (from the callback):", result.Output);
    }

    [Fact]
    public async Task PassesSignedCallingDetails_WhenBothAreSet()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Reply("POST", "/rvm", 202, QueuedJson);
        const string originId = "6c1f8a3e-9b2d-4e75-a0c4-2d8e5b7f1a93";

        var result = await RunAsync(api, Env(api,
            ("DC_CALLER_ID", CallerId), ("DC_AUDIO_URL", AudioUrl), ("DC_STI_ORIG_ID", originId), ("DC_STI_ATTESTATION", "B"),
            ("DC_WAIT_SECONDS", "0")), "byoc");

        var byoc = result.RvmBody()["byoc"]!;
        Assert.Equal(originId, byoc["sti_orig_id"]!.GetValue<string>());
        Assert.Equal("B", byoc["sti_attestation"]!.GetValue<string>());
    }

    [Fact]
    public async Task OmitsSignedCallingDetails_WhenOnlyOneIsSet()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_CALLER_ID", CallerId), ("DC_AUDIO_URL", AudioUrl), ("DC_STI_ATTESTATION", "B"), ("DC_WAIT_SECONDS", "0")), "byoc");

        Assert.Null(result.RvmBody()["byoc"]);
    }

    [Fact]
    public async Task NoConnectedCarrier_StopsBeforeSending()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap("""{"connected":false,"providers":[],"pool_id":null}"""));

        var result = await RunAsync(api, Env(api, ("DC_CALLER_ID", CallerId), ("DC_AUDIO_URL", AudioUrl)), "byoc");

        Assert.Equal(1, result.ExitCode);
        Assert.Equal(["GET /integration/public/byoc"], result.Calls);
        Assert.Contains("No carrier is connected", result.Error);
    }

    [Fact]
    public async Task MissingCallerId_FailsBeforeAnyRequest()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl)), "byoc");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
        Assert.Contains("DC_CALLER_ID", result.Error);
    }

    [Fact]
    public async Task MissingAudio_NamesTheThreeVariables()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_CALLER_ID", CallerId)), "byoc");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
        Assert.Contains("DC_MEDIA_ID", result.Error);
        Assert.Contains("DC_TTS_BODY", result.Error);
        Assert.Contains("DC_AUDIO_URL", result.Error);
    }

    [Fact]
    public async Task AudioPrecedence_MediaThenTextThenUrl_AndExactlyOneGoesOnTheWire()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_CALLER_ID", CallerId), ("DC_AUDIO_URL", AudioUrl), ("DC_MEDIA_ID", MediaId), ("DC_TTS_BODY", "Hello"), ("DC_WAIT_SECONDS", "0")), "byoc");

        var body = result.RvmBody();
        Assert.Equal(MediaId, body["media_id"]!.GetValue<string>());
        Assert.Null(body["audio_url"]);
        Assert.Null(body["tts_body"]);
        Assert.Null(body["voice_id"]);
    }
}
