import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { printError, runCli } from '../src/lib/cli.js';
import { RecipeError } from '../src/lib/config.js';
import { messageTwiml } from '../src/lib/detection.js';
import { TwilioError } from '../src/lib/twilio.js';
import { BILLING_LINE, NO_RESULT_HINT, NO_WEBHOOK_HINT, StoppedError, TRIAL_MESSAGE, run } from '../src/recipes/detect-twilio.js';
import { SECRET, captureOutput, waitUntil } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { problem } from '../testkit/routes.js';
import {
    ACCOUNT_PATH,
    ACCOUNT_SID,
    AUTH_TOKEN,
    CALLS_PATH,
    CALL_PATH,
    CALL_SID,
    DETECTION_KEY,
    KEYS_PATH,
    LEFTOVER_KEY_ID,
    PUBLIC_URL,
    TEMP_API_KEY,
    TEMP_KEY_ID,
    TWILIO_FROM,
    TWILIO_TO,
    VM_AUDIO_URL,
    detectEnv,
    detectionBody,
    detectionKeyRoutes,
    formOf,
    postDetection,
    startCall,
    twilioError,
    twilioRoutes
} from '../testkit/twilio.js';

const CONSENT = 'Send only to people who agreed to hear from you. Test with numbers you own.';
const ROOT = fileURLToPath(new URL('../', import.meta.url));
const LIVE_TEXT = 'Hi, this is Example Dental. Please call us back about your appointment.';

let twilio;
let dc;
let out;

beforeEach(() => {
    out = captureOutput();
    twilio = null;
    dc = null;
});

afterEach(async () => {
    assertNoSecrets(out.text());
    if (twilio) {
        await twilio.close();
    }
    if (dc) {
        await dc.close();
    }
});

function assertNoSecrets(text) {
    assert.ok(!text.includes(AUTH_TOKEN), 'the Twilio auth token was printed');
    assert.ok(!text.includes(SECRET), 'DC_SECRET was printed');
    assert.ok(!text.includes(DETECTION_KEY), 'the Detection key was printed');
    assert.ok(!text.includes(TEMP_API_KEY), 'the temporary Detection key was printed');
    assert.ok(!text.includes(ACCOUNT_SID), 'the full Account SID was printed');
}

async function mocks({ twilioOverrides = {}, dcOverrides = null } = {}) {
    twilio = await startMockApi(twilioRoutes(twilioOverrides));
    if (dcOverrides !== null) {
        dc = await startMockApi(detectionKeyRoutes(dcOverrides));
    }
}

// Ends the call the way Twilio does after the message, and waits for the run.
async function complete(call) {
    await call.status('completed', { CallDuration: '21' });
    return call.running;
}

function updateForms() {
    return twilio.find('POST', CALL_PATH).map(formOf);
}

function playForm(message) {
    return [['Twiml', messageTwiml(message)]];
}

describe('detect-twilio: settings', () => {
    it('prints the consent and billing lines first, then refuses bad settings with no request made', async () => {
        await mocks({ dcOverrides: {} });
        const env = detectEnv({ twilio, dc, withApiKey: true }, { DC_TO: '555', DC_PUBLIC_URL: 'http://localhost:3000', DC_WAIT_SECONDS: '0' });
        await assert.rejects(run({ env, out }), function (err) {
            assert.match(err.message, /DC_TO must be in E\.164/);
            assert.match(err.message, /DC_PUBLIC_URL=http:\/\/localhost:3000/);
            assert.match(err.message, /DC_WAIT_SECONDS=0/);
            return true;
        });
        assert.equal(out.lines[0], CONSENT);
        assert.equal(out.lines[1], BILLING_LINE);
        assert.deepEqual(twilio.requests, []);
        assert.deepEqual(dc.requests, []);
    });

    it('refuses a sample value and the zero SID with no request made', async () => {
        await mocks({ dcOverrides: {} });
        const env = detectEnv({ twilio, dc, withApiKey: true }, { TWILIO_FROM: '+12125550100', TWILIO_ACCOUNT_SID: 'AC00000000000000000000000000000000' });
        await assert.rejects(run({ env, out }), /TWILIO_FROM=\+12125550100: this is a sample value from our docs; use your own\.\nTWILIO_ACCOUNT_SID=AC0{32}: this is the placeholder from our fixtures; use your own\./);
        assert.deepEqual(twilio.requests, []);
        assert.deepEqual(dc.requests, []);
    });
});

