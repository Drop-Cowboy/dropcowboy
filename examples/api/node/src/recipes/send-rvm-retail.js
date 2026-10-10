// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Recipe: send a ringless voicemail from one of your phone lines.
//
//   1. Pick the phone line (DC_PHONE_LINE_ID, else your default line).
//   2. Pick the audio: DC_MEDIA_ID, else DC_AUDIO_FILE (uploaded first), else
//      DC_TTS_BODY, else DC_AUDIO_URL, else the first media file you have.
//   3. POST /rvm with the line and the audio. No caller_id: an account that is
//      not on bring-your-own-carrier ignores it and always sends from a line.
//   4. Wait for the result on the callback or a webhook, then print it.

import { chooseAudioSource } from '../lib/audio.js';
import { clientFromEnv } from '../lib/client.js';
import { isMain, printConsentLine, runCli } from '../lib/cli.js';
import { requireE164 } from '../lib/config.js';
import { resolveAudio, resolvePhoneLineId } from '../lib/lookups.js';
import { refuseSampleValues } from '../lib/sample-values.js';
import { sendAndWait } from '../lib/send-and-wait.js';
import { buildRvmBody } from '../lib/send.js';

async function run({ env = process.env, out = console, client = clientFromEnv(env), fetchFn } = {}) {
    printConsentLine(out);
    refuseSampleValues(env);
    const to = requireE164(env, 'DC_TO', 'Use a number you own, or one that agreed to hear from you.');
    // Checked now so a wrong DC_AUDIO_FILE stops the run before any request.
    chooseAudioSource(env);

    const phoneLineId = await resolvePhoneLineId({ client, env, out });
    const audio = await resolveAudio({ client, env, out, mode: 'retail', fetchFn });

    return sendAndWait({
        client,
        env,
        out,
        to,
        buildBody: function ({ foreignId, callbackUrl }) {
            return buildRvmBody({ to, phoneLineId, audio, foreignId, callbackUrl });
        }
    });
}

if (isMain(import.meta.url)) {
    await runCli(run);
}

export { run };
