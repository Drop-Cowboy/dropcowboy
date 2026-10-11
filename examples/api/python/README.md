# Drop Cowboy API examples: Python

Send only to people who agreed to hear from you. Test with numbers you own.

Runnable examples for sending a ringless voicemail with the Drop Cowboy API, and for
receiving the result. They use plain HTTP (`requests`) and a small Flask receiver.
No SDK.

New to the API? Start with the [quickstart](../quickstart/), then come back here.

What is here:

| Part | What it does |
|---|---|
| `dropcowboy_examples/receiver.py` | A web server with the two result routes: the per-send callback and a signed webhook. Runs on its own, and every recipe also starts it for you. |
| `dropcowboy_examples/recipes/send_rvm_retail.py` | Send from a phone line on your account. |
| `dropcowboy_examples/recipes/send_rvm_byoc.py` | Send from your own number on your own carrier. |
| `dropcowboy_examples/recipes/send_rvm_byoc_local_presence.py` | Put several numbers on a phone line and let the platform pick one per recipient. |
| `dropcowboy_examples/recipes/send_rvm_tts.py` | Send text that is spoken for you. |
| `subscribe.py` | Creates a webhook that delivers results to your receiver. Also lists, updates, rotates and deletes webhooks. |
| `upload_media.py` | Uploads `DC_AUDIO_FILE` to your media library and prints its `media_id`. |
| `check_receiver.py` | Posts a sample result to your own endpoints and explains the answer. Calls no API. |
| `dropcowboy_examples/client.py`, `verify.py`, `config.py`, `audio.py`, `api.py` | The HTTP client, signature check, settings, audio choice and one function per route. |
| `dropcowboy_examples/media.py`, `samples.py`, `hints.py` | The audio upload, the check that refuses sample values from our docs, and what to do for common reason codes. |

## Prerequisites

