// Canned API answers for the mock server. Shapes follow v2/openapi/openapi.yaml.

import { LINE_ID, MEDIA_ID, MESSAGE_ID, VOICE_ID } from './helpers.js';

const REQUEST_ID = '4c8e1a7d-2b5f-4d93-a6e0-3f9b7c1d5a42';
const IMPORT_JOB_ID = '9d3f5b7a-1e2c-4a68-b4d0-6c8e2a4f1b93';
const UPLOADED_MEDIA_ID = '2c7a9e4f-6b1d-4f58-8a3e-0d9c5b2f7e41';
const IMPORTED_MEDIA_ID = '4e9b1f6c-8a3d-4c27-b6e1-5f0a2d8c4b73';
const UPLOAD_PATH = '/uploads/' + UPLOADED_MEDIA_ID;

function meta() {
    return { request_id: REQUEST_ID };
}

function ok(data, status = 200) {
    return { status, body: { data, meta: meta() } };
}

function problem(status, title, detail, code) {
    return {
        status,
        body: {
            type: 'https://api-v2.dropcowboy.com/errors/' + title.toLowerCase().replace(/\s+/g, '-'),
            title,
            status,
            detail,
            request_id: REQUEST_ID,
            details: code ? { code } : undefined
        }
    };
}

function standardRoutes(overrides = {}) {
    return Object.assign({
        'GET /phone/public/lines': ok([{ ivr_id: LINE_ID, name: 'Main line', type: 'voice', is_default: true }]),
        'GET /media/public/media': ok({ medias: [{ media_id: MEDIA_ID, name: 'Greeting' }], total: 1 }),
        'GET /voice/public/voices': ok({ voices: [{ voice_id: VOICE_ID, name: 'Alex', status: 'ready' }] }),
        'GET /integration/public/byoc': ok({ connected: true }),
        'POST /rvm': { status: 202, body: { status: 'queued', message_id: MESSAGE_ID } }
    }, overrides);
}

// The three calls of a signed upload, plus URL import. The upload URLs point
// back at the mock, which answers a PUT with 403 unless its Content-Type is
// exactly the content_type it handed out, the way the storage service does.
function mediaUploadRoutes(overrides = {}) {
    const formats = { mp3: 'audio/mpeg', wav: 'audio/wav' };
    const routes = {
        'POST /media/public/media': function (request) {
            if (request.body && request.body.signed_upload === true) {
                const upload = {};
                for (const [ext, contentType] of Object.entries(formats)) {
                    upload[ext] = { url: 'http://' + request.headers.host + UPLOAD_PATH + '.' + ext + '?expires=1774214712&signature=5d0c7e2a9b41f3e8', content_type: contentType };
                }
                return ok({ media_id: UPLOADED_MEDIA_ID, name: request.body.name, upload }, 201);
            }
            return ok({ media_id: IMPORTED_MEDIA_ID, name: request.body ? request.body.name : '' }, 201);
        },
        ['POST /media/public/media/' + UPLOADED_MEDIA_ID + '/complete']: ok({ media_id: UPLOADED_MEDIA_ID, media_exists: true })
    };
    for (const [ext, contentType] of Object.entries(formats)) {
        routes['PUT ' + UPLOAD_PATH + '.' + ext] = function (request) {
            return request.headers['content-type'] === contentType
                ? { status: 200, body: '' }
                : { status: 403, body: '<Error><Code>SignatureDoesNotMatch</Code></Error>' };
        };
    }
    return Object.assign(routes, overrides);
}

export { IMPORTED_MEDIA_ID, IMPORT_JOB_ID, REQUEST_ID, UPLOADED_MEDIA_ID, UPLOAD_PATH, mediaUploadRoutes, ok, problem, standardRoutes };
