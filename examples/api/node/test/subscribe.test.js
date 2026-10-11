import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { run } from '../src/subscribe.js';
import { SECRET, baseEnv, captureOutput, fixtureJson } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { ok, problem } from '../testkit/routes.js';

const SIGNING_SECRET = fixtureJson('signature-vectors.json').secret;
const WEBHOOK_ID = '3f8a1c5e-9b2d-4e70-a6c4-1d5b7e9f2a38';
const OTHER_WEBHOOK_ID = '8c2e6a4f-1d7b-4b93-a5e0-6f3c9d1b7a24';
const ROTATED_SECRET = '0b9d4f7a-2c6e-4a18-9e3b-7d5a1c8f4e62';

function webhook(overrides = {}) {
    return Object.assign({
        webhook_id: WEBHOOK_ID,
        name: '2 events',
        hook_url: 'https://tunnel.example.com/webhooks/dropcowboy',
        url: 'https://tunnel.example.com/webhooks/dropcowboy',
        event_types: ['contact.rvm.status', 'contact.rvm.receipt'],
        hook_type: null,
        signing_secret_created_at: 1774214712000
    }, overrides);
}

let mock;
let out;

beforeEach(async () => {
    out = captureOutput();
    mock = await startMockApi({
        'POST /register/public/webhooks': ok(webhook({ event_types: ['contact.rvm.status'], hook_type: 'contact.rvm.status', signing_secret: SIGNING_SECRET }), 201)
    });
});

afterEach(async () => {
    await mock.close();
});

describe('subscribe: create', () => {
    it('creates one webhook for the status event and prints only the last 4 of the secret', async () => {
        const env = baseEnv(mock, { DC_PUBLIC_URL: 'https://tunnel.example.com/' });
        await run({ env, out, argv: [] });

        assert.deepEqual(mock.summary(), ['POST /register/public/webhooks']);
        assert.deepEqual(mock.requests[0].body, { hook_url: 'https://tunnel.example.com/webhooks/dropcowboy', event_types: ['contact.rvm.status'] });
        assert.match(out.text(), new RegExp('Created webhook ' + WEBHOOK_ID));
        assert.match(out.text(), /Signing secret ends in 7c30\./);
        assert.ok(!out.text().includes(SIGNING_SECRET));
        assert.ok(!out.text().includes(SECRET));
    });

    it('puts the status and receipt events in ONE webhook with --receipt', async () => {
        const env = baseEnv(mock, { DC_PUBLIC_URL: 'https://tunnel.example.com' });
        await run({ env, out, argv: ['--receipt'] });

        assert.equal(mock.requests.length, 1);
        assert.deepEqual(mock.requests[0].body.event_types, ['contact.rvm.status', 'contact.rvm.receipt']);
        assert.equal(mock.requests[0].body.hook_type, undefined);
    });

    it('sends exactly the event types given with --events', async () => {
        const env = baseEnv(mock, { DC_PUBLIC_URL: 'https://tunnel.example.com' });
        await run({ env, out, argv: ['--events', 'contact.rvm.status, contact.rvm.receipt'] });

        assert.deepEqual(mock.requests[0].body.event_types, ['contact.rvm.status', 'contact.rvm.receipt']);
    });

    it('says creating adds a webhook and never replaces one', async () => {
        await run({ env: baseEnv(mock, { DC_PUBLIC_URL: 'https://tunnel.example.com' }), out, argv: [] });
        assert.match(out.text(), /adds to the list; it never replaces this one/);
        assert.match(out.text(), /--rotate <webhook_id>/);
    });

    it('requires DC_PUBLIC_URL', async () => {
        await assert.rejects(run({ env: baseEnv(mock), out, argv: [] }), /DC_PUBLIC_URL/);
        assert.deepEqual(mock.requests, []);
    });

    it('requires an HTTPS address', async () => {
        await assert.rejects(run({ env: baseEnv(mock, { DC_PUBLIC_URL: 'http://localhost:3000' }), out, argv: [] }), /HTTPS/);
        assert.deepEqual(mock.requests, []);
    });
});

