// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// The few Twilio REST calls the detect-twilio recipe makes, over plain HTTPS
// with fetch. No Twilio SDK. Also the X-Twilio-Signature check that proves a
// request to your receiver came from Twilio.
//
//   X-Twilio-Signature  base64 of HMAC-SHA1, keyed with your auth token, over
//                       the URL Twilio called followed by every POST parameter
//                       name and value, sorted by name, with nothing between.

import { createHmac, timingSafeEqual } from 'node:crypto';
import { backoffMs, defaultSleep, describeNetworkError } from './client.js';
import { lastFour } from './config.js';

const DEFAULT_TWILIO_BASE_URL = 'https://api.twilio.com';
const TIMEOUT_MS = 30000;
const MAX_GET_ATTEMPTS = 3;
const CALL_ENDED_CODE = 21220;

const TWILIO_HINTS = {
    21210: 'TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.',
    21212: 'TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it.',
    21215: 'Twilio\'s Voice geographic permissions block calls to this country. Enable it in the Twilio Console.',
    21219: 'Trial accounts can call only verified numbers. Upgrade the Twilio account to run this recipe.',
    20003: 'Twilio rejected TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN.'
};

// What Twilio said, and nothing that was sent. The message is redacted before
// it is stored, because Twilio repeats the request path, and so the Account
// SID, in some messages.
class TwilioError extends Error {
    constructor({ status, body, fallbackMessage, redact }) {
        const fields = body !== null && typeof body === 'object' ? body : {};
        const message = typeof fields.message === 'string' && fields.message !== '' ? fields.message : (fallbackMessage || 'HTTP ' + status);
        super(redact(message));
        this.name = 'TwilioError';
        this.status = status;
        this.code = fields.code === undefined || fields.code === null ? null : Number(fields.code);
        this.moreInfo = typeof fields.more_info === 'string' ? redact(fields.more_info) : null;
    }

    // True when Twilio says the call is already over: a 404 on the call, or
    // error 21220 (the call is not in progress).
    get callAlreadyEnded() {
        return this.status === 404 || this.code === CALL_ENDED_CODE;
    }
}

class TwilioClient {
    #authorization;
    #accountSid;
    #baseUrl;
    #timeoutMs;
    #fetch;
    #sleep;
    #redact;

