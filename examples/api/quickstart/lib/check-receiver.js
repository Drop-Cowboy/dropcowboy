// Send only to people who agreed to hear from you. Test with numbers you own.
//
// check-receiver: posts a sample result to your endpoints the way Drop Cowboy
// does, and explains what the answer means. Nothing is sent to the API.
//
//   callback  ../fixtures/callback.rvm-success.json, unsigned, 10 second timeout
//   webhook   ../fixtures/webhook.rvm-status.json, signed with DC_WEBHOOK_SECRET
//             and a fresh timestamp, 5 second timeout

import { randomUUID } from 'node:crypto';

import { readFixture, readFixtureText } from './fixtures.js';
import { API_LOGS_HINT } from './messages.js';
import { sign } from './signature.js';

const CALLBACK_TIMEOUT_MS = 10000;
const WEBHOOK_TIMEOUT_MS = 5000;

// Posts once. Returns { status, elapsedMs, timedOut, networkError }.
async function postOnce({ url, rawBody, headers, timeoutMs, fetchFn = fetch }) {
    const started = Date.now();
    try {
        const response = await fetchFn(url, {
            method: 'POST',
            headers,
            body: rawBody,
            redirect: 'manual',
            signal: AbortSignal.timeout(timeoutMs)
        });
        await response.arrayBuffer();
        return { status: response.status, elapsedMs: Date.now() - started, timedOut: false, networkError: null };
    } catch (err) {
        const timedOut = Boolean(err && (err.name === 'TimeoutError' || err.name === 'AbortError'));
        const cause = err && err.cause && err.cause.code ? err.cause.code : (err && err.message) || 'network error';
        return { status: null, elapsedMs: Date.now() - started, timedOut, networkError: timedOut ? null : cause };
    }
}

// kind: 'callback' or 'webhook'. Returns { verdict, ok, explanation }.
// verdict is one of ok, route, auth, slow, unreachable, rejected.
function classify({ kind, url, status, timedOut, networkError, timeoutMs }) {
    const pathname = safePath(url);
    const seconds = Math.round(timeoutMs / 1000);
    if (timedOut) {
        const retry = kind === 'callback'
            ? 'A callback is tried once, so a slow answer loses the result.'
            : 'A webhook that times out is retried, at most 3 attempts in all, so a slow endpoint also gets duplicates.';
        return { verdict: 'slow', ok: false, explanation: 'Too slow: no answer within ' + seconds + ' seconds, and Drop Cowboy stops waiting after ' + seconds + ' seconds. ' + retry + ' Answer 2xx first, then do the work.' };
    }
    if (networkError) {
        return { verdict: 'unreachable', ok: false, explanation: 'Could not connect (' + networkError + '). Check the tunnel is running, the host is public, and the URL is right.' };
    }
    if (status >= 200 && status < 300) {
        return { verdict: 'ok', ok: true, explanation: 'OK: your endpoint accepted the ' + kind + '.' };
    }
    if (status === 404 || status === 405) {
        return { verdict: 'route', ok: false, explanation: 'Route or verb wrong (' + status + '). The endpoint must accept POST at exactly this path: ' + pathname + '. ' + notRetried(kind, status) };
    }
    if (status === 401 || status === 403) {
        const why = kind === 'webhook'
            ? 'The signature check is failing. Compute HMAC-SHA256 of X-Timestamp + "." + the raw body with the signing secret of this webhook, and compare it with X-Signature before you parse the JSON. Check DC_WEBHOOK_SECRET is that secret.'
            : 'Callbacks carry no signature and no credentials, so an endpoint that asks for authentication refuses every callback. Let this path through without authentication, and treat the body as a hint.';
        return { verdict: 'auth', ok: false, explanation: why + ' (' + status + '). ' + notRetried(kind, status) };
    }
    return { verdict: 'rejected', ok: false, explanation: 'Your endpoint answered ' + status + ', which is not 2xx. ' + notRetried(kind, status) };
}

function notRetried(kind, status) {
    if (kind === 'webhook' && (status === 408 || status === 429 || status >= 500)) {
        return 'A webhook answered with ' + status + ' is retried, at most 3 attempts in all, then dropped.';
    }
    if (kind === 'webhook') {
        return 'We don\'t retry a webhook answered with ' + status + ', so the event is lost.';
    }
    return 'We don\'t retry a callback, so that result is lost.';
}

function safePath(url) {
    try {
        return new URL(url).pathname;
    } catch {
        return url;
    }
}

function isLocalUrl(url) {
    try {
        const host = new URL(url).hostname;
        return host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '[::1]' || host.endsWith('.local');
    } catch {
        return false;
    }
}

function webhookBody() {
    const body = readFixture('webhook.rvm-status.json');
    body.event_id = randomUUID();
    body.event_at = Date.now();
    return JSON.stringify(body);
}

async function checkOne({ kind, url, rawBody, headers, timeoutMs, out }) {
    const result = await postOnce({ url, rawBody, headers, timeoutMs });
    const verdict = classify({ kind, url, status: result.status, timedOut: result.timedOut, networkError: result.networkError, timeoutMs });
    const status = result.status === null ? (result.timedOut ? 'timeout' : 'no answer') : String(result.status);
    out.log(kind + ' ' + url);
    out.log('  answered: ' + status + ' in ' + result.elapsedMs + ' ms');
    out.log('  ' + verdict.explanation);
    return Object.assign({ kind, url, status: result.status, elapsedMs: result.elapsedMs }, verdict);
}

// Returns { results, ok }. A webhook check needs at least one secret.
async function checkReceiver({ callbackUrl, webhookUrl, secret, out, timeouts = {} }) {
    const results = [];
    const urls = [callbackUrl].concat(webhookUrl ? [webhookUrl] : []);
    for (let i = 0; i < urls.length; i++) {
        if (isLocalUrl(urls[i])) {
            out.log('Note: ' + urls[i] + ' is on this computer. Drop Cowboy cannot reach it; use your tunnel address for the real thing.');
        }
    }

    results.push(await checkOne({
        kind: 'callback',
        url: callbackUrl,
        rawBody: readFixtureText('callback.rvm-success.json'),
        headers: { 'Content-Type': 'application/json' },
        timeoutMs: timeouts.callbackMs || CALLBACK_TIMEOUT_MS,
        out
    }));

    if (webhookUrl) {
        const rawBody = webhookBody();
        const timestamp = String(Math.floor(Date.now() / 1000));
        const parsed = JSON.parse(rawBody);
        results.push(await checkOne({
            kind: 'webhook',
            url: webhookUrl,
            rawBody,
            headers: {
                'Content-Type': 'application/json',
                'X-Signature': sign({ secret, timestamp, rawBody }),
                'X-Timestamp': timestamp,
                'X-Signature-Version': 'v1',
                'X-Event-Id': parsed.event_id,
                'X-Attempt': '1'
            },
            timeoutMs: timeouts.webhookMs || WEBHOOK_TIMEOUT_MS,
            out
        }));
    }

    const ok = results.every((result) => result.ok);
    if (!ok) {
        out.log(API_LOGS_HINT);
    }
    return { results, ok };
}

export { CALLBACK_TIMEOUT_MS, WEBHOOK_TIMEOUT_MS, checkReceiver, classify };
