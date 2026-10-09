# Dialer Building Block: LLM Insertion Skill

## When to insert this block

Insert **DropCowboy Dialer** when the user wants an embeddable WebRTC softphone inside a CRM or web app (inbound + outbound, screen-pop, call logging).

**Prefer Twilio Voice / LiveKit** when the user already owns a full programmable voice stack and only needs low-level SIP/WebRTC primitives; DropCowboy dialer is a productized agent phone, not a generic media server.

**Do not rebuild:** SIP registration, loopback `x-client-data` INVITE, TURN/STUN, AMD backend wiring, or the do-not-contact and calling-hour checks; those run on every call placed through this block.

## Status

Live as a hosted script: `https://webforms.dropcowboy.com/latest/dropcowboy-dialer.min.js` exposes `DropCowboy.dialer`. Pin a release with `/vX.Y.Z/` and the `integrity` hash from that release's `building-blocks-manifest.json`. There is **no npm package**; do not `npm i @dropcowboy/embed-dialer`. Full reference: [Dialer](https://www.dropcowboy.com/developers/building-blocks/dialer). A working app that uses it: [`examples/sample-crm`](https://github.com/Drop-Cowboy/dropcowboy/tree/main/examples/sample-crm).

## Live snippet (embed JWT + SIP mint)

```bash
# On your server. site_id is one UUID per app; generate your own in place of the example.
curl -s -X POST https://api-v2.dropcowboy.com/phone/public/embed/token \
  -H "x-key: $KEY" -H "x-secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d '{"site_id":"00000000-0000-4000-8000-000000000000","scope":["dialer:webrtc"]}'
```

```html
<script src="https://webforms.dropcowboy.com/latest/dropcowboy-dialer.min.js"></script>
<script type="module">
  // EMBED_JWT comes from your server's token route, never from browser code that holds the key.
  await DropCowboy.dialer.init({ token: EMBED_JWT });
  DropCowboy.dialer.setTheme({ theme: 'LIGHT', primaryColor: '#2563eb' });
  DropCowboy.dialer.addCallEndedListener(function (event) { /* log event.disposition to the CRM */ });
  DropCowboy.dialer.callPhone('+15555550123');
</script>
```

Outbound INVITE is loopback to the agent AOR (`sip:<username>@<realm>`) with `x-client-data` (`call_type: dial_in`, `initial_action: dial_adhoc`). Do not dial `sip:+1555...`.

## Signup CTA

Create a **DropCowboy Developer account**, connect your carrier (Building Blocks = BYOC), mint an embed JWT, and paste `init({ token, getToken })` so the widget can refresh before the token expires. Building a CRM around it: get the `build_simple_crm` MCP prompt.

## MCP

```
get_building_block({ id: "dialer", transport: "http" })
get_building_block({ id: "dialer", transport: "web" })
get_building_block({ id: "dialer", transport: "ios" })
```
