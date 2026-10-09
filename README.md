# Drop Cowboy

**The Communication Platform Built Around Ringless Voicemail.**

Drop Cowboy gives you everything you need to build voicemail, texting, calling,
email and AI voice agents into your own app or SaaS product: the API, working
code in three languages, a sample CRM you can copy, and tools that let AI
coding assistants build with it for you.

A ringless voicemail delivers your recorded message directly to the contact's
voicemail box.

## Send your first voicemail

You need Node.js 20 or newer and about five minutes. The script has no
packages to install.

1. Log in to Drop Cowboy and open
   [**Developers > API Keys**](https://www.dropcowboy.com/app/#/api-keys).
   Create a key and copy both parts. You only see the secret once.
2. Open [**Dialing rules**](https://www.dropcowboy.com/app/#/dialing-rules)
   and add your own cell number as a test number.
3. Download the code and make your settings file:

   ```bash
   git clone https://github.com/Drop-Cowboy/dropcowboy.git
   cd dropcowboy/examples/api/quickstart
   cp .env.example .env
   ```

4. Open `.env` and fill in `DC_KEY`, `DC_SECRET`, `DC_TO` (your number, like
   `+15555550123`) and `DC_AUDIO_FILE` (the path to an `.mp3` or `.wav` on
   your computer).
5. Run it:

   ```bash
   node quickstart.js
   ```

You'll see something like this:

```text
Queued (202): message_id=2b8f5d1a-7c3e-4a9b-9f6d-4e2a8c1b7d53 foreign_id=7c1e9a4b-3d2f-4e8a-b6c5-1f9d8e7a2b30
202 only means the request was queued. It is checked next, and the result arrives as a status and a reason_code.
Check Settings > API Logs, which shows the outcome and what your endpoint answered.
```

A `202` means "got it, it's in line." It doesn't mean the voicemail was left.
The real result arrives a little later, with a `reason_code` that says what
happened. Find it in
[**Settings > API Logs**](https://www.dropcowboy.com/app/#/api-logs).

To have the result sent back to your computer instead, give the quickstart a
public web address in `DC_PUBLIC_URL`. A free tunnel tool such as ngrok or
cloudflared gives you one, and the quickstart
[README](examples/api/quickstart/README.md#expose-the-receiver) shows how.
Then the script waits and prints the result:

```text
Waiting up to 300 seconds for the result...
Result from the callback:
  status: success
  reason_code: 0 (Success: the voicemail was left in the mailbox. The carrier decides when it shows up.)
```

Stuck? [`docs/troubleshooting.md`](docs/troubleshooting.md) starts from what
you see and tells you what to change.

## Send your first text

US phone companies ask businesses to register before they send texts. Open the
[**Trust Center**](https://www.dropcowboy.com/app/#/trust-center) in the
dashboard, register your business, then register what you'll be texting people
about. Wait for both to be approved.

Then send one with any tool that makes web requests. `phone_line_id` picks
which of your numbers sends it (list them with `GET /phone/public/lines`), and
a new `Idempotency-Key` on each send makes a retry safe:

```bash
curl -X POST https://api-v2.dropcowboy.com/sms \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+15555550123",
    "phone_line_id": "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28",
    "body": "Hi from my app. Reply STOP to opt out.",
    "callback_url": "https://your-app.example.com/dropcowboy/result"
  }'
```

It answers `202`, like the voicemail. The result goes to your `callback_url`,
to any webhook that listens for `contact.sms.status`, and to API Logs.
[Texts](https://www.dropcowboy.com/developers/api/texts) covers picture
messages and RCS, the richer kind of text with images and buttons.

## What's in this repo

| Folder | What it is |
|---|---|
| [`examples/api/quickstart`](examples/api/quickstart) | The one-file script above. |
| [`examples/api`](examples/api) | The same examples in [Node.js](examples/api/node), [Python](examples/api/python) and [C#](examples/api/csharp): send a voicemail, receive the result, manage webhooks. Each has tests that run without an account. |
| [`examples/sample-crm`](examples/sample-crm) | A working CRM with calling, texting and contacts, built on Drop Cowboy. Copy it as the start of your own product. |
| [`docs`](docs) | Short explanations, fixes for common problems, and prompts for AI coding assistants. |
| [`skills`](skills) | Instructions an AI assistant reads to add one Building Block to your app. |
| [`legacy`](legacy) | The old v1 API. |

## What you can build

Every piece is one API with one key. Each link goes to its section of the
[developer hub](https://www.dropcowboy.com/developers).

- [Ringless voicemail](https://www.dropcowboy.com/developers/api/ringless-voicemail), with [proof of delivery](https://www.dropcowboy.com/developers/api/proof-of-delivery)
- [Texts, picture messages and RCS](https://www.dropcowboy.com/developers/api/texts)
- [Voice calls and voice broadcasts](https://www.dropcowboy.com/developers/api/voice-calls)
- [Email](https://www.dropcowboy.com/developers/api/email)
- [Bulk sends](https://www.dropcowboy.com/developers/api/campaigns) that go to a whole contact list
- [AI voice agents](https://www.dropcowboy.com/developers/api/agents) and an [AI receptionist](https://www.dropcowboy.com/developers/api/agents/ai-receptionist) that answers your number
- [Voicemail detection](https://www.dropcowboy.com/developers/api/detection): know if a person or a voicemail greeting picked up
- [Text to speech and voice cloning](https://www.dropcowboy.com/developers/api/voice)
- [Contacts, lists, consent and do-not-contact](https://www.dropcowboy.com/developers/api/contacts)
- [Two-way conversations](https://www.dropcowboy.com/developers/api/conversations)
- [Webhooks](https://www.dropcowboy.com/developers/api/webhooks) that tell your app what happened
- [Building Blocks](https://www.dropcowboy.com/developers/building-blocks): a dialer, messenger and receptionist you drop into your own app
- [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier): send through your own phone company and numbers

No code? [Automation](https://www.dropcowboy.com/automation) is built into
every Drop Cowboy account. It connects Drop Cowboy to 700+ other apps, like
HubSpot, Salesforce, Shopify, Calendly and Google Sheets. Open
[**Automation**](https://www.dropcowboy.com/app/#/automation) in the
dashboard's left menu to build a workflow.

## Build it with an AI assistant

Cursor, Claude and VS Code can connect straight to Drop Cowboy through its MCP
server at `https://mcp.dropcowboy.com/mcp`. In the dashboard, open
[**Connect AI**](https://www.dropcowboy.com/app/#/connect-ai-tools) and pick
your tool. It shows the exact setup to paste.

[`docs/vibe-coding.md`](docs/vibe-coding.md) has prompts you can copy into
Cursor, Claude, ChatGPT or Lovable to build a send, a webhook receiver and a
campaign. Coding agents read [`AGENTS.md`](AGENTS.md) for the facts they need.

## Reference and tools

- [Developer hub](https://www.dropcowboy.com/developers): every guide
- [API docs](https://www.dropcowboy.com/developers/api) and the [quickstart guide](https://www.dropcowboy.com/developers/api/quickstart)
- [Every route on one page](https://www.dropcowboy.com/developers/api/quick-reference)
- [OpenAPI spec](https://api-v2.dropcowboy.com/openapi.yaml), to generate a client in any language
- Postman: [Run in Postman](https://god.gw.postman.com/run-collection/5049225-40ae327c-2fd5-475d-a52c-fa9142609784?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D5049225-40ae327c-2fd5-475d-a52c-fa9142609784%26entityType%3Dcollection%26workspaceId%3D256b3e95-7b67-4783-9632-d59ca0a02803), [read it on the web](https://documenter.getpostman.com/view/5049225/2sBYHPz21C), or [download the collection and environment](https://www.dropcowboy.com/developers/api/postman-and-openapi)
- [Result codes](https://www.dropcowboy.com/developers/api/outcomes) and [troubleshooting](https://www.dropcowboy.com/developers/api/troubleshooting)
- [Errors and limits](https://www.dropcowboy.com/developers/api/errors-and-limits)
- [Changelog](https://www.dropcowboy.com/developers/changelog)
- [System status](https://status.dropcowboy.com)
- Help: support@dropcowboy.com

## Three rules

1. Only send to people who agreed to hear from you.
2. Keep your API secret on your server. Never put it in a web page or a phone app.
3. Test with your own number first.

## Using the old v1 API?

If your code calls `api.dropcowboy.com/v1` or uses the `dropcowboy` npm
package, it keeps working. [`legacy/`](legacy) shows how to move to the
current API.

## License

[MIT](LICENSE).
