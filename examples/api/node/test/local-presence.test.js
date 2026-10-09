import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { run } from '../src/recipes/send-rvm-byoc-local-presence.js';
import { runAndSendCallback, WAITING_ENV } from '../testkit/flow.js';
import { LINE_ID, MEDIA_ID, SECRET, UUID, baseEnv, captureOutput } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { IMPORT_JOB_ID, ok, problem, standardRoutes } from '../testkit/routes.js';

const OWNED = ['+13125550161', '+13125550101'];
const IMPORT_PATH = '/phone/public/numbers/import/' + IMPORT_JOB_ID;
const NUMBERS_PATH = '/phone/public/lines/' + LINE_ID + '/numbers';
const FAST = { pollIntervalMs: 1, sleep: () => Promise.resolve() };

let mock;
let out;

function routes(overrides = {}) {
    return standardRoutes(Object.assign({
        'GET /phone/public/lines': ok([]),
        'POST /phone/public/lines': ok({ ivr_id: LINE_ID, name: 'Local presence', type: 'voice' }, 201),
        'POST /phone/public/numbers/import': ok({ long_job_id: IMPORT_JOB_ID, status: 'queued' }, 202),
        ['GET ' + IMPORT_PATH]: [
            ok({ status: 'processing' }),
            ok({ status: 'completed', result: { added: 2, updated: 0, invalid: 0, conflicts: 0, sample_invalid: [], sample_conflicts: [] } })
        ],
        ['GET ' + NUMBERS_PATH]: ok([{ phone_number: OWNED[0] }, { phone_number: OWNED[1] }])
    }, overrides));
}

function envFor(extra = {}) {
    return baseEnv(mock, Object.assign({ DC_MEDIA_ID: MEDIA_ID }, extra));
}

beforeEach(() => {
    out = captureOutput();
});

afterEach(async () => {
    await mock.close();
});

