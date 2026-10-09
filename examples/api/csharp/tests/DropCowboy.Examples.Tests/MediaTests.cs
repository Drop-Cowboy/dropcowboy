using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Recipes;
using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

/// <summary>Uploading audio, the four audio sources on POST /rvm, sample values and outcome hints.</summary>
public sealed class MediaTests : IDisposable
{
    private const string UploadedMediaId = "2c7a9e4f-6b1d-4f58-8a3e-0d9c5b2f7e41";
    private const string ImportedMediaId = "4e9b1f6c-8a3d-4c27-b6e1-5f0a2d8c4b73";
    private const string UploadPath = "/uploads/" + UploadedMediaId;
    private const string CallerId = "+13125550177";
    private const string AudioUrl = "https://audio.example.com/offer.mp3";
    private const string Connected = """{"connected":true}""";
    private static readonly byte[] AudioBytes = Encoding.ASCII.GetBytes("ID3 not really audio");

    private readonly string _dir = Directory.CreateTempSubdirectory("dc-media-").FullName;

    public void Dispose() => Directory.Delete(_dir, recursive: true);

    private string AudioFilePath(string name = "offer.mp3", byte[]? bytes = null)
    {
        var path = Path.Combine(_dir, name);
        File.WriteAllBytes(path, bytes ?? AudioBytes);
        return path;
    }

    /// <summary>
    /// The create, storage PUT and complete routes. A PUT with any Content-Type but the
    /// exact one returned is refused with 403, like the real storage service.
    /// </summary>
    private static void MediaUploadRoutes(MockApi api)
    {
        api.Handle("POST", "/media/public/media", request =>
        {
            if (request.Json?["signed_upload"]?.GetValue<bool>() == true)
            {
                var upload = new JsonObject();
                foreach (var (ext, contentType) in new[] { ("mp3", "audio/mpeg"), ("wav", "audio/wav") })
                {
                    upload[ext] = new JsonObject
                    {
                        ["url"] = $"{api.BaseUrl}{UploadPath}.{ext}?expires=1774214712&signature=5d0c7e2a9b41f3e8",
                        ["content_type"] = contentType
                    };
                }

                return Task.FromResult(MockResponse.Json(201, new JsonObject
                {
                    ["data"] = new JsonObject { ["media_id"] = UploadedMediaId, ["upload"] = upload }
                }.ToJsonString()));
            }

            return Task.FromResult(MockResponse.Json(201, Wrap($$"""{"media_id":"{{ImportedMediaId}}"}""")));
        });
        api.Handle("PUT", UploadPath + ".mp3", request => Task.FromResult(Storage(request, "audio/mpeg")));
        api.Handle("PUT", UploadPath + ".wav", request => Task.FromResult(Storage(request, "audio/wav")));
        api.Reply("POST", $"/media/public/media/{UploadedMediaId}/complete", 200, Wrap($$"""{"media_id":"{{UploadedMediaId}}"}"""));
    }

    private static MockResponse Storage(RecordedRequest request, string contentType)
    {
        return request.Header("content-type") == contentType
            ? new MockResponse(200, "")
            : new MockResponse(403, "<Error><Code>SignatureDoesNotMatch</Code></Error>");
    }

    // --- upload-media --------------------------------------------------------

    [Fact]
    public async Task Upload_CreatesThenPutsWithTheExactContentTypeThenCompletes()
    {
        await using var api = await MockApi.StartAsync();
        MediaUploadRoutes(api);

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_FILE", AudioFilePath())), "upload-media");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(
            ["POST /media/public/media", $"PUT {UploadPath}.mp3", $"POST /media/public/media/{UploadedMediaId}/complete"],
            result.Calls);
        var create = result.Api.Requests[0].Json!;
        Assert.Equal("""{"name":"offer.mp3","type":"rvm","signed_upload":true}""", create.ToJsonString());

        var put = result.Api.Requests[1];
        Assert.Equal("audio/mpeg", put.Header("content-type"));
        Assert.Equal(AudioBytes, put.RawBytes);
        Assert.Null(put.Header("x-key"));
        Assert.Null(put.Header("x-secret"));
        Assert.Equal("{}", result.Api.Requests[2].Body);

