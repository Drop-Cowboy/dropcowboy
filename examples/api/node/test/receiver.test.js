import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { startReceiver } from '../src/receiver.js';
import { FIXTURE_FOREIGN_ID, captureOutput, fixtureJson, fixtureText, postRaw, sign } from '../testkit/helpers.js';

const vectors = fixtureJson('signature-vectors.json');
const callbackBody = fixtureText('callback.rvm-success.json');
const receiptBody = fixtureText('webhook.rvm-receipt.json');

// The vector timestamp is fixed in 2026, so the receiver's clock is fixed too.
const NOW_SECONDS = vectors.now_seconds_valid;

function signedHeaders(rawBody, secret = vectors.secret, timestamp = vectors.timestamp) {
    return { 'X-Signature': sign(secret, timestamp, rawBody), 'X-Timestamp': timestamp };
}

async function withReceiver(options, body) {
    const out = captureOutput();
    const receiver = await startReceiver(Object.assign({ log: out.log, nowSeconds: () => NOW_SECONDS }, options));
    try {
        await body({ receiver, out, base: 'http://127.0.0.1:' + receiver.port });
    } finally {
        await receiver.close();
    }
}

describe('webhook route', () => {
    let rawBody;
    before(() => {
        rawBody = vectors.raw_body;
    });

    it('answers 200 for a correctly signed delivery and records it', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ receiver, base, out }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', rawBody, signedHeaders(rawBody));
            assert.equal(res.status, 200);
            assert.deepEqual(await res.json(), { received: true });

            const events = receiver.receivedEvents();
            assert.equal(events.length, 1);
            assert.equal(events[0].event, 'contact.rvm.status');
            assert.equal(events[0].result.reason_code, 0);
            assert.match(out.text(), /webhook contact\.rvm\.status status=success reason="" reason_code=0 to=\+13125550142 from=\+12125550100/);
        });
    });

    it('answers 401 invalid_signature for a tampered body', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ receiver, base }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', vectors.tampered_raw_body, signedHeaders(rawBody));
            assert.equal(res.status, 401);
            assert.deepEqual(await res.json(), { error: 'invalid_signature' });
            assert.equal(receiver.receivedEvents().length, 0);
        });
    });

    it('answers 401 invalid_signature for a signature from another secret', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ base }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', rawBody, { 'X-Signature': vectors.signature_from_other_secret, 'X-Timestamp': vectors.timestamp });
            assert.equal(res.status, 401);
            assert.deepEqual(await res.json(), { error: 'invalid_signature' });
        });
    });

    it('answers 401 missing_signature when the headers are absent', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ base }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', rawBody);
            assert.equal(res.status, 401);
            assert.deepEqual(await res.json(), { error: 'missing_signature' });
        });
    });

    it('answers 401 stale_timestamp when the delivery is too old', async () => {
        await withReceiver({ signingSecrets: [vectors.secret], nowSeconds: () => vectors.now_seconds_stale }, async ({ base }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', rawBody, signedHeaders(rawBody));
            assert.equal(res.status, 401);
            assert.deepEqual(await res.json(), { error: 'stale_timestamp' });
        });
    });

    it('verifies the raw bytes: a pretty-printed copy of the same event does not verify', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ base }) => {
            const prettyBody = JSON.stringify(JSON.parse(rawBody), null, 2);
            const res = await postRaw(base + '/webhooks/dropcowboy', prettyBody, signedHeaders(rawBody));
            assert.equal(res.status, 401);
        });
    });

    it('accepts a delivery signed with the second of two configured secrets', async () => {
        await withReceiver({ signingSecrets: [vectors.other_secret, vectors.secret] }, async ({ base }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', rawBody, signedHeaders(rawBody));
            assert.equal(res.status, 200);
        });
    });

    it('answers duplicate: true when the same event_id arrives again', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ receiver, base }) => {
            const first = await postRaw(base + '/webhooks/dropcowboy', rawBody, signedHeaders(rawBody));
            const second = await postRaw(base + '/webhooks/dropcowboy', rawBody, signedHeaders(rawBody));
            assert.equal(first.status, 200);
            assert.deepEqual(await second.json(), { received: true, duplicate: true });
            assert.equal(receiver.receivedEvents().length, 1);
        });
    });

    it('answers 503 when no signing secret is configured', async () => {
        await withReceiver({ signingSecrets: [] }, async ({ base }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', rawBody, signedHeaders(rawBody));
            assert.equal(res.status, 503);
        });
    });

    it('answers 400 when a correctly signed body is not a JSON object', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ base }) => {
            const arrayBody = '[1,2,3]';
            const res = await postRaw(base + '/webhooks/dropcowboy', arrayBody, signedHeaders(arrayBody));
            assert.equal(res.status, 400);
        });
    });

    it('prints a receipt event with its proof of delivery link', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ receiver, base, out }) => {
            const res = await postRaw(base + '/webhooks/dropcowboy', receiptBody, signedHeaders(receiptBody));
            assert.equal(res.status, 200);
            assert.equal(receiver.receivedEvents()[0].event, 'contact.rvm.receipt');
            assert.match(out.text(), /proof_of_delivery_url=https:\/\/api-v2\.dropcowboy\.com\/campaign\/public\/receipts\//);
        });
    });

    it('accepts an event it does not handle and logs its name', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ base, out }) => {
            const unknown = JSON.stringify({ event_id: 'a9c3e8f1-4b2d-4a7c-8e9b-1c2d3e4f5a6b', event: 'contact.tag.added', event_at: 1774041912000, data: {} });
            const res = await postRaw(base + '/webhooks/dropcowboy', unknown, signedHeaders(unknown));
            assert.equal(res.status, 200);
            assert.match(out.text(), /contact\.tag\.added accepted/);
        });
    });

    it('falls back to the X-Event-Id header to detect a duplicate', async () => {
        await withReceiver({ signingSecrets: [vectors.secret] }, async ({ base }) => {
            const noId = JSON.stringify({ event: 'contact.tag.added', data: {} });
            const headers = Object.assign({ 'X-Event-Id': 'd1f3a8e2-7c4b-4f9a-9d22-9c1e2f3a4b5c' }, signedHeaders(noId));
            const first = await postRaw(base + '/webhooks/dropcowboy', noId, headers);
            const second = await postRaw(base + '/webhooks/dropcowboy', noId, headers);
            assert.equal(first.status, 200);
            assert.deepEqual(await second.json(), { received: true, duplicate: true });
        });
    });
});