    constructor({ accountSid, authToken, baseUrl = DEFAULT_TWILIO_BASE_URL, timeoutMs = TIMEOUT_MS, fetchFn = fetch, sleep = defaultSleep }) {
        // The auth token lives only in this private field, so logging the
        // client object never prints it.
        this.#authorization = 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64');
        this.#accountSid = accountSid;
        this.#baseUrl = baseUrl.replace(/\/+$/, '');
        this.#timeoutMs = timeoutMs;
        this.#fetch = fetchFn;
        this.#sleep = sleep;
        this.#redact = function (text) {
            let safe = String(text);
            if (authToken) {
                safe = safe.split(authToken).join('[auth token]');
            }
            if (accountSid) {
                safe = safe.split(accountSid).join('AC...' + lastFour(accountSid));
            }
            return safe;
        };
    }

    getAccount() {
        return this.#request('GET', '.json');
    }

    listIncomingNumbers(phoneNumber) {
        return this.#request('GET', '/IncomingPhoneNumbers.json', { query: { PhoneNumber: phoneNumber } });
    }

    listCallerIds(phoneNumber) {
        return this.#request('GET', '/OutgoingCallerIds.json', { query: { PhoneNumber: phoneNumber } });
    }

    // form: [name, value] pairs, so a name can repeat (StatusCallbackEvent).
    createCall(form) {
        return this.#request('POST', '/Calls.json', { form });
    }

    updateCall(callSid, form) {
        return this.#request('POST', '/Calls/' + encodeURIComponent(callSid) + '.json', { form });
    }

    async #request(method, suffix, { query, form } = {}) {
        // A repeated POST could place a second call, so only reads retry.
        const maxAttempts = method === 'GET' ? MAX_GET_ATTEMPTS : 1;
        for (let attempt = 1; ; attempt++) {
            const outcome = await this.#attempt(method, suffix, { query, form });
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

    async #attempt(method, suffix, { query, form }) {
        const url = new URL(this.#baseUrl + '/2010-04-01/Accounts/' + encodeURIComponent(this.#accountSid) + suffix);
        if (query) {
            const names = Object.keys(query);
            for (let i = 0; i < names.length; i++) {
                url.searchParams.set(names[i], String(query[names[i]]));
            }
        }
        const headers = { 'Authorization': this.#authorization, 'Accept': 'application/json' };
        if (form) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        let response;
        try {
            response = await this.#fetch(url, {
                method,
                headers,
                body: form ? new URLSearchParams(form).toString() : undefined,
                signal: AbortSignal.timeout(this.#timeoutMs)
            });
        } catch (err) {
            const timedOut = err && err.name === 'TimeoutError';
            return {
                ok: false,
                error: new TwilioError({
                    status: 0,
                    body: null,
                    fallbackMessage: timedOut
                        ? 'No response from Twilio within ' + Math.round(this.#timeoutMs / 1000) + ' seconds.'
                        : 'Could not reach Twilio: ' + describeNetworkError(err),
                    redact: this.#redact
                })
            };
        }

        const text = await response.text();
        const parsed = parseJson(text);
        if (!response.ok) {
            return {
                ok: false,
                retryAfter: response.headers.get('retry-after'),
                error: new TwilioError({ status: response.status, body: parsed === undefined ? null : parsed, redact: this.#redact })
            };
        }
        if (text.trim() !== '' && parsed === undefined) {
            return {
                ok: false,
                error: new TwilioError({ status: response.status, body: null, fallbackMessage: 'Twilio answered with something that is not JSON.', redact: this.#redact })
            };
        }
        return { ok: true, body: parsed === undefined ? null : parsed };
    }
}

// The base64 signature Twilio would send for this URL and these parameters.
// params: an object, or [name, value] pairs when a name repeats.
function twilioSignature({ url, params, authToken }) {
    const pairs = toPairs(params);
    // Sort by name in byte order. The sort is stable, so the values of a
    // repeated name keep the order they arrived in.
    pairs.sort(function (a, b) {
        return Buffer.compare(Buffer.from(a[0], 'utf8'), Buffer.from(b[0], 'utf8'));
    });
    const hmac = createHmac('sha1', authToken);
    hmac.update(url, 'utf8');
    for (let i = 0; i < pairs.length; i++) {
        hmac.update(pairs[i][0], 'utf8');
        hmac.update(pairs[i][1], 'utf8');
    }
    return hmac.digest('base64');
}

// url: the public URL Twilio called, which is DC_PUBLIC_URL plus the route.
// Never rebuild it from the Host header: a tunnel rewrites that.
function verifyTwilioSignature({ url, params, signature, authToken }) {
    if (typeof signature !== 'string' || signature.trim() === '' || typeof authToken !== 'string' || authToken === '') {
        return false;
    }
    const expected = Buffer.from(twilioSignature({ url, params, authToken }), 'utf8');
    const received = Buffer.from(signature.trim(), 'utf8');
    return received.length === expected.length && timingSafeEqual(received, expected);
}

function toPairs(params) {
    if (params instanceof URLSearchParams) {
        return Array.from(params.entries());
    }
    if (Array.isArray(params)) {
        return params.map(function (pair) {
            return [String(pair[0]), String(pair[1])];
        });
    }
    const pairs = [];
    const names = Object.keys(params || {});
    for (let i = 0; i < names.length; i++) {
        const value = params[names[i]];
        const values = Array.isArray(value) ? value : [value];
        for (let j = 0; j < values.length; j++) {
            pairs.push([names[i], String(values[j])]);
        }
    }
    return pairs;
}

function twilioHint(code) {
    return Object.prototype.hasOwnProperty.call(TWILIO_HINTS, code) ? TWILIO_HINTS[code] : null;
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

export {
    CALL_ENDED_CODE,
    DEFAULT_TWILIO_BASE_URL,
    TWILIO_HINTS,
    TwilioClient,
    TwilioError,
    twilioHint,
    twilioSignature,
    verifyTwilioSignature
};
