'use strict';

// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// Twilio runs this Function when a call is answered. It answers with TwiML that
// sends a copy of the call's audio to Drop Cowboy Detection (<Start><Stream>)
// and keeps the call open in <Pause>. Detection posts its events to
// detection-webhook.js, in the same Twilio Service.
//
// The ".protected" in the file name makes Twilio check X-Twilio-Signature, so
// only Twilio can run it. Point a call at it with the Url of a call, or the
// voice webhook of a number: https://<your-domain>.twil.io/detection-voice
//
// Settings (environment variables, see .env.example):
//   DC_DETECTION_KEY            required  your Detection key
//   DC_DETECTION_WEBHOOK_TOKEN  required  24 or more characters, shared with detection-webhook.js
//
// The Detection key and the token are in the TwiML this Function returns, so
// they show in the Twilio Console request logs. Use a dedicated Detection key
// and revoke it when you stop using it. This Function never logs either value.

const STREAM_NAME = 'detection';
const STREAM_URL = 'wss://detect.dropcowboy.com/carrier/ws/twilio';
const WEBHOOK_PATH = '/detection-webhook';
const WEBHOOK_EVENTS = 'detection,beep,screening,timeout,error,close';
const PAUSE_SECONDS = 75;
const MIN_TOKEN_LENGTH = 24;
const CALL_SID = /^CA[0-9a-f]{32}$/i;

exports.handler = function (context, event, callback) {
    const problems = [];
    const detectionKey = text(context.DC_DETECTION_KEY);
    if (detectionKey === null) {
        problems.push('DC_DETECTION_KEY is not set. Create a Detection key in the dashboard and put it in the Service environment variables.');
    }
    const token = text(context.DC_DETECTION_WEBHOOK_TOKEN);
    if (token === null || token.length < MIN_TOKEN_LENGTH) {
        problems.push('DC_DETECTION_WEBHOOK_TOKEN must be at least ' + MIN_TOKEN_LENGTH + ' characters. Make one with: openssl rand -hex 32');
    }
    const domain = text(context.DOMAIN_NAME);
    if (domain === null || !/^[a-z0-9.-]+$/i.test(domain) || domain.toLowerCase().startsWith('localhost')) {
        problems.push('DOMAIN_NAME is ' + (domain === null ? 'missing' : domain) + '. Detection posts only to a public https address on port 443, so deploy the Service (or run it with --ngrok) before you place a call.');
    }
    if (problems.length > 0) {
        console.error('detection-voice is not set up, so the call is hung up: ' + problems.join(' | '));
        return callback(null, hangupTwiml());
    }
    if (typeof event.CallSid !== 'string' || !CALL_SID.test(event.CallSid)) {
        console.error('detection-voice was called without a CallSid, so the call is hung up. Point a Twilio call at it, not a browser.');
        return callback(null, hangupTwiml());
    }

    const webhookUrl = 'https://' + domain + WEBHOOK_PATH + '?token=' + encodeURIComponent(token);
    const twiml = new Twilio.twiml.VoiceResponse();
    const stream = twiml.start().stream({ name: STREAM_NAME, url: STREAM_URL, track: 'inbound_track' });
    stream.parameter({ name: 'api_key', value: detectionKey });
    stream.parameter({ name: 'webhook_url', value: webhookUrl });
    stream.parameter({ name: 'webhook_events', value: WEBHOOK_EVENTS });
    stream.parameter({ name: 'call_id', value: event.CallSid });
    twiml.pause({ length: PAUSE_SECONDS });
    twiml.hangup();
    return callback(null, twiml);
};

function hangupTwiml() {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.hangup();
    return twiml;
}

function text(value) {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}
