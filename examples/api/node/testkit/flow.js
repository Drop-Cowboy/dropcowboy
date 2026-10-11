// Drives a recipe that waits for its result: starts it, waits until the
// request has gone out, then plays the part of the platform by posting the
// result to the receiver the recipe started.

import { fixtureJson, postRaw, receiverPortFrom, sign, waitUntil, fixtureText } from './helpers.js';

const WAITING_ENV = {
    DC_PUBLIC_URL: 'https://tunnel.example.com',
    DC_WAIT_SECONDS: '10',
    PORT: '0',
    DC_WEBHOOK_SECRET: fixtureJson('signature-vectors.json').secret
};

async function runAndSendCallback({ start, mock, out, overrides = {} }) {
    const running = start();
    const port = await waitUntil(() => receiverPortFrom(out), 'the receiver to start');
    const sent = await waitUntil(() => mock.find('POST', '/rvm')[0], 'POST /rvm');
    const callback = Object.assign(fixtureJson('callback.rvm-success.json'), { foreign_id: sent.body.foreign_id }, overrides);
    const res = await postRaw('http://127.0.0.1:' + port + '/callbacks/dropcowboy', JSON.stringify(callback));
    const outcome = await running;
    return { outcome, callbackStatus: res.status, sent };
}

async function runAndSendWebhook({ start, mock, out }) {
    const running = start();
    const port = await waitUntil(() => receiverPortFrom(out), 'the receiver to start');
    await waitUntil(() => mock.find('POST', '/rvm')[0], 'POST /rvm');
    const rawBody = fixtureText('webhook.rvm-status.json');
    const timestamp = String(Math.floor(Date.now() / 1000));
    const res = await postRaw('http://127.0.0.1:' + port + '/webhooks/dropcowboy', rawBody, {
        'X-Signature': sign(WAITING_ENV.DC_WEBHOOK_SECRET, timestamp, rawBody),
        'X-Timestamp': timestamp
    });
    const outcome = await running;
    return { outcome, webhookStatus: res.status };
}

export { WAITING_ENV, runAndSendCallback, runAndSendWebhook };
