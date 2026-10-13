'use strict';

const path = require('node:path');
const twilio = require('twilio');

const CALL_SID = 'CA00000000000000000000000000000001';
const ACCOUNT_SID = 'AC00000000000000000000000000000000';
const TOKEN = 'test-token-for-the-detection-webhook';

class FakeResponse {
    constructor() {
        this.statusCode = 200;
        this.headers = {};
        this.body = null;
    }

    setStatusCode(code) {
        this.statusCode = code;
    }

    appendHeader(name, value) {
        this.headers[name] = value;
    }

    setBody(body) {
        this.body = body;
    }
}

// What Twilio puts in scope of a Function.
global.Twilio = { twiml: twilio.twiml, Response: FakeResponse };

function loadFunction(name) {
    const file = path.join(__dirname, '..', 'functions', name);
    delete require.cache[require.resolve(file)];
    return require(file).handler;
}

// A Twilio client that records what the Function did to it. Set failUpdate to
// an error to make the call update fail.
function fakeClient() {
    const state = { updates: [], failUpdate: null };
    const client = {
        calls(sid) {
            return {
                async update(params) {
                    if (state.failUpdate) {
                        throw state.failUpdate;
                    }
                    state.updates.push({ sid, twiml: params.twiml });
                    return {};
                }
            };
        }
    };
    return { client, state };
}

function webhookContext(overrides) {
    const fake = fakeClient();
    const context = Object.assign({
        DOMAIN_NAME: 'detection-1234-dev.twil.io',
        ACCOUNT_SID,
        DC_DETECTION_WEBHOOK_TOKEN: TOKEN,
        DC_VM_AUDIO_URL: 'https://media.example.com/voicemail.mp3',
        getTwilioClient: () => fake.client
    }, overrides || {});
    return { context, state: fake.state };
}

function envelope(eventName, data, extra) {
    return Object.assign({
        delivery_id: 'f956b1e8-1b29-4543-915c-d5364c84852a',
        event: eventName,
        emitted_at: '2026-03-20T15:04:06.420Z',
        session_id: '63c83cc6-91ec-4127-88d0-ea109c4c2738',
        call_id: 'fa6de30e-9e3a-40c4-97fc-1fdad5f21338',
        app_id: ACCOUNT_SID,
        source: 'twilio',
        twilio_call_sid: CALL_SID,
        twilio_account_sid: ACCOUNT_SID,
        data: data || {},
        token: TOKEN,
        request: { headers: {}, cookies: {} }
    }, extra || {});
}

function verdict(type, confidence, extra) {
    return envelope('detection', { type, confidence }, extra);
}

function run(handler, context, event) {
    return new Promise((resolve, reject) => {
        handler(context, event, (err, response) => (err ? reject(err) : resolve(response)));
    });
}

module.exports = { CALL_SID, ACCOUNT_SID, TOKEN, loadFunction, webhookContext, envelope, verdict, run, fakeClient };
