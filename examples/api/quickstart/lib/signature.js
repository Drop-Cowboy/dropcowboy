// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Webhook signatures. Each delivery carries:
//   X-Signature  sha256=<hex HMAC-SHA256 of timestamp + "." + raw body>
//   X-Timestamp  Unix seconds when the delivery was signed
//
// Verify the RAW bytes you received, before parsing. Parsing the JSON and
// serializing it again can change the bytes, and then no signature matches.

import { createHmac, timingSafeEqual } from 'node:crypto';

const TOLERANCE_SECONDS = 300;
const PREFIX = 'sha256=';
const SHA256_HEX = /^[0-9a-f]{64}$/i;

function sign({ secret, timestamp, rawBody }) {
    return PREFIX + createHmac('sha256', secret).update(String(timestamp)).update('.').update(rawBody).digest('hex');
}

function header(headers, name) {
    const value = headers ? headers[name] : undefined;
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

// headers use lower-case names, as Node gives them. Accepts the delivery when
// any one of `secrets` matches (each webhook has its own secret).
// Returns { ok: true } or { ok: false, code }.
function verify({ rawBody, headers, secrets, nowSeconds = Date.now() / 1000 }) {
    const signature = header(headers, 'x-signature');
    const timestamp = header(headers, 'x-timestamp');
    if (signature === null || timestamp === null) {
        return { ok: false, code: 'missing_signature' };
    }
    if (!/^\d+$/.test(timestamp) || Math.abs(nowSeconds - Number(timestamp)) > TOLERANCE_SECONDS) {
        return { ok: false, code: 'stale_timestamp' };
    }
    const version = header(headers, 'x-signature-version');
    if (version !== null && version !== 'v1') {
        return { ok: false, code: 'invalid_signature' };
    }
    if (!signature.startsWith(PREFIX) || !SHA256_HEX.test(signature.slice(PREFIX.length))) {
        return { ok: false, code: 'invalid_signature' };
    }
    const received = Buffer.from(signature.slice(PREFIX.length), 'hex');
    let matched = false;
    for (let i = 0; i < secrets.length; i++) {
        const expected = createHmac('sha256', secrets[i]).update(timestamp).update('.').update(rawBody).digest();
        if (timingSafeEqual(received, expected)) {
            matched = true;
        }
    }
    return matched ? { ok: true } : { ok: false, code: 'invalid_signature' };
}

export { TOLERANCE_SECONDS, sign, verify };
