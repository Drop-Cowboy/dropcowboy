using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Tests;

public sealed record RunResult(int ExitCode, string Output, string Error, MockApi Api)
{
    public IReadOnlyList<string> Calls => Api.Calls;

    public RecordedRequest Single(string method, string path)
    {
        return Assert.Single(Api.Requests, r => r.Method == method && r.Path == path);
    }

    public JsonObject RvmBody() => (JsonObject)Single("POST", "/rvm").Json!;
}

/// <summary>Runs the real command line against a mock API and captures everything it prints.</summary>
public static class RecipeHarness
{
    public const string Key = "test-key-5e2a";
    public const string Secret = "test-secret-do-not-print-9f3c";
    public const string RecipientNumber = "+13125550142";
    public const string LineId = "9d4e2a7c-6b1f-4c83-a5e9-3f7b1d8c2e46";
    public const string MediaId = "4c8a1e6f-3d92-4b7a-8f05-6e2d9a1c7b34";
    public const string VoiceId = "8b5e2d9f-4c1a-4f76-9e3b-6a0d8c2f5e17";
    public const string MessageId = "a1f7c3e9-5d2b-4a86-9c40-8e6b2d1f7a35";

    public static Dictionary<string, string> Env(MockApi api, params (string Name, string? Value)[] overrides)
    {
        var env = new Dictionary<string, string>
        {
            ["DC_KEY"] = Key,
            ["DC_SECRET"] = Secret,
            ["DC_BASE_URL"] = api.BaseUrl,
            ["DC_TO"] = RecipientNumber,
            ["DC_WEBHOOK_SECRET"] = Fixtures.Vector().Secret,
            ["DC_WAIT_SECONDS"] = "10"
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

    public static async Task<RunResult> RunAsync(
        MockApi api, Dictionary<string, string> env, params string[] args)
    {
        var output = new StringWriter();
        var error = new StringWriter();
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(60));

        var exitCode = await Cli.RunAsync(
            args,
            new Config(env),
            TextWriter.Synchronized(output),
            TextWriter.Synchronized(error),
            cts.Token,
            pollInterval: TimeSpan.FromMilliseconds(10),
            pollTimeout: TimeSpan.FromSeconds(5));

        return new RunResult(exitCode, output.ToString(), error.ToString(), api);
    }

    public static (string PublicUrl, string Port) FreeReceiver()
    {
        var listener = new TcpListener(IPAddress.Loopback, 0);
        listener.Start();
        var port = ((IPEndPoint)listener.LocalEndpoint).Port;
        listener.Stop();
        return ($"http://127.0.0.1:{port}", port.ToString());
    }

    public static string Wrap(string dataJson)
    {
        return "{\"data\":" + dataJson + ",\"meta\":{\"request_id\":\"c2a6e8f4-3b9d-4c1e-8a7f-5d3b1e9c6a24\"}}";
    }

    public static string QueuedJson => $$"""{"status":"queued","message_id":"{{MessageId}}"}""";

    /// <summary>
    /// Answers POST /rvm with 202 and, before answering, POSTs the outcome to the callback_url
    /// the send carried. That makes the callback path deterministic in a test.
    /// </summary>
    public static Func<RecordedRequest, Task<MockResponse>> AcceptThenCallBack(
        string status = "success", string reason = "", int reasonCode = 0, string callerId = "+12125550100")
    {
        return async request =>
        {
            var body = (JsonObject)request.Json!;
            if (body["callback_url"]?.GetValue<string>() is { } url)
            {
                var callback = new JsonObject
                {
                    ["phone_number"] = body["to"]?.GetValue<string>(),
                    ["caller_id"] = callerId,
                    ["status"] = status,
                    ["reason"] = reason,
                    ["reason_code"] = reasonCode,
                    ["foreign_id"] = body["foreign_id"]?.GetValue<string>(),
                    ["proof_of_delivery_url"] = "https://api-v2.dropcowboy.com/campaign/public/receipts/MmEX1fWLLQRmf68M1Yg82jkHN3-P7y8VyDxXhnyHA50"
                };
                using var http = new HttpClient();
                await http.PostAsync(url, new StringContent(callback.ToJsonString(), Encoding.UTF8, "application/json"));
            }

            return MockResponse.Json(202, QueuedJson);
        };
    }

    /// <summary>Answers POST /rvm with 202 and then POSTs a signed contact.rvm.status webhook to the receiver.</summary>
    public static Func<RecordedRequest, Task<MockResponse>> AcceptThenWebhook(string receiverUrl, string secret, string status = "success")
    {
        return async request =>
        {
            var body = (JsonObject)request.Json!;
            var envelope = new JsonObject
            {
                ["event_id"] = "2694f968-93fd-44ca-9b92-2110ed1ee61e",
                ["event"] = "contact.rvm.status",
                ["event_at"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
                ["data"] = new JsonObject
                {
                    ["status"] = status,
                    ["reason"] = "",
                    ["reason_code"] = 0,
                    ["to"] = body["to"]?.GetValue<string>(),
                    ["from"] = "+12125550100"
                }
            };
            var raw = envelope.ToJsonString();
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

            using var http = new HttpClient();
            using var message = new HttpRequestMessage(HttpMethod.Post, receiverUrl + "/webhooks/dropcowboy")
            {
                Content = new StringContent(raw, Encoding.UTF8, "application/json")
            };
            message.Headers.Add("X-Signature", SignatureVerifier.Sign(secret, timestamp, Encoding.UTF8.GetBytes(raw)));
            message.Headers.Add("X-Timestamp", timestamp);
            await http.SendAsync(message);

            return MockResponse.Json(202, QueuedJson);
        };
    }
}
