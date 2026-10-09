// Shared test helpers: run the quickstart in-process and capture its output.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { run } from '../quickstart.js';
import { sign } from '../lib/signature.js';
import { TEST_NUMBER } from './mock-api.js';

const API_KEY = '9f2b7d4e-1a6c-4e8b-b3d5-7c9e2a4f6b18';
const API_SECRET = 'c1e7a3f9-5b2d-4c8e-9a6f-3d7b1e5c9a42';
const WEBHOOK_SECRET = 'b8d2f6a4-3c9e-4a1f-8e7d-5b3c9f1a7e26';
const PUBLIC_URL = 'https://quickstart-tunnel.example.com';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function baseEnv(mock, extra = {}) {
    return Object.assign({
        DC_KEY: API_KEY,
        DC_SECRET: API_SECRET,
        DC_BASE_URL: mock.url,
        DC_TO: TEST_NUMBER,
        DC_PUBLIC_URL: PUBLIC_URL,
        PORT: '0',
        DC_WEBHOOK_SECRET: WEBHOOK_SECRET,
        DC_WAIT_SECONDS: '5'
    }, extra);
}

async function runQuickstart({ argv = [], env, hooks = {} }) {
    const lines = [];
    const out = {
        log: (text) => lines.push(String(text)),
        error: (text) => lines.push(String(text))
    };
    const code = await run({ argv, env, out, hooks });
    return { code, output: lines.join('\n') };
}

// Answers POST /rvm with 202, then posts a result to the quickstart's
// receiver the way Drop Cowboy does. `deliver` gets (receiverUrl, rvmBody).
function rvmThatReports(state, deliver) {
    return (request) => ({
        status: 202,
        body: { status: 'queued', message_id: '6d1a8f3c-4b7e-4c2a-9e5f-1b8d3a6c9f72' },
        after: () => deliver(state.listener.url, request.json)
    });
}

function postCallback(receiverUrl, body) {
    return fetch(receiverUrl + '/callbacks/dropcowboy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}

function postSignedWebhook(receiverUrl, body, { secret = WEBHOOK_SECRET, timestamp = Math.floor(Date.now() / 1000) } = {}) {
    const rawBody = JSON.stringify(body);
    return fetch(receiverUrl + '/webhooks/dropcowboy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Signature': sign({ secret, timestamp, rawBody }),
            'X-Timestamp': String(timestamp)
        },
        body: rawBody
    });
}

function tempAudioFile(name = 'greeting.mp3') {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dc-quickstart-'));
    const file = path.join(dir, name);
    fs.writeFileSync(file, Buffer.from('ID3 fake audio bytes for the test'));
    return file;
}

export { API_KEY, API_SECRET, PUBLIC_URL, UUID, WEBHOOK_SECRET, baseEnv, postCallback, postSignedWebhook, runQuickstart, rvmThatReports, tempAudioFile };
