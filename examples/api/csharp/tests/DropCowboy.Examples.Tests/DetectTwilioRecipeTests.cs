using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;
using DropCowboy.Examples.Recipes;

namespace DropCowboy.Examples.Tests;

public sealed class DetectTwilioRecipeTests
{
    private const string BeepTwiml =
        "<Response><Stop><Stream name=\"detection\"/></Stop><Play>https://audio.example.net/voicemail.mp3</Play><Hangup/></Response>";

    private static readonly string[] HangUp = ["Status=completed"];

    // ---- The whole run ---------------------------------------------------------------

    [Fact]
    public async Task BeepPlaysTheVoicemailMessageAndCleansUpInOrder()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.voicemail.json");
            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
            await sim.FixtureAsync("detection.close.json");
            await sim.StatusAsync("completed", "21");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal(
            [
                "GET /register/public/detection-keys",
                $"DELETE /register/public/detection-keys/{DetectTwilioScenario.LeftoverKeyId}",
                "POST /register/public/detection-keys",
                $"DELETE /register/public/detection-keys/{DetectTwilioScenario.CreatedKeyId}"
            ],
            s.Dc.Calls);
        Assert.Equal(
            [
                $"GET {DetectTwilioScenario.AccountPath}.json",
                $"GET {DetectTwilioScenario.AccountPath}/IncomingPhoneNumbers.json",
                $"POST {DetectTwilioScenario.AccountPath}/Calls.json",
                $"POST {DetectTwilioScenario.UpdatePath}"
            ],
            s.Twilio.Calls);

        var create = (JsonObject)s.Dc.Requests.Single(r => r.Method == "POST").Json!;
        Assert.Equal(DetectTwilio.TemporaryKeyName, create["name"]!.GetValue<string>());
        Assert.Equal(3600, create["expires_in_seconds"]!.GetValue<int>());
        Assert.Equal(2, create.Count);

