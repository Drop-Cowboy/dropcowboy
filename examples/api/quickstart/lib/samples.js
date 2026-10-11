// Send only to people who agreed to hear from you. Test with numbers you own.
//
// The ids, phone numbers and hosts in our docs are samples. They exist on no
// account, so a request that carries one fails. Catch that before sending.

import { readFixture } from './fixtures.js';

const SAMPLE_MESSAGE = 'this is a sample value from our docs; use your own';

function loadSampleValues() {
    const raw = readFixture('doc-sample-values.json');
    return {
        ids: new Set((raw.ids || []).map((id) => String(id).toLowerCase())),
        phoneNumbers: new Set(raw.phone_numbers || []),
        urlHosts: new Set((raw.url_hosts || []).map((host) => String(host).toLowerCase()))
    };
}

function hostOf(value) {
    try {
        return new URL(value).hostname.toLowerCase();
    } catch {
        return null;
    }
}

// True when `value` (an id, a number or a URL) is one of the doc samples.
function isSampleValue(value, samples) {
    if (typeof value !== 'string') {
        return false;
    }
    const trimmed = value.trim();
    if (samples.ids.has(trimmed.toLowerCase()) || samples.phoneNumbers.has(trimmed)) {
        return true;
    }
    const host = hostOf(trimmed);
    return host !== null && samples.urlHosts.has(host);
}

// Checks every DC_ variable (each comma separated item too). Returns one
// message per sample value found; an empty list means none.
function findSampleValues(env, samples = loadSampleValues()) {
    const found = [];
    const names = Object.keys(env).filter((name) => name.startsWith('DC_')).sort();
    for (let i = 0; i < names.length; i++) {
        const value = env[names[i]];
        if (typeof value !== 'string') {
            continue;
        }
        const items = value.split(',');
        for (let j = 0; j < items.length; j++) {
            if (isSampleValue(items[j], samples)) {
                found.push(names[i] + '=' + items[j].trim() + ': ' + SAMPLE_MESSAGE + '.');
            }
        }
    }
    return found;
}

export { SAMPLE_MESSAGE, findSampleValues, isSampleValue, loadSampleValues };
