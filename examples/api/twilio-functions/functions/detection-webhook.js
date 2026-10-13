'use strict';

// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// Detection posts every event of a call to this Function as JSON: detection,
// beep, screening, timeout, error and close. onEvent() below runs for each one.
// Put your own logic there. As written it does one thing: when the beep arrives
// it plays your message on the call and hangs up.
//
// This is a demonstration of receiving an event and responding to it. It is not
// a delivery pipeline. It does not deduplicate the retries Detection sends, does
// not decide what a verdict means, and does not handle a call that has already
// ended. How you build all of that is up to you.
//
// Settings (environment variables, see .env.example):
//   DC_DETECTION_WEBHOOK_TOKEN  required  the same value as for detection-voice.protected.js
//   DC_VM_AUDIO_URL or DC_VM_TEXT  one is required  what plays on the beep
//
// This Function is public, because Detection is not Twilio. The token in its
// URL is what keeps others out. A Function cannot read the raw request body, so
// it cannot check Detection's X-Signature; see the README.

const crypto = require('crypto');

const STREAM_NAME = 'detection';
const CALL_SID = /^CA[0-9a-f]{32}$/i;
const MIN_TOKEN_LENGTH = 24;
const MAX_MESSAGE_CHARACTERS = 1000;

// ---------------------------------------------------------------------------
// YOUR CODE
// ---------------------------------------------------------------------------

// Runs once for every delivery.
//
//   result.event       'detection', 'beep', 'screening', 'timeout', 'error' or 'close'
//   result.data        the event's own fields: for 'detection', data.type and data.confidence
//   result.callSid     the Twilio CallSid, or null when the event names no Twilio call
//   result.deliveryId  the same on every retry of one delivery
//   result.body        the whole JSON body
//   context            your environment variables, and context.getTwilioClient()
//   client             the Twilio client
//
// If this throws, Detection gets a 500 and may send the delivery again.
// Await everything you start: Twilio stops this Function the moment it answers.
async function onEvent({ result, message, client }) {
    console.log('Detection ' + result.event + ' for call ' + result.callSid);

    if (result.event === 'beep') {
        await leaveMessage({ client, callSid: result.callSid, message });
    }
}

// Updates the live call: stops the Detection stream, plays the message, hangs up.
async function leaveMessage({ client, callSid, message }) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.stop().stream({ name: STREAM_NAME });
    if (message.kind === 'play') {
        twiml.play(message.value);
    } else {
        twiml.say(message.value);
    }
    twiml.hangup();
    await client.calls(callSid).update({ twiml: twiml.toString() });
}

// ---------------------------------------------------------------------------
// THE PLUMBING
// ---------------------------------------------------------------------------

exports.handler = function (context, event, callback) {
    handle(context, event)
        .then(function (response) {
            callback(null, response);
        })
        .catch(function (err) {
            console.error('detection-webhook failed: ' + ((err && err.message) || String(err)));
            callback(null, jsonResponse(500, { error: 'server_error' }));
        });
};

async function handle(context, event) {
    const settings = readSettings(context);
    if (settings.problems.length > 0) {
        console.error('detection-webhook is not set up: ' + settings.problems.join(' | '));
        return jsonResponse(500, { error: 'not_configured' });
    }
    if (!tokenMatches(event.token, settings.token)) {
        console.error('Detection webhook refused: the token in the URL is missing or wrong (401)');
        return jsonResponse(401, { error: 'invalid_token' });
    }

    const result = readResult(event);
    if (result === null) {
        return jsonResponse(400, { error: 'invalid_body' });
    }
    const accountSid = text(context.ACCOUNT_SID);
    if (result.accountSid !== null && accountSid !== null && result.accountSid !== accountSid) {
        console.error('Detection webhook refused: it is for another Twilio account (403)');
        return jsonResponse(403, { error: 'account_mismatch' });
    }

    await onEvent({ result, message: settings.message, context, client: context.getTwilioClient() });
    return jsonResponse(200, { received: true });
}

// Twilio hands a Function the parsed body and the URL's query as one object,
// with a "request" key holding the headers. The token comes from the query.
function readResult(event) {
    if (typeof event.event !== 'string' || event.event === '') {
        return null;
    }
    const headers = isObject(event.request) && isObject(event.request.headers) ? event.request.headers : {};
    const body = {};
    const names = Object.keys(event);
    for (let i = 0; i < names.length; i++) {
        if (names[i] !== 'token' && names[i] !== 'request') {
            body[names[i]] = event[names[i]];
        }
    }
    const callSid = [event.twilio_call_sid, event.call_id].find(function (value) {
        return typeof value === 'string' && CALL_SID.test(value);
    });
    return {
        event: event.event,
        callSid: callSid === undefined ? null : callSid,
        accountSid: text(event.twilio_account_sid),
        deliveryId: text(event.delivery_id) || text(headers['x-delivery-id']),
        data: isObject(event.data) ? event.data : {},
        body
    };
}

function readSettings(context) {
    const problems = [];
    const token = text(context.DC_DETECTION_WEBHOOK_TOKEN);
    if (token === null || token.length < MIN_TOKEN_LENGTH) {
        problems.push('DC_DETECTION_WEBHOOK_TOKEN must be at least ' + MIN_TOKEN_LENGTH + ' characters, the same as for detection-voice.');
    }
    const message = readMessage({ audio: context.DC_VM_AUDIO_URL, say: context.DC_VM_TEXT, problems });
    if (message === null && problems.length === 0) {
        problems.push('Set DC_VM_AUDIO_URL (an https:// .mp3 or .wav) or DC_VM_TEXT (text Twilio speaks on the beep).');
    }
    return { problems, token, message };
}

// Audio wins over text. Returns { kind: 'play' | 'say', value } or null.
function readMessage({ audio, say, problems }) {
    const audioUrl = text(audio);
    if (audioUrl !== null) {
        if (!isAudioUrl(audioUrl)) {
            problems.push('DC_VM_AUDIO_URL must be a public https:// address of an .mp3 or .wav file.');
            return null;
        }
        return { kind: 'play', value: audioUrl };
    }
    const sayText = text(say);
    if (sayText !== null) {
        if (Array.from(sayText).length > MAX_MESSAGE_CHARACTERS) {
            problems.push('DC_VM_TEXT is ' + Array.from(sayText).length + ' characters. Keep it to ' + MAX_MESSAGE_CHARACTERS + ' or fewer.');
            return null;
        }
        return { kind: 'say', value: sayText };
    }
    return null;
}

function isAudioUrl(value) {
    let url;
    try {
        url = new URL(value);
    } catch (err) {
        return false;
    }
    return url.protocol === 'https:' && /\.(mp3|wav)$/i.test(url.pathname);
}

// Compares hashes, so neither the contents nor the length of the token shows in
// how long the comparison takes.
function tokenMatches(provided, expected) {
    if (typeof provided !== 'string') {
        return false;
    }
    const a = crypto.createHash('sha256').update(provided).digest();
    const b = crypto.createHash('sha256').update(expected).digest();
    return crypto.timingSafeEqual(a, b);
}

function jsonResponse(status, body) {
    const response = new Twilio.Response();
    response.setStatusCode(status);
    response.appendHeader('Content-Type', 'application/json');
    response.setBody(body);
    return response;
}

function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function text(value) {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}
