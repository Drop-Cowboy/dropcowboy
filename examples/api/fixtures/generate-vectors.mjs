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
