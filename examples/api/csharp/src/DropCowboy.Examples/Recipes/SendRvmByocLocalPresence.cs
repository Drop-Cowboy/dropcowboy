// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Local presence: put several numbers on one phone line, then send with the
// phone_line_id alone. The platform picks the caller ID from the numbers on the line,
// so this recipe never sends a caller_id.
using System.Diagnostics;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Recipes;

public static class SendRvmByocLocalPresence
{
    public static async Task<int> RunAsync(RecipeContext ctx, CancellationToken ct)
    {
        var config = ctx.Config;
        var to = RecipeSteps.RequireNumber(config, "DC_TO");
        var audio = AudioSource.RequireFromConfig(config);
        var numbers = ReadOwnedNumbers(config);

        await SendRvmByoc.RequireConnectedCarrierAsync(ctx, ct);
        audio = await RecipeSteps.CompleteAudioAsync(ctx, audio, ct);

        var lineId = await FindOrCreateLineAsync(ctx, ct);
        ctx.Out.WriteLine($"Phone line: {lineId}");

        if (numbers.Count > 0)
        {
            await ImportNumbersAsync(ctx, lineId, numbers, ct);
        }

        var areaCodes = config.GetList("DC_AREA_CODES");
        if (areaCodes.Count > 0)
        {
            await SearchAndMaybeRentAsync(ctx, lineId, areaCodes, ct);
        }

        await RequireNumbersOnLineAsync(ctx, lineId, ct);

        var body = new JsonObject { ["to"] = to, ["phone_line_id"] = lineId };
        audio.WriteTo(body);

        var outcome = await Delivery.SendAndWaitAsync(ctx, body, ct);
        if (!string.IsNullOrEmpty(outcome.Result?.From))
        {
            ctx.Out.WriteLine($"The platform picked {Redact.Safe(outcome.Result.From)} from your line.");
            ctx.Out.WriteLine(
                "It chooses the number on the line closest to the recipient and falls back to a number on the line "
                + "when it cannot place the recipient. Always identify your business location truthfully when asked by recipients.");
        }

        return 0;
    }

    private static List<string> ReadOwnedNumbers(Config config)
    {
        var numbers = new List<string>();
        foreach (var number in config.GetList("DC_NUMBERS"))
        {
            if (!Regex.IsMatch(number, @"^\+[1-9]\d{6,14}$"))
            {
                throw new RecipeException($"DC_NUMBERS holds \"{Redact.Safe(number, 40)}\", which is not E.164 (for example +13125550142).");
            }

            numbers.Add(number);
        }

        return numbers;
    }

    private static async Task<string> FindOrCreateLineAsync(RecipeContext ctx, CancellationToken ct)
    {
        if (ctx.Config.Get("DC_PHONE_LINE_ID") is { } configured)
        {
            return configured;
        }

        var name = ctx.Config.Get("DC_LINE_NAME") ?? "Local presence";
        var found = await ctx.Client.GetAsync($"/phone/public/lines?search_term={Uri.EscapeDataString(name)}", ct);
        foreach (var line in Json.Items(found, "data"))
        {
            // search_term matches parts of a name, so only an exact match counts as "the" line.
            if (Json.String(line, "name") == name && Json.String(line, "ivr_id") is { } existing)
            {
                ctx.Out.WriteLine($"Reusing the phone line named \"{Redact.Safe(name, 80)}\".");
                return existing;
            }
        }

        var body = new JsonObject { ["name"] = name, ["type"] = "voice" };
        var created = await ctx.Client.PostAsync("/phone/public/lines", body, ct);
        ctx.Out.WriteLine($"Created the phone line named \"{Redact.Safe(name, 80)}\".");
        return Json.String(created, "data", "ivr_id")
            ?? throw new RecipeException("The API created a phone line but returned no ivr_id.");
    }

