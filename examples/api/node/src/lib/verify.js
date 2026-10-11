// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Webhook signature check. Each delivery carries:
//   X-Signature  sha256=<hex>  HMAC-SHA256 of  <timestamp> + "." + <raw body>
//   X-Timestamp  Unix seconds when the delivery was signed
//
// Verify the RAW bytes you received. Parsing the JSON and serializing it again
// can change spacing or key order, and then no signature matches.

import { createHmac, timingSafeEqual } from 'node:crypto';

const TOLERANCE_SECONDS = 300;
const SUPPORTED_VERSION = 'v1';
const SIGNATURE_PREFIX = 'sha256=';
const SHA256_HEX = /^[0-9a-f]{64}$/i;

const REJECTED = {
    missing: 'missing_signature',
    stale: 'stale_timestamp',
    invalid: 'invalid_signature'
};

// headers: lower-case header names, as Node and Express provide them.
// secrets: every signing secret you hold. Each webhook has its own, so a
//          delivery is accepted when any one of them matches.
// Returns { ok: true } or { ok: false, code } with a code from REJECTED.
function verifySignature({ rawBody, headers, secrets, nowSeconds = Date.now() / 1000 }) {
    const signature = headerValue(headers, 'x-signature');
    const timestamp = headerValue(headers, 'x-timestamp');
    if (signature === null || timestamp === null) {
        return { ok: false, code: REJECTED.missing };
    }

    if (!/^\d+$/.test(timestamp) || Math.abs(nowSeconds - Number(timestamp)) > TOLERANCE_SECONDS) {
        return { ok: false, code: REJECTED.stale };
    }

    const version = headerValue(headers, 'x-signature-version');
    if (version !== null && version !== SUPPORTED_VERSION) {
        return { ok: false, code: REJECTED.invalid };
    }

    const received = decodeSignature(signature);
    if (received === null) {
        return { ok: false, code: REJECTED.invalid };
    }

    // Check every secret instead of stopping at the first match, so the time
    // taken does not reveal which secret matched.
    let matched = false;
    for (let i = 0; i < secrets.length; i++) {
        const expected = signatureFor({ secret: secrets[i], timestamp, rawBody });
        if (timingSafeEqual(received, expected)) {
            matched = true;
        }
    }
    return matched ? { ok: true } : { ok: false, code: REJECTED.invalid };
}

function signatureFor({ secret, timestamp, rawBody }) {
    return createHmac('sha256', secret).update(timestamp).update('.').update(rawBody).digest();
}

function decodeSignature(signature) {
    if (!signature.startsWith(SIGNATURE_PREFIX)) {
        return null;
    }
    const hex = signature.slice(SIGNATURE_PREFIX.length);
    return SHA256_HEX.test(hex) ? Buffer.from(hex, 'hex') : null;
}

function headerValue(headers, name) {
    const value = headers ? headers[name] : undefined;
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }
    return value.trim();
}

export { REJECTED, TOLERANCE_SECONDS, signatureFor, verifySignature };
