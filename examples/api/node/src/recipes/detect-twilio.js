// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// Recipe: call someone from your own Twilio account, let Detection listen,
// and play your message on the beep (or to a live person).
//
//   1. Check every setting before any request.
//   2. Use DC_DETECTION_KEY, or create a temporary Detection key with DC_KEY
//      and DC_SECRET (deleted at the end).
//   3. Check the Twilio account (not a trial, active) and that TWILIO_FROM
//      belongs to it.
//   4. Start the receiver and check the tunnel in DC_PUBLIC_URL reaches it.
//   5. Create the call. When it is answered, Twilio fetches TwiML that forks
//      the audio to Detection with <Start><Stream>.
//   6. Act on what the receiver records, once: on the beep, or when a live
//      person speaks, replace the call's TwiML with your message. Nothing else.
//   7. Print a summary. Then hang up a call that is still up, delete the
//      temporary key and close the receiver, also after an error or Ctrl+C.

import { randomUUID } from 'node:crypto';
import { startDetectionReceiver, HOST } from '../detection-receiver.js';
import { DcClient } from '../lib/client.js';
import { INTERRUPTED_EXIT_CODE, isMain, printConsentLine, printError, runCli } from '../lib/cli.js';
import { RecipeError, lastFour, readCredentials } from '../lib/config.js';
import { detectSettingsFromEnv } from '../lib/detect-settings.js';
import { createTemporaryKey, deleteKey } from '../lib/detection-keys.js';
import { CallDecision, ROUTES, messageTwiml, streamTwiml } from '../lib/detection.js';
import { printable } from '../lib/events.js';
import { TwilioClient, TwilioError } from '../lib/twilio.js';

const BILLING_LINE = 'This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.';
const HEALTH_TIMEOUT_MS = 10000;
const STATUS_EVENTS = ['initiated', 'ringing', 'answered', 'completed'];
const NO_RESULT_HINT = 'No Detection result arrived. Check that the Detection key is active and the balance covers Detection, and look for stream errors in the Twilio Console debugger.';
const NO_WEBHOOK_HINT = 'No Detection webhook arrived at all. A key that is refused closes the stream before any webhook is sent.';
const TRIAL_MESSAGE = 'Twilio trial accounts play a notice and wait for a key press before your TwiML runs, so detection would hear the notice. Upgrade the Twilio account to run this recipe.';

// Ctrl+C or SIGTERM, after the cleanup. The command exits with 130.
class StoppedError extends RecipeError {
    constructor() {
        super('Stopped before the run finished.');
        this.name = 'StoppedError';
        this.exitCode = INTERRUPTED_EXIT_CODE;
    }
}

// Options other than env and out exist for the tests:
//   client       a DcClient (default: built from DC_KEY and DC_SECRET when needed)
//   fetchFn      fetch for the tunnel health check
//   healthUrl    function (port) => URL for the health check (default DC_PUBLIC_URL/health)
//   signals      where SIGINT and SIGTERM arrive (default process)
//   msPerSecond  how long a second of DC_WAIT_SECONDS is
async function run({ env = process.env, out = console, client = null, fetchFn = fetch, healthUrl = null, signals = process, msPerSecond = 1000 } = {}) {
    printConsentLine(out);
    out.log(BILLING_LINE);
    const settings = detectSettingsFromEnv(env);
    const callId = randomUUID();
    out.log('call_id: ' + callId);

    const stop = watchForStop({ signals, out });
    const ctx = {
        settings,
        callId,
        out,
        stop,
        msPerSecond,
        twilio: new TwilioClient({ accountSid: settings.accountSid, authToken: settings.authToken, baseUrl: settings.twilioBaseUrl }),
        dc: null,
        temporaryKeyId: null,
        receiver: null,
        callSid: null,
        hungUp: false,
        decision: new CallDecision(),
        latencyMs: null
    };
    if (settings.detectionKey === null) {
        ctx.dc = client || dcClientFromSettings(env, settings);
    }

    let failure = null;
    let result = null;
    try {
        result = await placeAndWatch({ ctx, fetchFn, healthUrl });
    } catch (err) {
        failure = err;
    }
    const cleanedUp = await cleanUp(ctx);
    stop.dispose();
    // Ctrl+C decides the exit code, whatever else happened.
    if (stop.signal.aborted && !(failure instanceof StoppedError)) {
        if (failure !== null) {
            printError(out, failure);
        }
        failure = new StoppedError();
    }
    if (failure !== null) {
        throw failure;
    }
    if (!cleanedUp) {
        throw new RecipeError('The run finished, but cleaning up did not. See the messages above.');
    }
    return result;
}

