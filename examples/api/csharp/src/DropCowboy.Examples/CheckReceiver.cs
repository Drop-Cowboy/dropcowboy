// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Posts a sample result to your endpoints the way Drop Cowboy does, and explains the
// answer. Nothing is sent to the API, and no API key is needed.
//
// - callback: an unsigned sample callback body. Drop Cowboy tries a callback once and
//   waits 10 seconds.
// - webhook: a sample contact.rvm.status event, signed with the first secret in
//   DC_WEBHOOK_SECRET and a fresh timestamp. Drop Cowboy waits 5 seconds, and
//   retries only 408, 429, 5xx and timeouts.
//
// Any answer other than 2xx means a real result would be lost or dropped, and a 404 is
// never retried. Settings > API Logs shows what your endpoint answered for real sends.
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples;

/// <summary>One of ok, route, auth, slow, unreachable, rejected, with what it means.</summary>
public sealed record ReceiverVerdict(string Verdict, bool Ok, string Explanation);

public sealed record ReceiverCheckResult(string Kind, string Url, int? Status, long ElapsedMs, string Verdict, bool Ok);

public static class CheckReceiver
{
    public const string Usage = "Usage: dotnet run -- check-receiver <callback-url> [webhook-url]";
    public static readonly TimeSpan CallbackTimeout = TimeSpan.FromSeconds(10);
    public static readonly TimeSpan WebhookTimeout = TimeSpan.FromSeconds(5);

    private const string WebApiNoAction = "No action was found on the controller";
    private const int MaxBodyCharacters = 4000;

    // The same bodies as ../fixtures/callback.rvm-success.json and
    // ../fixtures/webhook.rvm-status.json (a test keeps them in step).
    public const string SampleCallback = """
        {
          "drop_id": "b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52",
          "team_id": "3f6c2a1e-8b4d-4c7a-9e2f-5a1b3c4d6e7f",
          "session_id": "6b2e9d4a-8f1c-4a7e-9d3b-5c8f2a6e1d47",
          "log_id": "2f8c4a6e-1b9d-4e3f-a7c5-8d2b6f4e9a13",
          "contact_id": "5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d",
          "phone_number": "+13125550142",
          "caller_id": "+12125550100",
          "product_code": "rvm",
          "status": "success",
          "reason": "",
          "reason_code": 0,
          "quantity": 1,
          "product_cost": 0.04,
          "compliance_fee": 0,
          "tts_fee": 0,
          "dnc": false,
          "attempt_date": "2026-03-20T15:04:05.000Z",
          "foreign_id": "7c1e5a93-2d4b-4f68-a0b9-3e6d8c1f5a27",
          "proof_of_delivery_url": "https://api-v2.dropcowboy.com/campaign/public/receipts/i9aI2nYpHEzKX0vysXph0ZGIYphbAduqA2PRRge0ICQ"
        }
        """;

    public const string SampleWebhook = """
        {
          "event_id": "2694f968-93fd-44ca-9b92-2110ed1ee61e",
          "event": "contact.rvm.status",
          "event_at": 1774041912000,
          "data": {
            "team_id": "3f6c2a1e-8b4d-4c7a-9e2f-5a1b3c4d6e7f",
            "contact_id": "5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d",
            "drop_id": "b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52",
            "campaign_id": null,
            "campaign_type": "rvm",
            "status": "success",
            "reason": "",
            "reason_code": 0,
            "to": "+13125550142",
            "from": "+12125550100"
          }
        }
        """;