describe('subscribe: update', () => {
    const UPDATE_KEY = 'PUT /register/public/webhooks/' + WEBHOOK_ID;

    async function mockUpdate(updated) {
        await mock.close();
        mock = await startMockApi({ [UPDATE_KEY]: ok(updated) });
    }

    it('replaces the event types of one webhook with PUT and sends nothing else', async () => {
        await mockUpdate(webhook({ event_types: ['contact.rvm.status'], hook_type: 'contact.rvm.status', name: '2 events' }));
        await run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--events', 'contact.rvm.status'] });

        assert.deepEqual(mock.summary(), [UPDATE_KEY]);
        assert.deepEqual(mock.requests[0].body, { event_types: ['contact.rvm.status'] });
        assert.match(out.text(), new RegExp('Updated webhook ' + WEBHOOK_ID));
        assert.match(out.text(), /events: contact\.rvm\.status$/m);
        assert.match(out.text(), /The signing secret did not change/);
    });

    it('sends the url and the name, and needs no DC_PUBLIC_URL', async () => {
        await mockUpdate(webhook({ name: 'Receipts', hook_url: 'https://new.example.com/hook', url: 'https://new.example.com/hook' }));
        await run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--url', 'https://new.example.com/hook', '--name', 'Receipts'] });

        assert.deepEqual(mock.requests[0].body, { hook_url: 'https://new.example.com/hook', name: 'Receipts' });
        assert.match(out.text(), /name:   Receipts/);
        assert.match(out.text(), /url:    https:\/\/new\.example\.com\/hook/);
    });

    it('sends status and receipt together with --receipt', async () => {
        await mockUpdate(webhook());
        await run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--receipt'] });
        assert.deepEqual(mock.requests[0].body, { event_types: ['contact.rvm.status', 'contact.rvm.receipt'] });
    });

    it('never prints a signing secret, even if the response carried one', async () => {
        await mockUpdate(webhook({ signing_secret: SIGNING_SECRET }));
        await run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--name', 'Renamed'] });
        assert.ok(!out.text().includes(SIGNING_SECRET));
        assert.ok(!out.text().includes(SECRET));
    });

    it('refuses an update with nothing to change before any request', async () => {
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID] }), /Nothing to update/);
        assert.deepEqual(mock.requests, []);
    });

    it('refuses a non-HTTPS url, a long name, and --url or --name without --update', async () => {
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--url', 'http://localhost:3000'] }), /HTTPS/);
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--name', 'x'.repeat(101)] }), /at most 100/);
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--name', 'Receipts'] }), /go with --update/);
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--update', '--url', 'https://a.example.com'] }), /--update needs a value/);
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--delete', WEBHOOK_ID, '--name', 'x'] }), /only one of/);
        assert.deepEqual(mock.requests, []);
    });

    it('lets an unknown webhook_id fail with the API error', async () => {
        await mock.close();
        mock = await startMockApi({ [UPDATE_KEY]: problem(404, 'Not Found', 'Webhook not found') });
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--update', WEBHOOK_ID, '--name', 'x'] }), (err) => err.status === 404);
    });
});

describe('subscribe: list, rotate, delete', () => {
    it('lists the webhooks, and needs no DC_PUBLIC_URL', async () => {
        await mock.close();
        mock = await startMockApi({
            'GET /register/public/webhooks': ok([webhook(), webhook({ webhook_id: OTHER_WEBHOOK_ID, event_types: ['*'] })])
        });
        await run({ env: baseEnv(mock), out, argv: ['--list'] });

        assert.deepEqual(mock.summary(), ['GET /register/public/webhooks']);
        assert.ok(out.text().includes(WEBHOOK_ID + '  contact.rvm.status, contact.rvm.receipt  https://tunnel.example.com/webhooks/dropcowboy'));
        assert.ok(out.text().includes(OTHER_WEBHOOK_ID + '  *  '));
    });

    it('says so when there are no webhooks', async () => {
        await mock.close();
        mock = await startMockApi({ 'GET /register/public/webhooks': ok([]) });
        await run({ env: baseEnv(mock), out, argv: ['--list'] });
        assert.match(out.text(), /No webhooks yet/);
    });

    it('deletes one webhook by its webhook_id', async () => {
        await mock.close();
        mock = await startMockApi({ ['DELETE /register/public/webhooks/' + WEBHOOK_ID]: ok({ result: true }) });
        await run({ env: baseEnv(mock), out, argv: ['--delete', WEBHOOK_ID] });

        assert.deepEqual(mock.summary(), ['DELETE /register/public/webhooks/' + WEBHOOK_ID]);
        assert.match(out.text(), /Your other webhooks are unchanged/);
    });

    it('rotates the secret of one webhook and prints only the last 4 of the new one', async () => {
        await mock.close();
        mock = await startMockApi({
            ['POST /register/public/webhooks/' + WEBHOOK_ID + '/rotate-secret']: ok({ webhook_id: WEBHOOK_ID, signing_secret: ROTATED_SECRET, signing_secret_created_at: 1774214999000 })
        });
        await run({ env: baseEnv(mock), out, argv: ['--rotate', WEBHOOK_ID] });

        assert.deepEqual(mock.summary(), ['POST /register/public/webhooks/' + WEBHOOK_ID + '/rotate-secret']);
        assert.match(out.text(), /new secret ends in 4e62/);
        assert.ok(!out.text().includes(ROTATED_SECRET));
        assert.match(out.text(), /keep the old secret there until in-flight deliveries have arrived/);
    });

    it('lets an unknown webhook_id fail with the API error', async () => {
        await mock.close();
        mock = await startMockApi({ ['DELETE /register/public/webhooks/' + WEBHOOK_ID]: problem(404, 'Not Found', 'Webhook not found') });
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--delete', WEBHOOK_ID] }), (err) => err.status === 404);
    });

    it('refuses a flag with no value, and conflicting flags, before any request', async () => {
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--delete'] }), /--delete needs a value/);
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--rotate', '--list'] }), /--rotate needs a value/);
        await assert.rejects(run({ env: baseEnv(mock), out, argv: ['--list', '--delete', WEBHOOK_ID] }), /only one of/);
        assert.deepEqual(mock.requests, []);
    });
});
