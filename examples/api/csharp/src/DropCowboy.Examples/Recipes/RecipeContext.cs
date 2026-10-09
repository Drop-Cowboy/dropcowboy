using DropCowboy.Examples.Lib;

namespace DropCowboy.Examples.Recipes;

/// <summary>Everything a recipe needs: settings, the API client and where to print.</summary>
public sealed record RecipeContext(Config Config, DcClient Client, TextWriter Out)
{
    /// <summary>How often to check a number import. Tests shorten it.</summary>
    public TimeSpan PollInterval { get; init; } = TimeSpan.FromSeconds(2);

    /// <summary>How long to wait for a number import to finish.</summary>
    public TimeSpan PollTimeout { get; init; } = TimeSpan.FromSeconds(60);
}
