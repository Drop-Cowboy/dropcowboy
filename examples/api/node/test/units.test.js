import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { assertTtsLength, chooseAudioSource } from '../src/lib/audio.js';
import { RecipeError, baseUrl, callbackUrl, publicUrl, receiverPort, splitList, waitSeconds } from '../src/lib/config.js';
import { callbackResult, describeResult, parseJsonObject, printable, webhookResult } from '../src/lib/events.js';
import { findDefaultLine } from '../src/lib/lookups.js';
import { buildRvmBody, newForeignId } from '../src/lib/send.js';
import { isResultFor } from '../src/lib/send-and-wait.js';
import { FIXTURE_FOREIGN_ID, UUID, fixtureJson } from '../testkit/helpers.js';

describe('audio choice', () => {
    it('prefers media, then text to speech, then a URL', () => {
        const all = { DC_MEDIA_ID: 'm', DC_TTS_BODY: 't', DC_AUDIO_URL: 'u' };
        assert.deepEqual(chooseAudioSource(all), { kind: 'media', value: 'm' });
        assert.deepEqual(chooseAudioSource({ DC_TTS_BODY: 't', DC_AUDIO_URL: 'u' }), { kind: 'tts', value: 't' });
        assert.deepEqual(chooseAudioSource({ DC_AUDIO_URL: 'u' }), { kind: 'url', value: 'u' });
        assert.equal(chooseAudioSource({}), null);
    });

    it('treats blank values as not set', () => {
        assert.equal(chooseAudioSource({ DC_MEDIA_ID: '  ', DC_TTS_BODY: '', DC_AUDIO_URL: '' }), null);
    });

    it('counts characters, not bytes, against the 1,200 limit', () => {
        assertTtsLength('\u00e9'.repeat(1200));
        assert.throws(() => assertTtsLength('\u00e9'.repeat(1201)), RecipeError);
    });
});

describe('settings', () => {
    it('defaults and validates the wait, the port and the base URL', () => {
        assert.equal(waitSeconds({}), 300);
        assert.equal(waitSeconds({ DC_WAIT_SECONDS: '0' }), 0);
        assert.throws(() => waitSeconds({ DC_WAIT_SECONDS: 'soon' }), /whole number/);
        assert.equal(receiverPort({}), 3000);
        assert.equal(receiverPort({ PORT: '0' }), 0);
        assert.throws(() => receiverPort({ PORT: '70000' }), /PORT/);
        assert.equal(baseUrl({}), 'https://api-v2.dropcowboy.com');
        assert.equal(baseUrl({ DC_BASE_URL: 'http://127.0.0.1:9999/' }), 'http://127.0.0.1:9999');
    });

    it('builds the callback URL from DC_PUBLIC_URL, or leaves it out', () => {
        assert.equal(callbackUrl({}), null);
        assert.equal(callbackUrl({ DC_PUBLIC_URL: 'https://tunnel.example.com/' }), 'https://tunnel.example.com/callbacks/dropcowboy');
        assert.throws(() => publicUrl({ DC_PUBLIC_URL: 'tunnel.example.com' }), /https:\/\//);
    });

    it('splits comma separated lists and drops blanks', () => {
        assert.deepEqual(splitList(' 312, 415 ,,'), ['312', '415']);
        assert.deepEqual(splitList(undefined), []);
    });
});

describe('request body', () => {
    it('leaves out everything that is not set', () => {
        const body = buildRvmBody({ to: '+13125550142', phoneLineId: 'l', audio: { media_id: 'm' }, foreignId: 'f', callbackUrl: null });
        assert.deepEqual(body, { to: '+13125550142', phone_line_id: 'l', media_id: 'm', foreign_id: 'f' });
    });

    it('makes the foreign_id a plain uuid', () => {
        assert.match(newForeignId(), UUID);
    });
});

describe('phone line default', () => {
    it('prefers a default voice line over another default line', () => {
        const lines = [{ ivr_id: 'a', type: 'sms', is_default: true }, { ivr_id: 'b', type: 'voice', is_default: true }];
        assert.equal(findDefaultLine(lines).ivr_id, 'b');
    });

    it('returns null when no line is the default', () => {
        assert.equal(findDefaultLine([{ ivr_id: 'a', type: 'voice' }]), null);
    });
});

describe('results', () => {
    it('reads the callback fixture', () => {
        const result = callbackResult(fixtureJson('callback.rvm-success.json'));
        assert.equal(result.status, 'success');
        assert.equal(result.to, '+13125550142');
        assert.equal(result.from, '+12125550100');
        assert.equal(result.foreign_id, FIXTURE_FOREIGN_ID);
    });

    it('reads the webhook fixture, which has no foreign_id', () => {
        const result = webhookResult(fixtureJson('webhook.rvm-status.json'));
        assert.equal(result.to, '+13125550142');
        assert.equal(result.from, '+12125550100');
        assert.equal(result.foreign_id, undefined);
    });

    it('keeps one result line readable and skips fields that are absent', () => {
        const line = describeResult('callback', null, { status: 'failure', reason: 'VoiceMail Full', reason_code: 4002, to: '+13125550142' });
        assert.equal(line, 'callback status=failure reason="VoiceMail Full" reason_code=4002 to=+13125550142');
    });

    it('replaces control characters and caps long values', () => {
        assert.equal(printable('a\u001b[2Jb'), 'a?[2Jb');
        assert.ok(printable('x'.repeat(500)).length < 210);
    });

    it('parses only JSON objects', () => {
        assert.deepEqual(parseJsonObject(Buffer.from('{"a":1}')), { a: 1 });
        assert.equal(parseJsonObject(Buffer.from('[1]')), null);
        assert.equal(parseJsonObject(Buffer.from('')), null);
        assert.equal(parseJsonObject(Buffer.from('null')), null);
    });

    it('does not take a receipt event for the result of a send', () => {
        const matches = isResultFor({ foreignId: 'f', to: '+13125550142', sentAt: 0 });
        const receipt = { source: 'webhook', event: 'contact.rvm.receipt', received_at: 1, result: { to: '+13125550142' } };
        const status = { source: 'webhook', event: 'contact.rvm.status', received_at: 1, result: { to: '+13125550142' } };
        const otherRecipient = { source: 'webhook', event: 'contact.rvm.status', received_at: 1, result: { to: '+13125550199' } };
        assert.equal(matches(receipt), false);
        assert.equal(matches(status), true);
        assert.equal(matches(otherRecipient), false);
    });

    it('ignores a result that arrived before the send', () => {
        const matches = isResultFor({ foreignId: 'f', to: '+13125550142', sentAt: 100 });
        assert.equal(matches({ source: 'callback', event: 'callback', received_at: 50, result: { foreign_id: 'f' } }), false);
        assert.equal(matches({ source: 'callback', event: 'callback', received_at: 150, result: { foreign_id: 'f' } }), true);
    });
});
