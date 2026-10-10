import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { verifySignature } from '../src/lib/verify.js';
import { fixtureJson } from '../testkit/helpers.js';

const vectors = fixtureJson('signature-vectors.json');

function headersFor(overrides = {}) {
    return Object.assign({ 'x-signature': vectors.signature, 'x-timestamp': vectors.timestamp }, overrides);
}

function check(overrides = {}) {
    return verifySignature({
        rawBody: overrides.rawBody === undefined ? vectors.raw_body : overrides.rawBody,
        headers: overrides.headers === undefined ? headersFor() : overrides.headers,
        secrets: overrides.secrets === undefined ? [vectors.secret] : overrides.secrets,
        nowSeconds: overrides.nowSeconds === undefined ? vectors.now_seconds_valid : overrides.nowSeconds
    });
}

describe('verifySignature against the shared vectors', () => {
    it('accepts the vector signature at a valid time', () => {
        assert.deepEqual(check(), { ok: true });
    });

    it('accepts the raw body as bytes, the way Express provides it', () => {
        assert.deepEqual(check({ rawBody: Buffer.from(vectors.raw_body, 'utf8') }), { ok: true });
    });

    it('rejects a stale timestamp', () => {
        assert.deepEqual(check({ nowSeconds: vectors.now_seconds_stale }), { ok: false, code: 'stale_timestamp' });
    });

    it('rejects a timestamp from the future by the same tolerance', () => {
        const farFuture = Number(vectors.timestamp) - vectors.tolerance_seconds - 1;
        assert.deepEqual(check({ nowSeconds: farFuture }), { ok: false, code: 'stale_timestamp' });
    });

    it('rejects a tampered body as invalid_signature', () => {
        assert.deepEqual(check({ rawBody: vectors.tampered_raw_body }), { ok: false, code: 'invalid_signature' });
    });

    it('rejects a body that was parsed and serialized again', () => {
        const reserialized = JSON.stringify(JSON.parse(vectors.raw_body), null, 2);
        assert.deepEqual(check({ rawBody: reserialized }), { ok: false, code: 'invalid_signature' });
    });

    it('rejects a signature made with another secret', () => {
        const headers = headersFor({ 'x-signature': vectors.signature_from_other_secret });
        assert.deepEqual(check({ headers }), { ok: false, code: 'invalid_signature' });
    });

    it('accepts when the second of two secrets matches', () => {
        assert.deepEqual(check({ secrets: [vectors.other_secret, vectors.secret] }), { ok: true });
    });

    it('accepts when the first of two secrets matches', () => {
        assert.deepEqual(check({ secrets: [vectors.secret, vectors.other_secret] }), { ok: true });
    });

    it('rejects when no configured secret matches', () => {
        assert.deepEqual(check({ secrets: [vectors.other_secret] }), { ok: false, code: 'invalid_signature' });
    });

    it('reports a missing signature header', () => {
        const headers = { 'x-timestamp': vectors.timestamp };
        assert.deepEqual(check({ headers }), { ok: false, code: 'missing_signature' });
    });

    it('reports a missing timestamp header', () => {
        const headers = { 'x-signature': vectors.signature };
        assert.deepEqual(check({ headers }), { ok: false, code: 'missing_signature' });
    });

    it('rejects a signature without the sha256= prefix', () => {
        const bare = vectors.signature.replace('sha256=', '');
        assert.deepEqual(check({ headers: headersFor({ 'x-signature': bare }) }), { ok: false, code: 'invalid_signature' });
    });

    it('rejects a signature that is not hex', () => {
        assert.deepEqual(check({ headers: headersFor({ 'x-signature': 'sha256=not-hex' }) }), { ok: false, code: 'invalid_signature' });
    });

    it('treats a non-numeric timestamp as stale', () => {
        const headers = headersFor({ 'x-timestamp': 'yesterday' });
        assert.deepEqual(check({ headers }), { ok: false, code: 'stale_timestamp' });
    });

    it('rejects an unsupported signature version', () => {
        const headers = headersFor({ 'x-signature-version': 'v2' });
        assert.deepEqual(check({ headers }), { ok: false, code: 'invalid_signature' });
    });

    it('accepts the supported signature version', () => {
        const headers = headersFor({ 'x-signature-version': 'v1' });
        assert.deepEqual(check({ headers }), { ok: true });
    });

    it('rejects everything when no secret is configured', () => {
        assert.deepEqual(check({ secrets: [] }), { ok: false, code: 'invalid_signature' });
    });
});
