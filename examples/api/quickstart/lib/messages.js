// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Text the quickstart prints, kept in one place.

const CONSENT_LINE = 'Send only to people who agreed to hear from you. Test with numbers you own.';

const OUTCOMES_URL = 'https://www.dropcowboy.com/developers/api/outcomes';

const API_LOGS_HINT = 'Check Settings > API Logs, which shows the outcome and what your endpoint answered.';

const AUDIO_URL_SUPPORT = 'audio_url is an option for BYOC plans only and must be enabled by support. '
    + 'Contact support to enable it. If you\'re testing on a retail account before connecting your carrier, '
    + 'support can enable it for testing, and you can then send only to your test numbers. '
    + 'Otherwise, upload the file and send media_id, or use text to speech.';

const UPLOAD_403 = 'The upload URL refused the file (403). Usually one of two things: the Content-Type '
    + 'header did not match exactly the content_type returned with the URL, or the URL expired (upload URLs '
    + 'last 2 days). Get fresh URLs with GET /media/public/media/{media_id}/policy and upload again, or '
    + 'import the file from a public URL instead: POST /media/public/media with { name, url, ext }.';

// The reason codes a first send is most likely to see. Every code is listed at OUTCOMES_URL.
const REASON_CODES = {
    0: 'Success: the voicemail was left in the mailbox. The carrier decides when it shows up.',
    3000: 'No Funds: your balance is empty. Add funds or turn on auto-recharge, then send again.',
    3001: 'Audio file not valid: for example a media_id that is not on your account, or an audio_url that could not be downloaded or is not MP3 or WAV.',
    3002: 'No Voice: voice_id is not valid, or text to speech was sent without a voice_id.',
    3007: 'Not authorized: the key or secret was wrong, expired, or missing a scope.',
    3011: 'Must be E.164 format: send numbers as +, country code, number.',
    3012: 'Phone number not valid.',
    3013: 'Invalid IVR or Route: the phone_line_id is not valid or is not yours.',
    3014: 'Not allowed audio_url. ' + AUDIO_URL_SUPPORT,
    3015: 'No TTS: voice_id was sent without tts_body.',
    3019: 'Invalid Callback: callback_url is not a valid public http(s) URL.',
    3021: 'TTS too long: tts_body is over 1,200 characters after merge fields.',
    3022: 'Not Allowed in Trial: trial accounts can send only to numbers verified on the account.',
    3027: 'Idempotency Key Conflict: the key was used before with a different body.',
    3033: 'Media Not Found: the media_id was deleted, belongs to another account, or its upload was never completed.',
    3040: 'Test Numbers Only: this account can send only to its test numbers right now, and this number is not one of them.',
    4000: 'VoiceMail Not Detected: try another time of day.',
    4001: 'VoiceMail Not Setup: the mailbox was never set up. Retrying will not help.',
    4002: 'VoiceMail Full: the mailbox is full. Retrying will not help.',
    4010: 'No Caller ID: no phone line to send from. Pass phone_line_id, or set a default line.',
    4013: 'Too Many Attempts: the number reached your contact frequency limit. Test numbers are exempt.',
    4016: 'Internal DNC: the number is on your do-not-contact list.',
    4017: 'Known Litigator: the number is on a known litigator list.'
};

function reasonMeaning(code) {
    const number = Number(code);
    if (Object.prototype.hasOwnProperty.call(REASON_CODES, number)) {
        return REASON_CODES[number];
    }
    return 'See ' + OUTCOMES_URL + ' for this code.';
}

export { API_LOGS_HINT, AUDIO_URL_SUPPORT, CONSENT_LINE, OUTCOMES_URL, REASON_CODES, UPLOAD_403, reasonMeaning };
