// Send only to people who agreed to hear from you. Test with numbers you own.
//
// One-off script: put an audio file on your account and print its media_id.
// Run "npm run upload-media" with DC_AUDIO_FILE set to a .mp3 or .wav file on
// this computer (signed upload), or to an https:// address of one (import).
// DC_MEDIA_NAME names the file in your media library; it defaults to the file
// name. Needs an API key with the media:write scope.
//
// Then send it: set DC_MEDIA_ID to the id it prints.

import { clientFromEnv } from './lib/client.js';
import { isMain, runCli } from './lib/cli.js';
import { optionalVar, requireVar } from './lib/config.js';
import { audioFileSource, uploadMedia } from './lib/media.js';
import { refuseSampleValues } from './lib/sample-values.js';

async function run({ env = process.env, out = console, client = clientFromEnv(env), fetchFn } = {}) {
    refuseSampleValues(env);
    const value = requireVar(env, 'DC_AUDIO_FILE', 'Set it to a .mp3 or .wav file on this computer, or to an https:// address of one.');
    const source = audioFileSource(value, optionalVar(env, 'DC_MEDIA_NAME'));

    const mediaId = await uploadMedia({ client, source, out, fetchFn });
    out.log('media_id: ' + mediaId);
    out.log('To send it, set DC_MEDIA_ID=' + mediaId);
    return mediaId;
}

if (isMain(import.meta.url)) {
    await runCli(run);
}

export { run };
