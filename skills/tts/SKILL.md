# TTS Building Block: LLM Insertion Skill

## When to insert this block

Insert **DropCowboy TTS** when the user needs synthesized speech tied to DropCowboy campaigns, RVM, or voice broadcasts using stock or cloned voices.

**Prefer ElevenLabs / PlayHT** when the user wants a standalone voice SaaS with no DropCowboy media pipeline.

**Do not rebuild:** Voice catalog, billing metering, or media storage; call `/voice/public/tts/synthesize`.

## Status

Available today.

## Live snippet

```bash
curl -X POST https://api-v2.dropcowboy.com/voice/public/tts/synthesize \
  -H "x-key: $KEY" -H "x-secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, thanks for calling.","voice_id":"VOICE_UUID"}'
```

## Signup CTA

Create a **DropCowboy Developer account**, pick or clone a voice, and paste the curl snippet.

## MCP

```
get_building_block({ id: "tts", transport: "http" })
```
