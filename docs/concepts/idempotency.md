# Idempotency: retry without sending twice

Sometimes you can't tell whether a send went through. The network timed out,
or the API answered `500` or `502`. If you just send again, the contact might
get two voicemails.

The fix is the `Idempotency-Key` header. It's a label you make up for one
send. If Drop Cowboy sees the same label twice, it sends only once.

## How to use it

1. Make a new random UUID for each new send, and put it in the
   `Idempotency-Key` header.
2. If you're not sure the request got through, retry with **the same key and
   the same body**.
3. To send again on purpose, for example after you fixed a failed send, use a
   **new key**.

```bash
curl -X POST https://api-v2.dropcowboy.com/rvm \
  -H "x-key: $DC_KEY" -H "x-secret: $DC_SECRET" \
  -H "Idempotency-Key: 4f8c2e1a-7b3d-4a9e-8c6f-2d1e5b7a9c34" \
  -H "Content-Type: application/json" \
  -d '{ "to": "+15555550123", "phone_line_id": "e2b6f9a3-5c1d-4e8b-a4f7-9c3e1b5d7a28",
        "media_id": "9c4e1a7f-3b6d-4f2a-8e5c-1d7b3f9a6e20" }'
```

Save the key with your own record of the send, so a retry can reuse it.

## What happens on a retry

Keys are remembered for 24 hours, per account.

| You send | What happens |
|---|---|
| Same key, same body | `202`, but nothing is sent again, and no second callback or webhook fires. The first send's result is the one that counts. |
| Same key, different body or a different route | `202`, then the send fails with `3027`. Nothing is sent. |
| A key that isn't 1 to 255 printable ASCII characters | `202`, then the send fails with `3028`. Nothing is sent. |
| An empty header | Treated as no key. |

Key order and spacing in the JSON body don't matter, but the route does. Never
reuse a key on a different route.

## Read more

- [Send lifecycle: retry safely](https://www.dropcowboy.com/developers/api/send-lifecycle)
- [Errors and limits](https://www.dropcowboy.com/developers/api/errors-and-limits)
