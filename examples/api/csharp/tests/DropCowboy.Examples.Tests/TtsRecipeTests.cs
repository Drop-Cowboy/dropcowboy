using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

public class TtsRecipeTests
{
    private const string Text = "Hi Jordan, this is a reminder about your visit on Friday.";
    private const string Connected = """{"connected":true}""";

    private static string Voices => Wrap($$"""{"voices":[{"voice_id":"{{VoiceId}}","status":"ready"}],"total":1}""");

    [Fact]
    public async Task RetailMode_UsesALine_TextAndAVoice()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Voices);
        api.Handle("POST", "/rvm", AcceptThenCallBack());
        var (publicUrl, port) = FreeReceiver();

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", Text), ("DC_PUBLIC_URL", publicUrl), ("PORT", port)), "tts");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["GET /voice/public/voices", "POST /rvm"], result.Calls);
        RetailRecipeTests.AssertCommonRules(result);
        RetailRecipeTests.AssertIdempotencyKey(result.Single("POST", "/rvm"));

        var body = result.RvmBody();
        Assert.Equal(
            ["to", "phone_line_id", "tts_body", "voice_id", "foreign_id", "callback_url"],
            body.Select(p => p.Key).ToArray());
        Assert.Equal(Text, body["tts_body"]!.GetValue<string>());
        Assert.Equal(VoiceId, body["voice_id"]!.GetValue<string>());
        Assert.Null(body["caller_id"]);
        Assert.Null(body["media_id"]);
        Assert.Null(body["audio_url"]);
    }

    [Fact]
    public async Task ByocMode_UsesACallerId_AndNoPhoneLine()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Voices);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_MODE", "byoc"), ("DC_CALLER_ID", "+13125550177"), ("DC_TTS_BODY", Text), ("DC_WAIT_SECONDS", "0")), "tts");

        Assert.Equal(0, result.ExitCode);
        var body = result.RvmBody();
        Assert.Equal("+13125550177", body["caller_id"]!.GetValue<string>());
        Assert.Null(body["phone_line_id"]);
        Assert.Equal(VoiceId, body["voice_id"]!.GetValue<string>());
    }

    [Fact]
    public async Task TheTtsRecipeIgnoresMediaAndAudioUrl()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Voices);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", Text), ("DC_MEDIA_ID", MediaId), ("DC_AUDIO_URL", "https://audio.example.com/a.mp3"),
            ("DC_WAIT_SECONDS", "0")), "tts");

        var body = result.RvmBody();
        Assert.Null(body["media_id"]);
        Assert.Null(body["audio_url"]);
        Assert.NotNull(body["tts_body"]);
    }

    [Fact]
    public async Task ADcVoiceIdSkipsTheVoiceLookup()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", Text), ("DC_VOICE_ID", VoiceId), ("DC_WAIT_SECONDS", "0")), "tts");

        Assert.Equal(["POST /rvm"], result.Calls);
    }

    [Fact]
    public async Task Preview_PrintsTheUrlAndTheBilledCharacters_BeforeSending()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Voices);
        api.Reply("POST", "/voice/public/tts/synthesize", 200, Wrap("""
            {"audio_url":"https://media.example.com/tts/1b7e3c9a.mp3","expires_at":1774045200000,"tts_characters":57,"content_type":"audio/mpeg"}
            """));
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", Text), ("DC_PREVIEW", "yes"), ("DC_WAIT_SECONDS", "0")), "tts");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["GET /voice/public/voices", "POST /voice/public/tts/synthesize", "POST /rvm"], result.Calls);
        var synthesize = result.Single("POST", "/voice/public/tts/synthesize").Json!;
        Assert.Equal(VoiceId, synthesize["voice_id"]!.GetValue<string>());
        Assert.Equal(Text, synthesize["text"]!.GetValue<string>());
        Assert.Contains("https://media.example.com/tts/1b7e3c9a.mp3", result.Output);
        Assert.Contains("tts_characters: 57 (billed per character)", result.Output);
        Assert.Contains("2026-", result.Output);
    }

    [Fact]
    public async Task NoPreviewCall_WithoutDcPreviewYes()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Voices);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api, ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", Text), ("DC_WAIT_SECONDS", "0")), "tts");

        Assert.DoesNotContain("POST /voice/public/tts/synthesize", result.Calls);
    }

    [Theory]
    [InlineData("YES")]
    [InlineData("true")]
    [InlineData("1")]
    [InlineData(" yes")]
    public async Task OnlyTheExactLowercaseWordYesPreviews(string value)
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Voices);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", Text), ("DC_PREVIEW", value), ("DC_WAIT_SECONDS", "0")), "tts");

        Assert.DoesNotContain("POST /voice/public/tts/synthesize", result.Calls);
    }

    [Fact]
    public async Task NoReadyVoice_StopsWithAMessage()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/voice/public/voices", 200, Wrap("""{"voices":[{"voice_id":"33333333-4444-4555-8666-777777777777","status":"processing"}],"total":1}"""));

        var result = await RunAsync(api, Env(api, ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", Text)), "tts");

        Assert.Equal(1, result.ExitCode);
        Assert.Equal(["GET /voice/public/voices"], result.Calls);
        Assert.Contains("No voice is ready", result.Error);
    }

    [Fact]
    public async Task TextOver1200Characters_IsRefusedBeforeAnyRequest()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", new string('x', 1201))), "tts");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
    }

    [Fact]
    public async Task Exactly1200Characters_IsAccepted()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_TTS_BODY", new string('x', 1200)), ("DC_VOICE_ID", VoiceId), ("DC_WAIT_SECONDS", "0")), "tts");

        Assert.Equal(0, result.ExitCode);
    }

    [Fact]
    public async Task MissingText_FailsBeforeAnyRequest()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_PHONE_LINE_ID", LineId)), "tts");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
        Assert.Contains("DC_TTS_BODY", result.Error);
    }

    [Fact]
    public async Task UnknownMode_IsRejected()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_MODE", "carrier"), ("DC_TTS_BODY", Text)), "tts");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("DC_MODE", result.Error);
    }
}
