import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { printError } from '../src/lib/cli.js';
import { DcError } from '../src/lib/client.js';
import { RecipeError } from '../src/lib/config.js';
import { run as runByoc } from '../src/recipes/send-rvm-byoc.js';
import { run as runLocalPresence } from '../src/recipes/send-rvm-byoc-local-presence.js';
import { run as runRetail } from '../src/recipes/send-rvm-retail.js';
import { run as runTts } from '../src/recipes/send-rvm-tts.js';
import { runAndSendCallback, runAndSendWebhook, WAITING_ENV } from '../testkit/flow.js';
import { KEY, LINE_ID, MEDIA_ID, MESSAGE_ID, SECRET, UUID, VOICE_ID, baseEnv, captureOutput, fixtureJson } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { REQUEST_ID, ok, problem, standardRoutes } from '../testkit/routes.js';

const vectors = fixtureJson('signature-vectors.json');
const CALLER_ID = '+13125550177';
const AUDIO_URL = 'https://audio.example.com/greeting.mp3';
const STI_ORIG_ID = '3b9d5f7a-2c4e-4a61-8d0b-5e7f9a1c3d24';

let mock;
let out;

function assertNoSecrets() {
    const printed = out.text();
    assert.ok(!printed.includes(SECRET), 'the API secret was printed');
    assert.ok(!printed.includes(vectors.secret), 'a signing secret was printed');
}

function assertSentWithCredentials(request) {
    assert.equal(request.headers['x-key'], KEY);
    assert.equal(request.headers['x-secret'], SECRET);
    assert.equal(request.headers['content-type'], 'application/json');
    assert.equal(request.headers['accept'], 'application/json');
}

beforeEach(() => {
    out = captureOutput();
});

afterEach(async () => {
    await mock.close();
});

