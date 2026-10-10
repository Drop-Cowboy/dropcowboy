#!/usr/bin/env node
// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Drop Cowboy ringless voicemail quickstart. Node 20 or newer, no dependencies.
//
//   node quickstart.js                       preflight, send one voicemail, wait for the result
//   node quickstart.js listen                run only the receiver
//                                            DC_MANAGE_WEBHOOK=true also creates a webhook for the run,
//                                            verifies and prints each delivery, and deletes it at the end
//   node quickstart.js check-receiver <callback-url> [webhook-url]
//                                            post a sample result to your endpoints
//
// Settings come from the environment or from .env next to this file. See
// .env.example and README.md.

import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ApiError, createClient, dataOf } from './lib/api.js';
import { resolveAudio } from './lib/audio.js';
import { checkReceiver } from './lib/check-receiver.js';
import { lastFour, loadDotEnv, readCredentials, readListenerConfig, readSendConfig, splitList } from './lib/env.js';
import { CALLBACK_PATH, HEALTH_PATH, WEBHOOK_PATH, startListener, summarize } from './lib/listener.js';
import { API_LOGS_HINT, AUDIO_URL_SUPPORT, CONSENT_LINE, OUTCOMES_URL, reasonMeaning } from './lib/messages.js';
import { SAMPLE_MESSAGE, findSampleValues, isSampleValue, loadSampleValues } from './lib/samples.js';
import { Stop } from './lib/stop.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const READINESS_PATH = '/register/public/integration-readiness';
const SIGNING_SECRET_PATH = '/register/public/account/webhook-signing-secret';
const LINES_PATH = '/phone/public/lines';
const WEBHOOKS_PATH = '/register/public/webhooks';
const WEBHOOK_NAME = 'Quickstart (temporary)';
const WEBHOOK_EVENTS = ['contact.rvm.status', 'contact.rvm.receipt'];
const RECEIPT_REASON_CODES = [0, 4001, 4002];

const USAGE = [
    'Usage:',
    '  node quickstart.js                                         send one ringless voicemail and wait for the result',
    '  node quickstart.js listen                                  run only the receiver',
    '  node quickstart.js check-receiver <callback-url> [webhook-url]   test your own endpoints',
    '',
    'Settings: see .env.example.'
].join('\n');

// Reads the account's sending options. A key without the scope this route
// needs (balance:read) still sends; the preflight is skipped with a notice.
async function preflight({ client, config, out }) {
    let readiness = null;
    try {
        readiness = dataOf(await client.get(READINESS_PATH)) || {};
    } catch (err) {
        if (!(err instanceof ApiError) || err.status === 401) {
            throw err;
        }
        out.log('Preflight: could not read ' + READINESS_PATH + ' (' + err.describe() + '). Continuing without it.');
    }

    const audioUrlAllowed = readiness ? readiness.audio_url_allowed : undefined;
    const testNumbersOnly = readiness ? readiness.test_numbers_only : undefined;
    const testNumbers = readiness && Array.isArray(readiness.test_numbers) ? readiness.test_numbers : null;
    if (readiness) {
        out.log('Preflight (' + READINESS_PATH + '):');
        out.log('  audio_url_allowed: ' + reported(audioUrlAllowed));
        out.log('  test_numbers_only: ' + reported(testNumbersOnly));
        out.log('  test_numbers: ' + (testNumbers === null ? 'not reported' : testNumbers.length === 0 ? 'none' : testNumbers.join(', ')));
    }

    if (config.audio === 'url' && audioUrlAllowed === false) {
        throw new Stop('This account cannot send with audio_url yet, so nothing was sent. ' + AUDIO_URL_SUPPORT);
    }
    if (config.audio === 'url' && audioUrlAllowed !== true) {
        out.log('Note: audio_url could not be confirmed for this account. If it is not enabled, the send fails with 3014. ' + AUDIO_URL_SUPPORT);
    }
    if (testNumbersOnly === true && (testNumbers === null || !testNumbers.includes(config.to))) {
        out.log('Warning: this account can send only to its test numbers right now, and DC_TO (' + config.to + ') is not one of them. '
            + 'The send will fail with 3040 (Test Numbers Only). Add the number as a test number on the Dialing rules page, or send to a test number.');
    }
}