describe('detect-twilio: Detection key', () => {
    it('makes no Drop Cowboy request with DC_DETECTION_KEY, and prints only its last 4', async () => {
        await mocks({ dcOverrides: {} });
        const call = await startCall({ run, env: detectEnv({ twilio, dc }), out, twilio });
        await call.answer();
        await call.detection('detection.beep.json');
        await waitUntil(() => call.updates()[0], 'the update');
        await complete(call);

        assert.deepEqual(dc.requests, []);
        assert.ok(out.text().includes('ends in ' + DETECTION_KEY.slice(-4)));
    });

    it('lists, deletes the leftover, creates, and deletes the temporary key at the end', async () => {
        await mocks({ dcOverrides: {} });
        const call = await startCall({ run, env: detectEnv({ twilio, dc, withApiKey: true }), out, twilio });
        assert.deepEqual(dc.summary(), ['GET ' + KEYS_PATH, 'DELETE ' + KEYS_PATH + '/' + LEFTOVER_KEY_ID, 'POST ' + KEYS_PATH]);
        assert.deepEqual(dc.find('POST', KEYS_PATH)[0].body, { name: 'Twilio detection recipe (temporary)', expires_in_seconds: 3600 });

        // The TwiML carries the temporary key.
        const twiml = await (await call.answer()).text();
        assert.ok(twiml.includes('<Parameter name="api_key" value="' + TEMP_API_KEY + '"/>'));
        // Webhooks are signed with the temporary key, not any other.
        const otherKey = await postDetection({ port: call.port, body: detectionBody('detection.beep.json', { callId: call.callId }), key: DETECTION_KEY });
        assert.deepEqual(await otherKey.json(), { error: 'invalid_signature' });
        const signed = await postDetection({ port: call.port, body: detectionBody('detection.beep.json', { callId: call.callId }), key: TEMP_API_KEY });
        assert.equal(signed.status, 200);
        await waitUntil(() => call.updates()[0], 'the update');
        const outcome = await complete(call);

        assert.equal(outcome.outcome, 'voicemail_on_beep');
        assert.deepEqual(dc.summary().slice(3), ['DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID]);
        assert.ok(out.lines.includes('Temporary Detection key deleted.'));
        assert.ok(out.text().includes('key_id=' + TEMP_KEY_ID + ' (key ends in 7e21'));
    });

    it('deletes the temporary key after a Twilio error, and prints the hint', async () => {
        await mocks({
            dcOverrides: {},
            twilioOverrides: { ['POST ' + CALLS_PATH]: twilioError(400, 21210, 'The source phone number provided, ' + TWILIO_FROM + ', is not yet verified for your account ' + ACCOUNT_SID + '.') }
        });
        const env = detectEnv({ twilio, dc, withApiKey: true });
        let failure;
        await assert.rejects(run({ env, out, healthUrl: (port) => 'http://127.0.0.1:' + port + '/health' }), function (err) {
            failure = err;
            return err instanceof TwilioError;
        });
        printError(out, failure);

        assert.equal(dc.summary().at(-1), 'DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID);
        assert.deepEqual(twilio.find('POST', CALL_PATH), []);
        assert.match(out.text(), /Code:\s+21210/);
        assert.match(out.text(), /What to do: TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it\./);
        assert.match(out.text(), /More info:\s+https:\/\/www\.twilio\.com\/docs\/errors\/21210/);
        assert.ok(out.text().includes('AC...0001'));
    });

    it('deletes the temporary key after a thrown error', async () => {
        await mocks({ dcOverrides: {} });
        const env = detectEnv({ twilio, dc, withApiKey: true });
        await assert.rejects(run({ env, out, healthUrl: () => 'http://127.0.0.1:1/health' }), /The tunnel does not reach this receiver/);

        assert.equal(dc.summary().at(-1), 'DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID);
        assert.deepEqual(twilio.find('POST', CALLS_PATH), []);
    });

    for (const [code, title, hint] of [
        ['byoc-required', 'Byoc Required', 'Detection keys need Building Blocks on your account. Enable Building Blocks, then run this again.'],
        ['team-not-verified', 'Team Not Verified', 'Finish verifying your account in the dashboard, then run this again.'],
        ['trial_feature_blocked', 'Trial Feature Blocked', 'Detection keys are not available on a trial account. Choose a plan, then run this again.']
    ]) {
        it('prints the ' + code + ' hint when the key cannot be created', async () => {
            await mocks({ dcOverrides: { ['POST ' + KEYS_PATH]: problem(403, title, 'This account cannot create Detection keys yet.', code) } });
            let failure;
            await assert.rejects(run({ env: detectEnv({ twilio, dc, withApiKey: true }), out }), function (err) {
                failure = err;
                return true;
            });
            printError(out, failure);

            assert.match(out.text(), /Detail:\s+This account cannot create Detection keys yet\./);
            assert.match(out.text(), new RegExp('Code:\\s+' + code));
            assert.ok(out.lines.includes('What to do: ' + hint), 'the exact hint for ' + code);
            assert.deepEqual(twilio.requests, []);
            assert.ok(!dc.summary().includes('DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID));
        });
    }
});

describe('detect-twilio: Twilio preflight', () => {
    async function preflight(twilioOverrides) {
        await mocks({ twilioOverrides });
        return run({ env: detectEnv({ twilio }), out, healthUrl: (port) => 'http://127.0.0.1:' + port + '/health' });
    }

    it('stops on a trial account, before the call', async () => {
        await assert.rejects(preflight({ ['GET ' + ACCOUNT_PATH + '.json']: { status: 200, body: { type: 'Trial', status: 'active' } } }), new RegExp(TRIAL_MESSAGE.slice(0, 40)));
        assert.deepEqual(twilio.summary(), ['GET ' + ACCOUNT_PATH + '.json']);
    });

    it('stops on an account that is not active and prints its status', async () => {
        await assert.rejects(preflight({ ['GET ' + ACCOUNT_PATH + '.json']: { status: 200, body: { type: 'Full', status: 'suspended' } } }), /status is suspended/);
        assert.deepEqual(twilio.find('POST', CALLS_PATH), []);
    });

    it('passes on a number in the account without asking for caller IDs', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        assert.deepEqual(twilio.summary(), ['GET ' + ACCOUNT_PATH + '.json', 'GET ' + ACCOUNT_PATH + '/IncomingPhoneNumbers.json', 'POST ' + CALLS_PATH]);
        assert.equal(twilio.requests[1].query.PhoneNumber, TWILIO_FROM);
        await complete(call);
    });

    it('passes on a verified caller ID', async () => {
        await mocks({
            twilioOverrides: {
                ['GET ' + ACCOUNT_PATH + '/IncomingPhoneNumbers.json']: { status: 200, body: { incoming_phone_numbers: [] } },
                ['GET ' + ACCOUNT_PATH + '/OutgoingCallerIds.json']: { status: 200, body: { outgoing_caller_ids: [{ phone_number: TWILIO_FROM }] } }
            }
        });
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        assert.equal(twilio.find('GET', ACCOUNT_PATH + '/OutgoingCallerIds.json')[0].query.PhoneNumber, TWILIO_FROM);
        assert.match(out.text(), /is a verified caller ID/);
        await complete(call);
    });

    it('stops when TWILIO_FROM is neither, and creates no call', async () => {
        await assert.rejects(preflight({ ['GET ' + ACCOUNT_PATH + '/IncomingPhoneNumbers.json']: { status: 200, body: { incoming_phone_numbers: [] } } }), /TWILIO_FROM is not a number in this Twilio account or a verified caller ID on it\./);
        assert.deepEqual(twilio.find('POST', CALLS_PATH), []);
    });
});

describe('detect-twilio: the call', () => {
    it('creates the call with exactly the contract form body, with Basic auth', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }, { DC_RING_SECONDS: '25' }), out, twilio });
        const request = twilio.find('POST', CALLS_PATH)[0];
        assert.deepEqual(formOf(request), [
            ['To', TWILIO_TO],
            ['From', TWILIO_FROM],
            ['Url', PUBLIC_URL + '/twilio/voice'],
            ['Method', 'POST'],
            ['StatusCallback', PUBLIC_URL + '/twilio/status'],
            ['StatusCallbackMethod', 'POST'],
            ['StatusCallbackEvent', 'initiated'],
            ['StatusCallbackEvent', 'ringing'],
            ['StatusCallbackEvent', 'answered'],
            ['StatusCallbackEvent', 'completed'],
            ['Timeout', '25']
        ]);
        assert.ok(!request.rawBody.includes('MachineDetection'));
        assert.equal(request.headers.authorization, 'Basic ' + Buffer.from(ACCOUNT_SID + ':' + AUTH_TOKEN).toString('base64'));
        assert.match(out.text(), new RegExp('Call created: CallSid=' + CALL_SID));
        await complete(call);
    });

    it('answers the call with TwiML that streams to Detection with this run\'s call_id', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        const res = await call.answer();
        const twiml = await res.text();
        assert.equal(res.headers.get('content-type'), 'text/xml');
        assert.ok(twiml.includes('<Parameter name="call_id" value="' + call.callId + '"/>'));
        assert.ok(!twiml.includes('name="strategy"'));
        assert.ok(!twiml.includes('name="detection_timeout_sec"'));
        assert.ok(twiml.includes('<Parameter name="webhook_url" value="' + PUBLIC_URL + '/webhooks/detection"/>'));
        assert.ok(twiml.includes('<Pause length="610"/>'));
        await complete(call);
    });
});

