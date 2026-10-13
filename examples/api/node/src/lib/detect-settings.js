// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// Reads and checks every setting of the detect-twilio recipe before it makes
// a request. It collects every problem instead of stopping at the first, so
// one run tells you everything to fix.

import { RecipeError, baseUrl, optionalVar, receiverPort } from './config.js';
import { findSampleValues, isSampleValue, sampleMessage } from './sample-values.js';
import { DEFAULT_TWILIO_BASE_URL } from './twilio.js';

const DEFAULT_DETECTION_URL = 'wss://detect.dropcowboy.com/carrier/ws/twilio';
const STRATEGIES = ['standard', 'beep_only', 'live_check'];
const E164 = /^\+\d{8,15}$/;
const ACCOUNT_SID = /^AC[0-9a-fA-F]{32}$/;
const ZERO_ACCOUNT_SID = /^AC0{32}$/;
const MAX_MESSAGE_CHARACTERS = 1000;

const RANGES = {
    DC_DETECTION_TIMEOUT_SEC: { min: 5, max: 120, fallback: 45 },
    DC_BEEP_WAIT_SECONDS: { min: 1, max: 60, fallback: 20 },
    DC_RING_SECONDS: { min: 5, max: 60, fallback: 30 },
    DC_WAIT_SECONDS: { min: 60, max: 600, fallback: 180 }
};

// Returns the settings, or throws one RecipeError that lists every problem.
function detectSettingsFromEnv(env) {
    const problems = [];
    const value = function (name) {
        return optionalVar(env, name);
    };

    // 1. Required settings.
    const required = [
        ['TWILIO_ACCOUNT_SID', 'Copy it from the Twilio Console. It starts with AC.'],
        ['TWILIO_AUTH_TOKEN', 'Copy it from the Twilio Console.'],
        ['TWILIO_FROM', 'Use a number in your Twilio account, or a verified caller ID on it.'],
        ['DC_TO', 'Use a number you own, or one that agreed to hear from you.'],
        ['DC_PUBLIC_URL', 'Set it to the https:// address of a tunnel to this machine.']
    ];
    for (let i = 0; i < required.length; i++) {
        if (value(required[i][0]) === null) {
            problems.push(required[i][0] + ' is not set. ' + required[i][1]);
        }
    }
    if (value('DC_VM_AUDIO_URL') === null && value('DC_VM_TEXT') === null) {
        problems.push('Set DC_VM_AUDIO_URL (an https:// .mp3 or .wav that Twilio plays on the beep) or DC_VM_TEXT (text Twilio speaks on the beep).');
    }
    const detectionKey = value('DC_DETECTION_KEY');
    const hasApiKey = value('DC_KEY') !== null && value('DC_SECRET') !== null;
    if (detectionKey === null && !hasApiKey) {
        problems.push('Set DC_DETECTION_KEY to a Detection key, or set DC_KEY and DC_SECRET so the recipe creates a temporary Detection key and deletes it at the end.');
    }

    // 2. Phone numbers.
    const numbers = ['DC_TO', 'TWILIO_FROM'];
    for (let i = 0; i < numbers.length; i++) {
        const number = value(numbers[i]);
        if (number !== null && !E164.test(number)) {
            problems.push(numbers[i] + ' must be in E.164 format: a plus sign, then 8 to 15 digits with the country code (for example +13125550142).');
        }
    }

    // 3. Account SID shape.
    const accountSid = value('TWILIO_ACCOUNT_SID');
    if (accountSid !== null && !ACCOUNT_SID.test(accountSid)) {
        problems.push('TWILIO_ACCOUNT_SID must be AC followed by 32 hexadecimal characters. Copy it from the Twilio Console.');
    }

    // 4. Addresses.
    const publicUrl = value('DC_PUBLIC_URL');
    if (publicUrl !== null) {
        const problem = publicUrlProblem(publicUrl);
        if (problem !== null) {
            problems.push(problem);
        }
    }
    const detectionUrl = value('DC_DETECTION_URL') || DEFAULT_DETECTION_URL;
    if (!/^wss:\/\/[^/\s]+/i.test(detectionUrl)) {
        problems.push('DC_DETECTION_URL must start with wss://. Leave it empty to use ' + DEFAULT_DETECTION_URL + '.');
    }
    const twilioBaseUrl = (value('TWILIO_BASE_URL') || DEFAULT_TWILIO_BASE_URL).replace(/\/+$/, '');
    if (!/^https?:\/\/[^/\s]+/i.test(twilioBaseUrl)) {
        problems.push('TWILIO_BASE_URL must be a full URL. Leave it empty to use ' + DEFAULT_TWILIO_BASE_URL + '.');
    }

    // 5. Messages.
    const audioNames = ['DC_VM_AUDIO_URL', 'DC_LIVE_AUDIO_URL'];
    for (let i = 0; i < audioNames.length; i++) {
        const url = value(audioNames[i]);
        if (url !== null && !isAudioUrl(url)) {
            problems.push(audioNames[i] + ' must be a public https:// address of an .mp3 or .wav file.');
        }
    }
    const textNames = ['DC_VM_TEXT', 'DC_LIVE_TEXT'];
    for (let i = 0; i < textNames.length; i++) {
        const text = value(textNames[i]);
        if (text !== null && Array.from(text).length > MAX_MESSAGE_CHARACTERS) {
            problems.push(textNames[i] + ' is ' + Array.from(text).length + ' characters. Keep it to ' + MAX_MESSAGE_CHARACTERS.toLocaleString('en-US') + ' or fewer.');
        }
    }

    // 6. Numbers and ranges.
    const ranges = {};
    const rangeNames = Object.keys(RANGES);
    for (let i = 0; i < rangeNames.length; i++) {
        const name = rangeNames[i];
        const raw = value(name);
        const range = RANGES[name];
        if (raw === null) {
            ranges[name] = range.fallback;
        } else if (name === 'DC_WAIT_SECONDS' && raw === '0') {
            problems.push('DC_WAIT_SECONDS=0 does not work for this recipe: it has to listen for Detection. Use a whole number from 60 to 600 (default 180).');
        } else if (!/^\d+$/.test(raw) || Number(raw) < range.min || Number(raw) > range.max) {
            problems.push(name + ' must be a whole number from ' + range.min + ' to ' + range.max + ' (default ' + range.fallback + ').');
        } else {
            ranges[name] = Number(raw);
        }
    }
    let liveConfidence = 0.6;
    const rawConfidence = value('DC_LIVE_CONFIDENCE');
    if (rawConfidence !== null) {
        if (!/^(\d+(\.\d*)?|\.\d+)$/.test(rawConfidence) || Number(rawConfidence) > 1) {
            problems.push('DC_LIVE_CONFIDENCE must be a number from 0 to 1 (default 0.6).');
        } else {
            liveConfidence = Number(rawConfidence);
        }
    }
    let port = null;
    try {
        port = receiverPort(env);
    } catch (err) {
        problems.push(err.message);
    }

    // 7. Strategy.
    const strategy = value('DC_DETECTION_STRATEGY') || 'standard';
    if (!STRATEGIES.includes(strategy)) {
        problems.push('DC_DETECTION_STRATEGY must be one of ' + STRATEGIES.join(', ') + ' (default standard).');
    }

    // 8. Values copied from our docs and fixtures.
    const samples = findSampleValues(env);
    for (let i = 0; i < samples.length; i++) {
        problems.push(samples[i]);
    }
    const from = value('TWILIO_FROM');
    if (from !== null && isSampleValue(from)) {
        problems.push(sampleMessage('TWILIO_FROM', from));
    }
    if (accountSid !== null && ZERO_ACCOUNT_SID.test(accountSid)) {
        problems.push('TWILIO_ACCOUNT_SID=' + accountSid + ': this is the placeholder from our fixtures; use your own.');
    }

    if (problems.length > 0) {
        throw new RecipeError(problems.join('\n'));
    }

    const vmAudio = value('DC_VM_AUDIO_URL');
    const liveAudio = value('DC_LIVE_AUDIO_URL');
    const liveText = value('DC_LIVE_TEXT');
    const voicemailMessage = vmAudio !== null ? { kind: 'play', value: vmAudio } : { kind: 'say', value: value('DC_VM_TEXT') };
    let liveMessage = voicemailMessage;
    if (liveAudio !== null) {
        liveMessage = { kind: 'play', value: liveAudio };
    } else if (liveText !== null) {
        liveMessage = { kind: 'say', value: liveText };
    }

    return {
        accountSid,
        authToken: value('TWILIO_AUTH_TOKEN'),
        from,
        to: value('DC_TO'),
        twilioBaseUrl,
        publicUrl: publicUrl.replace(/\/+$/, ''),
        detectionKey,
        dcBaseUrl: baseUrl(env),
        detectionUrl,
        voicemailMessage,
        liveMessage,
        liveFallsBackToVoicemail: liveAudio === null && liveText === null,
        strategy,
        detectionTimeoutSec: ranges.DC_DETECTION_TIMEOUT_SEC,
        liveConfidence,
        beepWaitSeconds: ranges.DC_BEEP_WAIT_SECONDS,
        ringSeconds: ranges.DC_RING_SECONDS,
        waitSeconds: ranges.DC_WAIT_SECONDS,
        port
    };
}

