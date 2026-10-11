// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Receives the result of a send in two places:
//   POST /callbacks/dropcowboy  the per-send callback_url. Unsigned.
//   POST /webhooks/dropcowboy   a subscribed webhook. Signed.
// Run it on its own with "npm run receiver". The send recipes also start it.

import { createServer } from 'node:http';
import express from 'express';
import { ROUTES, callbackUrl as callbackUrlFrom, publicUrl, receiverPort } from './lib/config.js';
import { clientFromEnv } from './lib/client.js';
import { runCli, isMain } from './lib/cli.js';
import {
    callbackResult,
    describeResult,
    isHandledWebhookEvent,
    parseJsonObject,
    printable,
    webhookResult
} from './lib/events.js';
import { loadSigningSecrets } from './lib/signing-secrets.js';
import { verifySignature } from './lib/verify.js';

const BODY_LIMIT = '1mb';
const HOST = '127.0.0.1';

function createReceiver({ signingSecrets = [], log = console.log, nowSeconds = () => Date.now() / 1000 } = {}) {
    const events = [];
    const waiters = new Set();
    const seenEventIds = new Set();
    const secrets = signingSecrets.slice();

    function record(entry) {
        events.push(entry);
        for (const waiter of Array.from(waiters)) {
            if (waiter.predicate(entry)) {
                waiter.finish(entry);
            }
        }
    }

    function receivedEvents() {
        return events.slice();
    }

    // Resolves with the first matching event, or null when the time is up.
    function waitForEvent(predicate, timeoutMs) {
        const existing = events.find(predicate);
        if (existing) {
            return Promise.resolve(existing);
        }
        return new Promise(function (resolve) {
            let timer = null;
            const waiter = {
                predicate,
                finish(entry) {
                    clearTimeout(timer);
                    waiters.delete(waiter);
                    resolve(entry);
                }
            };
            timer = setTimeout(function () {
                waiter.finish(null);
            }, timeoutMs);
            waiters.add(waiter);
        });
    }

    function handleCallback(req, res) {
        const body = parseJsonObject(rawBodyOf(req));
        if (body === null) {
            res.status(400).json({ error: 'invalid_json' });
            return;
        }
        const result = callbackResult(body);
        log(describeResult('callback', null, result));
        record({ source: 'callback', event: 'callback', received_at: Date.now(), body, result });
        res.status(200).json({ received: true });
    }

    function handleWebhook(req, res) {
        if (secrets.length === 0) {
            log('webhook refused: no signing secret is configured (503)');
            res.status(503).json({ error: 'no_signing_secret' });
            return;
        }

        // Verify before anything else, on the raw bytes. express.raw leaves
        // req.body as the exact Buffer that was signed.
        const rawBody = rawBodyOf(req);
        const check = verifySignature({ rawBody, headers: req.headers, secrets, nowSeconds: nowSeconds() });
        if (!check.ok) {
            log('webhook rejected: ' + check.code + ' (401)');
            res.status(401).json({ error: check.code });
            return;
        }

        const body = parseJsonObject(rawBody);
        if (body === null) {
            res.status(400).json({ error: 'invalid_json' });
            return;
        }

        // The same event_id can arrive more than once (retries). Record the id
        // first, then answer. This Set only lives as long as the process; in
        // production use a unique index in your database so the check holds
        // across restarts and across servers.
        const eventId = eventIdOf(body, req.headers);
        if (eventId !== null) {
            if (seenEventIds.has(eventId)) {
                log('webhook duplicate event_id ' + printable(eventId) + ' ignored');
                res.status(200).json({ received: true, duplicate: true });
                return;
            }
            seenEventIds.add(eventId);
        }

        const eventName = typeof body.event === 'string' ? body.event : 'unknown';
        const result = isHandledWebhookEvent(eventName) ? webhookResult(body) : null;
        if (result === null) {
            log('webhook event ' + printable(eventName) + ' accepted (not handled by this example)');
        } else {
            log(describeResult('webhook', eventName, result));
        }
        record({ source: 'webhook', event: eventName, event_id: eventId, received_at: Date.now(), body, result });
        res.status(200).json({ received: true });
    }

    const app = express();
    app.disable('x-powered-by');
    app.get(ROUTES.health, function (req, res) {
        res.status(200).json({ ok: true });
    });
    // express.raw on these two routes only. Never put a JSON body parser in
    // front of the webhook route: it would hand you a parsed object, and the
    // signature is over the bytes.
    const raw = express.raw({ type: '*/*', limit: BODY_LIMIT });
    app.post(ROUTES.callback, raw, handleCallback);
    app.post(ROUTES.webhook, raw, handleWebhook);
    app.use(function (err, req, res, next) {
        if (res.headersSent) {
            next(err);
            return;
        }
        const status = err && err.status >= 400 && err.status < 500 ? err.status : 500;
        res.status(status).json({ error: status === 500 ? 'server_error' : 'bad_request' });
    });

    return { app, receivedEvents, waitForEvent };
}

async function startReceiver({ port = 0, signingSecrets = [], log = console.log, nowSeconds } = {}) {
    const receiver = createReceiver({ signingSecrets, log, nowSeconds });
    const server = createServer(receiver.app);
    await new Promise(function (resolve, reject) {
        server.once('error', reject);
        server.listen(port, HOST, resolve);
    });

    async function close() {
        await new Promise(function (resolve) {
            server.close(resolve);
            server.closeAllConnections();
        });
    }

    return {
        port: server.address().port,
        receivedEvents: receiver.receivedEvents,
        waitForEvent: receiver.waitForEvent,
        close
    };
}

// Starts the receiver the way the CLI and the recipes do: port from PORT,
// secrets from DC_WEBHOOK_SECRET or the API.
async function startReceiverFromEnv({ env, out, client }) {
    const signingSecrets = await loadSigningSecrets({ env, client, out });
    const receiver = await startReceiver({ port: receiverPort(env), signingSecrets, log: out.log });
    out.log('Receiver listening on http://' + HOST + ':' + receiver.port + ' (routes: ' + ROUTES.callback + ', ' + ROUTES.webhook + ')');
    return receiver;
}

function rawBodyOf(req) {
    return Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
}

// The id in the body is the one to trust. X-Event-Id is a fallback.
function eventIdOf(body, headers) {
    if (typeof body.event_id === 'string' && body.event_id !== '') {
        return body.event_id;
    }
    const header = headers['x-event-id'];
    return typeof header === 'string' && header !== '' ? header : null;
}

async function main({ env, out }) {
    const hasCredentials = typeof env.DC_KEY === 'string' && env.DC_KEY !== '' && typeof env.DC_SECRET === 'string' && env.DC_SECRET !== '';
    const client = hasCredentials ? clientFromEnv(env) : null;
    const receiver = await startReceiverFromEnv({ env, out, client });

    const base = publicUrl(env);
    if (base === null) {
        out.log('DC_PUBLIC_URL is not set. Expose port ' + receiver.port + ' with an HTTPS tunnel, then set DC_PUBLIC_URL to its address.');
    } else {
        out.log('Callback URL for sends:    ' + callbackUrlFrom(env));
        out.log('Webhook URL to subscribe:  ' + base + ROUTES.webhook);
    }
    out.log('Press Ctrl+C to stop.');

    await new Promise(function (resolve) {
        process.once('SIGINT', resolve);
        process.once('SIGTERM', resolve);
    });
    await receiver.close();
}

if (isMain(import.meta.url)) {
    await runCli(main);
}

export { createReceiver, startReceiver, startReceiverFromEnv };
