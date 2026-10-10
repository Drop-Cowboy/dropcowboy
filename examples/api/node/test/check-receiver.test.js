import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { SAMPLE_CALLBACK, SAMPLE_WEBHOOK, classify, isPublicHttps, run } from '../src/check-receiver.js';
import { RecipeError } from '../src/lib/config.js';
import { verifySignature } from '../src/lib/verify.js';
import { captureOutput, fixtureJson } from '../testkit/helpers.js';

const SECRET = fixtureJson('signature-vectors.json').secret;
const WEB_API_404 = '{"Message":"No HTTP resource was found that matches the request URI.","MessageDetail":"No action was found on the controller \'Dropcowboy\' that matches the request."}';

let server;
let received;
let out;

// A stand-in for your server. answers maps a path to
// { status, body, delayMs } and defaults to 200.
async function startEndpoint(answers = {}) {
    received = [];
    server = createServer(async function (req, res) {
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const rawBody = Buffer.concat(chunks);
        received.push({ method: req.method, path: req.url, headers: req.headers, rawBody });
        const answer = answers[req.url] || { status: 200, body: 'ok' };
        if (answer.delayMs) {
            await new Promise((resolve) => setTimeout(resolve, answer.delayMs));
        }
        if (!res.destroyed) {
            res.writeHead(answer.status, { 'Content-Type': 'text/plain' });
            res.end(answer.body || '');
        }
    });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    return 'http://127.0.0.1:' + server.address().port;
}

beforeEach(() => {
    out = captureOutput();
});

afterEach(async () => {
    if (server) {
        server.closeAllConnections();
        await new Promise((resolve) => server.close(resolve));
        server = null;
    }
});

describe('check-receiver', () => {
    it('posts the sample callback, and a webhook signed over its raw bytes with a fresh timestamp', async () => {
        const base = await startEndpoint();
        const outcome = await run({ env: { DC_WEBHOOK_SECRET: SECRET }, out, argv: [base + '/callbacks/dropcowboy', base + '/webhooks/dropcowboy'] });

        assert.equal(outcome.ok, true);
        assert.deepEqual(outcome.results.map((r) => r.verdict), ['ok', 'ok']);
        const [callback, webhook] = received;
        assert.equal(callback.method, 'POST');
        assert.equal(callback.path, '/callbacks/dropcowboy');
        assert.equal(callback.headers['x-signature'], undefined);
        assert.deepEqual(JSON.parse(callback.rawBody.toString('utf8')), fixtureJson('callback.rvm-success.json'));

        assert.equal(webhook.method, 'POST');
        assert.equal(webhook.path, '/webhooks/dropcowboy');
        const now = Date.now() / 1000;
        assert.ok(Math.abs(now - Number(webhook.headers['x-timestamp'])) < 5);
        assert.deepEqual(verifySignature({ rawBody: webhook.rawBody, headers: webhook.headers, secrets: [SECRET] }), { ok: true });
        const event = JSON.parse(webhook.rawBody.toString('utf8'));
        const expected = fixtureJson('webhook.rvm-status.json');
        assert.deepEqual(event.data, expected.data);
        assert.equal(event.event, expected.event);
        assert.notEqual(event.event_id, expected.event_id);
        assert.equal(webhook.headers['x-event-id'], event.event_id);
        assert.match(out.text(), /All checks passed/);
        assert.ok(!out.text().includes(SECRET));
        assert.match(out.text(), new RegExp('secret ending in ' + SECRET.slice(-4)));
    });

    it('signs with the first secret in DC_WEBHOOK_SECRET', async () => {
        const base = await startEndpoint();
        await run({ env: { DC_WEBHOOK_SECRET: SECRET + ',another-secret' }, out, argv: [base + '/cb', base + '/wh'] });
        assert.deepEqual(verifySignature({ rawBody: received[1].rawBody, headers: received[1].headers, secrets: [SECRET] }), { ok: true });
    });

    it('checks only the callback when no webhook URL is given, and needs no secret', async () => {
        const base = await startEndpoint();
        const outcome = await run({ env: {}, out, argv: [base + '/cb'] });
        assert.equal(outcome.ok, true);
        assert.equal(received.length, 1);
    });

    it('calls a 404 or 405 a wrong route or verb, and names the Web API cause', async () => {
        const base = await startEndpoint({
            '/api/callback': { status: 404, body: WEB_API_404 },
            '/api/webhook': { status: 405, body: '' }
        });
        const outcome = await run({ env: { DC_WEBHOOK_SECRET: SECRET }, out, argv: [base + '/api/callback', base + '/api/webhook'] });

        assert.equal(outcome.ok, false);
        assert.deepEqual(outcome.results.map((r) => r.verdict), ['route', 'route']);
        const printed = out.text();
        assert.match(printed, /must accept POST at exactly this path: \/api\/callback/);
        assert.match(printed, /\[HttpPost\] with \[Route\("\.\.\."\)\]/);
        assert.match(printed, /config\.MapHttpAttributeRoutes\(\)/);
        assert.match(printed, /A callback is not retried/);
        assert.match(printed, /Settings > API Logs/);
    });

    it('calls a 401 or 403 a failing signature check', async () => {
        const base = await startEndpoint({ '/wh': { status: 401 } });
        const outcome = await run({ env: { DC_WEBHOOK_SECRET: SECRET }, out, argv: [base + '/cb', base + '/wh'] });
        assert.deepEqual(outcome.results.map((r) => r.verdict), ['ok', 'auth']);
        assert.match(out.text(), /The signature check is failing/);
    });

    it('calls an answer slower than the timeout too slow', async () => {
        const base = await startEndpoint({ '/cb': { status: 200, delayMs: 400 } });
        const outcome = await run({ env: {}, out, argv: [base + '/cb'], timeouts: { callbackMs: 100 } });
        assert.deepEqual(outcome.results.map((r) => r.verdict), ['slow']);
        assert.match(out.text(), /Too slow/);
    });

    it('calls any other non-2xx not retried, and a 5xx webhook retried then dropped', async () => {
        const base = await startEndpoint({ '/cb': { status: 500 }, '/wh': { status: 503 } });
        const outcome = await run({ env: { DC_WEBHOOK_SECRET: SECRET }, out, argv: [base + '/cb', base + '/wh'] });
        assert.deepEqual(outcome.results.map((r) => r.verdict), ['rejected', 'rejected']);
        assert.match(out.text(), /answered 500, which is not 2xx\. A callback is not retried/);
        assert.match(out.text(), /A webhook answered with 503 is retried, at most 3 attempts in all, then dropped/);
    });

    it('does not follow a redirect', async () => {
        const base = await startEndpoint({ '/cb': { status: 301 } });
        const outcome = await run({ env: {}, out, argv: [base + '/cb'] });
        assert.deepEqual(outcome.results.map((r) => r.verdict), ['rejected']);
        assert.equal(received.length, 1);
    });

    it('reports an endpoint it cannot reach', async () => {
        const base = await startEndpoint();
        const url = base + '/cb';
        server.closeAllConnections();
        await new Promise((resolve) => server.close(resolve));
        server = null;
        const outcome = await run({ env: {}, out, argv: [url] });
        assert.deepEqual(outcome.results.map((r) => r.verdict), ['unreachable']);
    });

    it('notes that a local address is never called by Drop Cowboy', async () => {
        const base = await startEndpoint();
        await run({ env: {}, out, argv: [base + '/cb'] });
        assert.match(out.text(), /is not a public https:\/\/ address/);
        assert.equal(isPublicHttps('https://abc123.example.com/cb'), true);
        assert.equal(isPublicHttps('http://abc123.example.com/cb'), false);
        assert.equal(isPublicHttps('https://192.168.1.20/cb'), false);
    });

    it('refuses a sample URL, a missing secret and a missing URL before posting anything', async () => {
        const base = await startEndpoint();
        await assert.rejects(run({ env: {}, out, argv: ['https://hooks.example.com/callbacks/dropcowboy'] }), (err) => {
            assert.ok(err instanceof RecipeError);
            assert.equal(err.message, 'callback-url=https://hooks.example.com/callbacks/dropcowboy: this is a sample value from our docs; use your own.');
            return true;
        });
        await assert.rejects(run({ env: {}, out, argv: [base + '/cb', base + '/wh'] }), /DC_WEBHOOK_SECRET/);
        await assert.rejects(run({ env: {}, out, argv: [] }), /Usage/);
        await assert.rejects(run({ env: {}, out, argv: ['not a url'] }), /full http/);
        assert.deepEqual(received, []);
    });

    it('carries the same bodies as the fixtures', () => {
        assert.deepEqual(SAMPLE_CALLBACK, fixtureJson('callback.rvm-success.json'));
        assert.deepEqual(SAMPLE_WEBHOOK, fixtureJson('webhook.rvm-status.json'));
    });
});