describe('send-rvm-retail', () => {
    it('sends from the default phone line with media, and nothing else', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID });

        const outcome = await runRetail({ env, out });

        assert.deepEqual(mock.summary(), ['GET /phone/public/lines', 'POST /rvm']);
        const request = mock.find('POST', '/rvm')[0];
        assert.deepEqual(Object.keys(request.body).sort(), ['foreign_id', 'media_id', 'phone_line_id', 'to']);
        assert.equal(request.body.to, '+13125550142');
        assert.equal(request.body.phone_line_id, LINE_ID);
        assert.equal(request.body.media_id, MEDIA_ID);
        assert.match(request.body.foreign_id, UUID);
        assert.equal(outcome.messageId, MESSAGE_ID);
        assert.equal(outcome.result, null);
        assert.match(out.text(), /Accepted \(202\): message_id=8e4a2c6f/);
        assertNoSecrets();
    });

    it('sends the credentials and an Idempotency-Key that is a uuid', async () => {
        mock = await startMockApi(standardRoutes());
        await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }), out });

        for (const request of mock.requests) {
            assertSentWithCredentials(request);
        }
        const send = mock.find('POST', '/rvm')[0];
        assert.match(send.headers['idempotency-key'], UUID);
        assert.equal(mock.find('GET', '/phone/public/lines')[0].headers['idempotency-key'], undefined);
    });

    it('uses a new Idempotency-Key and foreign_id for each send', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID });
        await runRetail({ env, out });
        await runRetail({ env, out });

        const sends = mock.find('POST', '/rvm');
        assert.notEqual(sends[0].headers['idempotency-key'], sends[1].headers['idempotency-key']);
        assert.notEqual(sends[0].body.foreign_id, sends[1].body.foreign_id);
    });

    it('skips the line lookup when DC_PHONE_LINE_ID is set', async () => {
        mock = await startMockApi(standardRoutes());
        const configured = '5e9b1d3f-7a2c-4c84-9f60-2d4b6e8a0c17';
        await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID, DC_PHONE_LINE_ID: configured }), out });

        assert.deepEqual(mock.summary(), ['POST /rvm']);
        assert.equal(mock.requests[0].body.phone_line_id, configured);
    });

    it('uses the first media file when no audio is configured', async () => {
        mock = await startMockApi(standardRoutes());
        await runRetail({ env: baseEnv(mock), out });

        assert.deepEqual(mock.summary(), ['GET /phone/public/lines', 'GET /media/public/media', 'POST /rvm']);
        assert.equal(mock.find('POST', '/rvm')[0].body.media_id, MEDIA_ID);
    });

    it('speaks text with a voice when DC_TTS_BODY is set', async () => {
        mock = await startMockApi(standardRoutes());
        await runRetail({ env: baseEnv(mock, { DC_TTS_BODY: 'Hello from the test.' }), out });

        assert.deepEqual(mock.summary(), ['GET /phone/public/lines', 'GET /voice/public/voices', 'POST /rvm']);
        const body = mock.find('POST', '/rvm')[0].body;
        assert.equal(body.tts_body, 'Hello from the test.');
        assert.equal(body.voice_id, VOICE_ID);
        assert.equal(body.media_id, undefined);
        assert.equal(body.audio_url, undefined);
    });

    it('prefers DC_MEDIA_ID over DC_TTS_BODY', async () => {
        mock = await startMockApi(standardRoutes());
        await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID, DC_TTS_BODY: 'Hello.' }), out });

        const body = mock.find('POST', '/rvm')[0].body;
        assert.equal(body.media_id, MEDIA_ID);
        assert.equal(body.tts_body, undefined);
        assert.equal(body.voice_id, undefined);
    });

    it('sends audio_url when it is the only audio set, and says when the API accepts it', async () => {
        mock = await startMockApi(standardRoutes());
        await runRetail({ env: baseEnv(mock, { DC_AUDIO_URL: AUDIO_URL, DC_CALLER_ID: CALLER_ID }), out });

        assert.deepEqual(mock.summary(), ['GET /phone/public/lines', 'POST /rvm']);
        const body = mock.find('POST', '/rvm')[0].body;
        assert.deepEqual(Object.keys(body).sort(), ['audio_url', 'foreign_id', 'phone_line_id', 'to']);
        assert.equal(body.audio_url, AUDIO_URL);
        assert.ok(out.text().includes('audio_url is an option for BYOC plans only and must be enabled by support. Contact support to enable it.'));
        assert.ok(out.text().includes('Otherwise, upload the file and send media_id, or use text to speech.'));
    });

    it('stops when there is no default phone line, and names reason code 4010', async () => {
        mock = await startMockApi(standardRoutes({ 'GET /phone/public/lines': ok([{ ivr_id: LINE_ID, name: 'Other', type: 'voice', is_default: false }]) }));
        await assert.rejects(runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }), out }), /4010/);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
    });

    it('also reads the default flag when the API names it default', async () => {
        mock = await startMockApi(standardRoutes({ 'GET /phone/public/lines': ok([{ ivr_id: LINE_ID, name: 'Main', type: 'voice', default: true }]) }));
        await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }), out });
        assert.equal(mock.find('POST', '/rvm')[0].body.phone_line_id, LINE_ID);
    });

    it('rejects a recipient that is not E.164 before any request', async () => {
        mock = await startMockApi(standardRoutes());
        await assert.rejects(runRetail({ env: baseEnv(mock, { DC_TO: '312-555-0142' }), out }), /E\.164/);
        assert.deepEqual(mock.requests, []);
    });

    it('adds callback_url when DC_PUBLIC_URL is set, and prints the callback result', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, Object.assign({ DC_MEDIA_ID: MEDIA_ID }, WAITING_ENV));

        const { outcome, callbackStatus, sent } = await runAndSendCallback({ start: () => runRetail({ env, out }), mock, out });

        assert.equal(callbackStatus, 200);
        assert.equal(sent.body.callback_url, 'https://tunnel.example.com/callbacks/dropcowboy');
        assert.equal(sent.body.caller_id, undefined);
        assert.equal(outcome.result.status, 'success');
        assert.match(out.text(), /Result: callback status=success reason="" reason_code=0 to=\+13125550142 from=\+12125550100/);
        assert.match(out.text(), /\/outcomes/);
        assertNoSecrets();
    });

    it('ignores a callback that carries another foreign_id', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, Object.assign({ DC_MEDIA_ID: MEDIA_ID }, WAITING_ENV, { DC_WAIT_SECONDS: '1' }));

        const { outcome } = await runAndSendCallback({
            start: () => runRetail({ env, out }),
            mock,
            out,
            overrides: { foreign_id: '6e1f3a5c-7b9d-4c2e-8a4f-0d2b4c6e8a10' }
        });

        assert.equal(outcome.result, null);
        assert.match(out.text(), /No result arrived within 1 seconds/);
    });

    it('matches a signed status webhook on the recipient number', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, Object.assign({ DC_MEDIA_ID: MEDIA_ID }, WAITING_ENV));

        const { outcome, webhookStatus } = await runAndSendWebhook({ start: () => runRetail({ env, out }), mock, out });

        assert.equal(webhookStatus, 200);
        assert.equal(outcome.result.to, '+13125550142');
        assert.match(out.text(), /Result: webhook contact\.rvm\.status status=success/);
        assertNoSecrets();
    });

    it('tells the reader when there is nowhere for a result to go', async () => {
        mock = await startMockApi(standardRoutes());
        await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }), out });

        assert.match(out.text(), /DC_PUBLIC_URL is not set/);
        assert.equal(mock.find('POST', '/rvm')[0].body.callback_url, undefined);
    });
});

