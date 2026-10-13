// Plays Twilio and Detection for the detect-twilio tests: canned Twilio REST
// answers for the mock server, and signed requests to the recipe's receiver
// built from the fixtures.

import { randomUUID } from 'node:crypto';
import { EventEmitter } from 'node:events';
import { detectionSignatureFor } from '../src/lib/detection.js';
import { twilioSignature } from '../src/lib/twilio.js';
import { KEY, SECRET, fixtureJson, receiverPortFrom, waitUntil } from './helpers.js';
import { ok } from './routes.js';

const twilioVectors = fixtureJson('twilio-signature-vectors.json');
const detectionVectors = fixtureJson('detection-signature-vectors.json');

// The fixtures' all-zero Account SID is refused as a placeholder, so the
// settings use the same placeholder ending in 1, like the CallSid.
const ACCOUNT_SID = 'AC00000000000000000000000000000001';
const CALL_SID = fixtureJson('twilio.status-completed.json').CallSid;
const AUTH_TOKEN = twilioVectors.auth_token;
const DETECTION_KEY = detectionVectors.detection_key;
const PUBLIC_URL = 'https://tunnel.example.org';
const TWILIO_FROM = '+13125550147';
const TWILIO_TO = '+13125550142';
const VM_AUDIO_URL = 'https://audio.example.org/voicemail.mp3';
const ACCOUNT_PATH = '/2010-04-01/Accounts/' + ACCOUNT_SID;
const CALLS_PATH = ACCOUNT_PATH + '/Calls.json';
const CALL_PATH = ACCOUNT_PATH + '/Calls/' + CALL_SID + '.json';
const TEMP_KEY_ID = '5c2e8a4f-1d7b-4e93-b6a0-8f3d1c5e7a29';
const TEMP_API_KEY = 'test-temporary-detection-key-not-real-7e21';
const LEFTOVER_KEY_ID = '7a1d3f5b-9c2e-4b84-a6d0-2e4f6a8c0b13';
const KEYS_PATH = '/register/public/detection-keys';

function twilioError(status, code, message) {
    return { status, body: { code, message, more_info: 'https://www.twilio.com/docs/errors/' + code, status } };
}

function twilioRoutes(overrides = {}) {
    return Object.assign({
        ['GET ' + ACCOUNT_PATH + '.json']: { status: 200, body: { sid: ACCOUNT_SID, type: 'Full', status: 'active' } },
        ['GET ' + ACCOUNT_PATH + '/IncomingPhoneNumbers.json']: { status: 200, body: { incoming_phone_numbers: [{ phone_number: TWILIO_FROM }] } },
        ['GET ' + ACCOUNT_PATH + '/OutgoingCallerIds.json']: { status: 200, body: { outgoing_caller_ids: [] } },
        ['POST ' + CALLS_PATH]: { status: 201, body: { sid: CALL_SID, status: 'queued' } },
        ['POST ' + CALL_PATH]: { status: 200, body: { sid: CALL_SID, status: 'in-progress' } }
    }, overrides);
}

function detectionKeyRoutes(overrides = {}) {
    return Object.assign({
        ['GET ' + KEYS_PATH]: ok([
            { key_id: LEFTOVER_KEY_ID, name: 'Twilio detection recipe (temporary)', key_hint: '9f0c', status: 'active' },
            { key_id: '2b4d6f8a-0c1e-4a35-9b7d-1f3a5c7e9d02', name: 'Media server', key_hint: '0001', status: 'active' }
        ]),
        ['DELETE ' + KEYS_PATH + '/' + LEFTOVER_KEY_ID]: ok({ key_id: LEFTOVER_KEY_ID, revoked: true }),
        ['POST ' + KEYS_PATH]: ok({ key_id: TEMP_KEY_ID, name: 'Twilio detection recipe (temporary)', api_key: TEMP_API_KEY, key_hint: '7e21', expires_at: 1774045200000 }, 201),
        ['DELETE ' + KEYS_PATH + '/' + TEMP_KEY_ID]: ok({ key_id: TEMP_KEY_ID, revoked: true })
    }, overrides);
}