describe('detect-twilio: decisions', () => {
    it('plays the voicemail message on the beep, prints the latency and a summary', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        await call.answer();
        await call.status('in-progress');
        await call.detection('detection.voicemail.json');
        await call.detection('detection.beep.json');
        await waitUntil(() => call.updates()[0], 'the update');
        await call.detection('detection.close.json');
        const outcome = await complete(call);

        assert.deepEqual(updateForms(), [playForm({ kind: 'play', value: VM_AUDIO_URL })]);
        assert.equal(outcome.outcome, 'voicemail_on_beep');
        assert.deepEqual(outcome.beep, { timestamp_ms: 6420, duration_ms: 380 });
        assert.equal(outcome.callStatus, 'completed');
        assert.equal(outcome.callDuration, '21');
        assert.deepEqual(outcome.webhooks, { received: 3, ignored: 0 });
        assert.match(out.text(), /Twilio accepted the update \d+ ms after the receiver recorded the beep\./);
        assert.match(out.text(), /Detection event close \(not used by this recipe\)/);
        assert.match(out.text(), /outcome:\s+voicemail_on_beep/);
        assert.match(out.text(), /last verdict:\s+type=speech\.voicemail\.greeting confidence=0\.91/);
        assert.match(out.text(), /beep:\s+timestamp_ms=6420 duration_ms=380/);
        assert.match(out.text(), /CallStatus:\s+completed \(CallDuration 21\)/);
        assert.match(out.text(), new RegExp('call_id:\\s+' + call.callId));
        // A terminal status was recorded, so the finally step does not hang up.
        assert.ok(!out.text().includes('Hung up the call'));
    });

    for (const [name, data] of [
        ['speech.human.unknown at 0.6', undefined],
        ['speech.human.unknown at a low confidence', { confidence: 0.2 }],
        ['another speech.human. subtype', { type: 'speech.human.adult', confidence: 0.75 }]
    ]) {
        it('plays the live message for ' + name, async () => {
            await mocks();
            const call = await startCall({ run, env: detectEnv({ twilio }, { DC_LIVE_TEXT: LIVE_TEXT }), out, twilio });
            await call.answer();
            await call.detection('detection.live-person.json', { data });
            await waitUntil(() => call.updates()[0], 'the update');
            const outcome = await complete(call);

            assert.equal(outcome.outcome, 'live_person');
            assert.deepEqual(updateForms(), [playForm({ kind: 'say', value: LIVE_TEXT })]);
        });
    }

    it('falls back to the voicemail message for a live person when no live message is set', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }, { DC_VM_AUDIO_URL: '', DC_VM_TEXT: 'Hi, this is Example Dental & Co.' }), out, twilio });
        await call.detection('detection.live-person.json');
        await waitUntil(() => call.updates()[0], 'the update');
        await complete(call);

        assert.deepEqual(updateForms(), [[['Twiml', '<Response><Stop><Stream name="detection"/></Stop><Say>Hi, this is Example Dental &amp; Co.</Say><Hangup/></Response>']]]);
        assert.match(out.text(), /no live message is set/);
    });

    for (const type of ['live_person', 'speech.ivr']) {
        it('does nothing for ' + type, async () => {
            await mocks();
            const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
            await call.detection('detection.live-person.json', { data: { type, confidence: 0.99 } });
            await waitUntil(() => out.text().includes('Detection verdict: type=' + type), 'the verdict');
            const outcome = await complete(call);

            assert.deepEqual(updateForms(), []);
            assert.equal(outcome.outcome, 'ended_before_action');
            assert.deepEqual(outcome.lastVerdict, { type, confidence: 0.99 });
        });
    }

    it('does nothing after a voicemail verdict with no beep, and hangs up at the end of the run', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }, { DC_WAIT_SECONDS: '60' }), out, twilio });
        await call.detection('detection.voicemail.json');
        const outcome = await call.running;

        assert.equal(outcome.outcome, 'no_result');
        assert.deepEqual(updateForms(), [[['Status', 'completed']]]);
    });

    it('plays on the beep after a voicemail verdict, and only once', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        await call.detection('detection.voicemail.json');
        await call.detection('detection.beep.json');
        await waitUntil(() => call.updates()[0], 'the update');
        await call.detection('detection.beep.json');
        await new Promise((resolve) => setTimeout(resolve, 100));
        const outcome = await complete(call);

        assert.equal(outcome.outcome, 'voicemail_on_beep');
        assert.equal(updateForms().length, 1);
    });

    // A Detection event the fixtures do not carry, built on the close fixture.
    function postEvent(call, event, data) {
        const body = detectionBody('detection.close.json', { callId: call.callId });
        body.event = event;
        body.data = data;
        return postDetection({ port: call.port, body });
    }

    for (const [name, send] of [
        ['speech.silence', (call) => call.detection('detection.voicemail.json', { data: { type: 'speech.silence', confidence: 0.8 } })],
        ['speech.voicemail.full', (call) => call.detection('detection.voicemail.json', { data: { type: 'speech.voicemail.full', confidence: 0.8 } })],
        ['speech.voicemail.not_setup', (call) => call.detection('detection.voicemail.json', { data: { type: 'speech.voicemail.not_setup', confidence: 0.8 } })],
        ['a timeout', (call) => postEvent(call, 'timeout', { timestamp_ms: 45000 })],
        ['a non-recoverable error', (call) => postEvent(call, 'error', { timestamp_ms: 3000, code: 'stream_error', error: 'Audio stopped', recoverable: false })],
        ['a recoverable error', (call) => postEvent(call, 'error', { timestamp_ms: 3000, code: 'slow_audio', error: 'Late frames', recoverable: true })]
    ]) {
        it('takes no action on ' + name, async () => {
            await mocks();
            const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
            await send(call);
            await waitUntil(() => out.text().includes('Detection'), 'the event');
            const outcome = await complete(call);

            assert.deepEqual(updateForms(), []);
            assert.equal(outcome.outcome, 'ended_before_action');
        });
    }

    it('acts once when events race', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        await Promise.all([
            call.detection('detection.beep.json'),
            call.detection('detection.live-person.json'),
            call.detection('detection.voicemail.json'),
            call.detection('detection.beep.json')
        ]);
        await waitUntil(() => call.updates()[0], 'the update');
        await new Promise((resolve) => setTimeout(resolve, 50));
        await complete(call);

        assert.equal(updateForms().length, 1);
        assert.match(out.text(), /Already acted on this call/);
    });

    it('ignores an event for another call_id', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        await call.detection('detection.beep.json', { callId: '0d4f6b8a-2c1e-4e73-9a5b-7c9e1f3a5b20' });
        await call.detection('detection.voicemail.json');
        const outcome = await complete(call);

        assert.deepEqual(updateForms(), []);
        assert.deepEqual(outcome.webhooks, { received: 2, ignored: 1 });
        assert.match(out.text(), /Detection webhooks: 2 received, 1 ignored/);
    });

    it('ends with not_answered on busy before any action, with no update', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        await call.status('initiated');
        await call.status('ringing');
        await call.status('busy');
        const outcome = await call.running;

        assert.equal(outcome.outcome, 'not_answered');
        assert.equal(outcome.callStatus, 'busy');
        assert.deepEqual(twilio.find('POST', CALL_PATH), []);
    });

    it('goes on to the summary when the call already ended before the update', async () => {
        await mocks({ twilioOverrides: { ['POST ' + CALL_PATH]: twilioError(400, 21220, 'Call is not in-progress. Cannot redirect.') } });
        const call = await startCall({ run, env: detectEnv({ twilio }), out, twilio });
        await call.detection('detection.beep.json');
        const outcome = await call.running;

        assert.equal(outcome.outcome, 'voicemail_on_beep');
        assert.equal(updateForms().length, 1);
        assert.match(out.text(), /The call had already ended \(Twilio answered 400, code 21220\)/);
    });
});

