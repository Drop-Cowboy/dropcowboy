using System.Text;
using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Tests;

public sealed record RecordedRequest(string Method, string Path, string PathAndQuery, IReadOnlyDictionary<string, string> Headers, string Body)
{
    /// <summary>The body exactly as it arrived, for uploads that are not JSON.</summary>
    public byte[] RawBytes { get; init; } = [];

    public JsonNode? Json => Body.Length == 0 ? null : JsonNode.Parse(Body);

    public string? Header(string name) => Headers.TryGetValue(name.ToLowerInvariant(), out var value) ? value : null;
}

public sealed record MockResponse(int Status, string Body, IReadOnlyDictionary<string, string>? Headers = null)
{
    public static MockResponse Json(int status, string body) => new(status, body);
}

/// <summary>
/// A stand-in for the Drop Cowboy API on an ephemeral port. It records every request
/// and answers from the routes a test registers. A route nobody registered answers 404.
/// It also plays the storage service a signed upload URL points at, so it takes PUT
/// and keeps each body's raw bytes.
/// </summary>
public sealed class MockApi : IAsyncDisposable
{
    private readonly WebApplication _app;
    private readonly object _gate = new();
    private readonly List<RecordedRequest> _requests = [];
    private readonly List<(string Method, string Path, Func<RecordedRequest, Task<MockResponse>> Handler)> _routes = [];

    private MockApi(WebApplication app)
    {
        _app = app;
    }

    public string BaseUrl { get; private set; } = string.Empty;

    public IReadOnlyList<RecordedRequest> Requests
    {
        get
        {
            lock (_gate)
            {
                return _requests.ToArray();
            }
        }
    }

    public IReadOnlyList<string> Calls => Requests.Select(r => $"{r.Method} {r.Path}").ToArray();

    public static async Task<MockApi> StartAsync()
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions());
        builder.Logging.SetMinimumLevel(LogLevel.Warning);
        builder.WebHost.UseUrls("http://127.0.0.1:0");
        var app = builder.Build();
        var api = new MockApi(app);
        app.Run(api.HandleAsync);
        await app.StartAsync();
        api.BaseUrl = app.Urls.First();
        return api;
    }

    public MockApi Reply(string method, string path, int status, string json)
    {
        return Handle(method, path, _ => Task.FromResult(MockResponse.Json(status, json)));
    }

    /// <summary>Answers each call in turn, then repeats the last answer.</summary>
    public MockApi ReplySequence(string method, string path, params (int Status, string Json)[] answers)
    {
        var next = 0;
        return Handle(method, path, _ =>
        {
            var index = Math.Min(Interlocked.Increment(ref next) - 1, answers.Length - 1);
            return Task.FromResult(MockResponse.Json(answers[index].Status, answers[index].Json));
        });
    }

    public MockApi Handle(string method, string path, Func<RecordedRequest, Task<MockResponse>> handler)
    {
        lock (_gate)
        {
            _routes.Add((method, path, handler));
        }

        return this;
    }

    public async ValueTask DisposeAsync()
    {
        await _app.StopAsync();
        await _app.DisposeAsync();
    }

    private async Task HandleAsync(HttpContext context)
    {
        using var buffer = new MemoryStream();
        await context.Request.Body.CopyToAsync(buffer);
        var raw = buffer.ToArray();
        var body = Encoding.UTF8.GetString(raw);
        var headers = new Dictionary<string, string>();
        foreach (var header in context.Request.Headers)
        {
            headers[header.Key.ToLowerInvariant()] = header.Value.ToString();
        }

        var request = new RecordedRequest(
            context.Request.Method,
            context.Request.Path.Value ?? string.Empty,
            context.Request.Path.Value + context.Request.QueryString.Value,
            headers,
            body)
        {
            RawBytes = raw
        };

        Func<RecordedRequest, Task<MockResponse>>? handler = null;
        lock (_gate)
        {
            _requests.Add(request);
            foreach (var route in _routes)
            {
                if (route.Method == request.Method && route.Path == request.Path)
                {
                    handler = route.Handler;
                    break;
                }
            }
        }

        var response = handler is null
            ? MockResponse.Json(404, """{"title":"Not found","detail":"The mock has no route for this request."}""")
            : await handler(request);

        context.Response.StatusCode = response.Status;
        context.Response.ContentType = "application/json";
        if (response.Headers is not null)
        {
            foreach (var header in response.Headers)
            {
                context.Response.Headers[header.Key] = header.Value;
            }
        }

        await context.Response.WriteAsync(response.Body);
    }
}
