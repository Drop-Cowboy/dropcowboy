# Drop Cowboy API examples

Send only to people who agreed to hear from you. Test with numbers you own.

Working code for sending a ringless voicemail with the Drop Cowboy API and for
receiving the result. The same four recipes are written three times, in Node.js,
Python and C#. They use plain HTTP, with no SDK, and each one ships with tests
that run against a mock API, so the tests need no network and no credentials.

New to the API? Start with the [quickstart](quickstart/): one send and one result,
in a few minutes. Come back here for the full recipes.

## What is here

| Folder or file | What it holds |
|---|---|
| `node/` | Node.js 20.6 or newer, Express 4, built-in test runner. See [`node/README.md`](node/README.md). |
| `python/` | Python 3.9 or newer, Flask 3, `requests`, pytest. See [`python/README.md`](python/README.md). |
| `csharp/` | .NET 8, ASP.NET Core minimal API, xUnit. See [`csharp/README.md`](csharp/README.md). |
| `fixtures/` | Language-neutral JSON used by every test suite: callback and webhook bodies, and the signature test vectors. |
| `CONTRACT.md` | The behavior all three projects share: environment variables, receiver routes, call sequences and test requirements. |

## Recipes and guides

Each recipe sends one ringless voicemail, waits for the result and prints a
summary. The last column links to the reference for the same calls.

