import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { RecipeError } from '../src/lib/config.js';
import { AUDIO_URL_SUPPORT, outcomeHint } from '../src/lib/hints.js';
import { SAMPLE_VALUES, findSampleValues } from '../src/lib/sample-values.js';
import { run as runByoc } from '../src/recipes/send-rvm-byoc.js';
import { run as runLocalPresence } from '../src/recipes/send-rvm-byoc-local-presence.js';
import { run as runRetail } from '../src/recipes/send-rvm-retail.js';
import { run as runTts } from '../src/recipes/send-rvm-tts.js';
import { run as runSubscribe } from '../src/subscribe.js';
import { run as runUpload } from '../src/upload-media.js';
import { runAndSendCallback, WAITING_ENV } from '../testkit/flow.js';
import { KEY, LINE_ID, MEDIA_ID, SECRET, VOICE_ID, baseEnv, captureOutput, fixtureJson } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { IMPORTED_MEDIA_ID, UPLOADED_MEDIA_ID, UPLOAD_PATH, mediaUploadRoutes, ok, standardRoutes } from '../testkit/routes.js';

const AUDIO_BYTES = Buffer.from([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0xff, 0xfb]);
const AUDIO_URL = 'https://audio.example.com/offer.mp3';
const CALLER_ID = '+13125550177';
const TEXT = 'Hi, this is Example Dental with a reminder about your appointment tomorrow.';
const UPLOAD_CALLS = ['POST /media/public/media', 'PUT ' + UPLOAD_PATH + '.mp3', 'POST /media/public/media/' + UPLOADED_MEDIA_ID + '/complete'];

let mock;
let out;
let dir;

function audioFile(name, bytes = AUDIO_BYTES) {
    const file = path.join(dir, name);
    writeFileSync(file, bytes);
    return file;
}

function routes(overrides = {}) {
    return standardRoutes(Object.assign(mediaUploadRoutes(), overrides));
}

// The POST /rvm body with the per-send foreign_id taken out, so it can be
// compared with an exact expected body.
function sentBody() {
    const sends = mock.find('POST', '/rvm');
    assert.equal(sends.length, 1);
    const body = Object.assign({}, sends[0].body);
    assert.match(body.foreign_id, /^[0-9a-f-]{36}$/);
    delete body.foreign_id;
    return body;
}

beforeEach(() => {
    out = captureOutput();
    dir = mkdtempSync(path.join(tmpdir(), 'dc-media-'));
});

afterEach(async () => {
    rmSync(dir, { recursive: true, force: true });
    if (mock) {
        await mock.close();
        mock = null;
    }
});

