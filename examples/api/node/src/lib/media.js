// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Puts an audio file on your account and returns its media_id. Two ways in,
// both need an API key with the media:write scope:
//
//   A file on this computer (signed upload)
//     1. POST /media/public/media { name, type: "rvm", signed_upload: true }
//        answers with the media_id and one upload URL per format:
//        data.upload.mp3 and data.upload.wav, each { url, content_type }.
//     2. PUT the file's bytes to the URL for its format, with a Content-Type
//        header of exactly that content_type and nothing else. The URL is
//        already signed, so it never gets your key or secret.
//     3. POST /media/public/media/{media_id}/complete. Until then the file
//        cannot be sent.
//
//   A file at a public URL (import)
//     POST /media/public/media { name, type: "rvm", url, ext }. The file is
//     fetched and ready when the call returns.

import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { RecipeError } from './config.js';
import { UPLOAD_403 } from './hints.js';

const FORMATS = ['.mp3', '.wav'];
const UPLOAD_TIMEOUT_MS = 120000;

// Reads DC_AUDIO_FILE: a path to a .mp3 or .wav file, or an http(s) URL of
// one. Checked here, before any request, so a typo stops the run early.
// Returns { kind: 'file', path, ext, name } or { kind: 'url', url, ext, name }.
function audioFileSource(value, mediaName) {
    if (/^https?:\/\//i.test(value)) {
        let url;
        try {
            url = new URL(value);
        } catch (err) {
            throw new RecipeError('DC_AUDIO_FILE is not a valid URL.');
        }
        const ext = formatOf(url.pathname, 'DC_AUDIO_FILE');
        return { kind: 'url', url: value, ext, name: mediaName || decodeURIComponent(path.posix.basename(url.pathname)) };
    }
    const ext = formatOf(value, 'DC_AUDIO_FILE');
    if (!existsSync(value) || !statSync(value).isFile()) {
        throw new RecipeError('DC_AUDIO_FILE: there is no file at ' + value + '.');
    }
    if (statSync(value).size === 0) {
        throw new RecipeError('DC_AUDIO_FILE: ' + value + ' is empty.');
    }
    return { kind: 'file', path: value, ext, name: mediaName || path.basename(value) };
}

function formatOf(name, variable) {
    const ext = path.extname(name).toLowerCase();
    if (!FORMATS.includes(ext)) {
        throw new RecipeError(variable + ' must name a .mp3 or .wav file.');
    }
    return ext;
}

// Returns the media_id of the uploaded or imported file.
async function uploadMedia({ client, source, out, fetchFn = fetch }) {
    if (source.kind === 'url') {
        out.log('Importing ' + source.url + ' as "' + source.name + '"...');
        const body = await client.post('/media/public/media', { name: source.name, type: 'rvm', url: source.url, ext: source.ext });
        const mediaId = mediaIdOf(body);
        out.log('Imported: media_id=' + mediaId);
        return mediaId;
    }

    const bytes = readFileSync(source.path);
    const created = await client.post('/media/public/media', { name: source.name, type: 'rvm', signed_upload: true });
    const mediaId = mediaIdOf(created);
    const target = uploadTarget(created, source.ext);

    out.log('Uploading ' + source.name + ' (' + bytes.length + ' bytes, ' + target.content_type + ')...');
    await putFile({ url: target.url, contentType: target.content_type, bytes, fetchFn });

    await client.post('/media/public/media/' + encodeURIComponent(mediaId) + '/complete', {});
    out.log('Uploaded: media_id=' + mediaId);
    return mediaId;
}

// The signed URL is the only credential this request needs. Sending x-key or
// x-secret here would hand them to the storage service, and any header other
// than the exact Content-Type breaks the signature (403).
async function putFile({ url, contentType, bytes, fetchFn }) {
    let response;
    try {
        response = await fetchFn(url, {
            method: 'PUT',
            headers: { 'Content-Type': contentType },
            body: bytes,
            signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS)
        });
    } catch (err) {
        const timedOut = err && err.name === 'TimeoutError';
        throw new RecipeError(timedOut
            ? 'The upload did not finish within ' + (UPLOAD_TIMEOUT_MS / 1000) + ' seconds. Try again, or import the file from a public URL.'
            : 'Could not reach the upload URL: ' + ((err && err.message) || 'network error'));
    }
    await response.arrayBuffer();
    if (response.status === 403) {
        throw new RecipeError(UPLOAD_403);
    }
    if (!response.ok) {
        throw new RecipeError('The upload URL answered ' + response.status + '. Run upload-media again for fresh URLs.');
    }
}

function mediaIdOf(body) {
    const mediaId = body && body.data ? body.data.media_id : null;
    if (typeof mediaId !== 'string' || mediaId === '') {
        throw new RecipeError('The API did not return a media_id.');
    }
    return mediaId;
}

function uploadTarget(body, ext) {
    const uploads = body && body.data && body.data.upload ? body.data.upload : {};
    const target = uploads[ext.slice(1)];
    if (!target || typeof target.url !== 'string' || typeof target.content_type !== 'string') {
        throw new RecipeError('The API did not return an upload URL for ' + ext + ' files.');
    }
    return target;
}

export { UPLOAD_TIMEOUT_MS, audioFileSource, uploadMedia };