        Assert.Equal([new("Twiml", BeepTwiml)], Form(Assert.Single(run.Updates).Body));
        Assert.Equal("voicemail_on_beep", Summary(run, "outcome"));
        Assert.Contains("Verdict: speech.voicemail.greeting (confidence 0.91). No action.", run.Output);
        Assert.Equal("speech.voicemail.greeting, confidence 0.91", Summary(run, "last verdict"));
        Assert.Equal("timestamp_ms=6420 duration_ms=380", Summary(run, "beep"));
        Assert.Matches("^[0-9]+ ms$", Summary(run, "update latency"));
        Assert.Equal("completed", Summary(run, "CallStatus"));
        Assert.Equal("21", Summary(run, "CallDuration"));
        Assert.Equal(DetectTwilioScenario.CallSid, Summary(run, "CallSid"));
        Assert.Equal(s.Sim.CallId, Summary(run, "call_id"));
        Assert.Equal("3 received, 0 ignored", Summary(run, "Detection webhooks"));
        Assert.Contains("Already acted on this call (voicemail_on_beep), so no new action.", run.Output);
        Assert.Contains("Temporary Detection key deleted.", run.Output);
    }

    [Fact]
    public async Task PrintsTheConsentAndBillingLinesAndAFreshCallId()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.StatusAsync("completed", "4");
        };

        var run = await s.RunAsync(s.Env());

        var lines = run.Output.Split('\n', StringSplitOptions.TrimEntries);
        Assert.Equal(RecipeSteps.Reminder, lines[0]);
        Assert.Equal(DetectTwilio.BillingLine, lines[1]);
        Assert.True(Guid.TryParse(s.Sim.CallId, out var callId), run.All);
        Assert.Equal(4, callId.ToString()[14] - '0');
        Assert.Contains($"call_id: {s.Sim.CallId}", run.Output);
    }

    [Fact]
    public async Task VoiceRouteAnswersTheExactStartTwiml()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.StatusAsync("completed", "3");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal(StartTwiml(DetectTwilioScenario.CreatedKey, s.Sim.CallId!, 190), s.Sim.Twiml);
    }

    [Fact]
    public async Task StartTwimlIsTheSameWhenTheMessagesAreTextAndPausesForTheRunLimitPlusTen()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.StatusAsync("completed", "3");
        };

        var run = await s.RunAsync(s.Env(
            ("DC_VM_AUDIO_URL", null), ("DC_VM_TEXT", "Hello from the office."), ("DC_LIVE_TEXT", "Hi there."),
            ("DC_WAIT_SECONDS", "100")));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal(StartTwiml(DetectTwilioScenario.CreatedKey, s.Sim.CallId!, 110), s.Sim.Twiml);
    }

    [Fact]
    public async Task CreatesTheCallWithExactlyTheContractFormAndBasicAuth()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.StatusAsync("completed", "3");
        };

        var run = await s.RunAsync(s.Env(("DC_RING_SECONDS", "25")));

        Assert.True(run.ExitCode == 0, run.All);
        var create = s.Twilio.Requests.Single(r => r.Path.EndsWith("/Calls.json", StringComparison.Ordinal));
        Assert.Equal(
            [
                new("To", DetectTwilioScenario.To),
                new("From", DetectTwilioScenario.From),
                new("Url", "https://tunnel.example.org/twilio/voice"),
                new("Method", "POST"),
                new("StatusCallback", "https://tunnel.example.org/twilio/status"),
                new("StatusCallbackMethod", "POST"),
                new("StatusCallbackEvent", "initiated"),
                new("StatusCallbackEvent", "ringing"),
                new("StatusCallbackEvent", "answered"),
                new("StatusCallbackEvent", "completed"),
                new("Timeout", "25")
            ],
            Form(create.Body));
        Assert.DoesNotContain("MachineDetection", create.Body);

        var basic = "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes(DetectTwilioScenario.AccountSid + ":" + DetectTwilioScenario.AuthToken));
        Assert.All(s.Twilio.Requests, r =>
        {
            Assert.Equal(basic, r.Header("Authorization"));
            Assert.Equal("application/json", r.Header("Accept"));
        });
    }

    // ---- The Detection key -------------------------------------------------------------

    [Fact]
    public async Task WithDetectionKeyMakesNoDropCowboyRequest()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            var twiml = await sim.AnswerAsync();
            Assert.Contains($"<Parameter name=\"api_key\" value=\"{DetectTwilioScenario.DetectionKey}\"/>", twiml);
            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "9");
        };

        var run = await s.RunAsync(s.Env(
            ("DC_DETECTION_KEY", DetectTwilioScenario.DetectionKey), ("DC_KEY", null), ("DC_SECRET", null)));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(s.Dc.Requests);
        Assert.Contains("DC_DETECTION_KEY (ends ...0042)", run.Output);
        Assert.DoesNotContain("Temporary Detection key deleted.", run.Output);
        Assert.Equal("voicemail_on_beep", Summary(run, "outcome"));
    }

    [Fact]
    public async Task KeyRefusedWithByocRequiredPrintsItsHint()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.KeyCreate = _ => MockResponse.Json(403, """
            {"type":"https://api-v2.dropcowboy.com/problems/byoc-required","title":"Forbidden","status":403,
             "detail":"Detection keys need Building Blocks.","details":{"code":"byoc-required"}}
            """);

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains("detail:     Detection keys need Building Blocks.", run.Error);
        Assert.Contains("byoc-required", run.Error);
        Assert.Contains("What to do: Detection keys need Building Blocks on your account. Enable Building Blocks, then run this again.", run.Error);
        Assert.Empty(s.Twilio.Requests);
    }

    [Theory]
    [InlineData("team-not-verified", "What to do: Finish verifying your account in the dashboard, then run this again.")]
    [InlineData("trial_feature_blocked", "What to do: Detection keys are not available on a trial account. Choose a plan, then run this again.")]
    public async Task KeyRefusalPrintsTheContractHint(string code, string expected)
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.KeyCreate = _ => MockResponse.Json(403, $$$"""
            {"type":"https://api-v2.dropcowboy.com/problems/{{{code}}}","title":"Forbidden","status":403,
             "detail":"Detection keys are not available.","details":{"code":"{{{code}}}"}}
            """);

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains(expected, run.Error);
        Assert.Empty(s.Twilio.Requests);
    }

    [Fact]
    public async Task KeyIsDeletedAfterATwilioError()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Create = _ => MockResponse.Json(400,
            """{"code":21215,"message":"Account not authorized to call +13125550142.","more_info":"https://www.twilio.com/docs/errors/21215","status":400}""");

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains("Twilio answered HTTP 400.", run.Error);
        Assert.Contains("code:      21215", run.Error);
        Assert.Contains("more_info: https://www.twilio.com/docs/errors/21215", run.Error);
        Assert.Contains("What to do: " + TwilioHints.Codes[21215], run.Error);
        Assert.Equal($"DELETE /register/public/detection-keys/{DetectTwilioScenario.CreatedKeyId}", s.Dc.Calls[^1]);
        Assert.Contains("Temporary Detection key deleted.", run.Output);
        Assert.Empty(run.Updates);
    }

    [Fact]
    public async Task KeyIsDeletedAfterAThrownError()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.HealthUrl = s.Dc.BaseUrl + "/nothing-here";

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains("The tunnel does not reach this receiver: GET https://tunnel.example.org/health answered 404.", run.Error);
        Assert.Equal($"DELETE /register/public/detection-keys/{DetectTwilioScenario.CreatedKeyId}", s.Dc.Calls[^1]);
        Assert.DoesNotContain(s.Twilio.Calls, c => c.EndsWith("/Calls.json", StringComparison.Ordinal));
    }

    // ---- Twilio preflight --------------------------------------------------------------

    [Fact]
    public async Task TrialAccountStops()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Account = _ => MockResponse.Json(200, $$"""{"sid":"{{DetectTwilioScenario.AccountSid}}","type":"Trial","status":"active"}""");

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains(DetectTwilio.TrialMessage, run.Error);
        Assert.Equal([$"GET {DetectTwilioScenario.AccountPath}.json"], s.Twilio.Calls);
        Assert.Contains("Temporary Detection key deleted.", run.Output);
    }

    [Fact]
    public async Task InactiveAccountStops()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Account = _ => MockResponse.Json(200, $$"""{"sid":"{{DetectTwilioScenario.AccountSid}}","type":"Full","status":"suspended"}""");

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains("suspended", run.Error);
        Assert.Equal([$"GET {DetectTwilioScenario.AccountPath}.json"], s.Twilio.Calls);
    }

    [Fact]
    public async Task IncomingNumberPassesWithoutTheCallerIdLookup()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.StatusAsync("completed", "2");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        var lookup = s.Twilio.Requests.Single(r => r.Path.EndsWith("/IncomingPhoneNumbers.json", StringComparison.Ordinal));
        Assert.EndsWith("?PhoneNumber=%2B13125550147", lookup.PathAndQuery);
        Assert.DoesNotContain(s.Twilio.Calls, c => c.EndsWith("/OutgoingCallerIds.json", StringComparison.Ordinal));
    }

    [Fact]
    public async Task VerifiedCallerIdPasses()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Incoming = _ => MockResponse.Json(200, """{"incoming_phone_numbers":[]}""");
        s.CallerIds = _ => MockResponse.Json(200, $$"""{"outgoing_caller_ids":[{"phone_number":"{{DetectTwilioScenario.From}}"}]}""");
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.StatusAsync("completed", "2");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        var lookup = s.Twilio.Requests.Single(r => r.Path.EndsWith("/OutgoingCallerIds.json", StringComparison.Ordinal));
        Assert.EndsWith("?PhoneNumber=%2B13125550147", lookup.PathAndQuery);
        Assert.Contains(s.Twilio.Calls, c => c.EndsWith("/Calls.json", StringComparison.Ordinal));
    }

    [Fact]
    public async Task NumberNotOnTheAccountStops()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Incoming = _ => MockResponse.Json(200, """{"incoming_phone_numbers":[]}""");

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains(DetectTwilio.NotOnAccountMessage, run.Error);
        Assert.DoesNotContain(s.Twilio.Calls, c => c.EndsWith("/Calls.json", StringComparison.Ordinal));
        Assert.Contains("Temporary Detection key deleted.", run.Output);
    }

    // ---- Decisions ---------------------------------------------------------------------

    [Fact]
    public async Task LivePersonPlaysTheLiveMessage()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.live-person.json");
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "8");
        };

        var run = await s.RunAsync(s.Env(("DC_LIVE_TEXT", "Hi, it's Sam & \"team\" <here>.")));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal(
            [new("Twiml", "<Response><Stop><Stream name=\"detection\"/></Stop><Say>Hi, it&apos;s Sam &amp; &quot;team&quot; &lt;here&gt;.</Say><Hangup/></Response>")],
            Form(Assert.Single(run.Updates).Body));
        Assert.Equal("live_person", Summary(run, "outcome"));
        Assert.Equal("speech.human.unknown, confidence 0.6", Summary(run, "last verdict"));
    }

    [Theory]
    [InlineData("speech.human.unknown", 0.93)]
    [InlineData("speech.human.adult", 0.93)]
    [InlineData("speech.human.unknown", 0.2)]
    public async Task LivePersonAtAnyConfidencePlaysTheLiveMessage(string type, double confidence)
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.EventAsync("detection", new JsonObject { ["type"] = type, ["confidence"] = confidence, ["timestamp_ms"] = 1900 });
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "8");
        };

        var run = await s.RunAsync(s.Env(("DC_LIVE_TEXT", "Hi, this is Example Dental.")));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal(
            [new("Twiml", "<Response><Stop><Stream name=\"detection\"/></Stop><Say>Hi, this is Example Dental.</Say><Hangup/></Response>")],
            Form(Assert.Single(run.Updates).Body));
        Assert.Equal("live_person", Summary(run, "outcome"));
        Assert.Contains($"Verdict: {type} (confidence {confidence.ToString("0.###", System.Globalization.CultureInfo.InvariantCulture)}). Playing the live message.", run.Output);
    }

    [Fact]
    public async Task LivePersonFallsBackToTheVoicemailMessage()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.live-person.json");
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "8");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal([new("Twiml", BeepTwiml)], Form(Assert.Single(run.Updates).Body));
        Assert.Equal("live_person", Summary(run, "outcome"));
    }

    [Fact]
    public async Task BareLivePersonWordIsNotActedOn()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.EventAsync("detection", new JsonObject { ["type"] = "live_person", ["confidence"] = 0.99, ["timestamp_ms"] = 1900 });
            await sim.StatusAsync("completed", "8");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("ended_before_action", Summary(run, "outcome"));
        Assert.Contains("Verdict: live_person (confidence 0.99). No action.", run.Output);
    }

    [Theory]
    [InlineData("speech.voicemail.full")]
    [InlineData("speech.voicemail.not_setup")]
    [InlineData("speech.silence")]
    [InlineData("speech.ivr")]
    public async Task OtherVerdictsPrintALineAndDoNothing(string type)
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.EventAsync("detection", new JsonObject { ["type"] = type, ["confidence"] = 0.88, ["timestamp_ms"] = 3100 });
            await sim.StatusAsync("completed", "6");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("ended_before_action", Summary(run, "outcome"));
        Assert.Contains($"Verdict: {type} (confidence 0.88). No action.", run.Output);
    }

    [Fact]
    public async Task TimeoutEventDoesNothing()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.EventAsync("timeout", new JsonObject { ["timestamp_ms"] = 45000 });
            await sim.StatusAsync("completed", "46");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("ended_before_action", Summary(run, "outcome"));
        Assert.Contains("Detection reported a timeout. No action.", run.Output);
    }

    [Theory]
    [InlineData(false)]
    [InlineData(true)]
    [InlineData(null)]
    public async Task ErrorEventDoesNothing(bool? recoverable)
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            var data = new JsonObject { ["code"] = "audio_stream_failed", ["error"] = "The audio stream stopped." };
            if (recoverable is { } flag)
            {
                data["recoverable"] = flag;
            }

            await sim.EventAsync("error", data);
            await sim.StatusAsync("completed", "5");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("ended_before_action", Summary(run, "outcome"));
        Assert.Contains("code=audio_stream_failed error=The audio stream stopped.", run.Output);
    }

    [Fact]
    public async Task VoicemailGreetingWithNoBeepDoesNothingAndTheRunEndsAtTheDeadline()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.voicemail.json");
        };

        var run = await s.RunAsync(s.Env(), wait: TimeSpan.FromSeconds(1.5));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal(HangUp, Assert.Single(run.Updates).Body.Split('&'));
        Assert.Equal("no_result", Summary(run, "outcome"));
        Assert.Equal("(none)", Summary(run, "beep"));
        Assert.Contains("Verdict: speech.voicemail.greeting (confidence 0.91). No action.", run.Output);
        Assert.Contains(DetectTwilio.NoResultMessage, run.Output);
        Assert.DoesNotContain(DetectTwilio.NoWebhookMessage, run.Output);
    }

    [Fact]
    public async Task ScreeningAndCloseDoNothing()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.EventAsync("screening", new JsonObject
            {
                ["screening_type"] = "call_screen", ["suggested_action"] = "speak", ["suggested_dtmf"] = "1"
            });
            await sim.FixtureAsync("detection.close.json");
            await sim.StatusAsync("completed", "5");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("ended_before_action", Summary(run, "outcome"));
        Assert.Contains("screening_type=call_screen suggested_action=speak suggested_dtmf=1", run.Output);
        Assert.Contains("reason=normal", run.Output);
        Assert.Equal("2 received, 0 ignored", Summary(run, "Detection webhooks"));
    }

    [Fact]
    public async Task RacingEventsGetOnlyOneAction()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await Task.WhenAll(
                sim.FixtureAsync("detection.beep.json"),
                sim.FixtureAsync("detection.live-person.json"),
                sim.EventAsync("timeout", new JsonObject { ["timestamp_ms"] = 45000 }));
            await sim.WaitForUpdatesAsync();
            await Task.Delay(200);
            await sim.StatusAsync("completed", "7");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Single(run.Updates);
    }

    [Fact]
    public async Task DuplicateBeepDeliveryIsActedOnOnce()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.beep.json");
            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "7");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Single(run.Updates);
        Assert.Equal("voicemail_on_beep", Summary(run, "outcome"));
        Assert.Equal("2 received, 0 ignored", Summary(run, "Detection webhooks"));
        Assert.Contains("Already acted on this call (voicemail_on_beep), so no new action.", run.Output);
    }

    [Fact]
    public async Task AnotherCallIdIsIgnored()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.beep.json", callId: "7e3b9c1a-2f4d-4a68-b5e9-0c8d2a6f4b13");
            await sim.StatusAsync("completed", "7");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("ended_before_action", Summary(run, "outcome"));
        Assert.Equal("1 received, 1 ignored", Summary(run, "Detection webhooks"));
        Assert.Contains("is not this run's call: ignored", run.Output);
    }

    [Fact]
    public async Task StatusForAnotherCallSidIsNotActedOn()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            using (var other = await sim.PostTwilioAsync(
                DetectionReceiver.StatusPath, CallSim.StatusParams("busy", null, "CA00000000000000000000000000000002")))
            {
                Assert.Equal(200, (int)other.StatusCode);
            }

            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "21");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Single(run.Updates);
        Assert.Equal("voicemail_on_beep", Summary(run, "outcome"));
        Assert.Equal("completed", Summary(run, "CallStatus"));
    }

    [Fact]
    public async Task StatusBeforeTheCreateResponseIsKept()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Create = _ =>
        {
            s.Sim.StatusAsync("completed", "0").GetAwaiter().GetResult();
            return MockResponse.Json(201, $$"""{"sid":"{{DetectTwilioScenario.CallSid}}","status":"queued"}""");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("ended_before_action", Summary(run, "outcome"));
        Assert.Equal("0", Summary(run, "CallDuration"));
    }

    [Fact]
    public async Task BusyBeforeAnswerEndsWithNoUpdate()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = sim => sim.StatusAsync("busy");

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Empty(run.Updates);
        Assert.Equal("not_answered (busy)", Summary(run, "outcome"));
        Assert.Contains("Temporary Detection key deleted.", run.Output);
    }

    [Fact]
    public async Task NoResultHangsUpAndExplainsTheRefusedKey()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim => await sim.AnswerAsync();

        var run = await s.RunAsync(s.Env(), wait: TimeSpan.FromSeconds(1.5));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Contains(DetectTwilio.NoResultMessage, run.Output);
        Assert.Contains(DetectTwilio.NoWebhookMessage, run.Output);
        Assert.Equal(HangUp, Assert.Single(run.Updates).Body.Split('&'));
        Assert.Equal("no_result", Summary(run, "outcome"));
    }

    // ---- finally -----------------------------------------------------------------------

    [Fact]
    public async Task CtrlCHangsUpTheCallStillUpAndDeletesTheKey()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            sim.Cancel();
        };

        var run = await s.RunAsync(s.Env());

        Assert.Equal(130, run.ExitCode);
        Assert.Equal(HangUp, Assert.Single(run.Updates).Body.Split('&'));
        Assert.Contains("Temporary Detection key deleted.", run.Output);
        Assert.Contains("Stopped.", run.Error);
    }

    [Fact]
    public async Task NotFoundOnTheHangUpIsNotAnError()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Update = _ => MockResponse.Json(404,
            """{"code":20404,"message":"The requested resource was not found","more_info":"https://www.twilio.com/docs/errors/20404","status":404}""");
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.WaitForUpdatesAsync();
        };

        var run = await s.RunAsync(s.Env(), wait: TimeSpan.FromSeconds(1.5));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Single(run.Updates);
        Assert.Equal("no_result", Summary(run, "outcome"));
        Assert.Contains("already ended", run.Output);
        Assert.Equal(string.Empty, run.Error);
    }

    [Fact]
    public async Task CallNotInProgressOnThePlayIsNotAnError()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Update = _ => MockResponse.Json(400,
            """{"code":21220,"message":"Call is not in-progress. Cannot redirect.","more_info":"https://www.twilio.com/docs/errors/21220","status":400}""");
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Single(run.Updates);
        Assert.Contains("already ended", run.Output);
        Assert.Equal("voicemail_on_beep", Summary(run, "outcome"));
    }

    [Fact]
    public async Task CtrlCWithNotFoundOnTheHangUpIsNotAnError()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Update = _ => MockResponse.Json(404, """{"code":20404,"message":"The requested resource was not found","status":404}""");
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            sim.Cancel();
        };

        var run = await s.RunAsync(s.Env());

        Assert.Equal(130, run.ExitCode);
        Assert.Single(run.Updates);
        Assert.DoesNotContain("Could not hang up", run.Error);
        Assert.Contains("Temporary Detection key deleted.", run.Output);
    }

    private const string KeyDeleteRefused =
        """{"type":"https://api-v2.dropcowboy.com/problems/forbidden","title":"Forbidden","status":403,"detail":"The key lacks account:write."}""";

    [Fact]
    public async Task FailedCleanupStepExitsOneAfterASuccessfulOutcome()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.KeyDelete = _ => MockResponse.Json(403, KeyDeleteRefused);
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "21");
        };

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 1, run.All);
        Assert.Equal("voicemail_on_beep", Summary(run, "outcome"));
        Assert.Contains("Could not delete the temporary Detection key", run.Error);
        Assert.Contains("A cleanup step failed", run.Error);
        Assert.DoesNotContain("Temporary Detection key deleted.", run.Output);
        Assert.Equal($"DELETE /register/public/detection-keys/{DetectTwilioScenario.CreatedKeyId}", s.Dc.Calls[^1]);
    }

    [Fact]
    public async Task FailedHangUpInCleanupExitsOne()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        var updates = 0;
        s.Update = _ => Interlocked.Increment(ref updates) == 1
            ? MockResponse.Json(200, $$"""{"sid":"{{DetectTwilioScenario.CallSid}}","status":"in-progress"}""")
            : MockResponse.Json(400, """{"code":21201,"message":"Call update refused.","status":400}""");
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
        };

        var run = await s.RunAsync(s.Env(), wait: TimeSpan.FromSeconds(1.5));

        Assert.True(run.ExitCode == 1, run.All);
        Assert.Equal("voicemail_on_beep", Summary(run, "outcome"));
        Assert.Equal(2, run.Updates.Count);
        Assert.Contains("Could not hang up the call", run.Error);
        Assert.Contains("Temporary Detection key deleted.", run.Output);
    }

    [Fact]
    public async Task CtrlCStillExits130WhenACleanupStepFails()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.KeyDelete = _ => MockResponse.Json(403, KeyDeleteRefused);
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            sim.Cancel();
        };

        var run = await s.RunAsync(s.Env());

        Assert.Equal(130, run.ExitCode);
        Assert.Contains("Could not delete the temporary Detection key", run.Error);
    }

    // ---- Secrets -----------------------------------------------------------------------

    [Fact]
    public async Task NeverPrintsTheAuthTokenSecretFullKeyOrFullAccountSid()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.FixtureAsync("detection.voicemail.json");
            await sim.FixtureAsync("detection.beep.json");
            await sim.WaitForUpdatesAsync();
            await sim.StatusAsync("completed", "21");
        };
        s.Create = _ => MockResponse.Json(201, $$"""{"sid":"{{DetectTwilioScenario.CallSid}}","account_sid":"{{DetectTwilioScenario.AccountSid}}"}""");

        var run = await s.RunAsync(s.Env());

        Assert.True(run.ExitCode == 0, run.All);
        AssertNoSecrets(run.All);
        Assert.Contains("...0001", run.All);
        Assert.Contains("...0099", run.All);
    }

    [Fact]
    public async Task TwilioErrorsDoNotLeakTheAccountSid()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Account = _ => MockResponse.Json(401, $$"""
            {"code":20003,"message":"Authenticate","more_info":"https://www.twilio.com/docs/errors/20003 /2010-04-01/Accounts/{{DetectTwilioScenario.AccountSid}}.json","status":401}
            """);

        var run = await s.RunAsync(s.Env());

        Assert.Equal(1, run.ExitCode);
        Assert.Contains("What to do: " + TwilioHints.Codes[20003], run.Error);
        AssertNoSecrets(run.All);
    }

    // ---- Settings stop before any request ------------------------------------------------

    public static TheoryData<string, string?, string> RefusedSettings => new()
    {
        { "TWILIO_ACCOUNT_SID", null, "TWILIO_ACCOUNT_SID is required" },
        { "TWILIO_AUTH_TOKEN", null, "TWILIO_AUTH_TOKEN is required" },
        { "TWILIO_FROM", null, "TWILIO_FROM is required" },
        { "DC_TO", null, "DC_TO is required" },
        { "DC_PUBLIC_URL", null, "DC_PUBLIC_URL is required" },
        { "DC_VM_AUDIO_URL", null, "Set DC_VM_AUDIO_URL" },
        { "DC_KEY", null, "DC_KEY is required with DC_SECRET" },
        { "DC_TO", "3125550142", "DC_TO must be in E.164 format" },
        { "TWILIO_FROM", "+1312555", "TWILIO_FROM must be in E.164 format" },
        { "TWILIO_ACCOUNT_SID", "AC123", "TWILIO_ACCOUNT_SID must be AC followed by 32 hexadecimal characters" },
        { "TWILIO_ACCOUNT_SID", "AC00000000000000000000000000000000",
            "TWILIO_ACCOUNT_SID=AC00000000000000000000000000000000: this is the placeholder from our fixtures; use your own." },
        { "DC_PUBLIC_URL", "http://tunnel.example.org", "DC_PUBLIC_URL must start with https://" },
        { "DC_PUBLIC_URL", "https://tunnel.example.org:8443", "port other than 443" },
        { "DC_PUBLIC_URL", "https://tunnel.example.org/?a=1", "query string or a fragment" },
        { "DC_PUBLIC_URL", "https://tunnel.example.org/#top", "query string or a fragment" },
        { "DC_PUBLIC_URL", "https://localhost", "must be a public address" },
        { "DC_PUBLIC_URL", "https://10.0.0.5", "must be a public address" },
        { "DC_VM_AUDIO_URL", "https://audio.example.net/voicemail.ogg", "DC_VM_AUDIO_URL must be a public https:// address" },
        { "DC_WAIT_SECONDS", "0", "DC_WAIT_SECONDS=0 is not allowed" },
        { "DC_WAIT_SECONDS", "59", "DC_WAIT_SECONDS must be a whole number from 60 to 600" },
        { "DC_TO", "+12125550100", "DC_TO=+12125550100: " },
        { "TWILIO_FROM", "+13125550100", "TWILIO_FROM=+13125550100: " },
        { "DC_VM_AUDIO_URL", "https://media.example.com/voicemail.mp3", "DC_VM_AUDIO_URL=https://media.example.com/voicemail.mp3: " }
    };

    [Theory]
    [MemberData(nameof(RefusedSettings))]
    public async Task RefusedSettingStopsBeforeAnyRequest(string name, string? value, string expected)
    {
        await using var s = await DetectTwilioScenario.StartAsync();

        var run = await s.RunAsync(s.Env((name, value)));

        Assert.Equal(1, run.ExitCode);
        Assert.Contains(expected, run.Error);
        Assert.Empty(s.Dc.Requests);
        Assert.Empty(s.Twilio.Requests);
    }

    [Fact]
    public async Task NoKeyOptionNamesBothOptions()
    {
        await using var s = await DetectTwilioScenario.StartAsync();

        var run = await s.RunAsync(s.Env(("DC_KEY", null), ("DC_SECRET", null)));

        Assert.Equal(1, run.ExitCode);
        Assert.Contains("DC_DETECTION_KEY", run.Error);
        Assert.Contains("DC_KEY and DC_SECRET", run.Error);
        Assert.Empty(s.Dc.Requests);
        Assert.Empty(s.Twilio.Requests);
    }

    [Fact]
    public async Task RemovedSettingsAreNoLongerRead()
    {
        await using var s = await DetectTwilioScenario.StartAsync();
        s.Script = async sim =>
        {
            await sim.AnswerAsync();
            await sim.StatusAsync("completed", "2");
        };

        var run = await s.RunAsync(s.Env(
            ("DC_DETECTION_STRATEGY", "fast"), ("DC_DETECTION_TIMEOUT_SEC", "1"),
            ("DC_BEEP_WAIT_SECONDS", "0"), ("DC_LIVE_CONFIDENCE", "high")));

        Assert.True(run.ExitCode == 0, run.All);
        Assert.Equal(string.Empty, run.Error);
        Assert.Equal(StartTwiml(DetectTwilioScenario.CreatedKey, s.Sim.CallId!, 190), s.Sim.Twiml);
    }

    // ---- Helpers -----------------------------------------------------------------------

    private static void AssertNoSecrets(string text)
    {
        Assert.DoesNotContain(DetectTwilioScenario.AuthToken, text);
        Assert.DoesNotContain(RecipeHarness.Secret, text);
        Assert.DoesNotContain(DetectTwilioScenario.CreatedKey, text);
        Assert.DoesNotContain(DetectTwilioScenario.DetectionKey, text);
        Assert.DoesNotContain(DetectTwilioScenario.AccountSid, text);
    }

    internal static string StartTwiml(string key, string callId, int pause)
    {
        return $$"""
            <?xml version="1.0" encoding="UTF-8"?>
            <Response>
              <Start>
                <Stream name="detection" url="wss://detect.dropcowboy.com/carrier/ws/twilio" track="inbound_track">
                  <Parameter name="api_key" value="{{key}}"/>
                  <Parameter name="webhook_url" value="https://tunnel.example.org/webhooks/detection"/>
                  <Parameter name="webhook_events" value="detection,beep,screening,timeout,error,close"/>
                  <Parameter name="call_id" value="{{callId}}"/>
                </Stream>
              </Start>
              <Pause length="{{pause}}"/>
              <Hangup/>
            </Response>
            """.ReplaceLineEndings("\n");
    }

    internal static List<KeyValuePair<string, string>> Form(string body)
    {
        var fields = new List<KeyValuePair<string, string>>();
        foreach (var pair in body.Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var cut = pair.IndexOf('=', StringComparison.Ordinal);
            fields.Add(new(Decode(pair[..cut]), Decode(pair[(cut + 1)..])));
        }

        return fields;
    }

    private static string Decode(string value) => Uri.UnescapeDataString(value.Replace('+', ' '));

    // The value on the summary line with this label.
    private static string Summary(DetectRun run, string label)
    {
        var start = run.Output.IndexOf("Summary:", StringComparison.Ordinal);
        Assert.True(start >= 0, run.All);
        foreach (var line in run.Output[start..].Split('\n'))
        {
            var trimmed = line.Trim();
            if (trimmed.StartsWith(label + ":", StringComparison.Ordinal))
            {
                return trimmed[(label.Length + 1)..].Trim();
            }
        }

        throw new Xunit.Sdk.XunitException($"No summary line \"{label}\" in:\n{run.All}");
    }
}
