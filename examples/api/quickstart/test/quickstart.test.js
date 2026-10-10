// Run with: npm test (or node --test test/)
// Every test runs against the mock API on a local port. Nothing is sent.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, it } from 'node:test';

import { LINE_ID, MEDIA_ID, MESSAGE_ID, OTHER_NUMBER, TEST_NUMBER, VOICE_ID, ok, problem, readiness, startMockApi } from '../testkit/mock-api.js';
import { API_SECRET, PUBLIC_URL, UUID, WEBHOOK_SECRET, baseEnv, postCallback, postSignedWebhook, runQuickstart, rvmThatReports, tempAudioFile } from '../testkit/helpers.js';

const CONSENT = 'Send only to people who agreed to hear from you. Test with numbers you own.';
const SAMPLE = 'this is a sample value from our docs; use your own';
const API_LOGS = 'check Settings > API Logs, which shows the outcome and what your endpoint answered';

const mocks = [];
const files = [];

async function mockApi(routes) {
    const mock = await startMockApi(routes);
    mocks.push(mock);
    return mock;
}

afterEach(async () => {
    while (mocks.length > 0) {
        await mocks.pop().close();
    }
    while (files.length > 0) {
        fs.rmSync(path.dirname(files.pop()), { recursive: true, force: true });
    }
});

function successCallback(rvmBody) {
    return {
        drop_id: 'b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52',
        phone_number: rvmBody.to,
        caller_id: '+13125550100',
        status: 'success',
        reason: '',
        reason_code: 0,
        foreign_id: rvmBody.foreign_id
    };
}

// Sends with the mock answering the callback. Returns the run, the mock and the /rvm request.
async function sendWithCallback({ env = {}, routes = {}, callback = successCallback } = {}) {
    const state = { listener: null };
    const mock = await mockApi(Object.assign({
        'POST /rvm': rvmThatReports(state, (url, body) => postCallback(url, callback(body)))
    }, routes));
    const result = await runQuickstart({ env: baseEnv(mock, env), hooks: { onListening: (listener) => { state.listener = listener; } } });
    return { result, mock, rvm: mock.find('POST', '/rvm') };
}

function assertRvmBasics(rvm) {
    assert.ok(rvm, 'POST /rvm was sent');
    assert.match(rvm.headers['idempotency-key'], UUID);
    assert.equal(rvm.headers['x-key'], baseEnv({ url: '' }).DC_KEY);
    assert.equal(rvm.headers['x-secret'], API_SECRET);
    assert.match(rvm.json.foreign_id, UUID);
    assert.equal('caller_id' in rvm.json, false, 'caller_id is never sent');
}

