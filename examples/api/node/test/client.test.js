import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { DcClient, DcError } from '../src/lib/client.js';
import { KEY, SECRET, UUID } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { REQUEST_ID, ok, problem } from '../testkit/routes.js';

let mock;

function clientFor(options = {}) {
    const sleeps = [];
    const client = new DcClient(Object.assign({
        key: KEY,
        secret: SECRET,
        baseUrl: mock.url,
        sleep: (ms) => {
            sleeps.push(ms);
            return Promise.resolve();
        }
    }, options));
    return { client, sleeps };
}

afterEach(async () => {
    if (mock) {
        await mock.close();
        mock = null;
    }
});

describe('DcClient requests', () => {
    it('sends x-key, x-secret and JSON headers, and unwraps nothing', async () => {
        mock = await startMockApi({ 'GET /thing': ok({ value: 1 }) });
        const { client } = clientFor();

        const body = await client.get('/thing');

        assert.deepEqual(body.data, { value: 1 });
        const request = mock.requests[0];
        assert.equal(request.headers['x-key'], KEY);
        assert.equal(request.headers['x-secret'], SECRET);
        assert.equal(request.headers['accept'], 'application/json');
        assert.equal(request.headers['idempotency-key'], undefined);
    });

    it('adds query parameters', async () => {
        mock = await startMockApi({ 'GET /thing': ok([]) });
        const { client } = clientFor();
        await client.get('/thing', { query: { search_term: 'Local presence', limit: 3 } });

        assert.deepEqual(mock.requests[0].query, { search_term: 'Local presence', limit: '3' });
    });

    it('sends the Idempotency-Key it is given, and a JSON body', async () => {
        mock = await startMockApi({ 'POST /thing': ok({}) });
        const { client } = clientFor();
        const key = 'c3d5e7f9-1a2b-4c6d-8e0f-2a4c6e8b0d13';
        await client.post('/thing', { a: 1 }, { idempotencyKey: key });

        assert.equal(mock.requests[0].headers['idempotency-key'], key);
        assert.match(mock.requests[0].headers['idempotency-key'], UUID);
        assert.deepEqual(mock.requests[0].body, { a: 1 });
    });

    it('accepts a 202 with a flat body and an empty body', async () => {
        mock = await startMockApi({
            'POST /rvm': { status: 202, body: { status: 'queued', message_id: 'x' } },
            'POST /empty': { status: 204, body: '' }
        });
        const { client } = clientFor();

        assert.equal((await client.post('/rvm', {})).status, 'queued');
        assert.equal(await client.post('/empty', {}), null);
    });
});

describe('DcClient retries', () => {
    it('retries a GET on 503 and then succeeds', async () => {
        mock = await startMockApi({ 'GET /thing': [problem(503, 'Service Unavailable', 'Try again.'), ok({ value: 2 })] });
        const { client, sleeps } = clientFor();

        const body = await client.get('/thing');

        assert.equal(body.data.value, 2);
        assert.equal(mock.requests.length, 2);
        assert.equal(sleeps.length, 1);
    });

    it('gives up after 3 tries on a GET', async () => {
        mock = await startMockApi({ 'GET /thing': problem(500, 'Internal Server Error', 'Broken.') });
        const { client } = clientFor();

        await assert.rejects(client.get('/thing'), (err) => err instanceof DcError && err.status === 500);
        assert.equal(mock.requests.length, 3);
    });

    it('honors Retry-After in seconds on a 429', async () => {
        mock = await startMockApi({ 'GET /thing': [{ status: 429, headers: { 'Retry-After': '2' }, body: { message: 'Too many requests' } }, ok({})] });
        const { client, sleeps } = clientFor();

        await client.get('/thing');

        assert.deepEqual(sleeps, [2000]);
    });

    it('falls back to backoff when a 429 has no Retry-After', async () => {
        mock = await startMockApi({ 'GET /thing': [{ status: 429, body: { message: 'Too many requests' } }, ok({})] });
        const { client, sleeps } = clientFor();

        await client.get('/thing');

        assert.equal(sleeps.length, 1);
        assert.ok(sleeps[0] >= 250 && sleeps[0] <= 500, 'backoff was ' + sleeps[0]);
    });

    it('does not retry a GET on a 4xx other than 429', async () => {
        mock = await startMockApi({ 'GET /thing': problem(404, 'Not Found', 'No such thing.') });
        const { client } = clientFor();

        await assert.rejects(client.get('/thing'), (err) => err.status === 404);
        assert.equal(mock.requests.length, 1);
    });

    it('never retries a POST, even on 503', async () => {
        mock = await startMockApi({ 'POST /rvm': problem(503, 'Service Unavailable', 'Try again.') });
        const { client } = clientFor();

        await assert.rejects(client.post('/rvm', {}, { idempotencyKey: 'c3d5e7f9-1a2b-4c6d-8e0f-2a4c6e8b0d13' }), (err) => err.status === 503);
        assert.equal(mock.requests.length, 1);
    });
});

