# Detection on Twilio Functions

Send only to people who agreed to hear from you. Test with numbers you own.
This places a real phone call. Twilio bills the call and Drop Cowboy bills the
Detection session.

Two [Twilio Functions](https://www.twilio.com/docs/serverless/functions-assets/functions)
that show how to receive [Detection](https://www.dropcowboy.com/developers/api/detection)
events and respond to them. Deploy them to your Twilio account, then put your own
logic in one file.

| Function | Public? | What it does |
|---|---|---|
| `detection-voice` | Protected | Runs when a call is answered. Returns TwiML that sends a copy of the call's audio to Detection. |
| `detection-webhook` | Public, with a token | Receives every Detection event and runs your `onEvent` function. |

This is a demonstration of receiving an event and responding to it. It is not a
delivery pipeline. What a verdict means, how often to act, what to do about
retries and how to keep a campaign robust are yours to build.

## What happens on a call

1. A call is answered and Twilio runs `detection-voice`.
2. It returns `<Start><Stream>` pointing at Detection, with your
   `detection-webhook` address, and keeps the call open in `<Pause>`.
3. Detection posts each event to `detection-webhook`: `detection`, `beep`,
   `screening`, `timeout`, `error` and `close`.
4. `onEvent` runs for each one. As written it does one thing: on `beep` it updates
   the live call to stop the stream, play your message and hang up.

## What you need

- **A Twilio account that is not a trial.** A trial account plays a notice before
  your TwiML runs, and Detection would hear it.
- **The [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) with the
  serverless plugin**, signed in to that account:
  `twilio plugins:install @twilio-labs/plugin-serverless`.
- **Node.js 20 or later.**
- **A Detection key.** Detection needs a verified account with Building Blocks
  enabled. Create the key in the dashboard.
- **Your message.** A public `https://` MP3 or WAV, or text Twilio speaks.

## Deploy

```
npm install
cp .env.example .env
```

Edit `.env`. Set `DC_DETECTION_KEY`, `DC_DETECTION_WEBHOOK_TOKEN` (make one with
`openssl rand -hex 32`) and your message (`DC_VM_AUDIO_URL` or `DC_VM_TEXT`).
Then:

```
twilio serverless:deploy
```

The CLI prints the Service's domain, such as `detection-1234-dev.twil.io`.

To try it without deploying, run `twilio serverless:start --ngrok` instead. The
Functions then run on your machine behind a public tunnel. Detection calls only
`https://` addresses on port 443, so `localhost` does not work.

## Place a call

Call a phone you own, with TwiML from `detection-voice`:

```
twilio api:core:calls:create \
  --from "+13125550199" --to "+13125550142" \
  --url "https://detection-1234-dev.twil.io/detection-voice"
```

Use your own Twilio number as `--from`. To use it on inbound calls, or on calls
your app places, set the number's voice webhook, or the `Url` of the call you
create, to that same address. `detection-voice` is protected, so only Twilio can
run it. A browser gets a 403.

Let the call go to voicemail and watch the Function logs:

```
twilio serverless:logs --tail
```

## Put your logic in

Open `functions/detection-webhook.js`. The top of the file is yours:

```javascript
async function onEvent({ result, message, client }) {
    console.log('Detection ' + result.event + ' for call ' + result.callSid);

    if (result.event === 'beep') {
        await leaveMessage({ client, callSid: result.callSid, message });
    }
}
```

`onEvent` runs once for every delivery. `result` carries `event`, `data` (the
event's own fields, such as `type` and `confidence` on a `detection` event),
`callSid`, `deliveryId` and the whole `body`. `client` is the Twilio client and
`context` holds your environment variables. The events are described in the
[Detection docs](https://www.dropcowboy.com/developers/api/detection).

The rest of the file only authenticates the request and answers Detection.

## Things to know

**The webhook is public, and a token keeps others out.** A Twilio Function is
either protected, so only Twilio can call it, or public. Detection is not Twilio,
so `detection-webhook` must be public, and Detection signs its requests in a way
a Function cannot check. The signature covers the raw request body, and Twilio
parses the body before your code sees it, so the original bytes are gone.
Instead, `detection-voice` puts `DC_DETECTION_WEBHOOK_TOKEN` in the webhook
address it gives Detection, and `detection-webhook` accepts only requests that
carry it, compared in constant time. It also refuses an event for a different
Twilio account. Keep the token secret, make it long, and change it (in `.env`,
then deploy again) if it leaks. To check Detection's `X-Signature`, run your own
receiver as described in the Detection docs.

**The token and the Detection key show in Twilio's logs.** Both are in the TwiML
that `detection-voice` returns, so Twilio's Console keeps them in its request
logs. Use a Detection key made for this and revoke it when you stop. These
Functions never log either value.

**Detection retries a delivery.** A delivery that times out or answers with an
error is sent again with the same `deliveryId`. This example does nothing about
that. Decide what repeating an event means for your logic.

**A Function answers within Twilio's 10 seconds**, and it stops the moment it
answers, so `await` everything you start in `onEvent`.

## Settings

| Variable | Needed by | Meaning |
|---|---|---|
| `DC_DETECTION_KEY` | voice | Your Detection key. |
| `DC_DETECTION_WEBHOOK_TOKEN` | both | Shared secret, 24 or more characters. |
| `DC_VM_AUDIO_URL` or `DC_VM_TEXT` | webhook | Played on the beep. One is required. Audio wins. |

A wrong or missing setting does not fail silently. `detection-voice` hangs up the
call and writes the reason to the Function logs, and `detection-webhook` answers
500 with the same reason in the logs.

## Test

```
npm test
```

The tests load both Functions the way Twilio does and replace the Twilio client
with a fake, so they spend nothing and place no call.

## Compliance

Send only to people who agreed to hear from you, and keep a record of that
agreement. While you build, call numbers you own. Calling hours still apply.

While Drop Cowboy provides tools to support compliance efforts, customers remain solely responsible for obtaining proper consent, maintaining opt-out lists, and complying with all federal and state telemarketing regulations. Consult with your legal counsel to ensure your specific use case and consent mechanisms comply with applicable laws.

This information is for educational purposes only and does not constitute legal advice. Regulations vary by jurisdiction and use case. Always consult with qualified legal counsel to ensure your specific practices comply with applicable federal and state laws.
