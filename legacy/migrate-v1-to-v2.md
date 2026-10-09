# Move from v1 to the current API

The current API uses a new host, new credentials and a few renamed fields. Your
v1 code keeps working while you move, so you can switch one call at a time.

## 1. Get new credentials

The current API doesn't read `team_id` and `secret`. It uses an API key
instead. In the dashboard, open [**Developers > API Keys**](https://www.dropcowboy.com/app/#/api-keys)
and create a key. Send it on every request as two headers, `x-key` and
`x-secret`, never in the body. The secret is shown once.

## 2. Ringless voicemail

v1:

```bash
curl -X POST https://api.dropcowboy.com/v1/rvm \
  -H "Content-Type: application/json" \
  -d '{
    "team_id": "YOUR_TEAM_ID",
    "secret": "YOUR_V1_SECRET",
    "brand_id": "2c9d4e1f-7a3b-4f6c-8d2e-9b1a5c7e3f40",
    "phone_number": "+15555550123",
    "recording_id": "1b7e3c9a-4d2f-4a8b-9e6c-7f2a1d5b3c80",
    "pool_id": "6a2d8f4c-1e7b-4c9a-b3d5-8f1e6a2c4b97",
    "foreign_id": "e5a1c7f3-9d2b-4e6a-8b4f-3c9e1d7a5b26",
    "callback_url": "https://your-server.example.com/callbacks/dropcowboy"
  }'
```

Current API:

```bash
curl -X POST https://api-v2.dropcowboy.com/rvm \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+15555550123",
    "phone_line_id": "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28",
    "media_id": "9c4e1a7f-3b6d-4f2a-8e5c-1d7b3f9a6e20",
    "foreign_id": "e5a1c7f3-9d2b-4e6a-8b4f-3c9e1d7a5b26",
    "callback_url": "https://your-server.example.com/callbacks/dropcowboy"
  }'
```

| v1 field | Current API |
|---|---|
| `team_id`, `secret` (body) | `x-key` and `x-secret` headers, from a new API key |
| `phone_number` | `to` (or `contact_id`) |
| `recording_id` | `media_id`. List your files with `GET /media/public/media`. |
| `voice_id` + `tts_body` | Same names. `tts_body` is up to 1,200 characters. |
| `audio_url`, `audio_type` | `audio_url` only, for BYOC plans with it enabled by support. There is no `audio_type`. |
| `pool_id` | `phone_line_id`, from `GET /phone/public/lines`. Leave it out to use your default line. |
| `forwarding_number`, `phone_ivr_id` | No field on the send. Set what happens on a call back in the phone line's routing. |
| `brand_id` | `brand_id`, needed only when your account requires brand registration. |
| `postal_code`, `foreign_id`, `callback_url` | Same names. `foreign_id` is optional. |
| `byoc` | `caller_id` plus `byoc.sti_orig_id` and `byoc.sti_attestation`, for BYOC accounts. |

## 3. Texts

v1:

```bash
curl -X POST https://api.dropcowboy.com/v1/sms \
  -H "Content-Type: application/json" \
  -d '{
    "team_id": "YOUR_TEAM_ID",
    "secret": "YOUR_V1_SECRET",
    "phone_number": "+15555550123",
    "caller_id": "+15555550100",
    "pool_id": "6a2d8f4c-1e7b-4c9a-b3d5-8f1e6a2c4b97",
    "sms_body": "Your order is ready. Reply STOP to opt out.",
    "opt_in": true
  }'
```

Current API:

```bash
curl -X POST https://api-v2.dropcowboy.com/sms \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+15555550123",
    "phone_line_id": "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28",
    "body": "Your order is ready. Reply STOP to opt out."
  }'
```

| v1 field | Current API |
|---|---|
| `phone_number` | `to` (or `contact_id`) |
| `caller_id`, `pool_id` | `phone_line_id`. The line's numbers send the text. |
| `sms_body` (160 characters) | `body`, up to 1,600 characters. Pictures go in `media_urls` or `media_ids`. |
| `opt_in` | No field on the send. Record the contact's consent with the [consent routes](https://www.dropcowboy.com/developers/api/consent). |

## 4. Results

- A send answers `202` with `{"status":"queued","message_id":"..."}`. That
  means queued, not sent.
- A v1 result carries `status` and a text `reason`, plus `status_code` only
  when `status_format` was set. A current result always carries `status`, a
  numeric `reason_code` and `reason`. Branch on `reason_code`; the
  [Outcomes](https://www.dropcowboy.com/developers/api/outcomes) page lists them.
- `callback_url` still works, and is tried once. For results you can rely on,
  create a signed webhook. See [Webhooks](../docs/concepts/webhooks.md).

## 5. Check it

Run the [quickstart](../examples/api/quickstart) once with your new key to
confirm your account, phone line and audio work, then move your own code over.