describe('upload (the default audio source)', () => {
    it('creates a signed upload, PUTs with exactly the returned Content-Type, completes, then sends media_id', async () => {
        const file = tempAudioFile('greeting.mp3');
        files.push(file);
        const { result, mock, rvm } = await sendWithCallback({ env: { DC_AUDIO: 'upload', DC_AUDIO_FILE: file } });

        assert.equal(result.code, 0, result.output);
        assert.deepEqual(mock.calls(), [
            'GET /register/public/integration-readiness',
            'GET /phone/public/lines',
            'POST /media/public/media',
            'PUT /uploads/' + MEDIA_ID + '.mp3',
            'POST /media/public/media/' + MEDIA_ID + '/complete',
            'POST /rvm'
        ]);
        assert.deepEqual(mock.find('POST', '/media/public/media').json, { name: 'Quickstart greeting.mp3', type: 'rvm', signed_upload: true });

        const put = mock.find('PUT', '/uploads/' + MEDIA_ID + '.mp3');
        assert.equal(put.headers['content-type'], 'audio/mpeg');
        assert.equal(put.headers['x-key'], undefined, 'no API key goes to the upload URL');
        assert.equal(put.headers['x-secret'], undefined, 'no API secret goes to the upload URL');
        assert.equal(put.raw.toString(), fs.readFileSync(file, 'utf8'));

        assertRvmBasics(rvm);
        assert.deepEqual(rvm.json, {
            to: TEST_NUMBER,
            phone_line_id: LINE_ID,
            media_id: MEDIA_ID,
            foreign_id: rvm.json.foreign_id,
            callback_url: PUBLIC_URL + '/callbacks/dropcowboy'
        });
        assert.match(result.output, new RegExp('Reuse this file next time without uploading again: DC_AUDIO=media DC_MEDIA_ID=' + MEDIA_ID));
        assert.match(result.output, /status: success/);
        assert.match(result.output, /reason_code: 0 \(Success/);
        assert.match(result.output, new RegExp('message_id: ' + MESSAGE_ID));
    });

    it('uploads a .wav to the wav URL with audio/wav', async () => {
        const file = tempAudioFile('greeting.wav');
        files.push(file);
        const { result, mock } = await sendWithCallback({ env: { DC_AUDIO_FILE: file } });
        assert.equal(result.code, 0, result.output);
        assert.equal(mock.find('PUT', '/uploads/' + MEDIA_ID + '.wav').headers['content-type'], 'audio/wav');
    });

    it('explains a 403 from the upload URL and sends nothing', async () => {
        const file = tempAudioFile('greeting.mp3');
        files.push(file);
        const mock = await mockApi({ ['PUT /uploads/' + MEDIA_ID + '.mp3']: { status: 403, body: '<Error>AccessDenied</Error>' } });
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO_FILE: file }) });
        assert.equal(result.code, 1);
        assert.match(result.output, /did not match exactly the content_type/);
        assert.match(result.output, /expired/);
        assert.match(result.output, /POST \/media\/public\/media with \{ name, url, ext \}/);
        assert.equal(mock.find('POST', '/rvm'), undefined);
    });

    it('stops before any request when DC_AUDIO_FILE is missing', async () => {
        const mock = await mockApi();
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'upload' }) });
        assert.equal(result.code, 2);
        assert.match(result.output, /DC_AUDIO=upload needs DC_AUDIO_FILE/);
        assert.deepEqual(mock.requests, []);
    });
});

describe('media', () => {
    it('confirms the media_id and sends it, using DC_PHONE_LINE_ID without a lookup', async () => {
        const lineId = '7e3b9d1f-4a6c-4e2b-8f5a-9c1d3e7b5f20';
        const { result, mock, rvm } = await sendWithCallback({ env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID, DC_PHONE_LINE_ID: lineId } });
        assert.equal(result.code, 0, result.output);
        assert.deepEqual(mock.calls(), [
            'GET /register/public/integration-readiness',
            'GET /media/public/media/' + MEDIA_ID,
            'POST /rvm'
        ]);
        assertRvmBasics(rvm);
        assert.deepEqual(rvm.json, { to: TEST_NUMBER, phone_line_id: lineId, media_id: MEDIA_ID, foreign_id: rvm.json.foreign_id, callback_url: PUBLIC_URL + '/callbacks/dropcowboy' });
    });

    it('stops with the 3001 explanation when the media_id is not on the account', async () => {
        const missing = '0f4e8a2c-6d1b-4b9e-a3f7-5c2e8d1a9b64';
        const mock = await mockApi();
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'media', DC_MEDIA_ID: missing }) });
        assert.equal(result.code, 1);
        assert.match(result.output, /is not in your media library/);
        assert.match(result.output, /3001 \(Audio file not valid\)/);
        assert.equal(mock.find('POST', '/rvm'), undefined);
    });
});

