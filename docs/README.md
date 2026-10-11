# Docs

Short pages that explain how Drop Cowboy works and fix common problems. The
full reference is the [developer hub](https://www.dropcowboy.com/developers).

## Start here

- [Troubleshooting](troubleshooting.md): starts from what you see and tells you what to change.
- [Build with an AI assistant](vibe-coding.md): connect Cursor, Claude or VS Code, and prompts to copy.

## How it works

- [Ringless voicemail and consent](concepts/ringless-voicemail-and-consent.md)
- [Test numbers](concepts/test-numbers.md)
- [Send results](concepts/send-results.md): the `202`, then the result, and what each `reason_code` means
- [Webhooks](concepts/webhooks.md): create one, check its signature, handle retries
- [BYOC and audio](concepts/byoc-and-audio.md): your own carrier, and the ways to send audio
- [Idempotency](concepts/idempotency.md): retry a send without sending it twice