describe('upload-media', () => {
    it('creates the media, PUTs the bytes with exactly the returned Content-Type, then completes it', async () => {
        mock = await startMockApi(routes());
        const file = audioFile('greeting.mp3');

        const mediaId = await runUpload({ env: baseEnv(mock, { DC_AUDIO_FILE: file }), out });

        assert.equal(mediaId, UPLOADED_MEDIA_ID);
        assert.deepEqual(mock.summary(), UPLOAD_CALLS);
        const [create, put, complete] = mock.requests;
        assert.deepEqual(create.body, { name: 'greeting.mp3', type: 'rvm', signed_upload: true });
        assert.equal(create.headers['x-key'], KEY);
        assert.equal(put.headers['content-type'], 'audio/mpeg');
        assert.equal(put.query.signature, '5d0c7e2a9b41f3e8');
        assert.ok(put.rawBytes.equals(AUDIO_BYTES));
        assert.equal(put.headers['x-key'], undefined, 'the signed URL must not get the API key');
        assert.equal(put.headers['x-secret'], undefined, 'the signed URL must not get the API secret');
        assert.deepEqual(complete.body, {});
        assert.equal(complete.headers['x-key'], KEY);
        assert.match(out.text(), new RegExp('media_id: ' + UPLOADED_MEDIA_ID));
        assert.match(out.text(), new RegExp('DC_MEDIA_ID=' + UPLOADED_MEDIA_ID));
        assert.ok(!out.text().includes(SECRET));
        assert.ok(!out.text().includes('signature='), 'the signed URL was printed');
    });

    it('uses the wav URL and audio/wav for a .wav file, and DC_MEDIA_NAME for the name', async () => {
        mock = await startMockApi(routes());
        const file = audioFile('Reminder.WAV');

        await runUpload({ env: baseEnv(mock, { DC_AUDIO_FILE: file, DC_MEDIA_NAME: 'Spring reminder' }), out });

        assert.deepEqual(mock.summary(), ['POST /media/public/media', 'PUT ' + UPLOAD_PATH + '.wav', 'POST /media/public/media/' + UPLOADED_MEDIA_ID + '/complete']);
        assert.equal(mock.requests[0].body.name, 'Spring reminder');
        assert.equal(mock.requests[1].headers['content-type'], 'audio/wav');
    });

    it('explains a 403 from the upload URL and does not complete the media', async () => {
        mock = await startMockApi(routes({
            ['PUT ' + UPLOAD_PATH + '.mp3']: { status: 403, body: '<Error><Code>AccessDenied</Code></Error>' }
        }));
        const file = audioFile('greeting.mp3');

        await assert.rejects(runUpload({ env: baseEnv(mock, { DC_AUDIO_FILE: file }), out }), (err) => {
            assert.ok(err instanceof RecipeError);
            assert.match(err.message, /403/);
            assert.match(err.message, /Content-Type/);
            assert.match(err.message, /2 days/);
            assert.match(err.message, /public URL/);
            return true;
        });
        assert.deepEqual(mock.summary(), UPLOAD_CALLS.slice(0, 2));
    });

    it('imports from a URL with name, url and ext in one call', async () => {
        mock = await startMockApi(routes());

        const mediaId = await runUpload({ env: baseEnv(mock, { DC_AUDIO_FILE: AUDIO_URL }), out });

        assert.equal(mediaId, IMPORTED_MEDIA_ID);
        assert.deepEqual(mock.summary(), ['POST /media/public/media']);
        assert.deepEqual(mock.requests[0].body, { name: 'offer.mp3', type: 'rvm', url: AUDIO_URL, ext: '.mp3' });
    });

    it('refuses a file that is not .mp3 or .wav, or is missing, before any request', async () => {
        mock = await startMockApi(routes());
        await assert.rejects(runUpload({ env: baseEnv(mock, { DC_AUDIO_FILE: audioFile('greeting.ogg') }), out }), /\.mp3 or \.wav/);
        await assert.rejects(runUpload({ env: baseEnv(mock, { DC_AUDIO_FILE: path.join(dir, 'nope.mp3') }), out }), /no file at/);
        await assert.rejects(runUpload({ env: baseEnv(mock, { DC_AUDIO_FILE: audioFile('empty.mp3', Buffer.alloc(0)) }), out }), /is empty/);
        await assert.rejects(runUpload({ env: baseEnv(mock), out }), /DC_AUDIO_FILE is not set/);
        assert.deepEqual(mock.requests, []);
    });
});

