// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Manages the webhooks that deliver ringless voicemail results to your receiver.
// A webhook is one URL, the event types it receives and its own signing secret,
// and an account can hold many of them. Creating one never replaces another.
//
//   dotnet run -- subscribe                        one webhook for contact.rvm.status
//   dotnet run -- subscribe --receipt              ...for status and contact.rvm.receipt
//   dotnet run -- subscribe --events a,b           ...for exactly these event types
//   dotnet run -- subscribe --list                 your webhooks, by webhook_id
//   dotnet run -- subscribe --update WEBHOOK_ID --events a,b --url URL --name "My hook"
//                                                  change one webhook; send only what changes
//   dotnet run -- subscribe --rotate WEBHOOK_ID    a new signing secret for that webhook
//   dotnet run -- subscribe --delete WEBHOOK_ID    delete that webhook, and no other
using System.Text.Json.Nodes;
using DropCowboy.Examples.Lib;
using DropCowboy.Examples.Receiver;
using DropCowboy.Examples.Recipes;

namespace DropCowboy.Examples;

public static class Subscribe
{
    private const string WebhooksPath = "/register/public/webhooks";

    // args are the arguments after the command name.
    public static async Task<int> RunAsync(RecipeContext ctx, string[] args, CancellationToken ct)
    {
        var options = Options.Parse(args);
        switch (options.Action)
        {
            case "list":
                return await ListAsync(ctx, ct);
            case "delete":
                return await DeleteAsync(ctx, options.WebhookId!, ct);
            case "update":
                return await UpdateAsync(ctx, options.WebhookId!, options.Changes!, ct);
            case "rotate":
                return await RotateAsync(ctx, options.WebhookId!, ct);
            default:
                return await CreateAsync(ctx, options.EventTypes, ct);
        }
    }

    // One webhook carrying every requested event type, with its own signing secret.
    private static async Task<int> CreateAsync(RecipeContext ctx, IReadOnlyList<string> eventTypes, CancellationToken ct)
    {
        var publicUrl = ctx.Config.PublicUrl
            ?? throw new RecipeException("DC_PUBLIC_URL is required. Set it to the HTTPS address that reaches this receiver (see the README for tunnels).");
        var hookUrl = publicUrl + ReceiverApp.WebhookPath;

        var types = new JsonArray();
        foreach (var eventType in eventTypes)
        {
            types.Add(JsonValue.Create(eventType));
        }

        var body = new JsonObject { ["hook_url"] = hookUrl, ["event_types"] = types };
        var created = await ctx.Client.PostAsync(WebhooksPath, body, ct);
        var webhookId = Json.String(created, "data", "webhook_id");
        var secret = Json.String(created, "data", "signing_secret");

        ctx.Out.WriteLine($"Created webhook {webhookId ?? "(no id returned)"} for {string.Join(", ", eventTypes)} at {hookUrl}");
        ctx.Out.WriteLine(secret is null
            ? "  The response carried no signing secret."
            : $"  Signing secret ends {Redact.Tail(secret)}");
        ctx.Out.WriteLine("The receiver loads the signing secrets by itself, or set DC_WEBHOOK_SECRET.");
        ctx.Out.WriteLine("Creating another webhook adds to the list; it never replaces this one. To change a secret, rotate it: dotnet run -- subscribe --rotate WEBHOOK_ID");
        return 0;
    }

    private static async Task<int> ListAsync(RecipeContext ctx, CancellationToken ct)
    {
        var listed = await ctx.Client.GetAsync(WebhooksPath, ct);
        var any = false;
        foreach (var hook in Json.Items(listed, "data"))
        {
            any = true;
            var events = string.Join(", ", Json.Items(hook, "event_types").Select(e => e?.GetValue<string>()));
            var url = Json.String(hook, "hook_url") ?? Json.String(hook, "url");
            ctx.Out.WriteLine($"{Json.String(hook, "webhook_id")}  {events}  {url}");
        }

        if (!any)
        {
            ctx.Out.WriteLine("No webhooks yet. Run \"dotnet run -- subscribe\" to create one.");
        }

        return 0;
    }

    // Sends only the fields in changes. event_types replaces the whole set of this webhook.
    // The webhook_id and the signing secret do not change.
    private static async Task<int> UpdateAsync(RecipeContext ctx, string webhookId, JsonObject changes, CancellationToken ct)
    {
        var answer = await ctx.Client.PutAsync($"{WebhooksPath}/{Uri.EscapeDataString(webhookId)}", changes, ct);
        var events = string.Join(", ", Json.Items(answer, "data", "event_types").Select(e => e?.GetValue<string>()));
        var url = Json.String(answer, "data", "hook_url") ?? Json.String(answer, "data", "url");

        ctx.Out.WriteLine($"Updated webhook {Json.String(answer, "data", "webhook_id") ?? webhookId}");
        ctx.Out.WriteLine($"  name:   {Json.String(answer, "data", "name") ?? "none"}");
        ctx.Out.WriteLine($"  url:    {url ?? "unknown"}");
        ctx.Out.WriteLine($"  events: {(events.Length == 0 ? "unknown" : events)}");
        ctx.Out.WriteLine("The signing secret did not change.");
        return 0;
    }