describe('url', () => {
    it('sends audio_url when the account allows it', async () => {
        const audioUrl = 'https://audio.example.org/greeting.mp3';
        const { result, mock, rvm } = await sendWithCallback({
            env: { DC_AUDIO: 'url', DC_AUDIO_URL: audioUrl },
            routes: { 'GET /register/public/integration-readiness': readiness({ audio_url_allowed: true }) }
        });
        assert.equal(result.code, 0, result.output);
        assert.deepEqual(mock.calls(), ['GET /register/public/integration-readiness', 'GET /phone/public/lines', 'POST /rvm']);
        assertRvmBasics(rvm);
        assert.deepEqual(rvm.json, { to: TEST_NUMBER, phone_line_id: LINE_ID, audio_url: audioUrl, foreign_id: rvm.json.foreign_id, callback_url: PUBLIC_URL + '/callbacks/dropcowboy' });
        assert.match(result.output, /audio_url_allowed: true/);
    });

    it('stops after the preflight with the support message when audio_url is not allowed', async () => {
        const mock = await mockApi();
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'url', DC_AUDIO_URL: 'https://audio.example.org/greeting.mp3' }) });
        assert.equal(result.code, 1);
        assert.deepEqual(mock.calls(), ['GET /register/public/integration-readiness']);
        assert.match(result.output, /audio_url_allowed: false/);
        assert.match(result.output, /audio_url is an option for BYOC plans only and must be enabled by support\. Contact support to enable it\./);
        assert.match(result.output, /send only to your test numbers/);
        assert.match(result.output, /upload the file and send media_id, or use text to speech/);
    });
});

describe('tts', () => {
    it('picks the first ready voice and sends tts_body with voice_id only', async () => {
        const { result, mock, rvm } = await sendWithCallback({ env: { DC_AUDIO: 'tts', DC_TTS_BODY: 'Hi, this is a test from the quickstart.' } });
        assert.equal(result.code, 0, result.output);
        assert.deepEqual(mock.calls(), ['GET /register/public/integration-readiness', 'GET /phone/public/lines', 'GET /voice/public/voices', 'POST /rvm']);
        assertRvmBasics(rvm);
        assert.deepEqual(rvm.json, {
            to: TEST_NUMBER,
            phone_line_id: LINE_ID,
            tts_body: 'Hi, this is a test from the quickstart.',
            voice_id: VOICE_ID,
            foreign_id: rvm.json.foreign_id,
            callback_url: PUBLIC_URL + '/callbacks/dropcowboy'
        });
    });

    it('uses DC_VOICE_ID without a lookup', async () => {
        const voiceId = '4c8a2e6f-1d9b-4f3a-b7e5-2a6c9e1d4f83';
        const { result, mock, rvm } = await sendWithCallback({ env: { DC_AUDIO: 'tts', DC_TTS_BODY: 'Hello.', DC_VOICE_ID: voiceId } });
        assert.equal(result.code, 0, result.output);
        assert.equal(mock.find('GET', '/voice/public/voices'), undefined);
        assert.equal(rvm.json.voice_id, voiceId);
    });

    it('rejects text over 1,200 characters before any request', async () => {
        const mock = await mockApi();
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'tts', DC_TTS_BODY: 'x'.repeat(1201) }) });
        assert.equal(result.code, 2);
        assert.match(result.output, /1201 characters/);
        assert.deepEqual(mock.requests, []);
    });
});

describe('sample values from the docs', () => {
    for (const [name, value] of [
        ['DC_MEDIA_ID', '1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80'],
        ['DC_PHONE_LINE_ID', 'E2B6F9A3-5C1D-4E8B-A4F7-9C3E1B5D7A28'],
        ['DC_TO', '+12125550100'],
        ['DC_AUDIO_URL', 'https://cdn.example.com/greeting.mp3'],
        ['DC_PUBLIC_URL', 'https://hooks.example.com']
    ]) {
        it('refuses ' + name + ' set to a doc sample, before any request', async () => {
            const mock = await mockApi();
            const env = baseEnv(mock, { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID });
            env[name] = value;
            const result = await runQuickstart({ env });
            assert.equal(result.code, 2);
            assert.ok(result.output.includes(name + '=' + value + ': ' + SAMPLE), result.output);
            assert.deepEqual(mock.requests, []);
        });
    }

    it('refuses a sample URL passed to check-receiver', async () => {
        const result = await runQuickstart({ argv: ['check-receiver', 'https://hooks.example.com/callbacks/dropcowboy'], env: {} });
        assert.equal(result.code, 2);
        assert.ok(result.output.includes(SAMPLE));
    });
});