        Assert.Contains($"media_id: {UploadedMediaId}", result.Output);
        Assert.Contains($"To send it, set DC_MEDIA_ID={UploadedMediaId}", result.Output);
        Assert.DoesNotContain("signature=", result.Output);
    }

    [Fact]
    public async Task Upload_UsesTheWavUrlForAWavFile_AndTheMediaName()
    {
        await using var api = await MockApi.StartAsync();
        MediaUploadRoutes(api);

        var result = await RunAsync(api, Env(api,
            ("DC_AUDIO_FILE", AudioFilePath("GREETING.WAV")), ("DC_MEDIA_NAME", "October follow-up")), "upload-media");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal("October follow-up", result.Api.Requests[0].Json!["name"]!.GetValue<string>());
        Assert.Equal(UploadPath + ".wav", result.Api.Requests[1].Path);
        Assert.Equal("audio/wav", result.Api.Requests[1].Header("content-type"));
    }

    [Fact]
    public async Task A403OnThePut_ExplainsContentTypeAndExpiry_AndDoesNotComplete()
    {
        await using var api = await MockApi.StartAsync();
        api.Handle("PUT", UploadPath + ".mp3", _ => Task.FromResult(new MockResponse(403, "<Error><Code>AccessDenied</Code></Error>")));
        MediaUploadRoutes(api);

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_FILE", AudioFilePath())), "upload-media");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("Content-Type", result.Error);
        Assert.Contains("last 2 days", result.Error);
        Assert.Contains("https://", result.Error);
        Assert.DoesNotContain(result.Calls, c => c.EndsWith("/complete", StringComparison.Ordinal));
    }

    [Fact]
    public async Task AnHttpsAudioFileIsImportedByUrl()
    {
        await using var api = await MockApi.StartAsync();
        MediaUploadRoutes(api);

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_FILE", AudioUrl)), "upload-media");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(["POST /media/public/media"], result.Calls);
        Assert.Equal(
            $$"""{"name":"offer.mp3","type":"rvm","url":"{{AudioUrl}}","ext":".mp3"}""",
            result.Api.Requests[0].Json!.ToJsonString());
        Assert.Contains($"media_id: {ImportedMediaId}", result.Output);
    }

    [Theory]
    [InlineData("missing.mp3", "there is no file at")]
    [InlineData("notes.txt", ".mp3 or .wav")]
    [InlineData("https://audio.example.com/offer.ogg", ".mp3 or .wav")]
    [InlineData("empty.mp3", "is empty")]
    public async Task ABadAudioFileStopsBeforeAnyRequest(string value, string message)
    {
        await using var api = await MockApi.StartAsync();
        if (value == "empty.mp3")
        {
            AudioFilePath(value, []);
        }

        var path = value.StartsWith("https", StringComparison.Ordinal) ? value : Path.Combine(_dir, value);
        foreach (var command in new[] { "upload-media", "retail" })
        {
            var result = await RunAsync(api, Env(api, ("DC_AUDIO_FILE", path), ("DC_PHONE_LINE_ID", LineId)), command);

            Assert.Equal(1, result.ExitCode);
            Assert.Contains(message, result.Error);
        }

        Assert.Empty(api.Requests);
    }

    // --- the exact POST /rvm body for each audio source ------------------------

    [Fact]
    public async Task RetailBodyForEachAudioSource_NeverWithACallerId()
    {
        var sources = new (string Name, string Value, string Expected)[]
        {
            ("DC_MEDIA_ID", MediaId, $$"""{"media_id":"{{MediaId}}"}"""),
            ("DC_AUDIO_FILE", AudioFilePath(), $$"""{"media_id":"{{UploadedMediaId}}"}"""),
            ("DC_TTS_BODY", "Hello there.", $$"""{"tts_body":"Hello there.","voice_id":"{{VoiceId}}"}"""),
            ("DC_AUDIO_URL", AudioUrl, $$"""{"audio_url":"{{AudioUrl}}"}""")
        };

        foreach (var (name, value, expected) in sources)
        {
            await using var api = await MockApi.StartAsync();
            MediaUploadRoutes(api);
            api.Reply("POST", "/rvm", 202, QueuedJson);

            var result = await RunAsync(api, Env(api,
                ("DC_PHONE_LINE_ID", LineId), ("DC_CALLER_ID", CallerId), ("DC_VOICE_ID", VoiceId),
                (name, value), ("DC_WAIT_SECONDS", "0")), "retail");

            Assert.Equal(0, result.ExitCode);
            var body = result.RvmBody();
            var audio = (JsonObject)JsonNode.Parse(expected)!;
            var want = new JsonObject { ["to"] = RecipientNumber, ["phone_line_id"] = LineId };
            foreach (var (field, node) in audio)
            {
                want[field] = node?.DeepClone();
            }

            want["foreign_id"] = body["foreign_id"]!.GetValue<string>();
            Assert.True(JsonNode.DeepEquals(want, body), $"{name}: {body.ToJsonString()}");
            Assert.Null(body["caller_id"]);
        }
    }

    [Fact]
    public async Task Retail_UploadsTheFileBeforeSending()
    {
        await using var api = await MockApi.StartAsync();
        MediaUploadRoutes(api);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_AUDIO_FILE", AudioFilePath()), ("DC_WAIT_SECONDS", "0")), "retail");

        Assert.Equal(
            ["POST /media/public/media", $"PUT {UploadPath}.mp3", $"POST /media/public/media/{UploadedMediaId}/complete", "POST /rvm"],
            result.Calls);
    }

    [Fact]
    public void AudioPrecedence_MediaThenFileThenTtsThenUrl()
    {
        var file = AudioFilePath();
        var settings = new Dictionary<string, string>
        {
            ["DC_MEDIA_ID"] = MediaId,
            ["DC_AUDIO_FILE"] = file,
            ["DC_TTS_BODY"] = "Hello there.",
            ["DC_AUDIO_URL"] = AudioUrl
        };
        var expected = new (string Winner, AudioKind Kind)[]
        {
            ("DC_MEDIA_ID", AudioKind.Media),
            ("DC_AUDIO_FILE", AudioKind.File),
            ("DC_TTS_BODY", AudioKind.TextToSpeech),
            ("DC_AUDIO_URL", AudioKind.Url)
        };

        foreach (var (winner, kind) in expected)
        {
            Assert.Equal(kind, AudioSource.FromConfig(new Config(new Dictionary<string, string>(settings)))!.Kind);
            settings.Remove(winner);
        }

        Assert.Null(AudioSource.FromConfig(new Config(settings)));
    }

    [Fact]
    public async Task Byoc_ChecksTheCarrierBeforeUploading()
    {
        await using var api = await MockApi.StartAsync();
        MediaUploadRoutes(api);
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_CALLER_ID", CallerId), ("DC_AUDIO_FILE", AudioFilePath()), ("DC_WAIT_SECONDS", "0")), "byoc");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal("GET /integration/public/byoc", result.Calls[0]);
        var body = result.RvmBody();
        Assert.Equal(["to", "caller_id", "media_id", "foreign_id"], body.Select(p => p.Key).ToArray());
        Assert.Equal(UploadedMediaId, body["media_id"]!.GetValue<string>());
    }

    [Fact]
    public async Task Byoc_WithoutACarrier_DoesNotUpload()
    {
        await using var api = await MockApi.StartAsync();
        MediaUploadRoutes(api);
        api.Reply("GET", "/integration/public/byoc", 200, Wrap("""{"connected":false}"""));

        var result = await RunAsync(api, Env(api, ("DC_CALLER_ID", CallerId), ("DC_AUDIO_FILE", AudioFilePath())), "byoc");

        Assert.Equal(1, result.ExitCode);
        Assert.Equal(["GET /integration/public/byoc"], result.Calls);
    }

    // --- sample values from the docs ------------------------------------------

    [Fact]
    public void TheSampleValuesMatchTheFixture()
    {
        var fixture = JsonNode.Parse(Fixtures.Read("doc-sample-values.json"))!;
        Assert.Equal(Strings(fixture["ids"]), SampleValues.Ids);
        Assert.Equal(Strings(fixture["phone_numbers"]), SampleValues.PhoneNumbers);
        Assert.Equal(Strings(fixture["url_hosts"]), SampleValues.UrlHosts);
    }

    private static string[] Strings(JsonNode? array) => array!.AsArray().Select(n => n!.GetValue<string>()).ToArray();

    [Theory]
    [InlineData("DC_MEDIA_ID", "1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80")]
    [InlineData("DC_MEDIA_ID", "1B7E3C9A-4D2F-4A8B-9E6C-7F2A1D5B3C80")]
    [InlineData("DC_CALLER_ID", "+12125550100")]
    [InlineData("DC_TO", "+17735550188")]
    [InlineData("DC_PUBLIC_URL", "https://hooks.example.com")]
    [InlineData("DC_AUDIO_URL", "https://cdn.example.com/voicemails/offer.mp3")]
    [InlineData("DC_AUDIO_FILE", "https://media.example.com/offer.mp3")]
    public async Task EveryCommandRefusesASampleValueBeforeAnyRequest(string name, string value)
    {
        await using var api = await MockApi.StartAsync();

        foreach (var command in new[] { "retail", "byoc", "local-presence", "tts", "subscribe", "upload-media", "check-receiver", "receiver" })
        {
            var result = await RunAsync(api, Env(api, (name, value)), command, "https://abc123.example.test/callbacks");

            Assert.Equal(1, result.ExitCode);
            Assert.Equal($"{name}={value}: this is a sample value from our docs; use your own.", result.Error.Trim());
        }

        Assert.Empty(api.Requests);
    }

    [Fact]
    public void EachItemOfAListIsChecked_AndLookalikesAreAllowed()
    {
        var config = new Config(new Dictionary<string, string>
        {
            ["DC_NUMBERS"] = "+13125550161, +12125550100",
            ["OTHER"] = "+12125550100",
            ["DC_AUDIO_URL"] = "https://audio.example.com/a.mp3",
            ["DC_NOTE"] = "hooks.example.com"
        });

        Assert.Equal(["DC_NUMBERS=+12125550100: this is a sample value from our docs; use your own."], SampleValues.Find(config));
    }

    // --- outcome hints ---------------------------------------------------------

    [Fact]
    public void OutcomeHintsFor3001_3014_And3040()
    {
        Assert.Equal([3001, 3014, 3040], Hints.Outcomes.Keys.Order().ToArray());
        Assert.Contains("media_id", Hints.ForOutcome(3001));
        Assert.Contains("audio_url is an option for BYOC plans only", Hints.ForOutcome(3014));
        Assert.StartsWith("Test Numbers Only", Hints.ForOutcome(3040));
        Assert.Null(Hints.ForOutcome(0));
        Assert.Null(Hints.ForOutcome(null));
    }

    [Fact]
    public async Task TheHintFollowsTheResult()
    {
        await using var api = await MockApi.StartAsync();
        api.Handle("POST", "/rvm", AcceptThenCallBack(status: "failed", reason: "Test Numbers Only", reasonCode: 3040));
        var (publicUrl, port) = FreeReceiver();

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_PUBLIC_URL", publicUrl), ("PORT", port)), "retail");

        var lines = result.Output.Split(Environment.NewLine);
        var index = Array.FindIndex(lines, l => l.StartsWith("  reason_code: 3040", StringComparison.Ordinal));
        Assert.True(index >= 0, result.Output);
        Assert.Contains("What to do: " + Hints.Outcomes[3040], lines.Skip(index + 1));
    }

    [Fact]
    public void NoHintForASuccess()
    {
        var output = new StringWriter();
        Delivery.PrintResult(output, new ReceivedEvent(ResultSource.Callback, "callback", null, null, null, null, "success", "", 0, null));
        Assert.DoesNotContain("What to do:", output.ToString());
    }

    [Fact]
    public async Task NotWaitingPointsAtTheApiLogs()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_PHONE_LINE_ID", LineId), ("DC_MEDIA_ID", MediaId), ("DC_WAIT_SECONDS", "0")), "retail");

        Assert.Contains(Hints.ApiLogs, result.Output);
    }
}