    /// <summary>Posts the sample callback (and the signed sample webhook). Returns one result per URL.</summary>
    public static async Task<IReadOnlyList<ReceiverCheckResult>> RunAsync(
        Config config,
        string[] urls,
        TextWriter output,
        CancellationToken ct,
        TimeSpan? callbackTimeout = null,
        TimeSpan? webhookTimeout = null)
    {
        if (urls.Length is < 1 or > 2)
        {
            throw new RecipeException(Usage);
        }

        var callbackUrl = urls[0];
        var webhookUrl = urls.Length > 1 ? urls[1] : null;
        CheckUrl("callback-url", callbackUrl);
        if (webhookUrl is not null)
        {
            CheckUrl("webhook-url", webhookUrl);
        }

        var secret = webhookUrl is null ? null : WebhookSecret(config);
        foreach (var url in urls)
        {
            if (!IsPublicHttps(url))
            {
                output.WriteLine($"Note: {url} is not a public https:// address. Drop Cowboy only calls public HTTPS URLs, so this checks your code, not your setup.");
            }
        }

        using var http = new HttpClient(new HttpClientHandler { AllowAutoRedirect = false }) { Timeout = Timeout.InfiniteTimeSpan };
        var callbackBody = Json.Serialize(JsonNode.Parse(SampleCallback)!);
        var results = new List<ReceiverCheckResult>
        {
            await CheckOneAsync(http, "callback", callbackUrl, callbackBody, [], callbackTimeout ?? CallbackTimeout, output, ct)
        };

        if (webhookUrl is not null)
        {
            var rawBody = FreshWebhookBody(out var eventId);
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
            output.WriteLine($"Signing the webhook with the secret ending in {Redact.Tail(secret!)}");
            var headers = new (string, string)[]
            {
                ("X-Signature", SignatureVerifier.Sign(secret!, timestamp, Encoding.UTF8.GetBytes(rawBody))),
                ("X-Timestamp", timestamp),
                ("X-Signature-Version", "v1"),
                ("X-Event-Id", eventId),
                ("X-Attempt", "1")
            };
            results.Add(await CheckOneAsync(http, "webhook", webhookUrl, rawBody, headers, webhookTimeout ?? WebhookTimeout, output, ct));
        }

        output.WriteLine(results.All(r => r.Ok) ? "All checks passed." : "Some checks failed. " + Hints.ApiLogs);
        return results;
    }

    public static ReceiverVerdict Classify(
        string kind, string url, int? status, long elapsedMs, bool timedOut, string? networkError, TimeSpan timeout, string body = "")
    {
        var seconds = (int)Math.Round(timeout.TotalSeconds);
        if (timedOut || (status is not null && elapsedMs > timeout.TotalMilliseconds))
        {
            var retry = kind == "callback"
                ? "A callback is tried once, so a slow answer loses the result."
                : "A webhook that times out is retried, at most 3 attempts in all, then dropped.";
            return new ReceiverVerdict("slow", false, $"Too slow: Drop Cowboy stops waiting after {seconds} seconds. {retry} Answer 2xx first, then do the work.");
        }

        if (networkError is not null)
        {
            return new ReceiverVerdict("unreachable", false, $"Could not connect ({networkError}). Check the server or tunnel is running, the host is public, and the URL is right.");
        }

        if (status is >= 200 and < 300)
        {
            return new ReceiverVerdict("ok", true, $"OK: your endpoint accepted the {kind}.");
        }

        if (status is 404 or 405)
        {
            var explanation = $"The route or the verb is wrong ({status}). The endpoint must accept POST at exactly this path: {PathOf(url)}. {Loss(kind, status)}";
            if (body.Contains(WebApiNoAction, StringComparison.Ordinal))
            {
                explanation += " This is ASP.NET Web API saying no action matches: mark the method [HttpPost] with [Route(\"...\")] for this exact path, and call config.MapHttpAttributeRoutes(). See the C# README.";
            }

            return new ReceiverVerdict("route", false, explanation);
        }

        if (status is 401 or 403)
        {
            var why = kind == "webhook"
                ? "The signature check is failing. Compute HMAC-SHA256 of X-Timestamp + \".\" + the raw body with the signing secret of this webhook, compare it with X-Signature in constant time, and do it before you parse the JSON. Check DC_WEBHOOK_SECRET is that secret."
                : "Callbacks carry no signature and no credentials, so an endpoint that asks for authentication refuses every callback. Let this path through without authentication, and treat the body as a hint.";
            return new ReceiverVerdict("auth", false, $"{why} ({status}) {Loss(kind, status)}");
        }

        return new ReceiverVerdict("rejected", false, $"Your endpoint answered {status}, which is not 2xx. {Loss(kind, status)}");
    }

