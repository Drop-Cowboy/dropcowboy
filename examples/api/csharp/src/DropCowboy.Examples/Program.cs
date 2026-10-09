using System.Runtime.InteropServices;
using DropCowboy.Examples;
using DropCowboy.Examples.Lib;

using var stop = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) =>
{
    e.Cancel = true;
    stop.Cancel();
};

// docker stop and kill send SIGTERM. The web host would otherwise swallow it and keep running.
using var terminate = PosixSignalRegistration.Create(PosixSignal.SIGTERM, context =>
{
    context.Cancel = true;
    stop.Cancel();
});

return await Cli.RunAsync(args, Config.FromEnvironment(), Console.Out, Console.Error, stop.Token);
