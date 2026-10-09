// Send only to people who agreed to hear from you. Test with numbers you own.
//
// check-receiver: posts a sample result to your endpoints the way Drop Cowboy
// does, and explains what each answer means. Nothing is sent to the API, and
// no API key is needed.
//
//   npm run check-receiver -- <callback-url> [webhook-url]
//
//   callback  An unsigned sample callback body. Drop Cowboy tries a callback
//             once and waits 10 seconds.
//   webhook   A sample contact.rvm.status event, signed with the first secret
//             in DC_WEBHOOK_SECRET and a fresh timestamp. Drop
//             Cowboy waits 5 seconds, and retries only 408, 429, 5xx and
//             timeouts.
//
// Any answer other than 2xx means a real result would be lost or dropped, and
// a 404 is never retried. Settings > API Logs shows what your endpoint
// answered for real sends.

import { randomUUID } from 'node:crypto';
import { isMain, runCli } from './lib/cli.js';
import { RecipeError, lastFour, splitList } from './lib/config.js';
import { API_LOGS_HINT } from './lib/hints.js';
import { isSampleValue, refuseSampleValues, sampleMessage } from './lib/sample-values.js';
import { signatureFor } from './lib/verify.js';

const CALLBACK_TIMEOUT_MS = 10000;
const WEBHOOK_TIMEOUT_MS = 5000;
const WEB_API_NO_ACTION = 'No action was found on the controller';
const MAX_BODY_CHARACTERS = 4000;

// The same bodies as ../fixtures/callback.rvm-success.json and
// ../fixtures/webhook.rvm-status.json (a test keeps them in step).
const SAMPLE_CALLBACK = {
    drop_id: 'b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52',
    team_id: '3f6c2a1e-8b4d-4c7a-9e2f-5a1b3c4d6e7f',
    session_id: '6b2e9d4a-8f1c-4a7e-9d3b-5c8f2a6e1d47',
    log_id: '2f8c4a6e-1b9d-4e3f-a7c5-8d2b6f4e9a13',
    contact_id: '5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d',
    phone_number: '+13125550142',
    caller_id: '+12125550100',
    product_code: 'rvm',
    status: 'success',
    reason: '',
    reason_code: 0,
    quantity: 1,
    product_cost: 0.04,
    compliance_fee: 0,
    tts_fee: 0,
    dnc: false,
    attempt_date: '2026-03-20T15:04:05.000Z',
    foreign_id: '7c1e5a93-2d4b-4f68-a0b9-3e6d8c1f5a27',
    proof_of_delivery_url: 'https://api-v2.dropcowboy.com/campaign/public/receipts/i9aI2nYpHEzKX0vysXph0ZGIYphbAduqA2PRRge0ICQ'
};

const SAMPLE_WEBHOOK = {
    event_id: '2694f968-93fd-44ca-9b92-2110ed1ee61e',
    event: 'contact.rvm.status',
    event_at: 1774041912000,
    data: {
        team_id: '3f6c2a1e-8b4d-4c7a-9e2f-5a1b3c4d6e7f',
        contact_id: '5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d',
        drop_id: 'b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52',
        campaign_id: null,
        campaign_type: 'rvm',
        status: 'success',
        reason: '',
        reason_code: 0,
        to: '+13125550142',
        from: '+12125550100'
    }
};

