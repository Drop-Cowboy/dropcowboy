# Drop Cowboy API: Node.js example

Send only to people who agreed to hear from you. Test with numbers you own.

Working code for the ringless voicemail route of the Drop Cowboy API, plus a
receiver that checks webhook signatures. It uses plain `fetch` and Express 4. There
is no SDK, no TypeScript and no build step.

New to the API? Start with the [quickstart](../quickstart/), then come back here.

| Command | What it does |
|---|---|
| `npm run send:retail` | Sends a voicemail from one of your phone lines. |
| `npm run send:byoc` | Sends from your own number, on your own carrier (bring your own carrier). |
| `npm run send:local-presence` | Puts several numbers on a phone line, then sends with the line so the platform picks the number. |
| `npm run send:tts` | Sends a voicemail that speaks text you provide. |
| `npm run subscribe` | Creates a webhook that delivers results to your receiver. Also lists, updates, rotates and deletes webhooks. |
| `npm run receiver` | Runs only the receiver, to watch results arrive. |
| `npm run upload-media` | Uploads `DC_AUDIO_FILE` to your media library and prints its `media_id`. |
| `npm run check-receiver -- <callback-url> [webhook-url]` | Posts a sample result to your own endpoints and explains the answer. Calls no API. |
| `npm run detect:twilio` | Calls a number from your own Twilio account, lets Detection listen, and plays your message on the beep or to a live person. See [Detection with Twilio](#detection-with-twilio). |
| `npm test` | Runs the tests. They use a mock API and spend nothing. |

## Prerequisites

- Node.js 20.6 or newer (`node --version`).
- A Drop Cowboy API key and secret. Create them under **Developers > API Keys** in the dashboard.
- A phone you own to receive the test voicemail. Use a number you own, or one that agreed to hear from you.
- To see results arrive, an HTTPS address that reaches your computer (see [Expose the receiver](#expose-the-receiver)). This is optional: without it a send still goes out, and you can follow the result in your dashboard.

## Set up

```bash
npm install
cp .env.example .env
```

Open `.env` and set at least `DC_KEY`, `DC_SECRET` and `DC_TO` (the recipient, in E.164 format such as `+13125550142`). Every variable is explained in `.env.example`.

The scripts load `.env` with `node --env-file=.env`, which is built into Node 20.6 and newer. `.env` is ignored by git. Keep it that way: it holds your secret.

## Expose the receiver

Drop Cowboy reports the result of each send to a URL you provide. The receiver in `src/receiver.js` listens on your computer, so you need an HTTPS tunnel from the internet to it. Any tunnel works: use the one you already have.

1. Start your tunnel and point it at port `3000` (or the `PORT` you set).
2. Copy the public `https://` address it gives you.
3. Set `DC_PUBLIC_URL` in `.env` to that address, with no trailing path.

The receiver has two routes:

| Route | Used for | Signed? |
|---|---|---|
| `POST /callbacks/dropcowboy` | The `callback_url` each send carries. One attempt, 10 second timeout. | No |
| `POST /webhooks/dropcowboy` | A webhook delivery. Answer `2xx` within 5 seconds, or it is retried. | Yes, `X-Signature` |

To receive webhooks as well, create a webhook. A webhook is one URL, the event types it receives and its own signing secret, and an account can hold many:

```bash
npm run subscribe                          # one webhook for contact.rvm.status
npm run subscribe -- --receipt             # one webhook for contact.rvm.status and contact.rvm.receipt (proof of delivery link)
npm run subscribe -- --events a,b          # one webhook for exactly these event types
npm run subscribe -- --list                # your webhooks, by webhook_id
npm run subscribe -- --update <webhook_id> --events a,b --url <https url> --name "My hook" # change one webhook
npm run subscribe -- --rotate <webhook_id> # a new signing secret for that webhook
npm run subscribe -- --delete <webhook_id> # delete that webhook, and no other
```

`--update` sends only what you pass (`--url`, `--events a,b` or `--receipt`, `--name`), and at least one is required. The event types you pass replace that webhook's whole set. The `webhook_id` and the signing secret do not change, so the receiver needs no new secret. Creating a webhook prints the `webhook_id` and the last four characters of its signing secret. The receiver loads your signing secrets from the API when it starts. To use your own, set `DC_WEBHOOK_SECRET` (comma separated for more than one).

## Run a recipe

Each recipe starts the receiver, sends one voicemail, waits for the result (up to `DC_WAIT_SECONDS`, 300 by default), prints a summary and exits. Set `DC_WAIT_SECONDS=0` to send and exit at once.

### Retail: send from a phone line

```bash
npm run send:retail
```

Uses `DC_PHONE_LINE_ID`, or your default phone line. The request is `phone_line_id` plus exactly one audio source, and never `caller_id`: the line decides which of its numbers the recipient sees. The audio is the first of these that is set:

1. `DC_MEDIA_ID`, a file already in your media library.
2. `DC_AUDIO_FILE`, a `.mp3` or `.wav` that the recipe uploads first (see [Upload audio](#upload-audio)), then sends as `media_id`.
3. `DC_TTS_BODY` with `DC_VOICE_ID` (or your first ready voice), to speak text.
4. `DC_AUDIO_URL`, sent as `audio_url`. audio_url is an option for BYOC plans only and must be enabled by support. Contact support to enable it. If you're testing on a retail account before connecting your carrier, support can enable it for testing, and you can then send only to your test numbers. Otherwise, upload the file and send media_id, or use text to speech.

With none of them set, it sends the first media file on your account.

### Bring your own carrier

```bash
npm run send:byoc
```

Needs `DC_CALLER_ID` and one audio setting, in the same order as retail: `DC_MEDIA_ID`, `DC_AUDIO_FILE`, `DC_TTS_BODY` or `DC_AUDIO_URL`. The caller ID must be a number you are entitled to use, such as your own number at your carrier. Always identify your business location truthfully when asked by recipients. The recipe checks that a carrier is connected first, before it uploads anything. The request carries no `phone_line_id`.

To pass your STIR/SHAKEN details, set both `DC_STI_ORIG_ID` (a UUID) and `DC_STI_ATTESTATION`. The level your carrier assigned to the number: A, B or C. Never send a higher level than your carrier gave you.

### Local presence

```bash
npm run send:local-presence
```

Local presence puts several numbers on one phone line. You send with the line and without `caller_id`, and the platform picks the number. It chooses the number on the line closest to the recipient, and falls back to a number on the line when it cannot place the recipient. You do not choose it, so this recipe never sends `caller_id`. Always identify your business location truthfully when asked by recipients.

The recipe:

1. Finds the line named `DC_LINE_NAME` (default `Local presence`) or creates it.
2. Loads numbers you own from `DC_NUMBERS`, and waits for the import to finish.
3. Searches the area codes in `DC_AREA_CODES`. It rents the first match for each code **only** when you set `DC_RENT=yes`. Renting charges your carrier, so without it you see a dry run.
4. Confirms the line has numbers, sends, and prints the number that was used.

### Text to speech

```bash
npm run send:tts
```

Speaks `DC_TTS_BODY` (1,200 characters or fewer, counted after merge fields are filled in) with `DC_VOICE_ID`, or your first ready voice. `DC_MODE=retail` (the default) sends from a phone line. `DC_MODE=byoc` sends from `DC_CALLER_ID`. Set `DC_PREVIEW=yes` to synthesize the text first so you can listen; that call is billed per character.

### Upload audio

```bash
npm run upload-media
```

With `DC_AUDIO_FILE` set in `.env`, this prints `media_id: ...`. Set `DC_MEDIA_ID` to it to send that file from now on. `DC_MEDIA_NAME` names the file in your media library (default: the file name). The key needs the `media:write` scope. The recipes upload `DC_AUDIO_FILE` the same way when you set it instead of `DC_MEDIA_ID`.

A file on this computer goes up in three calls, and `src/lib/media.js` shows each one:

1. `POST /media/public/media` with `{"name": "...", "type": "rvm", "signed_upload": true}`. The answer has the `media_id` and, under `upload.mp3` and `upload.wav`, a signed `url` and the `content_type` to send with it.
2. `PUT` the file's bytes to the `url` for its format, with a `Content-Type` header of exactly that `content_type`, and nothing else. The URL is already signed, so it never gets your key or secret.
3. `POST /media/public/media/{media_id}/complete`. Until then the file cannot be sent.

Set `DC_AUDIO_FILE` to an `https://` address of a `.mp3` or `.wav` instead, and the file is imported in one call: `POST /media/public/media` with `{"name": "...", "type": "rvm", "url": "...", "ext": ".mp3"}`.

### Check your receiver

```bash
npm run check-receiver -- https://abc123.example.com/callbacks/dropcowboy https://abc123.example.com/webhooks/dropcowboy
```

Posts the sample callback in `../fixtures/callback.rvm-success.json` to the first URL, and a sample `contact.rvm.status` webhook to the second, signed with the first secret in `DC_WEBHOOK_SECRET` and a fresh timestamp. It calls your endpoints only, never the API, and needs no API key. Each answer gets one verdict:

| Verdict | Answer | Meaning |
|---|---|---|
| ok | `2xx` in time | Your endpoint accepted it. |
| route | `404` or `405` | The route or the verb is wrong. The endpoint must accept `POST` at exactly that path. |
| auth | `401` or `403` | The signature check is failing (webhook), or the path asks for authentication a callback never carries. |
| slow | no answer in 10 seconds (callback) or 5 seconds (webhook) | Answer `2xx` first, then do the work. |
| rejected | any other status | A callback is not retried, so that result is lost. A webhook is retried only after `408`, `429`, `5xx` or a timeout, at most 3 attempts in all. |
| unreachable | no connection | The server or tunnel is down, or the host is not public. |

It exits with code 1 when any check fails.

## What you should see

```text
Send only to people who agreed to hear from you. Test with numbers you own.
Phone line: default line "Main line" (3d8f1b6a-9e2c-4a7d-b5f0-8c1e4a7d2b69)
Audio: first media file on your account (6a1f4c8e-2b7d-4e93-a5c0-9d3b7e1f4a26)
Signing secrets: 1 (...7c30) loaded from /register/public/account/webhook-signing-secret
Receiver listening on http://127.0.0.1:3000 (routes: /callbacks/dropcowboy, /webhooks/dropcowboy)
Accepted (202): message_id=8e4a2c6f-9d1b-4f7e-b3a5-6c9e1f4d2b78 foreign_id=0c2e4a6b-8d1f-4a3c-9e5b-7d9f1b3a5c82
A 202 means the request was queued. The result comes next, as a status and a reason code.
Waiting up to 300 seconds for the result...
callback status=success reason="" reason_code=0 to=+13125550142 from=+12125550100 foreign_id=0c2e4a6b-8d1f-4a3c-9e5b-7d9f1b3a5c82
Result: callback status=success reason="" reason_code=0 to=+13125550142 from=+12125550100 foreign_id=0c2e4a6b-8d1f-4a3c-9e5b-7d9f1b3a5c82
What each reason_code means: https://www.dropcowboy.com/developers/api/outcomes
```

A `202` means the request was accepted and queued. It does not mean the voicemail reached anyone. The result arrives afterwards as a `status` and a `reason_code`; [Outcomes](https://www.dropcowboy.com/developers/api/outcomes) lists each one.

For reason codes `3001`, `3014` and `3040` the summary adds a `What to do:` line.

A status webhook does not carry your `foreign_id`, so the recipes match it on the recipient number and on arriving after the send.

When something goes wrong, the recipe prints the HTTP status, the error title, detail and code, and the request id, then exits with code 1. It never prints your headers. Quote the request id if you contact support.

## Where are my results?

`POST /rvm` answers `202` when it queues the send. That is all a `202` means: the outcome comes later, three ways.

- **Your `callback_url`.** Unsigned, one attempt, 10 second timeout.
- **A signed webhook** for `contact.rvm.status`, if you subscribed. Answer `2xx` within 5 seconds.
- **Settings > API Logs** in the dashboard, which shows the outcome and what your endpoint answered.

If your endpoint answers anything but `2xx`, the result does not reach your code. A `404` or `405` is never retried, and neither is a callback. Check API Logs for what your endpoint answered, then run `npm run check-receiver` against the same URLs until every check passes.

## Detection with Twilio

This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.

```bash
npm run detect:twilio
```

The recipe calls `DC_TO` from `TWILIO_FROM` with your own Twilio account. When the call is answered, Twilio sends a copy of the call audio to Detection with `<Start><Stream>`. Detection posts what it hears (a voicemail, the beep, a live person) to the receiver as signed webhooks, and the recipe updates the live call with Twilio's REST API: on the beep it plays your voicemail message, and to a live person it plays your live message. It sends no ringless voicemail. Twilio is called over plain HTTPS with `fetch`, like the Drop Cowboy API: there is no Twilio SDK.

It acts at most once per call. In order:

1. Checks every setting before any request, and prints every problem it finds.
2. Uses `DC_DETECTION_KEY`, or creates a temporary Detection key with `DC_KEY` and `DC_SECRET` (the API key needs `balance:read` to list Detection keys and `account:write` to create and delete them). A temporary key expires in one hour, and the recipe deletes it at the end. It also deletes one left over by an earlier run.
3. Checks the Twilio account is active and not a trial, and that `TWILIO_FROM` is a number in it or a verified caller ID on it.
4. Starts the receiver and checks that `DC_PUBLIC_URL/health` reaches it through your tunnel.
5. Creates the call. Waits for Detection, then plays the message or hangs up.
6. Prints a summary. Then it hangs up a call that is still up, deletes the temporary key and closes the receiver. It does this after an error and after Ctrl+C too. A second Ctrl+C quits at once, without cleaning up.

Every outcome in the summary exits with code 0. A settings, preflight or request error, or a cleanup step that failed, exits with code 1. Ctrl+C (or SIGTERM) exits with code 130, after the cleanup.

**Twilio trial accounts are not supported.** A trial account plays a notice and waits for a key press before your TwiML runs, so Detection would hear the notice instead of the person. The recipe stops before the call. Upgrade the account to run it.

### Settings

| Variable | Required | Meaning |
|---|---|---|
| `TWILIO_ACCOUNT_SID` | Yes | Starts with `AC`, 34 characters. Printed as its last 4 only. |
| `TWILIO_AUTH_TOKEN` | Yes | Signs into Twilio and checks `X-Twilio-Signature`. Never printed. |
| `TWILIO_FROM` | Yes | Caller ID in E.164: a number in the Twilio account, or a verified caller ID on it. |
| `DC_TO` | Yes | The number to call, in E.164. Someone who agreed to hear from you. |
| `DC_PUBLIC_URL` | Yes | Your tunnel's `https://` address. It must be on port 443, with no query string, and on a public host. |
| `DC_DETECTION_KEY` | One of | A Detection key. |
| `DC_KEY`, `DC_SECRET` | One of | Used only without `DC_DETECTION_KEY`, to create a temporary key. Needs `balance:read` and `account:write`. |
| `DC_VM_AUDIO_URL` | One of | An `https://` MP3 or WAV that plays on the beep. |
| `DC_VM_TEXT` | One of | Text spoken on the beep when `DC_VM_AUDIO_URL` is unset. 1,000 characters or fewer. |
| `DC_LIVE_AUDIO_URL`, `DC_LIVE_TEXT` | No | The message for a live person, same rules. Unset, a live person hears the voicemail message. |
| `DC_DETECTION_STRATEGY` | No | `standard` (default), `beep_only` or `live_check`. |
| `DC_DETECTION_TIMEOUT_SEC` | No | 5 to 120, default 45. How long Detection listens for a verdict. |
| `DC_LIVE_CONFIDENCE` | No | 0 to 1, default 0.6. A live person verdict (`speech.human.*`) below it is printed and not acted on. Keep it at 0.6 or lower: a short "hello" and a pause arrives as an early live person verdict at 0.6. |
| `DC_BEEP_WAIT_SECONDS` | No | 1 to 60, default 20. After a `speech.voicemail.greeting` verdict, how long to wait for the beep before playing anyway. |
| `DC_RING_SECONDS` | No | 5 to 60, default 30. How long the phone rings. |
| `DC_WAIT_SECONDS` | No | 60 to 600, default 180. The whole run. `0` is refused, because this recipe has to listen. |
| `DC_DETECTION_URL` | No | Default `wss://detect.dropcowboy.com/carrier/ws/twilio`. |
| `TWILIO_BASE_URL` | No | Default `https://api.twilio.com`. Only change it to point at a mock server. |
| `PORT` | No | Receiver port, default 3000. |

### Run it with a tunnel

Twilio fetches the TwiML from your computer and Detection posts webhooks to it, so both need a tunnel, exactly as in [Expose the receiver](#expose-the-receiver). Detection accepts only `https://` on port 443.

1. Start your tunnel and point it at port `3000` (or the `PORT` you set).
2. Set `DC_PUBLIC_URL` to its `https://` address, with no trailing path.
3. Run `npm run detect:twilio`.

This receiver has its own routes:

| Route | Used for | Signed? |
|---|---|---|
| `GET /health` | The recipe's check that the tunnel reaches the receiver. | No |
| `POST /twilio/voice` | Twilio fetches the TwiML when the call is answered. | Yes, `X-Twilio-Signature` |
| `POST /twilio/status` | Twilio's call status callbacks. | Yes, `X-Twilio-Signature` |
| `POST /webhooks/detection` | Detection's webhooks. | Yes, `X-Signature`, with the Detection key |

The routes check the signature, record the event and answer at once. They never call Twilio: the recipe acts on what they recorded. The Twilio signature is checked against `DC_PUBLIC_URL` and the route, not the address the request arrived on, because your tunnel changes that address.

**The Detection key appears in the TwiML.** Twilio passes it to Detection as a stream parameter, so it shows in the Twilio Console request logs for the call. Anyone who can read those logs can read the key. Leave `DC_DETECTION_KEY` unset to have the recipe use a temporary key that lasts at most an hour, or delete the key when you are done testing.

### Detection verdicts

A `detection` webhook carries a verdict in `data.type`, with a `data.confidence` from 0 to 1. The recipe acts on these values:

| `data.type` | What the recipe does |
|---|---|
| Starts with `speech.human.`, such as `speech.human.unknown` | A live person. At or above `DC_LIVE_CONFIDENCE`, plays the live message. Below it, prints the verdict and waits. |
| `speech.voicemail.greeting` | A voicemail greeting. Waits up to `DC_BEEP_WAIT_SECONDS` for the beep, then plays the voicemail message anyway. |
| `speech.voicemail.full`, `speech.voicemail.not_setup` | The mailbox cannot take a message. Hangs up. |
| `speech.silence` | Nobody spoke. Hangs up. |

Any other value, such as `speech.ivr`, `speech.screening`, `speech.carrier.intercept` or `speech.unknown`, is printed and not acted on. The `beep` webhook plays the voicemail message whether or not a verdict came first.

### What you should see

```text
Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
call_id: 9b2d4f6a-8c1e-4a3b-9d5f-7e1a3c5b7d90
Detection key: DC_DETECTION_KEY (ends in 4f2a)
Twilio account AC...7c31: type Full, status active
TWILIO_FROM +13125550147 is a number in this Twilio account.
Receiver listening on http://127.0.0.1:3000 (routes: /twilio/voice, /twilio/status, /webhooks/detection)
The tunnel reaches this receiver: https://abc123.example.com
Call created: CallSid=CA00000000000000000000000000000001. Calling +13125550142 from +13125550147.
Twilio call status: initiated
Twilio call status: ringing
Twilio asked for the TwiML: the call was answered and its audio now goes to Detection.
Twilio call status: in-progress
Detection verdict: type=speech.voicemail.greeting confidence=0.91
Voicemail detected. Waiting up to 20 seconds for the beep.
Detection beep: timestamp_ms=6420 duration_ms=380
Playing the voicemail message (outcome voicemail_on_beep).
Twilio accepted the update 212 ms after the receiver recorded the beep.
Detection session closed: reason=normal
Twilio call status: completed (CallDuration 21)
Summary
  outcome:            voicemail_on_beep
  last verdict:       type=speech.voicemail.greeting confidence=0.91
  beep:               timestamp_ms=6420 duration_ms=380
  update latency:     212 ms
  CallStatus:         completed (CallDuration 21)
  CallSid:            CA00000000000000000000000000000001
  call_id:            9b2d4f6a-8c1e-4a3b-9d5f-7e1a3c5b7d90
  Detection webhooks: 3 received, 0 duplicates, 0 ignored
```

The outcome is one of:

| Outcome | Meaning |
|---|---|
| `voicemail_on_beep` | The beep arrived and the voicemail message played. |
| `voicemail_no_beep` | A `speech.voicemail.greeting` verdict, but no beep within `DC_BEEP_WAIT_SECONDS`, so the message played anyway. |
| `live_person` | A `speech.human.*` verdict at or above `DC_LIVE_CONFIDENCE`. The live message played. |
| `voicemail_unavailable` | A `speech.voicemail.full` or `speech.voicemail.not_setup` verdict: the mailbox cannot take a message. The recipe hung up. |
| `no_answer_detected` | A `speech.silence` verdict, or Detection reached its timeout. The recipe hung up. |
| `detection_error` | Detection reported an error it cannot recover from. The recipe hung up. |
| `not_answered` | The call ended busy, unanswered, failed or canceled. |
| `ended_before_action` | The call ended before anything was played. |
| `no_result` | No Detection result within `DC_WAIT_SECONDS`. The recipe hung up and printed what to check. |

A Twilio error prints its status, code, message and link, with a `What to do:` line for codes `21210`, `21212`, `21215`, `21219` and `20003`. If Detection never posts a webhook, check that the key is active and that your balance covers Detection, and look for stream errors in the Twilio Console debugger. A key that is refused closes the stream before any webhook is sent.

## Troubleshooting

| You see | Likely cause | What to do |
|---|---|---|
| `DC_KEY and DC_SECRET not set` | `.env` is missing or empty. | Copy `.env.example` to `.env` and fill it in. |
| Status `401` | The key or secret is wrong, was deleted or has expired. | Check `DC_KEY` and `DC_SECRET` for stray spaces. Create a new key if needed. |
| Status `403` | The key lacks a scope, or your plan does not include the feature. | Read `Detail` for the scope, and use a key that has it. `subscribe` needs `webhooks:write`. |
| Status `429` | Too many requests. | Reads retry by themselves. Wait, and spread sends out. |
| `No phone line to send from` (reason code `4010`) | You have no default phone line and set no `DC_PHONE_LINE_ID`. | Set `DC_PHONE_LINE_ID`, or make one line the default in the dashboard. |
| `this is a sample value from our docs; use your own` | A setting holds an id, number or host copied from our docs. It exists on no account. | Use your own value. Every command checks this before any request. |
| Result with reason code `3014` | Not allowed `audio_url`: audio_url is an option for BYOC plans only and must be enabled by support. | Contact support to enable it, or upload the file and send `media_id`, or use text to speech. |
| Result with reason code `3040` | Test Numbers Only: the account can send only to its test numbers right now, and this number is not one of them. | Send to one of your test numbers, or ask support to end testing mode. |
| Result with reason code `3001` | The audio is not usable: the `media_id` is not yours, or the `audio_url` could not be fetched or is not MP3 or WAV. | Upload the file with `npm run upload-media` and send the `media_id` it prints. |
| `The upload URL refused the file (403)` | See [403 on upload](#403-on-upload). | |
| Result with reason code `3000` | Your balance is empty. | Add funds or turn on auto-recharge, then send again. |
| Result with reason code `3002` or `3015` | A voice and the text do not go together. | Send `tts_body` and `voice_id` together. The recipes do this for you. |
| Result with reason code `3016` | Your send has a `byoc` object, but bring your own carrier is not on for your account. | Remove `DC_STI_ORIG_ID` and `DC_STI_ATTESTATION`, or ask support to enable it. |
| Result with reason code `3017` or `3018` | `DC_STI_ORIG_ID` is not a UUID, or the attestation is not `A`, `B` or `C`. | Fix the setting. The level your carrier assigned to the number: A, B or C. Never send a higher level than your carrier gave you. |
| Result with reason code `3021` | The text is over 1,200 characters once merge fields are filled in. | Shorten it. |
| Result with reason code `3022` | Trial accounts can only send to numbers verified on the account. | Send to a verified number, or choose a plan. |
| Result with reason code `3027` | The `Idempotency-Key` was used before with a different body. | Use a new key for each new send. The recipes do. |
| Result with reason code `4002` | The mailbox is full. Retrying will not help. | Reach the person another way they agreed to. |
| Result with reason code `4013` | The number reached your contact frequency limit. | Send again after the window, or change the limit. Test numbers (numbers you own) are exempt. Calling hours still apply. |
| Result with reason code `4016` or `4017` | The number is on your do-not-contact list, or on a known TCPA litigator list. | Do not send to it. Only a new, documented opt-in from the person allows sending again. |
| `No carrier is connected to this account` | Bring your own carrier is not set up. | Follow [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier). |
| `The phone line has no numbers` | The line is empty, so it cannot send. | Set `DC_NUMBERS`, or `DC_AREA_CODES` with `DC_RENT=yes`. |
| `Number import failed` | The import job finished with an error. | Read the message. Numbers held by another account show as conflicts. |
| `DC_PUBLIC_URL is not set` | The send has no `callback_url`. | Set it to your tunnel address, or follow the result in the dashboard. |
| Webhook answers `401 invalid_signature` | The signing secret differs, or the body was changed before it was checked. | Restart the receiver so it loads your current secrets (`npm run subscribe -- --list` shows your webhooks), or set `DC_WEBHOOK_SECRET`. Verify the raw body (see below). |
| Webhook answers `401 stale_timestamp` | Your computer's clock is more than 5 minutes off. | Sync the clock. |
| Webhook answers `503` | The receiver has no signing secret. | Run `npm run subscribe`, then restart the receiver. |
| `No result arrived within N seconds` | The result can take longer, or it could not reach you. | Check Settings > API Logs for what your endpoint answered, and run `npm run check-receiver`. See [Where are my results?](#where-are-my-results). |

The full list of codes is in [Outcomes](https://www.dropcowboy.com/developers/api/outcomes).

### 403 on upload

The `PUT` to the signed upload URL answered `403`. Usually one of two things:

- **The `Content-Type` does not match.** Send exactly the `content_type` returned next to the URL (for example `audio/mpeg` for `upload.mp3`), with no charset and no other value. Send the bytes as a `Buffer`: `fetch` adds its own `Content-Type` to a `FormData` or `Blob` body.
- **The URL expired.** Upload URLs last 2 days. Run `npm run upload-media` again for fresh ones.

Or skip the upload: set `DC_AUDIO_FILE` to an `https://` address of the file and it is imported by URL instead.

## Production notes

- **Verify the raw bytes.** The signature is over the exact body you received. Put `express.raw` on the webhook route, and verify before you parse. Parsing the JSON and serializing it again changes the bytes, and then no signature matches. `src/lib/verify.js` shows the check, including the 5 minute timestamp window and a constant-time compare.
- **Deduplicate.** The same `event_id` can arrive more than once. The receiver here keeps ids in memory so the example is short. In production, put a unique index on `event_id` in your database and answer 2xx for a duplicate.
- **Answer fast, work elsewhere.** Return `2xx` within 5 seconds, as soon as the signature checks out and the event is stored. Do the slow work from a queue. A slow answer is retried, and a duplicate follows.
- **Treat the callback as a hint.** `callback_url` carries no signature. Read only the fields you need. For anything that moves money or changes records, confirm with a signed webhook or by reading the API.
- **Keep secrets in a vault.** Do not commit `.env`. Load `DC_SECRET` and signing secrets from your secrets manager, and never print them. The recipes print only the last four characters.
- **Several webhooks are fine.** Each webhook has its own signing secret and is delivered separately, so the receiver accepts a delivery signed with any secret it holds. Creating a webhook never replaces another one. Rotate a secret explicitly with `npm run subscribe -- --rotate <webhook_id>`. The old secret stops working at once and every delivery after that, retries included, is signed with the new one, so add the new secret to the receiver right away. Keeping the old one there for a minute covers a delivery that was already on its way.
- **Reuse the `Idempotency-Key` to retry a send.** The client never retries a `POST` by itself. If a send times out, repeat it with the same key and body and the API sends it once. A new send needs a new key.
- **Send only with consent.** Keep a record of who agreed to hear from you, and honor opt-outs.

## Files

```text
src/
  lib/
    client.js          HTTP client: headers, timeout, safe retries, errors
    verify.js          webhook signature check
    config.js          reads and validates settings
    audio.js           which audio field goes on the request
    media.js           signed upload and URL import of an audio file
    sample-values.js   refuses ids, numbers and hosts copied from our docs
    hints.js           what to do for reason codes 3001, 3014, 3040, and a 403 on upload
    lookups.js         phone line, media file and voice lookups
    phone-line.js      line and number calls for local presence
    events.js          shapes a callback or webhook into one result
    signing-secrets.js loads the signing secrets
    send.js            builds the POST /rvm body
    send-and-wait.js   receiver, send, wait, summary
    cli.js             command line entry and error printing
    twilio.js          Twilio REST calls over fetch, and the X-Twilio-Signature check
    detection.js       Detection webhook check, the TwiML, and the decide-once rules
    detect-settings.js reads and validates the detect:twilio settings
    detection-keys.js  temporary Detection key: create and delete
  receiver.js          callback and webhook routes
  detection-receiver.js the detect:twilio routes: health, TwiML, Twilio status, Detection webhooks
  recipes/             send-rvm-retail, send-rvm-byoc, send-rvm-byoc-local-presence, send-rvm-tts, detect-twilio
  subscribe.js         create, list, update, rotate and delete webhooks
  upload-media.js      upload-media command
  check-receiver.js    check-receiver command
test/                  node:test suites
testkit/               mock API and helpers for the tests
```

## Tests

```bash
npm test
```

The tests start a mock API and the receiver on ephemeral ports. They check the order of requests and the exact body of each send for each audio source, the upload calls and the exact upload `Content-Type`, that sample values are refused before any request, each `check-receiver` verdict, that forbidden fields are absent, the webhook signature vectors in `../fixtures/signature-vectors.json`, and that no secret is ever printed. They make no real requests and rent nothing.

For `detect:twilio`, a mock Twilio API stands in for Twilio, and the tests play Twilio and Detection against the receiver with signed requests built from the fixtures. They check both signature vectors (`../fixtures/twilio-signature-vectors.json` and `../fixtures/detection-signature-vectors.json`), the exact TwiML and call form, every decision rule, that only one update reaches a call, and that the call is hung up and the temporary key deleted after success, an error or Ctrl+C. They place no call.
