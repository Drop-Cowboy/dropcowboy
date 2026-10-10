// Send only to people who agreed to hear from you. Test with numbers you own.
//
// A stop the user can act on. The quickstart prints the message, never a
// stack trace, and exits with `exitCode`.

class Stop extends Error {
    constructor(message, exitCode = 1) {
        super(message);
        this.name = 'Stop';
        this.exitCode = exitCode;
    }
}

export { Stop };