describe('API failures', () => {
    it('prints status, title, detail, code and request id, and nothing secret', async () => {
        mock = await startMockApi(standardRoutes({
            'POST /rvm': problem(422, 'Unprocessable Entity', 'tts_body is longer than 1200 characters.', 'tts_too_long')
        }));

        let failure = null;
        try {
            await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }), out });
        } catch (err) {
            failure = err;
        }
        assert.ok(failure instanceof DcError);
        printError(out, failure);

        const printed = out.text();
        assert.match(printed, /Status:\s+422/);
        assert.match(printed, /Title:\s+Unprocessable Entity/);
        assert.match(printed, /Detail:\s+tts_body is longer than 1200 characters\./);
        assert.match(printed, /Code:\s+tts_too_long/);
        assert.match(printed, new RegExp('Request id:\\s+' + REQUEST_ID));
        assertNoSecrets();
        assert.ok(!JSON.stringify(failure).includes(SECRET));
        assert.ok(!String(failure.stack).includes(SECRET));
    });

    it('reports a 401 from the API without echoing the key or secret', async () => {
        mock = await startMockApi(standardRoutes({
            'GET /phone/public/lines': problem(401, 'Unauthorized', 'Invalid API key or secret.')
        }));

        await assert.rejects(runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }), out }), (err) => {
            printError(out, err);
            return err.status === 401;
        });
        assert.ok(!out.text().includes(KEY));
        assertNoSecrets();
    });
});