    private static async Task<int> DeleteAsync(RecipeContext ctx, string webhookId, CancellationToken ct)
    {
        await ctx.Client.DeleteAsync($"{WebhooksPath}/{Uri.EscapeDataString(webhookId)}", ct);
        ctx.Out.WriteLine($"Deleted webhook {webhookId}. Your other webhooks are unchanged.");
        return 0;
    }

    // Deliveries are signed with the new secret from now on. The receiver accepts a delivery
    // signed with any secret it holds, so add the new one and keep the old one until the
    // deliveries already in flight have arrived.
    private static async Task<int> RotateAsync(RecipeContext ctx, string webhookId, CancellationToken ct)
    {
        var rotated = await ctx.Client.PostAsync($"{WebhooksPath}/{Uri.EscapeDataString(webhookId)}/rotate-secret", new JsonObject(), ct);
        var secret = Json.String(rotated, "data", "signing_secret");

        ctx.Out.WriteLine(secret is null
            ? $"Rotated the signing secret of webhook {webhookId}. The response carried no signing secret."
            : $"Rotated the signing secret of webhook {webhookId}. The new secret ends {Redact.Tail(secret)}.");
        ctx.Out.WriteLine("New deliveries are signed with it. Add it to the receiver (restart it, or set DC_WEBHOOK_SECRET) and keep the old secret there until in-flight deliveries have arrived.");
        return 0;
    }

    private sealed record Options(string Action, string? WebhookId, IReadOnlyList<string> EventTypes, JsonObject? Changes = null)
    {
        private const int MaxNameLength = 100;

        public static Options Parse(string[] args)
        {
            var list = args.Contains("--list");
            var deleteId = ValueOf(args, "--delete");
            var rotateId = ValueOf(args, "--rotate");
            var updateId = ValueOf(args, "--update");
            var chosen = (list ? 1 : 0) + (deleteId is null ? 0 : 1) + (rotateId is null ? 0 : 1) + (updateId is null ? 0 : 1);
            if (chosen > 1)
            {
                throw new RecipeException("Use only one of --list, --update WEBHOOK_ID, --delete WEBHOOK_ID and --rotate WEBHOOK_ID.");
            }

            if (updateId is null && (args.Contains("--url") || args.Contains("--name")))
            {
                throw new RecipeException("--url and --name go with --update WEBHOOK_ID.");
            }

            if (list)
            {
                return new Options("list", null, []);
            }

            if (deleteId is not null)
            {
                return new Options("delete", deleteId, []);
            }

            if (rotateId is not null)
            {
                return new Options("rotate", rotateId, []);
            }

            if (updateId is not null)
            {
                return new Options("update", updateId, [], ChangesFrom(args));
            }

            return new Options("create", null, NamedEventTypes(args) ?? new List<string> { ReceivedEvent.RvmStatus });
        }

        private static JsonObject ChangesFrom(string[] args)
        {
            var changes = new JsonObject();
            var url = ValueOf(args, "--url");
            if (url is not null)
            {
                if (!url.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
                {
                    throw new RecipeException("--url must be a public HTTPS address, for example https://abc123.example.com/webhooks/dropcowboy");
                }

                changes["hook_url"] = url;
            }

            var eventTypes = NamedEventTypes(args);
            if (eventTypes is not null)
            {
                var types = new JsonArray();
                foreach (var eventType in eventTypes)
                {
                    types.Add(JsonValue.Create(eventType));
                }

                changes["event_types"] = types;
            }

            var name = ValueOf(args, "--name");
            if (name is not null)
            {
                if (name.Length > MaxNameLength)
                {
                    throw new RecipeException($"--name can be at most {MaxNameLength} characters.");
                }

                changes["name"] = name;
            }

            return changes.Count > 0
                ? changes
                : throw new RecipeException("Nothing to update. Pass at least one of --url, --events (or --receipt) and --name.");
        }

        // The event types named on the command line, or null when none were named.
        private static List<string>? NamedEventTypes(string[] args)
        {
            var listed = ValueOf(args, "--events");
            if (listed is null)
            {
                return args.Contains("--receipt")
                    ? new List<string> { ReceivedEvent.RvmStatus, ReceivedEvent.RvmReceipt }
                    : null;
            }

            var events = listed.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries).ToList();
            return events.Count > 0
                ? events
                : throw new RecipeException("--events needs a comma separated list, for example --events contact.rvm.status,contact.rvm.receipt");
        }

        // The value after a flag, or null when the flag is absent. A flag with no value is an
        // error, so a typo never deletes or rotates the wrong webhook.
        private static string? ValueOf(string[] args, string flag)
        {
            var index = Array.IndexOf(args, flag);
            if (index < 0)
            {
                return null;
            }

            var value = index + 1 < args.Length ? args[index + 1].Trim() : "";
            return value.Length == 0 || value.StartsWith("--", StringComparison.Ordinal)
                ? throw new RecipeException($"{flag} needs a value.")
                : value;
        }
    }
}
