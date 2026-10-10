using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;
using DropCowboy.Examples.Recipes;

namespace DropCowboy.Examples;

/// <summary>
/// Picks the command from the arguments and turns every failure into a printed message
/// and an exit code. Program.cs only wires in the real console and environment.
/// </summary>
public static class Cli
{
    public const string Usage = """
        Usage: dotnet run -- <command>

        Commands:
          receiver         Listen for callbacks and signed webhooks and print them
          retail           Send a ringless voicemail from one of your phone lines
          byoc             Send from your own carrier with a caller ID you choose
          local-presence   Put numbers on a phone line and let the platform pick the caller ID
          tts              Send text to speech
          subscribe        Create a webhook for status events (add --receipt for receipts, or --events a,b);
                           subscribe --list | --update WEBHOOK_ID [--url URL] [--events a,b | --receipt] [--name NAME]
                           | --rotate WEBHOOK_ID | --delete WEBHOOK_ID
          upload-media     Upload DC_AUDIO_FILE (or import it from an https:// address) and print its media_id
          check-receiver   Post a sample callback and a signed sample webhook to your endpoints:
                           check-receiver <callback-url> [webhook-url]

        Settings come from environment variables. See README.md.
        """;

    public static async Task<int> RunAsync(
        string[] args,
        Config config,
        TextWriter output,
        TextWriter error,
        CancellationToken ct,
        TimeSpan? pollInterval = null,
        TimeSpan? pollTimeout = null)
    {
        var command = args.Length > 0 ? args[0].ToLowerInvariant() : "help";
        if (command is "help" or "--help" or "-h")
        {
            output.WriteLine(Usage);
            return 0;
        }

        if (!IsCommand(command))
        {
            error.WriteLine($"Unknown command \"{Redact.Safe(command, 40)}\".");
            error.WriteLine(Usage);
            return 2;
        }

        try
        {
            output.WriteLine(RecipeSteps.Reminder);
            SampleValues.Refuse(config);
            return await DispatchAsync(command, args, config, output, ct, pollInterval, pollTimeout);
        }
        catch (RecipeException ex)
        {
            error.WriteLine(ex.Message);
            return 1;
        }
        catch (DcError ex)
        {
            foreach (var line in ex.Report())
            {
                error.WriteLine(line);
            }

            return 1;
        }
        catch (OperationCanceledException)
        {
            error.WriteLine("Stopped.");
            return command == "receiver" ? 0 : 130;
        }
    }

    private static bool IsCommand(string command)
    {
        return command is "receiver" or "retail" or "byoc" or "local-presence" or "tts" or "subscribe"
            or "upload-media" or "check-receiver"
            or "send-rvm-retail" or "send-rvm-byoc" or "send-rvm-byoc-local-presence" or "send-rvm-tts";
    }

    private static async Task<int> DispatchAsync(
        string command, string[] args, Config config, TextWriter output, CancellationToken ct,
        TimeSpan? pollInterval, TimeSpan? pollTimeout)
    {
        if (command == "receiver")
        {
            return await RunReceiverAsync(config, output, ct);
        }

        if (command == "check-receiver")
        {
            var results = await CheckReceiver.RunAsync(config, args[1..], output, ct);
            return results.All(r => r.Ok) ? 0 : 1;
        }

        using var client = DcClient.FromConfig(config);
        var ctx = new RecipeContext(config, client, output)
        {
            PollInterval = pollInterval ?? TimeSpan.FromSeconds(2),
            PollTimeout = pollTimeout ?? TimeSpan.FromSeconds(60)
        };

        return command switch
        {
            "retail" or "send-rvm-retail" => await SendRvmRetail.RunAsync(ctx, ct),
            "byoc" or "send-rvm-byoc" => await SendRvmByoc.RunAsync(ctx, ct),
            "local-presence" or "send-rvm-byoc-local-presence" => await SendRvmByocLocalPresence.RunAsync(ctx, ct),
            "tts" or "send-rvm-tts" => await SendRvmTts.RunAsync(ctx, ct),
            "subscribe" => await Subscribe.RunAsync(ctx, args[1..], ct),
            "upload-media" => await UploadMedia.RunAsync(ctx, ct),
            _ => throw new InvalidOperationException($"Unhandled command {command}.")
        };
    }

    // The standalone receiver needs no API credentials. With them it can load signing secrets.
    private static async Task<int> RunReceiverAsync(Config config, TextWriter output, CancellationToken ct)
    {
        using var client = config.Get("DC_KEY") is not null && config.Get("DC_SECRET") is not null
            ? DcClient.FromConfig(config)
            : null;

        await using var receiver = await ReceiverSession.StartAsync(config, client, output, ct);
        output.WriteLine($"Receiver listening on port {receiver.Port}.");
        output.WriteLine($"  POST {ReceiverApp.CallbackPath}   (unsigned callback_url results)");
        output.WriteLine($"  POST {ReceiverApp.WebhookPath}   (signed webhooks)");
        output.WriteLine("Press Ctrl-C to stop.");

        await Task.Delay(Timeout.Infinite, ct);
        return 0;
    }
}
