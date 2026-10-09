using System.Text.Json.Nodes;
using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

public class RetailRecipeTests
{
    internal static void AssertCommonRules(RunResult result)
    {
        Assert.NotEmpty(result.Api.Requests);
        foreach (var request in result.Api.Requests)
        {
            Assert.Equal(Key, request.Header("x-key"));
            Assert.Equal(Secret, request.Header("x-secret"));
            Assert.Equal("application/json", request.Header("accept"));
        }

        Assert.DoesNotContain(Secret, result.Output);
        Assert.DoesNotContain(Secret, result.Error);
        Assert.DoesNotContain(Key, result.Output);
        Assert.DoesNotContain(Key, result.Error);
    }

    internal static void AssertIdempotencyKey(RecordedRequest request)
    {
        Assert.True(Guid.TryParse(request.Header("idempotency-key"), out _), "Idempotency-Key should be a uuid");
    }

    [Fact]
    public async Task SendsWithAPhoneLineAndMedia_ThenPrintsTheCallbackResult()
    {
        await using var api = await MockApi.StartAsync();
        api.Handle("POST", "/rvm", AcceptThenCallBack());
        var (publicUrl, port) = FreeReceiver();

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_PUBLIC_URL", publicUrl), ("PORT", port)), "retail");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["POST /rvm"], result.Calls);
        AssertCommonRules(result);
        const string reminder = "Send only to people who agreed to hear from you. Test with numbers you own.";
        Assert.StartsWith(reminder, result.Output);
        Assert.Equal(1, result.Output.Split(reminder).Length - 1);

        var request = result.Single("POST", "/rvm");
        AssertIdempotencyKey(request);
        Assert.Contains($"\"to\":\"{RecipientNumber}\"", request.Body);
        Assert.DoesNotContain("\\u002B", request.Body, StringComparison.OrdinalIgnoreCase);
        var body = result.RvmBody();
        Assert.Equal(
            ["to", "phone_line_id", "media_id", "foreign_id", "callback_url"],
            body.Select(p => p.Key).ToArray());
        Assert.Equal(RecipientNumber, body["to"]!.GetValue<string>());
        Assert.Equal(LineId, body["phone_line_id"]!.GetValue<string>());
        Assert.Equal(MediaId, body["media_id"]!.GetValue<string>());
        Assert.True(Guid.TryParse(body["foreign_id"]!.GetValue<string>(), out _));
        Assert.Equal($"{publicUrl}/callbacks/dropcowboy", body["callback_url"]!.GetValue<string>());

        Assert.Contains($"message_id={MessageId}", result.Output);
        Assert.Contains("Result (from the callback):", result.Output);
        Assert.Contains("status:      success", result.Output);
        Assert.DoesNotMatch("deliver(ed|s)\\b", result.Output);
    }

