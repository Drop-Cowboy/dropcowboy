// Send only to people who agreed to hear from you. Test with numbers you own.
//
// A tiny HTTP client for the Drop Cowboy API: plain fetch, x-key and x-secret
// headers, JSON in and out. Responses are wrapped as { data, meta }, except
// POST /rvm, which answers 202 { status, message_id }.

const TIMEOUT_MS = 30000;

// Holds what you need to report a failure. It never holds the request
// headers, so printing it cannot leak your key or secret.
class ApiError extends Error {
    constructor({ method, path, status, body, requestId }) {
        const fields = problemFields(body);
        super(fields.detail || fields.title || (status === 0 ? 'Could not reach the API' : 'HTTP ' + status));
        this.name = 'ApiError';
        this.method = method;
        this.path = path;
        this.status = status;
        this.body = body;
        this.title = fields.title;
        this.detail = fields.detail;
        this.code = fields.code;
        this.requestId = requestId || null;
    }

    describe() {
        const parts = [this.method + ' ' + this.path + ' failed: HTTP ' + this.status];
        if (this.title) {
            parts.push(this.title);
        }
        if (this.detail && this.detail !== this.title) {
            parts.push(this.detail);
        }
        if (this.code) {
            parts.push('code ' + this.code);
        }
        if (this.requestId) {
            parts.push('request_id ' + this.requestId);
        }
        return parts.join('. ');
    }
}

function createClient({ baseUrl, key, secret, fetchFn = fetch, timeoutMs = TIMEOUT_MS }) {
    const headers = {
        'x-key': key,
        'x-secret': secret,
        'Accept': 'application/json'
    };

    async function request(method, path, { body, idempotencyKey } = {}) {
        const sent = Object.assign({}, headers);
        if (body !== undefined) {
            sent['Content-Type'] = 'application/json';
        }
        if (idempotencyKey) {
            sent['Idempotency-Key'] = idempotencyKey;
        }
        let response;
        try {
            response = await fetchFn(baseUrl + path, {
                method,
                headers: sent,
                body: body === undefined ? undefined : JSON.stringify(body),
                signal: AbortSignal.timeout(timeoutMs)
            });
        } catch (err) {
            throw new ApiError({ method, path, status: 0, body: { detail: 'Could not reach the API: ' + ((err && err.message) || 'network error') } });
        }
        const text = await response.text();
        const parsed = parseJson(text);
        const requestId = (parsed && parsed.meta && parsed.meta.request_id) || (parsed && parsed.request_id) || response.headers.get('x-request-id');
        if (!response.ok) {
            throw new ApiError({ method, path, status: response.status, body: parsed === undefined ? text : parsed, requestId });
        }
        return { status: response.status, body: parsed === undefined ? null : parsed };
    }

    return {
        get(path) {
            return request('GET', path);
        },
        post(path, body, options) {
            return request('POST', path, Object.assign({ body }, options));
        },
        delete(path) {
            return request('DELETE', path);
        }
    };
}

// Errors are problem details ({ title, detail }), but a few routes answer
// { message } or { error, message }.
function problemFields(body) {
    if (body === null || typeof body !== 'object') {
        return { title: null, detail: typeof body === 'string' && body !== '' ? body.slice(0, 200) : null, code: null };
    }
    const details = body.details && typeof body.details === 'object' ? body.details : {};
    return {
        title: stringOrNull(body.title) || stringOrNull(body.error),
        detail: stringOrNull(body.detail) || stringOrNull(body.message),
        code: stringOrNull(body.code) || stringOrNull(details.code)
    };
}

function stringOrNull(value) {
    return typeof value === 'string' && value !== '' ? value : null;
}

function parseJson(text) {
    if (text === '') {
        return undefined;
    }
    try {
        return JSON.parse(text);
    } catch {
        return undefined;
    }
}

function dataOf(response) {
    return response && response.body && response.body.data !== undefined ? response.body.data : null;
}

export { ApiError, createClient, dataOf };