describe('classify', () => {
    const base = { url: 'https://abc123.example.com/callbacks/dropcowboy', elapsedMs: 50, timedOut: false, networkError: null, timeoutMs: 10000 };

    it('maps each answer to one verdict', () => {
        const cases = [
            [{ kind: 'callback', status: 200 }, 'ok', true],
            [{ kind: 'callback', status: 204 }, 'ok', true],
            [{ kind: 'callback', status: 404 }, 'route', false],
            [{ kind: 'webhook', status: 405 }, 'route', false],
            [{ kind: 'webhook', status: 401 }, 'auth', false],
            [{ kind: 'callback', status: 403 }, 'auth', false],
            [{ kind: 'callback', status: 200, elapsedMs: 10500 }, 'slow', false],
            [{ kind: 'webhook', status: null, timedOut: true, timeoutMs: 5000 }, 'slow', false],
            [{ kind: 'callback', status: 400 }, 'rejected', false],
            [{ kind: 'webhook', status: 500 }, 'rejected', false],
            [{ kind: 'callback', status: null, networkError: 'ECONNREFUSED' }, 'unreachable', false]
        ];
        for (const [input, verdict, ok] of cases) {
            const result = classify(Object.assign({}, base, input));
            assert.equal(result.verdict, verdict, JSON.stringify(input));
            assert.equal(result.ok, ok);
        }
    });

    it('says a callback over 10 seconds and a webhook over 5 seconds are too slow', () => {
        assert.match(classify(Object.assign({}, base, { kind: 'callback', status: null, timedOut: true })).explanation, /after 10 seconds\. A callback is tried once/);
        assert.match(classify(Object.assign({}, base, { kind: 'webhook', status: null, timedOut: true, timeoutMs: 5000 })).explanation, /after 5 seconds\. A webhook that times out is retried/);
    });
});
