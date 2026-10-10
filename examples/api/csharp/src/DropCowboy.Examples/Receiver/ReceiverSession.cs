using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Receiver;

/// <summary>A running receiver plus the list of results it has accepted.</summary>
public sealed class ReceiverSession : IAsyncDisposable
{
    private readonly WebApplication _app;

    private ReceiverSession(WebApplication app, ReceivedEvents events)
    {
        _app = app;
        Events = events;
        Port = ReceiverApp.PortOf(app);
    }

    public ReceivedEvents Events { get; }

    public int Port { get; }

    /// <summary>
    /// Loads the signing secrets, then starts the receiver. Pass a client when you have
    /// credentials so secrets can be loaded from the API. Without secrets the webhook
    /// route answers 503 and the callback route still works.
    /// </summary>
    public static async Task<ReceiverSession> StartAsync(Config config, DcClient? client, TextWriter output, CancellationToken ct)
    {
        var secrets = await LoadSigningSecretsAsync(config, client, output, ct);
        var events = new ReceivedEvents();
        var port = config.Port;

        try
        {
            var app = await ReceiverApp.StartReceiver(new ReceiverOptions(port, secrets, events, output), ct);
            return new ReceiverSession(app, events);
        }
        catch (IOException ex)
        {
            throw new RecipeException($"Could not listen on port {port}: {ex.Message} Set PORT to a free port.");
        }
    }

    public async ValueTask DisposeAsync()
    {
        await _app.StopAsync();
        await _app.DisposeAsync();
    }

    private static async Task<IReadOnlyList<string>> LoadSigningSecretsAsync(
        Config config, DcClient? client, TextWriter output, CancellationToken ct)
    {
        var fromEnvironment = config.GetList("DC_WEBHOOK_SECRET");
        if (fromEnvironment.Count > 0)
        {
            output.WriteLine($"Webhook signing secrets: {fromEnvironment.Count} from DC_WEBHOOK_SECRET (last one ends {Redact.Tail(fromEnvironment[^1])}).");
            return fromEnvironment;
        }

        if (client is null)
        {
            output.WriteLine("No signing secret: set DC_WEBHOOK_SECRET, or DC_KEY and DC_SECRET so the receiver can load it. The webhook route will answer 503.");
            return [];
        }

        try
        {
            var response = await client.GetAsync("/register/public/account/webhook-signing-secret", ct);
            var secrets = ReadSecrets(response);
            output.WriteLine(secrets.Count > 0
                ? $"Webhook signing secrets: {secrets.Count} loaded from the API (last one ends {Redact.Tail(secrets[^1])})."
                : "No webhooks yet, so there is no signing secret. Run \"dotnet run -- subscribe\". The webhook route will answer 503.");
            return secrets;
        }
        catch (DcError ex)
        {
            output.WriteLine($"Could not load signing secrets ({ex.Message}). The key needs the webhooks:read scope. The webhook route will answer 503.");
            return [];
        }
    }

    private static List<string> ReadSecrets(JsonNode? response)
    {
        var secrets = new List<string>();
        foreach (var entry in Json.Items(response, "data"))
        {
            if (Json.String(entry, "signing_secret") is { Length: > 0 } secret)
            {
                secrets.Add(secret);
            }
        }

        return secrets;
    }
}
