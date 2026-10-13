'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const { CALL_SID, TOKEN, loadFunction, webhookContext, envelope, run } = require('./helpers');

const handler = loadFunction('detection-webhook.js');

async function quietly(fn) {
    const log = console.log;
    const error = console.error;
    const lines = [];
    console.log = (line) => lines.push(String(line));
    console.error = (line) => lines.push(String(line));
    try {
        return { value: await fn(), lines };
    } finally {
        console.log = log;
        console.error = error;
    }
}

async function deliver(event, overrides) {
    const { context, state } = webhookContext(overrides);
    const { value: response, lines } = await quietly(() => run(handler, context, event));
    return { response, state, lines };
}

function loadPatched(replacements) {
    const file = path.join(__dirname, '..', 'functions', 'detection-webhook.js');
    let source = fs.readFileSync(file, 'utf8');
    for (const [from, to] of replacements) {
        assert.ok(source.includes(from), 'the function no longer contains: ' + from);
        source = source.replace(from, to);
    }
    const patched = new Module(file, module);
    patched.filename = file;
    patched.paths = Module._nodeModulePaths(path.dirname(file));
    patched._compile(source, file);
    return patched.exports.handler;
}

test('leaves the message on the beep and hangs up', async () => {
    const { response, state } = await deliver(envelope('beep', { confidence: 0.94 }));
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { received: true });
    assert.equal(state.updates.length, 1);
    assert.equal(state.updates[0].sid, CALL_SID);
    assert.equal(
        state.updates[0].twiml,
        '<?xml version="1.0" encoding="UTF-8"?><Response><Stop><Stream name="detection"/></Stop><Play>https://media.example.com/voicemail.mp3</Play><Hangup/></Response>'
    );
});

test('speaks the text when no audio file is set', async () => {
    const { state } = await deliver(envelope('beep'), { DC_VM_AUDIO_URL: undefined, DC_VM_TEXT: 'Hi, this is Dana & Co.' });
    assert.match(state.updates[0].twiml, /<Say>Hi, this is Dana &amp; Co\.<\/Say><Hangup\/>/);
});

test('answers 200 and leaves the call alone for every other event', async () => {
    const events = [
        envelope('detection', { type: 'speech.voicemail.greeting', confidence: 0.91 }),
        envelope('detection', { type: 'speech.human.unknown', confidence: 0.8 }),
        envelope('screening', {}),
        envelope('timeout', {}),
        envelope('error', { code: 'stream_failed', recoverable: false }),
        envelope('close', { reason: 'call_ended' })
    ];
    for (const event of events) {
        const { response, state } = await deliver(event);
        assert.equal(response.statusCode, 200);
        assert.equal(state.updates.length, 0);
    }
});

test('onEvent runs for every event, with the parsed result', async () => {
    const seen = [];
    global.__seen = seen;
    const custom = loadPatched([[
        "async function onEvent({ result, message, client }) {",
        "async function onEvent({ result, message, client }) {\n    global.__seen.push({ event: result.event, callSid: result.callSid, type: result.data.type, id: result.deliveryId });"
    ]]);
    try {
        const { context } = webhookContext();
        await quietly(async () => {
            await run(custom, context, envelope('detection', { type: 'speech.voicemail.greeting', confidence: 0.9 }));
            await run(custom, context, envelope('beep'));
            await run(custom, context, envelope('close'));
        });
        assert.deepEqual(seen.map((item) => item.event), ['detection', 'beep', 'close']);
        assert.equal(seen[0].type, 'speech.voicemail.greeting');
        assert.equal(seen[1].callSid, CALL_SID);
        assert.equal(seen[1].id, 'f956b1e8-1b29-4543-915c-d5364c84852a');
    } finally {
        delete global.__seen;
    }
});

test('a handler that throws, or a failed call update, answers 500', async () => {
    const thrower = loadPatched([[
        "console.log('Detection ' + result.event",
        "if (result.event === 'close') { throw new Error('boom'); }\n    console.log('Detection ' + result.event"
    ]]);
    const { context } = webhookContext();
    const { value: response } = await quietly(() => run(thrower, context, envelope('close')));
    assert.equal(response.statusCode, 500);

    const failing = webhookContext();
    failing.state.failUpdate = Object.assign(new Error('Twilio is down'), { status: 503 });
    const { value: second } = await quietly(() => run(handler, failing.context, envelope('beep')));
    assert.equal(second.statusCode, 500);
});

test('refuses a missing or wrong token with 401 and does nothing', async () => {
    for (const token of [undefined, '', 'wrong', TOKEN + 'x', TOKEN.slice(0, -1)]) {
        const event = envelope('beep');
        if (token === undefined) {
            delete event.token;
        } else {
            event.token = token;
        }
        const { response, state } = await deliver(event);
        assert.equal(response.statusCode, 401);
        assert.equal(state.updates.length, 0);
    }
});

test('refuses an event for another Twilio account with 403', async () => {
    const { response, state } = await deliver(envelope('beep', {}, { twilio_account_sid: 'AC00000000000000000000000000000099' }));
    assert.equal(response.statusCode, 403);
    assert.equal(state.updates.length, 0);
});

test('rejects a body with no event with 400', async () => {
    const event = envelope('beep');
    delete event.event;
    const { response } = await deliver(event);
    assert.equal(response.statusCode, 400);
});

test('falls back to call_id when it is the CallSid', async () => {
    const event = envelope('beep', {}, { call_id: CALL_SID });
    delete event.twilio_call_sid;
    const { state } = await deliver(event);
    assert.equal(state.updates[0].sid, CALL_SID);
});

test('answers 500 and does nothing until the Service is configured', async () => {
    const cases = [
        { DC_DETECTION_WEBHOOK_TOKEN: 'short' },
        { DC_VM_AUDIO_URL: undefined },
        { DC_VM_AUDIO_URL: 'http://media.example.com/voicemail.mp3' },
        { DC_VM_AUDIO_URL: 'https://media.example.com/voicemail.ogg' },
        { DC_VM_AUDIO_URL: undefined, DC_VM_TEXT: 'x'.repeat(1001) }
    ];
    for (const overrides of cases) {
        const { response, state } = await deliver(envelope('beep'), overrides);
        assert.equal(response.statusCode, 500);
        assert.equal(response.body.error, 'not_configured');
        assert.equal(state.updates.length, 0);
    }
});

test('never logs the token', async () => {
    const wrong = await deliver(envelope('beep', {}, { token: 'wrong-token-value-zzz' }));
    assert.doesNotMatch(wrong.lines.join('\n'), /wrong-token-value-zzz/);
    const ok = await deliver(envelope('beep'));
    assert.doesNotMatch(ok.lines.join('\n'), new RegExp(TOKEN));
});