function reported(value) {
    return typeof value === 'boolean' ? String(value) : 'not reported';
}

// DC_PHONE_LINE_ID, else the default voice line from GET /phone/public/lines.
// The list reports the default flag as is_default; the OpenAPI schema names
// it default, so both are read.
async function resolvePhoneLine({ client, config, out }) {
    if (config.phoneLineId) {
        out.log('Phone line: ' + config.phoneLineId + ' (DC_PHONE_LINE_ID)');
        return config.phoneLineId;
    }
    const lines = dataOf(await client.get(LINES_PATH));
    const list = Array.isArray(lines) ? lines : [];
    let pick = null;
    for (let i = 0; i < list.length; i++) {
        const line = list[i];
        if (line && (line.is_default === true || line.default === true) && typeof line.ivr_id === 'string') {
            if (line.type === 'voice') {
                pick = line;
                break;
            }
            if (pick === null) {
                pick = line;
            }
        }
    }
    if (pick === null) {
        throw new Stop('No phone line to send from. Set DC_PHONE_LINE_ID to a line from GET ' + LINES_PATH + ', or make one of your lines the default. Without either, the send fails with 4010 (No Caller ID).');
    }
    out.log('Phone line: default line "' + (pick.name || pick.ivr_id) + '" (' + pick.ivr_id + ')');
    return pick.ivr_id;
}

// DC_WEBHOOK_SECRET (comma separated), else the secrets of your webhook
// webhooks, read from the API (one secret per webhook). With none, the webhook route answers 503
// and callbacks still work.
async function loadSecrets({ client, configured, out }) {
    if (configured.length > 0) {
        out.log('Webhook signing secrets: ' + describeSecrets(configured) + ' from DC_WEBHOOK_SECRET');
        return configured;
    }
    if (client === null) {
        out.log('Webhook signing secrets: none. Set DC_WEBHOOK_SECRET. The webhook route answers 503 until you do.');
        return [];
    }
    let rows = [];
    try {
        const data = dataOf(await client.get(SIGNING_SECRET_PATH));
        rows = Array.isArray(data) ? data : [];
    } catch (err) {
        out.log('Webhook signing secrets: could not load them (' + (err.describe ? err.describe() : err.message) + '). Set DC_WEBHOOK_SECRET. The webhook route answers 503 until you do.');
        return [];
    }
    const secrets = [];
    for (let i = 0; i < rows.length; i++) {
        if (rows[i] && typeof rows[i].signing_secret === 'string' && rows[i].signing_secret !== '' && !secrets.includes(rows[i].signing_secret)) {
            secrets.push(rows[i].signing_secret);
        }
    }
    if (secrets.length === 0) {
        out.log('Webhook signing secrets: none yet (no webhooks). Callbacks still work; see README.md to create a webhook.');
        return [];
    }
    out.log('Webhook signing secrets: ' + describeSecrets(secrets) + ' loaded from ' + SIGNING_SECRET_PATH);
    return secrets;
}

// Never print a secret. The last four characters tell you which one is loaded.
function describeSecrets(secrets) {
    return secrets.length + ' (' + secrets.map((secret) => '...' + lastFour(secret)).join(', ') + ')';
}

