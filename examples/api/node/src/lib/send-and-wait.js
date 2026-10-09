// Send only to people who agreed to hear from you. Test with numbers you own.
//
// The shared tail of every recipe: start the receiver, send, wait for the
// result, print a summary and shut the receiver down.

import { callbackUrl as callbackUrlFrom, waitSeconds } from './config.js';
import { describeResult } from './events.js';
import { API_LOGS_HINT, outcomeHint } from './hints.js';
import { DOCS_URL } from './lookups.js';
import { newForeignId, sendRvm } from './send.js';
import { startReceiverFromEnv } from '../receiver.js';

// buildBody({ foreignId, callbackUrl }) returns the POST /rvm body. It runs
// after the receiver is up, so callbackUrl is only set when a result can
// actually come back to this machine.
// Returns { messageId, foreignId, result } where result is the first matching
// event (or null when none arrived).
async function sendAndWait({ client, env, out, to, buildBody }) {
    const foreignId = newForeignId();
    const callbackUrl = callbackUrlFrom(env);
    const seconds = waitSeconds(env);
    const listening = callbackUrl !== null && seconds > 0;

    if (callbackUrl === null) {
        out.log('DC_PUBLIC_URL is not set, so this send has no callback_url and its result will not arrive here. Set it to the HTTPS address of a tunnel to this machine (see README), or follow the result in your dashboard.');
    } else if (seconds === 0) {
        out.log('DC_WAIT_SECONDS=0: the send will not wait for a result.');
    }

    const receiver = listening ? await startReceiverFromEnv({ env, out, client }) : null;
    try {
        const body = buildBody({ foreignId, callbackUrl });
        const sentAt = Date.now();
        const messageId = await sendRvm(client, body);
        out.log('Accepted (202): message_id=' + messageId + ' foreign_id=' + foreignId);
        out.log('A 202 means the request was queued. The result comes next, as a status and a reason code.');

        if (receiver === null) {
            out.log(API_LOGS_HINT);
            return { messageId, foreignId, result: null };
        }
        out.log('Waiting up to ' + seconds + ' seconds for the result...');
        const event = await receiver.waitForEvent(isResultFor({ foreignId, to, sentAt }), seconds * 1000);
        if (event === null) {
            out.log('No result arrived within ' + seconds + ' seconds. It can still arrive at the receiver or on a subscribed webhook.');
            out.log(API_LOGS_HINT);
            return { messageId, foreignId, result: null };
        }
        out.log('Result: ' + describeResult(event.source, event.event, event.result));
        const hint = outcomeHint(event.result.reason_code);
        if (hint !== null) {
            out.log('What to do: ' + hint);
        }
        out.log('What each reason_code means: ' + DOCS_URL + '/outcomes');
        return { messageId, foreignId, result: event.result };
    } finally {
        if (receiver !== null) {
            await receiver.close();
        }
    }
}

// A callback is matched on the foreign_id this send used. A status webhook does
// not carry foreign_id, so it is matched on the recipient number and on having
// arrived after the send. Receipt events (proof of delivery) are not results.
function isResultFor({ foreignId, to, sentAt }) {
    return function (entry) {
        if (entry.received_at < sentAt || entry.result === null) {
            return false;
        }
        if (entry.source === 'callback') {
            return entry.result.foreign_id === foreignId;
        }
        return entry.event === 'contact.rvm.status' && entry.result.to === to;
    };
}

export { isResultFor, sendAndWait };
