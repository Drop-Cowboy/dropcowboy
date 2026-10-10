// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Reads settings from the environment, and from a .env file next to
// quickstart.js when there is one. Variables already set in your shell win.

import fs from 'node:fs';

const DEFAULT_BASE_URL = 'https://api-v2.dropcowboy.com';
const DEFAULT_PORT = 3000;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_WAIT_SECONDS = 300;
const DEFAULT_RECEIPT_WAIT_SECONDS = 120;
const AUDIO_MODES = ['upload', 'media', 'url', 'tts'];
const TTS_MAX_CHARACTERS = 1200;
const E164 = /^\+[1-9]\d{1,14}$/;

// A minimal .env reader: NAME=value per line, # starts a comment line,
// optional quotes around the value. No dependency needed.
function loadDotEnv(file, env) {
    if (!fs.existsSync(file)) {
        return false;
    }
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '' || line.startsWith('#')) {
            continue;
        }
        const eq = line.indexOf('=');
        if (eq <= 0) {
            continue;
        }
        const name = line.slice(0, eq).trim().replace(/^export\s+/, '');
        let value = line.slice(eq + 1).trim();
        const quoted = value.length >= 2 && (value[0] === '"' || value[0] === "'") && value[value.length - 1] === value[0];
        if (quoted) {
            value = value.slice(1, -1);
        }
        if (env[name] === undefined) {
            env[name] = value;
        }
    }
    return true;
}

function optional(env, name) {
    const value = env[name];
    if (typeof value !== 'string') {
        return null;
    }
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
}

function splitList(value) {
    if (typeof value !== 'string') {
        return [];
    }
    const parts = value.split(',');
    const items = [];
    for (let i = 0; i < parts.length; i++) {
        const item = parts[i].trim();
        if (item !== '') {
            items.push(item);
        }
    }
    return items;
}

function isTrue(value) {
    return typeof value === 'string' && ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function isHttpUrl(value) {
    let url;
    try {
        url = new URL(value);
    } catch {
        return false;
    }
    return url.protocol === 'https:' || url.protocol === 'http:';
}

// Settings the API key pair needs. Used by every command that calls the API.
function readCredentials(env, errors) {
    const key = optional(env, 'DC_KEY');
    const secret = optional(env, 'DC_SECRET');
    if (key === null || secret === null) {
        errors.push('DC_KEY and DC_SECRET are not set. Copy .env.example to .env and fill them in. Create a key under Developers > API Keys in the dashboard.');
    }
    return { key, secret, baseUrl: (optional(env, 'DC_BASE_URL') || DEFAULT_BASE_URL).replace(/\/+$/, '') };
}

// Settings for the receiver: where it listens and which secrets it verifies with.
function readListenerConfig(env, errors) {
    const portText = optional(env, 'PORT');
    const port = portText === null ? DEFAULT_PORT : Number(portText);
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
        errors.push('PORT must be a port number, for example 3000.');
    }
    return {
        port,
        host: optional(env, 'DC_LISTEN_HOST') || DEFAULT_HOST,
        webhookSecrets: splitList(env.DC_WEBHOOK_SECRET)
    };
}

