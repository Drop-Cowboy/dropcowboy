using System.Text.Json.Nodes;
using static DropCowboy.Examples.Tests.RecipeHarness;

namespace DropCowboy.Examples.Tests;

public class LocalPresenceRecipeTests
{
    private const string Connected = """{"connected":true,"providers":[],"pool_id":null}""";
    private const string AudioUrl = "https://audio.example.com/offer.mp3";
    private const string JobId = "1d5b9f3e-7a2c-4e8d-b6f1-3c7a9e5d2b84";
    private const string NewLineId = "5e8c2a4f-1b7d-4c93-a6e0-9d3f7b1c5a28";
    private const string ImportPath = "/phone/public/numbers/import/" + JobId;
    private static readonly string NumbersPath = $"/phone/public/lines/{NewLineId}/numbers";

    private static string Completed => Wrap($$"""
        {"long_job_id":"{{JobId}}","status":"completed","result":{"total_rows":2,"added":2,"updated":0,"invalid":0,"conflicts":0},"error":null}
        """);

    private static string Processing => Wrap($$"""{"long_job_id":"{{JobId}}","status":"processing","result":null,"error":null}""");

    private static string TwoNumbersOnLine => Wrap("""[{"phone_number":"+13125550142"},{"phone_number":"+14155550101"}]""");

    private static async Task<MockApi> ApiWithLineAsync()
    {
        var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Reply("GET", "/phone/public/lines", 200, Wrap("[]"));
        api.Reply("POST", "/phone/public/lines", 200, Wrap($$"""{"ivr_id":"{{NewLineId}}","name":"Local presence","type":"voice"}"""));
        return api;
    }

    private static string AvailableFor(string areaCode) => Wrap($$"""
        [{"phone_number":"+1{{areaCode}}5550143"},{"phone_number":"+1{{areaCode}}5550144"}]
        """);

    [Fact]
    public async Task EndToEnd_ImportsNumbers_SendsWithTheLineOnly_AndExplainsThePickedNumber()
    {
        await using var api = await ApiWithLineAsync();
        api.Reply("POST", "/phone/public/numbers/import", 202, Wrap($$"""{"long_job_id":"{{JobId}}"}"""));
        api.ReplySequence("GET", ImportPath, (200, Processing), (200, Completed));
        api.Reply("GET", NumbersPath, 200, TwoNumbersOnLine);
        api.Handle("POST", "/rvm", AcceptThenCallBack(callerId: "+14155550101"));
        var (publicUrl, port) = FreeReceiver();

        var result = await RunAsync(api, Env(api,
            ("DC_AUDIO_URL", AudioUrl), ("DC_NUMBERS", "+13125550142, +14155550101"), ("DC_PUBLIC_URL", publicUrl), ("PORT", port)),
            "local-presence");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(
            [
                "GET /integration/public/byoc",
                "GET /phone/public/lines",
                "POST /phone/public/lines",
                "POST /phone/public/numbers/import",
                $"GET {ImportPath}",
                $"GET {ImportPath}",
                $"GET {NumbersPath}",
                "POST /rvm"
            ],
            result.Calls);
        RetailRecipeTests.AssertCommonRules(result);

        Assert.Contains("search_term=Local%20presence", api.Requests[1].PathAndQuery);
        var createLine = result.Single("POST", "/phone/public/lines");
        Assert.Null(createLine.Header("idempotency-key"));
        Assert.Equal("""{"name":"Local presence","type":"voice"}""", createLine.Body);
        RetailRecipeTests.AssertIdempotencyKey(result.Single("POST", "/rvm"));

        var importRequest = result.Single("POST", "/phone/public/numbers/import");
        Assert.Contains("\"+13125550142\"", importRequest.Body);
        Assert.DoesNotContain("\\u002B", importRequest.Body, StringComparison.OrdinalIgnoreCase);
        var import = importRequest.Json!;
        Assert.Equal(["+13125550142", "+14155550101"], import["phone_numbers"]!.AsArray().Select(n => n!.GetValue<string>()).ToArray());
        Assert.Equal(NewLineId, import["phone_line_id"]!.GetValue<string>());

        var body = result.RvmBody();
        Assert.Equal(
            ["to", "phone_line_id", "audio_url", "foreign_id", "callback_url"],
            body.Select(p => p.Key).ToArray());
        Assert.Null(body["caller_id"]);
        Assert.Equal(NewLineId, body["phone_line_id"]!.GetValue<string>());

        Assert.Contains("Import finished: added=2 updated=0 invalid=0 conflicts=0", result.Output);
        Assert.Contains("Numbers on the line: 2", result.Output);
        Assert.Contains("The platform picked +14155550101 from your line.", result.Output);
        Assert.Contains("Always identify your business location truthfully when asked by recipients.", result.Output);
        Assert.DoesNotContain("answer rate", result.Output, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task AreaCodesWithoutDcRent_AreADryRun_AndNothingIsRented()
    {
        await using var api = await ApiWithLineAsync();
        api.Handle("POST", "/phone/public/numbers/available", request =>
        {
            var pattern = request.Json!["pattern"]!.GetValue<string>();
            return Task.FromResult(MockResponse.Json(200, AvailableFor(pattern)));
        });
        api.Reply("GET", NumbersPath, 200, TwoNumbersOnLine);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl), ("DC_AREA_CODES", "312,415"), ("DC_WAIT_SECONDS", "0")), "local-presence");

