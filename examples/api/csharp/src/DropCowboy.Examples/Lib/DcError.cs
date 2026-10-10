using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Lib;

/// <summary>
/// A non-2xx answer from the API, or a failure to reach it (Status 0). It keeps only
/// what is safe and useful to show: the status, the problem details and the request id.
/// It never holds request headers, so printing it cannot leak your credentials.
/// </summary>
public sealed class DcError : Exception
{
    private DcError(int status, string? title, string? detail, string? code, string? requestId, JsonNode? body)
        : base(Summarize(status, title, detail))
    {
        Status = status;
        Title = title;
        Detail = detail;
        Code = code;
        RequestId = requestId;
        Body = body;
    }

    public int Status { get; }

    public string? Title { get; }

    public string? Detail { get; }

    public string? Code { get; }

    public string? RequestId { get; }

    public JsonNode? Body { get; }

    public static DcError FromResponse(int status, string bodyText, string? requestIdHeader)
    {
        var body = Json.Parse(bodyText);

        // Errors are problem details ({ title, detail, request_id }). A few routes answer
        // with { message } (429) or { error, message } (plan gates) instead, so read both.
        var title = Json.String(body, "title");
        var detail = Json.String(body, "detail") ?? Json.String(body, "message");
        var code = Json.String(body, "code") ?? Json.String(body, "details", "code") ?? Json.String(body, "error");
        var requestId = Json.String(body, "request_id") ?? Json.String(body, "meta", "request_id") ?? requestIdHeader;

        if (body is null && bodyText.Length > 0)
        {
            detail = Redact.Safe(bodyText, 200);
        }

        return new DcError(status, title, detail, code, requestId, body);
    }

    public static DcError Network(string message) => new(0, null, message, null, null, null);

    public IReadOnlyList<string> Report()
    {
        var lines = new List<string>
        {
            Status == 0 ? "Could not reach the API." : $"The API answered HTTP {Status}."
        };

        if (Title is not null)
        {
            lines.Add($"  title:      {Redact.Safe(Title)}");
        }

        if (Detail is not null)
        {
            lines.Add($"  detail:     {Redact.Safe(Detail)}");
        }

        if (Code is not null)
        {
            lines.Add($"  code:       {Redact.Safe(Code)}");
        }

        if (RequestId is not null)
        {
            lines.Add($"  request id: {Redact.Safe(RequestId)}");
        }

        return lines;
    }

    private static string Summarize(int status, string? title, string? detail)
    {
        return status == 0 ? detail ?? "network error" : $"HTTP {status}: {title ?? detail ?? "request failed"}";
    }
}
