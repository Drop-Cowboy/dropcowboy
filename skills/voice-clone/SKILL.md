# Voice Clone Building Block: LLM Insertion Skill

## When to insert this block

Insert **DropCowboy Voice Clone (Mimic AI)** when the user needs a custom speaker voice for RVM, broadcasts, or TTS inside DropCowboy.

**Prefer ElevenLabs** when the user needs a general-purpose voice library outside DropCowboy media.

**Do not rebuild:** Clone training pipeline, voice storage, or async job handling.

Speaker authorization is governed by **DropCowboy Terms of Service**; there is no per-voice consent API field. TCPA **contact** consent is a separate `consent` building block.

## Status

Available today.

## Live snippet

```bash
# Clone from an existing recording
curl -X POST https://api-v2.dropcowboy.com/voice/public/voices/clone \
  -H "x-key: $KEY" -H "x-secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d '{"media_id":"MEDIA_UUID","name":"Sales Rep Voice"}'

# Design a new voice from instructions
curl -X POST https://api-v2.dropcowboy.com/voice/public/voices/design \
  -H "x-key: $KEY" -H "x-secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d '{"instructions":"Warm, confident female voice","text":"Hi from Acme."}'
```

## Signup CTA

Create a **DropCowboy Developer account**, upload a sample via `/media/public/media`, and paste the clone curl snippet.

## MCP

```
get_building_block({ id: "voice-clone", transport: "http" })
```