describe('preflight', () => {
    it('prints the readiness fields and warns when DC_TO is not a test number in testing mode', async () => {
        const { result, rvm } = await sendWithCallback({
            env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID, DC_TO: OTHER_NUMBER },
            routes: { 'GET /register/public/integration-readiness': readiness({ test_numbers_only: true }) }
        });
        assert.match(result.output, /test_numbers_only: true/);
        assert.match(result.output, new RegExp('test_numbers: \\' + TEST_NUMBER));
        assert.match(result.output, /will fail with 3040 \(Test Numbers Only\)/);
        assert.ok(rvm, 'it warns but still sends');
    });

    it('does not warn when DC_TO is a test number', async () => {
        const { result } = await sendWithCallback({
            env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID },
            routes: { 'GET /register/public/integration-readiness': readiness({ test_numbers_only: true }) }
        });
        assert.doesNotMatch(result.output, /3040/);
    });

    it('continues with a notice when the key cannot read readiness', async () => {
        const { result, rvm } = await sendWithCallback({
            env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID },
            routes: { 'GET /register/public/integration-readiness': problem(403, 'Forbidden', 'Missing scope balance:read') }
        });
        assert.equal(result.code, 0, result.output);
        assert.match(result.output, /Preflight: could not read/);
        assert.ok(rvm);
    });

    it('stops on a 401 with the key hint', async () => {
        const mock = await mockApi({ 'GET /register/public/integration-readiness': problem(401, 'Unauthorized', 'Invalid API key') });
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID }) });
        assert.equal(result.code, 1);
        assert.match(result.output, /HTTP 401/);
        assert.match(result.output, /Check DC_KEY and DC_SECRET/);
        assert.equal(result.output.includes(API_SECRET), false);
    });
});

describe('phone line', () => {
    it('stops when there is no default line', async () => {
        const mock = await mockApi({ 'GET /phone/public/lines': ok([{ ivr_id: LINE_ID, name: 'Other', type: 'voice', is_default: false }]) });
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID }) });
        assert.equal(result.code, 1);
        assert.match(result.output, /No phone line to send from/);
        assert.match(result.output, /4010/);
    });

    it('reads the default flag named default as well as is_default', async () => {
        const { rvm } = await sendWithCallback({
            env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID },
            routes: { 'GET /phone/public/lines': ok([{ ivr_id: LINE_ID, name: 'Main line', type: 'voice', default: true }]) }
        });
        assert.equal(rvm.json.phone_line_id, LINE_ID);
    });
});