describe('send-rvm-byoc-local-presence', () => {
    it('creates a line, imports numbers, confirms them, then sends with phone_line_id only', async () => {
        mock = await startMockApi(routes());
        await run(Object.assign({ env: envFor({ DC_NUMBERS: OWNED.join(',') }), out }, FAST));

        assert.deepEqual(mock.summary(), [
            'GET /phone/public/lines',
            'POST /phone/public/lines',
            'POST /phone/public/numbers/import',
            'GET ' + IMPORT_PATH,
            'GET ' + IMPORT_PATH,
            'GET ' + NUMBERS_PATH,
            'POST /rvm'
        ]);

        const search = mock.find('GET', '/phone/public/lines')[0];
        assert.deepEqual(search.query, { search_term: 'Local presence' });

        const created = mock.find('POST', '/phone/public/lines')[0];
        assert.deepEqual(created.body, { name: 'Local presence', type: 'voice' });
        assert.equal(created.headers['idempotency-key'], undefined);

        assert.deepEqual(mock.find('POST', '/phone/public/numbers/import')[0].body, { phone_numbers: OWNED, phone_line_id: LINE_ID });

        const send = mock.find('POST', '/rvm')[0];
        assert.deepEqual(Object.keys(send.body).sort(), ['foreign_id', 'media_id', 'phone_line_id', 'to']);
        assert.equal(send.body.phone_line_id, LINE_ID);
        assert.equal(send.body.caller_id, undefined);
        assert.match(send.headers['idempotency-key'], UUID);
        assert.ok(!out.text().includes(SECRET));
    });

    it('prints the import counts and the numbers on the line', async () => {
        mock = await startMockApi(routes());
        await run(Object.assign({ env: envFor({ DC_NUMBERS: OWNED.join(',') }), out }, FAST));

        assert.match(out.text(), /Import finished: added=2 updated=0 invalid=0 conflicts=0/);
        assert.match(out.text(), /The line has 2 number\(s\): \+13125550161, \+13125550101/);
    });

    it('reuses a line whose name matches exactly, and does not create another', async () => {
        mock = await startMockApi(routes({ 'GET /phone/public/lines': ok([{ ivr_id: LINE_ID, name: 'Local presence', type: 'voice' }]) }));
        await run({ env: envFor(), out });

        assert.deepEqual(mock.find('POST', '/phone/public/lines'), []);
        assert.equal(mock.find('POST', '/rvm')[0].body.phone_line_id, LINE_ID);
    });

    it('does not reuse a line whose name only contains the search text', async () => {
        mock = await startMockApi(routes({ 'GET /phone/public/lines': ok([{ ivr_id: 'f1a3c5e7-9b2d-4f60-8a14-3c5e7a9b1d26', name: 'Local presence backup', type: 'voice' }]) }));
        await run({ env: envFor(), out });

        assert.equal(mock.find('POST', '/phone/public/lines').length, 1);
    });

    it('uses DC_LINE_NAME to find and name the line', async () => {
        mock = await startMockApi(routes());
        await run({ env: envFor({ DC_LINE_NAME: 'Sales outreach' }), out });

        assert.equal(mock.find('GET', '/phone/public/lines')[0].query.search_term, 'Sales outreach');
        assert.deepEqual(mock.find('POST', '/phone/public/lines')[0].body, { name: 'Sales outreach', type: 'voice' });
    });

    it('uses DC_PHONE_LINE_ID without looking up or creating a line', async () => {
        mock = await startMockApi(routes());
        await run({ env: envFor({ DC_PHONE_LINE_ID: LINE_ID }), out });

        assert.deepEqual(mock.summary(), ['GET ' + NUMBERS_PATH, 'POST /rvm']);
    });

    it('stops when the import job fails, and sends nothing', async () => {
        mock = await startMockApi(routes({
            ['GET ' + IMPORT_PATH]: [ok({ status: 'processing' }), ok({ status: 'failed', error: 'carrier lookup unavailable' })]
        }));

        await assert.rejects(run(Object.assign({ env: envFor({ DC_NUMBERS: OWNED[0] }), out }, FAST)), /Number import failed: carrier lookup unavailable/);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
    });

    it('stops with a clear message when the import never finishes', async () => {
        mock = await startMockApi(routes({ ['GET ' + IMPORT_PATH]: ok({ status: 'processing' }) }));

        await assert.rejects(run({ env: envFor({ DC_NUMBERS: OWNED[0] }), out, pollIntervalMs: 5, pollTimeoutMs: 20 }), /still running after/);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
    });

    it('refuses a number that is not E.164 before any request', async () => {
        mock = await startMockApi(routes());
        await assert.rejects(run({ env: envFor({ DC_NUMBERS: '212-555-0100' }), out }), /DC_NUMBERS must be in E\.164/);
        assert.deepEqual(mock.requests, []);
    });

    it('stops when the line ends up with no numbers', async () => {
        mock = await startMockApi(routes({ ['GET ' + NUMBERS_PATH]: ok([]) }));
        await assert.rejects(run({ env: envFor(), out }), /no numbers/);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
    });

    it('stops on a missing audio choice before creating anything', async () => {
        mock = await startMockApi(routes({ 'GET /media/public/media': ok({ medias: [], total: 0 }) }));
        await assert.rejects(run({ env: baseEnv(mock), out }), /No audio chosen and no media files found/);
        assert.deepEqual(mock.find('POST', '/phone/public/lines'), []);
    });

    it('accepts an audio_url because this recipe is for BYOC accounts', async () => {
        mock = await startMockApi(routes());
        await run({ env: baseEnv(mock, { DC_AUDIO_URL: 'https://audio.example.com/greeting.mp3' }), out });

        const body = mock.find('POST', '/rvm')[0].body;
        assert.equal(body.audio_url, 'https://audio.example.com/greeting.mp3');
        assert.equal(body.caller_id, undefined);
    });
});

