# Examples

Working code that runs against the live API with your own key.

| Where | What it is | Start here |
|---|---|---|
| [`api/`](api) | Small scripts that send a ringless voicemail (from a recording, an uploaded file or text to speech, on a standard or BYOC account), upload audio, subscribe to webhooks, and receive and verify them. Node.js, Python and C#. | [`api/quickstart`](api/quickstart), your first send in about 5 minutes |
| [Starter CRM](https://github.com/Drop-Cowboy/starter-crm) | A small contacts CRM with calling, texting and an inbox, built on Drop Cowboy Building Blocks. Plain JavaScript or React in front, Node.js or Python behind. A GitHub template in its own repository. | Click **Use this template** on [its page](https://github.com/Drop-Cowboy/starter-crm) |

Pick `api/` when your product already has its own screens and you want to send
and track messages from your server. Pick the Starter CRM when you want
ready-made phone, inbox and contact screens inside your own web app.

Each has its own README with setup steps, tests and an `AGENTS.md` or contract
file for coding agents.

## How this folder is kept up to date

`api/` is copied from the Drop Cowboy source repository on each release, so a
pull request that edits it here would be overwritten. Open an issue instead and
we'll fix it at the source. The same goes for the Starter CRM repository.
