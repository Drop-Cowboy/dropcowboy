# Simple CRM: LLM Build Skill

## When to use this skill

Use it when the user wants a contacts CRM, or a CRM-style app, that calls and
texts its contacts through Drop Cowboy: a contact list, contact pages, a
pipeline, an inbox, with calling and texting on every page.

The result has three layers, and you should use all three rather than
rebuilding any of them:

- the **headless Contacts API** for the user's own list, search and edit
  screens, called from the browser with a short-lived `contacts` site token,
- **The Dock** (`DropCowboy.dock`) for calling, texting and the inbox on every
  page, and
- **page widgets** (`<dc-contact-card>`, `<dc-pipeline-board>`,
  `<dc-shared-inbox>`, the campaign hub, the phone hub) for screens the user
  does not want to build.

**Do not use it** for a single widget on an existing page; use that block's
own skill (for example `dialer` or `messenger`). **Do not rebuild** SIP,
SMS delivery, consent enforcement, the contact timeline or the inbox.

## Start from the sample

The reference implementation is the sample CRM: `examples/sample-crm/` in
[github.com/Drop-Cowboy/dropcowboy](https://github.com/Drop-Cowboy/dropcowboy),
or `v2/embed/examples/sample-crm/` in the monorepo. Copy it, then read its
`AGENTS.md` (invariants, where things live, common mistakes) and
`server/CONTRACT.md` (every route and error code) before you change it. The
tutorial `v2/docs/embed/tutorials/build-a-simple-crm.md` explains it step by
step.

Building Blocks load from `https://webforms.dropcowboy.com/v{version}/` at
runtime. They are not on npm: never `npm i` a Drop Cowboy package.

## MCP call sequence

1. **Get the steps.** Get the `build_simple_crm` prompt, or call:

   ```
   get_builder_setup_guide({ goal: "crm" })
   ```

   Follow `crm_path.steps` in order. Each step names its tool.
2. **Show the data tools.** Discovery mode hides tools such as
   `mint_embed_token`:

   ```
   set_tool_profile({ profile: "full" })
   ```

   Or `activate_tool_domains` with the domains you need. Then list tools again.
3. **Check readiness.** `get_integration_readiness`, then work through
   `next_actions[]`. Skip `create_agent` and `publish_agent`: a CRM does not
   need a voice agent.
4. **Account setup, with the human.** Each of these needs the human signed in,
   and most need them to act:
   - `enable_building_blocks({ confirm_leave_retail: true })`, only after the
     human confirms leaving retail billing,
   - `connect_byoc` with carrier credentials the human pastes,
   - funds or a Builder allotment (a `402` means both are empty),
   - a phone line on an approved texting campaign (to text),
   - a team E911 location, set in the dashboard (to dial).
5. **Pick the `site_id`.** One UUID per deployed app, generated once with
   `crypto.randomUUID()` and kept. It partitions the embed inbox.
6. **Optional: contact consent.** The team setting
   `embed_resolve_contact_consent` (off by default) lets texts and calls that
   send `contact_id` use consent already on the contact.
7. **Mint per page.** `mint_embed_token` with the least scope the page needs,
   `sub` set to the CRM user's id, and `ttl_seconds` at most 3600.
8. **Get the widget snippets.** `get_building_block` for `dock`, `dialer`,
   `messenger`, `shared-inbox`, `contact-pipeline`, `campaigns` and
   `phone-hub`, as the pages need them.

## Scopes per purpose

The browser asks the server for a token by purpose. The server maps purpose
to scopes; the browser never names scopes.

| Purpose | Scopes | Pages | Needs a carrier and a balance |
|---|---|---|---|
| `session` | `["dialer:webrtc", "contacts"]` | The Dock, the shared inbox | Yes |
| `contacts` | `["contacts"]` | Contacts REST, contact card, pipeline board | No |
| `campaigns` | `["campaigns"]` | Campaign hub (read-only) | No |
| `phone` | `["phone:hub"]` | Phone hub (can rent numbers) | Yes |

In production the server mints at
`POST https://api-v2.dropcowboy.com/phone/public/embed/token` with its API
key (`x-key`, `x-secret`, scope `numbers:write`). The browser calls
`https://app-api-v2.dropcowboy.com` with the site token: the Contacts API at
`/contact/public/contacts` as `Authorization: Bearer`, and every widget's
`apiBase`.

## Session handoff for local development

To run the sample locally without an API key on disk, mint the session token
yourself and hand it over in a file:

```
mint_embed_token({
  site_id: "<the app's DROPCOWBOY_SITE_ID>",
  scope: ["dialer:webrtc", "contacts"],
  ttl_seconds: 3600
})
```

Write `.dropcowboy/session.json` in the sample root:

```json
{ "token": "<token>", "expires_at": 1790000000000, "site_id": "5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d" }
```

- `expires_at` is epoch milliseconds, copied from the mint result.
- Keep `.dropcowboy/` in `.gitignore`. Do not print, log or paste the token
  anywhere else.
- Start the sample with `DC_AUTH_MODE=mcp-session`. The server serves the
  file to loopback requests only and refuses it once it has expired; mint
  again and rewrite the file.
- This mode has only the session token, so Campaigns and Phone are
  unavailable. Production uses `DC_AUTH_MODE=server`.

## Verification

From the sample root:

```bash
cd shared && npm test
cd server/node && npm test && npm run lint
cd server/conformance && npm run test:node
cd react && npm test && npm run build
```

Then check by hand, in a browser at `http://127.0.0.1:8080`:

- `/setup` shows every checklist item done.
- The contacts list loads and search finds a contact by phone or email.
- A contact page shows the contact card, and Call and Text open The Dock on
  that contact.
- With `DROPCOWBOY_WEBHOOK_SECRET` set, a webhook delivery appears in the
  activity feed.

## Pitfalls

- **Scopes from the browser.** Never mint with a scope the request body
  chose. A page that can ask for `phone:hub` can rent numbers.
- **One token for everything.** A `session` token on the contacts pages makes
  them fail with `byoc_required` or `insufficient_balance` for a team that
  has not set up calling. Give them a `contacts` token.
- **Tokens in URLs, attributes or storage.** Pass them only as
  `init({ token, getToken })` or `el.tokenManager`. Never `token=` in a URL.
- **No refresh.** Every `init` needs a `getToken` that mints a new token.
  Widgets call it before expiry and once after a `401`, and fire
  `dc-session-expired` when it fails.
- **Phone number without `contact_id`.** Hand The Dock
  `{ contact_id, phone }`. Without `contact_id` the activity is not logged on
  the contact and contact consent cannot apply.
- **Ignoring `consent_required`.** Show `detail.reason` (`no_granted_consent`,
  `phone_mismatch`, `opted_out`, `contact_dnc`, `contact_not_found`,
  `consent_record_invalid`) and stop. Opt-outs, STOP and Do Not Call always
  block.
- **Unpinned bundles.** Load a fixed release with `integrity` and
  `crossorigin="anonymous"`, never `/latest/`.
- **Calling `api-v2` from the browser.** Only the server calls
  `api-v2.dropcowboy.com`. A `curl` preflight there can get
  `403 ForbiddenException` from a bot filter; that is not a CORS answer.
- **A new `site_id` per run.** The inbox looks empty, because conversations
  are partitioned by `site_id`.
- **Prefixed ids.** Use raw UUIDs everywhere, such as
  `5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d`.

## MCP

```
get_builder_setup_guide({ goal: "crm" })
get_building_block({ id: "dock", transport: "web" })
get_building_block({ id: "contact-pipeline", transport: "web" })
```
