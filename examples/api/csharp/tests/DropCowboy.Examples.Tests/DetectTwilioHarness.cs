using System.Text;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;
using DropCowboy.Examples.Recipes;

namespace DropCowboy.Examples.Tests;

public sealed record DetectRun(int ExitCode, string Output, string Error, DetectTwilioScenario Scenario)
{
    public string All => Output + Error;

    public IReadOnlyList<RecordedRequest> Updates => Scenario.Updates;
}

/// <summary>
/// One detect-twilio run against a mock Drop Cowboy API and a mock Twilio API, both on
/// ephemeral ports. When the recipe creates the call, Script runs as the far end: it
/// drives the recipe's receiver over real HTTP with requests signed for DC_PUBLIC_URL,
/// exactly as Twilio and Detection would sign them behind a tunnel.
/// </summary>
public sealed partial class DetectTwilioScenario : IAsyncDisposable
{
    // Not the all-zero fixture placeholder, which the recipe refuses.
    public const string AccountSid = "AC00000000000000000000000000000001";
    public const string CallSid = "CA00000000000000000000000000000001";
    public const string From = "+13125550147";
    public const string To = "+13125550142";
    public const string PublicUrl = "https://tunnel.example.org";
    public const string AudioUrl = "https://audio.example.net/voicemail.mp3";
    public const string LeftoverKeyId = "6f2c9a4e-8b1d-4e7a-9c35-1a8e4d7b2f60";
    public const string OtherKeyId = "b3e7d1a9-5c2f-4b86-8e4a-7d1c9f3b6a25";
    public const string CreatedKeyId = "2d8f4b1e-7a3c-4e95-b6d2-9c1a5e8f3b47";
    public const string CreatedKey = "test-detection-key-not-a-real-credential-0099";
    public const string KeysPath = "/register/public/detection-keys";

    public static readonly string AuthToken = TwilioVector()["auth_token"]!.GetValue<string>();
    public static readonly string DetectionKey = DetectionVector()["detection_key"]!.GetValue<string>();
    public static readonly string AccountPath = "/2010-04-01/Accounts/" + AccountSid;
    public static readonly string UpdatePath = AccountPath + "/Calls/" + CallSid + ".json";

    private Task? _script;

    private DetectTwilioScenario(MockApi dc, MockApi twilio, string receiverUrl, string port)
    {
        Dc = dc;
        Twilio = twilio;
        ReceiverUrl = receiverUrl;
        Port = port;
        Sim = new CallSim(this);
    }

    public MockApi Dc { get; }

    public MockApi Twilio { get; }

    public string ReceiverUrl { get; }

    public string Port { get; }

    public CallSim Sim { get; }

    public CancellationTokenSource Cts { get; } = new(TimeSpan.FromSeconds(45));

    /// <summary>The far end of the call. Runs once the recipe has created the call.</summary>
    public Func<CallSim, Task>? Script { get; set; }

    public Func<RecordedRequest, MockResponse> KeyList { get; set; } = _ => MockResponse.Json(200,
        $$"""{"data":[{"key_id":"{{LeftoverKeyId}}","name":"{{DetectTwilio.TemporaryKeyName}}"},{"key_id":"{{OtherKeyId}}","name":"Production key"}]}""");

    public Func<RecordedRequest, MockResponse> KeyCreate { get; set; } = _ => MockResponse.Json(201, RecipeHarness.Wrap(
        $$"""{"key_id":"{{CreatedKeyId}}","name":"{{DetectTwilio.TemporaryKeyName}}","api_key":"{{CreatedKey}}"}"""));

    public Func<RecordedRequest, MockResponse> KeyDelete { get; set; } = _ => MockResponse.Json(200, "{}");

    public Func<RecordedRequest, MockResponse> Account { get; set; } = _ => MockResponse.Json(200,
        $$"""{"sid":"{{AccountSid}}","type":"Full","status":"active"}""");

    public Func<RecordedRequest, MockResponse> Incoming { get; set; } = _ => MockResponse.Json(200,
        $$"""{"incoming_phone_numbers":[{"phone_number":"{{From}}"}]}""");

    public Func<RecordedRequest, MockResponse> CallerIds { get; set; } = _ => MockResponse.Json(200, """{"outgoing_caller_ids":[]}""");

    public Func<RecordedRequest, MockResponse> Create { get; set; } = _ => MockResponse.Json(201,
        $$"""{"sid":"{{CallSid}}","status":"queued"}""");

    public Func<RecordedRequest, MockResponse> Update { get; set; } = _ => MockResponse.Json(200,
        $$"""{"sid":"{{CallSid}}","status":"in-progress"}""");

    public IReadOnlyList<RecordedRequest> Updates => Twilio.Requests.Where(r => r.Method == "POST" && r.Path == UpdatePath).ToArray();

