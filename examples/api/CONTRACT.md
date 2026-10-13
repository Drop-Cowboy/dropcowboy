# API examples: shared contract

Every language project (`node/`, `python/`, `csharp/`) implements this contract
identically. If you change behavior in one language, change it in all three and
update this file. The API guides are on the
[developer hub](https://www.dropcowboy.com/developers/api).

Rules for everything under this directory:

- Plain HTTP against `https://api-v2.dropcowboy.com`. No Drop Cowboy SDK.
- IDs in code, comments, fixtures and docs are raw UUIDs. No type prefixes.
- Source and docs are ASCII only. No em dashes, no curly quotes.
- No secrets in the repo. Credentials come from environment variables.
- Never log `DC_SECRET` or a signing secret. Log only the last 4 characters when
  you must show that one is loaded.
- Phone numbers in samples are `+1XXX555XXXX` style fictional numbers.
- Say "ringless voicemail" or "voicemail" in comments, README text and output
  messages. Never say a voicemail was "delivered". Say it was "accepted", or
  report the `status` and `reason` the API returned.
- Every recipe prints the consent line at start-up (before any request), and every recipe README and file header carries it: "Send only to people who
  agreed to hear from you. Test with numbers you own."
- No fire-and-forget: every async call is awaited or its result is used.

## Layout

```
examples/api/
  README.md                 index, quick start, compliance note
  CONTRACT.md               this file
  fixtures/                 shared JSON, signature vectors (language neutral)
  node/                     Node 20+, ESM, Express 4, node:test, no TypeScript
  python/                   Python 3.9+, Flask 3, requests, pytest
  csharp/                   .NET 8, ASP.NET Core minimal API, xUnit
  twilio-functions/         Detection as two Twilio Functions, Node 20+ (see below)
```

Each language project has the same parts:

| Part | Purpose |
|---|---|
| `lib` | `DcClient` (HTTP with `x-key` / `x-secret`, JSON, error mapping), `verify_signature`, config loader, audio-source helper |
| `receiver` | Web server with the two result routes. Runs on its own, and also embedded by the recipes |
| `recipes` | `send-rvm-retail`, `send-rvm-byoc`, `send-rvm-byoc-local-presence`, `send-rvm-tts` |
| `subscribe` | Creates one webhook for `contact.rvm.status` (and optionally `contact.rvm.receipt`) at `${DC_PUBLIC_URL}/webhooks/dropcowboy`. Also lists, updates, rotates and deletes webhooks |
| `upload-media` | Uploads or imports `DC_AUDIO_FILE` and prints its `media_id` |
| `check-receiver` | Posts a sample callback and a signed sample webhook to the reader's own endpoints and classifies each answer. Calls no API |
| `detect-twilio` | Places a call through the reader's own Twilio account, forks its audio to Detection, listens for Detection webhooks and plays a message on the beep. See [detect-twilio](#detect-twilio) |
| `tests` | Unit and mock-server tests. No network, no real credentials |

## Environment variables

| Variable | Required | Meaning |
|---|---|---|
| `DC_KEY`, `DC_SECRET` | Yes | API key pair. Sent as `x-key` and `x-secret` |
| `DC_BASE_URL` | No | Default `https://api-v2.dropcowboy.com`. Tests point it at a mock server |
| `DC_TO` | Yes for sends | Recipient in E.164. Must be someone who agreed to hear from you |
| `DC_PUBLIC_URL` | No | Public HTTPS base URL that reaches the receiver (a tunnel). Without it the recipe sends with no `callback_url` and prints a notice that results will not arrive here |
| `PORT` | No | Receiver port, default `3000` |
| `DC_WEBHOOK_SECRET` | No | One or more webhook signing secrets, comma separated. When unset the receiver loads them with `GET /register/public/account/webhook-signing-secret` at start-up. If neither works, webhook route answers `503` and the callback route still works. check-receiver signs its sample webhook with the first one, printed as the last 4 characters only |
| `DC_PHONE_LINE_ID` | Retail: no. Local presence: no | Phone line to send from. Retail falls back to the account default line (`GET /phone/public/lines`, item with `default: true`). If neither exists, stop with a clear message (the API would answer `4010`) |
| `DC_CALLER_ID` | BYOC: yes | Your own number in E.164 |
| `DC_AUDIO_URL` | No | Hosted audio file, sent as `audio_url`. Label it everywhere with: "audio_url is an option for BYOC plans only and must be enabled by support. Contact support to enable it. If you're testing on a retail account before connecting your carrier, support can enable it for testing, and you can then send only to your test numbers. Otherwise, upload the file and send media_id, or use text to speech." Without it enabled the result is `3014` |
| `DC_MEDIA_ID` | No | Audio already uploaded. Retail falls back to the first item of `GET /media/public/media` |
| `DC_AUDIO_FILE` | No | A local path or an `http(s)://` URL of a `.mp3` or `.wav` file. A recipe uploads (path) or imports (URL) it, then sends the `media_id`. Required by `upload-media` |
| `DC_MEDIA_NAME` | No | Name for the uploaded file in the media library. Default: the file name from the path or URL |
| `DC_TTS_BODY` | TTS | Text to speak, 1,200 characters or fewer after merge fields |
| `DC_VOICE_ID` | TTS | Voice to speak with. Falls back to the first voice with `status: "ready"` from `GET /voice/public/voices` |
| `DC_MODE` | TTS | `retail` (default) sends with a phone line. `byoc` sends with `DC_CALLER_ID` |
| `DC_PREVIEW` | TTS | `yes` calls `POST /voice/public/tts/synthesize` first and prints the preview URL and `tts_characters`. Billed per character |
| `DC_STI_ORIG_ID`, `DC_STI_ATTESTATION` | BYOC | Optional. When both are set send `byoc: { sti_orig_id, sti_attestation }`. Attestation is `A`, `B` or `C`: use the level your carrier assigned to the number, never a higher one |
| `DC_LINE_NAME` | Local presence | Default `Local presence` |
| `DC_NUMBERS` | Local presence | Comma separated E.164 numbers you already own. Loaded with the import route |
| `DC_AREA_CODES` | Local presence | Comma separated area codes to search and (opt-in) rent, for example `312,415` |
| `DC_RENT` | Local presence | Must equal `yes` exactly (lowercase) to buy numbers. `YES`, `true` and `1` do not count. Anything else is a dry run that prints what it would buy. Renting charges your carrier |
| `DC_WAIT_SECONDS` | No | How long a recipe waits for a result after sending. Default `300`. `0` means send and exit without listening |

Audio source precedence (helper `audio_from_env` in every language), exactly one
field goes on the wire:

1. `DC_MEDIA_ID` -> `media_id`.
2. else `DC_AUDIO_FILE` -> upload or import it (see upload-media below), then `media_id`.
3. else `DC_TTS_BODY` -> `tts_body` + `voice_id` (`DC_VOICE_ID`, or the first ready voice).
4. else `DC_AUDIO_URL` -> `audio_url`, after printing the audio_url wording above.
5. else retail sends the first uploaded media; BYOC stops with a message naming the four variables.

Retail and BYOC accept all four. `DC_AUDIO_FILE` is validated (format, file exists,
not empty, valid URL) before any request. The TTS recipe requires `tts_body` and
ignores the others.

## Sample values from the docs

`fixtures/doc-sample-values.json` lists the ids, phone numbers and URL hosts that
appear in the public docs. They exist on no account. Every command that makes
a request (the recipes, `subscribe`, `upload-media`, `check-receiver`) checks every `DC_`
setting, and each item of a comma separated setting, before its first network call:

- an id matches case-insensitively, a phone number exactly, a URL by its host;
- each match produces `<NAME>=<value>: this is a sample value from our docs; use your own.`;
- all matches are joined with newlines into one error and the command exits 1,
  with no request made.

Each language keeps its own copy of the list so its folder works alone, and a
test fails if the copy and the fixture differ. Entries may be added, never removed.

## Outcome hints

When a result arrives, the summary prints the status, reason, reason_code and the
number it was sent from, then for these codes one `What to do: <hint>` line:

| Code | Hint (meaning) |
|---|---|
| `3001` | Audio file not valid: a `media_id` not on the account, or an `audio_url` that could not be downloaded or is not MP3 or WAV. Upload the file with upload-media and send the `media_id` it prints. |
| `3014` | "Not allowed audio_url. " followed by the audio_url wording above. |
| `3040` | Test Numbers Only: the account can send only to its test numbers right now. Send to a test number, or ask support to end testing mode. |

Any other code prints no hint. When a recipe does not wait (`DC_WAIT_SECONDS=0`) or
no result arrives in time, it prints: "Check Settings > API Logs, which shows the
outcome and what your endpoint answered."

## Receiver routes

Both routes answer within 5 seconds, 2xx on success.

### `POST /callbacks/dropcowboy` (per-send `callback_url`, unsigned)

- Body is the outcome JSON (`fixtures/callback.rvm-success.json`). Echoes `foreign_id`.
- One attempt, 10 second timeout, no retries, no signature. Treat as a hint, not proof:
  match `foreign_id` against sends you made before trusting it, and accept only
  fields you need.
- Always `200 {"received": true}` for valid JSON objects. `400` for anything else.
- Auth failure `3007` arrives only here.
- Print `status`, `reason`, `reason_code`, `caller_id` (the number the platform
  sent from, which is how the local presence recipe shows its pick), `foreign_id`.

### `POST /webhooks/dropcowboy` (webhook delivery, signed)

- Read the RAW bytes. Express: `express.raw({ type: '*/*' })` on this route only.
  Flask: `request.get_data()`. ASP.NET: read the request body stream into bytes.
  Never re-serialize parsed JSON before verifying.
- Headers: `X-Signature: sha256=<hex>`, `X-Timestamp` (seconds), optional
  `X-Signature-Version` (only `v1` accepted), optional `X-Event-Id`, `X-Attempt`.
- Verify: `HMAC-SHA256(secret, timestamp + "." + raw_body)` hex, compared with
  `sha256=` prefix in constant time. Accept if ANY configured secret matches
  (one secret per webhook). Reject a timestamp more than 300 seconds from now.
- Status codes: `503` no secrets configured, `401` missing/invalid/stale signature
  (body `{"error": "<code>"}` with codes `missing_signature`, `stale_timestamp`,
  `invalid_signature`), `400` body is not a JSON object, `200 {"received": true}`
  success, `200 {"received": true, "duplicate": true}` for a repeated `event_id`.
- Dedupe on `event_id` from the body (fall back to `X-Event-Id`). In-memory set is
  fine for the example; the guide says to use a database unique index in production.
- Do the slow work after recording the id, never before answering. Keep the
  handler to: verify, dedupe, record, answer. (Examples print and append to an
  in-memory list; no queue.)
- Event types printed: `contact.rvm.status` (status, reason, reason_code, to, from)
  and `contact.rvm.receipt` (proof_of_delivery_url). Unknown events are accepted
  (`200`) and logged by name.

### `GET /health` -> `200 {"ok": true}`.

The receiver exposes `received_events()` (in-process list) so recipes can wait for
a result. A recipe waiting for `DC_WAIT_SECONDS` completes as soon as it sees either
a callback or a webhook for its own `foreign_id` / `contact_id`, prints a summary,
and exits 0. Timeout exits 0 with a message that says no result arrived yet and
that results can still arrive at the receiver or on the subscribed webhook.

## Signature test vectors

`fixtures/signature-vectors.json` (regenerate with `node fixtures/generate-vectors.mjs`).
Every language test suite must assert, using the vector fields:

1. `signature` verifies for `raw_body` + `timestamp` + `secret` at `now_seconds_valid`.
2. Same inputs at `now_seconds_stale` -> rejected as `stale_timestamp`.
3. `tampered_raw_body` -> `invalid_signature`.
4. `signature_from_other_secret` -> `invalid_signature`.
5. Two secrets configured, second matches -> accepted.
6. Missing signature header or timestamp -> `missing_signature`.
7. Header without the `sha256=` prefix -> `invalid_signature`.
8. Non-numeric timestamp -> `stale_timestamp`.
9. Unsupported `X-Signature-Version` -> `invalid_signature`.

Receiver tests (through the real HTTP stack, ephemeral port): 401 on bad signature,
200 on good, duplicate answers `duplicate: true`, 503 with no secrets, callback route
accepts `fixtures/callback.rvm-success.json`, rejects a JSON array with 400.

## HTTP client behavior

- Headers: `x-key`, `x-secret`, `Content-Type: application/json`, `Accept: application/json`.
- `Idempotency-Key: <uuid v4>` on every `POST /rvm`. Not on any other route: the spec documents it for sends only, and the phone service ignores it on line creation.
- Timeout 30 seconds. No automatic retry on `POST /rvm` unless the same
  `Idempotency-Key` is reused. The client retries `429` and `5xx` on GETs only, 3
  tries, honoring `Retry-After`, with backoff.
- Non-2xx raises `DcError` carrying `status`, the response body (parsed when JSON),
  the `request_id` from `meta.request_id` or the `x-request-id` header when present.
  The recipe prints the status, the `title`/`detail`/`code` from the error body and
  the request id, and exits 1. It never prints the request headers.
- Responses are wrapped: `{ "data": ..., "meta": { "request_id": ... } }`.
  Exception: `POST /rvm` answers `202 {"status": "queued", "message_id": "<uuid>"}`.
  Confirm each shape against `v2/openapi/openapi.yaml` and `v2/openapi/examples/`
  before coding it.

## Recipes: exact call sequences

Every send uses a plain uuid v4 as `foreign_id` (no prefix). Print it so a reader
can match results.
`callback_url = DC_PUBLIC_URL + "/callbacks/dropcowboy"` when `DC_PUBLIC_URL` is set,
else omitted.

### send-rvm-retail

1. Resolve phone line: `DC_PHONE_LINE_ID`, else `GET /phone/public/lines` and pick the
   item whose `is_default` (or `default`) is true.
   (`DC_AUDIO_FILE` is validated before this step.)
2. Resolve audio by the precedence above. A `DC_AUDIO_FILE` is uploaded here, so its
   calls come after the line lookup and before the send. With nothing set, use the
   first item of `GET /media/public/media`.
3. `POST /rvm` with `{ to, phone_line_id, <one audio field>, foreign_id, callback_url }`.
   Never `caller_id`, whatever the audio source.
4. Print `message_id`, wait for result.

### send-rvm-byoc

1. Require `DC_CALLER_ID` and one audio setting, checked locally (including
   `DC_AUDIO_FILE` validation).
2. Preflight `GET /integration/public/byoc`: if the response shows no connected
   carrier, stop with a message pointing to the BYOC connect guide. This comes
   before any upload, so nothing is uploaded for a send that cannot happen.
3. Resolve audio by the precedence above (upload or import a `DC_AUDIO_FILE` here).
4. `POST /rvm` with `{ to, caller_id, <one audio field>, byoc?, foreign_id, callback_url }`.
   No `phone_line_id`.

### send-rvm-byoc-local-presence

The point: create a phone line, put numbers on it, then send with `phone_line_id`
only. The platform picks the caller ID. Never send `caller_id` in this recipe.

1. Find or create the line. If `DC_PHONE_LINE_ID` is set, use it. Otherwise
   `GET /phone/public/lines?search_term=<name>` and reuse an exact name match, else
   `POST /phone/public/lines` with exactly `{ "name": DC_LINE_NAME, "type": "voice" }`
   (`rules` is optional, so the examples omit it). The phone service answers 200 with
   `data.ivr_id`, which is the `phone_line_id`. The list route reports the default flag
   as `is_default` (the OpenAPI schema says `default`); read both.
2. Populate, in this order, each step optional:
   a. `DC_NUMBERS`: `POST /phone/public/numbers/import` with
      `{ phone_numbers: [...], phone_line_id }` -> `202` `data.long_job_id`; poll
      `GET /phone/public/numbers/import/{job_id}` every 2 seconds, up to 60 seconds,
      until `status` is `completed` or `failed`. Print `result.added`, `updated`,
      `invalid`, `conflicts`. `failed` prints `error` and exits 1.
   b. `DC_AREA_CODES`: for each area code, `POST /phone/public/numbers/available`
      with `{ country_iso: "US", pattern: <code>, type: "local", limit: 3 }`.
      Print the candidates. Only when `DC_RENT=yes` also
      `POST /phone/public/numbers/rent` with `{ numbers: [first candidate's phone_number per area code], voice_ivr_id: phone_line_id }`.
      Otherwise print "Dry run: set DC_RENT=yes to rent these" and rent nothing.
3. Confirm: `GET /phone/public/lines/{line_id}/numbers`, print the count and the numbers.
   If the count is 0, stop: a line with no numbers cannot send.
4. `POST /rvm` with `{ to, phone_line_id, <one audio field>, foreign_id, callback_url }`.
5. When the result arrives, print the `caller_id` from the callback or webhook `from`.
   Message wording (exact meaning, adapt phrasing): "The platform picked this number
   from your line. It chooses the number on the line closest to the recipient and
   falls back to a number on the line when it cannot place the recipient. Always identify
   your business location truthfully when asked by recipients."
   Do not say local presence raises answer rates, and do not call the number "the
   recipient's area code" unless it is.

### send-rvm-tts

1. Voice: `DC_VOICE_ID` or first `ready` voice from `GET /voice/public/voices`
   (`data.voices[]`, field `voice_id`, `status`). Stop with a message if none.
2. Text: `DC_TTS_BODY`, required, length check at 1,200 characters, locally, before
   calling.
3. If `DC_PREVIEW=yes`: `POST /voice/public/tts/synthesize` `{ voice_id, text }`;
   print `audio_url`, `expires_at`, `tts_characters` (billed per character).
4. `POST /rvm` with `{ to, <phone_line_id | caller_id by DC_MODE>, tts_body, voice_id, foreign_id, callback_url }`.
   Never send `media_id` or `audio_url` with `tts_body`. A `tts_body` without a
   `voice_id`, or the reverse, is rejected by the API (`3002` / `3015`); the example
   avoids it by construction.
5. Retail mode resolves the line like send-rvm-retail. BYOC mode needs `DC_CALLER_ID`.

### subscribe

An account holds up to 50 webhooks. A webhook is one URL, a set of event types and
its own signing secret, addressed by `webhook_id`. Creating one never replaces
another.

- Create: `POST /register/public/webhooks`
  `{ hook_url: DC_PUBLIC_URL + "/webhooks/dropcowboy", event_types: ["contact.rvm.status"] }`
  (requires `webhooks:write`), with `contact.rvm.receipt` added to the SAME `event_types`
  array for `--receipt`, or exactly the list given with `--events a,b`. Never one request
  per event type. Answers `201`; `data` has `webhook_id` and, only now, `signing_secret`.
  Print the `webhook_id` and only the last 4 characters of the secret, then: "The
  receiver loads the signing secrets by itself, or set DC_WEBHOOK_SECRET."
- List (`--list`): `GET /register/public/webhooks`. `data` is an array of webhooks without
  `signing_secret`. Print `webhook_id`, the event types and the URL, one line each.
  Needs no `DC_PUBLIC_URL`.
- Update (`--update <webhook_id>` with any of `--url <https url>`, `--events a,b` or
  `--receipt`, `--name <text>`): `PUT /register/public/webhooks/{webhook_id}` (requires
  `webhooks:write`). Send only the fields given, as `hook_url`, `event_types` and `name`;
  `event_types` REPLACES that webhook's whole set, it does not add to it. At least one field
  is required: with none, refuse before any request ("Nothing to update"). The API answers
  `400 nothing_to_update` for an empty body and `404` for an unknown id. Answers `200` with
  the webhook (`data` has `webhook_id`, `name`, `hook_url`, `event_types`, never a
  `signing_secret`); print its id, name, URL and event types. The `webhook_id` and the signing
  secret do not change, so the receiver needs no new secret. `--url` must be HTTPS and
  `--name` at most 100 characters; `--url` and `--name` without `--update` are refused.
- Delete (`--delete <webhook_id>`): `DELETE /register/public/webhooks/{webhook_id}`.
  Deletes only that webhook. `404` for an unknown id.
- Rotate (`--rotate <webhook_id>`): `POST /register/public/webhooks/{webhook_id}/rotate-secret`.
  `data` has `webhook_id`, `signing_secret`, `signing_secret_created_at`. Print only the
  last 4 characters of the new secret. Deliveries are signed with it from then on, and
  the receiver accepts any secret it holds: add the new secret before removing the old.
- A flag that needs a value but has none, or more than one of `--list`, `--update`,
  `--delete`, `--rotate`, is refused before any request.
- The receiver reads secrets with `GET /register/public/account/webhook-signing-secret`;
  `data` is an array of `{ webhook_id, event_types, hook_type, signing_secret }`, one per
  webhook. Use every `signing_secret`.

### upload-media

Requires `DC_AUDIO_FILE` (and a key with `media:write`). A local file:

1. `POST /media/public/media` `{ name, type: "rvm", signed_upload: true }`. The answer
   has `data.media_id` and `data.upload.mp3` / `data.upload.wav`, each `{ url, content_type }`.
2. `PUT <url for the file's format>` with the raw bytes and `Content-Type` set to exactly
   the returned `content_type` (no charset, no multipart). No `x-key` / `x-secret`: the URL
   is signed. No redirects, 120 second timeout. A `403` prints the upload-403 hint
   (Content-Type mismatch or an expired URL, which lasts 2 days; or import by URL).
3. `POST /media/public/media/{media_id}/complete` with `{}`.

A URL: one call, `POST /media/public/media` `{ name, type: "rvm", url, ext }`, where
`ext` is `".mp3"` or `".wav"` with the dot. Print `media_id: <id>` and
`To send it, set DC_MEDIA_ID=<id>`. The recipes use the same function for `DC_AUDIO_FILE`.

### check-receiver

`check-receiver <callback-url> [webhook-url]`. Calls only the given URLs, never the
API, and needs no API key. Both URLs must be full `http(s)://` URLs and not on a sample
host. A URL that is not public `https://` (localhost, `.local`, private or link-local
ranges) gets a note that Drop Cowboy only calls public HTTPS URLs, and is still checked.

- Callback: one `POST` of the body of `fixtures/callback.rvm-success.json`,
  `Content-Type: application/json`, 10 second timeout.
- Webhook: one `POST` of `fixtures/webhook.rvm-status.json` with a fresh `event_id`
  (uuid v4) and `event_at` (ms), signed with the first secret in
  `DC_WEBHOOK_SECRET` (none is an error). Headers: `X-Signature: sha256=<hex>`,
  `X-Timestamp` (seconds), `X-Signature-Version: v1`, `X-Event-Id`, `X-Attempt: 1`.
  5 second timeout.
- No retries and no redirects followed, like the platform.

Each answer gets one verdict:

| Verdict | When | Explanation includes |
|---|---|---|
| `ok` | 2xx within the timeout | accepted |
| `slow` | timed out, or answered after the timeout | the timeout; a webhook is retried, at most 3 attempts in all, then dropped; a callback is not retried; answer 2xx first |
| `unreachable` | no connection | check the server or tunnel, that the host is public, the URL |
| `route` | 404 or 405 | the route or verb is wrong, the exact path; if the body contains "No action was found on the controller", the Web API fix and a pointer to the C# README |
| `auth` | 401 or 403 | webhook: the signature check is failing, how to compute it; callback: callbacks carry no credentials, so let the path through |
| `rejected` | any other status | not 2xx |

The loss clause for `route`, `auth` and `rejected`: a webhook answered with 408, 429 or
5xx "is retried, at most 3 attempts in all, then dropped"; any other webhook status "is
not retried, so the event is lost"; a callback "is not retried, so that result is lost."
It ends with "All checks passed." or "Some checks failed." plus the API Logs line, and
exits 1 when any check fails or the arguments are wrong.

### detect-twilio

The point: show a reader with their own Twilio account how to use Detection on an
outbound call. The recipe dials `DC_TO` from `TWILIO_FROM`, forks the call audio to
Detection with `<Start><Stream>`, receives Detection's signed webhooks, and redirects
the live call with Twilio's REST API when the beep arrives (or a live person
answers). Twilio is called over plain HTTPS like the Drop Cowboy API: no Twilio SDK,
no Drop Cowboy SDK.

