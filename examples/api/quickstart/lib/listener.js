// Send only to people who agreed to hear from you. Test with numbers you own.
//
// A built-in receiver for results, on node:http with no framework:
//
//   POST /callbacks/dropcowboy   the per-send callback_url. Unsigned, one attempt.
//   POST /webhooks/dropcowboy    webhook deliveries. Signed, verified on the raw body.
//   GET  /health                 200 { "ok": true }
//
// Keep each handler to: verify, dedupe, record, answer. Do slow work later.

import http from 'node:http';

import { reasonMeaning } from './messages.js';
import { verify } from './signature.js';

const MAX_BODY_BYTES = 1024 * 1024;
const CALLBACK_PATH = '/callbacks/dropcowboy';
const WEBHOOK_PATH = '/webhooks/dropcowboy';
const HEALTH_PATH = '/health';
const ROUTES = {};
ROUTES[CALLBACK_PATH] = 'POST';
ROUTES[WEBHOOK_PATH] = 'POST';
ROUTES[HEALTH_PATH] = 'GET';

function sendJson(res, status, body, extraHeaders) {
    const text = JSON.stringify(body);
    res.writeHead(status, Object.assign({ 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(text) }, extraHeaders || {}));
    res.end(text);
}

function readRawBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        let size = 0;
        let tooLarge = false;
        req.on('data', (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                tooLarge = true;
                return;
            }
            chunks.push(chunk);
        });
        req.on('end', () => resolve(tooLarge ? null : Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

function parseObject(raw) {
    try {
        const parsed = JSON.parse(raw.toString('utf8'));
        return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

// Shapes a callback body or a webhook body into one result line.
function summarize(event) {
    const source = event.channel === 'callback' ? event.body : (event.body.data || {});
    return {
        channel: event.channel === 'callback' ? 'callback' : 'webhook ' + (event.body.event || 'unknown'),
        status: source.status,
        reason: source.reason,
        reasonCode: source.reason_code,
        to: event.channel === 'callback' ? source.phone_number : source.to,
        from: event.channel === 'callback' ? source.caller_id : source.from,
        foreignId: event.channel === 'callback' ? source.foreign_id : undefined,
        proofOfDeliveryUrl: source.proof_of_delivery_url
    };
}

function describe(event) {
    const s = summarize(event);
    const parts = [s.channel];
    if (s.status !== undefined) {
        parts.push('status=' + s.status);
    }
    if (s.reasonCode !== undefined) {
        parts.push('reason_code=' + s.reasonCode + ' (' + reasonMeaning(s.reasonCode) + ')');
    }
    if (s.to) {
        parts.push('to=' + s.to);
    }
    if (s.foreignId) {
        parts.push('foreign_id=' + s.foreignId);
    }
    if (s.proofOfDeliveryUrl && event.channel === 'webhook' && event.body.event === 'contact.rvm.receipt') {
        parts.push('proof_of_delivery_url=' + s.proofOfDeliveryUrl);
    }
    return parts.join(' ');
}

// Prints a delivery the way it arrived: what proves it is genuine, then the
// body. Only called once the signature has been verified.
function printPayload({ event, out }) {
    if (event.channel === 'webhook') {
        const h = event.headers;
        out.log('  Signature verified (X-Signature-Version ' + (h['x-signature-version'] || 'none') + ', X-Event-Id ' + (h['x-event-id'] || 'none') + ', X-Attempt ' + (h['x-attempt'] || 'none') + ')');
    } else {
        out.log('  Unsigned: a callback_url delivery carries no signature.');
    }
    const lines = JSON.stringify(event.body, null, 2).split('\n');
    for (let i = 0; i < lines.length; i++) {
        out.log('  ' + lines[i]);
    }
}

// secrets: the webhook signing secrets to accept (any one may match).
// Resolves with { port, url, events, waitFor, close } once listening.
function startListener({ port, host = '127.0.0.1', secrets, out, showPayloads = false, now = () => Date.now() / 1000 }) {
    const events = [];
    const seenEventIds = new Set();
    const waiters = [];

    function record(event) {
        events.push(event);
        out.log('Received ' + describe(event));
        if (showPayloads) {
            printPayload({ event, out });
        }
        for (let i = waiters.length - 1; i >= 0; i--) {
            if (waiters[i].match(event)) {
                const waiter = waiters.splice(i, 1)[0];
                clearTimeout(waiter.timer);
                waiter.resolve(event);
            }
        }
    }

    async function handle(req, res) {
        const pathname = new URL(req.url, 'http://localhost').pathname;
        const allowed = ROUTES[pathname];
        if (allowed === undefined) {
            sendJson(res, 404, { error: 'not_found' });
            return;
        }
        if (req.method !== allowed) {
            sendJson(res, 405, { error: 'method_not_allowed' }, { Allow: allowed });
            return;
        }
        if (pathname === HEALTH_PATH) {
            sendJson(res, 200, { ok: true });
            return;
        }

        const raw = await readRawBody(req);
        if (raw === null) {
            sendJson(res, 413, { error: 'body_too_large' });
            return;
        }

        if (pathname === CALLBACK_PATH) {
            const body = parseObject(raw);
            if (body === null) {
                sendJson(res, 400, { error: 'invalid_json' });
                return;
            }
            record({ channel: 'callback', body, headers: req.headers, receivedAt: Date.now() });
            sendJson(res, 200, { received: true });
            return;
        }

        if (secrets.length === 0) {
            sendJson(res, 503, { error: 'no_signing_secret' });
            return;
        }
        const check = verify({ rawBody: raw, headers: req.headers, secrets, nowSeconds: now() });
        if (!check.ok) {
            sendJson(res, 401, { error: check.code });
            return;
        }
        const body = parseObject(raw);
        if (body === null) {
            sendJson(res, 400, { error: 'invalid_json' });
            return;
        }
        const eventId = typeof body.event_id === 'string' && body.event_id !== '' ? body.event_id : req.headers['x-event-id'];
        if (eventId && seenEventIds.has(eventId)) {
            sendJson(res, 200, { received: true, duplicate: true });
            return;
        }
        if (eventId) {
            seenEventIds.add(eventId);
        }
        record({ channel: 'webhook', body, headers: req.headers, receivedAt: Date.now() });
        sendJson(res, 200, { received: true });
    }

    const server = http.createServer((req, res) => {
        handle(req, res).catch((err) => {
            out.error('Receiver error: ' + ((err && err.message) || err));
            if (!res.headersSent) {
                sendJson(res, 500, { error: 'internal_error' });
            }
        });
    });

    // Resolves with the first event (already received or arriving later) that
    // `match` accepts, or null after timeoutMs.
    function waitFor(match, timeoutMs) {
        for (let i = 0; i < events.length; i++) {
            if (match(events[i])) {
                return Promise.resolve(events[i]);
            }
        }
        return new Promise((resolve) => {
            const waiter = { match, resolve, timer: null };
            waiter.timer = setTimeout(() => {
                const index = waiters.indexOf(waiter);
                if (index >= 0) {
                    waiters.splice(index, 1);
                }
                resolve(null);
            }, timeoutMs);
            waiters.push(waiter);
        });
    }

    function close() {
        for (let i = 0; i < waiters.length; i++) {
            clearTimeout(waiters[i].timer);
            waiters[i].resolve(null);
        }
        waiters.length = 0;
        // Let a response in flight finish, then drop whatever is left.
        return new Promise((resolve) => {
            const force = setTimeout(() => server.closeAllConnections(), 1000);
            force.unref();
            server.close(() => {
                clearTimeout(force);
                resolve();
            });
            server.closeIdleConnections();
        });
    }

    return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, host, () => {
            const address = server.address();
            resolve({
                port: address.port,
                url: 'http://' + (host.includes(':') ? '[' + host + ']' : host) + ':' + address.port,
                events,
                waitFor,
                close
            });
        });
    });
}

export { CALLBACK_PATH, HEALTH_PATH, WEBHOOK_PATH, describe, startListener, summarize };
