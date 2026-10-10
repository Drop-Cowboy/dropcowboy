# Ringless voicemail quickstart

Send only to people who agreed to hear from you. Test with numbers you own.

One script that sends one ringless voicemail with the Drop Cowboy API and
shows you the result. It needs Node.js 20 or newer and has no dependencies:
no `npm install`, no SDK, no build step.

It does, in order:

1. **Preflight.** Reads `GET /register/public/integration-readiness` and prints
   whether your account may use `audio_url`, whether it can send only to test
   numbers right now, and your test numbers. It stops before sending when the
   send could not work.
2. **Phone line.** Uses `DC_PHONE_LINE_ID`, or your default phone line from
   `GET /phone/public/lines`.
3. **Audio.** Uploads a file, uses a file you uploaded before, uses a hosted
   file, or speaks text. See [Choosing an audio source](#choosing-an-audio-source).
4. **Receiver.** Starts a small receiver for the result on your computer.
5. **Send.** `POST /rvm` with a portable body, then waits for the result and
   prints its `status`, its `reason_code` with what it means, and the
   `message_id`.

It refuses ids, numbers and hosts copied from our docs. Those are samples that
exist on no account, so it stops with "this is a sample value from our docs;
use your own".

## Run it

Copy this folder together with the `fixtures/` folder next to it: the
quickstart reads its test bodies from `../fixtures`.

```bash
cp .env.example .env      # then fill in .env
node quickstart.js        # or: npm start
```

Set at least these in `.env`:

| Variable | What to put there |
|---|---|
| `DC_KEY`, `DC_SECRET` | Your API key pair, from **Developers > API Keys** in the dashboard. |
| `DC_TO` | A number you own, in E.164 format such as `+13125550142`. Add it as a test number on the **Dialing rules** page. |
| `DC_AUDIO` | `upload` (the default), `media`, `url` or `tts`. |
| `DC_AUDIO_FILE` | With `upload`: the path to your `.mp3` or `.wav` file. |
| `DC_PUBLIC_URL` | Your tunnel's `https://` address, so the result can come back. See [Expose the receiver](#expose-the-receiver). |

`.env.example` explains every other setting. Variables set in your shell win
over `.env`.

Other commands:

```bash
node quickstart.js listen                                   # run only the receiver
node quickstart.js check-receiver <callback-url> [webhook-url]   # test your own endpoints
npm test                                                    # tests against a mock API, nothing is sent
```

### What you should see

```text
Send only to people who agreed to hear from you. Test with numbers you own.
Preflight (/register/public/integration-readiness):
  audio_url_allowed: false
  test_numbers_only: false
  test_numbers: +13125550142
Webhook signing secrets: 1 (...3c51) loaded from /register/public/account/webhook-signing-secret
Receiver listening on http://127.0.0.1:3000 (/callbacks/dropcowboy, /webhooks/dropcowboy, /health)
Phone line: default line "Main line" (6a2d8f4c-1e7b-4c9a-b3d5-8f1e6a2c4b97)
Upload: created media 9c4e1a7f-3b6d-4f2a-8e5c-1d7b3f9a6e20, uploading 48211 bytes as audio/mpeg
Uploaded. media_id=9c4e1a7f-3b6d-4f2a-8e5c-1d7b3f9a6e20
Reuse this file next time without uploading again: DC_AUDIO=media DC_MEDIA_ID=9c4e1a7f-3b6d-4f2a-8e5c-1d7b3f9a6e20
Queued (202): message_id=2b8f5d1a-7c3e-4a9b-9f6d-4e2a8c1b7d53 foreign_id=e5a1c7f3-9d2b-4e6a-8b4f-3c9e1d7a5b26
202 only means the request was queued. It is checked next, and the result arrives as a status and a reason_code.
Waiting up to 300 seconds for the result...
Received callback status=success reason_code=0 (Success: ...) to=+13125550142 foreign_id=e5a1c7f3-...

Result from the callback:
  status: success
  reason_code: 0 (Success: the voicemail was left in the mailbox. The carrier decides when it shows up.)
  message_id: 2b8f5d1a-7c3e-4a9b-9f6d-4e2a8c1b7d53
What each reason_code means: https://www.dropcowboy.com/developers/api/outcomes
```

The exit code is `0` when the result is `success` or when no result arrived in
time, `1` for a failed result or an error, and `2` for a setting to fix.

## Choosing an audio source

Exactly one audio field goes on each send.

| Source | `DC_AUDIO` | Field sent | When to use it |
|---|---|---|---|
| Upload a file | `upload` (default) | `media_id` | The default. Upload once, then send the `media_id` as often as you like. Works on every plan. |
| A file you already uploaded | `media` | `media_id` | Reuse the `media_id` the upload printed. |
| Text to speech | `tts` | `tts_body` + `voice_id` | Next best when you have no recording. Up to 1,200 characters, billed per character. |
| A hosted file | `url` | `audio_url` | BYOC plans only, and it must be enabled by support. See below. |

`audio_url` is an option for BYOC plans only and must be enabled by support.
Contact support to enable it. If you're testing on a retail account before
connecting your carrier, support can enable it for testing, and you can then
send only to your test numbers. Otherwise, upload the file and send
`media_id`, or use text to speech. A send with `audio_url` that is not enabled
fails with reason code `3014`. The preflight prints `audio_url_allowed`, and
the quickstart stops before sending when it is `false`.

## The same calls with curl

Every request carries your key pair:

```bash
export DC_KEY="your key"
export DC_SECRET="your secret"
export DC_TO="+13125550142"            # a number you own
export DC_PHONE_LINE_ID="your phone line id, from GET /phone/public/lines"
```

### 1. Check what the account can do

```bash
curl https://api-v2.dropcowboy.com/register/public/integration-readiness \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET"
```

Read `data.audio_url_allowed`, `data.test_numbers_only` and
`data.test_numbers`. When `test_numbers_only` is `true`, a send to a number
that is not in `test_numbers` fails with `3040` (Test Numbers Only).

### 2a. Upload a file, then send `media_id` (the default)

A signed upload takes three calls. The key needs the `media:write` scope.

```bash
# 1. Create the entry. The response has data.media_id and data.upload.mp3 /
#    data.upload.wav, each with a signed url and the content_type to send.
curl -X POST https://api-v2.dropcowboy.com/media/public/media \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Quickstart greeting", "type": "rvm", "signed_upload": true }'

# 2. PUT the bytes to data.upload.mp3.url with exactly data.upload.mp3.content_type.
#    No x-key or x-secret here: the signed URL is the credential.
curl -X PUT "$UPLOAD_URL" \
  -H "Content-Type: audio/mpeg" \
  --data-binary @greeting.mp3

# 3. Finish the upload. Until you do, the media cannot be sent.
curl -X POST "https://api-v2.dropcowboy.com/media/public/media/$MEDIA_ID/complete" \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET"
```

If your file is already at a public URL, one call imports it instead:

```bash
curl -X POST https://api-v2.dropcowboy.com/media/public/media \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Quickstart greeting", "url": "https://files.example.com/greeting.mp3", "ext": ".mp3" }'
```

Then send:

```bash
curl -X POST https://api-v2.dropcowboy.com/rvm \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "'"$DC_TO"'",
    "phone_line_id": "'"$DC_PHONE_LINE_ID"'",
    "media_id": "'"$MEDIA_ID"'",
    "foreign_id": "'"$(uuidgen)"'",
    "callback_url": "'"$DC_PUBLIC_URL"'/callbacks/dropcowboy"
  }'
```

### 2b. Text to speech

Pick a `voice_id` with `status: "ready"` from `GET /voice/public/voices`.

```bash
curl -X POST https://api-v2.dropcowboy.com/rvm \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "'"$DC_TO"'",
    "phone_line_id": "'"$DC_PHONE_LINE_ID"'",
    "tts_body": "Hi, this is a test message from the quickstart.",
    "voice_id": "'"$VOICE_ID"'",
    "foreign_id": "'"$(uuidgen)"'",
    "callback_url": "'"$DC_PUBLIC_URL"'/callbacks/dropcowboy"
  }'
```

### 2c. A hosted file (BYOC, enabled by support)

```bash
curl -X POST https://api-v2.dropcowboy.com/rvm \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "'"$DC_TO"'",
    "phone_line_id": "'"$DC_PHONE_LINE_ID"'",
    "audio_url": "https://files.example.com/greeting.mp3",
    "foreign_id": "'"$(uuidgen)"'",
    "callback_url": "'"$DC_PUBLIC_URL"'/callbacks/dropcowboy"
  }'
```

Every send answers the same way:

```json
{ "status": "queued", "message_id": "2b8f5d1a-7c3e-4a9b-9f6d-4e2a8c1b7d53" }
```

`202` means the request was queued, nothing more. The send is checked after
that, and its result arrives as a `status` and a `reason_code`.

## Expose the receiver

The result comes back to a URL you give, so your computer needs a public
HTTPS address. Any tunnel works, for example:

```bash
ngrok http 3000
# or
cloudflared tunnel --url http://localhost:3000
```

Set `DC_PUBLIC_URL` to the `https://` address it prints, with no path. The
receiver serves:

| Route | Used for | Signed | Tries |
|---|---|---|---|
| `POST /callbacks/dropcowboy` | The `callback_url` of each send | No | One attempt, 10 second timeout |
| `POST /webhooks/dropcowboy` | Your webhooks, for example one for `contact.rvm.status` and `contact.rvm.receipt` | Yes, `X-Signature` | Up to 3 attempts, answer within 5 seconds |
| `GET /health` | Checking the tunnel reaches the receiver | No | |

To receive webhooks too, create one webhook that carries both result events:

```bash
curl -X POST https://api-v2.dropcowboy.com/register/public/webhooks \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Content-Type: application/json" \
  -d '{ "event_types": ["contact.rvm.status", "contact.rvm.receipt"], "hook_url": "'"$DC_PUBLIC_URL"'/webhooks/dropcowboy" }'
```

The response has `data.webhook_id` and `data.signing_secret`. An account can
hold up to 50 webhooks, each with its own signing secret, and creating one
never replaces another. List them with `GET /register/public/webhooks`, change one
(`hook_url`, `event_types`, `name`; only what you send, and `event_types` replaces the whole set) with
`PUT /register/public/webhooks/{webhook_id}`, rotate a
secret with `POST /register/public/webhooks/{webhook_id}/rotate-secret`, and
delete one with `DELETE /register/public/webhooks/{webhook_id}`. The quickstart
loads the signing secrets of all your webhooks from the API when
`DC_WEBHOOK_SECRET` is empty, or uses the ones you set there (comma separated).
A delivery is accepted when any secret matches. When you rotate, the old secret
stops working at once and every delivery after that, retries included, is
signed with the new one. So put the new secret in `DC_WEBHOOK_SECRET` (or
restart, so it loads again) right away. Keeping the old one there for a minute
covers a delivery that was already on its way.

The webhook route checks each delivery really came from Drop Cowboy before it
reads it:

- It takes the body exactly as it arrived, before any JSON parsing.
- It computes an HMAC-SHA256 of `X-Timestamp`, a `.`, and that body, keyed with
  each signing secret, and compares it with the hex after `sha256=` in
  `X-Signature`.
- It rejects a timestamp more than 300 seconds away, so an old delivery can't
  be replayed.
- It answers an `event_id` it has already seen with
  `{"received": true, "duplicate": true}`.

A status webhook doesn't include your `foreign_id`, so the quickstart matches
it to the send by the number it went to, and by arriving after the send.

### Let the quickstart manage the webhook

To see how registering, verifying and removing a webhook works through the API,
and to see the real payloads, set `DC_MANAGE_WEBHOOK=true` (with `DC_PUBLIC_URL`
set to your tunnel):

```bash
DC_MANAGE_WEBHOOK=true node quickstart.js
```

The run then:

1. Deletes any webhook named `Quickstart (temporary)` that a run killed before the end left behind.
2. Creates one webhook named `Quickstart (temporary)` for `contact.rvm.status` and `contact.rvm.receipt`, pointing at `DC_PUBLIC_URL` + `/webhooks/dropcowboy`, and verifies deliveries with the signing secret from the response. Your other webhooks are not touched.
3. Sends the voicemail, and prints the headers that prove a delivery is signed and its JSON body, for the `callback_url` result and for each webhook.
4. After the first result, waits up to `DC_RECEIPT_WAIT_SECONDS` (default 120) for the status and receipt webhooks. A receipt exists only once the proof of delivery does, so it can come later than the status; one that does not arrive is reported, not an error.
5. Deletes the webhook, also when the send fails. If the delete itself fails, it prints the `DELETE` to run by hand.

The code is `registerWebhook` and `removeWebhook` in `quickstart.js`. Set
`DC_SHOW_PAYLOADS=true` alone to print payloads without managing a webhook.

## Test your own endpoint: check-receiver

Before you point real sends at your own server, check it answers the way
Drop Cowboy needs:

```bash
DC_WEBHOOK_SECRET=your-signing-secret \
  node quickstart.js check-receiver https://receiver.example.com/callbacks/dropcowboy https://receiver.example.com/webhooks/dropcowboy
```

It posts `../fixtures/callback.rvm-success.json` to the callback URL, and
`../fixtures/webhook.rvm-status.json`, signed with `DC_WEBHOOK_SECRET` and a
fresh timestamp, to the webhook URL. Then it explains each answer:

| Your endpoint answers | What it means |
|---|---|
| `2xx` | OK. |
| `404` or `405` | The route or verb is wrong. The endpoint must accept `POST` at exactly that path. |
| `401` or `403` on the webhook | Your signature check is failing. Verify the raw bytes, before parsing, with the secret of that webhook. |
| `401` or `403` on the callback | Callbacks carry no signature and no credentials, so the endpoint must let them through. |
| Nothing within 10 seconds (callback) or 5 seconds (webhook) | Too slow. Answer first, then do the work. |
| Any other non-2xx | A callback is never retried. A webhook answered with a `4xx` is not retried; one answered with `408`, `429` or a `5xx` is retried, at most 3 attempts in all. |

It exits `0` only when every endpoint answered `2xx`. Try it against the
built-in receiver: run `node quickstart.js listen` in one terminal and point
check-receiver at `http://127.0.0.1:3000/...` in another.

## From retail to BYOC without code changes

The quickstart sends only fields that work on every plan: `to`,
`phone_line_id`, exactly one audio field, `foreign_id` and `callback_url`. It
never sends `caller_id`, which a retail account ignores. So the same request
keeps working after you bring your own carrier (BYOC), meaning you send through
your own phone company account instead of numbers you rent from Drop Cowboy:

- **Keep sending `phone_line_id`.** Connecting your carrier releases the
  numbers you rent from Drop Cowboy but keeps your phone lines. Import your own
  numbers onto the same line with `POST /phone/public/numbers/import`, and the
  same `phone_line_id` keeps working. Your code does not change.
- **Keep `media_id` or text to speech.** They work on every plan. Switch to
  `audio_url` only once support has enabled it, by changing `DC_AUDIO`.
- **Testing before your carrier is connected.** Support can turn on testing
  mode for a retail account, and can enable `audio_url` for testing. While
  testing mode is on, `test_numbers_only` is `true` and voice sends go only to
  your test numbers; anything else fails with `3040`. The preflight warns you
  when `DC_TO` is not a test number.
- **Results arrive the same way** on both plans, so your receiver does not
  change either.

## Troubleshooting

### Where are my results?

- A `202` from `POST /rvm` only means the request was queued. The send is
  checked afterwards, and a send that breaks a rule still answers `202`, then
  fails with a `reason_code`.
- The result goes to your `callback_url`, to your webhooks, and to
  **Settings > API Logs** in the dashboard. API Logs shows the outcome and what
  your endpoint answered, so start there when nothing arrives.
- A callback is tried once. If your endpoint answered `404`, or anything else
  that is not `2xx`, that result is not sent again. Webhooks are not retried
  after a `404` either. Run `check-receiver` against your URL to see why.
- Without `DC_PUBLIC_URL`, the send has no `callback_url`, so nothing comes
  back to the quickstart. Read the result in API Logs.
- The URL must be public. Drop Cowboy cannot reach `localhost`; use the
  tunnel address.

### 403 on upload

The `PUT` to the signed URL answered `403`. Usually one of two things:

- **Content-Type mismatch.** Send exactly the `content_type` returned with that
  URL, for example `audio/mpeg` for the `mp3` URL and `audio/wav` for the `wav`
  URL. Some HTTP clients add a charset or pick their own type; set the header
  explicitly. Don't send your `x-key` or `x-secret` to the upload URL.
- **The URL expired.** Upload URLs last 2 days. Get fresh ones with
  `GET /media/public/media/{media_id}/policy`, then upload again and complete.

The alternative is to skip the upload: host the file at a public URL and
import it with `POST /media/public/media` and `{ "name", "url", "ext" }`.

### Other messages

| You see | What to do |
|---|---|
| `this is a sample value from our docs; use your own` | Replace the value with one from your own account. |
| `This account cannot send with audio_url yet` | Upload the file (`DC_AUDIO=upload`) or use text to speech, or contact support. |
| `will fail with 3040 (Test Numbers Only)` | Add `DC_TO` as a test number on the Dialing rules page, or send to a test number. |
| `is not in your media library` | The `media_id` belongs to another account or was deleted. A send with it fails with `3001`. Upload again. |
| `No phone line to send from` | Set `DC_PHONE_LINE_ID`, or make one of your lines the default. |
| `HTTP 401` | Check `DC_KEY` and `DC_SECRET`. |
| `HTTP 403` | The key lacks a scope. Uploads need `media:write`. |
| Webhook route answers `503` | No signing secret yet. Create a webhook, or set `DC_WEBHOOK_SECRET`. |

Every reason code is listed in
[Outcomes](https://www.dropcowboy.com/developers/api/outcomes).

## Receiving with classic ASP.NET Web API

If your receiver is a classic ASP.NET Web API 2 controller:

- **Use attribute routes with `[HttpPost]`.** Call
  `config.MapHttpAttributeRoutes()` in `WebApiConfig`, and put
  `[HttpPost, Route("webhooks/dropcowboy")]` on the action. The error text
  "No action was found on the controller" means the route or the verb is
  wrong: the request reached the controller, but no action takes `POST` at
  that path.
- **Read the raw body before model binding.** Take no `[FromBody]` parameter
  on the webhook action; binding consumes the body, and re-serialized JSON no
  longer matches the signature. Read the bytes, verify, then parse.

```csharp
[RoutePrefix("webhooks")]
public class DropCowboyWebhookController : ApiController
{
    [HttpPost, Route("dropcowboy")]
    public async Task<IHttpActionResult> Receive()
    {
        byte[] raw = await Request.Content.ReadAsByteArrayAsync();
        string timestamp = Request.Headers.TryGetValues("X-Timestamp", out var t) ? t.First() : null;
        string signature = Request.Headers.TryGetValues("X-Signature", out var s) ? s.First() : null;
        if (!SignatureIsValid(raw, timestamp, signature)) return Unauthorized();
        // Parse raw here, record the event_id, answer fast, do the work later.
        return Ok(new { received = true });
    }
}
```

`SignatureIsValid` computes HMAC-SHA256 with your signing secret over the bytes
of `timestamp + "."` followed by `raw`, hex encodes it, compares it with the
part of `X-Signature` after `sha256=` in constant time, and rejects a
timestamp more than 300 seconds from now.

## Files

```text
quickstart.js          the command: preflight, send, wait, check-receiver, listen
lib/
  api.js               HTTP client: x-key and x-secret, JSON, errors
  audio.js             upload, media, url and tts
  check-receiver.js    posts the fixtures to your endpoints and explains the answers
  env.js               reads .env and the settings
  listener.js          the receiver routes
  messages.js          printed text and reason code meanings
  samples.js           refuses sample values from the docs
  signature.js         webhook signature check
  fixtures.js          reads ../fixtures
  stop.js              a stop with a message and an exit code
test/                  node:test suites
testkit/               the mock API used by the tests
```
