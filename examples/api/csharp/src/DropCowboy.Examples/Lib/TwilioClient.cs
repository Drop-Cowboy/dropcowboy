using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Lib;

/// <summary>
/// A thin client for the Twilio REST API over plain HTTPS, with no Twilio SDK. Basic auth
/// with the Account SID and Auth Token, form-encoded bodies, JSON answers. GETs retry 429
/// and 5xx like DcClient; POSTs never retry, because placing a call twice is worse than
/// placing it once.
/// </summary>
public sealed class TwilioClient : IDisposable
{
    public const string DefaultBaseUrl = "https://api.twilio.com";

    private const int MaxGetAttempts = 3;
    private static readonly TimeSpan RequestTimeout = TimeSpan.FromSeconds(30);
    private static readonly TimeSpan MaxRetryDelay = TimeSpan.FromSeconds(30);

    private readonly HttpClient _http;
    private readonly string _accountSid;
    private readonly AuthenticationHeaderValue _authorization;
    private readonly TimeSpan _retryBaseDelay;

    public TwilioClient(string baseUrl, string accountSid, string authToken, TimeSpan? retryBaseDelay = null)
    {
        _http = new HttpClient { BaseAddress = new Uri(baseUrl), Timeout = RequestTimeout };
        _accountSid = accountSid;
        _authorization = new AuthenticationHeaderValue(
            "Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes(accountSid + ":" + authToken)));
        _retryBaseDelay = retryBaseDelay ?? TimeSpan.FromMilliseconds(500);
    }

    /// <summary>The account's base path, /2010-04-01/Accounts/{AccountSid}.</summary>
    public string AccountPath => "/2010-04-01/Accounts/" + _accountSid;

    public async Task<JsonNode?> GetAsync(string path, CancellationToken ct)
    {
        for (var attempt = 1; ; attempt++)
        {
            var response = await SendOnceAsync(HttpMethod.Get, path, null, ct);
            var retryable = response.Status == 429 || response.Status >= 500;
            if (retryable && attempt < MaxGetAttempts)
            {
                await Task.Delay(RetryDelay(response.RetryAfter, attempt), ct);
                continue;
            }

            return response.ToJsonOrThrow(_accountSid);
        }
    }

    /// <summary>POST a form once. Never retried.</summary>
    public async Task<JsonNode?> PostFormAsync(string path, IEnumerable<KeyValuePair<string, string>> form, CancellationToken ct)
    {
        var response = await SendOnceAsync(HttpMethod.Post, path, new FormUrlEncodedContent(form), ct);
        return response.ToJsonOrThrow(_accountSid);
    }

    public void Dispose() => _http.Dispose();

    private async Task<TwilioResponse> SendOnceAsync(HttpMethod method, string path, HttpContent? content, CancellationToken ct)
    {
        using var request = new HttpRequestMessage(method, path) { Content = content };
        request.Headers.Authorization = _authorization;
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        try
        {
            using var response = await _http.SendAsync(request, ct);
            var text = await response.Content.ReadAsStringAsync(ct);
            return new TwilioResponse((int)response.StatusCode, text, response.Headers.RetryAfter);
        }
        catch (HttpRequestException ex)
        {
            throw TwilioError.Network(ex.Message, _accountSid);
        }
        catch (TaskCanceledException) when (!ct.IsCancellationRequested)
        {
            throw TwilioError.Network($"The request timed out after {RequestTimeout.TotalSeconds:0} seconds.", _accountSid);
        }
    }

    private TimeSpan RetryDelay(RetryConditionHeaderValue? retryAfter, int attempt)
    {
        var wanted = retryAfter?.Delta
            ?? (retryAfter?.Date is { } date ? date - DateTimeOffset.UtcNow : (TimeSpan?)null)
            ?? TimeSpan.FromTicks(_retryBaseDelay.Ticks << (attempt - 1));
        if (wanted < TimeSpan.Zero)
        {
            return TimeSpan.Zero;
        }

        return wanted > MaxRetryDelay ? MaxRetryDelay : wanted;
    }

    private sealed record TwilioResponse(int Status, string BodyText, RetryConditionHeaderValue? RetryAfter)
    {
        public JsonNode? ToJsonOrThrow(string accountSid)
        {
            if (Status is >= 200 and < 300)
            {
                return Json.Parse(BodyText);
            }

            throw TwilioError.FromResponse(Status, BodyText, accountSid);
        }
    }
}

/// <summary>
/// A non-2xx answer from Twilio, or a failure to reach it (Status 0). Twilio errors are
/// { code, message, more_info, status }. It never holds request headers or the Auth Token,
/// and it shows the Account SID only as its last 4 characters.
/// </summary>
public sealed class TwilioError : Exception
{
    private TwilioError(int status, int? code, string? twilioMessage, string? moreInfo)
        : base(Summarize(status, code, twilioMessage))
    {
        Status = status;
        Code = code;
        TwilioMessage = twilioMessage;
        MoreInfo = moreInfo;
    }