async function placeAndWatch({ ctx, fetchFn, healthUrl }) {
    const { settings, out, stop } = ctx;

    // Detection key.
    let detectionKey = settings.detectionKey;
    if (detectionKey !== null) {
        out.log('Detection key: DC_DETECTION_KEY (ends in ' + lastFour(detectionKey) + ')');
    } else {
        const created = await createTemporaryKey({ client: ctx.dc, out });
        ctx.temporaryKeyId = created.keyId || null;
        if (!created.keyId || typeof created.apiKey !== 'string' || created.apiKey === '') {
            throw new RecipeError('Creating the Detection key did not return a key_id and an api_key.');
        }
        detectionKey = created.apiKey;
    }
    stop.check();

    // Twilio preflight.
    await checkTwilioAccount(ctx);
    stop.check();

    // Receiver and tunnel.
    ctx.receiver = await startDetectionReceiver({
        port: settings.port,
        publicUrl: settings.publicUrl,
        authToken: settings.authToken,
        detectionKey,
        callId: ctx.callId,
        twiml: streamTwiml({
            detectionUrl: settings.detectionUrl,
            detectionKey,
            publicUrl: settings.publicUrl,
            callId: ctx.callId,
            waitSeconds: settings.waitSeconds
        }),
        log: out.log
    });
    out.log('Receiver listening on http://' + HOST + ':' + ctx.receiver.port + ' (routes: ' + ROUTES.voice + ', ' + ROUTES.status + ', ' + ROUTES.detection + ')');
    const health = healthUrl ? healthUrl(ctx.receiver.port) : settings.publicUrl + ROUTES.health;
    await checkTunnel({ url: health, port: ctx.receiver.port, fetchFn });
    out.log('The tunnel reaches this receiver: ' + settings.publicUrl);
    stop.check();

    // The call. Never retried: a second POST would place a second call.
    const deadline = Date.now() + settings.waitSeconds * ctx.msPerSecond;
    const call = await ctx.twilio.createCall(callForm(settings));
    if (!call || typeof call.sid !== 'string' || call.sid === '') {
        throw new RecipeError('Twilio created the call but its answer has no sid.');
    }
    ctx.callSid = call.sid;
    ctx.receiver.setCallSid(call.sid);
    out.log('Call created: CallSid=' + call.sid + '. Calling ' + settings.to + ' from ' + settings.from + '.');

    await watchCall({ ctx, deadline });
    return summarize(ctx);
}

async function checkTwilioAccount(ctx) {
    const { settings, twilio, out } = ctx;
    const account = await twilio.getAccount();
    const type = account ? account.type : undefined;
    const status = account ? account.status : undefined;
    if (type === 'Trial') {
        throw new RecipeError(TRIAL_MESSAGE);
    }
    if (status !== 'active') {
        throw new RecipeError('The Twilio account status is ' + printable(status) + ', not active. Reactivate it in the Twilio Console to run this recipe.');
    }
    out.log('Twilio account AC...' + lastFour(settings.accountSid) + ': type ' + printable(type) + ', status active');

    const incoming = await twilio.listIncomingNumbers(settings.from);
    if (incoming && Array.isArray(incoming.incoming_phone_numbers) && incoming.incoming_phone_numbers.length > 0) {
        out.log('TWILIO_FROM ' + settings.from + ' is a number in this Twilio account.');
        return;
    }
    const callerIds = await twilio.listCallerIds(settings.from);
    if (callerIds && Array.isArray(callerIds.outgoing_caller_ids) && callerIds.outgoing_caller_ids.length > 0) {
        out.log('TWILIO_FROM ' + settings.from + ' is a verified caller ID on this Twilio account.');
        return;
    }
    throw new RecipeError('TWILIO_FROM is not a number in this Twilio account or a verified caller ID on it.');
}

