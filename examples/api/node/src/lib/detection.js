// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// The Detection side of the detect-twilio recipe:
//   - the signature check for Detection webhooks,
//   - the TwiML that forks the call audio to Detection, and the TwiML that
//     plays your message,
//   - the two things this recipe does: play a message on the beep, or play a
//     message when a live person speaks. It does nothing else.
//
// Detection webhook headers:
//   X-Signature  v1=hmac-sha256,<hex>  HMAC-SHA256 of <X-Timestamp> + "." + <raw body>,
//                keyed with your Detection key
//   X-Timestamp  Unix milliseconds when the delivery was signed

import { createHmac, timingSafeEqual } from 'node:crypto';
import { printable } from './events.js';
import { REJECTED } from './verify.js';

const TOLERANCE_MS = 300000;
const SIGNATURE_SCHEME = 'v1=hmac-sha256';
const SHA256_HEX = /^[0-9a-f]{64}$/i;
const STREAM_NAME = 'detection';
const WEBHOOK_EVENTS = 'detection,beep,screening,timeout,error,close';
const PAUSE_MARGIN_SECONDS = 10;
const TERMINAL_STATUSES = ['completed', 'busy', 'no-answer', 'failed', 'canceled'];
const NOT_ANSWERED_STATUSES = ['busy', 'no-answer', 'failed', 'canceled'];

const ROUTES = {
    health: '/health',
    voice: '/twilio/voice',
    status: '/twilio/status',
    detection: '/webhooks/detection'
};

// A live person is matched on the verdict prefix, so a new speech.human.*
// subtype still counts.
const VERDICTS = {
    humanPrefix: 'speech.human.'
};

const OUTCOMES = {
    voicemailOnBeep: 'voicemail_on_beep',
    livePerson: 'live_person',
    notAnswered: 'not_answered',
    endedBeforeAction: 'ended_before_action',
    noResult: 'no_result'
};

// headers: lower-case header names, as Node and Express provide them.
// Returns { ok: true } or { ok: false, code } with a code from REJECTED.
function verifyDetectionSignature({ rawBody, headers, detectionKey, nowMs = Date.now() }) {
    const signature = headerValue(headers, 'x-signature');
    const timestamp = headerValue(headers, 'x-timestamp');
    if (signature === null || timestamp === null) {
        return { ok: false, code: REJECTED.missing };
    }
    if (!/^\d+$/.test(timestamp) || Math.abs(nowMs - Number(timestamp)) > TOLERANCE_MS) {
        return { ok: false, code: REJECTED.stale };
    }

    // "v1=hmac-sha256,<hex>[,<hex>...]": the scheme first, then one or more
    // digests. Compare every digest, so the time taken reveals nothing.
    const parts = signature.split(',');
    if (parts[0].trim() !== SIGNATURE_SCHEME || parts.length < 2) {
        return { ok: false, code: REJECTED.invalid };
    }
    const expected = detectionDigest({ detectionKey, timestamp, rawBody });
    let matched = false;
    for (let i = 1; i < parts.length; i++) {
        const hex = parts[i].trim();
        if (SHA256_HEX.test(hex) && timingSafeEqual(Buffer.from(hex, 'hex'), expected)) {
            matched = true;
        }
    }
    return matched ? { ok: true } : { ok: false, code: REJECTED.invalid };
}

function detectionDigest({ detectionKey, timestamp, rawBody }) {
    return createHmac('sha256', detectionKey).update(String(timestamp)).update('.').update(rawBody).digest();
}

// The X-Signature header value Detection sends for this body.
function detectionSignatureFor({ detectionKey, timestamp, rawBody }) {
    return SIGNATURE_SCHEME + ',' + detectionDigest({ detectionKey, timestamp, rawBody }).toString('hex');
}

function xmlEscape(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// The TwiML Twilio runs when the call is answered. <Start> forks the audio to
// Detection and lets the TwiML go on, so the call stays silent in <Pause>
// while Detection listens. <Hangup/> ends a call nobody acted on.
// It holds your Detection key, so it shows in the Twilio Console request logs.
function streamTwiml({ detectionUrl, detectionKey, publicUrl, callId, waitSeconds }) {
    const parameters = [
        ['api_key', detectionKey],
        ['webhook_url', publicUrl + ROUTES.detection],
        ['webhook_events', WEBHOOK_EVENTS],
        ['call_id', callId]
    ];
    const lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<Response>',
        '  <Start>',
        '    <Stream name="' + STREAM_NAME + '" url="' + xmlEscape(detectionUrl) + '" track="inbound_track">'
    ];
    for (let i = 0; i < parameters.length; i++) {
        lines.push('      <Parameter name="' + parameters[i][0] + '" value="' + xmlEscape(parameters[i][1]) + '"/>');
    }
    lines.push(
        '    </Stream>',
        '  </Start>',
        '  <Pause length="' + (waitSeconds + PAUSE_MARGIN_SECONDS) + '"/>',
        '  <Hangup/>',
        '</Response>'
    );
    return lines.join('\n');
}