    public static async Task<DetectTwilioScenario> StartAsync()
    {
        var dc = await MockApi.StartAsync();
        var twilio = await MockApi.StartAsync();
        var (receiverUrl, port) = RecipeHarness.FreeReceiver();
        var scenario = new DetectTwilioScenario(dc, twilio, receiverUrl, port);

        dc.Handle("GET", KeysPath, r => Task.FromResult(scenario.KeyList(r)));
        dc.Handle("POST", KeysPath, r => Task.FromResult(scenario.KeyCreate(r)));
        dc.Reply("DELETE", $"{KeysPath}/{LeftoverKeyId}", 200, "{}");
        dc.Handle("DELETE", $"{KeysPath}/{CreatedKeyId}", r => Task.FromResult(scenario.KeyDelete(r)));

        twilio.Handle("GET", AccountPath + ".json", r => Task.FromResult(scenario.Account(r)));
        twilio.Handle("GET", AccountPath + "/IncomingPhoneNumbers.json", r => Task.FromResult(scenario.Incoming(r)));
        twilio.Handle("GET", AccountPath + "/OutgoingCallerIds.json", r => Task.FromResult(scenario.CallerIds(r)));
        twilio.Handle("POST", AccountPath + "/Calls.json", r => Task.FromResult(scenario.OnCreate(r)));
        twilio.Handle("POST", UpdatePath, r => Task.FromResult(scenario.Update(r)));
        return scenario;
    }

