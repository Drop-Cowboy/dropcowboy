// Send only to people who agreed to hear from you. Test with numbers you own.
//
// The ids, phone numbers and hosts in our docs are samples. They exist on no
// account, so a request that carries one fails later, often with nothing more
// than a reason code. Every command checks its settings against this list
// before it makes a request. The list matches ../fixtures/doc-sample-values.json
// (a test keeps the two in step), and is copied here so this folder works on
// its own.

import { RecipeError } from './config.js';

const SAMPLE_MESSAGE = 'this is a sample value from our docs; use your own';

const SAMPLE_VALUES = {
    ids: [
        '1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80',
        'e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28',
        '7d2a9e4b-1c6f-4b3a-8e5d-2f9c7a1b4e63',
        'c4a7e1d2-9b3f-4a68-8d05-2e7f6b1a9c34',
        '55b9e55e-23f1-4c16-8865-f4b6261ebeea',
        'a9c3e8f1-4b2d-4a7c-8e9b-1c2d3e4f5a6b',
        '0786a81e-e11e-4e53-ab64-71f552db23b3',
        '234ecab5-1811-4c7d-a7a9-8c9ad9ca2e08',
        '9c4e7a2f-1b8d-4f3e-a6c5-2d9b4e7f1a63'
    ],
    phone_numbers: [
        '+12125550100',
        '+17735550188',
        '+13125550100'
    ],
    url_hosts: [
        'hooks.example.com',
        'cdn.example.com',
        'media.example.com',
        'files.example.com',
        'receiver.example.com',
        'your-server.example.com'
    ]
};

// True when the value is a sample id, a sample number, or a URL on a sample host.
function isSampleValue(value) {
    if (typeof value !== 'string') {
        return false;
    }
    const trimmed = value.trim();
    if (trimmed === '') {
        return false;
    }
    if (SAMPLE_VALUES.ids.includes(trimmed.toLowerCase()) || SAMPLE_VALUES.phone_numbers.includes(trimmed)) {
        return true;
    }
    const host = hostOf(trimmed);
    return host !== null && SAMPLE_VALUES.url_hosts.includes(host);
}

// Checks every DC_ setting, and each item of a comma separated list. Returns
// one message per sample value found; an empty list means none.
function findSampleValues(env) {
    const found = [];
    const names = Object.keys(env).filter(function (name) {
        return name.startsWith('DC_');
    }).sort();
    for (let i = 0; i < names.length; i++) {
        const value = env[names[i]];
        if (typeof value !== 'string') {
            continue;
        }
        const items = value.split(',');
        for (let j = 0; j < items.length; j++) {
            if (isSampleValue(items[j])) {
                found.push(sampleMessage(names[i], items[j].trim()));
            }
        }
    }
    return found;
}

// Throws a RecipeError naming every sample value, before any request is made.
function refuseSampleValues(env) {
    const found = findSampleValues(env);
    if (found.length > 0) {
        throw new RecipeError(found.join('\n'));
    }
}

function sampleMessage(name, value) {
    return name + '=' + value + ': ' + SAMPLE_MESSAGE + '.';
}

function hostOf(value) {
    if (!/^https?:\/\//i.test(value)) {
        return null;
    }
    try {
        return new URL(value).hostname.toLowerCase();
    } catch (err) {
        return null;
    }
}

export { SAMPLE_MESSAGE, SAMPLE_VALUES, findSampleValues, isSampleValue, refuseSampleValues, sampleMessage };
