// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Builds the POST /rvm body and sends it.

import { randomUUID } from 'node:crypto';
import { RecipeError, optionalVar } from './config.js';
import { newIdempotencyKey } from './client.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ATTESTATIONS = ['A', 'B', 'C'];

// Give exactly one of phoneLineId or callerId:
//   phoneLineId  send from a phone line. The platform picks one of its numbers.
//   callerId     BYOC only: your own number at your carrier, shown as given.
// `audio` is the field (or field pair) from resolveAudio(). Fields that are
// null are left out, so the body holds only what the route needs.
function buildRvmBody({ to, phoneLineId, callerId, audio, byoc, foreignId, callbackUrl }) {
    const body = { to };
    if (phoneLineId) {
        body.phone_line_id = phoneLineId;
    }
    if (callerId) {
        body.caller_id = callerId;
    }
    Object.assign(body, audio);
    if (byoc) {
        body.byoc = byoc;
    }
    body.foreign_id = foreignId;
    if (callbackUrl) {
        body.callback_url = callbackUrl;
    }
    return body;
}

// Optional STIR/SHAKEN details for a BYOC send. Both values or neither.
// Attestation: The level your carrier assigned to the number: A, B or C. Never send a higher level than your carrier gave you.
function byocFromEnv(env) {
    const origId = optionalVar(env, 'DC_STI_ORIG_ID');
    const attestation = optionalVar(env, 'DC_STI_ATTESTATION');
    if (origId === null && attestation === null) {
        return null;
    }
    if (origId === null || attestation === null) {
        throw new RecipeError('Set both DC_STI_ORIG_ID and DC_STI_ATTESTATION, or neither.');
    }
    if (!UUID.test(origId)) {
        throw new RecipeError('DC_STI_ORIG_ID must be a UUID. The API refuses anything else with reason code 3017.');
    }
    if (!ATTESTATIONS.includes(attestation)) {
        throw new RecipeError('DC_STI_ATTESTATION must be A, B or C. The API refuses anything else with reason code 3018. The level your carrier assigned to the number: A, B or C. Never send a higher level than your carrier gave you.');
    }
    return { sti_orig_id: origId, sti_attestation: attestation };
}

// A plain UUID is the foreign_id. The callback echoes it, which is how you
// match a result to the send.
function newForeignId() {
    return randomUUID();
}

// The Idempotency-Key makes a retry of THIS request safe: send the same key
// and body again and the API sends only once. A new send needs a new key.
// The route answers 202 {"status": "queued", "message_id": "..."} with no
// data/meta envelope.
async function sendRvm(client, body) {
    const response = await client.post('/rvm', body, { idempotencyKey: newIdempotencyKey() });
    if (!response || typeof response.message_id !== 'string') {
        throw new RecipeError('POST /rvm answered without a message_id. Check the response from your DC_BASE_URL.');
    }
    return response.message_id;
}

export { buildRvmBody, byocFromEnv, newForeignId, sendRvm };
