using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Recipes;

namespace DropCowboy.Examples.Tests;

/// <summary>Signature vectors, TwiML builders, Twilio errors and the detect-twilio settings.</summary>
public sealed class DetectTwilioLibraryTests
{
    private static readonly JsonNode DetectionVector = DetectTwilioScenario.DetectionVector();
    private static readonly JsonNode TwilioVector = DetectTwilioScenario.TwilioVector();

    // ---- Detection signature vectors -----------------------------------------------------

    private static SignatureResult VerifyDetection(string? rawKey = null, string? signature = "signature", string? timestamp = null, string nowKey = "now_ms_valid")
    {
        var raw = Encoding.UTF8.GetBytes(DetectionVector[rawKey ?? "raw_body"]!.GetValue<string>());
        var header = signature is null ? null : DetectionVector[signature]?.GetValue<string>() ?? signature;
        return DetectionSignature.Verify(
            raw,
            header,
            timestamp ?? DetectionVector["timestamp_ms"]!.GetValue<string>(),
            DetectionVector["detection_key"]!.GetValue<string>(),
            DetectionVector[nowKey]!.GetValue<long>());
    }

    [Fact]
    public void DetectionVectorVerifies() => Assert.Equal(SignatureResult.Valid, VerifyDetection());

    [Fact]
    public void DetectionVectorIsStaleLater() => Assert.Equal(SignatureResult.StaleTimestamp, VerifyDetection(nowKey: "now_ms_stale"));

    [Fact]
    public void DetectionTamperedBodyIsInvalid() => Assert.Equal(SignatureResult.InvalidSignature, VerifyDetection(rawKey: "tampered_raw_body"));

    [Fact]
    public void DetectionOtherKeyIsInvalid() => Assert.Equal(SignatureResult.InvalidSignature, VerifyDetection(signature: "signature_from_other_key"));

    [Fact]
    public void DetectionMissingHeaderOrTimestampIsMissing()
    {
        Assert.Equal(SignatureResult.MissingSignature, VerifyDetection(signature: null));
        Assert.Equal(SignatureResult.MissingSignature, VerifyDetection(timestamp: string.Empty));
    }

    [Fact]
    public void DetectionDigestWithoutTheSchemeIsInvalid()
    {
        var digest = DetectionVector["signature"]!.GetValue<string>()["v1=hmac-sha256,".Length..];
        Assert.Equal(SignatureResult.InvalidSignature, VerifyDetection(signature: digest));
        Assert.Equal(SignatureResult.InvalidSignature, VerifyDetection(signature: "v1=hmac-sha1," + digest));
    }

    [Fact]
    public void DetectionNonNumericTimestampIsStale() => Assert.Equal(SignatureResult.StaleTimestamp, VerifyDetection(timestamp: "1774041846420ms"));

    [Fact]
    public void DetectionAcceptsAnyLaterDigest()
    {
        var digest = DetectionVector["signature"]!.GetValue<string>()["v1=hmac-sha256,".Length..];
        var other = DetectionVector["signature_from_other_key"]!.GetValue<string>()["v1=hmac-sha256,".Length..];
        Assert.Equal(SignatureResult.Valid, VerifyDetection(signature: $"v1=hmac-sha256,{other},{digest}"));
    }

    [Fact]
    public void DetectionSignReproducesTheVector()
    {
        var raw = Encoding.UTF8.GetBytes(DetectionVector["raw_body"]!.GetValue<string>());
        var signed = DetectionSignature.Sign(DetectionVector["detection_key"]!.GetValue<string>(), DetectionVector["timestamp_ms"]!.GetValue<string>(), raw);
        Assert.Equal(DetectionVector["signature"]!.GetValue<string>(), signed);
    }

    // ---- Twilio signature vectors -------------------------------------------------------

