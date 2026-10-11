# Webhooks

A webhook is a web address on your server that Drop Cowboy calls when
something happens, like a voicemail result. Unlike `callback_url`, webhooks are
signed and retried, so rely on them for anything that matters.

## Create one

```bash
curl -X POST https://api-v2.dropcowboy.com/register/public/webhooks \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Content-Type: application/json" \
  -d '{ "hook_url": "https://your-server.example.com/webhooks/dropcowboy",
        "event_types": ["contact.rvm.status", "contact.rvm.receipt"] }'
```

The answer includes a `signing_secret`. Save it on your server. You can have up
to 50 webhooks, each with its own secret.

If you lose a secret, `GET /register/public/account/webhook-signing-secret`
returns the secret of every webhook.

## Check the signature

Anyone can send a request to your web address, so check that each one really
came from Drop Cowboy before you trust it:

```text
timestamp = header "X-Timestamp"           (Unix seconds)
signature = header "X-Signature"           ("sha256=" + hex)
if |now - timestamp| > 300: reject
expected  = "sha256=" + hex(HMAC_SHA256(secret, timestamp + "." + raw_body_bytes))
if not constant_time_equal(signature, expected): reject
```

Three things trip people up:

- **Use the raw body**, the exact bytes that arrived, before any JSON parsing.
  Parsing and re-encoding changes the bytes and the check fails.
- **Use the right secret.** Each webhook has its own.
- **Check your server clock.** More than 5 minutes off and every delivery
  looks stale.

[`examples/api`](../../examples/api) has verifiers in Node.js, Python and C#,
tested against `examples/api/fixtures/signature-vectors.json`.

## Rotating a secret

`POST /register/public/webhooks/{id}/rotate-secret` makes a new secret. **The
old one stops working at once.** Every delivery after that, including retries
of older events, is signed with the new secret. So give your receiver the new
secret as soon as you rotate. If it holds both for a minute, a delivery that
was already on its way still checks out.

## Answer fast, retry safely

- Answer with any `2xx` within **5 seconds**. Do the slow work afterwards.
- `408`, `429`, a `5xx` or a timeout is retried: at most 3 attempts in all.
  The second comes about 1 minute after the first, and the third about 5
  minutes after the second.
- Any other answer, such as `400`, `401` or `404`, is **not** retried.
- You can still get the same event twice. Every delivery carries an `event_id`
  (also in the `X-Event-Id` header). Skip one you have already handled.
- If your endpoint keeps failing, deliveries to it pause for a few minutes,
  and events from that time are dropped. Fix a failing endpoint quickly.

## Read more

- [Webhooks](https://www.dropcowboy.com/developers/api/webhooks): every event and field
- [Send results](send-results.md)