describe('send-rvm-byoc', () => {
    it('checks the carrier, then sends with caller_id and audio_url and no phone_line_id', async () => {
        mock = await startMockApi(standardRoutes());
        await runByoc({ env: baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: AUDIO_URL }), out });

        assert.deepEqual(mock.summary(), ['GET /integration/public/byoc', 'POST /rvm']);
        const body = mock.find('POST', '/rvm')[0].body;
        assert.deepEqual(Object.keys(body).sort(), ['audio_url', 'caller_id', 'foreign_id', 'to']);
        assert.equal(body.caller_id, CALLER_ID);
        assert.equal(body.audio_url, AUDIO_URL);
        assert.equal(body.phone_line_id, undefined);
        assert.match(mock.find('POST', '/rvm')[0].headers['idempotency-key'], UUID);
        assertNoSecrets();
    });

    it('adds the STIR/SHAKEN details when both are set', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: AUDIO_URL, DC_STI_ORIG_ID: STI_ORIG_ID, DC_STI_ATTESTATION: 'B' });
        await runByoc({ env, out });

        assert.deepEqual(mock.find('POST', '/rvm')[0].body.byoc, { sti_orig_id: STI_ORIG_ID, sti_attestation: 'B' });
    });

    it('refuses only one of the two STIR/SHAKEN settings', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: AUDIO_URL, DC_STI_ATTESTATION: 'B' });
        await assert.rejects(runByoc({ env, out }), /both DC_STI_ORIG_ID and DC_STI_ATTESTATION/);
        assert.deepEqual(mock.requests, []);
    });

    it('refuses an attestation that is not A, B or C', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: AUDIO_URL, DC_STI_ORIG_ID: STI_ORIG_ID, DC_STI_ATTESTATION: 'D' });
        await assert.rejects(runByoc({ env, out }), /A, B or C.*Never send a higher level than your carrier gave you\./);
    });

    it('refuses an origination id that is not a uuid', async () => {
        mock = await startMockApi(standardRoutes());
        const env = baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: AUDIO_URL, DC_STI_ORIG_ID: 'not-a-uuid', DC_STI_ATTESTATION: 'B' });
        await assert.rejects(runByoc({ env, out }), /UUID/);
    });

    it('stops with a pointer to the setup guide when no carrier is connected', async () => {
        mock = await startMockApi(standardRoutes({ 'GET /integration/public/byoc': ok({ connected: false }) }));
        await assert.rejects(runByoc({ env: baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: AUDIO_URL }), out }), /bring-your-own-carrier/);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
    });

    it('stops when no audio is chosen, without looking anything up', async () => {
        mock = await startMockApi(standardRoutes());
        await assert.rejects(runByoc({ env: baseEnv(mock, { DC_CALLER_ID: CALLER_ID }), out }), /No audio chosen/);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
        assert.deepEqual(mock.find('GET', '/media/public/media'), []);
    });

    it('requires DC_CALLER_ID before any request', async () => {
        mock = await startMockApi(standardRoutes());
        await assert.rejects(runByoc({ env: baseEnv(mock, { DC_AUDIO_URL: AUDIO_URL }), out }), /DC_CALLER_ID is not set/);
        assert.deepEqual(mock.requests, []);
    });

    it('sends media_id when that is the audio chosen', async () => {
        mock = await startMockApi(standardRoutes());
        await runByoc({ env: baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_MEDIA_ID: MEDIA_ID }), out });

        const body = mock.find('POST', '/rvm')[0].body;
        assert.equal(body.media_id, MEDIA_ID);
        assert.equal(body.audio_url, undefined);
    });
});