    private static List<KeyValuePair<string, string>> Params(string name)
    {
        var fields = new List<KeyValuePair<string, string>>();
        foreach (var (key, value) in TwilioVector[name]!.AsObject())
        {
            fields.Add(new(key, value!.GetValue<string>()));
        }

        return fields;
    }

    private static string TwilioString(string name) => TwilioVector[name]!.GetValue<string>();

    [Fact]
    public void TwilioVectorVerifies()
    {
        Assert.Equal(TwilioString("signature"), TwilioSignature.Compute(TwilioString("auth_token"), TwilioString("url"), Params("params")));
        Assert.True(TwilioSignature.Verify(TwilioString("auth_token"), TwilioString("url"), Params("params"), TwilioString("signature")));
    }

    [Fact]
    public void TwilioTamperedParamsFail() =>
        Assert.False(TwilioSignature.Verify(TwilioString("auth_token"), TwilioString("url"), Params("tampered_params"), TwilioString("signature")));

    [Fact]
    public void TwilioDifferentUrlFails() =>
        Assert.False(TwilioSignature.Verify(TwilioString("auth_token"), "https://tunnel.example.org/twilio/voice", Params("params"), TwilioString("signature")));

    [Fact]
    public void TwilioOtherTokenFails()
    {
        Assert.False(TwilioSignature.Verify(TwilioString("auth_token"), TwilioString("url"), Params("params"), TwilioString("signature_from_other_token")));
        Assert.Equal(TwilioString("signature_from_other_token"), TwilioSignature.Compute(TwilioString("other_auth_token"), TwilioString("url"), Params("params")));
    }

    [Fact]
    public void TwilioMissingHeaderFails()
    {
        Assert.False(TwilioSignature.Verify(TwilioString("auth_token"), TwilioString("url"), Params("params"), null));
        Assert.False(TwilioSignature.Verify(TwilioString("auth_token"), TwilioString("url"), Params("params"), string.Empty));
    }

