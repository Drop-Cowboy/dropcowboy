'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { CALL_SID, TOKEN, loadFunction, run } = require('./helpers');

const handler = loadFunction('detection-voice.protected.js');

function voiceContext(overrides) {
    return Object.assign({
        DOMAIN_NAME: 'detection-1234-dev.twil.io',
        DC_DETECTION_KEY: 'dck-test-key-value',
        DC_DETECTION_WEBHOOK_TOKEN: TOKEN
    }, overrides || {});
}

function parameters(xml) {
    const found = {};
    const pattern = /<Parameter name="([^"]+)" value="([^"]*)"\/>/g;
    let match = pattern.exec(xml);
    while (match !== null) {
        found[match[1]] = match[2];
        match = pattern.exec(xml);
    }
    return found;
}

test('streams the call to Detection and waits in <Pause>', async () => {
    const xml = (await run(handler, voiceContext(), { CallSid: CALL_SID })).toString();
    assert.match(xml, /<Start><Stream name="detection" url="wss:\/\/detect\.dropcowboy\.com\/carrier\/ws\/twilio" track="inbound_track">/);
    assert.match(xml, /<Pause length="75"\/><Hangup\/><\/Response>$/);
    const found = parameters(xml);
    assert.equal(found.api_key, 'dck-test-key-value');
    assert.equal(found.call_id, CALL_SID);
    assert.equal(found.webhook_events, 'detection,beep,screening,timeout,error,close');
});

test('points the webhook at the sibling Function with the token', async () => {
    const xml = (await run(handler, voiceContext(), { CallSid: CALL_SID })).toString();
    assert.equal(parameters(xml).webhook_url, 'https://detection-1234-dev.twil.io/detection-webhook?token=' + TOKEN);
});

test('escapes values it puts in the TwiML', async () => {
    const context = voiceContext({ DC_DETECTION_KEY: 'k"ey&<x>' });
    const xml = (await run(handler, context, { CallSid: CALL_SID })).toString();
    assert.match(xml, /name="api_key" value="k&quot;ey&amp;&lt;x>"/);
});

test('hangs up, and logs why, when a setting is wrong', async () => {
    const cases = [
        [{ DC_DETECTION_KEY: undefined }, /DC_DETECTION_KEY is not set/],
        [{ DC_DETECTION_WEBHOOK_TOKEN: 'short' }, /at least 24 characters/],
        [{ DOMAIN_NAME: 'localhost:3000' }, /public https address/]
    ];
    for (const [overrides, expected] of cases) {
        const logged = [];
        const original = console.error;
        console.error = (line) => logged.push(String(line));
        let xml;
        try {
            xml = (await run(handler, voiceContext(overrides), { CallSid: CALL_SID })).toString();
        } finally {
            console.error = original;
        }
        assert.match(xml, /<Response><Hangup\/><\/Response>/);
        assert.match(logged.join('\n'), expected);
        assert.doesNotMatch(logged.join('\n'), /dck-test-key-value/);
    }
});

test('hangs up when called without a CallSid', async () => {
    const original = console.error;
    console.error = () => {};
    try {
        const xml = (await run(handler, voiceContext(), {})).toString();
        assert.match(xml, /<Response><Hangup\/><\/Response>/);
    } finally {
        console.error = original;
    }
});
