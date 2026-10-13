import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const secret = 'e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30';
const otherSecret = '7d2f9b4e-6a1c-4f83-b5e0-9c3a8d1f6e42';
const timestamp = '1774041960';

const statusEvent = {
    event_id: '2694f968-93fd-44ca-9b92-2110ed1ee61e',
    event: 'contact.rvm.status',
    event_at: 1774041912000,
    data: {
        team_id: '3f6c2a1e-8b4d-4c7a-9e2f-5a1b3c4d6e7f',
        contact_id: '5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d',
        drop_id: 'b3e7a1c9-8d5f-4b2e-9a6c-1f4d7b3e8a52',
        campaign_id: null,
        campaign_type: 'rvm',
        status: 'success',
        reason: '',
        reason_code: 0,
        to: '+13125550142',
        from: '+12125550100'
    }
};

const rawBody = JSON.stringify(statusEvent);

function sign(secretValue, ts, body) {
    return 'sha256=' + crypto.createHmac('sha256', secretValue).update(ts + '.' + body).digest('hex');
}

const vectors = {
    description: 'Signature test vectors shared by the Node, Python and .NET examples. Regenerate with: node fixtures/generate-vectors.mjs',
    algorithm: 'HMAC-SHA256 over timestamp + "." + raw body, header X-Signature = "sha256=" + hex',
    tolerance_seconds: 300,
    secret,
    other_secret: otherSecret,
    timestamp,
    now_seconds_valid: Number(timestamp) + 30,
    now_seconds_stale: Number(timestamp) + 301,
    raw_body: rawBody,
    signature: sign(secret, timestamp, rawBody),
    tampered_raw_body: rawBody.replace('"success"', '"failure"'),
    signature_from_other_secret: sign(otherSecret, timestamp, rawBody)
};

fs.writeFileSync(path.join(dir, 'signature-vectors.json'), JSON.stringify(vectors, null, 2) + '\n');
fs.writeFileSync(path.join(dir, 'webhook.rvm-status.json'), JSON.stringify(statusEvent, null, 2) + '\n');
console.log(vectors.signature);

// Detection webhooks (detect-twilio recipe). Twilio SIDs are all-zero
// placeholders in Twilio's own format; they name no real account or call.
const TWILIO_ACCOUNT_SID = 'AC00000000000000000000000000000000';
const TWILIO_CALL_SID = 'CA00000000000000000000000000000001';
const TWILIO_STREAM_SID = 'MZ00000000000000000000000000000001';
const detectionSessionId = '63c83cc6-91ec-4127-88d0-ea109c4c2738';
const detectionCallId = 'fa6de30e-9e3a-40c4-97fc-1fdad5f21338';

function detectionEnvelope(deliveryId, event, emittedAt, data) {
    return {
        delivery_id: deliveryId,
        event,
        emitted_at: emittedAt,
        session_id: detectionSessionId,
        call_id: detectionCallId,
        app_id: TWILIO_ACCOUNT_SID,
        source: 'twilio',
        twilio_call_sid: TWILIO_CALL_SID,
        twilio_account_sid: TWILIO_ACCOUNT_SID,
        twilio_stream_sid: TWILIO_STREAM_SID,
        data
    };
}

const detectionVoicemail = detectionEnvelope('9f94eae4-1f2b-4a47-b86a-57c35fe143f1', 'detection', '2026-03-20T15:04:02.310Z', {
    timestamp_ms: 2310,
    type: 'speech.voicemail.greeting',
    confidence: 0.91,
    beep_detected: false,
    detection_time_ms: 2310,
    is_final: false,
    is_refinement: false
});
const detectionLivePerson = detectionEnvelope('8d96255d-3858-4911-bf31-5bf1f16ca012', 'detection', '2026-03-20T15:04:01.840Z', {
    timestamp_ms: 1840,
    type: 'speech.human.unknown',
    confidence: 0.6,
    beep_detected: false,
    detection_time_ms: 1840,
    is_final: false,
    is_refinement: false
});
const detectionBeep = detectionEnvelope('f956b1e8-1b29-4543-915c-d5364c84852a', 'beep', '2026-03-20T15:04:06.420Z', {
    timestamp_ms: 6420,
    frequency_hz: 1000,
    duration_ms: 380,
    confidence: 0.94,
    is_final: true
});
const detectionClose = detectionEnvelope('d4550947-7fb2-4960-aa25-13e95ec58f61', 'close', '2026-03-20T15:04:07.100Z', {
    timestamp_ms: 7100,
    reason: 'normal',
    duration_ms: 7100
});

