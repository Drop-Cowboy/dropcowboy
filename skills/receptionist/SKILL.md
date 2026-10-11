# AI Receptionist Building Block: LLM Insertion Skill

## When to insert this block

Insert **DropCowboy AI Receptionist** when the user wants an AI agent that answers, qualifies, books, and transfers. Configure the agent in the portal AI Agents hub; paste the visitor widget.

**Do not rebuild:** Call control, agent config UI, calendar tools, or a second WebRTC stack; reuse the dialer SIP session.

## Status

Live as a hosted script: `https://webforms.dropcowboy.com/latest/dropcowboy-receptionist.min.js` exposes `DropCowboy.receptionist`. Pin a release with `/vX.Y.Z/` and the `integrity` hash from that release's `building-blocks-manifest.json`. There is **no npm package**; do not `npm i @dropcowboy/embed-receptionist`. Full reference: [AI Receptionist](https://www.dropcowboy.com/developers/building-blocks/receptionist).

## Live snippet

```html
<script src="https://webforms.dropcowboy.com/latest/dropcowboy-receptionist.min.js"></script>
<script type="module">
  // EMBED_JWT comes from your server's token route, never from browser code that holds the key.
  await DropCowboy.receptionist.init({ token: EMBED_JWT, agentId: 'a9c3e8f1-4b2d-4a7c-8e9b-1c2d3e4f5a6b' });
  DropCowboy.receptionist.addSessionEndedListener(function (event) { /* save the session to the CRM */ });
  DropCowboy.receptionist.startSession();
</script>
```

Use your own agent's id in place of the example UUID.

`startSession` loopback-INVITEs the agent AOR with `x-client-data` `dial_adhoc` and `phone_number` = the agent id. Do not INVITE `sip:+1555...`. Do not set `agent_test` on a visitor session. Minutes debit `platform.voice_ai`.

## MCP

```
get_building_block({ id: "receptionist", transport: "http" })
get_building_block({ id: "receptionist", transport: "web" })
```