It is a basic working example, deliberately small: it plays one message on the beep or
on a live-person verdict, and does nothing else. It is not a delivery pipeline.

It runs its own receiver (four routes below) and never sends ringless voicemail, so
it does not use the `/callbacks/dropcowboy` or `/webhooks/dropcowboy` routes.

Every file header and the README also say: "This places a real phone call. Twilio
bills the call and Drop Cowboy bills the Detection session." Print that line right
after the consent line.

#### Settings

| Variable | Required | Meaning |
|---|---|---|
| `TWILIO_ACCOUNT_SID` | Yes | Starts with `AC`, 34 characters. Print only its last 4 characters |
| `TWILIO_AUTH_TOKEN` | Yes | Basic auth password for Twilio and the key for `X-Twilio-Signature`. Never printed, not even the last 4 |
| `TWILIO_FROM` | Yes | Caller ID in E.164. Must be a number in the Twilio account or a verified caller ID on it |
| `TWILIO_BASE_URL` | No | Default `https://api.twilio.com`. Tests point it at a mock server |
| `DC_TO` | Yes | Number to call in E.164. Must be someone who agreed to hear from you |
| `DC_PUBLIC_URL` | Yes | Public HTTPS base URL that reaches the receiver (a tunnel). Twilio fetches TwiML from it and Detection posts webhooks to it, and Detection accepts only `https://` on port 443. Reject `http://`, an explicit port other than `443`, a query string or fragment, `localhost`, `.local` and private or link-local addresses. Strip a trailing `/` |
| `DC_DETECTION_KEY` | One of | Detection API key. Sent to Detection as the `api_key` stream parameter, and the key the webhook signature is checked with |
| `DC_KEY`, `DC_SECRET` | One of | Used only when `DC_DETECTION_KEY` is unset: the recipe creates a temporary Detection key (see the call sequence) and deletes it at the end. Needs `balance:read` (to list keys) and `account:write` (to create and delete them) |
| `DC_BASE_URL` | No | As for the other recipes |
| `DC_DETECTION_URL` | No | Default `wss://detect.dropcowboy.com/carrier/ws/twilio`. Must start with `wss://` |
| `DC_VM_AUDIO_URL` | One of | Public `https://` MP3 or WAV that Twilio plays on the beep (`<Play>`) |
| `DC_VM_TEXT` | One of | Text Twilio speaks on the beep (`<Say>`) when `DC_VM_AUDIO_URL` is unset. 1,000 characters or fewer |
| `DC_LIVE_AUDIO_URL`, `DC_LIVE_TEXT` | No | Message for a live person, same rules. When both are unset the live person hears the voicemail message |
| `DC_RING_SECONDS` | No | Integer 5 to 60, default `30`. Twilio's `Timeout` for the call |
| `DC_WAIT_SECONDS` | No | Integer 60 to 600, default `180`. The whole run, from creating the call to the end. `0` is refused: this recipe has to listen |
| `PORT` | No | Receiver port, default `3000` |