    [Fact]
    public void TwilioRepeatedNameContributesEachValueInOrder()
    {
        const string url = "https://tunnel.example.org/twilio/status";
        var fields = new List<KeyValuePair<string, string>> { new("b", "x"), new("a", "2"), new("a", "1") };
        using var hmac = new HMACSHA1(Encoding.UTF8.GetBytes("test-token"));
        var expected = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(url + "a2a1bx")));

        Assert.Equal(expected, TwilioSignature.Compute("test-token", url, fields));
    }

    // ---- TwiML -------------------------------------------------------------------------

    [Fact]
    public void StartDetectionEscapesEveryValue()
    {
        var twiml = Twiml.StartDetection(new DetectionStream(
            "wss://detect.dropcowboy.com/carrier/ws/twilio?a=1&b=2",
            "key<&>\"'",
            "https://tunnel.example.org/webhooks/detection",
            "0d6f2b8e-4a1c-4e93-8b75-2c9e1f4a6d38",
            190));

        var expected = """
            <?xml version="1.0" encoding="UTF-8"?>
            <Response>
              <Start>
                <Stream name="detection" url="wss://detect.dropcowboy.com/carrier/ws/twilio?a=1&amp;b=2" track="inbound_track">
                  <Parameter name="api_key" value="key&lt;&amp;&gt;&quot;&apos;"/>
                  <Parameter name="webhook_url" value="https://tunnel.example.org/webhooks/detection"/>
                  <Parameter name="webhook_events" value="detection,beep,screening,timeout,error,close"/>
                  <Parameter name="call_id" value="0d6f2b8e-4a1c-4e93-8b75-2c9e1f4a6d38"/>
                </Stream>
              </Start>
              <Pause length="190"/>
              <Hangup/>
            </Response>
            """.ReplaceLineEndings("\n");
        Assert.Equal(expected, twiml);
    }

    [Fact]
    public void PlayMessageForAudioAndText()
    {
        Assert.Equal(
            "<Response><Stop><Stream name=\"detection\"/></Stop><Play>https://audio.example.net/a.mp3?x=1&amp;y=2</Play><Hangup/></Response>",
            Twiml.PlayMessage(VoiceMessage.Audio("https://audio.example.net/a.mp3?x=1&y=2")));
        Assert.Equal(
            "<Response><Stop><Stream name=\"detection\"/></Stop><Say>Call us back &amp; ask for &quot;Pat&quot; &lt;3</Say><Hangup/></Response>",
            Twiml.PlayMessage(VoiceMessage.Text("Call us back & ask for \"Pat\" <3")));
    }

    // ---- Twilio errors -----------------------------------------------------------------

    [Theory]
    [InlineData(21210, "TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.")]
    [InlineData(21212, "TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.")]
    [InlineData(21215, "Twilio's Voice geographic permissions block calls to this country. Enable it in the Twilio Console.")]
    [InlineData(21219, "Trial accounts can call only verified numbers. Upgrade the Twilio account to run this recipe.")]
    [InlineData(20003, "Twilio rejected TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN.")]
    public void TwilioErrorPrintsItsHint(int code, string hint)
    {
        var error = TwilioError.FromResponse(400, $$"""{"code":{{code}},"message":"Refused.","more_info":"https://www.twilio.com/docs/errors/{{code}}","status":400}""", DetectTwilioScenario.AccountSid);

        Assert.Equal(
            [
                "Twilio answered HTTP 400.",
                $"  code:      {code}",
                "  message:   Refused.",
                $"  more_info: https://www.twilio.com/docs/errors/{code}",
                "What to do: " + hint
            ],
            error.Report());
    }

    [Fact]
    public void TwilioErrorWithoutAKnownCodeHasNoHint()
    {
        var error = TwilioError.FromResponse(500, "upstream trouble", DetectTwilioScenario.AccountSid);

        Assert.DoesNotContain(error.Report(), line => line.StartsWith("What to do:", StringComparison.Ordinal));
        Assert.Contains("  message:   upstream trouble", error.Report());
    }

    [Fact]
    public void TwilioErrorShowsTheAccountSidOnlyAsItsLastFour()
    {
        var error = TwilioError.FromResponse(404, $$"""{"code":20404,"message":"/2010-04-01/Accounts/{{DetectTwilioScenario.AccountSid}}/Calls.json was not found","status":404}""", DetectTwilioScenario.AccountSid);

        var text = string.Join("\n", error.Report()) + error.Message;
        Assert.DoesNotContain(DetectTwilioScenario.AccountSid, text);
        Assert.Contains("...0001", text);
        Assert.True(error.CallAlreadyEnded);
    }

    [Fact]
    public void CallAlreadyEndedOn21220()
    {
        Assert.True(TwilioError.FromResponse(400, """{"code":21220,"message":"Call is not in-progress.","status":400}""", DetectTwilioScenario.AccountSid).CallAlreadyEnded);
        Assert.False(TwilioError.FromResponse(400, """{"code":21215,"message":"No.","status":400}""", DetectTwilioScenario.AccountSid).CallAlreadyEnded);
    }

    // ---- Settings ----------------------------------------------------------------------

    private static Dictionary<string, string> Valid(params (string Name, string? Value)[] overrides)
    {
        var env = new Dictionary<string, string>
        {
            ["TWILIO_ACCOUNT_SID"] = DetectTwilioScenario.AccountSid,
            ["TWILIO_AUTH_TOKEN"] = DetectTwilioScenario.AuthToken,
            ["TWILIO_FROM"] = DetectTwilioScenario.From,
            ["DC_TO"] = DetectTwilioScenario.To,
            ["DC_PUBLIC_URL"] = DetectTwilioScenario.PublicUrl,
            ["DC_DETECTION_KEY"] = DetectTwilioScenario.DetectionKey,
            ["DC_VM_TEXT"] = "Please call us back."
        };
        foreach (var (name, value) in overrides)
        {
            if (value is null)
            {
                env.Remove(name);
            }
            else
            {
                env[name] = value;
            }
        }

        return env;
    }

    private static string Problems(Dictionary<string, string> env)
    {
        return Assert.Throws<RecipeException>(() => DetectTwilioSettings.Load(new Config(env))).Message;
    }

    [Fact]
    public void DefaultsMatchTheContract()
    {
        var settings = DetectTwilioSettings.Load(new Config(Valid()));

        Assert.Equal("https://api.twilio.com", settings.TwilioBaseUrl);
        Assert.Equal("wss://detect.dropcowboy.com/carrier/ws/twilio", settings.DetectionUrl);
        Assert.Equal(30, settings.RingSeconds);
        Assert.Equal(180, settings.WaitSeconds);
        Assert.Equal(3000, settings.Port);
        Assert.Equal(VoiceMessage.Text("Please call us back."), settings.Voicemail);
        Assert.Null(settings.Live);
    }

    [Fact]
    public void AudioWinsOverTextAndATrailingSlashIsStripped()
    {
        var settings = DetectTwilioSettings.Load(new Config(Valid(
            ("DC_VM_AUDIO_URL", "https://audio.example.net/VOICEMAIL.WAV"), ("DC_PUBLIC_URL", "https://tunnel.example.org/"),
            ("DC_LIVE_AUDIO_URL", "https://audio.example.net/live.mp3"), ("DC_LIVE_TEXT", "Hello."))));

        Assert.Equal(VoiceMessage.Audio("https://audio.example.net/VOICEMAIL.WAV"), settings.Voicemail);
        Assert.Equal(VoiceMessage.Audio("https://audio.example.net/live.mp3"), settings.Live);
        Assert.Equal("https://tunnel.example.org", settings.PublicUrl);
    }

    [Fact]
    public void DetectionKeyWinsOverKeyAndSecret()
    {
        var settings = DetectTwilioSettings.Load(new Config(Valid(("DC_KEY", "test-key-5e2a"), ("DC_SECRET", "test-secret-do-not-print-9f3c"))));

        Assert.Equal(DetectTwilioScenario.DetectionKey, settings.DetectionKey);
    }

    [Fact]
    public void EveryProblemIsReportedInContractOrder()
    {
        var message = Problems(new Dictionary<string, string>
        {
            ["DC_TO"] = "12",
            ["TWILIO_FROM"] = "+1",
            ["TWILIO_ACCOUNT_SID"] = "AB1",
            ["DC_PUBLIC_URL"] = "http://tunnel.example.org",
            ["DC_VM_AUDIO_URL"] = "https://audio.example.net/a.ogg",
            ["DC_RING_SECONDS"] = "4"
        });

        string[] order =
        [
            "TWILIO_AUTH_TOKEN is required",
            "Set DC_DETECTION_KEY",
            "DC_TO must be in E.164",
            "TWILIO_FROM must be in E.164",
            "TWILIO_ACCOUNT_SID must be AC",
            "DC_PUBLIC_URL must start with https://",
            "DC_VM_AUDIO_URL must be",
            "DC_RING_SECONDS must be a whole number from 5 to 60"
        ];
        var last = -1;
        foreach (var part in order)
        {
            var at = message.IndexOf(part, StringComparison.Ordinal);
            Assert.True(at > last, $"\"{part}\" is missing or out of order in:\n{message}");
            last = at;
        }
    }

    [Theory]
    [InlineData("DC_RING_SECONDS", "4")]
    [InlineData("DC_RING_SECONDS", "61")]
    [InlineData("DC_WAIT_SECONDS", "601")]
    [InlineData("DC_DETECTION_URL", "https://detect.dropcowboy.com/carrier/ws/twilio")]
    [InlineData("DC_LIVE_AUDIO_URL", "http://audio.example.net/live.mp3")]
    public void OutOfRangeSettingsAreRefused(string name, string value)
    {
        Assert.Contains(name, Problems(Valid((name, value))));
    }

    [Theory]
    [InlineData("DC_DETECTION_STRATEGY", "quick")]
    [InlineData("DC_DETECTION_TIMEOUT_SEC", "4")]
    [InlineData("DC_BEEP_WAIT_SECONDS", "0")]
    [InlineData("DC_LIVE_CONFIDENCE", "high")]
    public void RemovedSettingsAreNotValidated(string name, string value)
    {
        Assert.NotNull(DetectTwilioSettings.Load(new Config(Valid((name, value)))));
    }

    [Fact]
    public void TextLongerThan1000CharactersIsRefused()
    {
        Assert.Contains("DC_VM_TEXT must be 1,000 characters or fewer", Problems(Valid(("DC_VM_TEXT", new string('a', 1001)))));
        Assert.NotNull(DetectTwilioSettings.Load(new Config(Valid(("DC_VM_TEXT", new string('a', 1000))))));
    }

    [Fact]
    public void SampleValuesAndZeroSidPrintAfterValidationProblemsInOneList()
    {
        var message = Problems(Valid(
            ("DC_TO", "12"),
            ("DC_VM_AUDIO_URL", "https://media.example.com/voicemail.mp3"),
            ("TWILIO_FROM", "+13125550100"),
            ("TWILIO_ACCOUNT_SID", "AC00000000000000000000000000000000")));

        string[] expected =
        [
            "DC_TO must be in E.164 format: a plus sign and 8 to 15 digits, for example +13125550142.",
            SampleValues.Describe("DC_VM_AUDIO_URL", "https://media.example.com/voicemail.mp3"),
            SampleValues.Describe("TWILIO_FROM", "+13125550100"),
            "TWILIO_ACCOUNT_SID=AC00000000000000000000000000000000: this is the placeholder from our fixtures; use your own."
        ];
        Assert.Equal(expected, message.Split(Environment.NewLine));
    }

    [Fact]
    public void ZeroAccountSidIsRefusedWithTheFixtureMessage()
    {
        Assert.Equal(
            "TWILIO_ACCOUNT_SID=AC00000000000000000000000000000000: this is the placeholder from our fixtures; use your own.",
            Problems(Valid(("TWILIO_ACCOUNT_SID", "AC00000000000000000000000000000000"))));
    }

    [Theory]
    [InlineData("http://tunnel.example.org")]
    [InlineData("https://tunnel.example.org:8443")]
    [InlineData("https://tunnel.example.org:80")]
    [InlineData("https://tunnel.example.org/?token=1")]
    [InlineData("https://tunnel.example.org/#part")]
    [InlineData("https://localhost")]
    [InlineData("https://app.localhost")]
    [InlineData("https://printer.local")]
    [InlineData("https://127.0.0.1")]
    [InlineData("https://10.1.2.3")]
    [InlineData("https://172.16.0.9")]
    [InlineData("https://172.31.255.1")]
    [InlineData("https://192.168.1.20")]
    [InlineData("https://169.254.10.20")]
    [InlineData("https://0.0.0.0")]
    [InlineData("https://[::1]")]
    [InlineData("https://[fe80::1]")]
    [InlineData("https://[fd12:3456::1]")]
    [InlineData("https://[::ffff:192.168.1.20]")]
    [InlineData("tunnel.example.org")]
    public void PublicUrlRejections(string url)
    {
        Assert.NotNull(DetectTwilioSettings.PublicUrlProblem(url));
    }

    [Theory]
    [InlineData("https://tunnel.example.org")]
    [InlineData("https://tunnel.example.org/")]
    [InlineData("https://tunnel.example.org:443")]
    [InlineData("https://tunnel.example.org/base")]
    [InlineData("https://172.32.0.1")]
    [InlineData("https://203.0.113.10")]
    public void PublicUrlAcceptances(string url)
    {
        Assert.Null(DetectTwilioSettings.PublicUrlProblem(url));
    }
}
