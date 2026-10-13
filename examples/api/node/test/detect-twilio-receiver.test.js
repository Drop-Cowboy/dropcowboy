import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { startDetectionReceiver } from '../src/detection-receiver.js';
import { streamTwiml } from '../src/lib/detection.js';
import { twilioSignature } from '../src/lib/twilio.js';
import { captureOutput, fixtureJson } from '../testkit/helpers.js';
import { ACCOUNT_SID, AUTH_TOKEN, CALL_SID, PUBLIC_URL, detectionBody, postDetection, postTwilio } from '../testkit/twilio.js';

const vectors = fixtureJson('detection-signature-vectors.json');
const statusFixture = fixtureJson('twilio.status-completed.json');
const FIXTURE_CALL_ID = JSON.parse(vectors.raw_body).call_id;
const TWIML = streamTwiml({
    detectionUrl: 'wss://detect.dropcowboy.com/carrier/ws/twilio',
    detectionKey: vectors.detection_key,
    publicUrl: PUBLIC_URL,
    callId: FIXTURE_CALL_ID,
    waitSeconds: 180
});

async function withReceiver(options, body) {
    const out = captureOutput();
    const receiver = await startDetectionReceiver(Object.assign({
        port: 0,
        publicUrl: PUBLIC_URL,
        authToken: AUTH_TOKEN,
        detectionKey: vectors.detection_key,
        callId: FIXTURE_CALL_ID,
        twiml: TWIML,
        log: out.log,
        nowMs: () => vectors.now_ms_valid
    }, options));
    try {
        await body({ receiver, out, port: receiver.port });
    } finally {
        await receiver.close();
    }
}

function postVector({ port, rawBody = vectors.raw_body, signature = vectors.signature, timestamp = vectors.timestamp_ms, extraHeaders = {} }) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, extraHeaders);
    if (signature !== null) {
        headers['X-Signature'] = signature;
    }
    if (timestamp !== null) {
        headers['X-Timestamp'] = timestamp;
    }
    return fetch('http://127.0.0.1:' + port + '/webhooks/detection', { method: 'POST', headers, body: rawBody });
}

describe('detection receiver: GET /health', () => {
    it('answers 200 with ok: true', async () => {
        await withReceiver({}, async ({ port }) => {
            const res = await fetch('http://127.0.0.1:' + port + '/health');
            assert.equal(res.status, 200);
            assert.deepEqual(await res.json(), { ok: true });
        });
    });
});

describe('detection receiver: POST /twilio/voice', () => {
    const answered = { AccountSid: ACCOUNT_SID, CallSid: CALL_SID, CallStatus: 'in-progress' };

    it('answers the exact TwiML as text/xml for this run\'s call, signed for DC_PUBLIC_URL', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            receiver.setCallSid(CALL_SID);
            const res = await postTwilio({ port, route: '/twilio/voice', params: answered });
            assert.equal(res.status, 200);
            assert.equal(res.headers.get('content-type'), 'text/xml');
            assert.equal(await res.text(), TWIML);
        });
    });

    it('answers 403 with an empty body for a missing or wrong signature', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            receiver.setCallSid(CALL_SID);
            const missing = await postTwilio({ port, route: '/twilio/voice', params: answered, signature: null });
            assert.equal(missing.status, 403);
            assert.equal(await missing.text(), '');
            const wrongToken = await postTwilio({ port, route: '/twilio/voice', params: answered, authToken: 'another-token-entirely' });
            assert.equal(wrongToken.status, 403);
            // Signed for the Host the request arrived on, not DC_PUBLIC_URL.
            const hostSignature = twilioSignature({ url: 'http://127.0.0.1:' + port + '/twilio/voice', params: answered, authToken: AUTH_TOKEN });
            const hostSigned = await postTwilio({ port, route: '/twilio/voice', params: answered, signature: hostSignature });
            assert.equal(hostSigned.status, 403);
        });
    });

    it('answers 403 for another CallSid, and before the call exists', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            const early = await postTwilio({ port, route: '/twilio/voice', params: answered });
            assert.equal(early.status, 403);
            receiver.setCallSid(CALL_SID);
            const other = await postTwilio({ port, route: '/twilio/voice', params: Object.assign({}, answered, { CallSid: 'CA00000000000000000000000000000002' }) });
            assert.equal(other.status, 403);
            assert.equal(await other.text(), '');
        });
    });
});