Exactly one of `DC_VM_AUDIO_URL` and `DC_VM_TEXT` must be usable (audio wins when both
are set). `DC_DETECTION_KEY` wins over `DC_KEY`/`DC_SECRET`. With neither, stop
before any request with a message naming both options.

Validate everything before the first request, in this order, and print every
problem found, not just the first: required settings, E.164 shape of `DC_TO` and
`TWILIO_FROM` (`+` then 8 to 15 digits), `TWILIO_ACCOUNT_SID` shape (`AC` plus 32
hex), `DC_PUBLIC_URL`, the audio URLs (`https://`, path ends in `.mp3` or `.wav`,
case-insensitive), the numeric ranges. The
sample-value check over every `DC_` setting and `TWILIO_FROM`, and the refusal of a
`TWILIO_ACCOUNT_SID` made only of zeros after `AC`
(`TWILIO_ACCOUNT_SID=<value>: this is the placeholder from our fixtures; use your own.`),
run in the same pass, and their messages print after the validation problems in one
list. Any failure exits 1 with no request made. Tests therefore configure
`AC00000000000000000000000000000001` as the Account SID; the fixtures' all-zero SIDs
appear only inside the fixture bodies.

#### Receiver routes

Answer within 5 seconds. The routes verify, record and answer. They never call
Twilio or Drop Cowboy; the recipe acts on what they recorded.

