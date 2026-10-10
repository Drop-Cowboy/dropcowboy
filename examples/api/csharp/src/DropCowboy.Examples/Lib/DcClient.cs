using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Lib;

/// <summary>
/// A thin HTTP client for the Drop Cowboy API. It signs every request with the
/// x-key and x-secret headers, speaks JSON, and turns a non-2xx answer into a DcError.
/// </summary>
public sealed class DcClient : IDisposable
{
    private const int MaxGetAttempts = 3;
    private static readonly TimeSpan RequestTimeout = TimeSpan.FromSeconds(30);
    private static readonly TimeSpan MaxRetryDelay = TimeSpan.FromSeconds(30);

    private readonly HttpClient _http;
    private readonly string _key;
    private readonly string _secret;

    public DcClient(string baseUrl, string key, string secret, TimeSpan? retryBaseDelay = null)
    {
        _http = new HttpClient { BaseAddress = new Uri(baseUrl), Timeout = RequestTimeout };
        _key = key;
        _secret = secret;
        RetryBaseDelay = retryBaseDelay ?? TimeSpan.FromMilliseconds(500);
    }

    public TimeSpan RetryBaseDelay { get; }

    public static DcClient FromConfig(Config config)
    {
        return new DcClient(
            config.BaseUrl,
            config.Require("DC_KEY", "Create an API key in the dashboard, then set DC_KEY and DC_SECRET."),
            config.Require("DC_SECRET", "Set it together with DC_KEY."));
    }

    /// <summary>
    /// GET with up to 3 tries on 429 and 5xx. Reads are safe to repeat. Writes are not,
    /// so Post never retries on its own.
    /// </summary>
    public async Task<JsonNode?> GetAsync(string path, CancellationToken ct)
    {
        for (var attempt = 1; ; attempt++)
        {
            var response = await SendOnceAsync(HttpMethod.Get, path, null, null, ct);
            var retryable = response.Status == 429 || response.Status >= 500;
            if (retryable && attempt < MaxGetAttempts)
            {
                await Task.Delay(RetryDelay(response, attempt), ct);
                continue;
            }

            return response.ToJsonOrThrow();
        }
    }

    public async Task<JsonNode?> PostAsync(string path, JsonNode body, CancellationToken ct, string? idempotencyKey = null)
    {
        var response = await SendOnceAsync(HttpMethod.Post, path, body, idempotencyKey, ct);
        return response.ToJsonOrThrow();
    }

    /// <summary>PUT once. Like any write, it is never retried here.</summary>
    public async Task<JsonNode?> PutAsync(string path, JsonNode body, CancellationToken ct)
    {
        var response = await SendOnceAsync(HttpMethod.Put, path, body, null, ct);
        return response.ToJsonOrThrow();
    }

    /// <summary>DELETE once. Like a write, it is never retried here.</summary>
    public async Task<JsonNode?> DeleteAsync(string path, CancellationToken ct)
    {
        var response = await SendOnceAsync(HttpMethod.Delete, path, null, null, ct);
        return response.ToJsonOrThrow();
    }

    /// <summary>
    /// POST /rvm. The Idempotency-Key lets you repeat this exact request after a timeout
    /// without sending twice, so a new key means a new send. This example does not retry.
    /// Answers 202 with { "status": "queued", "message_id": "..." } and no data envelope.
    /// </summary>
    public async Task<string?> SendRvmAsync(JsonObject body, CancellationToken ct)
    {
        var accepted = await PostAsync("/rvm", body, ct, NewIdempotencyKey());
        return Json.String(accepted, "message_id");
    }

    public static string NewIdempotencyKey() => Guid.NewGuid().ToString();

    public void Dispose() => _http.Dispose();

    private async Task<ApiResponse> SendOnceAsync(
        HttpMethod method, string path, JsonNode? body, string? idempotencyKey, CancellationToken ct)
    {
        using var request = new HttpRequestMessage(method, path);
        request.Headers.TryAddWithoutValidation("x-key", _key);
        request.Headers.TryAddWithoutValidation("x-secret", _secret);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        if (idempotencyKey is not null)
        {
            request.Headers.TryAddWithoutValidation("Idempotency-Key", idempotencyKey);
        }

        if (body is not null)
        {
            request.Content = new StringContent(Json.Serialize(body), Encoding.UTF8, "application/json");
        }

        try
        {
            using var response = await _http.SendAsync(request, ct);
            var text = await response.Content.ReadAsStringAsync(ct);
            return new ApiResponse(
                (int)response.StatusCode,
                text,
                HeaderValue(response, "x-request-id"),
                response.Headers.RetryAfter);
        }
        catch (HttpRequestException ex)
        {
            throw DcError.Network(ex.Message);
        }
        catch (TaskCanceledException) when (!ct.IsCancellationRequested)
        {
            throw DcError.Network($"The request timed out after {RequestTimeout.TotalSeconds:0} seconds.");
        }
    }

    private TimeSpan RetryDelay(ApiResponse response, int attempt)
    {
        var wanted = RetryAfterDelay(response.RetryAfter) ?? TimeSpan.FromTicks(RetryBaseDelay.Ticks << (attempt - 1));
        if (wanted < TimeSpan.Zero)
        {
            return TimeSpan.Zero;
        }

        return wanted > MaxRetryDelay ? MaxRetryDelay : wanted;
    }

    // Retry-After is either a number of seconds or an HTTP date.
    private static TimeSpan? RetryAfterDelay(RetryConditionHeaderValue? header)
    {
        if (header?.Delta is { } delta)
        {
            return delta;
        }

        return header?.Date is { } date ? date - DateTimeOffset.UtcNow : null;
    }

    private static string? HeaderValue(HttpResponseMessage response, string name)
    {
        return response.Headers.TryGetValues(name, out var values) ? values.FirstOrDefault() : null;
    }

    private sealed record ApiResponse(int Status, string BodyText, string? RequestId, RetryConditionHeaderValue? RetryAfter)
    {
        public JsonNode? ToJsonOrThrow()
        {
            if (Status is >= 200 and < 300)
            {
                return Json.Parse(BodyText);
            }

            throw DcError.FromResponse(Status, BodyText, RequestId);
        }
    }
}
