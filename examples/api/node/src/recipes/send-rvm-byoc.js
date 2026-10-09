// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Recipe: send a ringless voicemail on your own carrier (BYOC), from a number
// you are entitled to use, with audio you host.
// Always identify your business location truthfully when asked by recipients.
//
//   1. Check that a carrier is connected (GET /integration/public/byoc).
//   2. Pick the audio: DC_MEDIA_ID, else DC_AUDIO_FILE (uploaded first), else
//      DC_TTS_BODY, else DC_AUDIO_URL.
//   3. POST /rvm with caller_id and the audio. No phone_line_id: when both are
//      sent the line wins, and a number that is not in Drop Cowboy is not on a line.
//   4. Wait for the result on the callback or a webhook, then print it.

import { chooseAudioSource, noAudioError } from '../lib/audio.js';
import { clientFromEnv } from '../lib/client.js';
import { refuseSampleValues } from '../lib/sample-values.js';
import { isMain, printConsentLine, runCli } from '../lib/cli.js';
import { RecipeError, requireE164 } from '../lib/config.js';
import { DOCS_URL, resolveAudio } from '../lib/lookups.js';
import { sendAndWait } from '../lib/send-and-wait.js';
import { buildRvmBody, byocFromEnv } from '../lib/send.js';

async function run({ env = process.env, out = console, client = clientFromEnv(env), fetchFn } = {}) {
    printConsentLine(out);
    refuseSampleValues(env);
    const to = requireE164(env, 'DC_TO', 'Use a number you own, or one that agreed to hear from you.');
    const callerId = requireE164(env, 'DC_CALLER_ID', 'It is your own number at your carrier.');
    const byoc = byocFromEnv(env);
    if (chooseAudioSource(env) === null) {
        throw noAudioError();
    }

    await assertCarrierConnected(client);
    const audio = await resolveAudio({ client, env, out, mode: 'byoc', fetchFn });

    return sendAndWait({
        client,
        env,
        out,
        to,
        buildBody: function ({ foreignId, callbackUrl }) {
            return buildRvmBody({ to, callerId, audio, byoc, foreignId, callbackUrl });
        }
    });
}

// Stops early, with a pointer to the setup guide, instead of queuing a send
// that would fail later.
async function assertCarrierConnected(client) {
    const body = await client.get('/integration/public/byoc');
    if (!body || !body.data || body.data.connected !== true) {
        throw new RecipeError('No carrier is connected to this account. Connect one first: ' + DOCS_URL + '/bring-your-own-carrier');
    }
}

if (isMain(import.meta.url)) {
    await runCli(run);
}

export { run };