async function checkTunnel({ url, port, fetchFn }) {
    let answer;
    try {
        const response = await fetchFn(url, { redirect: 'manual', signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS) });
        const text = await response.text();
        let body = null;
        try {
            body = JSON.parse(text);
        } catch (err) {
            body = null;
        }
        if (response.status === 200 && body !== null && body.ok === true) {
            return;
        }
        answer = 'answered ' + response.status;
    } catch (err) {
        const timedOut = err && (err.name === 'TimeoutError' || err.name === 'AbortError');
        answer = timedOut ? 'did not answer within ' + HEALTH_TIMEOUT_MS / 1000 + ' seconds' : 'failed (' + ((err && err.cause && err.cause.code) || (err && err.message) || 'network error') + ')';
    }
    throw new RecipeError('The tunnel does not reach this receiver: GET ' + url + ' ' + answer + '. Start the tunnel, point it at port ' + port + ', and set DC_PUBLIC_URL to its https:// address.');
}

// Exactly these fields. No MachineDetection: Detection does that job.
function callForm(settings) {
    const form = [
        ['To', settings.to],
        ['From', settings.from],
        ['Url', settings.publicUrl + ROUTES.voice],
        ['Method', 'POST'],
        ['StatusCallback', settings.publicUrl + ROUTES.status],
        ['StatusCallbackMethod', 'POST']
    ];
    for (let i = 0; i < STATUS_EVENTS.length; i++) {
        form.push(['StatusCallbackEvent', STATUS_EVENTS[i]]);
    }
    form.push(['Timeout', String(settings.ringSeconds)]);
    return form;
}

// Reads what the receiver recorded, in order, and acts at most once. Waits
// on the receiver between events, so nothing polls and nothing is left
// running when it returns.
async function watchCall({ ctx, deadline }) {
    const { out, stop, decision, receiver } = ctx;
    let cursor = 0;

    while (!decision.finished) {
        stop.check();
        const fresh = receiver.entriesSince(cursor);
        if (fresh.length > 0) {
            cursor++;
            const entry = fresh[0];
            if (entry.kind === 'detection' && entry.ignored) {
                continue;
            }
            const step = entry.kind === 'status' ? decision.onStatus(entry) : decision.onDetection(entry.body);
            printLines(out, step.lines);
            if (step.action !== null) {
                await perform({ ctx, action: step.action, triggeredAt: entry.received_at, trigger: entry.body ? entry.body.event : 'status' });
            }
            continue;
        }

        const now = Date.now();
        if (now >= deadline) {
            if (!decision.acted) {
                out.log(NO_RESULT_HINT);
                if (receiver.counts().received === 0) {
                    out.log(NO_WEBHOOK_HINT);
                }
                const step = decision.onDeadline();
                if (step.action !== null) {
                    await perform({ ctx, action: step.action, triggeredAt: now, trigger: 'end of DC_WAIT_SECONDS' });
                }
            } else {
                out.log('DC_WAIT_SECONDS ran out before Twilio reported the end of the call.');
            }
            return;
        }
        await receiver.waitForEntry(cursor, deadline - now, stop.signal);
    }
}

// Plays a message or hangs up, with one update of the live call.
async function perform({ ctx, action, triggeredAt, trigger }) {
    const { settings, out, decision } = ctx;
    let form;
    if (action.kind === 'hangup') {
        out.log('Hanging up (outcome ' + decision.outcome + ').');
        form = [['Status', 'completed']];
    } else {
        const message = action.message === 'live' ? settings.liveMessage : settings.voicemailMessage;
        const which = action.message === 'live'
            ? (settings.liveFallsBackToVoicemail ? 'the voicemail message (no live message is set)' : 'the live message')
            : 'the voicemail message';
        out.log('Playing ' + which + ' (outcome ' + decision.outcome + ').');
        form = [['Twiml', messageTwiml(message)]];
    }
    try {
        await ctx.twilio.updateCall(ctx.callSid, form);
    } catch (err) {
        if (err instanceof TwilioError && err.callAlreadyEnded) {
            out.log('The call had already ended (Twilio answered ' + err.status + (err.code !== null ? ', code ' + err.code : '') + '), so there was nothing to update.');
            decision.markCallEnded();
            return;
        }
        throw err;
    }
    ctx.latencyMs = Date.now() - triggeredAt;
    if (action.kind === 'hangup') {
        ctx.hungUp = true;
    }
    out.log('Twilio accepted the update ' + ctx.latencyMs + ' ms after the receiver recorded the ' + trigger + '.');
}

