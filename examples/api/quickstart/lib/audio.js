// Send only to people who agreed to hear from you. Test with numbers you own.
//
// The four ways to give the voicemail its audio. Exactly one audio field goes
// on the send:
//
//   upload  DC_AUDIO_FILE  signed upload, then media_id      (the default)
//   media   DC_MEDIA_ID    a file already in your library -> media_id
//   url     DC_AUDIO_URL   a hosted file -> audio_url        (BYOC, enabled by support)
//   tts     DC_TTS_BODY    text to speech -> tts_body + voice_id

import fs from 'node:fs';
import path from 'node:path';

import { dataOf } from './api.js';
import { UPLOAD_403 } from './messages.js';
import { Stop } from './stop.js';

// 1. POST /media/public/media { name, type: "rvm", signed_upload: true }
// 2. PUT the bytes to upload.mp3.url or upload.wav.url with exactly its content_type
// 3. POST /media/public/media/{media_id}/complete
async function uploadFile({ client, config, out, fetchFn = fetch }) {
    const file = config.audioFile;
    const ext = path.extname(file).toLowerCase() === '.wav' ? 'wav' : 'mp3';
    let bytes;
    try {
        bytes = fs.readFileSync(file);
    } catch (err) {
        throw new Stop('Cannot read DC_AUDIO_FILE (' + file + '): ' + (err.code || err.message) + '.');
    }
    const name = config.mediaName || 'Quickstart ' + path.basename(file);

    const created = dataOf(await client.post('/media/public/media', { name, type: 'rvm', signed_upload: true })) || {};
    const target = created.upload && created.upload[ext];
    if (typeof created.media_id !== 'string' || !target || typeof target.url !== 'string' || typeof target.content_type !== 'string') {
        throw new Stop('POST /media/public/media did not return a media_id and an upload.' + ext + ' URL.');
    }
    out.log('Upload: created media ' + created.media_id + ', uploading ' + bytes.length + ' bytes as ' + target.content_type);

    // The signed URL is the credential. Send no API key to it, and send the
    // Content-Type exactly as returned, or the storage answers 403.
    let put;
    try {
        put = await fetchFn(target.url, { method: 'PUT', headers: { 'Content-Type': target.content_type }, body: bytes, signal: AbortSignal.timeout(120000) });
        await put.arrayBuffer();
    } catch (err) {
        throw new Stop('The upload did not finish: ' + ((err && err.message) || 'network error') + '. Try again; the URL stays valid for 2 days.');
    }
    if (put.status === 403) {
        throw new Stop(UPLOAD_403);
    }
    if (!put.ok) {
        throw new Stop('The upload URL answered ' + put.status + '. Try again, or get fresh URLs with GET /media/public/media/' + created.media_id + '/policy.');
    }

    const done = dataOf(await client.post('/media/public/media/' + created.media_id + '/complete')) || {};
    if (done.media_exists === false) {
        throw new Stop('The upload was completed but the file is not there yet. Check it with GET /media/public/media/' + created.media_id + '.');
    }
    out.log('Uploaded. media_id=' + created.media_id);
    out.log('Reuse this file next time without uploading again: DC_AUDIO=media DC_MEDIA_ID=' + created.media_id);
    return { media_id: created.media_id };
}

// Confirms the media_id is on this account, so a typo stops here instead of
// failing after the 202 with 3001.
async function checkMedia({ client, config, out }) {
    try {
        await client.get('/media/public/media/' + encodeURIComponent(config.mediaId));
    } catch (err) {
        if (err.status === 404) {
            throw new Stop('DC_MEDIA_ID ' + config.mediaId + ' is not in your media library. A send with it would fail with 3001 (Audio file not valid). List yours with GET /media/public/media, or set DC_AUDIO=upload.');
        }
        out.log('Audio: could not confirm DC_MEDIA_ID (' + err.describe() + '). Sending anyway.');
        return { media_id: config.mediaId };
    }
    out.log('Audio: media ' + config.mediaId);
    return { media_id: config.mediaId };
}

// DC_VOICE_ID, else the first voice with status "ready".
async function resolveVoice({ client, config, out }) {
    if (config.voiceId) {
        return config.voiceId;
    }
    const data = dataOf(await client.get('/voice/public/voices')) || {};
    const voices = Array.isArray(data.voices) ? data.voices : [];
    for (let i = 0; i < voices.length; i++) {
        if (voices[i] && voices[i].status === 'ready' && typeof voices[i].voice_id === 'string') {
            out.log('Voice: "' + (voices[i].name || voices[i].voice_id) + '" (' + voices[i].voice_id + ')');
            return voices[i].voice_id;
        }
    }
    throw new Stop('No voice to speak with. Set DC_VOICE_ID, or create a voice in the dashboard. GET /voice/public/voices returned none with status "ready".');
}

async function resolveAudio({ client, config, out, fetchFn }) {
    if (config.audio === 'upload') {
        return uploadFile({ client, config, out, fetchFn });
    }
    if (config.audio === 'media') {
        return checkMedia({ client, config, out });
    }
    if (config.audio === 'url') {
        out.log('Audio: audio_url ' + config.audioUrl);
        return { audio_url: config.audioUrl };
    }
    const voiceId = await resolveVoice({ client, config, out });
    out.log('Audio: text to speech, ' + config.ttsBody.length + ' characters');
    return { tts_body: config.ttsBody, voice_id: voiceId };
}

export { resolveAudio };