    public Dictionary<string, string> Env(params (string Name, string? Value)[] overrides)
    {
        var env = new Dictionary<string, string>
        {
            ["TWILIO_ACCOUNT_SID"] = AccountSid,
            ["TWILIO_AUTH_TOKEN"] = AuthToken,
            ["TWILIO_FROM"] = From,
            ["TWILIO_BASE_URL"] = Twilio.BaseUrl,
            ["DC_TO"] = To,
            ["DC_PUBLIC_URL"] = PublicUrl,
            ["DC_KEY"] = RecipeHarness.Key,
            ["DC_SECRET"] = RecipeHarness.Secret,
            ["DC_BASE_URL"] = Dc.BaseUrl,
            ["DC_VM_AUDIO_URL"] = AudioUrl,
            ["PORT"] = Port
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

    /// <summary>Where the tunnel check goes. The receiver itself unless a test points it elsewhere.</summary>
    public string? HealthUrl { get; set; }

    /// <summary>The key Detection signs with: DC_DETECTION_KEY when set, else the temporary key.</summary>
    public string SigningKey { get; set; } = CreatedKey;

    public async Task<DetectRun> RunAsync(Dictionary<string, string> env, TimeSpan? wait = null)
    {
        if (env.TryGetValue("DC_DETECTION_KEY", out var configured))
        {
            SigningKey = configured;
        }

        var output = new StringWriter();
        var error = new StringWriter();
        var options = new DetectTwilioOptions
        {
            Wait = wait ?? TimeSpan.FromSeconds(15),
            HealthCheckUrl = HealthUrl ?? ReceiverUrl + "/health",
            RetryBaseDelay = TimeSpan.FromMilliseconds(5)
        };

        var exitCode = await Cli.RunAsync(
            ["detect-twilio"], new Config(env), TextWriter.Synchronized(output), TextWriter.Synchronized(error), Cts.Token,
            detectOptions: options);

        if (_script is not null)
        {
            await _script.WaitAsync(TimeSpan.FromSeconds(20));
        }

        return new DetectRun(exitCode, output.ToString(), error.ToString(), this);
    }

    public async ValueTask DisposeAsync()
    {
        Cts.Dispose();
        await Dc.DisposeAsync();
        await Twilio.DisposeAsync();
    }

    public static JsonNode TwilioVector() => JsonNode.Parse(Fixtures.Read("twilio-signature-vectors.json"))!;

    public static JsonNode DetectionVector() => JsonNode.Parse(Fixtures.Read("detection-signature-vectors.json"))!;

    // Twilio answers the create request first and calls the receiver afterwards, so the
    // far end starts only after this response is on its way.
    private MockResponse OnCreate(RecordedRequest request)
    {
        var response = Create(request);
        if (response.Status == 201 && Script is { } script)
        {
            _script = Task.Run(() => script(Sim));
        }

        return response;
    }
}

/// <summary>Plays Twilio and Detection against the recipe's receiver.</summary>
public sealed partial class CallSim(DetectTwilioScenario scenario)
{
    private static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(10) };

    public string? CallId { get; private set; }

    public string? Twiml { get; private set; }

    [GeneratedRegex("name=\"call_id\" value=\"([^\"]+)\"")]
    private static partial Regex CallIdParameter();

    /// <summary>
    /// Twilio fetches the TwiML when the call is answered. The recipe learns the CallSid from
    /// the create response, which can land a moment after this, so retry a refused fetch briefly.
    /// </summary>
    public async Task<string> AnswerAsync()
    {
        var deadline = DateTime.UtcNow + TimeSpan.FromSeconds(5);
        while (true)
        {
            using var response = await PostTwilioAsync(DetectionReceiver.VoicePath, VoiceParams());
            if ((int)response.StatusCode == 200)
            {
                Twiml = await response.Content.ReadAsStringAsync();
                CallId = CallIdParameter().Match(Twiml).Groups[1].Value;
                return Twiml;
            }

            if (DateTime.UtcNow > deadline)
            {
                throw new InvalidOperationException($"The receiver refused the TwiML fetch with {(int)response.StatusCode}.");
            }

            await Task.Delay(20);
        }
    }

    public static List<KeyValuePair<string, string>> VoiceParams(string callSid = DetectTwilioScenario.CallSid)
    {
        return
        [
            new("AccountSid", DetectTwilioScenario.AccountSid),
            new("ApiVersion", "2010-04-01"),
            new("CallSid", callSid),
            new("CallStatus", "in-progress"),
            new("Direction", "outbound-api"),
            new("From", DetectTwilioScenario.From),
            new("To", DetectTwilioScenario.To)
        ];
    }

    /// <summary>The status callback fixture with this status (and duration) swapped in.</summary>
    public static List<KeyValuePair<string, string>> StatusParams(string status, string? duration, string callSid = DetectTwilioScenario.CallSid)
    {
        var fixture = JsonNode.Parse(Fixtures.Read("twilio.status-completed.json"))!.AsObject();
        var fields = new List<KeyValuePair<string, string>>();
        foreach (var (name, value) in fixture)
        {
            var text = value!.GetValue<string>();
            text = name switch
            {
                "AccountSid" => DetectTwilioScenario.AccountSid,
                "CallSid" => callSid,
                "CallStatus" => status,
                _ => text
            };
            if (name == "CallDuration" && duration is null)
            {
                continue;
            }

            fields.Add(new(name, name == "CallDuration" ? duration! : text));
        }

        return fields;
    }

    public async Task StatusAsync(string status, string? duration = null)
    {
        using var response = await PostTwilioAsync(DetectionReceiver.StatusPath, StatusParams(status, duration));
        Assert.Equal(200, (int)response.StatusCode);
    }

    public async Task<HttpResponseMessage> PostTwilioAsync(
        string path, List<KeyValuePair<string, string>> fields, string? signature = null, string? token = null)
    {
        using var message = new HttpRequestMessage(HttpMethod.Post, scenario.ReceiverUrl + path)
        {
            Content = new FormUrlEncodedContent(fields)
        };
        message.Headers.Add(
            TwilioSignature.Header,
            signature ?? TwilioSignature.Compute(token ?? DetectTwilioScenario.AuthToken, DetectTwilioScenario.PublicUrl + path, fields));
        return await Http.SendAsync(message);
    }

    /// <summary>A Detection fixture with this run's call_id swapped in, posted signed.</summary>
    public async Task FixtureAsync(string fixtureName, string? callId = null)
    {
        var body = JsonNode.Parse(Fixtures.Read(fixtureName))!.AsObject();
        body["call_id"] = callId ?? CallId;
        await PostDetectionAsync(body);
    }

    /// <summary>A Detection event built like the fixtures, with this run's call_id.</summary>
    public async Task EventAsync(string name, JsonObject data)
    {
        var body = JsonNode.Parse(Fixtures.Read("detection.voicemail.json"))!.AsObject();
        body["event"] = name;
        body["call_id"] = CallId;
        body["data"] = data;
        await PostDetectionAsync(body);
    }

    public async Task PostDetectionAsync(JsonObject body)
    {
        var raw = body.ToJsonString();
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString(System.Globalization.CultureInfo.InvariantCulture);
        using var message = new HttpRequestMessage(HttpMethod.Post, scenario.ReceiverUrl + DetectionReceiver.DetectionPath)
        {
            Content = new StringContent(raw, Encoding.UTF8, "application/json")
        };
        message.Headers.Add("X-Signature", DetectionSignature.Sign(scenario.SigningKey, timestamp, Encoding.UTF8.GetBytes(raw)));
        message.Headers.Add("X-Timestamp", timestamp);
        message.Headers.Add("X-Event", body["event"]?.GetValue<string>() ?? "detection");
        message.Headers.Add("X-Source", "twilio");
        using var response = await Http.SendAsync(message);
        Assert.Equal(200, (int)response.StatusCode);
    }

    /// <summary>Waits until the recipe has sent this many updates to the call.</summary>
    public async Task WaitForUpdatesAsync(int count = 1)
    {
        var deadline = DateTime.UtcNow + TimeSpan.FromSeconds(10);
        while (scenario.Updates.Count < count)
        {
            if (DateTime.UtcNow > deadline)
            {
                throw new InvalidOperationException($"The recipe sent {scenario.Updates.Count} call updates, expected {count}.");
            }

            await Task.Delay(10);
        }
    }

    public void Cancel() => scenario.Cts.Cancel();
}
