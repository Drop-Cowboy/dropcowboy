using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Tests;

/// <summary>Finds the fixtures shared by every language and loads the signature vectors.</summary>
public static class Fixtures
{
    public static readonly string Directory = Locate();

    public static string Read(string name) => File.ReadAllText(Path.Combine(Directory, name));

    public static byte[] ReadBytes(string name) => File.ReadAllBytes(Path.Combine(Directory, name));

    public static SignatureVector Vector() => SignatureVector.Load();

    private static string Locate()
    {
        for (var dir = new DirectoryInfo(AppContext.BaseDirectory); dir is not null; dir = dir.Parent)
        {
            var candidate = Path.Combine(dir.FullName, "fixtures");
            if (File.Exists(Path.Combine(candidate, "signature-vectors.json")))
            {
                return candidate;
            }
        }

        throw new DirectoryNotFoundException("fixtures/signature-vectors.json was not found above " + AppContext.BaseDirectory);
    }
}

public sealed record SignatureVector(
    string Secret,
    string OtherSecret,
    string Timestamp,
    long NowValid,
    long NowStale,
    string RawBody,
    string Signature,
    string TamperedRawBody,
    string SignatureFromOtherSecret)
{
    public static SignatureVector Load()
    {
        var json = JsonNode.Parse(Fixtures.Read("signature-vectors.json"))!;
        return new SignatureVector(
            json["secret"]!.GetValue<string>(),
            json["other_secret"]!.GetValue<string>(),
            json["timestamp"]!.GetValue<string>(),
            json["now_seconds_valid"]!.GetValue<long>(),
            json["now_seconds_stale"]!.GetValue<long>(),
            json["raw_body"]!.GetValue<string>(),
            json["signature"]!.GetValue<string>(),
            json["tampered_raw_body"]!.GetValue<string>(),
            json["signature_from_other_secret"]!.GetValue<string>());
    }
}