// Settings for a run against the two mocks. withApiKey: no DC_DETECTION_KEY,
// so the recipe makes a temporary key with DC_KEY and DC_SECRET.
function detectEnv({ twilio, dc = null, withApiKey = false }, extra = {}) {
    const env = {
        TWILIO_ACCOUNT_SID: ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: AUTH_TOKEN,
        TWILIO_FROM,
        TWILIO_BASE_URL: twilio.url,
        DC_TO: TWILIO_TO,
        DC_PUBLIC_URL: PUBLIC_URL,
        DC_VM_AUDIO_URL: VM_AUDIO_URL,
        DC_WAIT_SECONDS: '600',
        PORT: '0'
    };
    if (withApiKey) {
        env.DC_KEY = KEY;
        env.DC_SECRET = SECRET;
        env.DC_BASE_URL = dc.url;
    } else {
        env.DC_DETECTION_KEY = DETECTION_KEY;
        if (dc) {
            env.DC_BASE_URL = dc.url;
        }
    }
    return Object.assign(env, extra);
}

function formOf(request) {
    return Array.from(new URLSearchParams(request.rawBody).entries());
}

// POSTs form fields to the receiver, signed for DC_PUBLIC_URL + route.
function postTwilio({ port, route, params, authToken = AUTH_TOKEN, signature }) {
    const pairs = Array.isArray(params) ? params : Object.entries(params);
    const header = signature === undefined ? twilioSignature({ url: PUBLIC_URL + route, params: pairs, authToken }) : signature;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (header !== null) {
        headers['X-Twilio-Signature'] = header;
    }
    return fetch('http://127.0.0.1:' + port + route, { method: 'POST', headers, body: new URLSearchParams(pairs).toString() });
}

// A Detection webhook body from a fixture, with this run's call_id and a fresh
// delivery_id unless overrides say otherwise.
function detectionBody(fixtureName, { callId, deliveryId, data } = {}) {
    const body = fixtureJson(fixtureName);
    body.delivery_id = deliveryId || randomUUID();
    if (callId) {
        body.call_id = callId;
    }
    if (data) {
        body.data = Object.assign(body.data, data);
    }
    return body;
}

function postDetection({ port, body, key = DETECTION_KEY, timestampMs = String(Date.now()), headers = {} }) {
    const rawBody = typeof body === 'string' ? body : JSON.stringify(body);
    const signed = { 'Content-Type': 'application/json', 'X-Signature': detectionSignatureFor({ detectionKey: key, timestamp: timestampMs, rawBody }), 'X-Timestamp': timestampMs };
    return fetch('http://127.0.0.1:' + port + '/webhooks/detection', { method: 'POST', headers: Object.assign(signed, headers), body: rawBody });
}

function callIdFrom(out) {
    const line = out.lines.find(function (l) {
        return l.startsWith('call_id: ');
    });
    return line ? line.slice('call_id: '.length) : null;
}

// Starts the recipe and waits until it has created the call. Returns the
// running promise and helpers that play Twilio and Detection for this call.
// detectionKey signs the Detection webhooks: the temporary key when the run
// creates one.
async function startCall({ run, env, out, twilio, msPerSecond = 10, signals = new EventEmitter(), detectionKey = DETECTION_KEY }) {
    const running = run({
        env,
        out,
        signals,
        msPerSecond,
        healthUrl: function (port) {
            return 'http://127.0.0.1:' + port + '/health';
        }
    });
    // Surface an early failure instead of a timeout in waitUntil.
    let failed = null;
    running.catch(function (err) {
        failed = err;
    });
    const port = await waitUntil(() => {
        if (failed) {
            throw failed;
        }
        return receiverPortFrom(out);
    }, 'the receiver to start');
    await waitUntil(() => {
        if (failed) {
            throw failed;
        }
        return twilio.find('POST', CALLS_PATH)[0];
    }, 'POST Calls.json');
    await waitUntil(() => out.lines.some((l) => l.startsWith('Call created:')), 'the call to be recorded');
    const callId = callIdFrom(out);

    return {
        running,
        port,
        callId,
        signals,
        answer() {
            return postTwilio({ port, route: '/twilio/voice', params: { AccountSid: ACCOUNT_SID, CallSid: CALL_SID, CallStatus: 'in-progress' } });
        },
        status(callStatus, extra = {}) {
            const params = Object.assign(fixtureJson('twilio.status-completed.json'), { CallStatus: callStatus }, extra);
            if (callStatus !== 'completed' && extra.CallDuration === undefined) {
                delete params.CallDuration;
            }
            return postTwilio({ port, route: '/twilio/status', params });
        },
        detection(fixtureName, options = {}) {
            return postDetection({ port, body: detectionBody(fixtureName, Object.assign({ callId }, options)), key: detectionKey });
        },
        updates() {
            return twilio.find('POST', CALL_PATH);
        }
    };
}

export {
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
    callIdFrom,
    detectEnv,
    detectionBody,
    detectionKeyRoutes,
    formOf,
    postDetection,
    postTwilio,
    startCall,
    twilioError,
    twilioRoutes
};