    public int Status { get; }

    public int? Code { get; }

    public string? TwilioMessage { get; }

    public string? MoreInfo { get; }

    /// <summary>A 404, or error 21220, on a call update means the call has already ended.</summary>
    public bool CallAlreadyEnded => Status == 404 || Code == 21220;

    public static TwilioError FromResponse(int status, string bodyText, string accountSid)
    {
        var body = Json.Parse(bodyText);
        var message = Json.String(body, "message") ?? (body is null && bodyText.Length > 0 ? bodyText : null);
        return new TwilioError(status, Json.Int(body, "code"), Scrub(message, accountSid), Scrub(Json.String(body, "more_info"), accountSid));
    }

    public static TwilioError Network(string message, string accountSid) => new(0, null, Scrub(message, accountSid), null);

    public IReadOnlyList<string> Report()
    {
        var lines = new List<string> { Status == 0 ? "Could not reach Twilio." : $"Twilio answered HTTP {Status}." };
        if (Code is not null)
        {
            lines.Add($"  code:      {Code}");
        }

        if (TwilioMessage is not null)
        {
            lines.Add($"  message:   {TwilioMessage}");
        }

        if (MoreInfo is not null)
        {
            lines.Add($"  more_info: {MoreInfo}");
        }

        if (TwilioHints.ForCode(Code) is { } hint)
        {
            lines.Add("What to do: " + hint);
        }

        return lines;
    }

    // Twilio's messages can quote the request path, which holds the Account SID.
    private static string? Scrub(string? text, string accountSid)
    {
        if (text is null)
        {
            return null;
        }

        var scrubbed = accountSid.Length > 0 ? text.Replace(accountSid, Redact.Tail(accountSid), StringComparison.Ordinal) : text;
        return Redact.Safe(scrubbed, 300);
    }

    private static string Summarize(int status, int? code, string? message)
    {
        if (status == 0)
        {
            return message ?? "network error";
        }

        var codePart = code is null ? string.Empty : $" (code {code})";
        return $"Twilio answered HTTP {status}{codePart}: {message ?? "request failed"}";
    }
}

/// <summary>What to do for the Twilio errors a first run hits most.</summary>
public static class TwilioHints
{
    public static readonly IReadOnlyDictionary<int, string> Codes = new Dictionary<int, string>
    {
        [21210] = "TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.",
        [21212] = "TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.",
        [21215] = "Twilio's Voice geographic permissions block calls to this country. Enable it in the Twilio Console.",
        [21219] = "Trial accounts can call only verified numbers. Upgrade the Twilio account to run this recipe.",
        [20003] = "Twilio rejected TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN."
    };

    public static string? ForCode(int? code)
    {
        return code is { } value && Codes.TryGetValue(value, out var hint) ? hint : null;
    }
}