    // The import runs as a background job, so poll until it finishes.
    private static async Task ImportNumbersAsync(RecipeContext ctx, string lineId, List<string> numbers, CancellationToken ct)
    {
        var numberList = new JsonArray();
        foreach (var number in numbers)
        {
            numberList.Add(number);
        }

        var body = new JsonObject { ["phone_numbers"] = numberList, ["phone_line_id"] = lineId };
        var accepted = await ctx.Client.PostAsync("/phone/public/numbers/import", body, ct);
        var jobId = Json.String(accepted, "data", "long_job_id")
            ?? throw new RecipeException("The import was accepted but returned no long_job_id.");
        ctx.Out.WriteLine($"Importing {numbers.Count} number(s). Job {jobId}.");

        var clock = Stopwatch.StartNew();
        while (true)
        {
            var job = await ctx.Client.GetAsync($"/phone/public/numbers/import/{jobId}", ct);
            var status = Json.String(job, "data", "status");

            if (status == "completed")
            {
                ctx.Out.WriteLine(
                    $"Import finished: added={Json.Int(job, "data", "result", "added") ?? 0} "
                    + $"updated={Json.Int(job, "data", "result", "updated") ?? 0} "
                    + $"invalid={Json.Int(job, "data", "result", "invalid") ?? 0} "
                    + $"conflicts={Json.Int(job, "data", "result", "conflicts") ?? 0}");
                return;
            }

            if (status == "failed")
            {
                throw new RecipeException($"The number import failed: {Redact.Safe(Json.String(job, "data", "error") ?? "no reason given", 300)}");
            }

            if (clock.Elapsed >= ctx.PollTimeout)
            {
                throw new RecipeException($"The number import was still {Redact.Safe(status ?? "unknown", 40)} after {ctx.PollTimeout.TotalSeconds:0} seconds. Check job {jobId} later.");
            }

            await Task.Delay(ctx.PollInterval, ct);
        }
    }

    // A search costs nothing. Renting buys numbers at your carrier, so it is opt-in.
    private static async Task SearchAndMaybeRentAsync(RecipeContext ctx, string lineId, IReadOnlyList<string> areaCodes, CancellationToken ct)
    {
        var toRent = new JsonArray();
        foreach (var areaCode in areaCodes)
        {
            var search = new JsonObject { ["country_iso"] = "US", ["pattern"] = areaCode, ["type"] = "local", ["limit"] = 3 };
            var found = await ctx.Client.PostAsync("/phone/public/numbers/available", search, ct);

            string? first = null;
            ctx.Out.WriteLine($"Area code {Redact.Safe(areaCode, 10)}:");
            foreach (var candidate in Json.Items(found, "data"))
            {
                var phoneNumber = Json.String(candidate, "phone_number");
                if (phoneNumber is null)
                {
                    continue;
                }

                ctx.Out.WriteLine($"  {Redact.Safe(phoneNumber, 20)}");
                first ??= phoneNumber;
            }

            if (first is null)
            {
                ctx.Out.WriteLine("  no numbers found");
                continue;
            }

            toRent.Add(first);
        }

        if (toRent.Count == 0)
        {
            return;
        }

        if (!ctx.Config.IsYes("DC_RENT"))
        {
            ctx.Out.WriteLine("Dry run: set DC_RENT=yes to rent these (renting charges your carrier). Nothing was rented.");
            return;
        }

        var rentBody = new JsonObject { ["numbers"] = toRent, ["voice_ivr_id"] = lineId };
        var rented = await ctx.Client.PostAsync("/phone/public/numbers/rent", rentBody, ct);
        var count = Json.Items(rented, "data", "numbers").Count();
        ctx.Out.WriteLine($"Rented {count} number(s) onto the line.");
    }

    private static async Task RequireNumbersOnLineAsync(RecipeContext ctx, string lineId, CancellationToken ct)
    {
        var response = await ctx.Client.GetAsync($"/phone/public/lines/{lineId}/numbers", ct);
        var onLine = new List<string>();
        foreach (var entry in Json.Items(response, "data"))
        {
            if (Json.String(entry, "phone_number") is { } phoneNumber)
            {
                onLine.Add(phoneNumber);
            }
        }

        ctx.Out.WriteLine($"Numbers on the line: {onLine.Count}");
        foreach (var phoneNumber in onLine)
        {
            ctx.Out.WriteLine($"  {Redact.Safe(phoneNumber, 20)}");
        }

        if (onLine.Count == 0)
        {
            throw new RecipeException(
                "The phone line has no numbers, so it cannot send. Set DC_NUMBERS to numbers you own, "
                + "or DC_AREA_CODES with DC_RENT=yes to rent some.");
        }
    }
}