describe('audio precedence on POST /rvm (retail)', () => {
    it('sends media_id from DC_MEDIA_ID, ahead of every other source', async () => {
        mock = await startMockApi(routes());
        await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID, DC_AUDIO_FILE: audioFile('a.mp3'), DC_TTS_BODY: TEXT, DC_AUDIO_URL: AUDIO_URL }), out });

        assert.deepEqual(mock.summary(), ['GET /phone/public/lines', 'POST /rvm']);
        assert.deepEqual(sentBody(), { to: '+13125550142', phone_line_id: LINE_ID, media_id: MEDIA_ID });
    });

    it('uploads DC_AUDIO_FILE and sends its media_id, ahead of text to speech and audio_url', async () => {
        mock = await startMockApi(routes());
        await runRetail({ env: baseEnv(mock, { DC_AUDIO_FILE: audioFile('a.mp3'), DC_TTS_BODY: TEXT, DC_AUDIO_URL: AUDIO_URL }), out });

        assert.deepEqual(mock.summary(), ['GET /phone/public/lines'].concat(UPLOAD_CALLS, ['POST /rvm']));
        assert.deepEqual(sentBody(), { to: '+13125550142', phone_line_id: LINE_ID, media_id: UPLOADED_MEDIA_ID });
    });

    it('sends tts_body and voice_id from DC_TTS_BODY, ahead of audio_url', async () => {
        mock = await startMockApi(routes());
        await runRetail({ env: baseEnv(mock, { DC_TTS_BODY: TEXT, DC_AUDIO_URL: AUDIO_URL }), out });

        assert.deepEqual(sentBody(), { to: '+13125550142', phone_line_id: LINE_ID, tts_body: TEXT, voice_id: VOICE_ID });
    });

    it('sends audio_url last, with the note on when it is accepted', async () => {
        mock = await startMockApi(routes());
        await runRetail({ env: baseEnv(mock, { DC_AUDIO_URL: AUDIO_URL }), out });

        assert.deepEqual(sentBody(), { to: '+13125550142', phone_line_id: LINE_ID, audio_url: AUDIO_URL });
        assert.ok(out.text().includes(AUDIO_URL_SUPPORT));
    });

    it('never sends caller_id, whichever source is used', async () => {
        const sources = [{ DC_MEDIA_ID: MEDIA_ID }, { DC_AUDIO_FILE: 'file' }, { DC_TTS_BODY: TEXT }, { DC_AUDIO_URL: AUDIO_URL }];
        for (const source of sources) {
            mock = await startMockApi(routes());
            const extra = source.DC_AUDIO_FILE ? { DC_AUDIO_FILE: audioFile('a.mp3') } : source;
            await runRetail({ env: baseEnv(mock, Object.assign({ DC_CALLER_ID: CALLER_ID }, extra)), out });
            assert.equal(mock.find('POST', '/rvm')[0].body.caller_id, undefined);
            await mock.close();
            mock = null;
        }
    });

    it('stops on a wrong DC_AUDIO_FILE before looking up the line', async () => {
        mock = await startMockApi(routes());
        await assert.rejects(runRetail({ env: baseEnv(mock, { DC_AUDIO_FILE: path.join(dir, 'missing.mp3') }), out }), /no file at/);
        assert.deepEqual(mock.requests, []);
    });

    it('uploads DC_AUDIO_FILE on BYOC too, after the carrier check', async () => {
        mock = await startMockApi(routes());
        await runByoc({ env: baseEnv(mock, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_FILE: audioFile('a.mp3') }), out });

        assert.deepEqual(mock.summary(), ['GET /integration/public/byoc'].concat(UPLOAD_CALLS, ['POST /rvm']));
        assert.deepEqual(sentBody(), { to: '+13125550142', caller_id: CALLER_ID, media_id: UPLOADED_MEDIA_ID });
    });
});

