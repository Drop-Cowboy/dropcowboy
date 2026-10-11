// Run with: npm test (or node --test test/)
// check-receiver against small local endpoints that misbehave on purpose.

import assert from 'node:assert/strict';
import http from 'node:http';
import { afterEach, describe, it } from 'node:test';

import { classify } from '../lib/check-receiver.js';
import { readFixtureText } from '../lib/fixtures.js';
import { startListener } from '../lib/listener.js';
import { verify } from '../lib/signature.js';
import { WEBHOOK_SECRET, runQuickstart } from '../testkit/helpers.js';

const servers = [];
const FAST = { callbackMs: 300, webhookMs: 300 };

// handler(req, rawBody, res). Returns the base URL.
async function endpoint(handler) {
    const seen = [];
    const server = http.createServer((req, res) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
            const raw = Buffer.concat(chunks);
            seen.push({ method: req.method, path: req.url, headers: req.headers, raw });
            handler(req, raw, res);
        });
    });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    servers.push(server);
    return { url: 'http://127.0.0.1:' + server.address().port, seen };
}

afterEach(async () => {
    while (servers.length > 0) {
        const server = servers.pop();
        await new Promise((resolve) => {
            server.close(() => resolve());
            server.closeAllConnections();
        });
    }
});

function answer(status) {
    return (req, raw, res) => {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end('{}');
    };
}

function check(args, env = {}) {
    return runQuickstart({ argv: ['check-receiver'].concat(args), env: Object.assign({ DC_WEBHOOK_SECRET: WEBHOOK_SECRET }, env), hooks: { checkTimeouts: FAST } });
}

describe('check-receiver', () => {
    it('posts the callback fixture unchanged and a correctly signed webhook fixture, and reports OK for 200', async () => {
        const target = await endpoint(answer(200));
        const result = await check([target.url + '/callbacks/dropcowboy', target.url + '/webhooks/dropcowboy']);
        assert.equal(result.code, 0, result.output);
        assert.equal((result.output.match(/OK: your endpoint accepted the/g) || []).length, 2);

        const [callback, webhook] = target.seen;
        assert.equal(callback.method, 'POST');
        assert.equal(callback.path, '/callbacks/dropcowboy');
        assert.equal(callback.raw.toString(), readFixtureText('callback.rvm-success.json'));
        assert.equal(callback.headers['x-signature'], undefined, 'callbacks are unsigned');

        assert.equal(webhook.path, '/webhooks/dropcowboy');
        assert.ok(Math.abs(Number(webhook.headers['x-timestamp']) - Date.now() / 1000) < 5, 'fresh timestamp');
        assert.deepEqual(verify({ rawBody: webhook.raw, headers: webhook.headers, secrets: [WEBHOOK_SECRET] }), { ok: true });
        const body = JSON.parse(webhook.raw.toString());
        assert.equal(body.event, 'contact.rvm.status');
        assert.equal(webhook.headers['x-event-id'], body.event_id);
    });

    it('classifies 404 as a wrong route or verb', async () => {
        const target = await endpoint(answer(404));
        const result = await check([target.url + '/callbacks/dropcowboy']);
        assert.equal(result.code, 1);
        assert.match(result.output, /answered: 404/);
        assert.match(result.output, /Route or verb wrong \(404\)\. The endpoint must accept POST at exactly this path: \/callbacks\/dropcowboy/);
        assert.match(result.output, /We don't retry a callback/);
        assert.match(result.output, /Settings > API Logs/);
    });

    it('classifies 401 on the webhook as a failing signature check', async () => {
        const target = await endpoint((req, raw, res) => answer(req.url.startsWith('/webhooks') ? 401 : 200)(req, raw, res));
        const result = await check([target.url + '/callbacks/dropcowboy', target.url + '/webhooks/dropcowboy']);
        assert.equal(result.code, 1);
        assert.match(result.output, /The signature check is failing/);
        assert.match(result.output, /We don't retry a webhook answered with 401/);
    });

    it('classifies a slow endpoint as too slow', async () => {
        const target = await endpoint((req, raw, res) => {
            setTimeout(() => answer(200)(req, raw, res), 1000);
        });
        const result = await check([target.url + '/callbacks/dropcowboy']);
        assert.equal(result.code, 1);
        assert.match(result.output, /answered: timeout/);
        assert.match(result.output, /Too slow/);
    });

    it('reports a 500 on the webhook as retried, and an unreachable host', async () => {
        const target = await endpoint((req, raw, res) => answer(req.url.startsWith('/webhooks') ? 500 : 200)(req, raw, res));
        const result = await check([target.url + '/callbacks/dropcowboy', target.url + '/webhooks/dropcowboy']);
        assert.match(result.output, /is retried, at most 3 attempts in all, then dropped/);

        const closed = await endpoint(answer(200));
        const url = closed.url;
        const server = servers.pop();
        await new Promise((resolve) => server.close(() => resolve()));
        const unreachable = await check([url + '/callbacks/dropcowboy']);
        assert.match(unreachable.output, /Could not connect/);
    });

    it('passes against the quickstart\'s own receiver', async () => {
        const listener = await startListener({ port: 0, secrets: [WEBHOOK_SECRET], out: { log: () => {}, error: () => {} } });
        try {
            const result = await check([listener.url + '/callbacks/dropcowboy', listener.url + '/webhooks/dropcowboy']);
            assert.equal(result.code, 0, result.output);
            assert.match(result.output, /is on this computer/);
        } finally {
            await listener.close();
        }
    });

    it('needs DC_WEBHOOK_SECRET to check a webhook URL', async () => {
        const result = await runQuickstart({ argv: ['check-receiver', 'http://127.0.0.1:9/callbacks/dropcowboy', 'http://127.0.0.1:9/webhooks/dropcowboy'], env: {} });
        assert.equal(result.code, 2);
        assert.match(result.output, /Set DC_WEBHOOK_SECRET/);
    });

    it('needs a callback URL', async () => {
        const result = await runQuickstart({ argv: ['check-receiver'], env: {} });
        assert.equal(result.code, 2);
    });
});

describe('classify', () => {
    const url = 'https://receiver.example.com/webhooks/dropcowboy';
    it('maps each answer to a verdict', () => {
        assert.equal(classify({ kind: 'webhook', url, status: 204, timeoutMs: 5000 }).verdict, 'ok');
        assert.equal(classify({ kind: 'webhook', url, status: 405, timeoutMs: 5000 }).verdict, 'route');
        assert.equal(classify({ kind: 'webhook', url, status: 403, timeoutMs: 5000 }).verdict, 'auth');
        assert.equal(classify({ kind: 'callback', url, status: 401, timeoutMs: 10000 }).verdict, 'auth');
        assert.match(classify({ kind: 'callback', url, status: 401, timeoutMs: 10000 }).explanation, /Callbacks carry no signature/);
        assert.equal(classify({ kind: 'callback', url, status: null, timedOut: true, timeoutMs: 10000 }).verdict, 'slow');
        assert.match(classify({ kind: 'callback', url, status: null, timedOut: true, timeoutMs: 10000 }).explanation, /10 seconds/);
        assert.equal(classify({ kind: 'callback', url, status: 302, timeoutMs: 10000 }).verdict, 'rejected');
    });
});
