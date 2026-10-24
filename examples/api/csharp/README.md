# Drop Cowboy API: C# example

Send only to people who agreed to hear from you. Test with numbers you own.

Working code for the ringless voicemail route of the Drop Cowboy API, plus a
receiver that checks webhook signatures. It targets .NET 8 and C# 12, and uses
ASP.NET Core minimal APIs, `HttpClient` and `System.Text.Json`. The app has no
NuGet packages and no SDK.

A fifth recipe, `detect-twilio`, places a call through your own Twilio account and
uses Detection to play your message on the voicemail beep, or to a live person. See
[Detection with Twilio](#detection-with-twilio).

New to the API? Start with the [quickstart](../quickstart/), then come back here.

| Command | What it does |
|---|---|
| `dotnet run -- retail` | Sends a voicemail from one of your phone lines. |
| `dotnet run -- byoc` | Sends from your own number, on your own carrier (bring your own carrier). |
| `dotnet run -- local-presence` | Puts several numbers on a phone line, then sends with the line so the platform picks the number. |
| `dotnet run -- tts` | Sends a voicemail that speaks text you provide. |
| `dotnet run -- subscribe` | Creates a webhook that delivers results to your receiver. Also lists, updates, rotates and deletes webhooks. |
| `dotnet run -- upload-media` | Uploads `DC_AUDIO_FILE` to your media library and prints its `media_id`. |
| `dotnet run -- check-receiver <callback-url> [webhook-url]` | Posts a sample result to your own endpoints and explains the answer. Calls no API. |
| `dotnet run -- receiver` | Runs only the receiver, to watch results arrive. |
| `dotnet run -- detect-twilio` | Calls a number from your own Twilio account, lets Detection listen, and plays your message on the beep or to a live person. See [Detection with Twilio](#detection-with-twilio). |
| `dotnet test` | Runs the tests from the folder that holds the solution. They use a mock API and spend nothing. |

## Prerequisites

- The .NET 8 SDK (`dotnet --version` prints `8.` or newer).
- A Drop Cowboy API key and secret. Create them under **Developers > API Keys** in the dashboard.
- A phone you own to receive the test voicemail. Use a number you own, or one that agreed to hear from you.
- To see results arrive, an HTTPS address that reaches your computer (see [Expose the receiver](#expose-the-receiver)). This is optional: without it a send still goes out, and you can follow the result in your dashboard.

## Set up

The app reads settings from environment variables only. It does not load a file. Set at least `DC_KEY`, `DC_SECRET` and `DC_TO` (the recipient, in E.164 format such as `+13125550142`). Every variable is listed in `.env.example`.

bash or zsh:

```bash
export DC_KEY="your-key"
export DC_SECRET="your-secret"
export DC_TO="+13125550142"
cd src/DropCowboy.Examples
```

PowerShell:

```powershell
$env:DC_KEY = "your-key"
$env:DC_SECRET = "your-secret"
$env:DC_TO = "+13125550142"
cd src/DropCowboy.Examples
```

To keep your settings in a file, copy `.env.example` to `.env.local` (git ignores it) and load it with `set -a; source .env.local; set +a`. The file holds your secret, so never commit it.

Run every command in this README from `src/DropCowboy.Examples`, or add `--project src/DropCowboy.Examples` when you run from the folder that holds the solution.

## Expose the receiver

Drop Cowboy reports the result of each send to a URL you provide. The receiver in `Receiver/` listens on your computer, so you need an HTTPS tunnel from the internet to it. Any tunnel works: use the one you already have.

1. Start your tunnel and point it at port `3000` (or the `PORT` you set).
2. Copy the public `https://` address it gives you.
3. Set `DC_PUBLIC_URL` to that address, with no trailing path.

The receiver has two routes:

| Route | Used for | Signed? |
|---|---|---|
| `POST /callbacks/dropcowboy` | The `callback_url` each send carries. One attempt, 10 second timeout. | No |
| `POST /webhooks/dropcowboy` | A webhook delivery. Answer `2xx` within 5 seconds, or it is retried. | Yes, `X-Signature` |

`GET /health` answers `{"ok":true}`.

To receive webhooks as well, create a webhook. A webhook is one URL, the event types it receives and its own signing secret, and an account can hold many:

```bash
dotnet run -- subscribe                        # one webhook for contact.rvm.status
dotnet run -- subscribe --receipt              # one webhook for contact.rvm.status and contact.rvm.receipt (proof link)
dotnet run -- subscribe --events a,b           # one webhook for exactly these event types
dotnet run -- subscribe --list                 # your webhooks, by webhook_id
dotnet run -- subscribe --update WEBHOOK_ID --events a,b --url URL --name "My hook"   # change one webhook
dotnet run -- subscribe --rotate WEBHOOK_ID    # a new signing secret for that webhook
dotnet run -- subscribe --delete WEBHOOK_ID    # delete that webhook, and no other
```

`--update` sends only what you pass (`--url`, `--events a,b` or `--receipt`, `--name`), and at least one is required. The event types you pass replace that webhook's whole set. The `webhook_id` and the signing secret do not change, so the receiver needs no new secret. Creating a webhook prints the `webhook_id` and the last four characters of its signing secret.

The receiver loads your signing secrets from the API when it starts, which needs a key with the `webhooks:read` scope. To use your own, set `DC_WEBHOOK_SECRET` (comma separated for more than one).

## Run a recipe

Each recipe starts the receiver, sends one voicemail, waits for the result (up to `DC_WAIT_SECONDS`, 300 by default), prints a summary and exits. Set `DC_WAIT_SECONDS=0` to send and exit at once. Press Ctrl-C to stop waiting early.

### Retail: send from a phone line

```bash
dotnet run -- retail
```

Uses `DC_PHONE_LINE_ID`, or your default phone line. The request is `phone_line_id` plus exactly one audio source, and never `caller_id`: the line decides which of its numbers the recipient sees. The audio is the first of these that is set:

1. `DC_MEDIA_ID`, a file already in your media library.
2. `DC_AUDIO_FILE`, a `.mp3` or `.wav` that the recipe uploads first (see [Upload audio](#upload-audio)), then sends as `media_id`.
3. `DC_TTS_BODY` with `DC_VOICE_ID` (or your first ready voice), to speak text.
4. `DC_AUDIO_URL`, sent as `audio_url`. audio_url is an option for BYOC plans only and must be enabled by support. Contact support to enable it. If you're testing on a retail account before connecting your carrier, support can enable it for testing, and you can then send only to your test numbers. Otherwise, upload the file and send media_id, or use text to speech.

With none of them set, it sends the first media file on your account, preferring one approved for API sends.

### Bring your own carrier

```bash
dotnet run -- byoc
```

Needs `DC_CALLER_ID` (your own number at your carrier) and one audio setting, in the same order as retail: `DC_MEDIA_ID`, `DC_AUDIO_FILE`, `DC_TTS_BODY` or `DC_AUDIO_URL`. The recipe checks that a carrier is connected first, before it uploads anything. The caller ID must be a number you are entitled to use. Always identify your business location truthfully when asked by recipients. To pass your STIR/SHAKEN details, set both `DC_STI_ORIG_ID` and `DC_STI_ATTESTATION`. For `DC_STI_ATTESTATION` (for example `B`), use the level your carrier assigned to the number: A, B or C. Never send a higher level than your carrier gave you. The request carries no `phone_line_id`.

### Local presence

```bash
dotnet run -- local-presence
```

Local presence puts several numbers on one phone line. You send with the line and without `caller_id`, and the platform picks the number. It chooses the number on the line closest to the recipient, and falls back to a number on the line when it cannot place the recipient. You do not choose it, so this recipe never sends `caller_id`. Always identify your business location truthfully when asked by recipients.

The recipe:

1. Checks that a carrier is connected.
2. Finds the line named `DC_LINE_NAME` (default `Local presence`) or creates it. Set `DC_PHONE_LINE_ID` to use a line you already have.
3. Loads numbers you own from `DC_NUMBERS`, and polls every 2 seconds, up to 60, for the import to finish.
4. Searches the area codes in `DC_AREA_CODES`. It rents the first match for each code **only** when you set `DC_RENT=yes`. Renting charges your carrier, so without it you see a dry run.
5. Confirms the line has numbers, sends, and prints the number that was used.

### Text to speech

```bash
dotnet run -- tts
```

Speaks `DC_TTS_BODY` (1,200 characters or fewer, counted after merge fields are filled in) with `DC_VOICE_ID`, or your first ready voice. `DC_MODE=retail` (the default) sends from a phone line. `DC_MODE=byoc` sends from `DC_CALLER_ID`. Set `DC_PREVIEW=yes` to synthesize the text first so you can listen; that call is billed per character. This recipe ignores `DC_MEDIA_ID` and `DC_AUDIO_URL`.

### Upload audio

```bash
export DC_AUDIO_FILE=./appointment-reminder.mp3
dotnet run -- upload-media
```

Prints `media_id: ...`. Set `DC_MEDIA_ID` to it to send that file from now on. `DC_MEDIA_NAME` names the file in your media library (default: the file name). The key needs the `media:write` scope. The recipes upload `DC_AUDIO_FILE` the same way when you set it instead of `DC_MEDIA_ID`.

A file on this computer goes up in three calls, and `Lib/MediaUpload.cs` shows each one:

1. `POST /media/public/media` with `{"name": "...", "type": "rvm", "signed_upload": true}`. The answer has the `media_id` and, under `upload.mp3` and `upload.wav`, a signed `url` and the `content_type` to send with it.
2. `PUT` the file's bytes to the `url` for its format, with a `Content-Type` header of exactly that `content_type`, and nothing else. The URL is already signed, so it never gets your key or secret.
3. `POST /media/public/media/{media_id}/complete`. Until then the file cannot be sent.

Set `DC_AUDIO_FILE` to an `https://` address of a `.mp3` or `.wav` instead, and the file is imported in one call: `POST /media/public/media` with `{"name": "...", "type": "rvm", "url": "...", "ext": ".mp3"}`.

### Check your receiver

```bash
dotnet run -- check-receiver https://abc123.example.com/callbacks/dropcowboy https://abc123.example.com/webhooks/dropcowboy
```

Posts the sample callback in `../fixtures/callback.rvm-success.json` to the first URL, and a sample `contact.rvm.status` webhook to the second, signed with the first secret in `DC_WEBHOOK_SECRET` and a fresh timestamp. It calls your endpoints only, never the API, and needs no API key. Each answer gets one verdict:

| Verdict | Answer | Meaning |
|---|---|---|
| OK | `2xx` in time | Your endpoint accepted it. |
| route | `404` or `405` | The route or the verb is wrong. The endpoint must accept `POST` at exactly that path. |
| auth | `401` or `403` | The signature check is failing (webhook), or the path asks for authentication a callback never carries. |
| slow | no answer in 10 seconds (callback) or 5 seconds (webhook) | Answer `2xx` first, then do the work. |
| rejected | any other status | A callback is not retried, so that result is lost. A webhook is retried only after `408`, `429`, `5xx` or a timeout, at most 3 attempts in all. |
| unreachable | no connection | The server or tunnel is down, or the host is not public. |

It exits with code 1 when any check fails.

## What you should see

```text
Send only to people who agreed to hear from you. Test with numbers you own.
Webhook signing secrets: 1 loaded from the API (last one ends ...7c30).
Receiver listening on port 3000. Callback URL: https://abc123.example.com/callbacks/dropcowboy
Accepted (202). message_id=8e4a2c6f-9d1b-4f7e-b3a5-6c9e1f4d2b78 foreign_id=e9ae3258-dfd4-4af5-86e2-7b18fcfaa292
Accepted means the API took the request, not that anything reached the recipient. The status that follows says what happened to it.
Waiting up to 300 seconds for the result (Ctrl-C to stop)...
[callback] status=success reason="" reason_code=0 caller_id=+12125550100 phone_number=+13125550142 foreign_id=e9ae3258-dfd4-4af5-86e2-7b18fcfaa292
Result (from the callback):
  status:      success
  reason:      (none)
  reason_code: 0
  from:        +12125550100
  proof:       https://api-v2.dropcowboy.com/campaign/public/receipts/MmEX1fWLLQRmf68M1Yg82jkHN3-P7y8VyDxXhnyHA50
```

A `202` means the request was accepted and queued. It does not mean the voicemail reached anyone. The result arrives afterwards as a `status` and a `reason_code`; [Outcomes](https://www.dropcowboy.com/developers/api/outcomes) lists each one.

The recipes match a status webhook on the recipient number and a callback on your `foreign_id`. Both carry `foreign_id`, so your own code can match either on it. A receipt event reports a later stage and does not end the wait.

If no result arrives in time, the recipe says so and exits with code 0. The result can still arrive later, at a receiver you keep running or on your webhook.

For reason codes `3001`, `3014` and `3040` the summary adds a `What to do:` line.

## Where are my results?

`POST /rvm` answers `202` when it queues the send. That is all a `202` means: the outcome comes later, three ways.

- **Your `callback_url`.** Unsigned, one attempt, 10 second timeout.
- **A signed webhook** for `contact.rvm.status`, if you subscribed. Answer `2xx` within 5 seconds.
- **Settings > API Logs** in the dashboard, which shows the outcome and what your endpoint answered.

If your endpoint answers anything but `2xx`, the result does not reach your code. A `404` or `405` is never retried, and neither is a callback. Check API Logs for what your endpoint answered, then run `dotnet run -- check-receiver` against the same URLs until every check passes.

## Detection with Twilio

This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.

```bash
dotnet run -- detect-twilio
```

The recipe calls `DC_TO` from `TWILIO_FROM` with your own Twilio account. When the call is answered, Twilio sends a copy of the call audio to Detection with `<Start><Stream>`. Detection posts what it hears (a voicemail, the beep, a live person) to the receiver as signed webhooks, and the recipe updates the live call with Twilio's REST API. It plays your voicemail message on the beep, or your live message when a live person is detected, and nothing else: every other verdict is printed and ignored. It sends no ringless voicemail. Twilio is called over plain HTTPS with `HttpClient`, like the Drop Cowboy API: there is no Twilio SDK.

Want a complete ringless voicemail or voice broadcast routine? Use the Drop Cowboy [campaigns API](https://www.dropcowboy.com/developers/api/campaigns). Detection is for teams that already run their own dialing and want sharper, more dependable detection events to build on.

It acts at most once per call. In order:

1. Checks every setting before any request, and prints every problem it finds.
2. Uses `DC_DETECTION_KEY`, or creates a temporary Detection key with `DC_KEY` and `DC_SECRET` (that API key needs `balance:read` to list Detection keys and `account:write` to create and delete them). A temporary key expires in one hour, and the recipe deletes it at the end. It also deletes one left over by an earlier run.
3. Checks the Twilio account is active and not a trial, and that `TWILIO_FROM` is a number in it or a verified caller ID on it.
4. Starts the receiver and checks that `DC_PUBLIC_URL/health` reaches it through your tunnel.
5. Creates the call. Waits for Detection, then plays the message.
6. Prints a summary. Then it hangs up a call that is still up, deletes the temporary key and stops the receiver. It does this after an error and after Ctrl-C too.

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
| `DC_KEY`, `DC_SECRET` | One of | Used only without `DC_DETECTION_KEY`, to create a temporary key. Needs `balance:read` (to list Detection keys) and `account:write` (to create and delete them). |
| `DC_VM_AUDIO_URL` | One of | An `https://` MP3 or WAV that plays on the beep. |
| `DC_VM_TEXT` | One of | Text spoken on the beep when `DC_VM_AUDIO_URL` is unset. 1,000 characters or fewer. |
| `DC_LIVE_AUDIO_URL`, `DC_LIVE_TEXT` | No | The message for a live person, same rules. Unset, a live person hears the voicemail message. |
| `DC_RING_SECONDS` | No | 5 to 60, default 30. How long the phone rings. |
| `DC_WAIT_SECONDS` | No | 60 to 600, default 180. The whole run. `0` is refused, because this recipe has to listen. |
| `DC_DETECTION_URL` | No | Default `wss://detect.dropcowboy.com/carrier/ws/twilio`. |
| `TWILIO_BASE_URL` | No | Default `https://api.twilio.com`. Only change it to point at a mock server. |
| `PORT` | No | Receiver port, default 3000. |

The sample-value check covers `TWILIO_FROM` and every `DC_` setting here, and the all-zero Account SID from our fixtures is refused too. Their messages come after any other setting problems, in the same list.

### Run it with a tunnel

Twilio fetches the TwiML from your computer and Detection posts webhooks to it, so both need a tunnel, exactly as in [Expose the receiver](#expose-the-receiver). Detection accepts only `https://` on port 443.

1. Start your tunnel and point it at port `3000` (or the `PORT` you set).
2. Set `DC_PUBLIC_URL` to its `https://` address, with no trailing path.
3. Run `dotnet run -- detect-twilio`.

This receiver has its own routes, in `Receiver/DetectionReceiver.cs`:

| Route | Used for | Signed? |
|---|---|---|
| `GET /health` | The recipe's check that the tunnel reaches the receiver. | No |
| `POST /twilio/voice` | Twilio fetches the TwiML when the call is answered. | Yes, `X-Twilio-Signature` |
| `POST /twilio/status` | Twilio's call status callbacks. | Yes, `X-Twilio-Signature` |
| `POST /webhooks/detection` | Detection's webhooks. | Yes, `X-Signature`, with the Detection key |

The routes check the signature, record the event and answer at once. They never call Twilio: the recipe acts on what they recorded. The Twilio signature is checked against `DC_PUBLIC_URL` and the route, not the address the request arrived on, because your tunnel changes that address.

**The Detection key appears in the TwiML.** Twilio passes it to Detection as a stream parameter, so it shows in the Twilio Console request logs for the call. Anyone who can read those logs can read the key. Leave `DC_DETECTION_KEY` unset to have the recipe use a temporary key that lasts at most an hour, or delete the key when you are done testing.

### What you should see

```text
Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the Detection session.
call_id: 9b2d4f6a-8c1e-4a3b-9d5f-7e1a3c5b7d90
Temporary Detection key created: key_id=2d8f4b1e-7a3c-4e95-b6d2-9c1a5e8f3b47 (ends ...4f2a). It is deleted at the end of the run.
Twilio account ...7c31: Full, active.
TWILIO_FROM is a number in this Twilio account.
Receiver listening on port 3000.
The tunnel reaches this receiver.
Calling +13125550142 from +13125550147. CallSid: CA00000000000000000000000000000001
[twilio status] CallStatus=initiated
[twilio status] CallStatus=ringing
[twilio voice] call answered; sent the TwiML that starts Detection
[twilio status] CallStatus=in-progress
[detection webhook] event=detection
Verdict: speech.voicemail.greeting (confidence 0.91). No action.
[detection webhook] event=beep
Beep at 6420 ms (duration 380 ms). Playing the voicemail message.
Twilio accepted the update 212 ms after the beep was recorded.
[detection webhook] event=close
Already acted on this call (voicemail_on_beep), so no new action.
[twilio status] CallStatus=completed CallDuration=21
The call ended: CallStatus=completed.
Summary:
  outcome:            voicemail_on_beep
  last verdict:       speech.voicemail.greeting, confidence 0.91
  beep:               timestamp_ms=6420 duration_ms=380
  update latency:     212 ms
  CallStatus:         completed
  CallDuration:       21
  CallSid:            CA00000000000000000000000000000001
  call_id:            9b2d4f6a-8c1e-4a3b-9d5f-7e1a3c5b7d90
  Detection webhooks: 3 received, 0 ignored
Temporary Detection key deleted.
```

The outcome is one of:

| Outcome | Meaning |
|---|---|
| `voicemail_on_beep` | The beep arrived and the voicemail message played. |
| `live_person` | A live person verdict (`type` starting with `speech.human.`), at any confidence. The live message played. |
| `not_answered` | The call ended busy, unanswered, failed or canceled. |
| `ended_before_action` | The call ended before anything was played. |
| `no_result` | Nothing was played within `DC_WAIT_SECONDS`. The recipe hung up and printed what to check. |

Every outcome exits with code 0. A settings, preflight or request error exits with code 1, and so does a cleanup step that fails (hanging up, deleting the temporary key or stopping the receiver), even after a good outcome. Ctrl-C exits with 130, after the cleanup. A Twilio error prints its status, code, message and link, with a `What to do:` line for codes `21210`, `21212`, `21215`, `21219` and `20003`. If Detection never posts a webhook, check that the key is active and that your balance covers Detection, and look for stream errors in the Twilio Console debugger. A key that is refused closes the stream before any webhook is sent.

## Classic ASP.NET Web API 2

The receiver here is ASP.NET Core, and that is the one to copy for new work. If your app is classic ASP.NET Web API 2 on .NET Framework, use attribute routes so the paths are exactly what you register in `callback_url` and your webhook:

```csharp
// App_Start/WebApiConfig.cs, called from Global.asax with GlobalConfiguration.Configure(WebApiConfig.Register)
public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        config.MapHttpAttributeRoutes();  // before any MapHttpRoute
        config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new { id = RouteParameter.Optional });
    }
}
```

```csharp
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;   // System.Web.Http, not System.Web.Mvc

[RoutePrefix("dropcowboy")]
public class DropCowboyController : ApiController
{
    private const int ToleranceSeconds = 300;

    // POST https://abc123.example.com/dropcowboy/callback
    // No parameters, so nothing reads the body before you do.
    [HttpPost, Route("callback")]
    public async Task<IHttpActionResult> Callback()
    {
        byte[] raw = await Request.Content.ReadAsByteArrayAsync();
        await SaveForLaterAsync("callback", raw);  // your queue or table; unsigned, so treat it as a hint
        return Ok();
    }

    // POST https://abc123.example.com/dropcowboy/webhook
    [HttpPost, Route("webhook")]
    public async Task<IHttpActionResult> Webhook()
    {
        byte[] raw = await Request.Content.ReadAsByteArrayAsync();
        if (!SignatureIsValid(raw, Header("X-Signature"), Header("X-Timestamp"), SigningSecret()))
        {
            return Unauthorized();
        }

        await SaveForLaterAsync("webhook", raw);  // do the slow work elsewhere
        return Ok();
    }

    private string Header(string name)
    {
        return Request.Headers.TryGetValues(name, out var values) ? values.FirstOrDefault() : null;
    }

    // X-Signature is "sha256=" + hex HMAC-SHA256 of X-Timestamp + "." + the raw body.
    private static bool SignatureIsValid(byte[] raw, string signature, string timestamp, string secret)
    {
        if (string.IsNullOrEmpty(signature) || !long.TryParse(timestamp, out var signedAt)
            || Math.Abs(DateTimeOffset.UtcNow.ToUnixTimeSeconds() - signedAt) > ToleranceSeconds)
        {
            return false;
        }

        byte[] prefix = Encoding.UTF8.GetBytes(timestamp + ".");
        byte[] message = new byte[prefix.Length + raw.Length];
        Buffer.BlockCopy(prefix, 0, message, 0, prefix.Length);
        Buffer.BlockCopy(raw, 0, message, prefix.Length, raw.Length);
        using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret)))
        {
            string expected = "sha256=" + BitConverter.ToString(hmac.ComputeHash(message)).Replace("-", "").ToLowerInvariant();
            return ConstantTimeEquals(Encoding.ASCII.GetBytes(expected), Encoding.UTF8.GetBytes(signature));
        }
    }

    // .NET Framework has no CryptographicOperations.FixedTimeEquals.
    private static bool ConstantTimeEquals(byte[] a, byte[] b)
    {
        int diff = a.Length ^ b.Length;
        for (int i = 0; i < a.Length && i < b.Length; i++)
        {
            diff |= a[i] ^ b[i];
        }

        return diff == 0;
    }
}
```

`SaveForLaterAsync` and `SigningSecret` are yours: store the raw bytes for a background job, and load the secret from your configuration. What matters:

- **Read the raw bytes first.** `await Request.Content.ReadAsByteArrayAsync()` before anything parses the body. An action with a `[FromBody]` parameter has its body read by the formatter, so the bytes you read afterwards are empty or re-serialized, and no signature matches.
- **Compare in constant time**, as above, and check the timestamp is within 5 minutes.
- **Return `200` fast.** A webhook must answer within 5 seconds and a callback within 10. Queue the work and answer.
- **Test it**: `dotnet run -- check-receiver https://abc123.example.com/dropcowboy/callback https://abc123.example.com/dropcowboy/webhook`.

### "No action was found on the controller"

A `404` with `No action was found on the controller '...' that matches the request` means Web API found the controller but no action for `POST` at that path. Drop Cowboy does not retry a `404`, so every result is lost until it is fixed. Check, in order:

1. `config.MapHttpAttributeRoutes()` is called, before any `MapHttpRoute`, and `WebApiConfig.Register` runs at start-up. Without it, `[Route]` attributes are ignored and the request falls through to the `api/{controller}/{id}` convention.
2. The action has `[HttpPost]` from `System.Web.Http`. The one from `System.Web.Mvc` looks the same and does nothing for an `ApiController`.
3. The action is `public`, and the path in `callback_url` or the webhook is exactly the `RoutePrefix` plus the `Route`, including any virtual directory your site runs under.
4. The action takes no parameter that cannot be bound. Read the body yourself, as above.

Then run `check-receiver` against the same URLs until both checks pass.

When something goes wrong, the recipe prints the HTTP status, the error title, detail and code, and the request id, then exits with code 1. It never prints your headers. Quote the request id if you contact support. Exit code 130 means you pressed Ctrl-C during a send.

## Troubleshooting

| You see | Likely cause | What to do |
|---|---|---|
| `DC_KEY is required` | The environment variables are not set in this shell. | Export `DC_KEY` and `DC_SECRET` (see [Set up](#set-up)). |
| Status `401` | The key or secret is wrong, was deleted or has expired. | Check `DC_KEY` and `DC_SECRET` for stray spaces. Create a new key if needed. |
| Status `403` | The key lacks a scope, or your plan does not include the feature. | Read `detail` for the scope, and use a key that has it. `subscribe` needs `webhooks:write`. |
| Status `429` | Too many requests. | Reads retry by themselves. Wait, and spread sends out. |
| `No phone line to send from` (reason code `4010`) | You have no default phone line and set no `DC_PHONE_LINE_ID`. | Set `DC_PHONE_LINE_ID`, or make one line the default in the dashboard. |
| `this is a sample value from our docs; use your own` | A setting holds an id, number or host copied from our docs. It exists on no account. | Use your own value. Every command checks this before any request. |
| Result with reason code `3014` | Not allowed `audio_url`: audio_url is an option for BYOC plans only and must be enabled by support. | Contact support to enable it, or upload the file and send `media_id`, or use text to speech. |
| Result with reason code `3040` | Test Numbers Only: the account can send only to its test numbers right now, and this number is not one of them. | Send to one of your test numbers, or ask support to end testing mode. |
| Result with reason code `3001` | The audio is not usable: the `media_id` is not yours, or the `audio_url` could not be fetched or is not MP3 or WAV. | Upload the file with `upload-media` and send the `media_id` it prints. |
| `The upload URL refused the file (403)` | See [403 on upload](#403-on-upload). | |
| `404` with `No action was found on the controller` | A classic ASP.NET Web API 2 route problem. | See ["No action was found on the controller"](#no-action-was-found-on-the-controller). |
| Result with reason code `3000` | Your balance is empty. | Add funds or turn on auto-recharge, then send again. |
| Result with reason code `3002` or `3015` | A voice and the text do not go together. | Send `tts_body` and `voice_id` together. The recipes do this for you. |
| Result with reason code `3016` | Your send has a `byoc` object, but bring your own carrier is not on for your account. | Remove `DC_STI_ORIG_ID` and `DC_STI_ATTESTATION`, or ask support to enable it. |
| Result with reason code `3017` or `3018` | `DC_STI_ORIG_ID` is not a UUID, or the attestation is not `A`, `B` or `C`. | Fix the setting. |
| Result with reason code `3021` | The text is over 1,200 characters once merge fields are filled in. | Shorten it. |
| Result with reason code `3022` | Trial accounts can only send to numbers verified on the account. | Send to a verified number, or choose a plan. |
| Result with reason code `3027` | The `Idempotency-Key` was used before with a different body. | Use a new key for each new send. The recipes do. |
| Result with reason code `4002` | The mailbox is full. Retrying will not help. | Reach the person another way they agreed to. |
| Result with reason code `4013` | The number reached your contact frequency limit. | Send again after the window, or change the limit. |
| Result with reason code `4016` or `4017` | The number is on your do-not-contact list, or on a known TCPA litigator list. | Do not send to it. Only a new, documented opt-in from the person allows sending again. |
| `No carrier is connected to this account` | Bring your own carrier is not set up. | Follow [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier). |
| `The phone line has no numbers` | The line is empty, so it cannot send. | Set `DC_NUMBERS`, or `DC_AREA_CODES` with `DC_RENT=yes`. |
| `The number import failed` | The import job finished with an error. | Read the message. Numbers held by another account show as conflicts. |
| `DC_PUBLIC_URL is not set` | The send has no `callback_url`. | Set it to your tunnel address, or follow the result in the dashboard. |
| `Could not listen on port 3000` | Something else uses the port. | Set `PORT` to a free port and point your tunnel at it. |
| Webhook answers `401 invalid_signature` | The signing secret differs, or the body was changed before it was checked. | Restart the receiver so it loads your current secrets (`subscribe --list` shows your webhooks), or set `DC_WEBHOOK_SECRET`. Verify the raw body (see below). |
| Webhook answers `401 stale_timestamp` | Your computer's clock is more than 5 minutes off. | Sync the clock. |
| Webhook answers `503` | The receiver has no signing secret. | Run `subscribe`, then restart the receiver. |
| `No result has arrived yet` | The result can take longer, or it could not reach you. | Check Settings > API Logs for what your endpoint answered, and run `check-receiver`. See [Where are my results?](#where-are-my-results). |
| `Twilio trial accounts play a notice...` | `detect-twilio` with a trial Twilio account. | Upgrade the Twilio account. Trial accounts are not supported. |
| `TWILIO_FROM is not a number in this Twilio account...` | The caller ID is neither a number on the account nor a verified caller ID. | Use one of the account's numbers, or verify the number in the Twilio Console. |
| `The tunnel does not reach this receiver` | The tunnel is down, points at another port, or `DC_PUBLIC_URL` is not its address. | Start the tunnel, point it at `PORT`, and set `DC_PUBLIC_URL` to its `https://` address. |
| `No Detection result arrived` | The Detection key was refused, the balance does not cover Detection, or the stream failed. | Check the key and your balance, and the Twilio Console debugger for stream errors. |

The full list of codes is in [Outcomes](https://www.dropcowboy.com/developers/api/outcomes).

### 403 on upload

The `PUT` to the signed upload URL answered `403`. Usually one of two things:

- **The `Content-Type` does not match.** Send exactly the `content_type` returned next to the URL (for example `audio/mpeg` for `upload.mp3`), with no charset and no other value. Some HTTP clients add one by default: set the header on the content yourself, as `Lib/MediaUpload.cs` does.
- **The URL expired.** Upload URLs last 2 days. Run `upload-media` again for fresh ones.

Or skip the upload: set `DC_AUDIO_FILE` to an `https://` address of the file and it is imported by URL instead.

## Production notes

- **Verify the raw bytes.** The signature is over the exact body you received. `ReceiverRoutes` reads the request body into bytes and verifies before it parses anything. Parsing the JSON and serializing it again changes the bytes, and then no signature matches. `Lib/SignatureVerifier.cs` shows the check, including the 5 minute timestamp window and a constant-time compare with `CryptographicOperations.FixedTimeEquals`.
- **Deduplicate.** The same `event_id` can arrive more than once. The receiver here keeps ids in memory so the example is short. In production, put a unique index on `event_id` in your database and answer 2xx for a duplicate.
- **Answer fast, work elsewhere.** Return `2xx` within 5 seconds, as soon as the signature checks out and the event is stored. Do the slow work from a job runner or a message broker. A slow answer is retried, and a duplicate follows.
- **Treat the callback as a hint.** `callback_url` carries no signature. Read only the fields you need. For anything that moves money or changes records, confirm with a signed webhook or by reading the API.
- **Keep secrets in a vault.** Do not commit `.env.local`. Load `DC_SECRET` and signing secrets from your secrets manager, and never print them. The recipes print only the last four characters.
- **Several webhooks are fine.** Each webhook has its own signing secret and is delivered separately, so the receiver accepts a delivery signed with any secret it holds. Creating a webhook never replaces another one. Rotate a secret explicitly with `dotnet run -- subscribe --rotate WEBHOOK_ID`. The old secret stops working at once and every delivery after that, retries included, is signed with the new one, so add the new secret to the receiver right away. Keeping the old one there for a minute covers a delivery that was already on its way.
- **Reuse the `Idempotency-Key` to retry a send.** The client never retries a `POST` by itself. If a send times out, repeat it with the same key and body and the API sends it once. A new send needs a new key. Only `POST /rvm` takes the header; the other routes, including phone line creation, do not.
- **Send only with consent.** Keep a record of who agreed to hear from you, and honor opt-outs.

## Files

```text
DropCowboy.Examples.sln
src/DropCowboy.Examples/
  Lib/
    DcClient.cs          HTTP client: headers, timeout, safe retries, errors
    DcError.cs           an API error: status, title, detail, code, request id
    SignatureVerifier.cs webhook signature check
    Config.cs            reads and validates settings
    AudioSource.cs       which audio field goes on the request
    MediaUpload.cs       signed upload and URL import of an audio file
    SampleValues.cs      refuses ids, numbers and hosts copied from our docs
    Hints.cs             what to do for reason codes 3001, 3014, 3040, and a 403 on upload
    ReceivedEvents.cs    shapes a callback or webhook into one result
    Json.cs, Redact.cs   JSON helpers, safe printing
    TwilioClient.cs      Twilio REST calls over HttpClient, Twilio errors and their hints
    TwilioSignature.cs   X-Twilio-Signature check
    DetectionSignature.cs Detection webhook signature check
    Twiml.cs             the TwiML that starts Detection, and the one that plays the message
    CallEvents.cs        what the detect-twilio receiver recorded, safe across threads
  Receiver/
    ReceiverApp.cs       builds and starts the web server
    ReceiverRoutes.cs    callback and webhook routes
    ReceiverSession.cs   loads signing secrets, starts and stops the receiver
    DetectionReceiver.cs the detect-twilio routes: health, TwiML, Twilio status, Detection webhooks
  Recipes/
    SendRvmRetail.cs, SendRvmByoc.cs, SendRvmByocLocalPresence.cs, SendRvmTts.cs
    RecipeSteps.cs       phone line, media file and voice lookups
    Delivery.cs          receiver, send, wait, summary
    DetectTwilio.cs      detect-twilio: key, preflight, call, decisions, cleanup
    DetectTwilioSettings.cs reads and validates the detect-twilio settings
  Subscribe.cs           create, list, update, rotate and delete webhooks
  UploadMedia.cs         upload-media command
  CheckReceiver.cs       check-receiver command
  Cli.cs, Program.cs     command line entry and error printing
tests/DropCowboy.Examples.Tests/   xUnit tests with a mock API
```

## Tests

```bash
dotnet test
```

The tests start a mock API and the receiver on ephemeral ports. They check the order of requests and the exact body of each send for each audio source, the upload calls and the exact upload `Content-Type`, that sample values are refused before any request, each `check-receiver` verdict, that forbidden fields are absent, the webhook signature vectors in `../fixtures/signature-vectors.json`, and that no secret is ever printed. They make no real requests and rent nothing.

For `detect-twilio`, a mock Twilio API stands in for Twilio, and the tests play Twilio and Detection against the receiver with signed requests built from the fixtures. They check both signature vectors (`../fixtures/twilio-signature-vectors.json` and `../fixtures/detection-signature-vectors.json`), the exact TwiML and call form, every decision rule, that only one update reaches a call, and that the call is hung up and the temporary key deleted after success, an error or Ctrl-C. They place no call.
