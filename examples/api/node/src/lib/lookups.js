// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Reads that fill in the ids a send needs: phone line, media file, voice.

import { AUDIO_VARIABLES, audioFields, chooseAudioSource, noAudioError } from './audio.js';
import { RecipeError, optionalVar } from './config.js';
import { AUDIO_URL_SUPPORT } from './hints.js';
import { uploadMedia } from './media.js';

const DOCS_URL = 'https://www.dropcowboy.com/developers/api';

// DC_PHONE_LINE_ID, else the account's default phone line.
async function resolvePhoneLineId({ client, env, out }) {
    const configured = optionalVar(env, 'DC_PHONE_LINE_ID');
    if (configured !== null) {
        return configured;
    }
    const body = await client.get('/phone/public/lines');
    const line = findDefaultLine(listOf(body));
    if (line === null) {
        throw new RecipeError('No phone line to send from. Set DC_PHONE_LINE_ID, or make one of your phone lines the default. Without either, the API answers with reason code 4010 (No Caller ID).');
    }
    out.log('Phone line: default line "' + (line.name || line.ivr_id) + '" (' + line.ivr_id + ')');
    return line.ivr_id;
}

// A line's `ivr_id` is the phone_line_id. The default flag is `is_default` in
// the responses the service returns; the OpenAPI schema names it `default`, so
// both are read. An account has one default per line type, and a send uses the
// default voice line.
function findDefaultLine(lines) {
    let fallback = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line && (line.is_default === true || line.default === true)) {
            if (line.type === 'voice') {
                return line;
            }
            if (fallback === null) {
                fallback = line;
            }
        }
    }
    return fallback;
}

async function firstMediaId(client) {
    const body = await client.get('/media/public/media', { query: { limit: 1 } });
    const medias = body && body.data && Array.isArray(body.data.medias) ? body.data.medias : [];
    return medias.length > 0 ? medias[0].media_id : null;
}

// DC_VOICE_ID, else the first voice that is ready to use.
async function resolveVoiceId({ client, env, out }) {
    const configured = optionalVar(env, 'DC_VOICE_ID');
    if (configured !== null) {
        return configured;
    }
    const body = await client.get('/voice/public/voices');
    const voices = body && body.data && Array.isArray(body.data.voices) ? body.data.voices : [];
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].status === 'ready') {
            out.log('Voice: "' + (voices[i].name || voices[i].voice_id) + '" (' + voices[i].voice_id + ')');
            return voices[i].voice_id;
        }
    }
    throw new RecipeError('No voice to speak with. Set DC_VOICE_ID, or create a voice. GET /voice/public/voices returned none with status "ready".');
}

// The audio source is chosen by chooseAudioSource (see audio.js). Every mode
// accepts all four; they differ only when nothing is set:
//   retail, local-presence  The first media file on the account is used.
//   byoc                    The recipe stops: nothing is looked up unless an
//                           upload or text to speech needs it.
// DC_AUDIO_FILE is uploaded here and sent as media_id. DC_AUDIO_URL is sent as
// it is, with a note on when the API accepts it (reason code 3014 otherwise).
async function resolveAudio({ client, env, out, mode, fetchFn }) {
    const source = chooseAudioSource(env);

    if (source === null) {
        if (mode === 'byoc') {
            throw noAudioError();
        }
        const mediaId = await firstMediaId(client);
        if (mediaId === null) {
            throw new RecipeError('No audio chosen and no media files found. Set one of ' + AUDIO_VARIABLES + '. To upload a file, set DC_AUDIO_FILE. See ' + DOCS_URL + '/media');
        }
        out.log('Audio: first media file on your account (' + mediaId + ')');
        return audioFields({ kind: 'media', value: mediaId });
    }

    if (source.kind === 'file') {
        const mediaId = await uploadMedia({ client, source: source.value, out, fetchFn });
        return audioFields({ kind: 'media', value: mediaId });
    }

    if (source.kind === 'url') {
        out.log('About DC_AUDIO_URL: ' + AUDIO_URL_SUPPORT);
    }

    const voiceId = source.kind === 'tts' ? await resolveVoiceId({ client, env, out }) : undefined;
    return audioFields(source, voiceId);
}

function listOf(body) {
    return body && Array.isArray(body.data) ? body.data : [];
}

export { DOCS_URL, findDefaultLine, firstMediaId, listOf, resolveAudio, resolvePhoneLineId, resolveVoiceId };