describe('send-rvm-tts', () => {
    const TEXT = 'Hi, this is Example Dental with a reminder about your appointment tomorrow.';

    it('resolves the voice and the line, then sends tts_body with voice_id only', async () => {
        mock = await startMockApi(standardRoutes());
        await runTts({ env: baseEnv(mock, { DC_TTS_BODY: TEXT }), out });

        assert.deepEqual(mock.summary(), ['GET /voice/public/voices', 'GET /phone/public/lines', 'POST /rvm']);
        const body = mock.find('POST', '/rvm')[0].body;
        assert.deepEqual(Object.keys(body).sort(), ['foreign_id', 'phone_line_id', 'to', 'tts_body', 'voice_id']);
        assert.equal(body.tts_body, TEXT);
        assert.equal(body.voice_id, VOICE_ID);
        assert.equal(body.phone_line_id, LINE_ID);
    });

    it('never sends media_id or audio_url alongside tts_body', async () => {
        mock = await startMockApi(standardRoutes());
        await runTts({ env: baseEnv(mock, { DC_TTS_BODY: TEXT, DC_MEDIA_ID: MEDIA_ID, DC_AUDIO_URL: AUDIO_URL }), out });

        const body = mock.find('POST', '/rvm')[0].body;
        assert.equal(body.media_id, undefined);
        assert.equal(body.audio_url, undefined);
    });

    it('sends from DC_CALLER_ID with no phone_line_id in byoc mode', async () => {
        mock = await startMockApi(standardRoutes());
        await runTts({ env: baseEnv(mock, { DC_TTS_BODY: TEXT, DC_MODE: 'byoc', DC_CALLER_ID: CALLER_ID, DC_VOICE_ID: VOICE_ID }), out });

        assert.deepEqual(mock.summary(), ['POST /rvm']);
        const body = mock.find('POST', '/rvm')[0].body;
        assert.equal(body.caller_id, CALLER_ID);
        assert.equal(body.phone_line_id, undefined);
        assert.equal(body.tts_body, TEXT);
        assert.equal(body.voice_id, VOICE_ID);
    });

    it('refuses text over 1,200 characters before any request', async () => {
        mock = await startMockApi(standardRoutes());
        await assert.rejects(runTts({ env: baseEnv(mock, { DC_TTS_BODY: 'a'.repeat(1201) }), out }), /1201 characters/);
        assert.deepEqual(mock.requests, []);
    });

    it('accepts text of exactly 1,200 characters', async () => {
        mock = await startMockApi(standardRoutes());
        await runTts({ env: baseEnv(mock, { DC_TTS_BODY: 'a'.repeat(1200) }), out });
        assert.equal(mock.find('POST', '/rvm')[0].body.tts_body.length, 1200);
    });

    it('requires DC_TTS_BODY', async () => {
        mock = await startMockApi(standardRoutes());
        await assert.rejects(runTts({ env: baseEnv(mock), out }), /DC_TTS_BODY is not set/);
        assert.deepEqual(mock.requests, []);
    });

    it('stops when the account has no ready voice', async () => {
        mock = await startMockApi(standardRoutes({ 'GET /voice/public/voices': ok({ voices: [{ voice_id: VOICE_ID, name: 'Alex', status: 'training' }] }) }));
        await assert.rejects(runTts({ env: baseEnv(mock, { DC_TTS_BODY: TEXT }), out }), /No voice to speak with/);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
    });

    it('rejects a DC_MODE it does not know', async () => {
        mock = await startMockApi(standardRoutes());
        await assert.rejects(runTts({ env: baseEnv(mock, { DC_TTS_BODY: TEXT, DC_MODE: 'both' }), out }), /retail or byoc/);
    });

    it('previews the speech first when DC_PREVIEW=yes', async () => {
        mock = await startMockApi(standardRoutes({
            'POST /voice/public/tts/synthesize': ok({ audio_url: 'https://media.example.com/preview.mp3', expires_at: 1774045560000, tts_characters: 46 })
        }));
        await runTts({ env: baseEnv(mock, { DC_TTS_BODY: TEXT, DC_PREVIEW: 'yes' }), out });

        assert.deepEqual(mock.summary(), ['GET /voice/public/voices', 'GET /phone/public/lines', 'POST /voice/public/tts/synthesize', 'POST /rvm']);
        assert.deepEqual(mock.find('POST', '/voice/public/tts/synthesize')[0].body, { voice_id: VOICE_ID, text: TEXT });
        assert.match(out.text(), /Preview audio: https:\/\/media\.example\.com\/preview\.mp3/);
        assert.match(out.text(), /billed per character\): 46/);
    });

    it('does not preview unless asked', async () => {
        mock = await startMockApi(standardRoutes());
        await runTts({ env: baseEnv(mock, { DC_TTS_BODY: TEXT }), out });
        assert.deepEqual(mock.find('POST', '/voice/public/tts/synthesize'), []);
    });
});

describe('consent line', () => {
    const CONSENT = 'Send only to people who agreed to hear from you. Test with numbers you own.';
    const RECIPES = [
        ['send-rvm-retail', runRetail, { DC_MEDIA_ID: MEDIA_ID }],
        ['send-rvm-byoc', runByoc, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: AUDIO_URL }],
        ['send-rvm-byoc-local-presence', runLocalPresence, { DC_MEDIA_ID: MEDIA_ID, DC_PHONE_LINE_ID: LINE_ID }],
        ['send-rvm-tts', runTts, { DC_TTS_BODY: 'Hi, this is Example Dental with a reminder about your appointment tomorrow.' }]
    ];

    for (const [name, recipe, extra] of RECIPES) {
        it(name + ' prints it once, first, before any request', async () => {
            mock = await startMockApi(standardRoutes({
                ['GET /phone/public/lines/' + LINE_ID + '/numbers']: ok([{ phone_number: CALLER_ID }])
            }));
            await recipe({ env: baseEnv(mock, extra), out });

            const count = out.lines.filter((line) => line === CONSENT).length;
            assert.equal(count, 1);
            assert.equal(out.lines[0], CONSENT);
        });

        it(name + ' prints it even when its settings are wrong, and sends nothing', async () => {
            mock = await startMockApi(standardRoutes());
            await assert.rejects(recipe({ env: baseEnv(mock, { DC_TO: 'not-a-number' }), out }), /E\.164/);

            assert.equal(out.lines[0], CONSENT);
            assert.deepEqual(mock.requests, []);
        });
    }
});