| Recipe | Node.js | Python | C# | Reference |
|---|---|---|---|---|
| Send on a retail plan, from a Drop Cowboy phone line | `npm run send:retail` | `python -m dropcowboy_examples.recipes.send_rvm_retail` | `dotnet run -- retail` | [Ringless voicemail](https://www.dropcowboy.com/developers/api/ringless-voicemail) |
| Send from your own caller ID, on your own carrier | `npm run send:byoc` | `python -m dropcowboy_examples.recipes.send_rvm_byoc` | `dotnet run -- byoc` | [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier) |
| Put several numbers on a phone line and let the platform choose the caller ID | `npm run send:local-presence` | `python -m dropcowboy_examples.recipes.send_rvm_byoc_local_presence` | `dotnet run -- local-presence` | [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier) |
| Send text that is spoken for you | `npm run send:tts` | `python -m dropcowboy_examples.recipes.send_rvm_tts` | `dotnet run -- tts` | [Voices and text to speech](https://www.dropcowboy.com/developers/api/voice) |

Every project also has a receiver that listens for results, and a
`subscribe` command that creates, lists, updates, rotates and deletes webhooks.
[Send lifecycle](https://www.dropcowboy.com/developers/api/send-lifecycle) explains
how a result travels, and [Webhooks](https://www.dropcowboy.com/developers/api/webhooks)
covers subscriptions and signatures.

Two helper commands, in every language:

| Command | Node.js | Python | C# |
|---|---|---|---|
| Upload `DC_AUDIO_FILE` and print its `media_id` | `npm run upload-media` | `python upload_media.py` | `dotnet run -- upload-media` |
| Post a sample result to your own endpoints and explain the answer | `npm run check-receiver -- <callback-url> [webhook-url]` | `python check_receiver.py <callback-url> [webhook-url]` | `dotnet run -- check-receiver <callback-url> [webhook-url]` |

Every command refuses, before any request, a setting that holds an id, number
or host copied from our docs: "this is a sample value from our docs; use your
own". The list is `fixtures/doc-sample-values.json`.

## Quick start

You do not need to clone anything else. Copy the folder for your language; it
runs on its own. Copy `fixtures/` next to it too if you want to run its tests,
and always copy it with `quickstart/`, which reads it at run time. Then:

1. Copy `.env.example` to `.env`.
2. Set `DC_KEY` and `DC_SECRET` to your API key pair. Create one under
   **Developers > API Keys** in the dashboard.
3. Set `DC_TO` to a number you own, in E.164 format such as `+13125550142`.
4. Run a recipe from the table above.

Node.js and Python read `.env` for you. The C# project reads environment
variables only: export them, or load `.env` into your shell first. Each
project's README has the exact commands, the settings each recipe needs and a
troubleshooting table.

To run the tests, which spend nothing:

| Language | Command |
|---|---|
| Node.js | `npm install`, then `npm test` |
| Python | `pip install -r requirements-dev.txt`, then `python -m pytest` |
| C# | `dotnet test` from the `csharp/` folder |

## Settings shared by all three projects

All three read the same environment variables. `CONTRACT.md` lists every one;
these are the ones you will set most often.

| Variable | Required | Meaning |
|---|---|---|
| `DC_KEY`, `DC_SECRET` | Yes | Your API key pair. Sent as the `x-key` and `x-secret` headers. |
| `DC_TO` | For sends | The recipient, in E.164 format. Someone who agreed to hear from you. |
| `DC_PUBLIC_URL` | No | The public HTTPS base address that reaches the receiver. Without it, a recipe sends with no `callback_url`. |
| `PORT` | No | The receiver's port. Default `3000`. |
| `DC_WEBHOOK_SECRET` | No | One or more webhook signing secrets, comma separated. When unset, the receiver loads them from the API at start-up. |
| `DC_PHONE_LINE_ID` | No | The phone line to send from. Retail falls back to your default line. |
| `DC_CALLER_ID` | BYOC | Your own number, in E.164 format. |
| `DC_MEDIA_ID` | No | A file you uploaded. Without it, the retail recipes play the first file on your account and print its id, so set it to choose the audio yourself. |
| `DC_AUDIO_FILE` | No | A `.mp3` or `.wav` on your computer, or its `https://` address. Uploaded first, then sent as `media_id`. |
| `DC_AUDIO_URL` | No | A hosted audio file, sent as `audio_url`. See the note below. |
| `DC_TTS_BODY`, `DC_VOICE_ID` | Text to speech | The text to speak, 1,200 characters or fewer, and the voice to speak it with. |
| `DC_WAIT_SECONDS` | No | How long a recipe waits for a result. Default `300`. `0` sends and exits. |

A recipe sends exactly one audio source, the first of `DC_MEDIA_ID`,
`DC_AUDIO_FILE`, `DC_TTS_BODY` (with `DC_VOICE_ID`) and `DC_AUDIO_URL` that is set.
audio_url is an option for BYOC plans only and must be enabled by support.
Contact support to enable it. If you're testing on a retail account before
connecting your carrier, support can enable it for testing, and you can then
send only to your test numbers. Otherwise, upload the file and send media_id, or
use text to speech.

## How results arrive

A `202` from the API means the request was accepted. It does not tell you what
happened to the voicemail. The result arrives later, as a `status` and a
`reason_code`, through either of two channels:

- **A per-send callback.** Each send can carry a `callback_url`. You get one
  unsigned `POST` per send with the outcome, and it echoes your `foreign_id`.
  Treat it as a hint and match it against sends you made.
- **A signed webhook.** Create one webhook for `contact.rvm.status`, and optionally
  add `contact.rvm.receipt` to it for the proof of delivery link. Each delivery carries an
  `X-Signature` header that the receiver checks against the raw request body.
  Rely on this channel for anything that matters.

The receiver in each project implements both routes. Branch on `reason_code`,
not on the text. Every code is listed in
[Outcomes](https://www.dropcowboy.com/developers/api/outcomes). For `3001`,
`3014` and `3040` the recipes also print what to do.

## Where are my results?

`POST /rvm` answers `202` when it queues the send. The outcome comes later:

- on your `callback_url` (unsigned, one attempt, 10 second timeout);
- on a signed `contact.rvm.status` webhook, if you subscribed (answer `2xx` within 5 seconds);
- in **Settings > API Logs** in the dashboard, which shows the outcome and what your endpoint answered.

If your endpoint answers anything but `2xx`, the result does not reach your
code. A `404` or `405` is never retried, and neither is a callback. Check API
Logs, then run `check-receiver` against the same URLs until every check passes.

## 403 on upload

The `PUT` to the signed upload URL answered `403`. Usually one of two things:

- **The `Content-Type` does not match.** Send exactly the `content_type` returned
  next to the URL (for example `audio/mpeg`), with no charset and no other value,
  and send the raw bytes rather than a form.
- **The URL expired.** Upload URLs last 2 days. Run `upload-media` again for fresh ones.

Or set `DC_AUDIO_FILE` to an `https://` address of the file, and it is imported
by URL instead. Each project's README shows the three upload calls.

## Compliance

Send only to people who agreed to hear from you, and keep a record of that
agreement. While you build, send to numbers you own. Numbers you own can be added
as test numbers on the Dialing rules page, which skips the contact frequency
limit. Calling hours still apply.

While Drop Cowboy provides tools to support compliance efforts, customers remain solely responsible for obtaining proper consent, maintaining opt-out lists, and complying with all federal and state telemarketing regulations. Consult with your legal counsel to ensure your specific use case and consent mechanisms comply with applicable laws.

This information is for educational purposes only and does not constitute legal advice. Regulations vary by jurisdiction and use case. Always consult with qualified legal counsel to ensure your specific practices comply with applicable federal and state laws.

## Testing without a public URL

You can build and test without a tunnel:

- **Check your own endpoints.** `check-receiver` posts a sample callback and a
  signed sample webhook to the URLs you give it and says, for each answer, whether
  the route, the signature check or the timing is wrong. It calls no API.
- **The test suites need no network.** Each project's tests start a mock API and
  the receiver on a local port, then check the order of requests, the exact body
  of each send and the signature checks, so you can change code with confidence
  before you send anything.
- **A recipe still sends without `DC_PUBLIC_URL`.** It adds no `callback_url`,
  prints a notice that the result will not come back to this program, and you
  can read the result in your dashboard.
- **To see results arrive on your computer,** start any HTTPS tunnel that
  forwards to the receiver's port, and set `DC_PUBLIC_URL` to the address it
  gives you, with no trailing path. The receiver adds `/callbacks/dropcowboy`
  and `/webhooks/dropcowboy` itself.
- **To exercise the receiver by hand,** post the bodies in `fixtures/` to it. The
  signature vectors in `fixtures/signature-vectors.json` show a body, a
  timestamp and the signature that goes with them.