function summarize(ctx) {
    const { decision, out, receiver } = ctx;
    const verdict = decision.lastVerdict;
    const beep = decision.beep;
    const counts = receiver.counts();
    out.log('Summary');
    out.log('  outcome:            ' + decision.outcome);
    out.log('  last verdict:       ' + (verdict ? 'type=' + printable(verdict.type) + ' confidence=' + printable(verdict.confidence) : 'none'));
    out.log('  beep:               ' + (beep ? 'timestamp_ms=' + printable(beep.timestamp_ms) + ' duration_ms=' + printable(beep.duration_ms) : 'none'));
    out.log('  update latency:     ' + (ctx.latencyMs === null ? 'none' : ctx.latencyMs + ' ms'));
    out.log('  CallStatus:         ' + (decision.callStatus === null ? 'none' : printable(decision.callStatus)) + (decision.callDuration === null ? '' : ' (CallDuration ' + printable(decision.callDuration) + ')'));
    out.log('  CallSid:            ' + ctx.callSid);
    out.log('  call_id:            ' + ctx.callId);
    out.log('  Detection webhooks: ' + counts.received + ' received, ' + counts.ignored + ' ignored');
    return {
        outcome: decision.outcome,
        lastVerdict: verdict,
        beep,
        latencyMs: ctx.latencyMs,
        callStatus: decision.callStatus,
        callDuration: decision.callDuration,
        callSid: ctx.callSid,
        callId: ctx.callId,
        webhooks: counts
    };
}

// Runs every step, even when one before it failed, and prints each failure.
// Returns false when any step failed.
async function cleanUp(ctx) {
    const { out, decision } = ctx;
    let ok = true;

    if (ctx.callSid !== null && !decision.hasTerminalStatus && !decision.callEnded && !ctx.hungUp) {
        try {
            await ctx.twilio.updateCall(ctx.callSid, [['Status', 'completed']]);
            out.log('Hung up the call ' + ctx.callSid + '.');
        } catch (err) {
            if (err instanceof TwilioError && err.callAlreadyEnded) {
                out.log('The call ' + ctx.callSid + ' had already ended.');
            } else {
                ok = false;
                out.error('Could not hang up the call ' + ctx.callSid + '. End it in the Twilio Console.');
                printError(out, err);
            }
        }
    }

    if (ctx.temporaryKeyId !== null) {
        try {
            await deleteKey({ client: ctx.dc, keyId: ctx.temporaryKeyId });
            out.log('Temporary Detection key deleted.');
        } catch (err) {
            ok = false;
            out.error('Could not delete the temporary Detection key ' + ctx.temporaryKeyId + '. It expires on its own within an hour; the next run also deletes it.');
            printError(out, err);
        }
    }

    if (ctx.receiver !== null) {
        try {
            await ctx.receiver.close();
        } catch (err) {
            ok = false;
            out.error('Could not close the receiver: ' + ((err && err.message) || String(err)));
        }
    }
    return ok;
}

// The first Ctrl+C stops the run and cleans up. The handler is removed when
// it fires, so a second Ctrl+C quits at once.
function watchForStop({ signals, out }) {
    const controller = new AbortController();
    const names = ['SIGINT', 'SIGTERM'];
    function onSignal(name) {
        if (controller.signal.aborted) {
            return;
        }
        out.log('Stopping (' + name + '). Cleaning up; press Ctrl+C again to quit without cleaning up.');
        dispose();
        controller.abort();
    }
    function dispose() {
        for (let i = 0; i < names.length; i++) {
            signals.removeListener(names[i], onSignal);
        }
    }
    for (let i = 0; i < names.length; i++) {
        signals.on(names[i], onSignal);
    }
    return {
        signal: controller.signal,
        dispose,
        check() {
            if (controller.signal.aborted) {
                throw new StoppedError();
            }
        }
    };
}

function dcClientFromSettings(env, settings) {
    const credentials = readCredentials(env);
    return new DcClient({ key: credentials.key, secret: credentials.secret, baseUrl: settings.dcBaseUrl });
}

function printLines(out, lines) {
    for (let i = 0; i < lines.length; i++) {
        out.log(lines[i]);
    }
}

if (isMain(import.meta.url)) {
    await runCli(run);
}

export { BILLING_LINE, NO_RESULT_HINT, NO_WEBHOOK_HINT, StoppedError, TRIAL_MESSAGE, callForm, run };
