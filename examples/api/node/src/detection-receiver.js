// Send only to people who agreed to hear from you. Test with numbers you own.
// This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
//
// The receiver of the detect-twilio recipe. Four routes:
//   GET  /health              the recipe checks your tunnel reaches it
//   POST /twilio/voice        Twilio asks for the call's TwiML when it is answered
//   POST /webhooks/detection  Detection posts its events. Signed with your Detection key
//   POST /twilio/status       Twilio reports the call status. Signed with your auth token
//
// Each handler verifies, records and answers. None of them calls
// Twilio or Drop Cowboy: the recipe acts on what was recorded, so a slow
// request never holds up an answer.

import { createServer } from 'node:http';
import express from 'express';
import { ROUTES, verifyDetectionSignature } from './lib/detection.js';
import { parseJsonObject, printable } from './lib/events.js';
import { verifyTwilioSignature } from './lib/twilio.js';

const BODY_LIMIT = '1mb';
const HOST = '127.0.0.1';

// publicUrl: DC_PUBLIC_URL. Twilio signs the URL it called, which is this
//            address plus the route, not the Host header the tunnel forwards.
// twiml:     the answer for /twilio/voice (see streamTwiml).
function createDetectionReceiver({ publicUrl, authToken, detectionKey, callId, twiml, log = console.log, nowMs = Date.now }) {
    const entries = [];
    const waiters = new Set();
    const pendingStatuses = [];
    const counts = { received: 0, ignored: 0 };
    let callSid = null;

    function record(entry) {
        entries.push(entry);
        for (const waiter of Array.from(waiters)) {
            waiter.finish(true);
        }
    }

    // The CallSid becomes known when Twilio answers the create request. A
    // status callback can arrive just before that, so it waits here until
    // then instead of being dropped.
    function setCallSid(sid) {
        callSid = sid;
        const pending = pendingStatuses.splice(0, pendingStatuses.length);
        for (let i = 0; i < pending.length; i++) {
            recordStatus(pending[i]);
        }
    }

    function recordStatus(fields) {
        if (fields.CallSid !== callSid) {
            log('Twilio status for another call ' + printable(fields.CallSid) + ' ignored');
            return;
        }
        record({ kind: 'status', status: fields.CallStatus, duration: fields.CallDuration, received_at: Date.now() });
    }

    function entriesSince(index) {
        return entries.slice(index);
    }

    // Resolves true when an entry past `index` exists, false when the time is
    // up or the signal aborts.
    function waitForEntry(index, timeoutMs, signal) {
        if (entries.length > index) {
            return Promise.resolve(true);
        }
        if (signal && signal.aborted) {
            return Promise.resolve(false);
        }
        return new Promise(function (resolve) {
            let timer = null;
            const waiter = {
                finish(value) {
                    clearTimeout(timer);
                    waiters.delete(waiter);
                    if (signal) {
                        signal.removeEventListener('abort', onAbort);
                    }
                    resolve(value);
                }
            };
            function onAbort() {
                waiter.finish(false);
            }
            timer = setTimeout(onAbort, Math.max(0, timeoutMs));
            if (signal) {
                signal.addEventListener('abort', onAbort, { once: true });
            }
            waiters.add(waiter);
        });
    }

    function twilioRequest(req, route) {
        const params = new URLSearchParams(rawBodyOf(req).toString('utf8'));
        const pairs = Array.from(params.entries());
        const valid = verifyTwilioSignature({
            url: publicUrl + route,
            params: pairs,
            signature: req.headers['x-twilio-signature'],
            authToken
        });
        return { valid, fields: Object.fromEntries(pairs) };
    }

    function handleVoice(req, res) {
        const request = twilioRequest(req, ROUTES.voice);
        if (!request.valid) {
            log('Twilio TwiML request refused: missing or wrong X-Twilio-Signature (403)');
            res.status(403).end();
            return;
        }
        if (callSid === null || request.fields.CallSid !== callSid) {
            log('Twilio TwiML request for another call ' + printable(request.fields.CallSid) + ' refused (403)');
            res.status(403).end();
            return;
        }
        log('Twilio asked for the TwiML: the call was answered and its audio now goes to Detection.');
        // setHeader, because Express's res.set would append a charset.
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/xml');
        res.end(twiml);
    }

    function handleStatus(req, res) {
        const request = twilioRequest(req, ROUTES.status);
        if (!request.valid) {
            log('Twilio status refused: missing or wrong X-Twilio-Signature (403)');
            res.status(403).end();
            return;
        }
        if (callSid === null) {
            pendingStatuses.push(request.fields);
        } else {
            recordStatus(request.fields);
        }
        res.status(200).end();
    }

    function handleDetection(req, res) {
        // Verify the raw bytes before anything else. express.raw leaves
        // req.body as the exact Buffer that was signed.
        const rawBody = rawBodyOf(req);
        const check = verifyDetectionSignature({ rawBody, headers: req.headers, detectionKey, nowMs: nowMs() });
        if (!check.ok) {
            log('Detection webhook rejected: ' + check.code + ' (401)');
            res.status(401).json({ error: check.code });
            return;
        }
        const body = parseJsonObject(rawBody);
        if (body === null) {
            res.status(400).json({ error: 'invalid_json' });
            return;
        }

        counts.received++;
        if (body.call_id !== callId) {
            counts.ignored++;
            log('Detection event ' + printable(body.event) + ' for another call_id ' + printable(body.call_id) + ' ignored');
            record({ kind: 'detection', ignored: true, body, received_at: Date.now() });
            res.status(200).json({ received: true });
            return;
        }
        record({ kind: 'detection', ignored: false, body, received_at: Date.now() });
        res.status(200).json({ received: true });
    }

    const app = express();
    app.disable('x-powered-by');
    app.get(ROUTES.health, function (req, res) {
        res.status(200).json({ ok: true });
    });
    // express.raw on these routes only: both signatures are over the bytes
    // (Detection) or the exact parameters (Twilio) that were sent.
    const raw = express.raw({ type: '*/*', limit: BODY_LIMIT });
    app.post(ROUTES.voice, raw, handleVoice);
    app.post(ROUTES.status, raw, handleStatus);
    app.post(ROUTES.detection, raw, handleDetection);
    app.use(function (err, req, res, next) {
        if (res.headersSent) {
            next(err);
            return;
        }
        const status = err && err.status >= 400 && err.status < 500 ? err.status : 500;
        res.status(status).json({ error: status === 500 ? 'server_error' : 'bad_request' });
    });

    return {
        app,
        setCallSid,
        entriesSince,
        waitForEntry,
        counts() {
            return { received: counts.received, ignored: counts.ignored };
        }
    };
}

async function startDetectionReceiver(options) {
    const receiver = createDetectionReceiver(options);
    const server = createServer(receiver.app);
    await new Promise(function (resolve, reject) {
        server.once('error', reject);
        server.listen(options.port || 0, HOST, resolve);
    });

    async function close() {
        await new Promise(function (resolve) {
            server.close(resolve);
            server.closeAllConnections();
        });
    }

    return {
        port: server.address().port,
        setCallSid: receiver.setCallSid,
        entriesSince: receiver.entriesSince,
        waitForEntry: receiver.waitForEntry,
        counts: receiver.counts,
        close
    };
}

function rawBodyOf(req) {
    return Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
}

export { HOST, createDetectionReceiver, startDetectionReceiver };