describe('callback route', () => {
    it('accepts the success callback fixture', async () => {
        await withReceiver({}, async ({ receiver, base, out }) => {
            const res = await postRaw(base + '/callbacks/dropcowboy', callbackBody);
            assert.equal(res.status, 200);
            assert.deepEqual(await res.json(), { received: true });

            const event = receiver.receivedEvents()[0];
            assert.equal(event.source, 'callback');
            assert.equal(event.result.foreign_id, FIXTURE_FOREIGN_ID);
            assert.equal(event.result.from, '+12125550100');
            assert.ok(out.text().includes('callback status=success reason="" reason_code=0 to=+13125550142 from=+12125550100 foreign_id=' + FIXTURE_FOREIGN_ID));
        });
    });

    it('rejects a JSON array with 400', async () => {
        await withReceiver({}, async ({ base }) => {
            const res = await postRaw(base + '/callbacks/dropcowboy', '[{"status":"success"}]');
            assert.equal(res.status, 400);
        });
    });

    it('rejects text that is not JSON with 400', async () => {
        await withReceiver({}, async ({ base }) => {
            const res = await postRaw(base + '/callbacks/dropcowboy', 'not json');
            assert.equal(res.status, 400);
        });
    });

    it('rejects an empty body with 400', async () => {
        await withReceiver({}, async ({ base }) => {
            const res = await fetch(base + '/callbacks/dropcowboy', { method: 'POST' });
            assert.equal(res.status, 400);
        });
    });

    it('does not print control characters from an unsigned body', async () => {
        await withReceiver({}, async ({ base, out }) => {
            const forged = JSON.stringify({ status: 'success', reason: '\u001b[2Jclear', reason_code: 0, foreign_id: 'x' });
            await postRaw(base + '/callbacks/dropcowboy', forged);
            assert.ok(!out.text().includes('\u001b'));
        });
    });
});

describe('receiver basics', () => {
    it('answers GET /health with ok: true', async () => {
        await withReceiver({}, async ({ base }) => {
            const res = await fetch(base + '/health');
            assert.equal(res.status, 200);
            assert.deepEqual(await res.json(), { ok: true });
        });
    });

    it('waitForEvent resolves when a matching event arrives', async () => {
        await withReceiver({}, async ({ receiver, base }) => {
            const waiting = receiver.waitForEvent((e) => e.source === 'callback', 5000);
            await postRaw(base + '/callbacks/dropcowboy', callbackBody);
            const event = await waiting;
            assert.equal(event.result.foreign_id, FIXTURE_FOREIGN_ID);
        });
    });

    it('waitForEvent resolves null when the time is up', async () => {
        await withReceiver({}, async ({ receiver }) => {
            assert.equal(await receiver.waitForEvent(() => true, 20), null);
        });
    });
});
