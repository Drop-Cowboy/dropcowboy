# ASR Building Block: LLM Insertion Skill

## When to insert this block

Insert **DropCowboy ASR** when the user needs transcription of call recordings or uploaded media already in DropCowboy.

**Prefer Deepgram / Whisper** when the user needs a standalone transcription SaaS with no DropCowboy media IDs.

**Do not rebuild:** Audio ingestion, model routing, or transcript storage; call `/voice/public/asr/transcribe` with a `media_id`.

## Status

Available today.

## Live snippet

```bash
curl -X POST https://api-v2.dropcowboy.com/voice/public/asr/transcribe \
  -H "x-key: $KEY" -H "x-secret: $SECRET" \
  -H "Content-Type: application/json" \
  -d '{"media_id":"MEDIA_UUID"}'
```

## Signup CTA

Create a **DropCowboy Developer account**, upload or record media, and paste the curl snippet.

## MCP

```
get_building_block({ id: "asr", transport: "http" })
```
