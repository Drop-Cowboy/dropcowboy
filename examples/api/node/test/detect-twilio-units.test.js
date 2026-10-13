import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { describe, it } from 'node:test';
import { RecipeError } from '../src/lib/config.js';
import { detectSettingsFromEnv } from '../src/lib/detect-settings.js';
import { CallDecision, OUTCOMES, VERDICTS, messageTwiml, streamTwiml, verifyDetectionSignature, xmlEscape } from '../src/lib/detection.js';
import { TwilioClient, twilioHint, twilioSignature, verifyTwilioSignature } from '../src/lib/twilio.js';
import { callForm } from '../src/recipes/detect-twilio.js';
import { fixtureJson } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { ACCOUNT_SID, AUTH_TOKEN, DETECTION_KEY, PUBLIC_URL, TWILIO_FROM, TWILIO_TO, VM_AUDIO_URL, twilioError } from '../testkit/twilio.js';

const detectionVectors = fixtureJson('detection-signature-vectors.json');
const twilioVectors = fixtureJson('twilio-signature-vectors.json');

function settingsEnv(extra = {}) {
    return Object.assign({
        TWILIO_ACCOUNT_SID: ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: AUTH_TOKEN,
        TWILIO_FROM,
        DC_TO: TWILIO_TO,
        DC_PUBLIC_URL: PUBLIC_URL,
        DC_DETECTION_KEY: DETECTION_KEY,
        DC_VM_AUDIO_URL: VM_AUDIO_URL
    }, extra);
}

function problemsOf(env) {
    try {
        detectSettingsFromEnv(env);
    } catch (err) {
        assert.ok(err instanceof RecipeError);
        return err.message.split('\n');
    }
    return [];
}

function detectionHeaders(signature, timestamp) {
    const headers = {};
    if (signature !== undefined) {
        headers['x-signature'] = signature;
    }
    if (timestamp !== undefined) {
        headers['x-timestamp'] = timestamp;
    }
    return headers;
}

