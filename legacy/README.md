# The v1 API (legacy)

> **v1 keeps working.** New work should use the current API at
> `https://api-v2.dropcowboy.com`. [Move to the current API](migrate-v1-to-v2.md).

You're on v1 if your code:

- calls `https://api.dropcowboy.com/v1/...`,
- sends `team_id` and `secret` with each request, or
- uses the [`dropcowboy` npm package](https://www.npmjs.com/package/dropcowboy).

## Where v1 lives

- Code and README: [Drop-Cowboy/dropcowboy-cli](https://github.com/Drop-Cowboy/dropcowboy-cli)
- Package: [`dropcowboy` on npm](https://www.npmjs.com/package/dropcowboy)

## One thing to get right on v1

For `POST /v1/rvm` and `POST /v1/sms`, put `team_id` and `secret` **in the JSON
body**. Those two routes read credentials only from the body. Other v1 routes
also accept them as the `x-team-id` and `x-secret` headers.

## Why move

The current API adds texts with pictures and RCS, voice calls, email, AI voice
agents, campaigns, contacts and consent, signed webhooks with retries,
`Idempotency-Key` for safe retries, and an [OpenAPI spec](https://api-v2.dropcowboy.com/openapi.yaml).
See [What you can build](../README.md#what-you-can-build).