// DC_MANAGE_WEBHOOK=true: create a webhook for this run and delete it when the
// run ends. The create response is the only moment besides the signing-secret
// route that a webhook's secret is returned, so it is taken from there.
async function registerWebhook({ client, config, out }) {
    await removeLeftovers({ client, out });
    const hookUrl = config.publicUrl + WEBHOOK_PATH;
    const created = dataOf(await client.post(WEBHOOKS_PATH, { name: WEBHOOK_NAME, hook_url: hookUrl, event_types: WEBHOOK_EVENTS }));
    if (!created || typeof created.webhook_id !== 'string' || typeof created.signing_secret !== 'string') {
        throw new Stop('POST ' + WEBHOOKS_PATH + ' answered without a webhook_id and signing_secret, so the webhook cannot be verified.');
    }
    out.log('Webhook created: ' + created.webhook_id + ' for ' + WEBHOOK_EVENTS.join(', ') + ' at ' + hookUrl);
    out.log('  Signing secret: ...' + lastFour(created.signing_secret) + ' (each webhook has its own). It is deleted when this run ends.');
    return created;
}

// A run that was killed leaves its webhook behind. Remove it by its name, so
// the 50 webhook limit is not used up by earlier runs.
async function removeLeftovers({ client, out }) {
    const rows = dataOf(await client.get(WEBHOOKS_PATH));
    const list = Array.isArray(rows) ? rows : [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] && list[i].name === WEBHOOK_NAME && typeof list[i].webhook_id === 'string') {
            await client.delete(WEBHOOKS_PATH + '/' + encodeURIComponent(list[i].webhook_id));
            out.log('Deleted a webhook left by an earlier run: ' + list[i].webhook_id);
        }
    }
}

async function removeWebhook({ client, webhook, out }) {
    try {
        await client.delete(WEBHOOKS_PATH + '/' + encodeURIComponent(webhook.webhook_id));
        out.log('Webhook deleted: ' + webhook.webhook_id);
    } catch (err) {
        out.error('Could not delete the webhook ' + webhook.webhook_id + ' (' + (err.describe ? err.describe() : err.message) + '). '
            + 'Delete it with DELETE ' + WEBHOOKS_PATH + '/' + webhook.webhook_id + '.');
    }
}

// After the first result, wait for the other results this run subscribed to,
// so the status and receipt payloads are both on screen. A status webhook
// follows every send. A receipt follows only a send that ended 0 (sent), 4001
// (voicemail not set up) or 4002 (mailbox full), the outcomes with a recording
// to prove it; any other reason_code never gets one, so it is not waited for.
// A result that does not arrive is reported, never an error.
async function waitForWebhooks({ listener, config, sentAt, reasonCode, out }) {
    const expected = ['contact.rvm.status'];
    if (RECEIPT_REASON_CODES.includes(reasonCode)) {
        expected.push('contact.rvm.receipt');
    } else {
        out.log('No receipt webhook is sent for reason_code ' + reasonCode + ': only ' + RECEIPT_REASON_CODES.join(', ') + ' have a proof of delivery. Not waiting for one.');
    }
    const deadline = Date.now() + config.receiptWaitSeconds * 1000;
    const missing = [];
    for (let i = 0; i < expected.length; i++) {
        const name = expected[i];
        const event = await listener.waitFor((candidate) => candidate.channel === 'webhook'
            && candidate.body.event === name
            && (candidate.body.data || {}).to === config.to
            && candidate.receivedAt >= sentAt, Math.max(0, deadline - Date.now()));
        if (event === null) {
            missing.push(name);
        }
    }
    if (missing.length > 0) {
        out.log('Not received within ' + config.receiptWaitSeconds + ' seconds: ' + missing.join(', ') + '. '
            + 'A receipt is sent only once the proof of delivery exists, which can take longer. ' + API_LOGS_HINT);
    }
}

function printResult({ event, messageId, out }) {
    const s = summarize(event);
    out.log('');
    out.log('Result from the ' + s.channel + ':');
    out.log('  status: ' + s.status);
    out.log('  reason_code: ' + s.reasonCode + ' (' + reasonMeaning(s.reasonCode) + ')');
    if (s.reason) {
        out.log('  reason: ' + s.reason);
    }
    out.log('  message_id: ' + messageId);
    if (s.from) {
        out.log('  sent from: ' + s.from);
    }
    out.log('What each reason_code means: ' + OUTCOMES_URL);
}

