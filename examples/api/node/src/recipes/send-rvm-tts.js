// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Recipe: send a ringless voicemail that speaks text (text to speech).
//
//   1. Pick the voice (DC_VOICE_ID, else the first voice that is ready) and
//      check the text length locally (1,200 characters).
//   2. Pick where to send from: a phone line (DC_MODE=retail, the default) or
//      your own number (DC_MODE=byoc, with DC_CALLER_ID).
//   3. Optional: DC_PREVIEW=yes synthesizes the text first so you can listen.
//      That call is billed per character.
//   4. POST /rvm with tts_body and voice_id. Never media_id or audio_url
//      alongside them: send exactly one audio option.
//   5. Wait for the result on the callback or a webhook, then print it.

import { clientFromEnv } from '../lib/client.js';
import { isMain, printConsentLine, runCli } from '../lib/cli.js';
import { assertTtsLength } from '../lib/audio.js';
import { RecipeError, optionalVar, requireE164, requireVar } from '../lib/config.js';
import { resolvePhoneLineId, resolveVoiceId } from '../lib/lookups.js';
import { refuseSampleValues } from '../lib/sample-values.js';
import { sendAndWait } from '../lib/send-and-wait.js';
import { buildRvmBody, byocFromEnv } from '../lib/send.js';

const MODES = ['retail', 'byoc'];

async function run({ env = process.env, out = console, client = clientFromEnv(env) } = {}) {
    printConsentLine(out);
    refuseSampleValues(env);
    const to = requireE164(env, 'DC_TO', 'Use a number you own, or one that agreed to hear from you.');
    const text = requireVar(env, 'DC_TTS_BODY', 'It is the text to speak.');
    assertTtsLength(text);
    const mode = modeFromEnv(env);
    const callerId = mode === 'byoc' ? requireE164(env, 'DC_CALLER_ID', 'DC_MODE=byoc sends from your own number.') : null;
    const byoc = mode === 'byoc' ? byocFromEnv(env) : null;

    const voiceId = await resolveVoiceId({ client, env, out });
    const phoneLineId = mode === 'retail' ? await resolvePhoneLineId({ client, env, out }) : null;

    // The preview runs after the free lookups, so a missing voice or line
    // stops the recipe before anything is billed.
    if (optionalVar(env, 'DC_PREVIEW') === 'yes') {
        await previewSpeech({ client, out, voiceId, text });
    }

    return sendAndWait({
        client,
        env,
        out,
        to,
        buildBody: function ({ foreignId, callbackUrl }) {
            const audio = { tts_body: text, voice_id: voiceId };
            return buildRvmBody({ to, phoneLineId, callerId, audio, byoc, foreignId, callbackUrl });
        }
    });
}

function modeFromEnv(env) {
    const mode = optionalVar(env, 'DC_MODE') || 'retail';
    if (!MODES.includes(mode)) {
        throw new RecipeError('DC_MODE must be retail or byoc.');
    }
    return mode;
}

async function previewSpeech({ client, out, voiceId, text }) {
    const body = await client.post('/voice/public/tts/synthesize', { voice_id: voiceId, text });
    const preview = body && body.data ? body.data : {};
    out.log('Preview audio: ' + preview.audio_url);
    if (typeof preview.expires_at === 'number') {
        out.log('Preview link expires: ' + new Date(preview.expires_at).toISOString());
    }
    out.log('Preview characters (billed per character): ' + preview.tts_characters);
}

if (isMain(import.meta.url)) {
    await runCli(run);
}

export { run };