describe('doc sample values', () => {
    const SAMPLE_ID = SAMPLE_VALUES.ids[0];
    const SAMPLE_NUMBER = SAMPLE_VALUES.phone_numbers[0];

    it('match ../fixtures/doc-sample-values.json', () => {
        const fixture = fixtureJson('doc-sample-values.json');
        assert.deepEqual(SAMPLE_VALUES, { ids: fixture.ids, phone_numbers: fixture.phone_numbers, url_hosts: fixture.url_hosts });
    });

    it('finds ids, numbers, list items and URL hosts, and nothing else', () => {
        const found = findSampleValues({
            DC_MEDIA_ID: SAMPLE_ID.toUpperCase(),
            DC_TO: SAMPLE_NUMBER,
            DC_NUMBERS: '+13125550161, ' + SAMPLE_VALUES.phone_numbers[1],
            DC_AUDIO_URL: 'https://cdn.example.com/greeting.mp3',
            DC_PUBLIC_URL: 'https://hooks.example.com',
            DC_PHONE_LINE_ID: LINE_ID,
            DC_CALLER_ID: CALLER_ID,
            OTHER: SAMPLE_ID
        });
        assert.deepEqual(found, [
            'DC_AUDIO_URL=https://cdn.example.com/greeting.mp3: this is a sample value from our docs; use your own.',
            'DC_MEDIA_ID=' + SAMPLE_ID.toUpperCase() + ': this is a sample value from our docs; use your own.',
            'DC_NUMBERS=' + SAMPLE_VALUES.phone_numbers[1] + ': this is a sample value from our docs; use your own.',
            'DC_PUBLIC_URL=https://hooks.example.com: this is a sample value from our docs; use your own.',
            'DC_TO=' + SAMPLE_NUMBER + ': this is a sample value from our docs; use your own.'
        ]);
    });

    const CASES = [
        ['send-rvm-retail', runRetail, { DC_MEDIA_ID: SAMPLE_ID }, 'DC_MEDIA_ID=' + SAMPLE_ID],
        ['send-rvm-retail', runRetail, { DC_MEDIA_ID: MEDIA_ID, DC_PHONE_LINE_ID: SAMPLE_VALUES.ids[1] }, 'DC_PHONE_LINE_ID=' + SAMPLE_VALUES.ids[1]],
        ['send-rvm-retail', runRetail, { DC_MEDIA_ID: MEDIA_ID, DC_TO: SAMPLE_NUMBER }, 'DC_TO=' + SAMPLE_NUMBER],
        ['send-rvm-retail', runRetail, { DC_AUDIO_FILE: 'https://files.example.com/a.mp3' }, 'DC_AUDIO_FILE=https://files.example.com/a.mp3'],
        ['send-rvm-retail', runRetail, Object.assign({ DC_MEDIA_ID: MEDIA_ID }, WAITING_ENV, { DC_PUBLIC_URL: 'https://hooks.example.com' }), 'DC_PUBLIC_URL=https://hooks.example.com'],
        ['send-rvm-byoc', runByoc, { DC_CALLER_ID: SAMPLE_NUMBER, DC_AUDIO_URL: AUDIO_URL }, 'DC_CALLER_ID=' + SAMPLE_NUMBER],
        ['send-rvm-byoc', runByoc, { DC_CALLER_ID: CALLER_ID, DC_AUDIO_URL: 'https://cdn.example.com/a.mp3' }, 'DC_AUDIO_URL=https://cdn.example.com/a.mp3'],
        ['send-rvm-byoc-local-presence', runLocalPresence, { DC_MEDIA_ID: MEDIA_ID, DC_NUMBERS: '+13125550161,' + SAMPLE_NUMBER }, 'DC_NUMBERS=' + SAMPLE_NUMBER],
        ['send-rvm-tts', runTts, { DC_TTS_BODY: TEXT, DC_VOICE_ID: SAMPLE_VALUES.ids[2] }, 'DC_VOICE_ID=' + SAMPLE_VALUES.ids[2]],
        ['upload-media', runUpload, { DC_AUDIO_FILE: 'https://cdn.example.com/a.mp3' }, 'DC_AUDIO_FILE=https://cdn.example.com/a.mp3'],
        ['subscribe', runSubscribe, { DC_PUBLIC_URL: 'https://hooks.example.com' }, 'DC_PUBLIC_URL=https://hooks.example.com']
    ];

    for (const [name, command, extra, expected] of CASES) {
        it(name + ' refuses ' + expected.split('=')[0] + ' before any request', async () => {
            mock = await startMockApi(routes());
            await assert.rejects(command({ env: baseEnv(mock, extra), out, argv: [] }), (err) => {
                assert.ok(err instanceof RecipeError);
                assert.ok(err.message.includes(expected + ': this is a sample value from our docs; use your own.'), err.message);
                return true;
            });
            assert.deepEqual(mock.requests, []);
        });
    }
});

describe('outcome hints', () => {
    it('has the public wording for 3014, 3040 and 3001, and nothing for other codes', () => {
        assert.ok(outcomeHint(3014).includes('audio_url is an option for BYOC plans only and must be enabled by support.'));
        assert.match(outcomeHint(3040), /^Test Numbers Only: .*test numbers/);
        assert.match(outcomeHint('3001'), /^Audio file not valid: .*media_id that is not on your account/);
        assert.equal(outcomeHint(4002), null);
        assert.equal(outcomeHint(0), null);
    });

    it('prints the hint after the result', async () => {
        mock = await startMockApi(routes());
        const env = baseEnv(mock, Object.assign({ DC_MEDIA_ID: MEDIA_ID }, WAITING_ENV));

        await runAndSendCallback({
            start: () => runRetail({ env, out }),
            mock,
            out,
            overrides: { status: 'failure', reason: 'Test Numbers Only', reason_code: 3040 }
        });

        const lines = out.lines;
        const result = lines.findIndex((line) => line.startsWith('Result: callback status=failure'));
        assert.ok(result >= 0);
        assert.match(lines[result + 1], /^What to do: Test Numbers Only:/);
    });

    it('points to the API logs when no result arrives', async () => {
        mock = await startMockApi(routes({ 'GET /media/public/media': ok({ medias: [{ media_id: MEDIA_ID }], total: 1 }) }));
        await runRetail({ env: baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }), out });
        assert.match(out.text(), /Settings > API Logs/);
    });
});