describe('detect-twilio: the end of the run', () => {
    it('hangs up and explains when no Detection result arrives in DC_WAIT_SECONDS', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }, { DC_WAIT_SECONDS: '60' }), out, twilio });
        await call.answer();
        const outcome = await call.running;

        assert.equal(outcome.outcome, 'no_result');
        assert.deepEqual(updateForms(), [[['Status', 'completed']]]);
        assert.ok(out.lines.includes(NO_RESULT_HINT));
        assert.ok(out.lines.includes(NO_WEBHOOK_HINT));
    });

    it('hangs up in the finally step a call that is still up after the action', async () => {
        await mocks();
        const call = await startCall({ run, env: detectEnv({ twilio }, { DC_WAIT_SECONDS: '60' }), out, twilio });
        await call.detection('detection.beep.json');
        const outcome = await call.running;

        assert.equal(outcome.outcome, 'voicemail_on_beep');
        assert.deepEqual(updateForms(), [playForm({ kind: 'play', value: VM_AUDIO_URL }), [['Status', 'completed']]]);
        assert.match(out.text(), new RegExp('Hung up the call ' + CALL_SID));
    });

    it('treats a 404 on the final hang-up as a call that already ended', async () => {
        await mocks({
            twilioOverrides: {
                ['POST ' + CALL_PATH]: [{ status: 200, body: { sid: CALL_SID } }, twilioError(404, 20404, 'The requested resource was not found')]
            }
        });
        const call = await startCall({ run, env: detectEnv({ twilio }, { DC_WAIT_SECONDS: '60' }), out, twilio });
        await call.detection('detection.beep.json');
        const outcome = await call.running;

        assert.equal(outcome.outcome, 'voicemail_on_beep');
        assert.equal(updateForms().length, 2);
        assert.match(out.text(), /had already ended/);
    });

    for (const signal of ['SIGINT', 'SIGTERM']) {
        it('on ' + signal + ' hangs up, deletes the temporary key, closes the receiver, then stops with exit code 130', async () => {
            await mocks({ dcOverrides: {} });
            const call = await startCall({ run, env: detectEnv({ twilio, dc, withApiKey: true }), out, twilio });
            await call.answer();
            await call.status('in-progress');
            await waitUntil(() => out.text().includes('Twilio call status: in-progress'), 'the status');
            call.signals.emit(signal, signal);
            await assert.rejects(call.running, function (err) {
                assert.ok(err instanceof StoppedError);
                assert.equal(err.message, 'Stopped before the run finished.');
                assert.equal(err.exitCode, 130);
                return true;
            });

            assert.deepEqual(updateForms(), [[['Status', 'completed']]]);
            assert.equal(dc.summary().at(-1), 'DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID);
            assert.ok(out.lines.includes('Temporary Detection key deleted.'));
            await assert.rejects(fetch('http://127.0.0.1:' + call.port + '/health'));
            assert.equal(call.signals.listenerCount('SIGINT'), 0);
            assert.equal(call.signals.listenerCount('SIGTERM'), 0);
        });
    }

    it('stops with exit code 130 on Ctrl+C even when a cleanup step fails', async () => {
        await mocks({
            dcOverrides: {},
            twilioOverrides: { ['POST ' + CALL_PATH]: twilioError(500, 20500, 'Internal Server Error') }
        });
        const call = await startCall({ run, env: detectEnv({ twilio, dc, withApiKey: true }), out, twilio });
        await call.status('in-progress');
        await waitUntil(() => out.text().includes('Twilio call status: in-progress'), 'the status');
        call.signals.emit('SIGINT', 'SIGINT');
        await assert.rejects(call.running, (err) => err instanceof StoppedError && err.exitCode === 130);

        assert.match(out.text(), new RegExp('Could not hang up the call ' + CALL_SID));
        assert.equal(dc.summary().at(-1), 'DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID);
    });

    it('runs every cleanup step even when one fails', async () => {
        await mocks({
            dcOverrides: { ['DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID]: problem(503, 'Service Unavailable', 'Try again.') }
        });
        const call = await startCall({ run, env: detectEnv({ twilio, dc, withApiKey: true }, { DC_WAIT_SECONDS: '60' }), out, twilio, detectionKey: TEMP_API_KEY });
        await call.detection('detection.beep.json');
        await assert.rejects(call.running, /cleaning up did not/);

        // The hang-up and the receiver close still ran.
        assert.deepEqual(updateForms(), [playForm({ kind: 'play', value: VM_AUDIO_URL }), [['Status', 'completed']]]);
        assert.match(out.text(), /Could not delete the temporary Detection key/);
        await assert.rejects(fetch('http://127.0.0.1:' + call.port + '/health'));
    });
});

describe('detect-twilio: command line', () => {
    async function exitCodeFor(err) {
        const saved = { exitCode: process.exitCode, error: console.error };
        console.error = function () {};
        try {
            await runCli(async () => {
                throw err;
            });
            return process.exitCode;
        } finally {
            process.exitCode = saved.exitCode;
            console.error = saved.error;
        }
    }

    it('exits 130 after Ctrl+C and 1 for any other failure', async () => {
        assert.equal(await exitCodeFor(new StoppedError()), 130);
        assert.equal(await exitCodeFor(new RecipeError('TWILIO_FROM is not set.')), 1);
        assert.equal(await exitCodeFor(new TwilioError({ status: 400, body: { code: 21210, message: 'Not verified' }, redact: (text) => text })), 1);
    });

    it('exits 1 with every settings problem and prints no secret', async () => {
        const env = { PATH: process.env.PATH, TWILIO_AUTH_TOKEN: AUTH_TOKEN, DC_SECRET: SECRET, DC_KEY: 'k', TWILIO_ACCOUNT_SID: ACCOUNT_SID, DC_DETECTION_KEY: DETECTION_KEY };
        const result = await new Promise((resolve, reject) => {
            const child = spawn(process.execPath, ['src/recipes/detect-twilio.js'], { cwd: ROOT, env });
            let stdout = '';
            let stderr = '';
            child.stdout.on('data', (chunk) => { stdout += chunk; });
            child.stderr.on('data', (chunk) => { stderr += chunk; });
            child.on('error', reject);
            child.on('close', (code) => resolve({ code, stdout, stderr }));
        });

        assert.equal(result.code, 1);
        assert.equal(result.stdout.split('\n')[0], CONSENT);
        assert.equal(result.stdout.split('\n')[1], BILLING_LINE);
        assert.match(result.stderr, /TWILIO_FROM is not set/);
        assert.match(result.stderr, /DC_PUBLIC_URL is not set/);
        assertNoSecrets(result.stdout + result.stderr);
    });
});
