# Contributing

Thanks for helping. Here's how changes reach this repo.

## Where to make a change

| What you want to change | Where |
|---|---|
| `examples/api` or `examples/sample-crm` | Open an issue. These folders are copied from our source repository on each release, so a pull request here would be overwritten. We'll make the fix at the source. |
| `skills/` | Open an issue, for the same reason. |
| `README.md`, `AGENTS.md`, `llms.txt`, `docs/`, `legacy/` | A pull request is welcome. |
| The API itself, or a bug in your account | Email support@dropcowboy.com. |

## Pull requests

- Keep each one to one change, and say what it fixes.
- Use placeholders, never real data: phone numbers like `+15555550123`,
  emails at `example.com`, and keys like `YOUR_KEY`.
- Ids in examples are plain UUIDs, like
  `d1f3a8e2-7c4b-4f9a-9d22-9c1e2f3a4b5c`. No prefixes.
- Check facts against the [API docs](https://www.dropcowboy.com/developers/api).
- Every pull request runs a secret scan, a public-content check and a link
  check. Fix what they report.

## Security problems

Don't open an issue. See [SECURITY.md](SECURITY.md).
