namespace DropCowboy.Examples.Lib;

/// <summary>
/// A problem the reader can fix: a missing variable, a bad value, an account that is
/// not set up yet. The message is printed as written and the command exits with 1.
/// </summary>
public sealed class RecipeException(string message) : Exception(message);