async function run({ env = process.env, out = console, argv = process.argv.slice(2), fetchFn = fetch, timeouts = {} } = {}) {
    const callbackUrl = argv[0];
    const webhookUrl = argv[1];
    if (!callbackUrl) {
        throw new RecipeError('Usage: npm run check-receiver -- <callback-url> [webhook-url]');
    }
    checkUrl('callback-url', callbackUrl);
    if (webhookUrl) {
        checkUrl('webhook-url', webhookUrl);
    }
    refuseSampleValues(env);
    const secret = webhookUrl ? webhookSecret(env) : null;

    const urls = webhookUrl ? [callbackUrl, webhookUrl] : [callbackUrl];
    for (let i = 0; i < urls.length; i++) {
        if (!isPublicHttps(urls[i])) {
            out.log('Note: ' + urls[i] + ' is not a public https:// address. Drop Cowboy only calls public HTTPS URLs, so this checks your code, not your setup.');
        }
    }

    const results = [];
    results.push(await checkOne({
        kind: 'callback',
        url: callbackUrl,
        rawBody: JSON.stringify(SAMPLE_CALLBACK),
        headers: { 'Content-Type': 'application/json' },
        timeoutMs: timeouts.callbackMs || CALLBACK_TIMEOUT_MS,
        fetchFn,
        out
    }));

    if (webhookUrl) {
        const rawBody = freshWebhookBody();
        const timestamp = String(Math.floor(Date.now() / 1000));
        out.log('Signing the webhook with the secret ending in ' + lastFour(secret));
        results.push(await checkOne({
            kind: 'webhook',
            url: webhookUrl,
            rawBody,
            headers: {
                'Content-Type': 'application/json',
                'X-Signature': 'sha256=' + signatureFor({ secret, timestamp, rawBody }).toString('hex'),
                'X-Timestamp': timestamp,
                'X-Signature-Version': 'v1',
                'X-Event-Id': JSON.parse(rawBody).event_id,
                'X-Attempt': '1'
            },
            timeoutMs: timeouts.webhookMs || WEBHOOK_TIMEOUT_MS,
            fetchFn,
            out
        }));
    }

    const ok = results.every(function (r) {
        return r.ok;
    });
    out.log(ok ? 'All checks passed.' : 'Some checks failed. ' + API_LOGS_HINT);
    return { ok, results };
}

// kind: 'callback' or 'webhook'. Returns { verdict, ok, explanation }, where
// verdict is one of ok, route, auth, slow, unreachable, rejected.
function classify({ kind, url, status, elapsedMs, timedOut, networkError, timeoutMs, body = '' }) {
    const seconds = Math.round(timeoutMs / 1000);
    if (timedOut || (status !== null && elapsedMs > timeoutMs)) {
        const retry = kind === 'callback'
            ? 'A callback is tried once, so a slow answer loses the result.'
            : 'A webhook that times out is retried, at most 3 attempts in all, then dropped.';
        return { verdict: 'slow', ok: false, explanation: 'Too slow: Drop Cowboy stops waiting after ' + seconds + ' seconds. ' + retry + ' Answer 2xx first, then do the work.' };
    }
    if (networkError) {
        return { verdict: 'unreachable', ok: false, explanation: 'Could not connect (' + networkError + '). Check the server or tunnel is running, the host is public, and the URL is right.' };
    }
    if (status >= 200 && status < 300) {
        return { verdict: 'ok', ok: true, explanation: 'OK: your endpoint accepted the ' + kind + '.' };
    }
    if (status === 404 || status === 405) {
        let explanation = 'The route or the verb is wrong (' + status + '). The endpoint must accept POST at exactly this path: ' + pathOf(url) + '. ' + lossFor(kind, status);
        if (body.includes(WEB_API_NO_ACTION)) {
            explanation += ' This is ASP.NET Web API saying no action matches: mark the method [HttpPost] with [Route("...")] for this exact path, and call config.MapHttpAttributeRoutes(). See the C# README.';
        }
        return { verdict: 'route', ok: false, explanation };
    }
    if (status === 401 || status === 403) {
        const why = kind === 'webhook'
            ? 'The signature check is failing. Compute HMAC-SHA256 of X-Timestamp + "." + the raw body with the signing secret of this webhook, compare it with X-Signature in constant time, and do it before you parse the JSON. Check DC_WEBHOOK_SECRET is that secret.'
            : 'Callbacks carry no signature and no credentials, so an endpoint that asks for authentication refuses every callback. Let this path through without authentication, and treat the body as a hint.';
        return { verdict: 'auth', ok: false, explanation: why + ' (' + status + ') ' + lossFor(kind, status) };
    }
    return { verdict: 'rejected', ok: false, explanation: 'Your endpoint answered ' + status + ', which is not 2xx. ' + lossFor(kind, status) };
}

