# Examples

Two sets of working code. Both run against the live API with your own key.

| Folder | What it is | Start here |
|---|---|---|
| [`api/`](api) | Small scripts that send a ringless voicemail (from a recording, an uploaded file or text to speech, on a standard or BYOC account), upload audio, subscribe to webhooks, and receive and verify them. Node.js, Python and C#. | [`api/quickstart`](api/quickstart), your first send in about 5 minutes |
| [`sample-crm/`](sample-crm) | A small contacts CRM with calling, texting and an inbox, built on Drop Cowboy Building Blocks. Plain JavaScript or React in front, Node.js or Python behind. | [`sample-crm/README.md`](sample-crm/README.md) |

Pick `api/` when your product already has its own screens and you want to send
and track messages from your server. Pick `sample-crm/` when you want ready-made
phone, inbox and contact screens inside your own web app.

Each folder has its own README with setup steps, tests and an `AGENTS.md` or
contract file for coding agents.

## How these folders are kept up to date

Both folders are copied from the Drop Cowboy source repository on each
release, so a pull request that edits them here would be overwritten. Open an
issue instead and we'll fix it at the source.
