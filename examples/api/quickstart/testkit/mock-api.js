// A mock Drop Cowboy API for the tests. It records every request and answers
// from a table of routes. It also stands in for the signed upload URL, so the
// tests see the PUT with its headers. No network, no credentials.

import http from 'node:http';

const REQUEST_ID = '4c8e1a7d-2b5f-4d93-a6e0-3f9b7c1d5a42';
const LINE_ID = '5f2c8a1e-7b3d-4e9f-a6c2-1d8b4e7f3a95';
const MEDIA_ID = '3a9e6c2f-8d1b-4f7a-b5e3-2c6d9a1f4e87';
const VOICE_ID = '8b4d1f7a-2e6c-4a93-9d5b-7f1e3a8c6b24';
const MESSAGE_ID = '6d1a8f3c-4b7e-4c2a-9e5f-1b8d3a6c9f72';
const TEST_NUMBER = '+13125550142';
const OTHER_NUMBER = '+16175550199';

function ok(data, status = 200) {
    return { status, body: { data, meta: { request_id: REQUEST_ID } } };
}

function problem(status, title, detail) {
    return { status, body: { type: 'https://api-v2.dropcowboy.com/errors/' + title.toLowerCase().replace(/\s+/g, '-'), title, status, detail, request_id: REQUEST_ID } };
}

function readiness(overrides = {}) {
    return ok(Object.assign({
        building_blocks_enabled: false,
        audio_url_allowed: false,
        test_numbers_only: false,
        test_numbers: [TEST_NUMBER],
        embed_ready: false,
        next_actions: []
    }, overrides));
}

// routes: { 'METHOD /path': answer | (request, mock) => answer }
// An answer is { status, body, after } where `after` runs once the response
// has been sent (used to post a result back to the quickstart's receiver).
async function startMockApi(routes = {}) {
    const requests = [];
    const pending = [];
    const mock = { requests, url: null, uploadUrl: null };

    const defaults = {
        'GET /register/public/integration-readiness': readiness(),
        'GET /phone/public/lines': ok([
            { ivr_id: 'a1c3e5f7-9b2d-4f6a-8c1e-3d5f7a9b2c4e', name: 'Texting', type: 'sms', is_default: true },
            { ivr_id: LINE_ID, name: 'Main line', type: 'voice', is_default: true }
        ]),
        'GET /voice/public/voices': ok({ voices: [
            { voice_id: '2e7a9c4f-6b1d-4f8e-a3c5-9d2b6e1f4a73', name: 'Draft', status: 'training' },
            { voice_id: VOICE_ID, name: 'Alex', status: 'ready' }
        ] }),
        ['GET /media/public/media/' + MEDIA_ID]: ok({ media_id: MEDIA_ID, name: 'Greeting', media_exists: true }),
        'POST /media/public/media': () => ok({
            media_id: MEDIA_ID,
            name: 'Quickstart greeting.mp3',
            type: 'rvm',
            signed_upload: true,
            media_exists: false,
            upload: {
                mp3: { url: mock.url + '/uploads/' + MEDIA_ID + '.mp3?X-Signature=test', content_type: 'audio/mpeg' },
                wav: { url: mock.url + '/uploads/' + MEDIA_ID + '.wav?X-Signature=test', content_type: 'audio/wav' }
            }
        }, 201),
        ['PUT /uploads/' + MEDIA_ID + '.mp3']: (request) => ({ status: request.headers['content-type'] === 'audio/mpeg' ? 200 : 403, body: '' }),
        ['PUT /uploads/' + MEDIA_ID + '.wav']: (request) => ({ status: request.headers['content-type'] === 'audio/wav' ? 200 : 403, body: '' }),
        ['POST /media/public/media/' + MEDIA_ID + '/complete']: ok({ media_id: MEDIA_ID, media_exists: true }),
        'GET /register/public/account/webhook-signing-secret': ok([]),
        'POST /rvm': { status: 202, body: { status: 'queued', message_id: MESSAGE_ID } }
    };
    const table = Object.assign({}, defaults, routes);

    const server = http.createServer((req, res) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
            const url = new URL(req.url, 'http://localhost');
            const raw = Buffer.concat(chunks);
            let json;
            try {
                json = raw.length > 0 ? JSON.parse(raw.toString('utf8')) : undefined;
            } catch {
                json = undefined;
            }
            const request = { method: req.method, path: url.pathname, query: url.search, headers: req.headers, raw, json };
            requests.push(request);

            const entry = table[req.method + ' ' + url.pathname];
            const answer = entry === undefined
                ? problem(404, 'Not Found', 'No mock route for ' + req.method + ' ' + url.pathname)
                : typeof entry === 'function' ? entry(request, mock) : entry;
            const text = typeof answer.body === 'string' ? answer.body : JSON.stringify(answer.body);
            res.writeHead(answer.status, { 'Content-Type': 'application/json' });
            res.end(text, () => {
                if (typeof answer.after === 'function') {
                    pending.push(Promise.resolve().then(answer.after).catch(() => {}));
                }
            });
        });
    });

    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    mock.url = 'http://127.0.0.1:' + server.address().port;
    mock.calls = () => requests.map((request) => request.method + ' ' + request.path);
    mock.find = (method, path) => requests.find((request) => request.method === method && request.path === path);
    mock.close = async () => {
        await Promise.all(pending);
        await new Promise((resolve) => {
            server.close(() => resolve());
            server.closeAllConnections();
        });
    };
    return mock;
}

export { LINE_ID, MEDIA_ID, MESSAGE_ID, OTHER_NUMBER, REQUEST_ID, TEST_NUMBER, VOICE_ID, ok, problem, readiness, startMockApi };