describe('Detection signature vectors', () => {
    const v = detectionVectors;
    const rawBody = Buffer.from(v.raw_body, 'utf8');

    it('verifies the signature at now_ms_valid', () => {
        assert.deepEqual(verifyDetectionSignature({ rawBody, headers: detectionHeaders(v.signature, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_valid }), { ok: true });
    });

    it('rejects the same delivery at now_ms_stale as stale_timestamp', () => {
        assert.deepEqual(verifyDetectionSignature({ rawBody, headers: detectionHeaders(v.signature, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_stale }), { ok: false, code: 'stale_timestamp' });
    });

    it('rejects the tampered body and the signature from another key as invalid_signature', () => {
        const tampered = Buffer.from(v.tampered_raw_body, 'utf8');
        assert.equal(verifyDetectionSignature({ rawBody: tampered, headers: detectionHeaders(v.signature, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).code, 'invalid_signature');
        assert.equal(verifyDetectionSignature({ rawBody, headers: detectionHeaders(v.signature_from_other_key, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).code, 'invalid_signature');
    });

    it('answers missing_signature without the header or the timestamp', () => {
        assert.equal(verifyDetectionSignature({ rawBody, headers: detectionHeaders(undefined, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).code, 'missing_signature');
        assert.equal(verifyDetectionSignature({ rawBody, headers: detectionHeaders(v.signature, undefined), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).code, 'missing_signature');
    });

    it('rejects the digest without the v1=hmac-sha256 scheme as invalid_signature', () => {
        const digestOnly = v.signature.slice('v1=hmac-sha256,'.length);
        assert.equal(verifyDetectionSignature({ rawBody, headers: detectionHeaders(digestOnly, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).code, 'invalid_signature');
        assert.equal(verifyDetectionSignature({ rawBody, headers: detectionHeaders('sha256=' + digestOnly, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).code, 'invalid_signature');
    });

    it('rejects a non-numeric timestamp as stale_timestamp', () => {
        assert.equal(verifyDetectionSignature({ rawBody, headers: detectionHeaders(v.signature, 'soon'), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).code, 'stale_timestamp');
    });

    it('accepts a header with several digests when one matches', () => {
        const other = v.signature_from_other_key.slice('v1=hmac-sha256,'.length);
        const both = 'v1=hmac-sha256,' + other + ',' + v.signature.slice('v1=hmac-sha256,'.length);
        assert.equal(verifyDetectionSignature({ rawBody, headers: detectionHeaders(both, v.timestamp_ms), detectionKey: v.detection_key, nowMs: v.now_ms_valid }).ok, true);
    });
});

describe('Twilio signature vectors', () => {
    const v = twilioVectors;

    it('verifies the signature for url, params and auth token', () => {
        assert.equal(twilioSignature({ url: v.url, params: v.params, authToken: v.auth_token }), v.signature);
        assert.equal(verifyTwilioSignature({ url: v.url, params: v.params, signature: v.signature, authToken: v.auth_token }), true);
    });

    it('fails for tampered params, a different URL, another token and a missing header', () => {
        assert.equal(verifyTwilioSignature({ url: v.url, params: v.tampered_params, signature: v.signature, authToken: v.auth_token }), false);
        assert.equal(verifyTwilioSignature({ url: v.url.replace('/twilio/status', '/twilio/voice'), params: v.params, signature: v.signature, authToken: v.auth_token }), false);
        assert.equal(verifyTwilioSignature({ url: v.url, params: v.params, signature: v.signature_from_other_token, authToken: v.auth_token }), false);
        assert.equal(verifyTwilioSignature({ url: v.url, params: v.params, signature: undefined, authToken: v.auth_token }), false);
        assert.equal(verifyTwilioSignature({ url: v.url, params: v.params, signature: '', authToken: v.auth_token }), false);
    });

    it('takes every value of a repeated name, in the order received', () => {
        const pairs = [['b', '2'], ['a', 'x'], ['a', 'y']];
        const expected = createHmac('sha1', v.auth_token).update(v.url + 'ax' + 'ay' + 'b2').digest('base64');
        assert.equal(twilioSignature({ url: v.url, params: pairs, authToken: v.auth_token }), expected);
        assert.notEqual(twilioSignature({ url: v.url, params: [['a', 'y'], ['a', 'x'], ['b', '2']], authToken: v.auth_token }), expected);
    });
});

describe('detect-twilio settings', () => {
    it('reads a complete set of settings with the defaults', () => {
        const s = detectSettingsFromEnv(settingsEnv({ DC_PUBLIC_URL: PUBLIC_URL + '/' }));
        assert.equal(s.publicUrl, PUBLIC_URL);
        assert.equal(s.detectionUrl, 'wss://detect.dropcowboy.com/carrier/ws/twilio');
        assert.equal(s.strategy, 'standard');
        assert.equal(s.detectionTimeoutSec, 45);
        assert.equal(s.liveConfidence, 0.6);
        assert.equal(s.beepWaitSeconds, 20);
        assert.equal(s.ringSeconds, 30);
        assert.equal(s.waitSeconds, 180);
        assert.equal(s.port, 3000);
        assert.equal(s.twilioBaseUrl, 'https://api.twilio.com');
        assert.deepEqual(s.voicemailMessage, { kind: 'play', value: VM_AUDIO_URL });
        assert.deepEqual(s.liveMessage, s.voicemailMessage);
        assert.equal(s.liveFallsBackToVoicemail, true);
    });

    it('names each required setting that is missing', () => {
        const names = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_FROM', 'DC_TO', 'DC_PUBLIC_URL'];
        for (const name of names) {
            const env = settingsEnv();
            delete env[name];
            assert.ok(problemsOf(env).some((p) => p.startsWith(name + ' is not set.')), name);
        }
    });

    it('needs a voicemail message, and prefers audio over text', () => {
        assert.ok(problemsOf(settingsEnv({ DC_VM_AUDIO_URL: '' })).some((p) => p.includes('DC_VM_AUDIO_URL') && p.includes('DC_VM_TEXT')));
        const s = detectSettingsFromEnv(settingsEnv({ DC_VM_TEXT: 'Hi, this is Example Dental.' }));
        assert.equal(s.voicemailMessage.kind, 'play');
        const text = detectSettingsFromEnv(settingsEnv({ DC_VM_AUDIO_URL: '', DC_VM_TEXT: 'Hi, this is Example Dental.' }));
        assert.deepEqual(text.voicemailMessage, { kind: 'say', value: 'Hi, this is Example Dental.' });
    });

    it('needs a Detection key or an API key pair, naming both options', () => {
        const problems = problemsOf(settingsEnv({ DC_DETECTION_KEY: '' }));
        assert.ok(problems.some((p) => p.includes('DC_DETECTION_KEY') && p.includes('DC_KEY and DC_SECRET')));
        assert.ok(problemsOf(settingsEnv({ DC_DETECTION_KEY: '', DC_KEY: 'k' })).some((p) => p.includes('DC_DETECTION_KEY')));
        assert.deepEqual(problemsOf(settingsEnv({ DC_DETECTION_KEY: '', DC_KEY: 'k', DC_SECRET: 's' })), []);
    });

    it('refuses every unusable DC_PUBLIC_URL', () => {
        const bad = [
            'http://tunnel.example.org',
            'https://tunnel.example.org:8443',
            'https://tunnel.example.org/?x=1',
            'https://tunnel.example.org/#top',
            'https://localhost',
            'https://printer.local',
            'https://10.0.0.5',
            'https://172.16.4.2',
            'https://192.168.1.20',
            'https://127.0.0.1',
            'https://169.254.169.254',
            'https://[::1]',
            'https://[fe80::1]',
            'https://[fd00::1]',
            'tunnel.example.org'
        ];
        for (const url of bad) {
            assert.ok(problemsOf(settingsEnv({ DC_PUBLIC_URL: url })).some((p) => p.startsWith('DC_PUBLIC_URL=')), url);
        }
        assert.deepEqual(problemsOf(settingsEnv({ DC_PUBLIC_URL: 'https://tunnel.example.org:443' })), []);
        assert.deepEqual(problemsOf(settingsEnv({ DC_PUBLIC_URL: 'https://203.0.113.10/prefix/' })), []);
    });

    it('refuses numbers that are not E.164 and a malformed Account SID', () => {
        const problems = problemsOf(settingsEnv({ DC_TO: '3125550142', TWILIO_FROM: '+1312', TWILIO_ACCOUNT_SID: 'AC123' }));
        assert.ok(problems.some((p) => p.startsWith('DC_TO must be in E.164')));
        assert.ok(problems.some((p) => p.startsWith('TWILIO_FROM must be in E.164')));
        assert.ok(problems.some((p) => p.startsWith('TWILIO_ACCOUNT_SID must be AC followed by 32')));
    });

    it('refuses the all-zero placeholder SID from the fixtures', () => {
        const sid = 'AC00000000000000000000000000000000';
        assert.deepEqual(problemsOf(settingsEnv({ TWILIO_ACCOUNT_SID: sid })), ['TWILIO_ACCOUNT_SID=' + sid + ': this is the placeholder from our fixtures; use your own.']);
    });

    it('refuses DC_WAIT_SECONDS=0 because the recipe has to listen', () => {
        assert.ok(problemsOf(settingsEnv({ DC_WAIT_SECONDS: '0' })).some((p) => p.startsWith('DC_WAIT_SECONDS=0 does not work')));
    });

    it('checks the ranges, the strategy, the audio URLs, the text length and DC_DETECTION_URL', () => {
        const problems = problemsOf(settingsEnv({
            DC_DETECTION_TIMEOUT_SEC: '4',
            DC_LIVE_CONFIDENCE: '1.5',
            DC_BEEP_WAIT_SECONDS: '61',
            DC_RING_SECONDS: 'ten',
            DC_WAIT_SECONDS: '601',
            DC_DETECTION_STRATEGY: 'fast',
            DC_LIVE_AUDIO_URL: 'http://audio.example.org/live.mp3',
            DC_VM_AUDIO_URL: 'https://audio.example.org/voicemail.ogg',
            DC_LIVE_TEXT: 'x'.repeat(1001),
            DC_DETECTION_URL: 'https://detect.example.org'
        }));
        for (const start of ['DC_DETECTION_TIMEOUT_SEC', 'DC_LIVE_CONFIDENCE', 'DC_BEEP_WAIT_SECONDS', 'DC_RING_SECONDS', 'DC_WAIT_SECONDS', 'DC_DETECTION_STRATEGY', 'DC_LIVE_AUDIO_URL', 'DC_VM_AUDIO_URL', 'DC_LIVE_TEXT', 'DC_DETECTION_URL']) {
            assert.ok(problems.some((p) => p.startsWith(start)), start);
        }
        assert.ok(problems.includes('DC_LIVE_CONFIDENCE must be a number from 0 to 1 (default 0.6).'));
        assert.equal(detectSettingsFromEnv(settingsEnv({ DC_VM_AUDIO_URL: 'https://audio.example.org/VM.WAV' })).voicemailMessage.value, 'https://audio.example.org/VM.WAV');
    });

    it('matches the strategy exactly, in lowercase', () => {
        for (const strategy of ['Standard', 'BEEP_ONLY', 'live-check']) {
            assert.deepEqual(problemsOf(settingsEnv({ DC_DETECTION_STRATEGY: strategy })), ['DC_DETECTION_STRATEGY must be one of standard, beep_only, live_check (default standard).'], strategy);
        }
        assert.equal(detectSettingsFromEnv(settingsEnv({ DC_DETECTION_STRATEGY: 'beep_only' })).strategy, 'beep_only');
    });

    it('lists the sample-value and zero-SID problems after the validation problems', () => {
        const problems = problemsOf(settingsEnv({ DC_TO: '555', TWILIO_FROM: '+12125550100', TWILIO_ACCOUNT_SID: 'AC00000000000000000000000000000000' }));
        assert.deepEqual(problems, [
            'DC_TO must be in E.164 format: a plus sign, then 8 to 15 digits with the country code (for example +13125550142).',
            'TWILIO_FROM=+12125550100: this is a sample value from our docs; use your own.',
            'TWILIO_ACCOUNT_SID=AC00000000000000000000000000000000: this is the placeholder from our fixtures; use your own.'
        ]);
    });

    it('refuses sample values from the docs in DC_ settings and in TWILIO_FROM', () => {
        const problems = problemsOf(settingsEnv({ DC_TO: '+13125550100', TWILIO_FROM: '+12125550100' }));
        assert.ok(problems.includes('DC_TO=+13125550100: this is a sample value from our docs; use your own.'));
        assert.ok(problems.includes('TWILIO_FROM=+12125550100: this is a sample value from our docs; use your own.'));
    });

    it('lists every problem at once, in order', () => {
        const problems = problemsOf({ DC_TO: 'nope', DC_WAIT_SECONDS: '0', TWILIO_ACCOUNT_SID: 'AC00000000000000000000000000000000' });
        const firstRequired = problems.findIndex((p) => p.startsWith('TWILIO_AUTH_TOKEN is not set'));
        const e164 = problems.findIndex((p) => p.startsWith('DC_TO must be in E.164'));
        const wait = problems.findIndex((p) => p.startsWith('DC_WAIT_SECONDS=0'));
        const zero = problems.findIndex((p) => p.includes('placeholder from our fixtures'));
        assert.ok(firstRequired >= 0 && firstRequired < e164 && e164 < wait && wait < zero, problems.join('\n'));
    });
});

describe('TwiML', () => {
    const base = { detectionUrl: 'wss://detect.dropcowboy.com/carrier/ws/twilio', detectionKey: DETECTION_KEY, publicUrl: PUBLIC_URL, strategy: 'standard', callId: 'fa6de30e-9e3a-40c4-97fc-1fdad5f21338', detectionTimeoutSec: 45, beepWaitSeconds: 20 };

    it('forks the audio to Detection and pauses while it listens', () => {
        assert.equal(streamTwiml(base), [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<Response>',
            '  <Start>',
            '    <Stream name="detection" url="wss://detect.dropcowboy.com/carrier/ws/twilio" track="inbound_track">',
            '      <Parameter name="api_key" value="' + DETECTION_KEY + '"/>',
            '      <Parameter name="webhook_url" value="https://tunnel.example.org/webhooks/detection"/>',
            '      <Parameter name="webhook_events" value="detection,beep,screening,timeout,error,close"/>',
            '      <Parameter name="strategy" value="standard"/>',
            '      <Parameter name="call_id" value="fa6de30e-9e3a-40c4-97fc-1fdad5f21338"/>',
            '      <Parameter name="detection_timeout_sec" value="45"/>',
            '    </Stream>',
            '  </Start>',
            '  <Pause length="75"/>',
            '  <Hangup/>',
            '</Response>'
        ].join('\n'));
    });

    it('escapes attribute values', () => {
        const twiml = streamTwiml(Object.assign({}, base, { detectionKey: 'a&b<c>"d\'e', publicUrl: 'https://tunnel.example.org/a&b' }));
        assert.ok(twiml.includes('<Parameter name="api_key" value="a&amp;b&lt;c&gt;&quot;d&apos;e"/>'));
        assert.ok(twiml.includes('value="https://tunnel.example.org/a&amp;b/webhooks/detection"'));
        assert.equal(xmlEscape('&<>"\''), '&amp;&lt;&gt;&quot;&apos;');
    });

    it('plays audio or speaks text, after stopping the stream', () => {
        assert.equal(messageTwiml({ kind: 'play', value: 'https://audio.example.org/vm.mp3?a=1&b=2' }),
            '<Response><Stop><Stream name="detection"/></Stop><Play>https://audio.example.org/vm.mp3?a=1&amp;b=2</Play><Hangup/></Response>');
        assert.equal(messageTwiml({ kind: 'say', value: 'Hi, this is Example Dental <and> "friends".' }),
            '<Response><Stop><Stream name="detection"/></Stop><Say>Hi, this is Example Dental &lt;and&gt; &quot;friends&quot;.</Say><Hangup/></Response>');
    });
});

describe('Calls.json form', () => {
    it('has exactly the fields of the contract, with four StatusCallbackEvent values and no MachineDetection', () => {
        const form = callForm({ to: TWILIO_TO, from: TWILIO_FROM, publicUrl: PUBLIC_URL, ringSeconds: 30 });
        assert.deepEqual(form, [
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
            ['Timeout', '30']
        ]);
    });
});

describe('call decisions', () => {
    function decision(liveConfidence = 0.6) {
        return new CallDecision({ liveConfidence });
    }
    const beep = fixtureJson('detection.beep.json');
    const voicemail = fixtureJson('detection.voicemail.json');
    const live = fixtureJson('detection.live-person.json');

    function withData(body, data) {
        return Object.assign({}, body, { data: Object.assign({}, body.data, data) });
    }

    it('plays the voicemail message on a beep, with or without a voicemail verdict first', () => {
        const d = decision();
        assert.deepEqual(d.onDetection(beep).action, { kind: 'play', message: 'voicemail' });
        assert.equal(d.outcome, OUTCOMES.voicemailOnBeep);
        const after = decision();
        assert.equal(after.onDetection(voicemail).startBeepTimer, true);
        assert.deepEqual(after.onDetection(beep).action, { kind: 'play', message: 'voicemail' });
    });

    it('uses the verdict types Detection sends', () => {
        assert.equal(live.data.type, 'speech.human.unknown');
        assert.equal(voicemail.data.type, 'speech.voicemail.greeting');
        assert.equal(VERDICTS.humanPrefix, 'speech.human.');
    });

    it('acts on speech.human.unknown at or above DC_LIVE_CONFIDENCE only', () => {
        assert.deepEqual(decision(0.7).onDetection(withData(live, { confidence: 0.7 })).action, { kind: 'play', message: 'live' });
        assert.deepEqual(decision(0.7).onDetection(withData(live, { confidence: 0.95 })).action, { kind: 'play', message: 'live' });
        const at = decision();
        assert.deepEqual(at.onDetection(live).action, { kind: 'play', message: 'live' });
        assert.equal(at.outcome, OUTCOMES.livePerson);
        const below = decision(0.7);
        const step = below.onDetection(withData(live, { confidence: 0.69 }));
        assert.equal(step.action, null);
        assert.equal(below.acted, false);
        assert.ok(step.lines.includes('  Below DC_LIVE_CONFIDENCE=0.7, so not acted on.'));
    });

    it('acts on another speech.human. subtype, and not on the bare word live_person', () => {
        const adult = decision();
        assert.deepEqual(adult.onDetection(withData(live, { type: 'speech.human.adult', confidence: 0.8 })).action, { kind: 'play', message: 'live' });
        assert.equal(adult.outcome, OUTCOMES.livePerson);
        const bare = decision();
        assert.equal(bare.onDetection(withData(live, { type: 'live_person', confidence: 0.99 })).action, null);
        assert.equal(bare.acted, false);
    });

    it('starts the beep timer once on speech.voicemail.greeting, and plays when it runs out', () => {
        const d = decision();
        assert.equal(d.onDetection(voicemail).startBeepTimer, true);
        assert.equal(d.onDetection(voicemail).startBeepTimer, false);
        assert.deepEqual(d.onBeepTimeout().action, { kind: 'play', message: 'voicemail' });
        assert.equal(d.outcome, OUTCOMES.voicemailNoBeep);
        for (const type of ['voicemail', 'speech.voicemail']) {
            assert.equal(decision().onDetection(withData(voicemail, { type })).startBeepTimer, false, type);
        }
    });

    it('hangs up when the mailbox cannot take a message', () => {
        for (const type of ['speech.voicemail.full', 'speech.voicemail.not_setup']) {
            const d = decision();
            const step = d.onDetection(withData(voicemail, { type }));
            assert.deepEqual(step.action, { kind: 'hangup' }, type);
            assert.equal(d.outcome, OUTCOMES.voicemailUnavailable);
            assert.equal(OUTCOMES.voicemailUnavailable, 'voicemail_unavailable');
            assert.ok(step.lines.includes('The mailbox cannot take a message (' + type + '), so the call is hung up.'), type);
        }
    });

    it('prints and takes no action on the other verdicts', () => {
        for (const type of ['speech.ivr', 'speech.screening', 'speech.carrier.intercept', 'speech.unknown', 'silence', 'machine', undefined]) {
            const d = decision();
            const step = d.onDetection(withData(voicemail, { type }));
            assert.equal(step.action, null, String(type));
            assert.equal(step.startBeepTimer, false, String(type));
            assert.equal(d.acted, false, String(type));
            assert.ok(step.lines[0].startsWith('Detection verdict: type='), String(type));
        }
    });

    it('hangs up on speech.silence, timeout and a non-recoverable error, and not on a recoverable one', () => {
        const silence = decision();
        assert.deepEqual(silence.onDetection(withData(voicemail, { type: 'speech.silence' })).action, { kind: 'hangup' });
        assert.equal(silence.outcome, OUTCOMES.noAnswerDetected);
        const timeout = decision();
        assert.deepEqual(timeout.onDetection({ event: 'timeout', data: { timestamp_ms: 45000 } }).action, { kind: 'hangup' });
        assert.equal(timeout.outcome, OUTCOMES.noAnswerDetected);
        const fatal = decision();
        const step = fatal.onDetection({ event: 'error', data: { code: 'stream_error', error: 'Audio stopped', recoverable: false } });
        assert.deepEqual(step.action, { kind: 'hangup' });
        assert.equal(fatal.outcome, OUTCOMES.detectionError);
        assert.ok(step.lines[0].includes('code=stream_error'));
        const recoverable = decision();
        assert.equal(recoverable.onDetection({ event: 'error', data: { code: 'slow_audio', error: 'Late frames', recoverable: true } }).action, null);
        assert.equal(recoverable.acted, false);
    });

    it('prints screening and close and takes no action', () => {
        const d = decision();
        const screening = d.onDetection({ event: 'screening', data: { screening_type: 'call_screen', suggested_action: 'speak', suggested_dtmf: '1' } });
        assert.equal(screening.action, null);
        assert.ok(screening.lines[0].includes('screening_type=call_screen'));
        assert.equal(d.onDetection(fixtureJson('detection.close.json')).action, null);
        assert.equal(d.acted, false);
    });

    it('acts once, whatever arrives after', () => {
        const d = decision();
        assert.notEqual(d.onDetection(beep).action, null);
        assert.equal(d.onDetection(live).action, null);
        assert.equal(d.onBeepTimeout().action, null);
        assert.equal(d.onDetection({ event: 'timeout', data: {} }).action, null);
        assert.equal(d.outcome, OUTCOMES.voicemailOnBeep);
    });

    it('ends without an action on busy, no-answer, failed, canceled or completed', () => {
        for (const status of ['busy', 'no-answer', 'failed', 'canceled']) {
            const d = decision();
            d.onStatus({ status: 'ringing' });
            assert.equal(d.finished, false);
            assert.equal(d.onStatus({ status }).action, null);
            assert.equal(d.finished, true);
            assert.equal(d.outcome, OUTCOMES.notAnswered);
        }
        const completed = decision();
        completed.onStatus({ status: 'completed', duration: '21' });
        assert.equal(completed.outcome, OUTCOMES.endedBeforeAction);
        assert.equal(completed.callDuration, '21');
    });
});

describe('Twilio client', () => {
    it('prints a hint for the common error codes', () => {
        for (const code of [21210, 21212, 21215, 21219, 20003]) {
            assert.ok(twilioHint(code));
        }
        assert.equal(twilioHint(21220), null);
    });

    it('sends Basic auth and form fields, never retries a POST, and redacts the SID and token in errors', async () => {
        const path = '/2010-04-01/Accounts/' + ACCOUNT_SID + '/Calls.json';
        const mock = await startMockApi({
            ['POST ' + path]: twilioError(400, 21210, 'The source phone number provided, ' + TWILIO_FROM + ', is not yet verified for your account ' + ACCOUNT_SID + ' (' + AUTH_TOKEN + ').')
        });
        try {
            const client = new TwilioClient({ accountSid: ACCOUNT_SID, authToken: AUTH_TOKEN, baseUrl: mock.url });
            await assert.rejects(client.createCall([['To', TWILIO_TO], ['StatusCallbackEvent', 'initiated'], ['StatusCallbackEvent', 'ringing']]), function (err) {
                assert.equal(err.status, 400);
                assert.equal(err.code, 21210);
                assert.ok(!err.message.includes(ACCOUNT_SID));
                assert.ok(!err.message.includes(AUTH_TOKEN));
                assert.ok(err.message.includes('AC...0001'));
                return true;
            });
            assert.equal(mock.requests.length, 1);
            const request = mock.requests[0];
            assert.equal(request.headers.authorization, 'Basic ' + Buffer.from(ACCOUNT_SID + ':' + AUTH_TOKEN).toString('base64'));
            assert.equal(request.headers['content-type'], 'application/x-www-form-urlencoded');
            assert.equal(request.headers.accept, 'application/json');
            assert.equal(request.rawBody, 'To=%2B13125550142&StatusCallbackEvent=initiated&StatusCallbackEvent=ringing');
        } finally {
            await mock.close();
        }
    });

    it('retries a GET on 5xx and URL-encodes the plus sign', async () => {
        const path = '/2010-04-01/Accounts/' + ACCOUNT_SID + '/IncomingPhoneNumbers.json';
        const mock = await startMockApi({
            ['GET ' + path]: [twilioError(503, 20500, 'Service unavailable'), { status: 200, body: { incoming_phone_numbers: [] } }]
        });
        try {
            const client = new TwilioClient({ accountSid: ACCOUNT_SID, authToken: AUTH_TOKEN, baseUrl: mock.url, sleep: () => Promise.resolve() });
            assert.deepEqual(await client.listIncomingNumbers(TWILIO_FROM), { incoming_phone_numbers: [] });
            assert.equal(mock.requests.length, 2);
            assert.equal(mock.requests[0].query.PhoneNumber, TWILIO_FROM);
        } finally {
            await mock.close();
        }
    });
});
