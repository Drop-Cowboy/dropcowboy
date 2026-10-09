using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization.Metadata;

namespace DropCowboy.Examples.Lib;

/// <summary>Small helpers over JsonNode so call sites read like the API docs.</summary>
public static class Json
{
    // The default encoder writes "+" as \u002B. That is valid JSON, but it makes
    // phone numbers hard to read in logs, so use the relaxed encoder for the wire.
    private static readonly JsonSerializerOptions WireOptions = new()
    {
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
        // JsonArray.Add(string) wraps the value so it needs a resolver when written.
        TypeInfoResolver = new DefaultJsonTypeInfoResolver()
    };

    public static string Serialize(JsonNode node) => node.ToJsonString(WireOptions);

    public static JsonObject? ParseObject(ReadOnlySpan<byte> utf8)
    {
        try
        {
            return JsonNode.Parse(utf8) as JsonObject;
        }
        catch (JsonException)
        {
            return null;
        }
    }

    public static JsonNode? Parse(string text)
    {
        try
        {
            return JsonNode.Parse(text);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    public static JsonNode? Get(JsonNode? node, params string[] path)
    {
        var current = node;
        foreach (var key in path)
        {
            if (current is not JsonObject obj || !obj.TryGetPropertyValue(key, out current))
            {
                return null;
            }
        }

        return current;
    }

    public static string? String(JsonNode? node, params string[] path)
    {
        return Get(node, path) is JsonValue value && value.TryGetValue<string>(out var text) ? text : null;
    }

    public static int? Int(JsonNode? node, params string[] path)
    {
        return Get(node, path) is JsonValue value && value.TryGetValue<int>(out var number) ? number : null;
    }

    public static long? Long(JsonNode? node, params string[] path)
    {
        return Get(node, path) is JsonValue value && value.TryGetValue<long>(out var number) ? number : null;
    }

    public static bool? Bool(JsonNode? node, params string[] path)
    {
        return Get(node, path) is JsonValue value && value.TryGetValue<bool>(out var flag) ? flag : null;
    }

    /// <summary>The items of the array at this path, or nothing when it is missing or not an array.</summary>
    public static IEnumerable<JsonNode?> Items(JsonNode? node, params string[] path)
    {
        return Get(node, path) is JsonArray array ? array : Enumerable.Empty<JsonNode?>();
    }
}
