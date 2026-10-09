using System.Text.Json.Nodes;

namespace DropCowboy.Examples.Lib;

public enum AudioFileKind
{
    /// <summary>A file on this computer, sent with a signed upload.</summary>
    LocalFile,

    /// <summary>A public http(s) address the API fetches (import).</summary>
    Url
}

/// <summary>What DC_AUDIO_FILE names: a local .mp3 or .wav, or the URL of one.</summary>
public sealed record AudioFile(AudioFileKind Kind, string Location, string Ext, string Name)
{
    private static readonly string[] Formats = [".mp3", ".wav"];

    /// <summary>Checked before any request, so a typo stops the run early.</summary>
    public static AudioFile FromValue(string value, string? mediaName = null)
    {
        var isUrl = Uri.TryCreate(value, UriKind.Absolute, out var uri)
            && (uri.Scheme == Uri.UriSchemeHttps || uri.Scheme == Uri.UriSchemeHttp);
        if (isUrl)
        {
            var urlPath = uri!.AbsolutePath;
            var name = mediaName ?? Uri.UnescapeDataString(urlPath[(urlPath.LastIndexOf('/') + 1)..]);
            return new AudioFile(AudioFileKind.Url, value, FormatOf(urlPath), name);
        }

        var ext = FormatOf(value);
        if (!File.Exists(value))
        {
            throw new RecipeException($"DC_AUDIO_FILE: there is no file at {value}.");
        }

        if (new FileInfo(value).Length == 0)
        {
            throw new RecipeException($"DC_AUDIO_FILE: {value} is empty.");
        }

        return new AudioFile(AudioFileKind.LocalFile, value, ext, mediaName ?? Path.GetFileName(value));
    }

    private static string FormatOf(string name)
    {
        var ext = Path.GetExtension(name).ToLowerInvariant();
        return Formats.Contains(ext) ? ext : throw new RecipeException("DC_AUDIO_FILE must name a .mp3 or .wav file.");
    }
}

/// <summary>
/// Puts an audio file on your account and returns its media_id. Both ways need an
/// API key with the media:write scope.
///
/// A file on this computer (signed upload):
/// 1. POST /media/public/media {name, type: "rvm", signed_upload: true} answers with the
///    media_id and one upload URL per format: upload.mp3 and upload.wav, each {url, content_type}.
/// 2. PUT the bytes to the URL for the file's format, with a Content-Type header of exactly
///    that content_type. The URL is already signed, so it never gets your key or secret.
/// 3. POST /media/public/media/{media_id}/complete. Until then the file cannot be sent.
///
/// A file at a public URL (import): POST /media/public/media {name, type: "rvm", url, ext}.
/// The file is fetched and ready when the call returns.
/// </summary>
public static class MediaUpload
{
    public static readonly TimeSpan UploadTimeout = TimeSpan.FromSeconds(120);

    public static async Task<string> UploadAsync(
        DcClient client, AudioFile source, TextWriter output, CancellationToken ct, HttpMessageHandler? storageHandler = null)
    {
        if (source.Kind == AudioFileKind.Url)
        {
            output.WriteLine($"Importing {Redact.Safe(source.Location, 400)} as \"{Redact.Safe(source.Name)}\"...");
            var imported = await client.PostAsync(
                "/media/public/media",
                new JsonObject { ["name"] = source.Name, ["type"] = "rvm", ["url"] = source.Location, ["ext"] = source.Ext },
                ct);
            var importedId = MediaIdOf(imported);
            output.WriteLine($"Imported: media_id={importedId}");
            return importedId;
        }

        var content = await File.ReadAllBytesAsync(source.Location, ct);
        var created = await client.PostAsync(
            "/media/public/media",
            new JsonObject { ["name"] = source.Name, ["type"] = "rvm", ["signed_upload"] = true },
            ct);
        var mediaId = MediaIdOf(created);
        var format = source.Ext[1..];
        var url = Json.String(created, "data", "upload", format, "url");
        var contentType = Json.String(created, "data", "upload", format, "content_type");
        if (url is null || contentType is null)
        {
            throw new RecipeException($"The API did not return an upload URL for {source.Ext} files.");
        }

        output.WriteLine($"Uploading {Redact.Safe(source.Name)} ({content.Length} bytes, {contentType})...");
        await PutFileAsync(url, contentType, content, storageHandler, ct);

        await client.PostAsync($"/media/public/media/{mediaId}/complete", new JsonObject(), ct);
        output.WriteLine($"Uploaded: media_id={mediaId}");
        return mediaId;
    }

    // Sending x-key or x-secret here would hand them to the storage service, and a
    // Content-Type other than the exact one returned breaks the signature (403).
    private static async Task PutFileAsync(
        string url, string contentType, byte[] content, HttpMessageHandler? handler, CancellationToken ct)
    {
        using var http = handler is null
            ? new HttpClient(new HttpClientHandler { AllowAutoRedirect = false })
            : new HttpClient(handler, disposeHandler: false);
        http.Timeout = UploadTimeout;

        using var body = new ByteArrayContent(content);
        body.Headers.TryAddWithoutValidation("Content-Type", contentType);

        int status;
        try
        {
            using var response = await http.PutAsync(url, body, ct);
            status = (int)response.StatusCode;
        }
        catch (TaskCanceledException) when (!ct.IsCancellationRequested)
        {
            throw new RecipeException(
                $"The upload did not finish within {UploadTimeout.TotalSeconds:0} seconds. Try again, or import the file from a public URL.");
        }
        catch (HttpRequestException ex)
        {
            throw new RecipeException("Could not reach the upload URL: " + Redact.Safe(ex.Message));
        }

        if (status == 403)
        {
            throw new RecipeException(Hints.Upload403);
        }

        if (status is < 200 or >= 300)
        {
            throw new RecipeException($"The upload URL answered {status}. Run \"dotnet run -- upload-media\" again for fresh URLs.");
        }
    }

    private static string MediaIdOf(JsonNode? response)
    {
        return Json.String(response, "data", "media_id") ?? throw new RecipeException("The API did not return a media_id.");
    }
}
