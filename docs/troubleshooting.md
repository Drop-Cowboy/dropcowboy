# Troubleshooting

Find what you're seeing, then follow the fix. The quickstart's
`check-receiver` command tests your own callback and webhook URLs and explains
each answer:

```bash
cd examples/api/quickstart
DC_WEBHOOK_SECRET=your-signing-secret \
  node quickstart.js check-receiver https://your-server.example.com/callbacks/dropcowboy https://your-server.example.com/webhooks/dropcowboy
```

Every request and every delivery attempt is also listed in
[**Settings > API Logs**](https://www.dropcowboy.com/app/#/api-logs). Search
it for the `message_id` from your `202`.

Working with an AI assistant? Paste it the error, word for word, and ask it to
check this page. Using the Starter CRM? Its own
[Troubleshooting](https://github.com/Drop-Cowboy/starter-crm/blob/main/TROUBLESHOOTING.md)
covers the app.

## I got a 202 but nothing arrived

A `202` means the request is in line, not that it was sent. The result went
somewhere you aren't listening:

- The send had no `callback_url`, and you have no webhook for
  `contact.rvm.status`.
- Your endpoint answered something other than `2xx`, often `404` because the
  route doesn't accept `POST`. A `404` is never retried, so that result is gone.
- The key or secret was wrong. That result (`3007`) goes to `callback_url`
  only, never to a webhook.
- You retried with the same `Idempotency-Key` and body. The retry is skipped
  and makes no second result.
- Your `callback_url` was `localhost`. Drop Cowboy can't reach your computer;
  use a tunnel address such as the one `ngrok http 3000` prints.

**Fix:** look the `message_id` up in API Logs, make your routes accept `POST`
and answer `200` quickly, and run `check-receiver`.

## 401

Non-send routes answer `401` when `x-key` or `x-secret` is missing or wrong.
Check both headers. Send routes are different: they answer `401` only when
there are no credentials at all. A wrong key or secret still gets `202`, and
the send then fails with `3007` on `callback_url`.

## 403 when uploading audio

The `PUT` to the signed upload URL answered `403`:

- **Content-Type mismatch.** Send exactly the `content_type` that came with the
  URL, such as `audio/mpeg`. Some HTTP clients add a charset; set the header
  yourself. Don't send `x-key` or `x-secret` to the upload URL.
- **The URL expired.** Upload URLs last 2 days. Get new ones with
  `GET /media/public/media/{media_id}/policy`.

A `403` from a Drop Cowboy route instead means the key is missing a scope.
Uploads need `media:write`.

## The send failed with 3001, 3014 or 3040

- `3001`: the `media_id` isn't on your account, often a sample id copied from
  the docs. Upload your own file and use the `media_id` you get back.
- `3014`: `audio_url` isn't enabled for your account. Send `media_id` or text to
  speech instead, or ask support about `audio_url` (BYOC plans only).
- `3040`: your account is in testing mode and the number isn't a test number.
  Add it on the **Dialing rules** page.

## A call or text failed with `sandbox_only`

Your team hasn't connected a carrier or added funds yet, so it can call and
text only free 555 test numbers, such as `+15555550002`. The token's
`sandbox_only_reason` says which is missing: `byoc_required` (no carrier) or
`insufficient_balance` (no funds).

**Fix:** keep building with 555 numbers, or connect a carrier and add funds,
then mint a new token. A token minted before that stays limited until it
expires. See [Test numbers](concepts/test-numbers.md).

## A test call or text didn't do what I expected

- **Refused with `sandbox_concurrency`.** Five test calls are already in
  progress. Hang one up and call again.
- **Refused with `sandbox_caller_id`.** A 555 number was the caller ID of a call
  to a real number. Choose one of your own numbers as the caller ID.
- **No reply to a test text.** The text started with
  `sandbox got your message:`, or the same sender has had 10 replies in the
  last hour. Wait, then send again.
- **A text to a number like `+13125550142` was charged.** That's a real number
  with a real area code. Only area code 555 is free.
- **A 555 number returned a result code but never replied.** It's a
  [simulated number](concepts/test-numbers.md#simulated-numbers), or in the
  reserved `+1 555 000` or `+1 555 003` range. Use a number outside
  `+1 555 000` to `+1 555 003`.

## The webhook signature doesn't verify

- You checked parsed JSON instead of the raw body. Read the bytes first,
  verify, then parse.
- You used the wrong secret. Each webhook has its own;
  `GET /register/public/account/webhook-signing-secret` lists them all.
- You rotated the secret. The old one stopped working at once.
- Your server clock is more than 5 minutes off.

Test your verifier against `examples/api/fixtures/signature-vectors.json`. See
[Webhooks](concepts/webhooks.md).

## My endpoint was called once and never again

- A `callback_url` is only ever tried once.
- A webhook is retried only after `408`, `429`, a `5xx` or a timeout. A `404`,
  `405` or `401` is final.
- If your endpoint fails many times in a row, Drop Cowboy stops sending to it
  for a while. Events that happen during that pause are not sent later, so
  read the results of sends from that time in API Logs.

## 429

You're sending too fast. Wait a little, then retry with the same
`Idempotency-Key`, waiting longer each time. To reach many contacts, a
[campaign](https://www.dropcowboy.com/developers/api/campaigns) is one request
instead of one per contact.

## Still stuck?

- [Troubleshooting on the developer hub](https://www.dropcowboy.com/developers/api/troubleshooting)
- [Outcomes](https://www.dropcowboy.com/developers/api/outcomes): every reason code
- [System status](https://status.dropcowboy.com)
- Email support@dropcowboy.com with the `message_id`.
