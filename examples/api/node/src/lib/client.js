// Send only to people who agreed to hear from you. Test with numbers you own.
//
// A small HTTP client for https://api-v2.dropcowboy.com. Plain fetch, no SDK.

import { randomUUID } from 'node:crypto';
import { baseUrl, readCredentials } from './config.js';

const TIMEOUT_MS = 30000;
const MAX_GET_ATTEMPTS = 3;
const MAX_BACKOFF_MS = 30000;

// Carries what you need to report a failure: the status, the problem details
// from the body and the request id to quote to support. It never holds the
// request headers, so printing it cannot leak your key or secret.
class DcError extends Error {
    constructor({ status, body, requestId, fallbackTitle, fallbackDetail }) {
        const fields = problemFields(body);
        super(fields.detail || fields.title || fallbackDetail || fallbackTitle || 'Request failed');
        this.name = 'DcError';
        this.status = status;
        this.body = body;
        this.requestId = requestId || null;
        this.title = fields.title || fallbackTitle || null;
        this.detail = fields.detail || fallbackDetail || null;
        this.code = fields.code;
    }
}

class DcClient {
    #headers;
    #baseUrl;
    #timeoutMs;
    #fetch;
    #sleep;

    constructor({ key, secret, baseUrl: base, timeoutMs = TIMEOUT_MS, fetchFn = fetch, sleep = defaultSleep }) {
        // The secret lives only in this private field, so logging the client
        // object never prints it.
        this.#headers = {
            'x-key': key,
            'x-secret': secret,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.#baseUrl = base;
        this.#timeoutMs = timeoutMs;
        this.#fetch = fetchFn;
        this.#sleep = sleep;
    }

    get(path, { query } = {}) {
        return this.#request('GET', path, { query });
    }

    post(path, body, { idempotencyKey } = {}) {
        return this.#request('POST', path, { body, idempotencyKey });
    }

    put(path, body) {
        return this.#request('PUT', path, { body });
    }

    delete(path) {
        return this.#request('DELETE', path, {});
    }

    async #request(method, path, { query, body, idempotencyKey }) {
        // Reads are safe to repeat. A repeated write can happen twice, so POST
        // is never retried here; to retry a send, reuse its Idempotency-Key.
        const maxAttempts = method === 'GET' ? MAX_GET_ATTEMPTS : 1;
        for (let attempt = 1; ; attempt++) {
            const outcome = await this.#attempt(method, path, { query, body, idempotencyKey });
            if (outcome.ok) {
                return outcome.body;
            }
            const retryable = outcome.error.status === 429 || outcome.error.status >= 500;
            if (attempt >= maxAttempts || !retryable) {
                throw outcome.error;
            }
            await this.#sleep(backoffMs(attempt, outcome.retryAfter));
        }
    }

    async #attempt(method, path, { query, body, idempotencyKey }) {
        const headers = Object.assign({}, this.#headers);
        if (idempotencyKey) {
            headers['Idempotency-Key'] = idempotencyKey;
        }
        let response;
        try {
            response = await this.#fetch(buildUrl(this.#baseUrl, path, query), {
                method,
                headers,
                body: body === undefined ? undefined : JSON.stringify(body),
                signal: AbortSignal.timeout(this.#timeoutMs)
            });
        } catch (err) {
            const timedOut = err && err.name === 'TimeoutError';
            return {
                ok: false,
                error: new DcError({
                    status: 0,
                    body: null,
                    requestId: null,
                    fallbackTitle: timedOut ? 'Timeout' : 'Network error',
                    fallbackDetail: timedOut
                        ? 'No response within ' + Math.round(this.#timeoutMs / 1000) + ' seconds.'
                        : 'Could not reach the API: ' + describeNetworkError(err)
                })
            };
        }

        const text = await response.text();
        const parsed = parseJson(text);
        const requestId = requestIdFrom(parsed, response);

        if (!response.ok) {
            return {
                ok: false,
                retryAfter: response.headers.get('retry-after'),
                error: new DcError({
                    status: response.status,
                    body: parsed === undefined ? text : parsed,
                    requestId,
                    fallbackTitle: 'HTTP ' + response.status
                })
            };
        }
        if (text.trim() !== '' && parsed === undefined) {
            return {
                ok: false,
                error: new DcError({
                    status: response.status,
                    body: text,
                    requestId,
                    fallbackTitle: 'Unexpected response',
                    fallbackDetail: 'The response was not JSON.'
                })
            };
        }
        return { ok: true, body: parsed === undefined ? null : parsed };
    }
}

function clientFromEnv(env) {
    const credentials = readCredentials(env);
    return new DcClient({ key: credentials.key, secret: credentials.secret, baseUrl: baseUrl(env) });
}

function newIdempotencyKey() {
    return randomUUID();
}

// Errors are RFC 9457 problem details, but a few routes answer with
// {"message": ...} (rate limit) or {"error": ..., "message": ...} (plan gates).
// Some routes also put a stable snake_case reason in `code` or `details.code`.
function problemFields(body) {
    if (body === null || typeof body !== 'object') {
        return { title: null, detail: null, code: null };
    }
    const details = body.details !== null && typeof body.details === 'object' ? body.details : {};
    return {
        title: stringOrNull(body.title) || stringOrNull(body.error),
        detail: stringOrNull(body.detail) || stringOrNull(body.message),
        code: stringOrNull(body.code) || stringOrNull(details.code)
    };
}

function stringOrNull(value) {
    return typeof value === 'string' && value !== '' ? value : null;
}

function requestIdFrom(parsed, response) {
    if (parsed && typeof parsed === 'object') {
        if (parsed.meta && typeof parsed.meta.request_id === 'string') {
            return parsed.meta.request_id;
        }
        if (typeof parsed.request_id === 'string') {
            return parsed.request_id;
        }
    }
    return response.headers.get('x-request-id');
}

function parseJson(text) {
    if (text === '') {
        return undefined;
    }
    try {
        return JSON.parse(text);
    } catch (err) {
        return undefined;
    }
}

function buildUrl(base, path, query) {
    const url = new URL(base + path);
    if (query) {
        const names = Object.keys(query);
        for (let i = 0; i < names.length; i++) {
            url.searchParams.set(names[i], String(query[names[i]]));
        }
    }
    return url;
}

// Honor Retry-After when the server sends one. A 429 from the rate limit has
// no Retry-After, so fall back to exponential backoff with jitter.
function backoffMs(attempt, retryAfter) {
    const fromHeader = retryAfterMs(retryAfter);
    if (fromHeader !== null) {
        return Math.min(fromHeader, MAX_BACKOFF_MS);
    }
    const base = Math.min(500 * 2 ** (attempt - 1), MAX_BACKOFF_MS);
    return base / 2 + Math.random() * (base / 2);
}

function retryAfterMs(value) {
    if (value === null || value === undefined) {
        return null;
    }
    if (/^\d+$/.test(value.trim())) {
        return Number(value) * 1000;
    }
    const date = Date.parse(value);
    return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
}

function describeNetworkError(err) {
    const cause = err && err.cause && err.cause.code ? ' (' + err.cause.code + ')' : '';
    return ((err && err.message) || 'unknown error') + cause;
}

function defaultSleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

export { DcClient, DcError, clientFromEnv, newIdempotencyKey };
