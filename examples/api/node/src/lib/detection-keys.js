// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// A temporary Detection key for one run of the detect-twilio recipe, made with
// your API key. The key appears in the TwiML, and so in the Twilio Console
// request logs, which is why the recipe deletes it at the end.

import { DcError } from './client.js';
import { lastFour } from './config.js';

const TEMPORARY_KEY_NAME = 'Twilio detection recipe (temporary)';
const TEMPORARY_KEY_SECONDS = 3600;
const KEYS_PATH = '/register/public/detection-keys';

const CREATE_HINTS = {
    'byoc-required': 'Detection keys need Building Blocks on your account. Enable Building Blocks, then run this again.',
    'team-not-verified': 'Finish verifying your account in the dashboard, then run this again.',
    'trial_feature_blocked': 'Detection keys are not available on a trial account. Choose a plan, then run this again.'
};

// Deletes keys left by a run that was killed before it could clean up, then
// creates a fresh key. Returns { keyId, apiKey }.
async function createTemporaryKey({ client, out }) {
    const listed = await client.get(KEYS_PATH);
    const keys = listed && Array.isArray(listed.data) ? listed.data : [];
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] && keys[i].name === TEMPORARY_KEY_NAME) {
            await client.delete(KEYS_PATH + '/' + encodeURIComponent(keys[i].key_id));
            out.log('Deleted a temporary Detection key left by an earlier run: key_id=' + keys[i].key_id);
        }
    }

    let created;
    try {
        created = await client.post(KEYS_PATH, { name: TEMPORARY_KEY_NAME, expires_in_seconds: TEMPORARY_KEY_SECONDS });
    } catch (err) {
        if (err instanceof DcError && err.status === 403 && Object.prototype.hasOwnProperty.call(CREATE_HINTS, err.code)) {
            err.hint = CREATE_HINTS[err.code];
        }
        throw err;
    }
    const data = created && created.data ? created.data : {};
    out.log('Temporary Detection key created: key_id=' + data.key_id + ' (key ends in ' + lastFour(data.api_key) + ', expires in one hour)');
    return { keyId: data.key_id, apiKey: data.api_key };
}

function deleteKey({ client, keyId }) {
    return client.delete(KEYS_PATH + '/' + encodeURIComponent(keyId));
}

export { CREATE_HINTS, KEYS_PATH, TEMPORARY_KEY_NAME, TEMPORARY_KEY_SECONDS, createTemporaryKey, deleteKey };