// Replaces the call's TwiML: stop the stream (which ends the Detection
// session), play or speak the message, hang up.
// message: { kind: 'play', value: url } or { kind: 'say', value: text }.
function messageTwiml(message) {
    const verb = message.kind === 'play' ? 'Play' : 'Say';
    return '<Response><Stop><Stream name="' + STREAM_NAME + '"/></Stop>'
        + '<' + verb + '>' + xmlEscape(message.value) + '</' + verb + '>'
        + '<Hangup/></Response>';
}

// Turns events into at most one action on the call. Each on* method returns
// { action, lines } where action is null or { kind: 'play', message:
// 'voicemail' | 'live' } or { kind: 'hangup' }, and lines are what to print.
// The recipe performs the action; this class never calls anything.
//
// Only two things happen: the beep plays the voicemail message, and a live
// person plays the live message. Every other event is printed and ignored.
class CallDecision {
    constructor() {
        this.acted = false;
        this.outcome = null;
        this.finished = false;
        this.callEnded = false;
        this.lastVerdict = null;
        this.beep = null;
        this.callStatus = null;
        this.callDuration = null;
    }

    get hasTerminalStatus() {
        return TERMINAL_STATUSES.includes(this.callStatus);
    }

    onDetection(body) {
        const event = typeof body.event === 'string' ? body.event : 'unknown';
        const data = body.data !== null && typeof body.data === 'object' && !Array.isArray(body.data) ? body.data : {};
        const lines = [];

        if (event === 'beep') {
            this.beep = { timestamp_ms: data.timestamp_ms, duration_ms: data.duration_ms };
            lines.push('Detection beep: timestamp_ms=' + printable(data.timestamp_ms) + ' duration_ms=' + printable(data.duration_ms));
            return this.#act({ kind: 'play', message: 'voicemail' }, OUTCOMES.voicemailOnBeep, lines);
        }

        if (event === 'detection') {
            this.lastVerdict = { type: data.type, confidence: data.confidence };
            lines.push('Detection verdict: type=' + printable(data.type) + ' confidence=' + printable(data.confidence));
            if (typeof data.type === 'string' && data.type.startsWith(VERDICTS.humanPrefix)) {
                return this.#act({ kind: 'play', message: 'live' }, OUTCOMES.livePerson, lines);
            }
            return { action: null, lines };
        }

        lines.push('Detection event ' + printable(event) + ' (not used by this recipe)');
        return { action: null, lines };
    }

    onStatus({ status, duration }) {
        this.callStatus = status;
        if (duration !== undefined && duration !== null && duration !== '') {
            this.callDuration = duration;
        }
        const lines = ['Twilio call status: ' + printable(status) + (duration ? ' (CallDuration ' + printable(duration) + ')' : '')];
        if (!TERMINAL_STATUSES.includes(status)) {
            return { action: null, lines };
        }
        this.finished = true;
        if (!this.acted) {
            this.outcome = NOT_ANSWERED_STATUSES.includes(status) ? OUTCOMES.notAnswered : OUTCOMES.endedBeforeAction;
        }
        return { action: null, lines };
    }

    onDeadline() {
        return this.#act({ kind: 'hangup' }, OUTCOMES.noResult, []);
    }

    // Twilio said the call is already over when the recipe tried to update it.
    markCallEnded() {
        this.callEnded = true;
        this.finished = true;
    }

    #act(action, outcome, lines) {
        if (this.acted || this.finished) {
            if (this.acted) {
                lines.push('  Already acted on this call (' + this.outcome + '), so no new action.');
            }
            return { action: null, lines };
        }
        this.acted = true;
        this.outcome = outcome;
        return { action, lines };
    }
}

function headerValue(headers, name) {
    const value = headers ? headers[name] : undefined;
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }
    return value.trim();
}

export {
    CallDecision,
    OUTCOMES,
    ROUTES,
    SIGNATURE_SCHEME,
    TERMINAL_STATUSES,
    TOLERANCE_MS,
    VERDICTS,
    WEBHOOK_EVENTS,
    detectionSignatureFor,
    messageTwiml,
    streamTwiml,
    verifyDetectionSignature,
    xmlEscape
};
