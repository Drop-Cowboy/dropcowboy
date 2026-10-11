// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Finds the webhook signing secrets the receiver verifies with.

import { lastFour, splitList } from './config.js';

const SIGNING_SECRET_PATH = '/register/public/account/webhook-signing-secret';

// DC_WEBHOOK_SECRET (comma separated) wins. Otherwise load them from the API:
// the endpoint answers one { webhook_id, event_types, hook_type, signing_secret }
// per webhook, each webhook has its own secret, and a delivery is accepted
// when any of them matches. When none can be found the receiver still starts;
// its webhook route answers 503 and the callback route keeps working.
async function loadSigningSecrets({ env, client, out }) {
    const configured = splitList(env.DC_WEBHOOK_SECRET);
    if (configured.length > 0) {
        out.log('Signing secrets: ' + describeLoaded(configured) + ' from DC_WEBHOOK_SECRET');
        return configured;
    }
    if (client === null) {
        out.log('Signing secrets: none. Set DC_WEBHOOK_SECRET, or set DC_KEY and DC_SECRET so they can be loaded. The webhook route will answer 503.');
        return [];
    }

    let body;
    try {
        body = await client.get(SIGNING_SECRET_PATH);
    } catch (err) {
        out.log('Signing secrets: could not load them (' + shortReason(err) + '). The webhook route will answer 503. Set DC_WEBHOOK_SECRET to use your own.');
        return [];
    }

    const secrets = secretsFrom(body);
    if (secrets.length === 0) {
        out.log('Signing secrets: none yet. Run "npm run subscribe" to create a webhook, then restart. The webhook route will answer 503.');
        return [];
    }
    out.log('Signing secrets: ' + describeLoaded(secrets) + ' loaded from ' + SIGNING_SECRET_PATH);
    return secrets;
}

function secretsFrom(body) {
    const rows = body && Array.isArray(body.data) ? body.data : [];
    const secrets = [];
    for (let i = 0; i < rows.length; i++) {
        const value = rows[i] && rows[i].signing_secret;
        if (typeof value === 'string' && value !== '' && !secrets.includes(value)) {
            secrets.push(value);
        }
    }
    return secrets;
}

// Never print a secret. The last four characters are enough to tell which one is loaded.
function describeLoaded(secrets) {
    const tails = [];
    for (let i = 0; i < secrets.length; i++) {
        tails.push('...' + lastFour(secrets[i]));
    }
    return secrets.length + ' (' + tails.join(', ') + ')';
}

function shortReason(err) {
    if (err && typeof err.status === 'number') {
        return 'HTTP ' + err.status + (err.title ? ' ' + err.title : '');
    }
    return (err && err.message) || 'unknown error';
}

export { SIGNING_SECRET_PATH, loadSigningSecrets };