describe('DcError', () => {
    it('reads RFC 9457 problem details and the code', async () => {
        mock = await startMockApi({ 'GET /thing': problem(403, 'Forbidden', 'This key cannot do that.', 'missing_scope') });
        const { client } = clientFor();

        await assert.rejects(client.get('/thing'), (err) => {
            assert.equal(err.status, 403);
            assert.equal(err.title, 'Forbidden');
            assert.equal(err.detail, 'This key cannot do that.');
            assert.equal(err.code, 'missing_scope');
            assert.equal(err.requestId, REQUEST_ID);
            return true;
        });
    });

    it('reads the {message} body the rate limiter answers with', async () => {
        mock = await startMockApi({ 'POST /thing': { status: 429, body: { message: 'Too many requests' } } });
        const { client } = clientFor();

        await assert.rejects(client.post('/thing', {}), (err) => err.status === 429 && err.detail === 'Too many requests');
    });

    it('reads the {error, message} body a plan gate answers with', async () => {
        mock = await startMockApi({ 'GET /thing': { status: 402, body: { error: 'plan_required', message: 'Upgrade to use this.' } } });
        const { client } = clientFor();

        await assert.rejects(client.get('/thing'), (err) => err.title === 'plan_required' && err.detail === 'Upgrade to use this.');
    });

    it('takes the request id from the x-request-id header when the body has none', async () => {
        const headerId = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
        mock = await startMockApi({ 'GET /thing': { status: 400, headers: { 'x-request-id': headerId }, body: { title: 'Bad Request' } } });
        const { client } = clientFor();

        await assert.rejects(client.get('/thing'), (err) => err.requestId === headerId);
    });

    it('survives an HTML error page', async () => {
        mock = await startMockApi({ 'GET /thing': { status: 502, headers: { 'Content-Type': 'text/html' }, body: '<html>Bad gateway</html>' } });
        const { client } = clientFor();

        await assert.rejects(client.get('/thing'), (err) => err.status === 502 && err.title === 'HTTP 502');
    });

    it('rejects a success answer that is not JSON', async () => {
        mock = await startMockApi({ 'GET /thing': { status: 200, headers: { 'Content-Type': 'text/html' }, body: '<html>hello</html>' } });
        const { client } = clientFor();

        await assert.rejects(client.get('/thing'), (err) => err.title === 'Unexpected response');
    });

    it('reports a network failure as status 0, without the secret', async () => {
        mock = await startMockApi({});
        const { client, sleeps } = clientFor({ baseUrl: 'http://127.0.0.1:1' });

        await assert.rejects(client.post('/rvm', {}), (err) => {
            assert.equal(err.status, 0);
            assert.equal(err.title, 'Network error');
            assert.ok(!JSON.stringify(err).includes(SECRET));
            return true;
        });
        assert.deepEqual(sleeps, []);
    });

    it('reports a timeout', async () => {
        mock = await startMockApi({ 'POST /slow': { hang: true } });
        const { client } = clientFor({ timeoutMs: 50 });

        await assert.rejects(client.post('/slow', {}), (err) => err.title === 'Timeout' && err.status === 0);
    });

    it('does not expose the secret when the client or the error is printed', async () => {
        mock = await startMockApi({ 'GET /thing': problem(500, 'Internal Server Error', 'Broken.') });
        const { client } = clientFor();

        const shown = JSON.stringify(client) + String(Object.keys(client));
        assert.ok(!shown.includes(SECRET));
        await assert.rejects(client.get('/thing'), (err) => {
            assert.ok(!JSON.stringify(err).includes(SECRET));
            assert.ok(!JSON.stringify(err).includes(KEY));
            return true;
        });
    });
});
