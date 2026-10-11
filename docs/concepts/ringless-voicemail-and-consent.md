# Ringless voicemail and consent

A ringless voicemail delivers your recorded message directly to the contact's
voicemail box. The contact listens to it like any other voicemail.

You send one with `POST /rvm`. You say who it goes to (`to`), which of your
phone lines it comes from (`phone_line_id`), and what it says: an audio file
you uploaded (`media_id`), or text that a voice reads out (`tts_body` with
`voice_id`).

## Get consent first

It's important to have each person's permission before you send them a
voicemail or a text. Getting it can be as simple as a clear checkbox on your
sign-up form that says what kinds of messages you'll send. Requirements vary by
use case, so check your consent process with your legal counsel.

Drop Cowboy stores consent for each contact, separately for each channel:

The field names use two abbreviations. TCPA is the Telephone Consumer
Protection Act, the US law about automated calls and texts. PEWC stands for
"prior express written consent".

| Channel | The contact agreed when |
|---|---|
| Calls and ringless voicemail | `has_tcpa_consent` is `true` |
| Texts | `has_sms_consent` is `true` |
| Email | `has_email_consent` is `true` |

Agreeing to voicemail doesn't cover texts. Check the flag for the channel you
are about to use.

If the account has **Require TCPA Consent (PEWC)** switched on in its consent
settings, a send to a contact with no consent on file for that channel is
blocked and ends with reason code `6011` (Opt-in Missing). Sends to a number on
your do-not-contact list are blocked too.

## When the mailbox can't take a message

- `4001`: the contact never set up their voicemail.
- `4002`: the contact's voicemail box is full.

Resending won't help with either. If the contact agreed to texts, a text is a
good fallback.

## Read more

- [Ringless voicemail](https://www.dropcowboy.com/developers/api/ringless-voicemail)
- [Consent](https://www.dropcowboy.com/developers/api/consent) and [do-not-contact](https://www.dropcowboy.com/developers/api/dnc)
- [Send results](send-results.md)

---

While Drop Cowboy provides tools to support compliance efforts, customers remain solely responsible for obtaining proper consent, maintaining opt-out lists, and complying with all federal and state telemarketing regulations. Consult with your legal counsel to ensure your specific use case and consent mechanisms comply with applicable laws.

Ringless voicemail technology delivers messages directly to voicemail inboxes. Delivery success depends on carrier compatibility, device type, and recipient settings. While designed for voicemail delivery, technical factors may affect performance. Drop Cowboy does not guarantee delivery rates or specific outcomes.