// Everything the send needs. Returns { config, errors }. Nothing is sent
// when errors is not empty.
function readSendConfig(env) {
    const errors = [];
    const credentials = readCredentials(env, errors);
    const listener = readListenerConfig(env, errors);

    const to = optional(env, 'DC_TO');
    if (to === null) {
        errors.push('DC_TO is not set. Set it to a number you own, in E.164 format such as +13125550142.');
    } else if (!E164.test(to)) {
        errors.push('DC_TO must be in E.164 format: a +, the country code and the number, such as +13125550142.');
    }

    const audio = (optional(env, 'DC_AUDIO') || 'upload').toLowerCase();
    if (!AUDIO_MODES.includes(audio)) {
        errors.push('DC_AUDIO must be one of upload, media, url or tts.');
    }
    const audioFile = optional(env, 'DC_AUDIO_FILE');
    const mediaId = optional(env, 'DC_MEDIA_ID');
    const audioUrl = optional(env, 'DC_AUDIO_URL');
    const ttsBody = optional(env, 'DC_TTS_BODY');
    if (audio === 'upload' && audioFile === null) {
        errors.push('DC_AUDIO=upload needs DC_AUDIO_FILE, the path to an .mp3 or .wav file. To send audio you already uploaded, set DC_AUDIO=media and DC_MEDIA_ID. To speak text, set DC_AUDIO=tts and DC_TTS_BODY.');
    }
    if (audio === 'upload' && audioFile !== null && !/\.(mp3|wav)$/i.test(audioFile)) {
        errors.push('DC_AUDIO_FILE must end in .mp3 or .wav.');
    }
    if (audio === 'media' && mediaId === null) {
        errors.push('DC_AUDIO=media needs DC_MEDIA_ID, the id of a file in your media library.');
    }
    if (audio === 'url' && (audioUrl === null || !isHttpUrl(audioUrl))) {
        errors.push('DC_AUDIO=url needs DC_AUDIO_URL, a public http(s) URL of an MP3 or WAV file.');
    }
    if (audio === 'tts' && ttsBody === null) {
        errors.push('DC_AUDIO=tts needs DC_TTS_BODY, the text to speak.');
    }
    if (audio === 'tts' && ttsBody !== null && ttsBody.length > TTS_MAX_CHARACTERS) {
        errors.push('DC_TTS_BODY is ' + ttsBody.length + ' characters. The limit is ' + TTS_MAX_CHARACTERS + ', counted after merge fields are filled in.');
    }

    const publicUrlText = optional(env, 'DC_PUBLIC_URL');
    if (publicUrlText !== null && !isHttpUrl(publicUrlText)) {
        errors.push('DC_PUBLIC_URL must be the https:// address your tunnel gives you, with no path.');
    }

    const waitText = optional(env, 'DC_WAIT_SECONDS');
    const waitSeconds = waitText === null ? DEFAULT_WAIT_SECONDS : Number(waitText);
    if (!Number.isInteger(waitSeconds) || waitSeconds < 0) {
        errors.push('DC_WAIT_SECONDS must be a whole number of seconds, 0 or more.');
    }

    const manageWebhook = isTrue(env.DC_MANAGE_WEBHOOK);
    if (manageWebhook && publicUrlText === null) {
        errors.push('DC_MANAGE_WEBHOOK=true needs DC_PUBLIC_URL, the https:// address of your tunnel. The webhook it creates points there.');
    }
    if (manageWebhook && waitSeconds === 0) {
        errors.push('DC_MANAGE_WEBHOOK=true needs DC_WAIT_SECONDS above 0, because the webhook is deleted when the run ends.');
    }
    const receiptWaitText = optional(env, 'DC_RECEIPT_WAIT_SECONDS');
    const receiptWaitSeconds = receiptWaitText === null ? DEFAULT_RECEIPT_WAIT_SECONDS : Number(receiptWaitText);
    if (!Number.isInteger(receiptWaitSeconds) || receiptWaitSeconds < 0) {
        errors.push('DC_RECEIPT_WAIT_SECONDS must be a whole number of seconds, 0 or more.');
    }

    return {
        errors,
        config: {
            manageWebhook,
            receiptWaitSeconds,
            showPayloads: manageWebhook || isTrue(env.DC_SHOW_PAYLOADS),
            key: credentials.key,
            secret: credentials.secret,
            baseUrl: credentials.baseUrl,
            to,
            phoneLineId: optional(env, 'DC_PHONE_LINE_ID'),
            audio,
            audioFile,
            mediaName: optional(env, 'DC_MEDIA_NAME'),
            mediaId,
            audioUrl,
            ttsBody,
            voiceId: optional(env, 'DC_VOICE_ID'),
            publicUrl: publicUrlText === null ? null : publicUrlText.replace(/\/+$/, ''),
            port: listener.port,
            host: listener.host,
            webhookSecrets: listener.webhookSecrets,
            waitSeconds
        }
    };
}

function lastFour(value) {
    return typeof value === 'string' && value.length > 4 ? value.slice(-4) : '****';
}

export { AUDIO_MODES, DEFAULT_BASE_URL, TTS_MAX_CHARACTERS, isHttpUrl, lastFour, loadDotEnv, optional, readCredentials, readListenerConfig, readSendConfig, splitList };