// Signed with the Detection API key: X-Signature = "v1=hmac-sha256," + hex of
// HMAC-SHA256 over X-Timestamp (milliseconds) + "." + raw body.
const detectionKey = 'test-detection-key-not-a-real-credential-0042';
const otherDetectionKey = 'test-detection-key-not-a-real-credential-0043';
const detectionTimestampMs = '1774041846420';
const detectionRawBody = JSON.stringify(detectionBeep);

function signDetection(key, ts, body) {
    return 'v1=hmac-sha256,' + crypto.createHmac('sha256', key).update(ts + '.' + body).digest('hex');
}

const detectionVectors = {
    description: 'Detection webhook signature vectors for the detect-twilio recipe. Regenerate with: node fixtures/generate-vectors.mjs',
    algorithm: 'HMAC-SHA256 keyed with the Detection API key over X-Timestamp (milliseconds) + "." + raw body, header X-Signature = "v1=hmac-sha256," + hex',
    tolerance_ms: 300000,
    detection_key: detectionKey,
    other_detection_key: otherDetectionKey,
    timestamp_ms: detectionTimestampMs,
    now_ms_valid: Number(detectionTimestampMs) + 30000,
    now_ms_stale: Number(detectionTimestampMs) + 300001,
    raw_body: detectionRawBody,
    signature: signDetection(detectionKey, detectionTimestampMs, detectionRawBody),
    tampered_raw_body: detectionRawBody.replace('"duration_ms":380', '"duration_ms":381'),
    signature_from_other_key: signDetection(otherDetectionKey, detectionTimestampMs, detectionRawBody)
};

// Twilio status callback (form-encoded on the wire; listed here as an object).
const twilioStatusCompleted = {
    AccountSid: TWILIO_ACCOUNT_SID,
    ApiVersion: '2010-04-01',
    CallSid: TWILIO_CALL_SID,
    CallStatus: 'completed',
    CallDuration: '21',
    CallbackSource: 'call-progress-events',
    Direction: 'outbound-api',
    From: '+13125550147',
    SequenceNumber: '3',
    Timestamp: 'Fri, 20 Mar 2026 15:04:09 +0000',
    To: '+13125550142'
};

// X-Twilio-Signature = base64 of HMAC-SHA1 keyed with the auth token over the
// full URL Twilio requested, followed by every POST parameter name and value,
// sorted by name.
const twilioAuthToken = 'test-twilio-auth-token-not-real-0042';
const otherTwilioAuthToken = 'test-twilio-auth-token-not-real-0043';
const twilioUrl = 'https://tunnel.example.org/twilio/status';

function signTwilio(token, url, params) {
    const names = Object.keys(params).sort();
    let data = url;
    for (const name of names) {
        data += name + params[name];
    }
    return crypto.createHmac('sha1', token).update(Buffer.from(data, 'utf8')).digest('base64');
}

const twilioVectors = {
    description: 'X-Twilio-Signature vectors for the detect-twilio recipe. Regenerate with: node fixtures/generate-vectors.mjs',
    algorithm: 'base64 of HMAC-SHA1 keyed with the Twilio auth token over the full request URL followed by each POST parameter name and value, sorted by name',
    auth_token: twilioAuthToken,
    other_auth_token: otherTwilioAuthToken,
    url: twilioUrl,
    params: twilioStatusCompleted,
    signature: signTwilio(twilioAuthToken, twilioUrl, twilioStatusCompleted),
    tampered_params: Object.assign({}, twilioStatusCompleted, { CallStatus: 'busy' }),
    signature_from_other_token: signTwilio(otherTwilioAuthToken, twilioUrl, twilioStatusCompleted)
};

function writeJson(name, value) {
    fs.writeFileSync(path.join(dir, name), JSON.stringify(value, null, 2) + '\n');
}

writeJson('detection.voicemail.json', detectionVoicemail);
writeJson('detection.live-person.json', detectionLivePerson);
writeJson('detection.beep.json', detectionBeep);
writeJson('detection.close.json', detectionClose);
writeJson('detection-signature-vectors.json', detectionVectors);
writeJson('twilio.status-completed.json', twilioStatusCompleted);
writeJson('twilio-signature-vectors.json', twilioVectors);
console.log(detectionVectors.signature);
console.log(twilioVectors.signature);
