using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Receiver;

public sealed record ReceiverOptions(
    int Port,
    IReadOnlyList<string> SigningSecrets,
    ReceivedEvents Events,
    TextWriter Log,
    TimeProvider? Time = null);

/// <summary>
/// The web server that receives results. It has two routes: an unsigned callback for
/// the callback_url of a single send, and a signed webhook for subscribed events.
/// The recipes start it themselves; the "receiver" command runs it on its own.
/// </summary>
public static class ReceiverApp
{
    public const string CallbackPath = "/callbacks/dropcowboy";
    public const string WebhookPath = "/webhooks/dropcowboy";

    private const int MaxBodyBytes = 1024 * 1024;

    /// <summary>Builds the app, starts it and returns it. Port 0 picks a free port (see PortOf).</summary>
    public static async Task<WebApplication> StartReceiver(ReceiverOptions options, CancellationToken ct)
    {
        // Pass no command-line arguments: "retail" and friends are ours, not host settings.
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions());
        builder.Logging.SetMinimumLevel(LogLevel.Warning);

        // "localhost" reaches the receiver from a tunnel on both IPv4 and IPv6. Kestrel
        // cannot choose a free port for "localhost", so tests ask for 127.0.0.1 and port 0.
        builder.WebHost.UseUrls(options.Port == 0 ? "http://127.0.0.1:0" : $"http://localhost:{options.Port}");
        builder.WebHost.ConfigureKestrel(kestrel => kestrel.Limits.MaxRequestBodySize = MaxBodyBytes);

        var app = builder.Build();
        MapRoutes(app, new ReceiverRoutes(options));

        await app.StartAsync(ct);
        return app;
    }

    public static int PortOf(WebApplication app) => new Uri(app.Urls.First()).Port;

    private static void MapRoutes(WebApplication app, ReceiverRoutes routes)
    {
        app.MapGet("/health", () => Results.Json(new JsonObject { ["ok"] = true }));
        app.MapPost(CallbackPath, routes.HandleCallbackAsync);
        app.MapPost(WebhookPath, routes.HandleWebhookAsync);
    }
}