describe('detection receiver: POST /twilio/status', () => {
    it('records the fixture status for this run\'s call and answers 200 with an empty body', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            receiver.setCallSid(CALL_SID);
            const res = await postTwilio({ port, route: '/twilio/status', params: statusFixture });
            assert.equal(res.status, 200);
            assert.equal(await res.text(), '');
            const entries = receiver.entriesSince(0);
            assert.equal(entries.length, 1);
            assert.equal(entries[0].kind, 'status');
            assert.equal(entries[0].status, 'completed');
            assert.equal(entries[0].duration, '21');
        });
    });

    it('answers 403 when the signature is missing or wrong, and records nothing', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            receiver.setCallSid(CALL_SID);
            assert.equal((await postTwilio({ port, route: '/twilio/status', params: statusFixture, signature: null })).status, 403);
            assert.equal((await postTwilio({ port, route: '/twilio/status', params: statusFixture, signature: fixtureJson('twilio-signature-vectors.json').signature_from_other_token })).status, 403);
            assert.equal(receiver.entriesSince(0).length, 0);
        });
    });

    it('matches the signature vector exactly', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            receiver.setCallSid(CALL_SID);
            const v = fixtureJson('twilio-signature-vectors.json');
            const res = await postTwilio({ port, route: '/twilio/status', params: v.params, signature: v.signature });
            assert.equal(res.status, 200);
            const tampered = await postTwilio({ port, route: '/twilio/status', params: v.tampered_params, signature: v.signature });
            assert.equal(tampered.status, 403);
        });
    });

    it('keeps a status that arrives before the CallSid is known, and ignores other calls', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            const early = await postTwilio({ port, route: '/twilio/status', params: Object.assign({}, statusFixture, { CallStatus: 'initiated' }) });
            assert.equal(early.status, 200);
            const other = await postTwilio({ port, route: '/twilio/status', params: Object.assign({}, statusFixture, { CallSid: 'CA00000000000000000000000000000002' }) });
            assert.equal(other.status, 200);
            assert.equal(await other.text(), '');
            assert.equal(receiver.entriesSince(0).length, 0);
            receiver.setCallSid(CALL_SID);
            const afterKnown = await postTwilio({ port, route: '/twilio/status', params: Object.assign({}, statusFixture, { CallSid: 'CA00000000000000000000000000000002' }) });
            assert.equal(afterKnown.status, 200);
            const entries = receiver.entriesSince(0);
            assert.equal(entries.length, 1);
            assert.equal(entries[0].status, 'initiated');
        });
    });
});

describe('detection receiver: POST /webhooks/detection', () => {
    it('answers 200 received for the signed vector and records it', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            const res = await postVector({ port });
            assert.equal(res.status, 200);
            assert.deepEqual(await res.json(), { received: true });
            const entries = receiver.entriesSince(0);
            assert.equal(entries.length, 1);
            assert.equal(entries[0].body.event, 'beep');
            assert.deepEqual(receiver.counts(), { received: 1, ignored: 0 });
        });
    });

    it('answers 401 missing_signature without the signature or the timestamp', async () => {
        await withReceiver({}, async ({ port }) => {
            const noSignature = await postVector({ port, signature: null });
            assert.equal(noSignature.status, 401);
            assert.deepEqual(await noSignature.json(), { error: 'missing_signature' });
            const noTimestamp = await postVector({ port, timestamp: null });
            assert.deepEqual(await noTimestamp.json(), { error: 'missing_signature' });
        });
    });

    it('answers 401 stale_timestamp for an old or non-numeric timestamp', async () => {
        await withReceiver({ nowMs: () => vectors.now_ms_stale }, async ({ port }) => {
            const res = await postVector({ port });
            assert.equal(res.status, 401);
            assert.deepEqual(await res.json(), { error: 'stale_timestamp' });
        });
        await withReceiver({}, async ({ port }) => {
            const res = await postVector({ port, timestamp: 'later' });
            assert.deepEqual(await res.json(), { error: 'stale_timestamp' });
        });
    });

    it('answers 401 invalid_signature for a tampered body, another key, or no scheme', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            const tampered = await postVector({ port, rawBody: vectors.tampered_raw_body });
            assert.equal(tampered.status, 401);
            assert.deepEqual(await tampered.json(), { error: 'invalid_signature' });
            const otherKey = await postVector({ port, signature: vectors.signature_from_other_key });
            assert.deepEqual(await otherKey.json(), { error: 'invalid_signature' });
            const noScheme = await postVector({ port, signature: vectors.signature.slice('v1=hmac-sha256,'.length) });
            assert.deepEqual(await noScheme.json(), { error: 'invalid_signature' });
            assert.equal(receiver.entriesSince(0).length, 0);
        });
    });

    it('answers 400 for a signed body that is not a JSON object', async () => {
        await withReceiver({ nowMs: Date.now }, async ({ port }) => {
            const res = await postDetection({ port, body: '[1,2,3]', key: vectors.detection_key });
            assert.equal(res.status, 400);
        });
    });

    it('answers received: true and records every delivery, with no deduplication', async () => {
        await withReceiver({}, async ({ receiver, port }) => {
            await postVector({ port });
            const second = await postVector({ port });
            assert.equal(second.status, 200);
            assert.deepEqual(await second.json(), { received: true });
            assert.equal(receiver.entriesSince(0).length, 2);
            assert.deepEqual(receiver.counts(), { received: 2, ignored: 0 });
        });
    });

    it('records an event for another call_id as ignored', async () => {
        await withReceiver({ nowMs: Date.now }, async ({ receiver, port, out }) => {
            const body = detectionBody('detection.beep.json', { callId: '0d4f6b8a-2c1e-4e73-9a5b-7c9e1f3a5b20' });
            const res = await postDetection({ port, body, key: vectors.detection_key });
            assert.equal(res.status, 200);
            const entries = receiver.entriesSince(0);
            assert.equal(entries.length, 1);
            assert.equal(entries[0].ignored, true);
            assert.deepEqual(receiver.counts(), { received: 1, ignored: 1 });
            assert.match(out.text(), /for another call_id .* ignored/);
        });
    });
});
