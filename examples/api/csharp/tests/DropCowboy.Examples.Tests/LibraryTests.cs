using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Tests;

public class ConfigTests
{
    private static Config With(params (string Name, string Value)[] values)
    {
        return new Config(values.ToDictionary(v => v.Name, v => v.Value));
    }

    [Theory]
    [InlineData("yes", true)]
    [InlineData("YES", false)]
    [InlineData("Yes", false)]
    [InlineData("true", false)]
    [InlineData("1", false)]
    [InlineData(" yes", false)]
    [InlineData("yes ", false)]
    [InlineData("", false)]
    public void IsYesMeansTheExactLowercaseWordYes(string value, bool expected)
    {
        Assert.Equal(expected, With(("DC_RENT", value)).IsYes("DC_RENT"));
        Assert.False(With().IsYes("DC_RENT"));
    }

    [Fact]
    public void Defaults()
    {
        var config = With();

        Assert.Equal("https://api-v2.dropcowboy.com", config.BaseUrl);
        Assert.Equal(3000, config.Port);
        Assert.Equal(300, config.WaitSeconds);
        Assert.Null(config.PublicUrl);
        Assert.Null(config.CallbackUrl);
    }

    [Fact]
    public void CallbackUrlIsThePublicUrlPlusTheRoute_WithoutADoubleSlash()
    {
        var config = With(("DC_PUBLIC_URL", "https://abc123.example.com/"));

        Assert.Equal("https://abc123.example.com/callbacks/dropcowboy", config.CallbackUrl);
    }

    [Theory]
    [InlineData("PORT", "abc")]
    [InlineData("PORT", "70000")]
    [InlineData("PORT", "-1")]
    [InlineData("DC_WAIT_SECONDS", "soon")]
    public void BadNumbersAreRejected(string name, string value)
    {
        var config = With((name, value));

        Assert.Throws<RecipeException>(() => name == "PORT" ? config.Port : config.WaitSeconds);
    }

    [Fact]
    public void ListsAreCommaSeparatedAndTrimmed()
    {
        var config = With(("DC_NUMBERS", " +13125550142 , ,+14155550101 "));

        Assert.Equal(["+13125550142", "+14155550101"], config.GetList("DC_NUMBERS"));
        Assert.Empty(config.GetList("DC_MISSING"));
    }

    [Fact]
    public void BlankValuesCountAsUnset()
    {
        Assert.Null(With(("DC_TO", "   ")).Get("DC_TO"));
    }

    [Fact]
    public void RequireNamesTheVariable()
    {
        var error = Assert.Throws<RecipeException>(() => With().Require("DC_KEY"));

        Assert.Contains("DC_KEY", error.Message);
    }
}

public class AudioSourceTests
{
    private static Config With(params (string Name, string Value)[] values)
    {
        return new Config(values.ToDictionary(v => v.Name, v => v.Value));
    }

    [Fact]
    public void MediaWinsOverTextWinsOverUrl()
    {
        var all = With(("DC_MEDIA_ID", "m"), ("DC_TTS_BODY", "t"), ("DC_AUDIO_URL", "u"));
        var noMedia = With(("DC_TTS_BODY", "t"), ("DC_AUDIO_URL", "u"));
        var urlOnly = With(("DC_AUDIO_URL", "u"));

        Assert.Equal(AudioKind.Media, AudioSource.FromConfig(all)!.Kind);
        Assert.Equal(AudioKind.TextToSpeech, AudioSource.FromConfig(noMedia)!.Kind);
        Assert.Equal(AudioKind.Url, AudioSource.FromConfig(urlOnly)!.Kind);
        Assert.Null(AudioSource.FromConfig(With()));
    }

    [Fact]
    public void ExactlyOneAudioFieldIsWritten()
    {
        var body = new System.Text.Json.Nodes.JsonObject();

        AudioSource.ForTts("Hello", "8b5e2d9f-4c1a-4f76-9e3b-6a0d8c2f5e17").WriteTo(body);

        Assert.Equal(["tts_body", "voice_id"], body.Select(p => p.Key).ToArray());
    }

    [Fact]
    public void TextWithoutAVoiceCannotBeWritten()
    {
        Assert.Throws<InvalidOperationException>(() => AudioSource.ForTts("Hello", null).WriteTo(new System.Text.Json.Nodes.JsonObject()));
    }

    [Fact]
    public void LengthIsCountedInCharactersNotUtf16Units()
    {
        var emoji = string.Concat(Enumerable.Repeat("\U0001F600", 1200));

        AudioSource.ForTts(emoji, null).CheckTtsLength();
        Assert.Throws<RecipeException>(() => AudioSource.ForTts(emoji + "a", null).CheckTtsLength());
    }

    [Fact]
    public void MissingAudio_NamesAllThreeVariables()
    {
        var error = Assert.Throws<RecipeException>(() => AudioSource.RequireFromConfig(With()));

        Assert.Contains("DC_MEDIA_ID", error.Message);
        Assert.Contains("DC_TTS_BODY", error.Message);
        Assert.Contains("DC_AUDIO_URL", error.Message);
    }
}

