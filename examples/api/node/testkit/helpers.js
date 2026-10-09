// Shared helpers for the tests: captured output, fixtures, ids and polling.

import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';

const FIXTURES = new URL('../../fixtures/', import.meta.url);

const KEY = '7f3c9a1e-5b2d-4e8f-a6c4-9d1b3e7f5a20';
const SECRET = 'c8e2a4f6-1d3b-4a9c-8e7f-2b5d9a1c6e34';
const LINE_ID = '3d8f1b6a-9e2c-4a7d-b5f0-8c1e4a7d2b69';
const MEDIA_ID = '6a1f4c8e-2b7d-4e93-a5c0-9d3b7e1f4a26';
const VOICE_ID = '8b5e2d9f-4c1a-4f76-9e3b-6a0d8c2f5e17';
const MESSAGE_ID = '8e4a2c6f-9d1b-4f7e-b3a5-6c9e1f4d2b78';
const FIXTURE_FOREIGN_ID = JSON.parse(readFileSync(new URL('callback.rvm-success.json', FIXTURES), 'utf8')).foreign_id;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function fixtureText(name) {
    return readFileSync(new URL(name, FIXTURES), 'utf8');
}

function fixtureJson(name) {
    return JSON.parse(fixtureText(name));
}

function captureOutput() {
    const lines = [];
    return {
        log(message) {
            lines.push(String(message));
        },
        error(message) {
            lines.push(String(message));
        },
        lines,
        text() {
            return lines.join('\n');
        }
    };
}

// Settings every recipe test starts from. Nothing is read from process.env,
// so a developer's own DC_* variables cannot change a test.
function baseEnv(mock, extra = {}) {
    return Object.assign({
        DC_KEY: KEY,
        DC_SECRET: SECRET,
        DC_BASE_URL: mock.url,
        DC_TO: '+13125550142',
        DC_WAIT_SECONDS: '0'
    }, extra);
}

async function waitUntil(check, description, timeoutMs = 5000) {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
        const value = check();
        if (value) {
            return value;
        }
        if (Date.now() > deadline) {
            throw new Error('Timed out waiting for ' + description);
        }
        await new Promise(function (resolve) {
            setTimeout(resolve, 10);
        });
    }
}

function receiverPortFrom(out) {
    const line = out.lines.find(function (l) {
        return l.startsWith('Receiver listening on');
    });
    const match = line ? /:(\d+) \(/.exec(line) : null;
    return match ? Number(match[1]) : null;
}

function sign(secret, timestamp, rawBody) {
    return 'sha256=' + createHmac('sha256', secret).update(timestamp + '.' + rawBody).digest('hex');
}

function postRaw(url, rawBody, headers = {}) {
    return fetch(url, { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, headers), body: rawBody });
}

export {
    FIXTURES,
    FIXTURE_FOREIGN_ID,
    KEY,
    LINE_ID,
    MEDIA_ID,
    MESSAGE_ID,
    SECRET,
    UUID,
    VOICE_ID,
    baseEnv,
    captureOutput,
    fixtureJson,
    fixtureText,
    postRaw,
    receiverPortFrom,
    sign,
    waitUntil
};
