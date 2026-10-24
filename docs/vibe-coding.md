# Build with an AI assistant

You can have an AI coding assistant write your Drop Cowboy code. This page
shows how to connect it, and gives you prompts to paste.

Two things make the results much better:

1. **Connect the assistant to Drop Cowboy's MCP server.** MCP is a standard
   way for an AI tool to use another service. Connected, the assistant can
   look up the exact API route, list your phone lines and audio files, and
   read your API logs, instead of guessing.
2. **Give it [`AGENTS.md`](../AGENTS.md).** It's a short page of facts the
   assistant needs, such as "a `202` doesn't mean sent" and "there is no npm
   package to install".

## Connect the MCP server

The server is `https://mcp.dropcowboy.com/mcp`. In the dashboard, open
[**Connect AI**](https://www.dropcowboy.com/app/#/connect-ai-tools) and pick
your tool; it shows the exact setup. In short:

| Tool | How it connects |
|---|---|
| Cursor | Connect AI creates an API key for you and shows a block to merge into `~/.cursor/mcp.json`. |
| Windsurf | The same, merged into `~/.codeium/windsurf/mcp_config.json`. Windsurf needs `serverUrl`, not `url`. |
| VS Code / GitHub Copilot | Add an HTTP MCP server with the address above and no headers. VS Code asks you to sign in. |
| Claude (web, Desktop and Cowork) | **Customize > Connectors > Add custom connector**. Paste the address, leave OAuth Client ID and Client Secret empty, and sign in. |
| Claude Code | `claude mcp add --transport http dropcowboy https://mcp.dropcowboy.com/mcp`, then `/mcp` and sign in. |
| ChatGPT | Not available yet. Paste `AGENTS.md` into the chat instead. |
| Lovable | Not on the Connect AI page yet. Paste `AGENTS.md` into the chat. Store your key as a Lovable secret and call Drop Cowboy only from a backend function, never from the page. |

The Cursor block looks like this, with your own key in place of the
placeholders:

```json
{
  "mcpServers": {
    "dropcowboy": {
      "url": "https://mcp.dropcowboy.com/mcp",
      "headers": { "X-Key": "YOUR_API_KEY", "X-Secret": "YOUR_API_SECRET" }
    }
  }
}
```

Keep that file out of git.

**The MCP tools act on your real account.** If you ask the assistant to send a
voicemail, it sends one, and it is billed. Ask it to write code, or to call
and text only free 555 test numbers, such as `+15555550002`; see
[Test numbers](concepts/test-numbers.md).

## Prompts

Paste a prompt as it is. Change the parts in capitals.

### 1. Send a ringless voicemail

```text
Read AGENTS.md from https://github.com/Drop-Cowboy/dropcowboy first.

Write a small Node.js 20 script, send.js, with no dependencies, that sends one
ringless voicemail with the Drop Cowboy API.

- Read DC_KEY, DC_SECRET, DC_TO, DC_PHONE_LINE_ID and DC_MEDIA_ID from
  environment variables. Never hard-code them.
- Read the API address from DC_API_BASE, defaulting to
  https://api-v2.dropcowboy.com, so the script can be tested against a mock.
- POST {DC_API_BASE}/rvm with the x-key and x-secret headers,
  an Idempotency-Key header set to a new random UUID, and a JSON body with
  to, phone_line_id, media_id and a foreign_id that is another random UUID.
- If CALLBACK_URL is set, add it as callback_url.
- Print the HTTP status and the message_id. Explain in the output that 202
  only means queued, and that the result arrives later with a reason_code.
- Give up on a request after 30 seconds. Retry once, after 2 seconds, on a
  timeout, a dropped connection, a 500 or a 502, with the same
  Idempotency-Key and body. Never retry anything else.
- Print the foreign_id too, and explain that results are matched on it:
  callback_url and the contact.rvm.status webhook both echo it back, but
  message_id never comes back.
```

### 2. Receive results with a signed webhook

```text
Read AGENTS.md from https://github.com/Drop-Cowboy/dropcowboy first.

Write a small Node.js 20 HTTP server, receiver.js, with no dependencies, that
receives Drop Cowboy webhooks at POST /webhooks/dropcowboy.

- Read the raw request body as bytes before parsing anything.
- Verify X-Signature: it is "sha256=" plus the hex HMAC-SHA256 of
  X-Timestamp + "." + the raw body, keyed with the signing secret in the
  DC_WEBHOOK_SECRET environment variable. Compare in constant time. Reject a
  missing header, a bad signature, or a timestamp more than 300 seconds from
  now, with 401.
- Accept a comma-separated list of secrets in DC_WEBHOOK_SECRET, so a secret
  can be rotated.
- Answer 200 within 5 seconds, then log event, data.reason_code and
  data.status. Skip an event_id you have already seen.
- Answer 404 for any other path, and 405 for any other method on that path.
- Add a test that checks the verifier against the vectors in
  examples/api/fixtures/signature-vectors.json from that repository.
```

### 3. Send to a whole list with a campaign

```text
Read AGENTS.md from https://github.com/Drop-Cowboy/dropcowboy first, and use
the Drop Cowboy MCP server to look up each route before you use it.

Write a Node.js 20 script, campaign.js, with no dependencies, that:

1. Creates a ringless voicemail campaign with POST /campaign/public/campaigns,
   type "rvm", and campaign_data with name (DC_CAMPAIGN_NAME), list_ids (an
   array holding DC_LIST_ID), phone_line_id (DC_PHONE_LINE_ID), brand_id
   (DC_BRAND_ID) and media_id (DC_MEDIA_ID), all from environment variables.
   Leave out method; the campaign then waits for step 3 to start it.
2. Prints campaign_id and approved from the response. If approved is false,
   stops and explains that the campaign is waiting for compliance review.
3. Otherwise starts it with POST /campaign/public/campaigns/{id}/start and
   prints whether it started.
4. Polls GET /campaign/public/campaigns/{id}/stats?bucket_type=5min every 30
   seconds for 5 minutes and prints the counts.

Use the x-key and x-secret headers from DC_KEY and DC_SECRET, and read the API
address from DC_API_BASE, defaulting to https://api-v2.dropcowboy.com. Do not
send anything else.
```

### 4. Build a CRM with calling and texting

Don't start from nothing: the
[Starter CRM](https://github.com/Drop-Cowboy/starter-crm) already has contacts,
calling, texting, a pipeline and a shared inbox, and its rules for assistants.
Make your own copy with **Use this template**, open it in your assistant, and
paste:

```text
Read AGENTS.md and README.md. Help me run this Starter CRM on my computer,
then add a contact with the number +1 555 555 0002 and show me how to call
and text it. Never ask me to paste my API key or secret into this chat:
tell me to run npm run setup and paste them there.
```

The Starter CRM's
[Build with AI](https://github.com/Drop-Cowboy/starter-crm/blob/main/docs/build-with-ai.md)
guide has the next prompts: rebrand it, add your own screens, react to
webhooks and put it online.

### Using Lovable, Bolt or ChatGPT

- **ChatGPT** can't connect to the MCP server yet. Paste `AGENTS.md`, then the
  prompt, and copy the answer into your project yourself.
- **Lovable** runs your app on its own backend. Paste `AGENTS.md`, then the
  prompt, and tell it the Drop Cowboy calls must run in an edge function, with
  the key and secret stored as Lovable secrets. The page must never see them.
- **Bolt** and similar tools can open a GitHub repository and deploy it to
  Netlify. Open your copy of the Starter CRM and follow its
  [Netlify guide](https://github.com/Drop-Cowboy/starter-crm/blob/main/HOSTING.md#netlify).

Whatever the tool, browser code must never see your key or secret.

## Check what it wrote

- Test it before you point it at your account. Ask the assistant for a test
  that starts the mock API in `examples/api/quickstart/testkit/mock-api.js`,
  sets `DC_API_BASE` to it, and checks the request your code sent.
  `examples/api/quickstart/test` shows how. The mock answers `/rvm`, phone
  lines, voices and media; add your own answer for other routes.
- Read the result in [**Settings > API Logs**](https://www.dropcowboy.com/app/#/api-logs),
  or ask the assistant to search your API logs through MCP.
- If something fails, [Troubleshooting](troubleshooting.md) starts from the
  symptom.