public class RedactTests
{
    [Fact]
    public void ShowsOnlyTheLastFour()
    {
        Assert.Equal("...7c30", Redact.Tail("e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30"));
        Assert.Equal("****", Redact.Tail("short"));
    }

    [Fact]
    public void SafeStripsControlAndNonAsciiCharacters_AndTruncates()
    {
        Assert.Equal("a?b?c", Redact.Safe("a\nb\u00e9c"));
        Assert.Equal("xxxxxxxxxx...", Redact.Safe(new string('x', 500), 10));
    }
}

public class ReceivedEventsTests
{
    private static ReceivedEvent Webhook(string name, string to)
    {
        return new ReceivedEvent(ResultSource.Webhook, name, null, null, to, null, "success", "", 0, null);
    }

    [Fact]
    public async Task ReturnsAnEventThatArrivedBeforeTheWait()
    {
        var events = new ReceivedEvents();
        events.Add(Webhook("contact.rvm.status", "+13125550142"));

        var found = await events.WaitForAsync(e => e.To == "+13125550142", CancellationToken.None);

        Assert.NotNull(found);
    }

    [Fact]
    public async Task WakesWhenAMatchingEventArrivesLater_AndIgnoresOthers()
    {
        var events = new ReceivedEvents();
        var waiting = events.WaitForAsync(e => e.To == "+13125550142", CancellationToken.None);

        events.Add(Webhook("contact.rvm.status", "+19995550100"));
        Assert.False(waiting.IsCompleted);
        events.Add(Webhook("contact.rvm.status", "+13125550142"));

        Assert.NotNull(await waiting.WaitAsync(TimeSpan.FromSeconds(5)));
    }

    [Fact]
    public async Task ReturnsNullWhenCancelled()
    {
        var events = new ReceivedEvents();
        using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(50));

        Assert.Null(await events.WaitForAsync(_ => true, cts.Token));
    }
}

public class CliTests
{
    [Fact]
    public async Task HelpPrintsUsageAndExitsZero()
    {
        var output = new StringWriter();

        var code = await Cli.RunAsync([], new Config(new Dictionary<string, string>()), output, new StringWriter(), CancellationToken.None);

        Assert.Equal(0, code);
        Assert.Contains("Usage: dotnet run -- <command>", output.ToString());
    }

    [Fact]
    public async Task AnUnknownCommandExitsTwo()
    {
        var error = new StringWriter();

        var code = await Cli.RunAsync(["bogus"], new Config(new Dictionary<string, string>()), new StringWriter(), error, CancellationToken.None);

        Assert.Equal(2, code);
        Assert.Contains("Unknown command", error.ToString());
    }

    [Fact]
    public async Task MissingCredentialsExitOneAndNameTheVariable()
    {
        var error = new StringWriter();

        var code = await Cli.RunAsync(["retail"], new Config(new Dictionary<string, string>()), new StringWriter(), error, CancellationToken.None);

        Assert.Equal(1, code);
        Assert.Contains("DC_KEY", error.ToString());
    }

    [Theory]
    [InlineData("retail")]
    [InlineData("byoc")]
    [InlineData("local-presence")]
    [InlineData("tts")]
    [InlineData("subscribe")]
    public async Task EveryRecipePrintsTheReminderExactlyOnce_BeforeAnyRequest(string command)
    {
        var output = new StringWriter();

        await Cli.RunAsync([command], new Config(new Dictionary<string, string>()), output, new StringWriter(), CancellationToken.None);

        const string reminder = "Send only to people who agreed to hear from you. Test with numbers you own.";
        var lines = output.ToString().Split('\n', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
        Assert.Equal(reminder, lines[0]);
        Assert.Single(lines, line => line == reminder);
    }

    [Fact]
    public async Task EveryCommandPrintsTheReminderFirst()
    {
        var output = new StringWriter();

        await Cli.RunAsync(["retail"], new Config(new Dictionary<string, string>()), output, new StringWriter(), CancellationToken.None);

        Assert.StartsWith("Send only to people who agreed to hear from you. Test with numbers you own.", output.ToString());
    }

    [Fact]
    public async Task TheStandaloneReceiverRunsUntilCancelled_AndExitsZero()
    {
        var (_, port) = RecipeHarness.FreeReceiver();
        var printed = new StringWriter();
        var output = TextWriter.Synchronized(printed);
        using var cts = new CancellationTokenSource();
        var env = new Dictionary<string, string> { ["PORT"] = port, ["DC_WEBHOOK_SECRET"] = Fixtures.Vector().Secret };

        var running = Cli.RunAsync(["receiver"], new Config(env), output, new StringWriter(), cts.Token);
        using var http = new HttpClient();
        string? health = null;
        for (var attempt = 0; attempt < 50 && health is null; attempt++)
        {
            try
            {
                health = await http.GetStringAsync($"http://127.0.0.1:{port}/health");
            }
            catch (HttpRequestException)
            {
                await Task.Delay(50);
            }
        }

        cts.Cancel();
        var code = await running.WaitAsync(TimeSpan.FromSeconds(10));

        Assert.Equal("""{"ok":true}""", health);
        Assert.Equal(0, code);
        Assert.Contains("Receiver listening on port " + port, printed.ToString());
    }
}