function lossFor(kind, status) {
    if (kind === 'webhook' && (status === 408 || status === 429 || status >= 500)) {
        return 'A webhook answered with ' + status + ' is retried, at most 3 attempts in all, then dropped.';
    }
    if (kind === 'webhook') {
        return 'A webhook answered with ' + status + ' is not retried, so the event is lost.';
    }
    return 'A callback is not retried, so that result is lost.';
}

async function checkOne({ kind, url, rawBody, headers, timeoutMs, fetchFn, out }) {
    const answer = await postOnce({ url, rawBody, headers, timeoutMs, fetchFn });
    const verdict = classify({ kind, url, status: answer.status, elapsedMs: answer.elapsedMs, timedOut: answer.timedOut, networkError: answer.networkError, timeoutMs, body: answer.body });
    const status = answer.status === null ? (answer.timedOut ? 'no answer (timeout)' : 'no answer') : String(answer.status);
    out.log(kind + ' ' + url);
    out.log('  answered: ' + status + ' in ' + answer.elapsedMs + ' ms');
    out.log('  ' + verdict.explanation);
    return { kind, url, status: answer.status, elapsedMs: answer.elapsedMs, verdict: verdict.verdict, ok: verdict.ok };
}

// One POST, no retries and no redirects, like Drop Cowboy. Returns
// { status, elapsedMs, timedOut, networkError, body }.
async function postOnce({ url, rawBody, headers, timeoutMs, fetchFn }) {
    const started = Date.now();
    try {
        const response = await fetchFn(url, {
            method: 'POST',
            headers,
            body: rawBody,
            redirect: 'manual',
            signal: AbortSignal.timeout(timeoutMs)
        });
        const text = await response.text();
        return { status: response.status, elapsedMs: Date.now() - started, timedOut: false, networkError: null, body: text.slice(0, MAX_BODY_CHARACTERS) };
    } catch (err) {
        const timedOut = Boolean(err && (err.name === 'TimeoutError' || err.name === 'AbortError'));
        const cause = err && err.cause && err.cause.code ? err.cause.code : (err && err.message) || 'network error';
        return { status: null, elapsedMs: Date.now() - started, timedOut, networkError: timedOut ? null : cause, body: '' };
    }
}

// A fresh event_id and event_at, so a receiver that drops repeated event ids
// still handles this one.
function freshWebhookBody() {
    const body = JSON.parse(JSON.stringify(SAMPLE_WEBHOOK));
    body.event_id = randomUUID();
    body.event_at = Date.now();
    return JSON.stringify(body);
}

function webhookSecret(env) {
    const secret = splitList(env.DC_WEBHOOK_SECRET)[0];
    if (!secret) {
        throw new RecipeError('Set DC_WEBHOOK_SECRET to the signing secret of your webhook, so the sample webhook is signed the way your endpoint expects.');
    }
    return secret;
}

function checkUrl(name, value) {
    if (!/^https?:\/\/[^/\s]+/i.test(value)) {
        throw new RecipeError(name + ' must be a full http:// or https:// URL, for example https://abc123.example.com/callbacks/dropcowboy');
    }
    if (isSampleValue(value)) {
        throw new RecipeError(sampleMessage(name, value));
    }
}

function isPublicHttps(url) {
    let parsed;
    try {
        parsed = new URL(url);
    } catch (err) {
        return false;
    }
    const host = parsed.hostname.replace(/^\[|\]$/g, '').toLowerCase();
    if (parsed.protocol !== 'https:') {
        return false;
    }
    return !(host === 'localhost' || host.endsWith('.local') || host === '::1'
        || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host)
        || /^172\.(1[6-9]|2\d|3[01])\./.test(host) || /^169\.254\./.test(host));
}

function pathOf(url) {
    try {
        return new URL(url).pathname;
    } catch (err) {
        return url;
    }
}

if (isMain(import.meta.url)) {
    await runCli(async function (context) {
        const outcome = await run(context);
        if (!outcome.ok) {
            process.exitCode = 1;
        }
    });
}

export { CALLBACK_TIMEOUT_MS, SAMPLE_CALLBACK, SAMPLE_WEBHOOK, WEBHOOK_TIMEOUT_MS, classify, isPublicHttps, run };
