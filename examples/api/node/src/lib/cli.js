// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Shared entry point for every script: run it, print any failure the way a
// reader can act on, and set the exit code. It sets process.exitCode instead
// of calling process.exit, so output is flushed and open handles close first.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RecipeError } from './config.js';
import { DcError } from './client.js';

const CONSENT_LINE = 'Send only to people who agreed to hear from you. Test with numbers you own.';

// Every send recipe calls this first, before it validates or requests anything.
function printConsentLine(out) {
    out.log(CONSENT_LINE);
}

async function runCli(main) {
    try {
        await main({ env: process.env, out: console });
    } catch (err) {
        printError(console, err);
        process.exitCode = 1;
    }
}

// True when the file is the one node was started with, not an import.
function isMain(moduleUrl) {
    return Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(moduleUrl);
}

// Prints the status, title, detail, code and request id of an API failure.
// DcError never holds request headers, so nothing secret can end up here.
function printError(out, err) {
    if (err instanceof RecipeError) {
        out.error('Error: ' + err.message);
        return;
    }
    if (err instanceof DcError) {
        out.error('The API request failed.');
        out.error('  Status:     ' + (err.status === 0 ? 'no response' : err.status));
        if (err.title) {
            out.error('  Title:      ' + err.title);
        }
        if (err.detail) {
            out.error('  Detail:     ' + err.detail);
        }
        if (err.code) {
            out.error('  Code:       ' + err.code);
        }
        if (err.requestId) {
            out.error('  Request id: ' + err.requestId + '  (quote this if you contact support)');
        }
        return;
    }
    out.error('Unexpected error: ' + ((err && err.message) || String(err)));
}

export { CONSENT_LINE, isMain, printConsentLine, printError, runCli };