    public static bool IsPublicHttps(string url)
    {
        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri) || uri.Scheme != Uri.UriSchemeHttps)
        {
            return false;
        }

        var host = uri.IdnHost.Trim('[', ']').ToLowerInvariant();
        if (host == "localhost" || host.EndsWith(".local", StringComparison.Ordinal))
        {
            return false;
        }

        if (!IPAddress.TryParse(host, out var address))
        {
            return true;
        }

        if (IPAddress.IsLoopback(address) || address.IsIPv6LinkLocal)
        {
            return false;
        }

        if (address.AddressFamily != AddressFamily.InterNetwork)
        {
            return true;
        }

        var b = address.GetAddressBytes();
        return !(b[0] == 10 || (b[0] == 172 && b[1] >= 16 && b[1] <= 31) || (b[0] == 192 && b[1] == 168) || (b[0] == 169 && b[1] == 254));
    }

    private static string Loss(string kind, int? status)
    {
        if (kind == "webhook" && status is 408 or 429 or >= 500)
        {
            return $"A webhook answered with {status} is retried, at most 3 attempts in all, then dropped.";
        }

        return kind == "webhook"
            ? $"A webhook answered with {status} is not retried, so the event is lost."
            : "A callback is not retried, so that result is lost.";
    }

    // One POST, no retries and no redirects, like Drop Cowboy.
    private static async Task<ReceiverCheckResult> CheckOneAsync(
        HttpClient http, string kind, string url, string rawBody, (string Name, string Value)[] headers,
        TimeSpan timeout, TextWriter output, CancellationToken ct)
    {
        using var request = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(rawBody, Encoding.UTF8, "application/json")
        };
        foreach (var (name, value) in headers)
        {
            request.Headers.TryAddWithoutValidation(name, value);
        }

        using var deadline = CancellationTokenSource.CreateLinkedTokenSource(ct);
        deadline.CancelAfter(timeout);

        var watch = Stopwatch.StartNew();
        int? status = null;
        var body = string.Empty;
        var timedOut = false;
        string? networkError = null;
        try
        {
            using var response = await http.SendAsync(request, deadline.Token);
            status = (int)response.StatusCode;
            var text = await response.Content.ReadAsStringAsync(deadline.Token);
            body = text.Length > MaxBodyCharacters ? text[..MaxBodyCharacters] : text;
        }
        catch (OperationCanceledException) when (!ct.IsCancellationRequested)
        {
            timedOut = true;
        }
        catch (HttpRequestException ex)
        {
            networkError = ex.HttpRequestError.ToString();
        }

        var elapsed = watch.ElapsedMilliseconds;
        var verdict = Classify(kind, url, status, elapsed, timedOut, networkError, timeout, body);
        var shown = status?.ToString() ?? (timedOut ? "no answer (timeout)" : "no answer");
        output.WriteLine($"{kind} {url}");
        output.WriteLine($"  answered: {shown} in {elapsed} ms");
        output.WriteLine($"  {verdict.Explanation}");
        return new ReceiverCheckResult(kind, url, status, elapsed, verdict.Verdict, verdict.Ok);
    }

    // A fresh event_id and event_at, so a receiver that drops repeated event ids still handles this one.
    private static string FreshWebhookBody(out string eventId)
    {
        var body = (JsonObject)JsonNode.Parse(SampleWebhook)!;
        eventId = Guid.NewGuid().ToString();
        body["event_id"] = eventId;
        body["event_at"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        return Json.Serialize(body);
    }

    private static string WebhookSecret(Config config)
    {
        return config.GetList("DC_WEBHOOK_SECRET").FirstOrDefault()
            ?? throw new RecipeException("Set DC_WEBHOOK_SECRET to the signing secret of your webhook, so the sample webhook is signed the way your endpoint expects.");
    }

    private static void CheckUrl(string name, string value)
    {
        var valid = Uri.TryCreate(value, UriKind.Absolute, out var uri)
            && (uri.Scheme == Uri.UriSchemeHttps || uri.Scheme == Uri.UriSchemeHttp);
        if (!valid)
        {
            throw new RecipeException($"{name} must be a full http:// or https:// URL, for example https://abc123.example.com/callbacks/dropcowboy");
        }

        if (SampleValues.IsSample(value))
        {
            throw new RecipeException(SampleValues.Describe(name, value));
        }
    }

    private static string PathOf(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out var uri) ? uri.AbsolutePath : url;
    }
}
