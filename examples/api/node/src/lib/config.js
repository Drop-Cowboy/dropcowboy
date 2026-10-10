// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Reads and validates environment variables. Every problem the reader can fix
// in their own setup is a RecipeError: its message is safe to print as it is.

const DEFAULT_BASE_URL = 'https://api-v2.dropcowboy.com';
const DEFAULT_WAIT_SECONDS = 300;
const DEFAULT_PORT = 3000;
const E164 = /^\+[1-9]\d{1,14}$/;

const ROUTES = {
    callback: '/callbacks/dropcowboy',
    webhook: '/webhooks/dropcowboy',
    health: '/health'
};

class RecipeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RecipeError';
    }
}

function optionalVar(env, name) {
    const value = env[name];
    if (value === undefined || value === null) {
        return null;
    }
    const trimmed = String(value).trim();
    return trimmed === '' ? null : trimmed;
}

function requireVar(env, name, hint) {
    const value = optionalVar(env, name);
    if (value === null) {
        throw new RecipeError(name + ' is not set.' + (hint ? ' ' + hint : ''));
    }
    return value;
}

function requireE164(env, name, hint) {
    const value = requireVar(env, name, hint);
    if (!E164.test(value)) {
        throw new RecipeError(name + ' must be in E.164 format: a plus sign, the country code, then the number (for example +13125550142).');
    }
    return value;
}

function readCredentials(env) {
    const missing = [];
    const key = optionalVar(env, 'DC_KEY');
    const secret = optionalVar(env, 'DC_SECRET');
    if (key === null) {
        missing.push('DC_KEY');
    }
    if (secret === null) {
        missing.push('DC_SECRET');
    }
    if (missing.length > 0) {
        throw new RecipeError(missing.join(' and ') + ' not set. Create an API key under Developers > API Keys, then copy .env.example to .env and fill them in.');
    }
    return { key, secret };
}

function baseUrl(env) {
    const value = optionalVar(env, 'DC_BASE_URL') || DEFAULT_BASE_URL;
    return value.replace(/\/+$/, '');
}

function waitSeconds(env) {
    const value = optionalVar(env, 'DC_WAIT_SECONDS');
    if (value === null) {
        return DEFAULT_WAIT_SECONDS;
    }
    if (!/^\d+$/.test(value)) {
        throw new RecipeError('DC_WAIT_SECONDS must be a whole number of seconds. Use 0 to send and exit without waiting.');
    }
    return Number(value);
}

function receiverPort(env) {
    const value = optionalVar(env, 'PORT');
    if (value === null) {
        return DEFAULT_PORT;
    }
    if (!/^\d+$/.test(value) || Number(value) > 65535) {
        throw new RecipeError('PORT must be a number from 0 to 65535.');
    }
    return Number(value);
}

function publicUrl(env) {
    const value = optionalVar(env, 'DC_PUBLIC_URL');
    if (value === null) {
        return null;
    }
    if (!/^https?:\/\/[^/\s]+/i.test(value)) {
        throw new RecipeError('DC_PUBLIC_URL must start with https:// and name the host of your tunnel, for example https://abc123.example.com');
    }
    return value.replace(/\/+$/, '');
}

function callbackUrl(env) {
    const base = publicUrl(env);
    return base === null ? null : base + ROUTES.callback;
}

function splitList(value) {
    if (value === undefined || value === null) {
        return [];
    }
    const parts = String(value).split(',');
    const items = [];
    for (let i = 0; i < parts.length; i++) {
        const item = parts[i].trim();
        if (item !== '') {
            items.push(item);
        }
    }
    return items;
}

function lastFour(secret) {
    return String(secret).slice(-4);
}

export {
    ROUTES,
    RecipeError,
    baseUrl,
    callbackUrl,
    lastFour,
    optionalVar,
    publicUrl,
    readCredentials,
    receiverPort,
    requireE164,
    requireVar,
    splitList,
    waitSeconds
};