describe('results', () => {
    it('prints the consent line first and never prints the secret', async () => {
        const { result } = await sendWithCallback({ env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID } });
        assert.equal(result.output.split('\n')[0], CONSENT);
        assert.equal(result.output.includes(API_SECRET), false);
        assert.equal(result.output.includes(WEBHOOK_SECRET), false);
        assert.match(result.output, /Webhook signing secrets: 1 \(\.\.\.7e26\)/);
    });

    it('prints a failure with the meaning of its reason_code and exits 1', async () => {
        const { result } = await sendWithCallback({
            env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID },
            callback: (body) => ({ phone_number: body.to, status: 'failure', reason: 'Test Numbers Only', reason_code: 3040, foreign_id: body.foreign_id })
        });
        assert.equal(result.code, 1);
        assert.match(result.output, /status: failure/);
        assert.match(result.output, /reason_code: 3040 \(Test Numbers Only/);
    });

    it('completes from a signed status webhook for the same number', async () => {
        const state = { listener: null };
        const mock = await mockApi({
            'POST /rvm': rvmThatReports(state, (url, body) => postSignedWebhook(url, {
                event_id: '9a3c5e7f-1b2d-4f6a-8c9e-2d4f6a8b1c3e',
                event: 'contact.rvm.status',
                event_at: Date.now(),
                data: { status: 'failure', reason: 'Not allowed audio_url', reason_code: 3014, to: body.to, from: '+13125550100' }
            }))
        });
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID }), hooks: { onListening: (listener) => { state.listener = listener; } } });
        assert.equal(result.code, 1);
        assert.match(result.output, /Result from the webhook contact\.rvm\.status/);
        assert.match(result.output, /reason_code: 3014 \(Not allowed audio_url\. audio_url is an option for BYOC plans only/);
    });

    it('ignores a callback for another send and points to API Logs when nothing arrives', async () => {
        const { result } = await sendWithCallback({
            env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID, DC_WAIT_SECONDS: '1' },
            callback: () => ({ status: 'success', reason_code: 0, foreign_id: '1d3f5a7c-9e2b-4d6f-8a1c-3e5f7b9d2a4c' })
        });
        assert.equal(result.code, 0);
        assert.match(result.output, /No result arrived within 1 seconds/);
        assert.ok(result.output.toLowerCase().includes(API_LOGS.toLowerCase()), result.output);
    });

    it('loads the webhook signing secret from the API when DC_WEBHOOK_SECRET is not set', async () => {
        const { result, mock } = await sendWithCallback({
            env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID, DC_WEBHOOK_SECRET: '' },
            routes: { 'GET /register/public/account/webhook-signing-secret': ok([{ webhook_id: '6a2c8e4f-1b7d-4f93-a5e0-3c9d1b7a5f24', event_types: ['contact.rvm.status', 'contact.rvm.receipt'], hook_type: null, signing_secret: '5e1a9c3f-7b2d-4f8e-a6c4-1d9b3e5f7a62' }]) }
        });
        assert.equal(result.code, 0, result.output);
        assert.deepEqual(mock.calls().slice(0, 2), ['GET /register/public/integration-readiness', 'GET /register/public/account/webhook-signing-secret']);
        assert.match(result.output, /1 \(\.\.\.7a62\) loaded from/);
        assert.equal(result.output.includes('5e1a9c3f-7b2d-4f8e-a6c4-1d9b3e5f7a62'), false);
    });

    it('sends without callback_url or waiting when DC_PUBLIC_URL is not set', async () => {
        const mock = await mockApi();
        const result = await runQuickstart({ env: baseEnv(mock, { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID, DC_PUBLIC_URL: '' }) });
        assert.equal(result.code, 0, result.output);
        const rvm = mock.find('POST', '/rvm');
        assert.equal('callback_url' in rvm.json, false);
        assert.match(result.output, /DC_PUBLIC_URL is not set/);
        assert.ok(result.output.includes('Check Settings > API Logs'));
    });
});