async function runSend({ env, out, hooks }) {
    const { config, errors } = readSendConfig(env);
    if (errors.length > 0) {
        throw new Stop(errors.join('\n'), 2);
    }
    const client = createClient({ baseUrl: config.baseUrl, key: config.key, secret: config.secret, fetchFn: hooks.fetch });

    await preflight({ client, config, out });

    const listening = config.publicUrl !== null && config.waitSeconds > 0;
    let listener = null;
    let webhook = null;
    try {
        if (listening) {
            let secrets;
            if (config.manageWebhook) {
                webhook = await registerWebhook({ client, config, out });
                secrets = [webhook.signing_secret].concat(config.webhookSecrets);
            } else {
                secrets = await loadSecrets({ client, configured: config.webhookSecrets, out });
            }
            listener = await startListener({ port: config.port, host: config.host, secrets, out, showPayloads: config.showPayloads });
            out.log('Receiver listening on ' + listener.url + ' (' + CALLBACK_PATH + ', ' + WEBHOOK_PATH + ', ' + HEALTH_PATH + ')');
            if (hooks.onListening) {
                hooks.onListening(listener);
            }
        }

        const phoneLineId = await resolvePhoneLine({ client, config, out });
        const audio = await resolveAudio({ client, config, out, fetchFn: hooks.fetch });

        // The portable body: the same request works on retail and on BYOC,
        // because the phone line chooses the number. No caller_id.
        const foreignId = randomUUID();
        const body = { to: config.to, phone_line_id: phoneLineId };
        Object.assign(body, audio);
        body.foreign_id = foreignId;
        if (config.publicUrl !== null) {
            body.callback_url = config.publicUrl + CALLBACK_PATH;
        } else {
            out.log('DC_PUBLIC_URL is not set, so the send has no callback_url and the result will not come back to this program.');
        }

        const sentAt = Date.now();
        const queued = await client.post('/rvm', body, { idempotencyKey: randomUUID() });
        const messageId = queued.body && queued.body.message_id;
        out.log('Queued (' + queued.status + '): message_id=' + messageId + ' foreign_id=' + foreignId);
        out.log('202 only means the request was queued. It is checked next, and the result arrives as a status and a reason_code.');

        if (!listening) {
            out.log(API_LOGS_HINT);
            return 0;
        }

        out.log('Waiting up to ' + config.waitSeconds + ' seconds for the result...');
        const event = await listener.waitFor((candidate) => {
            if (candidate.channel === 'callback') {
                return candidate.body.foreign_id === foreignId;
            }
            const data = candidate.body.data || {};
            return candidate.body.event === 'contact.rvm.status' && data.to === config.to && candidate.receivedAt >= sentAt;
        }, config.waitSeconds * 1000);

        if (event === null) {
            out.log('No result arrived within ' + config.waitSeconds + ' seconds. ' + API_LOGS_HINT);
            return 0;
        }
        printResult({ event, messageId, out });
        if (webhook !== null && config.receiptWaitSeconds > 0) {
            await waitForWebhooks({ listener, config, sentAt, reasonCode: summarize(event).reasonCode, out });
        }
        return summarize(event).status === 'success' ? 0 : 1;
    } finally {
        if (webhook !== null) {
            await removeWebhook({ client, webhook, out });
        }
        if (listener !== null) {
            await listener.close();
        }
    }
}