    [Fact]
    public async Task FindsTheDefaultLineAndTheFirstApprovedMedia_WhenNoneIsConfigured()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/phone/public/lines", 200, Wrap($$"""
            [{"ivr_id":"11111111-2222-4333-8444-555555555555","name":"Other","default":false},
             {"ivr_id":"{{LineId}}","name":"Main","default":true}]
            """));
        api.Reply("GET", "/media/public/media", 200, Wrap($$"""
            {"medias":[{"media_id":"22222222-3333-4444-8555-666666666666","api_allowed":false},
                       {"media_id":"{{MediaId}}","api_allowed":true}],"total":2}
            """));
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api, ("DC_WAIT_SECONDS", "0")), "retail");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["GET /phone/public/lines", "GET /media/public/media", "POST /rvm"], result.Calls);
        var body = result.RvmBody();
        Assert.Equal(LineId, body["phone_line_id"]!.GetValue<string>());
        Assert.Equal(MediaId, body["media_id"]!.GetValue<string>());
        AssertCommonRules(result);
    }

    [Fact]
    public async Task NeverSendsACallerIdOrAnAudioUrl()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_CALLER_ID", "+13125550177"), ("DC_WAIT_SECONDS", "0")), "retail");

        var body = result.RvmBody();
        Assert.Null(body["caller_id"]);
        Assert.Null(body["audio_url"]);
        Assert.Null(body["tts_body"]);
    }

    [Fact]
    public async Task SendsAnAudioUrl_WhenItIsTheOnlyAudio_AndSaysWhenTheApiAcceptsIt()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_AUDIO_URL", "https://audio.example.com/offer.mp3"),
            ("DC_CALLER_ID", "+13125550177"), ("DC_WAIT_SECONDS", "0")), "retail");

        Assert.Equal(0, result.ExitCode);
        var body = result.RvmBody();
        Assert.Equal(["audio_url", "foreign_id", "phone_line_id", "to"], body.Select(p => p.Key).Order(StringComparer.Ordinal).ToArray());
        Assert.Equal("https://audio.example.com/offer.mp3", body["audio_url"]!.GetValue<string>());
        Assert.Contains("audio_url is an option for BYOC plans only and must be enabled by support.", result.Output);
        Assert.Contains("you can then send only to your test numbers", result.Output);
    }

    [Fact]
    public async Task TextToSpeechGoesWithAVoice_AndNeverWithMedia()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Wrap($$"""
            {"voices":[{"voice_id":"33333333-4444-4555-8666-777777777777","status":"processing"},
                       {"voice_id":"{{VoiceId}}","status":"ready"}],"total":2}
            """));
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", "Hi, this is a reminder."), ("DC_MEDIA_ID", null), ("DC_WAIT_SECONDS", "0")), "retail");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["GET /voice/public/voices", "POST /rvm"], result.Calls);
        var body = result.RvmBody();
        Assert.Equal("Hi, this is a reminder.", body["tts_body"]!.GetValue<string>());
        Assert.Equal(VoiceId, body["voice_id"]!.GetValue<string>());
        Assert.Null(body["media_id"]);
        Assert.Null(body["audio_url"]);
    }

    [Fact]
    public async Task WithoutAPublicUrl_SendsNoCallbackAndSaysSo()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api, ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId)), "retail");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["POST /rvm"], result.Calls);
        Assert.Null(result.RvmBody()["callback_url"]);
        Assert.Contains("DC_PUBLIC_URL is not set", result.Output);
    }

    [Fact]
    public async Task WaitSecondsZero_SendsAndExitsWithoutListening()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);
        var (publicUrl, _) = FreeReceiver();

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_PUBLIC_URL", publicUrl), ("DC_WAIT_SECONDS", "0")), "retail");

        Assert.Equal(0, result.ExitCode);
        Assert.DoesNotContain("Receiver listening", result.Output);
        Assert.DoesNotContain("Waiting up to", result.Output);
        Assert.NotNull(result.RvmBody()["callback_url"]);
    }

    [Fact]
    public async Task TimeoutExitsZeroAndSaysNoResultYet()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);
        var (publicUrl, port) = FreeReceiver();

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_PUBLIC_URL", publicUrl), ("PORT", port), ("DC_WAIT_SECONDS", "1")), "retail");

        Assert.Equal(0, result.ExitCode);
        Assert.Contains("No result has arrived yet", result.Output);
    }

    [Fact]
    public async Task ASignedWebhookEndsTheWaitToo_AndSecretsAreLoadedFromTheApi()
    {
        await using var api = await MockApi.StartAsync();
        var secret = Fixtures.Vector().Secret;
        var (publicUrl, port) = FreeReceiver();
        api.Reply("GET", "/register/public/account/webhook-signing-secret", 200, Wrap($$"""
            [{"webhook_id":"5c9e3a7f-2b6d-4e1a-8f4c-9d3b7e1a5c62","event_types":["contact.rvm.status","contact.rvm.receipt"],"hook_type":null,"signing_secret":"{{secret}}"}]
            """));
        api.Handle("POST", "/rvm", AcceptThenWebhook(publicUrl, secret));

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_PUBLIC_URL", publicUrl), ("PORT", port),
            ("DC_WEBHOOK_SECRET", null)), "retail");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["GET /register/public/account/webhook-signing-secret", "POST /rvm"], result.Calls);
        Assert.Contains("Result (from the webhook):", result.Output);
        Assert.DoesNotContain(secret, result.Output);
        Assert.Contains("loaded from the API", result.Output);
        AssertCommonRules(result);
    }

    [Fact]
    public async Task ASendThatFails_PrintsStatusTitleCodeAndRequestId_ButNoSecrets()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 400, """
            {"title":"Bad Request","detail":"phone_line_id is required","code":"4010","meta":{"request_id":"e7a3c9d1-5b2f-4a8e-9c6d-1f4b8a2e7c35"}}
            """);

        var result = await RunAsync(api, Env(api, ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId)), "retail");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("400", result.Error);
        Assert.Contains("Bad Request", result.Error);
        Assert.Contains("phone_line_id is required", result.Error);
        Assert.Contains("4010", result.Error);
        Assert.Contains("e7a3c9d1-5b2f-4a8e-9c6d-1f4b8a2e7c35", result.Error);
        AssertCommonRules(result);
    }

    [Fact]
    public async Task NoPhoneLineAnywhere_StopsBeforeSending()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/phone/public/lines", 200, Wrap("[]"));

        var result = await RunAsync(api, Env(api, ("DC_MEDIA_ID", MediaId)), "retail");

        Assert.Equal(1, result.ExitCode);
        Assert.Equal(["GET /phone/public/lines"], result.Calls);
        Assert.Contains("DC_PHONE_LINE_ID", result.Error);
    }

    [Theory]
    [InlineData("3125550142")]
    [InlineData("+0125550142")]
    [InlineData("tel:+13125550142")]
    public async Task ABadRecipientNumberFailsBeforeAnyRequest(string to)
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_TO", to), ("DC_MEDIA_ID", MediaId)), "retail");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
        Assert.Contains("E.164", result.Error);
    }

    [Fact]
    public async Task TextToSpeechOver1200Characters_IsRefusedLocally()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", new string('a', 1201))), "retail");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
        Assert.Contains("1200", result.Error);
    }

    [Fact]
    public async Task EachSendUsesANewIdempotencyKeyAndForeignId()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);
        var env = Env(api, ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_WAIT_SECONDS", "0"));

        await RunAsync(api, env, "retail");
        await RunAsync(api, env, "retail");

        var sends = api.Requests.Where(r => r.Path == "/rvm").ToArray();
        Assert.Equal(2, sends.Length);
        Assert.NotEqual(sends[0].Header("idempotency-key"), sends[1].Header("idempotency-key"));
        Assert.NotEqual(((JsonObject)sends[0].Json!)["foreign_id"]!.ToString(), ((JsonObject)sends[1].Json!)["foreign_id"]!.ToString());
    }
}