`GET /health` -> `200 {"ok": true}`.

`POST /twilio/voice` (Twilio asks for the call's TwiML when it is answered):

- Form-encoded body. Verify `X-Twilio-Signature` (see below) against
  `DC_PUBLIC_URL + "/twilio/voice"`, never the `Host` the request arrived with,
  because a tunnel rewrites it. Missing or wrong signature: `403`, empty body.
- `CallSid` not the call this run created: `403`.
- Otherwise `200`, `Content-Type: text/xml`, this TwiML (attribute values XML-escaped:
  `&`, `<`, `>`, `"`, `'`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Start>
    <Stream name="detection" url="{DC_DETECTION_URL}" track="inbound_track">
      <Parameter name="api_key" value="{detection key}"/>
      <Parameter name="webhook_url" value="{DC_PUBLIC_URL}/webhooks/detection"/>
      <Parameter name="webhook_events" value="detection,beep,screening,timeout,error,close"/>
      <Parameter name="call_id" value="{run call_id}"/>
    </Stream>
  </Start>
  <Pause length="{DC_WAIT_SECONDS + 10}"/>
  <Hangup/>
</Response>
```

  `<Start>` forks the audio and lets the TwiML go on, so the call stays silent in
  `<Pause>` while Detection listens. The `<Hangup/>` ends a call nobody acted on.
  The README warns that the Detection key is in this TwiML, so it shows in the Twilio
  Console request logs: use a dedicated key and delete it when done (the temporary-key
  path does that).

`POST /webhooks/detection` (Detection deliveries, signed):

- Read the RAW bytes, as for `/webhooks/dropcowboy`.
- Headers: `X-Signature: v1=hmac-sha256,<hex>`, `X-Timestamp` (milliseconds),
  `X-Delivery-Id`, `X-Event`, `X-Source`.
- Verify: `HMAC-SHA256(detection key, X-Timestamp + "." + raw_body)` hex. Split the
  header on `,`, require the first item to be exactly `v1=hmac-sha256`, compare each
  later item in constant time. Reject a timestamp more than 300,000 ms from now.
- Status codes: `401` with `{"error": "<code>"}` for `missing_signature`,
  `stale_timestamp`, `invalid_signature` (same rules as the other webhook route:
  non-numeric timestamp is `stale_timestamp`, a header without the `v1=hmac-sha256`
  scheme is `invalid_signature`), `400` body is not a JSON object,
  and `200 {"received": true}`. The receiver does not deduplicate.
- Record every accepted event. A `call_id` other than this run's is recorded as
  ignored and logged, never acted on.

`POST /twilio/status` (Twilio status callback):

- Verify `X-Twilio-Signature` against `DC_PUBLIC_URL + "/twilio/status"`, `403` when
  missing or wrong. Record `CallStatus` (and `CallDuration` when present) for this
  run's `CallSid`. Answer `200`, empty body.

`X-Twilio-Signature` is base64 of HMAC-SHA1 keyed with `TWILIO_AUTH_TOKEN` over the URL
followed by every POST parameter name and its value, sorted by name (byte order),
with nothing between them. Compare in constant time. A repeated parameter name
contributes each value, in the order received.

#### Call sequence

`call_id` is a fresh uuid v4 for the run. Print it.

1. Print the consent line and the billing line.
2. Validate settings as above.
3. Detection key. With `DC_DETECTION_KEY`, use it and print its last 4 characters.
   Otherwise:
   a. `GET /register/public/detection-keys`; for every item whose `name` is exactly
      `Twilio detection recipe (temporary)`, `DELETE /register/public/detection-keys/{key_id}`
      (leftovers from a run that was killed).
   b. `POST /register/public/detection-keys`
      `{ "name": "Twilio detection recipe (temporary)", "expires_in_seconds": 3600 }`.
      `201` `data` has `key_id` and `api_key`. Print the `key_id` and the last 4 of the key.
      A `403` prints the API's `detail` and `details.code`, then one `What to do:` line
      for these codes, and exits 1:

      | Code | Hint |
      |---|---|
      | `byoc-required` | Detection keys need Building Blocks on your account. Enable Building Blocks, then run this again. |
      | `team-not-verified` | Finish verifying your account in the dashboard, then run this again. |
      | `trial_feature_blocked` | Detection keys are not available on a trial account. Choose a plan, then run this again. |
4. Twilio preflight (Basic auth `TWILIO_ACCOUNT_SID:TWILIO_AUTH_TOKEN`, `Accept: application/json`):
   a. `GET /2010-04-01/Accounts/{sid}.json`. When `type` is `Trial`, stop: "Twilio trial
      accounts play a notice and wait for a key press before your TwiML runs, so
      detection would hear the notice. Upgrade the Twilio account to run this recipe."
      When `status` is not `active`, stop and print it.
   b. `GET /2010-04-01/Accounts/{sid}/IncomingPhoneNumbers.json?PhoneNumber={TWILIO_FROM}`
      (URL-encode the `+`). A non-empty `incoming_phone_numbers` passes. Otherwise
      `GET /2010-04-01/Accounts/{sid}/OutgoingCallerIds.json?PhoneNumber={TWILIO_FROM}`,
      non-empty `outgoing_caller_ids` passes. Otherwise stop: "TWILIO_FROM is not a
      number in this Twilio account or a verified caller ID on it."
5. Start the receiver on `PORT`. `GET {DC_PUBLIC_URL}/health`, 10 second timeout, must be
   `200` with `{"ok": true}`, else stop: the tunnel does not reach this receiver.
6. `POST /2010-04-01/Accounts/{sid}/Calls.json`, form-encoded:
   `To`, `From`, `Url={DC_PUBLIC_URL}/twilio/voice`, `Method=POST`,
   `StatusCallback={DC_PUBLIC_URL}/twilio/status`, `StatusCallbackMethod=POST`,
   `StatusCallbackEvent` four times (`initiated`, `ringing`, `answered`, `completed`),
   `Timeout={DC_RING_SECONDS}`. Nothing else: no `MachineDetection`, because Detection
   does that job. Never retried. `201` JSON has `sid`; print it.
7. Act on what the receiver records, at most one action per call, decided in this order
   as events arrive:
   Verdict `type` values are the ones Detection sends on the wire (see
   `v2/docs/api/detection.md`): `speech.human.unknown`, `speech.voicemail.greeting`,
   `speech.voicemail.full`, `speech.voicemail.not_setup`, `speech.silence`,
   `speech.ivr`, `speech.screening`, `speech.carrier.intercept`, `speech.unknown`.
   Match live person on the `speech.human.` prefix, so a future subtype still counts.
   - `beep` -> play the voicemail message. Outcome `voicemail_on_beep`. A beep counts
     whether or not a voicemail verdict came first.
   - `detection` whose `type` starts with `speech.human.` -> play the live message,
     whatever the `confidence`. Outcome `live_person`.
   - Every other event (`screening`, `timeout`, `error`, `close`, and any other
     `detection` type) -> print it, no action.
   - Twilio status `busy`, `no-answer`, `failed` or `canceled` before any action ->
     outcome `not_answered` with that status, no Twilio request.
   - Twilio status `completed` before any action -> outcome `ended_before_action`.
   To play: `POST /2010-04-01/Accounts/{sid}/Calls/{CallSid}.json` with one form field
   `Twiml` set to
   `<Response><Stop><Stream name="detection"/></Stop><Play>{url}</Play><Hangup/></Response>`
   (or `<Say>{text}</Say>` for text, XML-escaped). Stopping the stream ends the
   Detection session, which then sends `close` with reason `normal`. To hang up: the same
   route with `Status=completed`. Print how many milliseconds passed between the
   receiver recording the beep and Twilio answering the update.
   A `404`, or Twilio error `21220`, on the update means the call already ended: print
   it and go on to the summary, not an error.
8. Wait for a terminal Twilio status (`completed`, `busy`, `no-answer`, `failed`,
   `canceled`) for the rest of `DC_WAIT_SECONDS`.
9. If `DC_WAIT_SECONDS` runs out with no action, hang up (outcome `no_result`) and print: "No Detection
   result arrived. Check that the Detection key is active and the balance covers
   Detection, and look for stream errors in the Twilio Console debugger." When no
   Detection webhook arrived at all, add that a refused key closes the stream before
   any webhook is sent.
10. Summary, one line each: `outcome`, the last verdict (`type`, `confidence`), beep
    `timestamp_ms` and `duration_ms` when one arrived, the update latency, final
    `CallStatus` and `CallDuration`, the `CallSid`, the `call_id`, and the number of
    Detection webhooks received and ignored. `received` counts every
    signed delivery, including the ignored ones; `ignored` is the part
    of `received` for another `call_id`.
11. `finally`, also on Ctrl+C and on any error after step 6: if the call has no terminal
    status, hang it up (`Status=completed`; a `404` or `21220` is fine). Then delete the
    temporary key if this run created one (print `Temporary Detection key deleted.`), then
    close the receiver. Each step runs even if an earlier one fails, and its failure is
    printed. Exit 0 for any outcome in the summary, 1 for a settings, preflight or
    request error or a failed cleanup step, and 130 on Ctrl+C (after the cleanup), as
    in the other commands.

Signed `/twilio/status` callbacks for another `CallSid` are answered `200` and not
acted on. A status that arrives before Twilio's create-call response is kept and
counted once the `CallSid` is known, so a fast `completed` is not lost.

Twilio errors: non-2xx JSON has `code`, `message`, `more_info`, `status`. Print the HTTP
status, `code`, `message` and `more_info`, then one `What to do:` line for these codes:

| Code | Hint (meaning) |
|---|---|
| `21210`, `21212` | TWILIO_FROM must be a number in this Twilio account or a verified caller ID on it. |
| `21215` | Twilio's Voice geographic permissions block calls to this country. Enable it in the Twilio Console. |
| `21219` | Trial accounts can call only verified numbers. Upgrade the Twilio account to run this recipe. |
| `20003` | Twilio rejected TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN. |

Twilio client: form-encoded bodies, 30 second timeout, GETs retry `429` and `5xx` like
`DcClient`, POSTs never retry. It never prints request headers or the auth token.

#### Signature vectors

`fixtures/detection-signature-vectors.json` and `fixtures/twilio-signature-vectors.json`
(regenerate with `node fixtures/generate-vectors.mjs`). Assert:

Detection: `signature` verifies for `raw_body` + `timestamp_ms` + `detection_key` at
`now_ms_valid`; `now_ms_stale` -> `stale_timestamp`; `tampered_raw_body` and
`signature_from_other_key` -> `invalid_signature`; missing header or timestamp ->
`missing_signature`; the digest without the `v1=hmac-sha256,` scheme ->
`invalid_signature`; a non-numeric timestamp -> `stale_timestamp`.

Twilio: `signature` verifies for `url` + `params` + `auth_token`; `tampered_params`, a
different URL, and `signature_from_other_token` fail; a missing header fails.

#### Tests

Mock Twilio (the `/2010-04-01/...` routes above) and mock Drop Cowboy in-test, ephemeral
ports. Drive the receiver over real HTTP with signed Twilio and Detection requests
built from the fixtures (with this run's `call_id` and `CallSid` swapped in). The
health check goes to the receiver directly in tests; everything else uses the
configured `DC_PUBLIC_URL` for signing exactly as in production. Cover:

- Settings: each required setting missing, every `DC_PUBLIC_URL` rejection, bad E.164,
  bad SID, zero SID, `DC_WAIT_SECONDS=0`, a sample value, and that no request is made.
- Key: with `DC_DETECTION_KEY` no Drop Cowboy request is made; without it, the order is
  list, delete leftovers, create, and the key is deleted in `finally` on success, on a
  Twilio error and on a thrown error; a `403 byoc-required` prints its hint.
- Preflight: trial stops; inactive stops; incoming number passes without the caller ID
  call; verified caller ID passes; neither stops; no call is created after a stop.
- The exact `Calls.json` form body, including four `StatusCallbackEvent` values and no
  `MachineDetection`.
- `/twilio/voice`: the exact TwiML for audio and for text, XML escaping, `403` on a bad
  signature and on another `CallSid`.
- `/webhooks/detection`: every status code above.
- Decisions: beep plays the voicemail message (exact `Twiml`); `speech.human.unknown`
  plays the live message at any confidence; another `speech.human.` subtype also plays
  the live message; the bare word `live_person` is not acted on; the live message
  falls back to the voicemail message; a voicemail verdict with no beep does nothing and
  the run ends with `no_result`; `speech.voicemail.greeting` then beep plays on the
  beep; `speech.voicemail.full`, `speech.silence`, a timeout and an error do not hang
  up; `speech.ivr` does nothing; only one action per call when events race; another
  `call_id` is ignored; `busy` before answer ends with no update.
- `finally` hangs up a call that is still up and skips the hang-up after a terminal
  status; a `404` on the hang-up is not an error.
- Neither `TWILIO_AUTH_TOKEN`, `DC_SECRET` nor the full Detection key appears in
  captured stdout or stderr, and the Account SID appears only as its last 4.

## twilio-functions

`twilio-functions/` is not one of the three language projects and has no Python or
C# twin: Twilio Functions run only Node.js. It demonstrates receiving a Detection
event and responding to it. It is a demonstration, not a delivery pipeline.

- Two Functions, `functions/detection-voice.protected.js` (TwiML that forks the call
  to Detection, protected so only Twilio runs it) and `functions/detection-webhook.js`
  (public, receives the Detection webhooks).
- Settings: `DC_DETECTION_KEY`, `DC_DETECTION_WEBHOOK_TOKEN` (24 or more characters),
  and `DC_VM_AUDIO_URL` or `DC_VM_TEXT`. It sets no strategy, timeout, threshold or
  endpoint, so Detection's defaults apply.
- A Function cannot read the raw request body, so it cannot check `X-Signature`. The
  webhook address carries `?token=` instead, compared in constant time, and an event
  for another `twilio_account_sid` is refused. The README states this plainly.
- `onEvent` runs for every delivery. Its only default behavior is to leave the
  message on `beep`: stop the stream, play or say the message, hang up. What an
  event means and how to build a robust flow on it is left to the reader, and the
  README says so.
- Status codes: `401` wrong token, `403` another account, `400` no `event`, `500`
  bad settings or a thrown error (Detection retries it), `200` otherwise.
- Neither the token nor the Detection key is ever logged.
- Tests (`npm test`) load the Functions with the `Twilio` global and a fake client, so
  they use no network and no credentials.

## Test requirements (all languages)

- Mock API server in-test (ephemeral port). For each recipe assert the ordered list of
  requests (method, path) and the exact JSON body of `POST /rvm`, including that the
  forbidden fields are absent (`caller_id` on retail and local presence, `phone_line_id`
  on BYOC, `audio_url`/`media_id` alongside `tts_body`).
- Matching results to sends: callbacks echo `foreign_id`. Status webhooks carry no
  `foreign_id`, so recipes match them on `data.to` for events that arrive after the send.
- Assert `Idempotency-Key` is a UUID on `POST /rvm` (and absent on line creation) and `x-key`/`x-secret` are sent, and that the
  secret never appears in captured stdout/stderr.
- Local presence: rent is NOT called unless `DC_RENT=yes`; import polling handles
  `processing` then `completed`, and `failed`.
- Upload: the order is create, `PUT`, complete; the `PUT` carries exactly the returned
  `content_type` (the mock storage answers `403` otherwise) and no API key; `.wav` uses
  `upload.wav`; a `403` prints the hint; a URL is one import call with `ext`; bad
  format, a missing file and an empty file stop before any request.
- Audio: the exact `POST /rvm` body for each audio source on retail and BYOC, the
  precedence when several are set, the upload before the send, and on BYOC the carrier
  check before any upload (and no upload without a carrier).
- Sample values: the language's list equals the fixture; each kind (id, number, URL host,
  list item) is refused with the message and no request is made, in every command;
  lookalike values are not refused.
- Outcome hints: `3001`, `3014`, `3040` print `What to do:` after the result; success
  prints none; the API Logs line on no wait and on timeout.
- check-receiver against real local HTTP endpoints: each verdict (2xx, 404, 405, 401,
  403, slow, retried 5xx vs not retried 4xx, redirect not followed, unreachable), the
  webhook signature verifies with the shared verify function and has the headers above,
  signing with the first of several secrets, the missing-secret error, the embedded sample bodies
  equal the fixtures, and the exit code.
- Test names and counts do not need to match across languages, scenarios do.

## Out of scope

Do not publish packages, add GitHub workflows, or edit anything outside
`examples/api/` when you change these examples.
