// Run with: npm test (or node --test test/)
// The receiver, through the real HTTP stack on an ephemeral port.

import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { readFixture, readFixtureText } from '../lib/fixtures.js';
import { startListener } from '../lib/listener.js';
import { sign, verify } from '../lib/signature.js';

const vectors = readFixture('signature-vectors.json');
const SECRET = 'b8d2f6a4-3c9e-4a1f-8e7d-5b3c9f1a7e26';
const quiet = { log: () => {}, error: () => {} };
const listeners = [];

async function listen(options = {}) {
    const listener = await startListener(Object.assign({ port: 0, secrets: [SECRET], out: quiet }, options));
    listeners.push(listener);
    return listener;
}

afterEach(async () => {
    while (listeners.length > 0) {
        await listeners.pop().close();
    }
});

function webhookBody(eventId = '2694f968-93fd-44ca-9b92-2110ed1ee61e') {
    const body = readFixture('webhook.rvm-status.json');
    body.event_id = eventId;
    return JSON.stringify(body);
}

async function postWebhook(listener, rawBody, headers) {
    const response = await fetch(listener.url + '/webhooks/dropcowboy', { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, headers), body: rawBody });
    return { status: response.status, body: await response.json() };
}

function signedHeaders(rawBody, { secret = SECRET, timestamp = Math.floor(Date.now() / 1000) } = {}) {
    return { 'X-Signature': sign({ secret, timestamp, rawBody }), 'X-Timestamp': String(timestamp) };
}

describe('signature vectors (fixtures/signature-vectors.json)', () => {
    const base = { rawBody: vectors.raw_body, secrets: [vectors.secret] };
    const headers = { 'x-signature': vectors.signature, 'x-timestamp': vectors.timestamp };

    it('signs to the vector signature', () => {
        assert.equal(sign({ secret: vectors.secret, timestamp: vectors.timestamp, rawBody: vectors.raw_body }), vectors.signature);
    });
    it('accepts the vector inside the window', () => {
        assert.deepEqual(verify(Object.assign({ headers, nowSeconds: vectors.now_seconds_valid }, base)), { ok: true });
    });
    it('rejects it outside the 300 second window as stale_timestamp', () => {
        assert.equal(verify(Object.assign({ headers, nowSeconds: vectors.now_seconds_stale }, base)).code, 'stale_timestamp');
    });
    it('rejects a tampered body', () => {
        assert.equal(verify({ rawBody: vectors.tampered_raw_body, headers, secrets: [vectors.secret], nowSeconds: vectors.now_seconds_valid }).code, 'invalid_signature');
    });
    it('rejects a signature from another secret, and accepts when a second configured secret matches', () => {
        const other = { 'x-signature': vectors.signature_from_other_secret, 'x-timestamp': vectors.timestamp };
        assert.equal(verify(Object.assign({ headers: other, nowSeconds: vectors.now_seconds_valid }, base)).code, 'invalid_signature');
        assert.deepEqual(verify({ rawBody: vectors.raw_body, headers: other, secrets: [vectors.secret, vectors.other_secret], nowSeconds: vectors.now_seconds_valid }), { ok: true });
    });
    it('rejects missing headers, a missing sha256= prefix, a non-numeric timestamp and an unknown version', () => {
        assert.equal(verify(Object.assign({ headers: { 'x-timestamp': vectors.timestamp }, nowSeconds: vectors.now_seconds_valid }, base)).code, 'missing_signature');
        assert.equal(verify(Object.assign({ headers: { 'x-signature': vectors.signature.slice(7), 'x-timestamp': vectors.timestamp }, nowSeconds: vectors.now_seconds_valid }, base)).code, 'invalid_signature');
        assert.equal(verify(Object.assign({ headers: { 'x-signature': vectors.signature, 'x-timestamp': 'soon' }, nowSeconds: vectors.now_seconds_valid }, base)).code, 'stale_timestamp');
        assert.equal(verify(Object.assign({ headers: Object.assign({ 'x-signature-version': 'v2' }, headers), nowSeconds: vectors.now_seconds_valid }, base)).code, 'invalid_signature');
    });
});

