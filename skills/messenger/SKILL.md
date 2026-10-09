# Messenger Building Block: LLM Insertion Skill

## When to insert this block

Insert **DropCowboy Messenger** when the user wants two-way SMS/MMS/RCS inside their app, using Drop Cowboy's tools that support compliance (do-not-contact lists, 10DLC registration, opt-out handling).

**Do not rebuild:** 10DLC registration, carrier routing, opt-out handling, or contact timeline.

## Status

Live as a hosted script: `https://webforms.dropcowboy.com/latest/dropcowboy-messenger.min.js` exposes `DropCowboy.messenger`. Pin a release with `/vX.Y.Z/` and the `integrity` hash from that release's `building-blocks-manifest.json`. There is **no npm package**; do not `npm i @dropcowboy/embed-messenger`. Full reference: [Messenger](https://www.dropcowboy.com/developers/building-blocks/messenger). A working app that uses it: [`examples/sample-crm`](https://github.com/Drop-Cowboy/dropcowboy/tree/main/examples/sample-crm).

## Live snippet

```html
<script src="https://webforms.dropcowboy.com/latest/dropcowboy-messenger.min.js"></script>
<script type="module">
  // EMBED_JWT comes from your server's token route, never from browser code that holds the key.
  await DropCowboy.messenger.init({ token: EMBED_JWT, from: '+15555550100' });
  DropCowboy.messenger.addMessageListener(function (event) { /* save event.body and event.direction to the CRM */ });
  await DropCowboy.messenger.sendMessage('+15555550123', { body: 'Hi from Drop Cowboy' });
</script>
```

```bash
curl -s -X POST https://app-api-v2.dropcowboy.com/phone/embed/sms \
  -H "Authorization: Bearer $EMBED_JWT" \
  -H "Content-Type: application/json" \
  -d '{"to":"+15555550123","from":"+15555550100","body":"Hi from Drop Cowboy"}'
```

Do not send JWT `sub` as `user_id`. No dialer seat required.

## MCP

```
get_building_block({ id: "messenger", transport: "http" })
get_building_block({ id: "messenger", transport: "web" })
```