- Python 3.9 or newer.
- A Drop Cowboy API key and secret. Create them in the dashboard under Developers > API Keys.
- A phone number you own, to receive the test voicemail.
- For the result to reach you: a public HTTPS address that forwards to your computer (a tunnel). See [Tunnel](#tunnel).
- For the bring-your-own-carrier recipes: a carrier connected to your account. See [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier).

## Setup

From this folder:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Open `.env` and set `DC_KEY`, `DC_SECRET` and `DC_TO` (the number that receives the test).
Settings come from the environment, or from a `.env` file in the folder you run from.
A variable already set in your shell wins over the file. `.env` is ignored by git. Keep your
secret out of the repository.

Every setting is listed, with a comment, in `.env.example`.

## Tunnel

Drop Cowboy posts results to a public HTTPS address, so your receiver needs one while you
test. Use any tunnel. Two common ones:

```bash
ngrok http 3000
cloudflared tunnel --url http://localhost:3000
```

Copy the `https://` address it prints into `.env`:

```
DC_PUBLIC_URL=https://your-tunnel-address.example
```

Use the base address only, with no path. The examples add `/callbacks/dropcowboy` and
`/webhooks/dropcowboy` themselves. If you change the receiver port, set `PORT` to match the
port your tunnel forwards to (default 3000).

Without `DC_PUBLIC_URL` a recipe still sends, but it adds no `callback_url`, so the result
does not come back to you. It prints a notice saying so.

## Run a recipe

Each recipe first prints the line "Send only to people who agreed to hear from you. Test with numbers you own.", then starts the receiver, sends one voicemail, waits for the result, prints a summary
and exits. Run it from this folder with the virtual environment active.

```bash
python -m dropcowboy_examples.recipes.send_rvm_retail
python -m dropcowboy_examples.recipes.send_rvm_byoc
python -m dropcowboy_examples.recipes.send_rvm_byoc_local_presence
python -m dropcowboy_examples.recipes.send_rvm_tts
```

`DC_WAIT_SECONDS` sets how long it waits (default 300). `0` sends and exits without
listening. A recipe exits 0 when a result arrives and also when the wait ends with nothing:
a result can still arrive later, at the receiver or on a subscribed webhook. It exits 1 on a
setup problem or an API error.

A `202` from the API means the request was accepted and queued. The result arrives later,
as a `status` and a `reason_code`. Branch on `reason_code`. The text can change. Every code
is listed in [Outcomes](https://www.dropcowboy.com/developers/api/outcomes).

### Retail: send from a phone line

Set `DC_TO`. The phone line is `DC_PHONE_LINE_ID`, or your account's default line. The request
is `phone_line_id` plus exactly one audio source, and never `caller_id`: the line decides what the
recipient sees. The audio is the first of these that is set:

1. `DC_MEDIA_ID`, a file already in your media library.
2. `DC_AUDIO_FILE`, a `.mp3` or `.wav` that the recipe uploads first (see [Upload audio](#upload-audio)),
   then sends as `media_id`.
3. `DC_TTS_BODY` with `DC_VOICE_ID` (or your first ready voice), to speak text.
4. `DC_AUDIO_URL`, sent as `audio_url`. audio_url is an option for BYOC plans only and must be
   enabled by support. Contact support to enable it. If you're testing on a retail account before
   connecting your carrier, support can enable it for testing, and you can then send only to your
   test numbers. Otherwise, upload the file and send media_id, or use text to speech.

With none of them set, it sends your first uploaded media.

### Bring your own carrier

Set `DC_CALLER_ID` (a number you are entitled to use, E.164) and the audio, in the same order as
retail: `DC_MEDIA_ID`, `DC_AUDIO_FILE`, `DC_TTS_BODY` with `DC_VOICE_ID`, or `DC_AUDIO_URL` (a public
mp3 or wav file). To add STIR/SHAKEN values, set both
`DC_STI_ORIG_ID` (a UUID) and `DC_STI_ATTESTATION`. The level your carrier assigned to the number: A, B or C. Never send a higher level than your carrier gave you. Example: `DC_STI_ATTESTATION=B`.

It checks first that a carrier is connected, before it uploads anything, and stops with a pointer
to the connection guide if none is. A send does not fail on the request itself when no carrier is connected: the failure
arrives later as a `reason_code`. The request has no `phone_line_id`: when both are sent, the
line wins. Always identify your business location truthfully when asked by recipients.

### Local presence

A phone line can hold several numbers. When you send with `phone_line_id` only, the platform picks
the number to show for each recipient. It chooses the number on the line closest to the recipient
and falls back to a number on the line when it cannot place the recipient. This recipe never
sends `caller_id`, because naming one would skip that choice. Always identify your business location truthfully when asked by recipients.

What it does, in order. Every step after the first is optional:

1. Finds the phone line named `DC_LINE_NAME` (default `Local presence`) or creates it. With
   `DC_PHONE_LINE_ID` set, it uses that line instead.
2. `DC_NUMBERS`: loads numbers you already own onto the line and waits for the import
   (about a minute at most). This needs a connected carrier.
3. `DC_AREA_CODES`: searches the carrier's numbers for each area code and lists up to three. It
   rents the first one per area code only when `DC_RENT=yes`. Renting charges your carrier.
   Without it the step is a dry run that prints what it would rent.
4. Lists the numbers on the line. A line with no numbers cannot send, so it stops there.
5. Sends, then prints which number the platform picked once the result arrives.

Try it without renting:

```bash
DC_NUMBERS=+13125550161,+13125550101 DC_AUDIO_URL=https://audio.example.com/message.mp3 \
  python -m dropcowboy_examples.recipes.send_rvm_byoc_local_presence
```

### Text to speech

Set `DC_TTS_BODY` (1,200 characters or fewer, counted after merge fields). The voice is
`DC_VOICE_ID`, or your first voice with status `ready`. `DC_MODE=retail` (the default) sends from
a phone line. `DC_MODE=byoc` sends from `DC_CALLER_ID`. Set `DC_PREVIEW=yes` to speak the text once
first and print the preview link. Text to speech is billed per character, and a preview is billed
too. The request carries `tts_body` and `voice_id` and no other audio field.

### Upload audio

```bash
DC_AUDIO_FILE=./appointment-reminder.mp3 python upload_media.py
```

It prints `media_id: ...`. Set `DC_MEDIA_ID` to it to send that file from now on. `DC_MEDIA_NAME`
names the file in your media library (default: the file name). The key needs the `media:write`
scope. The recipes upload `DC_AUDIO_FILE` the same way when you set it instead of `DC_MEDIA_ID`.

A file on this computer goes up in three calls (see `dropcowboy_examples/media.py`):

1. `POST /media/public/media` with `{"name": "...", "type": "rvm", "signed_upload": true}`. The answer
   has the `media_id` and, under `upload.mp3` and `upload.wav`, a signed `url` and the `content_type`
   to send with it.
2. `PUT` the file's bytes to the `url` for its format, with a `Content-Type` header of exactly that
   `content_type`, and nothing else. The URL is already signed, so it never gets your key or secret.
3. `POST /media/public/media/{media_id}/complete`. Until then the file cannot be sent.

Set `DC_AUDIO_FILE` to an `https://` address of a `.mp3` or `.wav` instead, and the file is imported
in one call: `POST /media/public/media` with `{"name": "...", "type": "rvm", "url": "...", "ext": ".mp3"}`.

### Check your receiver

```bash
python check_receiver.py https://abc123.example.com/callbacks/dropcowboy https://abc123.example.com/webhooks/dropcowboy
```

It posts the sample callback in `../fixtures/callback.rvm-success.json` to the first URL, and a
sample `contact.rvm.status` webhook to the second, signed with the first secret in
`DC_WEBHOOK_SECRET` and a fresh timestamp. It calls your endpoints only, never the API, and needs
no API key. Each answer gets one verdict:

| Verdict | Answer | Meaning |
|---|---|---|
| ok | `2xx` in time | Your endpoint accepted it. |
| route | `404` or `405` | The route or the verb is wrong. The endpoint must accept `POST` at exactly that path. |
| auth | `401` or `403` | The signature check is failing (webhook), or the path asks for authentication a callback never carries. |
| slow | no answer in 10 seconds (callback) or 5 seconds (webhook) | Answer `2xx` first, then do the work. |
| rejected | any other status | A callback is not retried, so that result is lost. A webhook is retried only after `408`, `429`, `5xx` or a timeout, at most 3 attempts in all. |
| unreachable | no connection | The server or tunnel is down, or the host is not public. |

It exits 1 when any check fails.

## Expected output

A retail send with a tunnel, when the callback arrives:

```
Sending a ringless voicemail to +13125550142
  foreign_id: 1866ee46-842c-448e-b837-92071c52c624
Loaded 1 signing secret(s), ending in ...7c30.
Receiver listening on http://127.0.0.1:3000, reached through https://your-tunnel-address.example
Accepted by the API (202, queued). message_id: 7e2a9c4d-1b6f-4a38-8d05-9c3e5b7a1f24
A 202 means the request was received. The result arrives later.
Waiting up to 300 seconds for the result...
Callback: status=success reason= reason_code=0 caller_id=+12125550100 foreign_id=1866ee46-842c-448e-b837-92071c52c624
Result from the callback:
  status: success
  reason: (none)
  reason_code: 0
  sent from: +12125550100
What each reason_code means: https://www.dropcowboy.com/developers/api/outcomes
```

For reason codes `3001`, `3014` and `3040` the result adds a `What to do:` line.

If nothing arrives in time:

```
No result arrived within 300 seconds. It can still arrive at the receiver or on your subscribed webhook.
Check Settings > API Logs, which shows the outcome and what your endpoint answered.
```

An API error prints the status, title, detail, code and request id, then exits 1. It never prints
your key, your secret or any request header:

```
The request failed.
  status: 403
  title: Forbidden
  detail: This account is not a bring-your-own-carrier account.
  code: byoc_required
  request id: 9b4d2f6a-8c1e-4a73-8d50-2e6f1b3a7c94
```

## Where are my results?

`POST /rvm` answers `202` when it queues the send. That is all a `202` means: the outcome comes
later, three ways.

- **Your `callback_url`.** Unsigned, one attempt, 10 second timeout.
- **A signed webhook** for `contact.rvm.status`, if you subscribed. Answer `2xx` within 5 seconds.
- **Settings > API Logs** in the dashboard, which shows the outcome and what your endpoint answered.

If your endpoint answers anything but `2xx`, the result does not reach your code. A `404` or `405`
is never retried, and neither is a callback. Check API Logs for what your endpoint answered, then
run `python check_receiver.py` against the same URLs until every check passes.

## Two ways to get a result

- **The callback.** Every recipe adds a `callback_url` to the send. The platform posts the
  outcome there once, with a 10 second timeout, and does not retry. It carries your `foreign_id`.
  It is not signed, so anyone who learns the address can post to it. Treat it as a hint. The
  example keeps only the fields it needs and matches `foreign_id` against the send it made.
  A failure of your key (`3007`) is reported on the callback only.
- **A webhook.** Run `python subscribe.py` once. The platform then posts signed
  `contact.rvm.status` events to `/webhooks/dropcowboy`. Add `--receipt` to put
  `contact.rvm.receipt`, which carries the link to the recording, in the same webhook. A status
  webhook has no `foreign_id`, so the recipes match it on the recipient number.

```bash
python subscribe.py                      # one webhook for contact.rvm.status
python subscribe.py --receipt            # one webhook for status and receipt
python subscribe.py --list               # your webhooks, by webhook_id
python subscribe.py --update WEBHOOK_ID --events a,b --url URL --name "My hook"  # change one webhook
python subscribe.py --rotate WEBHOOK_ID  # a new signing secret for that webhook
python subscribe.py --delete WEBHOOK_ID  # delete that webhook, and no other
```

A webhook is one URL, the event types it receives and its own signing secret, and an account can
hold many. Creating one never replaces another. `--update` sends only what you pass (`--url`,
`--events a,b` or `--receipt`, `--name`), and at least one is required. The event types you pass
replace that webhook's whole set, and its `webhook_id` and signing secret do not change. Rotate a secret on purpose with `--rotate`: the
old secret stops working at once, so add the new one to the receiver right away. The receiver
accepts a delivery signed with any secret it holds, so keeping the old one for a minute covers
a delivery that was already on its way. The receiver reads the secrets with `GET /register/public/account/webhook-signing-secret` at start-up,
or from `DC_WEBHOOK_SECRET` (comma separated for more than one). It prints only the last four
characters of a secret.

A webhook is verified like this: the signature is `HMAC-SHA256(secret, timestamp + "." + raw body)`
in hex, sent as `X-Signature: sha256=<hex>` with the time in `X-Timestamp`. A timestamp more than
300 seconds from now is refused. See `dropcowboy_examples/verify.py`, which also shows why the
raw bytes matter.

To run the receiver alone, for example to test a webhook:

```bash
python -m dropcowboy_examples.receiver
```

Routes: `POST /callbacks/dropcowboy`, `POST /webhooks/dropcowboy`, `GET /health`.

## Tests

```bash
pip install -r requirements-dev.txt
python -m pytest
python -m flake8
```

The tests use a mock API on an ephemeral port (`DC_BASE_URL` points at it) and the receiver over real
HTTP. They need no network and no credentials. They cover the shared signature vectors in
`../fixtures/signature-vectors.json`, the receiver's status codes, the order of calls and exact
request bodies of every recipe and audio source, the upload calls and the exact upload
`Content-Type`, that sample values are refused before any request, each `check_receiver.py` verdict,
and that secrets never reach the output.

## Troubleshooting

Results arrive as a `reason_code`. The full list is in
[Outcomes](https://www.dropcowboy.com/developers/api/outcomes). These are the ones you are most
likely to meet while trying the examples.

| You see | What it means | What to do |
|---|---|---|
| `3000` No Funds | The balance is empty. | Add funds or turn on auto-recharge, then send again. |
| `3007` Not authorized (on the callback only) | The key, secret or scope was wrong or expired. | Check `DC_KEY` and `DC_SECRET`. |
| `this is a sample value from our docs; use your own` | A setting holds an id, number or host copied from our docs. It exists on no account. | Use your own value. Every command checks this before any request. |
| `3001` Audio file not valid | The `media_id` is not on your account, or the `audio_url` could not be downloaded or is not MP3 or WAV. | Upload the file with `python upload_media.py` and send the `media_id` it prints. |
| `3014` Not allowed audio_url | audio_url is an option for BYOC plans only and must be enabled by support. | Contact support to enable it, or upload the file and send `media_id`, or use text to speech. |
| `3040` Test Numbers Only | The account can send only to its test numbers right now, and this number is not one of them. | Send to one of your test numbers, or ask support to end testing mode. |
| `The upload URL refused the file (403)` | See [403 on upload](#403-on-upload). | |
| `3002` No Voice or `3015` No TTS | `voice_id` without `tts_body`, or the reverse, or a voice that is not valid. | Set both `DC_TTS_BODY` and `DC_VOICE_ID`. The recipe sends them together. |
| `3021` TTS too long | The text is over 1,200 characters after merge fields. | Shorten it. The recipe checks this before it calls the API. |
| `3017` or `3018` Invalid STI or attestation | `DC_STI_ORIG_ID` is not a UUID, or the attestation is not `A`, `B` or `C`. | Fix the value. Use the level your carrier assigned to the number, never a higher one. |
| `3019` Invalid Callback | `callback_url` is not a valid URL. | Set `DC_PUBLIC_URL` to the https address your tunnel prints, or leave it out. |
| `3027` Idempotency Key Conflict | A key was reused with a different body. | The recipes use a new key for each send. Do the same. |
| `3028` Invalid Idempotency Key | The key is not 1 to 255 printable ASCII characters. | A random UUID works. |
| `4010` No Caller ID | No phone line to send from. | Set `DC_PHONE_LINE_ID`, or make one of your lines the default. |
| `4013` Too Many Attempts | The number reached your contact frequency limit (default 3 attempts in 3 days). | Wait for the window to pass, or change the limit. Test numbers (numbers you own) are exempt from this limit. Calling hours still apply. |
| `4016` Internal DNC | The number is on your do-not-contact list. | Do not send to it. Only a new, documented opt-in from the person allows sending again. |
| `4017` Known Litigator | The number is on a known TCPA litigator list. | Do not send to it. Only a new, documented opt-in from the person allows sending again. |
| `4001` or `4002` | The mailbox is not set up, or is full. | Nothing to fix on your side. |
| `6005` Opt-in Revoked | The person revoked consent. | Do not send again unless they opt in again. |
| `6011` Opt-in Missing | Your account requires consent and none is on file. | Record the opt-in, then send again. |
| HTTP `400` with `phone_line_required` | A number import named no line and you have no default line. | Set `DC_PHONE_LINE_ID`. |
| HTTP `400` with `pool_required` | No carrier is connected yet. | Connect one. See the bring-your-own-carrier guide. |
| HTTP `401` | The key or secret is missing or wrong. | Check `DC_KEY` and `DC_SECRET`. |
| HTTP `402` | Out of funds, or a payment failed. | Add funds or update the payment method. |
| HTTP `403` with `byoc_required` | The account is not on a bring-your-own-carrier plan. | Connect a carrier first. |
| HTTP `429` | Too many requests. | Wait and try again. The client already retries reads. It never retries a send on its own. |
| Webhook answers `503` | The receiver has no signing secret. | Run `python subscribe.py`, or set `DC_WEBHOOK_SECRET`. |
| Webhook answers `401` `stale_timestamp` | Your clock is more than 300 seconds off. | Fix the clock on your computer. |
| Webhook answers `401` `invalid_signature` | The secret is not the one for that webhook, or the body changed on the way. | Check `DC_WEBHOOK_SECRET`. Verify the raw bytes. |
| `No result arrived within ...` | Nothing reached the receiver. | Check the tunnel is running, `DC_PUBLIC_URL` is its address and `PORT` matches. Check Settings > API Logs and run `check_receiver.py`. See [Where are my results?](#where-are-my-results). |

### 403 on upload

The `PUT` to the signed upload URL answered `403`. Usually one of two things:

- **The `Content-Type` does not match.** Send exactly the `content_type` returned next to the URL
  (for example `audio/mpeg` for `upload.mp3`), with no charset and no other value. Pass the bytes
  with `data=` and set the header yourself, as `media.py` does; `files=` sends a multipart body with
  a different type.
- **The URL expired.** Upload URLs last 2 days. Run `upload_media.py` again for fresh ones.

Or skip the upload: set `DC_AUDIO_FILE` to an `https://` address of the file and it is imported by
URL instead.

## Production notes

These examples are for learning. Before you run something like them for real:

- **Verify the raw bytes.** Read the body exactly as it arrived, before any JSON parsing, and
  verify that. Parsing and re-serializing can change spacing or key order and break the signature.
- **Dedupe with a database unique index.** The same event can arrive more than once. The example
  keeps ids in memory, which a restart or a second process forgets. Insert the `event_id` under a
  unique index and treat a conflict as a duplicate.
- **Answer fast, then do the slow work somewhere else.** Verify, record, answer. Hand the rest to a
  queue or a worker so a slow step never makes the platform wait.
- **Keep secrets in a vault.** Load `DC_SECRET` and signing secrets from a secrets manager. Do not
  put them in source, images or logs.
- **Several webhooks are fine.** Each has its own signing secret and is delivered separately, and
  creating one never replaces another. Rotate with `subscribe.py --rotate WEBHOOK_ID`. The old
  secret stops working at once, so add the new one to your receiver right away.
- **Do not use the Flask development server.** The embedded server is for these examples. Serve the
  `Receiver(signing_secrets).app` object from `dropcowboy_examples/receiver.py` with gunicorn or waitress, behind HTTPS.
- **Retry a send only with the same `Idempotency-Key`.** Reusing the key with the same body makes a
  retry safe. A new key is a new send.