describe('POST /webhooks/dropcowboy', () => {
    it('accepts a correctly signed delivery', async () => {
        const listener = await listen();
        const rawBody = webhookBody();
        const result = await postWebhook(listener, rawBody, signedHeaders(rawBody));
        assert.deepEqual(result, { status: 200, body: { received: true } });
        assert.equal(listener.events.length, 1);
        assert.equal(listener.events[0].body.event, 'contact.rvm.status');
    });

    it('rejects a bad signature with 401 invalid_signature', async () => {
        const listener = await listen();
        const rawBody = webhookBody();
        const result = await postWebhook(listener, rawBody, signedHeaders(rawBody, { secret: 'not-the-secret' }));
        assert.deepEqual(result, { status: 401, body: { error: 'invalid_signature' } });
        assert.equal(listener.events.length, 0);
    });

    it('rejects a body changed after signing (it verifies the raw bytes)', async () => {
        const listener = await listen();
        const rawBody = webhookBody();
        const reformatted = JSON.stringify(JSON.parse(rawBody), null, 2);
        const result = await postWebhook(listener, reformatted, signedHeaders(rawBody));
        assert.equal(result.status, 401);
    });

    it('rejects a missing signature with 401 missing_signature', async () => {
        const listener = await listen();
        const result = await postWebhook(listener, webhookBody(), {});
        assert.deepEqual(result, { status: 401, body: { error: 'missing_signature' } });
    });

    it('enforces the 300 second replay window both ways', async () => {
        const now = 1774041990;
        const listener = await listen({ now: () => now });
        const rawBody = webhookBody();
        assert.equal((await postWebhook(listener, rawBody, signedHeaders(rawBody, { timestamp: now - 300 }))).status, 200);
        const old = webhookBody('7b1d3f5a-9c2e-4a6b-8d1f-3a5c7e9b2d4f');
        assert.deepEqual(await postWebhook(listener, old, signedHeaders(old, { timestamp: now - 301 })), { status: 401, body: { error: 'stale_timestamp' } });
        const future = webhookBody('8c2e4a6b-1d3f-4b5a-9e7c-2b4d6f8a1c3e');
        assert.deepEqual(await postWebhook(listener, future, signedHeaders(future, { timestamp: now + 301 })), { status: 401, body: { error: 'stale_timestamp' } });
    });

    it('answers a repeated event_id with duplicate: true and records it once', async () => {
        const listener = await listen();
        const rawBody = webhookBody();
        assert.deepEqual(await postWebhook(listener, rawBody, signedHeaders(rawBody)), { status: 200, body: { received: true } });
        assert.deepEqual(await postWebhook(listener, rawBody, signedHeaders(rawBody)), { status: 200, body: { received: true, duplicate: true } });
        assert.equal(listener.events.length, 1);
    });

    it('dedupes on X-Event-Id when the body has no event_id', async () => {
        const listener = await listen();
        const rawBody = JSON.stringify({ event: 'contact.rvm.receipt', data: { proof_of_delivery_url: 'https://api-v2.dropcowboy.com/campaign/public/receipts/abc' } });
        const headers = Object.assign({ 'X-Event-Id': '3e5a7c9f-2b4d-4f6a-8c1e-5d7f9b2a4c6e' }, signedHeaders(rawBody));
        assert.equal((await postWebhook(listener, rawBody, headers)).body.duplicate, undefined);
        assert.equal((await postWebhook(listener, rawBody, headers)).body.duplicate, true);
    });

    it('answers 503 when no signing secret is configured', async () => {
        const listener = await listen({ secrets: [] });
        const rawBody = webhookBody();
        assert.deepEqual(await postWebhook(listener, rawBody, signedHeaders(rawBody)), { status: 503, body: { error: 'no_signing_secret' } });
    });

    it('answers 400 for a signed body that is not a JSON object', async () => {
        const listener = await listen();
        const rawBody = '[1,2,3]';
        assert.deepEqual(await postWebhook(listener, rawBody, signedHeaders(rawBody)), { status: 400, body: { error: 'invalid_json' } });
    });
});

describe('POST /callbacks/dropcowboy and the other routes', () => {
    it('accepts fixtures/callback.rvm-success.json', async () => {
        const listener = await listen();
        const response = await fetch(listener.url + '/callbacks/dropcowboy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: readFixtureText('callback.rvm-success.json') });
        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { received: true });
        assert.equal(listener.events[0].body.foreign_id, '7c1e5a93-2d4b-4f68-a0b9-3e6d8c1f5a27');
    });

    it('rejects a JSON array with 400', async () => {
        const listener = await listen();
        const response = await fetch(listener.url + '/callbacks/dropcowboy', { method: 'POST', body: '[]' });
        assert.equal(response.status, 400);
    });

    it('answers GET /health, 405 for the wrong verb and 404 for an unknown path', async () => {
        const listener = await listen();
        const health = await fetch(listener.url + '/health');
        assert.deepEqual([health.status, await health.json()], [200, { ok: true }]);
        const wrongVerb = await fetch(listener.url + '/webhooks/dropcowboy');
        assert.equal(wrongVerb.status, 405);
        assert.equal(wrongVerb.headers.get('allow'), 'POST');
        await wrongVerb.arrayBuffer();
        const unknown = await fetch(listener.url + '/callbacks/other', { method: 'POST', body: '{}' });
        assert.equal(unknown.status, 404);
        await unknown.arrayBuffer();
    });

    it('waitFor resolves with an event that arrives later, and null on timeout', async () => {
        const listener = await listen();
        const pending = listener.waitFor((event) => event.body.foreign_id === 'f1e2d3c4-b5a6-4978-8a6b-5c4d3e2f1a0b', 2000);
        await fetch(listener.url + '/callbacks/dropcowboy', { method: 'POST', body: JSON.stringify({ foreign_id: 'f1e2d3c4-b5a6-4978-8a6b-5c4d3e2f1a0b', status: 'success' }) });
        assert.equal((await pending).body.status, 'success');
        assert.equal(await listener.waitFor(() => false, 50), null);
    });
});
