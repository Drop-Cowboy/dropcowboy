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
