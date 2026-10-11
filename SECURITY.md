# Security

## Report a problem

Email **support@dropcowboy.com** with "Security" in the subject. Please
include:

- what you found and where,
- the steps to see it, and
- what someone could do with it.

Don't open a public issue or pull request for a security problem, and don't
include real customer data in your report.

## Leaked an API key?

If you committed or shared a Drop Cowboy API secret, delete that key in
[**Developers > API Keys**](https://www.dropcowboy.com/app/#/api-keys) and
create a new one. Removing it from your code later doesn't help; anyone who
saw it can still use it until you delete the key.

The same goes for a webhook signing secret: rotate it with
`POST /register/public/webhooks/{id}/rotate-secret`. The old secret
stops working at once.

## What's covered

This repository's code and docs, and the Drop Cowboy API and dashboard they
use.