describe('a webhook managed for the run', () => {
    const WEBHOOK_ID = '7c3e9a1f-5b2d-4e8a-9f6c-2a4d8b1e3c57';
    const CREATED_SECRET = '4d8f2b6a-9c1e-4a7d-b3f5-6e2a8c4d1b93';
    const LEFTOVER_ID = '2b6d9f3a-8e1c-4c5a-a7d4-9f3b1e5c7a28';
    const HOOKS = '/register/public/webhooks';

    function webhookRoutes(overrides = {}) {
        return Object.assign({
            ['GET ' + HOOKS]: ok([]),
            ['POST ' + HOOKS]: ok({ webhook_id: WEBHOOK_ID, name: 'Quickstart (temporary)', event_types: ['contact.rvm.status', 'contact.rvm.receipt'], signing_secret: CREATED_SECRET }, 201),
            ['DELETE ' + HOOKS + '/' + WEBHOOK_ID]: ok({ result: true })
        }, overrides);
    }

    function managedEnv(extra = {}) {
        return Object.assign({ DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID, DC_MANAGE_WEBHOOK: 'true', DC_WEBHOOK_SECRET: '', DC_RECEIPT_WAIT_SECONDS: '5' }, extra);
    }

    function statusEvent(to) {
        return { event_id: '9a3c5e7f-1b2d-4f6a-8c9e-2d4f6a8b1c3e', event: 'contact.rvm.status', event_at: Date.now(), data: { status: 'success', reason: '', reason_code: 0, to, from: '+13125550100' } };
    }

    function receiptEvent(to) {
        return {
            event_id: '1e5a9c3f-7b2d-4f8e-a6c4-3d9b5e7f1a62',
            event: 'contact.rvm.receipt',
            event_at: Date.now(),
            data: { status: 'success', reason: '', reason_code: 0, to, from: '+13125550100', proof_of_delivery_url: 'https://api-v2.dropcowboy.com/campaign/public/receipts/MmEX1fWLLQRmf68M1Yg82jkHN3-P7y8VyDxXhnyHA50' }
        };
    }

    async function managedRun({ env = {}, routes = {}, deliveries }) {
        const state = { listener: null };
        const mock = await mockApi(webhookRoutes(Object.assign({
            'POST /rvm': rvmThatReports(state, async (url, body) => {
                const events = deliveries(body);
                for (let i = 0; i < events.length; i++) {
                    await postSignedWebhook(url, events[i], { secret: CREATED_SECRET });
                }
            })
        }, routes)));
        const result = await runQuickstart({ env: baseEnv(mock, managedEnv(env)), hooks: { onListening: (listener) => { state.listener = listener; } } });
        return { result, mock };
    }

    it('creates one webhook for status and receipt, verifies and prints both payloads, then deletes it', async () => {
        const { result, mock } = await managedRun({ deliveries: (body) => [statusEvent(body.to), receiptEvent(body.to)] });

        assert.equal(result.code, 0, result.output);
        const created = mock.find('POST', HOOKS);
        assert.deepEqual(created.json, {
            name: 'Quickstart (temporary)',
            hook_url: PUBLIC_URL + '/webhooks/dropcowboy',
            event_types: ['contact.rvm.status', 'contact.rvm.receipt']
        });
        assert.match(result.output, /Webhook created: 7c3e9a1f-5b2d-4e8a-9f6c-2a4d8b1e3c57 for contact\.rvm\.status, contact\.rvm\.receipt/);
        assert.match(result.output, /Received webhook contact\.rvm\.status/);
        assert.match(result.output, /Received webhook contact\.rvm\.receipt .*proof_of_delivery_url=/);
        assert.match(result.output, /Signature verified \(X-Signature-Version none, X-Event-Id none, X-Attempt none\)/);
        assert.match(result.output, /"event": "contact\.rvm\.receipt"/);
        assert.match(result.output, /"proof_of_delivery_url": "https:\/\/api-v2\.dropcowboy\.com\/campaign\/public\/receipts\//);
        assert.ok(mock.calls().includes('DELETE ' + HOOKS + '/' + WEBHOOK_ID), mock.calls().join('\n'));
        assert.ok(mock.calls().indexOf('DELETE ' + HOOKS + '/' + WEBHOOK_ID) > mock.calls().indexOf('POST /rvm'));
        assert.equal(mock.calls().includes('GET /register/public/account/webhook-signing-secret'), false);
        assert.match(result.output, /Signing secret: \.\.\.1b93/);
        assert.equal(result.output.includes(CREATED_SECRET), false);
    });

    it('reports a result that does not arrive, and still succeeds', async () => {
        const { result } = await managedRun({
            env: { DC_RECEIPT_WAIT_SECONDS: '1' },
            deliveries: (body) => [statusEvent(body.to)]
        });

        assert.equal(result.code, 0, result.output);
        assert.match(result.output, /Not received within 1 seconds: contact\.rvm\.receipt/);
    });

    it('skips waiting for the other results when DC_RECEIPT_WAIT_SECONDS is 0', async () => {
        const { result, mock } = await managedRun({
            env: { DC_RECEIPT_WAIT_SECONDS: '0' },
            deliveries: (body) => [statusEvent(body.to)]
        });

        assert.equal(result.code, 0, result.output);
        assert.equal(result.output.includes('Not received within'), false);
        assert.ok(mock.calls().includes('DELETE ' + HOOKS + '/' + WEBHOOK_ID));
    });

    it('does not wait for a receipt after an outcome that never gets one', async () => {
        const started = Date.now();
        const { result } = await managedRun({
            env: { DC_RECEIPT_WAIT_SECONDS: '30' },
            deliveries: (body) => {
                const failure = statusEvent(body.to);
                failure.data = { status: 'failure', reason: 'Carrier rejected', reason_code: 3014, to: body.to, from: '+13125550100' };
                return [failure];
            }
        });

        assert.equal(result.code, 1, result.output);
        assert.match(result.output, /No receipt webhook is sent for reason_code 3014: only 0, 4001, 4002 have a proof of delivery\. Not waiting for one\./);
        assert.equal(result.output.includes('Not received within'), false);
        assert.ok(Date.now() - started < 10000);
    });

    it('waits for a receipt after 4002, mailbox full', async () => {
        const { result } = await managedRun({
            env: { DC_RECEIPT_WAIT_SECONDS: '5' },
            deliveries: (body) => {
                const full = statusEvent(body.to);
                full.data = { status: 'failure', reason: 'Mailbox full', reason_code: 4002, to: body.to, from: '+13125550100' };
                const receipt = receiptEvent(body.to);
                receipt.data.reason_code = 4002;
                return [full, receipt];
            }
        });

        assert.match(result.output, /Received webhook contact\.rvm\.receipt/);
        assert.equal(result.output.includes('No receipt webhook is sent'), false);
    });

    it('deletes a webhook an earlier run left behind, by name, and nothing else', async () => {
        const OTHER_ID = '8e2a6c4f-1d9b-4b7e-a5c3-7f1d3b9e5a26';
        const { result, mock } = await managedRun({
            routes: {
                ['GET ' + HOOKS]: ok([
                    { webhook_id: LEFTOVER_ID, name: 'Quickstart (temporary)', event_types: ['contact.rvm.status'] },
                    { webhook_id: OTHER_ID, name: 'Production receiver', event_types: ['*'] }
                ]),
                ['DELETE ' + HOOKS + '/' + LEFTOVER_ID]: ok({ result: true })
            },
            deliveries: (body) => [statusEvent(body.to), receiptEvent(body.to)]
        });

        assert.equal(result.code, 0, result.output);
        assert.match(result.output, /Deleted a webhook left by an earlier run: 2b6d9f3a/);
        assert.ok(mock.calls().includes('DELETE ' + HOOKS + '/' + LEFTOVER_ID));
        assert.equal(mock.calls().includes('DELETE ' + HOOKS + '/' + OTHER_ID), false);
    });

    it('deletes the webhook even when the send fails', async () => {
        const state = { listener: null };
        const mock = await mockApi(webhookRoutes({ 'POST /rvm': { status: 500, body: { title: 'Internal Error', detail: 'try again', request_id: '4c8e1a7d-2b5f-4d93-a6e0-3f9b7c1d5a42' } } }));
        const result = await runQuickstart({ env: baseEnv(mock, managedEnv()), hooks: { onListening: (listener) => { state.listener = listener; } } });

        assert.equal(result.code, 1, result.output);
        assert.ok(mock.calls().includes('DELETE ' + HOOKS + '/' + WEBHOOK_ID), mock.calls().join('\n'));
    });

    it('says how to delete the webhook by hand when the delete fails', async () => {
        const { result } = await managedRun({
            routes: { ['DELETE ' + HOOKS + '/' + WEBHOOK_ID]: problem(500, 'Internal Error', 'try again') },
            deliveries: (body) => [statusEvent(body.to), receiptEvent(body.to)]
        });

        assert.equal(result.code, 0, result.output);
        assert.match(result.output, /Could not delete the webhook 7c3e9a1f.*Delete it with DELETE \/register\/public\/webhooks\/7c3e9a1f/);
    });

    it('stops before any request when there is no tunnel address', async () => {
        const mock = await mockApi(webhookRoutes());
        const result = await runQuickstart({ env: baseEnv(mock, managedEnv({ DC_PUBLIC_URL: '' })) });

        assert.equal(result.code, 2);
        assert.match(result.output, /DC_MANAGE_WEBHOOK=true needs DC_PUBLIC_URL/);
        assert.equal(mock.requests.length, 0);
    });

    it('leaves the account alone when DC_MANAGE_WEBHOOK is not set', async () => {
        const { result, mock } = await sendWithCallback({ env: { DC_AUDIO: 'media', DC_MEDIA_ID: MEDIA_ID } });

        assert.equal(result.code, 0, result.output);
        assert.equal(mock.calls().some((call) => call.includes(HOOKS)), false);
    });
});
