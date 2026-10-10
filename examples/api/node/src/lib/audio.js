// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Chooses which audio field goes on the wire. POST /rvm takes exactly one of
// media_id, tts_body (with voice_id) or audio_url, so only one is ever sent.

import { RecipeError, optionalVar } from './config.js';
import { audioFileSource } from './media.js';

const TTS_MAX_CHARACTERS = 1200;

const AUDIO_VARIABLES = 'DC_MEDIA_ID, DC_AUDIO_FILE, DC_TTS_BODY or DC_AUDIO_URL';

// Precedence: DC_MEDIA_ID, then DC_AUDIO_FILE (uploaded, then sent as
// media_id), then DC_TTS_BODY, then DC_AUDIO_URL.
// Returns { kind: 'media' | 'file' | 'tts' | 'url', value } or null when none
// is set. For 'file', value is what audioFileSource returns.
function chooseAudioSource(env) {
    const mediaId = optionalVar(env, 'DC_MEDIA_ID');
    if (mediaId !== null) {
        return { kind: 'media', value: mediaId };
    }
    const audioFile = optionalVar(env, 'DC_AUDIO_FILE');
    if (audioFile !== null) {
        return { kind: 'file', value: audioFileSource(audioFile, optionalVar(env, 'DC_MEDIA_NAME')) };
    }
    const ttsBody = optionalVar(env, 'DC_TTS_BODY');
    if (ttsBody !== null) {
        assertTtsLength(ttsBody);
        return { kind: 'tts', value: ttsBody };
    }
    const audioUrl = optionalVar(env, 'DC_AUDIO_URL');
    if (audioUrl !== null) {
        return { kind: 'url', value: audioUrl };
    }
    return null;
}

// Checked here so a long text fails before any request. The API counts the
// text after merge fields are filled in and refuses it with 3021 when it is
// over 1,200 characters, so leave room if your text has merge fields.
function assertTtsLength(text) {
    const length = Array.from(text).length;
    if (length > TTS_MAX_CHARACTERS) {
        throw new RecipeError('DC_TTS_BODY is ' + length + ' characters. The limit is ' + TTS_MAX_CHARACTERS + ' after merge fields are filled in. Shorten the text.');
    }
}

function noAudioError() {
    return new RecipeError('No audio chosen. Set one of ' + AUDIO_VARIABLES + '.');
}

// Turns a chosen source into the one field (or field pair) for the request
// body. An uploaded file has become a 'media' source by the time it gets here.
function audioFields(source, voiceId) {
    if (source.kind === 'media') {
        return { media_id: source.value };
    }
    if (source.kind === 'tts') {
        return { tts_body: source.value, voice_id: voiceId };
    }
    return { audio_url: source.value };
}

export { AUDIO_VARIABLES, TTS_MAX_CHARACTERS, assertTtsLength, audioFields, chooseAudioSource, noAudioError };