describe('send-rvm-byoc-local-presence: area codes and renting', () => {
    const CANDIDATES = {
        'POST /phone/public/numbers/available': ok([
            { phone_number: '+13125550177', location_label: 'Chicago, IL' },
            { phone_number: '+13125550178', location_label: 'Chicago, IL' }
        ])
    };

    it('searches but does NOT rent unless DC_RENT=yes', async () => {
        mock = await startMockApi(routes(CANDIDATES));
        await run({ env: envFor({ DC_AREA_CODES: '312' }), out });

        assert.deepEqual(mock.find('POST', '/phone/public/numbers/available')[0].body, { country_iso: 'US', pattern: '312', type: 'local', limit: 3 });
        assert.deepEqual(mock.find('POST', '/phone/public/numbers/rent'), []);
        assert.match(out.text(), /Dry run: set DC_RENT=yes to rent these/);
    });

    it('does not rent for any other value of DC_RENT', async () => {
        mock = await startMockApi(routes(CANDIDATES));
        await run({ env: envFor({ DC_AREA_CODES: '312', DC_RENT: 'true' }), out });

        assert.deepEqual(mock.find('POST', '/phone/public/numbers/rent'), []);
    });

    it('rents the first candidate of each area code onto the line with DC_RENT=yes', async () => {
        mock = await startMockApi(routes(Object.assign({
            'POST /phone/public/numbers/rent': ok({ numbers: ['+13125550177'] }, 201)
        }, CANDIDATES)));
        await run({ env: envFor({ DC_AREA_CODES: '312', DC_RENT: 'yes' }), out });

        assert.deepEqual(mock.find('POST', '/phone/public/numbers/rent')[0].body, { numbers: ['+13125550177'], voice_ivr_id: LINE_ID });
        const order = mock.summary();
        assert.ok(order.indexOf('POST /phone/public/numbers/rent') < order.indexOf('GET ' + NUMBERS_PATH));
        assert.ok(order.indexOf('GET ' + NUMBERS_PATH) < order.indexOf('POST /rvm'));
    });

    it('imports before it searches', async () => {
        mock = await startMockApi(routes(CANDIDATES));
        await run(Object.assign({ env: envFor({ DC_NUMBERS: OWNED[0], DC_AREA_CODES: '312' }), out }, FAST));

        const order = mock.summary();
        assert.ok(order.indexOf('POST /phone/public/numbers/import') < order.indexOf('POST /phone/public/numbers/available'));
    });

    it('reports an area code with no numbers and rents nothing', async () => {
        mock = await startMockApi(routes({ 'POST /phone/public/numbers/available': ok([]) }));
        await run({ env: envFor({ DC_AREA_CODES: '312', DC_RENT: 'yes' }), out });

        assert.match(out.text(), /Area code 312: no numbers found/);
        assert.deepEqual(mock.find('POST', '/phone/public/numbers/rent'), []);
    });

    it('surfaces a rent failure with its request id', async () => {
        mock = await startMockApi(routes(Object.assign({
            'POST /phone/public/numbers/rent': problem(402, 'Payment Required', 'The carrier refused the order.')
        }, CANDIDATES)));

        await assert.rejects(run({ env: envFor({ DC_AREA_CODES: '312', DC_RENT: 'yes' }), out }), (err) => err.status === 402 && err.requestId !== null);
        assert.deepEqual(mock.find('POST', '/rvm'), []);
    });
});

describe('send-rvm-byoc-local-presence: the result', () => {
    it('prints the number the platform picked, with careful wording', async () => {
        mock = await startMockApi(routes());
        const env = envFor(WAITING_ENV);

        const { outcome } = await runAndSendCallback({ start: () => run({ env, out }), mock, out });

        assert.equal(outcome.result.from, '+12125550100');
        const printed = out.text();
        assert.match(printed, /Number used: \+12125550100/);
        assert.match(printed, /closest to the recipient/);
        assert.match(printed, /falls back to a number on the line/);
        assert.ok(printed.includes('Always identify your business location truthfully when asked by recipients.'));
        assert.ok(!/answer rate|pickup|more likely/i.test(printed));
    });

    it('says how to find the number when no result arrives', async () => {
        mock = await startMockApi(routes());
        await run({ env: envFor(), out });

        assert.match(out.text(), /shows which number was used/);
    });
});