// Twilio and Detection both call this address from the internet, and
// Detection posts only to https:// on port 443. Returns a message, or null
// when the address is usable.
function publicUrlProblem(value) {
    const label = 'DC_PUBLIC_URL=' + value + ': ';
    let url;
    try {
        url = new URL(value);
    } catch (err) {
        return label + 'not a full URL. Use the https:// address of your tunnel, for example https://abc123.example.org';
    }
    if (url.protocol !== 'https:') {
        return label + 'must start with https://. Detection posts webhooks only to https:// on port 443.';
    }
    // URL drops the default port, so an explicit :443 is fine and any other
    // port shows up here.
    if (url.port !== '') {
        return label + 'must not name a port other than 443. Detection posts webhooks only to port 443.';
    }
    if (value.includes('?') || value.includes('#')) {
        return label + 'must not have a query string or a fragment. Use only the address of your tunnel.';
    }
    if (!isPublicHost(url.hostname)) {
        return label + 'must be a public address. Twilio and Detection cannot reach localhost, .local names or private and link-local addresses. Use the address of your tunnel.';
    }
    return null;
}

function isPublicHost(hostname) {
    const host = hostname.replace(/^\[|\]$/g, '').toLowerCase();
    if (host === '' || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) {
        return false;
    }
    const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
    if (ipv4) {
        const a = Number(ipv4[1]);
        const b = Number(ipv4[2]);
        return !(a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168));
    }
    if (host.includes(':')) {
        return !(host === '::' || host === '::1' || host.startsWith('::ffff:') || /^f[cd]/.test(host) || /^fe[89ab]/.test(host));
    }
    return true;
}

function isAudioUrl(value) {
    let url;
    try {
        url = new URL(value);
    } catch (err) {
        return false;
    }
    return url.protocol === 'https:' && /\.(mp3|wav)$/i.test(url.pathname);
}

export { DEFAULT_DETECTION_URL, MAX_MESSAGE_CHARACTERS, STRATEGIES, detectSettingsFromEnv, isPublicHost, publicUrlProblem };
