// Send only to people who agreed to hear from you. Test with numbers you own.
//
// What to do next, for the problems a first integration runs into most.

const API_LOGS_HINT = 'Check Settings > API Logs, which shows the outcome and what your endpoint answered.';

const AUDIO_URL_SUPPORT = 'audio_url is an option for BYOC plans only and must be enabled by support. '
    + 'Contact support to enable it. If you\'re testing on a retail account before connecting your carrier, '
    + 'support can enable it for testing, and you can then send only to your test numbers. '
    + 'Otherwise, upload the file and send media_id, or use text to speech.';

const UPLOAD_403 = 'The upload URL refused the file (403). Usually one of two things: the Content-Type '
    + 'header did not match exactly the content_type returned with the URL, or the URL expired (upload URLs '
    + 'last 2 days). Run upload-media again for fresh URLs, or import the file from a public URL instead: '
    + 'set DC_AUDIO_FILE to an https:// address of the .mp3 or .wav file.';

const OUTCOME_HINTS = {
    3001: 'Audio file not valid: for example a media_id that is not on your account, or an audio_url that '
        + 'could not be downloaded or is not MP3 or WAV. Upload the file with upload-media and send the '
        + 'media_id it prints.',
    3014: 'Not allowed audio_url. ' + AUDIO_URL_SUPPORT,
    3040: 'Test Numbers Only: this account can send only to its test numbers right now, and this number is '
        + 'not one of them. Send to one of your test numbers, or ask support to end testing mode.'
};

// The hint for a reason code, or null when there is none for it.
function outcomeHint(reasonCode) {
    const code = Number(reasonCode);
    return Object.prototype.hasOwnProperty.call(OUTCOME_HINTS, code) ? OUTCOME_HINTS[code] : null;
}

export { API_LOGS_HINT, AUDIO_URL_SUPPORT, OUTCOME_HINTS, UPLOAD_403, outcomeHint };