async function runListen({ env, out, hooks }) {
    const errors = [];
    const listenerConfig = readListenerConfig(env, errors);
    if (errors.length > 0) {
        throw new Stop(errors.join('\n'), 2);
    }
    const credentials = readCredentials(env, []);
    const client = credentials.key && credentials.secret
        ? createClient({ baseUrl: credentials.baseUrl, key: credentials.key, secret: credentials.secret, fetchFn: hooks.fetch })
        : null;
    const secrets = await loadSecrets({ client, configured: listenerConfig.webhookSecrets, out });
    const listener = await startListener({ port: listenerConfig.port, host: listenerConfig.host, secrets, out });
    out.log('Receiver listening on ' + listener.url + ' (' + CALLBACK_PATH + ', ' + WEBHOOK_PATH + ', ' + HEALTH_PATH + '). Press Ctrl+C to stop.');
    if (hooks.onListening) {
        hooks.onListening(listener);
    }
    await (hooks.untilStopped ? hooks.untilStopped(listener) : new Promise((resolve) => process.once('SIGINT', resolve)));
    await listener.close();
    return 0;
}

async function runCheckReceiver({ args, env, out, hooks }) {
    const callbackUrl = args[0];
    const webhookUrl = args[1];
    if (!callbackUrl || args.length > 2) {
        throw new Stop('check-receiver needs your callback URL, and optionally your webhook URL.\n\n' + USAGE, 2);
    }
    const secret = splitList(env.DC_WEBHOOK_SECRET)[0] || null;
    if (webhookUrl && secret === null) {
        throw new Stop('Set DC_WEBHOOK_SECRET to the signing_secret of your webhook, so the test delivery is signed the way yours will be. '
            + 'It is in the response when you create the webhook, and in GET ' + SIGNING_SECRET_PATH + '.', 2);
    }
    const result = await checkReceiver({ callbackUrl, webhookUrl, secret, out, timeouts: hooks.checkTimeouts });
    return result.ok ? 0 : 1;
}

// Returns the exit code. Prints the consent line before anything else.
async function run({ argv = [], env = process.env, out = console, hooks = {} } = {}) {
    out.log(CONSENT_LINE);
    const command = argv[0] || 'send';
    if (command === '--help' || command === '-h' || command === 'help') {
        out.log(USAGE);
        return 0;
    }
    if (!['send', 'listen', 'check-receiver'].includes(command)) {
        out.error('Unknown command: ' + command + '\n\n' + USAGE);
        return 2;
    }

    const sampleValues = loadSampleValues();
    const samples = findSampleValues(env, sampleValues);
    const args = argv.slice(1);
    for (let i = 0; i < args.length; i++) {
        if (isSampleValue(args[i], sampleValues)) {
            samples.push(args[i] + ': ' + SAMPLE_MESSAGE + '.');
        }
    }
    if (samples.length > 0) {
        out.error(samples.join('\n'));
        return 2;
    }

    try {
        if (command === 'check-receiver') {
            return await runCheckReceiver({ args: argv.slice(1), env, out, hooks });
        }
        if (command === 'listen') {
            return await runListen({ env, out, hooks });
        }
        return await runSend({ env, out, hooks });
    } catch (err) {
        if (err instanceof Stop) {
            out.error(err.message);
            return err.exitCode;
        }
        if (err instanceof ApiError) {
            out.error(err.describe());
            out.error(hintFor(err));
            return 1;
        }
        throw err;
    }
}

function hintFor(err) {
    if (err.status === 401) {
        return 'Check DC_KEY and DC_SECRET for typos or stray spaces, or create a new key under Developers > API Keys.';
    }
    if (err.status === 403) {
        return 'The key is missing a scope this call needs, or your plan does not include it. The detail above names it. Uploads need media:write.';
    }
    if (err.status === 429) {
        return 'Too many requests. Wait a moment and run it again.';
    }
    if (err.status === 0) {
        return 'Check your network connection and DC_BASE_URL.';
    }
    return 'Quote the request_id if you contact support.';
}

const runDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (runDirectly) {
    loadDotEnv(path.join(HERE, '.env'), process.env);
    run({ argv: process.argv.slice(2), env: process.env })
        .then((code) => {
            process.exitCode = code;
        })
        .catch((err) => {
            console.error((err && err.stack) || err);
            process.exitCode = 1;
        });
}

export { run };
