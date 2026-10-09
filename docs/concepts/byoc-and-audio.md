# Bring your own carrier, and audio

## Two kinds of account

- **Retail.** You rent phone numbers from Drop Cowboy and send from them. This
  is where everyone starts.
- **Bring your own carrier (BYOC).** You connect a phone company account you
  already have (Twilio, Telnyx, a SIP trunk and others) and send from your own
  numbers.

## The same request works on both

Write your send so it doesn't care which kind of account it is on:

```json
{
  "to": "+15555550123",
  "phone_line_id": "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28",
  "media_id": "9c4e1a7f-3b6d-4f2a-8e5c-1d7b3f9a6e20",
  "foreign_id": "e5a1c7f3-9d2b-4e6a-8b4f-3c9e1d7a5b26",
  "callback_url": "https://your-server.example.com/callbacks/dropcowboy"
}
```

- **`phone_line_id`** picks the line to send from. Connecting a carrier keeps
  your phone lines. You load your own numbers onto the same line, and the same
  `phone_line_id` keeps working.
- **`caller_id`** is only for BYOC accounts that want to show one specific
  number. On a retail account it is ignored.

## Audio: pick exactly one

| Field | What it is | Works on |
|---|---|---|
| `media_id` | A file you uploaded once and reuse | Every account |
| `tts_body` + `voice_id` | Text a voice reads out, up to 1,200 characters | Every account |
| `audio_url` | A link to an MP3 or WAV on your own server | BYOC only, and support must enable it |

`media_id` is the safe default. A send with `audio_url` on an account where it
isn't enabled fails with `3014`. Longer text to speech fails with `3021`.

The quickstart's preflight prints `audio_url_allowed` and stops before sending
when it is `false`.

## Read more

- [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier)
- [Media uploads](https://www.dropcowboy.com/developers/api/media)

---

BYOC customers connect their own carrier accounts (Twilio, Bandwidth, etc.) to the Drop Cowboy platform. Customers are responsible for their carrier relationship, billing, and compliance with carrier terms of service. Drop Cowboy does not mark up or bill for carrier services. Message delivery and carrier connectivity depend on the customer's carrier account status and settings.
