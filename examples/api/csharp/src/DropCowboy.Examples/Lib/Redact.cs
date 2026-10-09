namespace DropCowboy.Examples.Lib;

/// <summary>Helpers for printing values that came from outside, or that are secret.</summary>
public static class Redact
{
    /// <summary>Shows only the last 4 characters, enough to tell two secrets apart.</summary>
    public static string Tail(string secret)
    {
        return secret.Length < 8 ? "****" : "..." + secret[^4..];
    }

    /// <summary>
    /// Makes a value from an unsigned or remote source safe to print: control
    /// characters become "?" so nobody can forge extra log lines, and long values are cut.
    /// </summary>
    public static string Safe(string? value, int maxLength = 200)
    {
        if (value is null)
        {
            return "";
        }

        var text = value.Length > maxLength ? value[..maxLength] + "..." : value;
        var chars = text.ToCharArray();
        for (var i = 0; i < chars.Length; i++)
        {
            if (chars[i] < ' ' || chars[i] > '~')
            {
                chars[i] = '?';
            }
        }

        return new string(chars);
    }
}