        Assert.Equal(0, result.ExitCode);
        Assert.DoesNotContain("POST /phone/public/numbers/rent", result.Calls);
        Assert.Equal(2, result.Calls.Count(c => c == "POST /phone/public/numbers/available"));
        Assert.Contains("Dry run: set DC_RENT=yes to rent these", result.Output);

        var search = api.Requests.First(r => r.Path == "/phone/public/numbers/available").Json!;
        Assert.Equal("US", search["country_iso"]!.GetValue<string>());
        Assert.Equal("312", search["pattern"]!.GetValue<string>());
        Assert.Equal("local", search["type"]!.GetValue<string>());
        Assert.Equal(3, search["limit"]!.GetValue<int>());
    }

    [Fact]
    public async Task DcRentYes_RentsTheFirstCandidatePerAreaCode_OntoTheLine()
    {
        await using var api = await ApiWithLineAsync();
        api.Handle("POST", "/phone/public/numbers/available", request =>
            Task.FromResult(MockResponse.Json(200, AvailableFor(request.Json!["pattern"]!.GetValue<string>()))));
        api.Reply("POST", "/phone/public/numbers/rent", 200, Wrap("""{"numbers":["+13125550143","+14155550143"]}"""));
        api.Reply("GET", NumbersPath, 200, TwoNumbersOnLine);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_AUDIO_URL", AudioUrl), ("DC_AREA_CODES", "312,415"), ("DC_RENT", "yes"), ("DC_WAIT_SECONDS", "0")), "local-presence");

        Assert.Equal(0, result.ExitCode);
        var rent = result.Single("POST", "/phone/public/numbers/rent").Json!;
        Assert.Equal(["+13125550143", "+14155550143"], rent["numbers"]!.AsArray().Select(n => n!.GetValue<string>()).ToArray());
        Assert.Equal(NewLineId, rent["voice_ivr_id"]!.GetValue<string>());
        Assert.DoesNotContain("Dry run", result.Output);
        Assert.True(
            result.Calls.ToList().IndexOf("POST /phone/public/numbers/rent") < result.Calls.ToList().IndexOf($"GET {NumbersPath}"),
            "numbers are confirmed after renting");
    }

    [Theory]
    [InlineData("YES")]
    [InlineData("Yes")]
    [InlineData("true")]
    [InlineData("1")]
    [InlineData("y")]
    [InlineData(" yes")]
    [InlineData("yes ")]
    public async Task OnlyTheExactLowercaseWordYesRents(string value)
    {
        await using var api = await ApiWithLineAsync();
        api.Handle("POST", "/phone/public/numbers/available", _ => Task.FromResult(MockResponse.Json(200, AvailableFor("312"))));
        api.Reply("POST", "/phone/public/numbers/rent", 200, Wrap("""{"numbers":["+13125550143"]}"""));
        api.Reply("GET", NumbersPath, 200, TwoNumbersOnLine);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api,
            ("DC_AUDIO_URL", AudioUrl), ("DC_AREA_CODES", "312"), ("DC_RENT", value), ("DC_WAIT_SECONDS", "0")), "local-presence");

        Assert.DoesNotContain("POST /phone/public/numbers/rent", result.Calls);
        Assert.Contains("Dry run: set DC_RENT=yes to rent these", result.Output);
    }

    [Fact]
    public async Task AFailedImport_PrintsTheErrorAndNeverSends()
    {
        await using var api = await ApiWithLineAsync();
        api.Reply("POST", "/phone/public/numbers/import", 202, Wrap($$"""{"long_job_id":"{{JobId}}"}"""));
        api.ReplySequence("GET", ImportPath, (200, Processing), (200, Wrap($$"""
            {"long_job_id":"{{JobId}}","status":"failed","result":null,"error":"Carrier lookup failed"}
            """)));

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl), ("DC_NUMBERS", "+13125550142")), "local-presence");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("Carrier lookup failed", result.Error);
        Assert.DoesNotContain("POST /rvm", result.Calls);
        Assert.DoesNotContain($"GET {NumbersPath}", result.Calls);
    }

    [Fact]
    public async Task AnImportThatNeverFinishes_TimesOut()
    {
        await using var api = await ApiWithLineAsync();
        api.Reply("POST", "/phone/public/numbers/import", 202, Wrap($$"""{"long_job_id":"{{JobId}}"}"""));
        api.Reply("GET", ImportPath, 200, Processing);
        var output = new StringWriter();
        var error = new StringWriter();

        var code = await Cli.RunAsync(
            ["local-presence"],
            new Lib.Config(Env(api, ("DC_AUDIO_URL", AudioUrl), ("DC_NUMBERS", "+13125550142"))),
            output, error, CancellationToken.None,
            pollInterval: TimeSpan.FromMilliseconds(5), pollTimeout: TimeSpan.FromMilliseconds(100));

        Assert.Equal(1, code);
        Assert.Contains("still processing", error.ToString());
        Assert.DoesNotContain("POST /rvm", api.Calls);
    }

    [Fact]
    public async Task ALineWithNoNumbers_StopsBeforeSending()
    {
        await using var api = await ApiWithLineAsync();
        api.Reply("GET", NumbersPath, 200, Wrap("[]"));

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl)), "local-presence");

        Assert.Equal(1, result.ExitCode);
        Assert.Contains("no numbers", result.Error);
        Assert.DoesNotContain("POST /rvm", result.Calls);
    }

    [Fact]
    public async Task ReusesALineWhoseNameMatchesExactly_AndSkipsLookalikes()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Reply("GET", "/phone/public/lines", 200, Wrap($$"""
            [{"ivr_id":"11111111-2222-4333-8444-555555555555","name":"Local presence backup"},
             {"ivr_id":"{{NewLineId}}","name":"Local presence"}]
            """));
        api.Reply("GET", NumbersPath, 200, TwoNumbersOnLine);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl), ("DC_WAIT_SECONDS", "0")), "local-presence");

        Assert.Equal(0, result.ExitCode);
        Assert.DoesNotContain("POST /phone/public/lines", result.Calls);
        Assert.Equal(NewLineId, result.RvmBody()["phone_line_id"]!.GetValue<string>());
    }

    [Fact]
    public async Task UsesDcPhoneLineIdWithoutLookingUpLines()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap(Connected));
        api.Reply("GET", $"/phone/public/lines/{LineId}/numbers", 200, TwoNumbersOnLine);
        api.Reply("POST", "/rvm", 202, QueuedJson);

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl), ("DC_PHONE_LINE_ID", LineId), ("DC_WAIT_SECONDS", "0")), "local-presence");

        Assert.Equal(0, result.ExitCode);
        Assert.Equal(
            ["GET /integration/public/byoc", $"GET /phone/public/lines/{LineId}/numbers", "POST /rvm"],
            result.Calls);
    }

    [Fact]
    public async Task NoCarrier_StopsFirst()
    {
        await using var api = await MockApi.StartAsync();
        api.Reply("GET", "/integration/public/byoc", 200, Wrap("""{"connected":false}"""));

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl)), "local-presence");

        Assert.Equal(1, result.ExitCode);
        Assert.Equal(["GET /integration/public/byoc"], result.Calls);
    }

    [Fact]
    public async Task ABadNumberInDcNumbers_FailsBeforeAnyRequest()
    {
        await using var api = await MockApi.StartAsync();

        var result = await RunAsync(api, Env(api, ("DC_AUDIO_URL", AudioUrl), ("DC_NUMBERS", "+13125550142,3125550143")), "local-presence");

        Assert.Equal(1, result.ExitCode);
        Assert.Empty(result.Calls);
        Assert.Contains("E.164", result.Error);
    }
}
