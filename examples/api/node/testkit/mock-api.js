// A tiny stand-in for https://api-v2.dropcowboy.com, used by the tests.
//
// startMockApi({ 'GET /path': response }) listens on an ephemeral port and
// records every request, with its body as text (rawBody), as bytes (rawBytes)
// and parsed as JSON (body). It also plays the storage service that a signed
// upload URL points at (see mediaUploadRoutes). A response is one of:
//   { status, body, headers }            always this
//   [ response, response, ... ]          one per call; the last one repeats
//   function (request) => response       decide per request
//   { hang: true }                       never answers (for timeout tests)
// Any route you did not list answers 404 problem details.

import { createServer } from 'node:http';

async function startMockApi(routes = {}) {
    const requests = [];
    const calls = {};

    const server = createServer(async function (req, res) {
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const bytes = Buffer.concat(chunks);
        const text = bytes.toString('utf8');
        const url = new URL(req.url, 'http://mock.local');
        const request = {
            method: req.method,
            path: url.pathname,
            query: Object.fromEntries(url.searchParams),
            headers: req.headers,
            rawBytes: bytes,
            rawBody: text,
            body: text === '' ? undefined : safeParse(text)
        };
        requests.push(request);

        const key = req.method + ' ' + url.pathname;
        const response = pick(routes[key], key, calls, request) || {
            status: 404,
            body: { type: 'https://api-v2.dropcowboy.com/errors/not-found', title: 'Not Found', status: 404, detail: 'No mock for ' + key, request_id: '0b7d3c1e-5a2f-4e86-9c4d-7a1e3b5f9d20' }
        };
        if (response.hang) {
            return;
        }
        const payload = typeof response.body === 'string' ? response.body : JSON.stringify(response.body === undefined ? {} : response.body);
        res.writeHead(response.status || 200, Object.assign({ 'Content-Type': 'application/json' }, response.headers));
        res.end(payload);
    });

    await new Promise(function (resolve) {
        server.listen(0, '127.0.0.1', resolve);
    });

    return {
        url: 'http://127.0.0.1:' + server.address().port,
        requests,
        summary() {
            return requests.map(function (r) {
                return r.method + ' ' + r.path;
            });
        },
        find(method, path) {
            return requests.filter(function (r) {
                return r.method === method && r.path === path;
            });
        },
        async close() {
            await new Promise(function (resolve) {
                server.close(resolve);
                server.closeAllConnections();
            });
        }
    };
}

function pick(entry, key, calls, request) {
    if (entry === undefined) {
        return null;
    }
    if (typeof entry === 'function') {
        return entry(request);
    }
    if (Array.isArray(entry)) {
        const index = calls[key] || 0;
        calls[key] = index + 1;
        return entry[Math.min(index, entry.length - 1)];
    }
    return entry;
}

function safeParse(text) {
    try {
        return JSON.parse(text);
    } catch (err) {
        return undefined;
    }
}

export { startMockApi };
