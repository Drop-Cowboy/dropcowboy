# vanilla/

This is one of two front-ends for the sample CRM. Start at the folder above
this one.

The sample CRM with no framework and no build step. The sample server serves
this folder, so start a server (see `../server/node` or `../server/python`) and
open <http://127.0.0.1:8080>.

| File | What it is |
|---|---|
| `index.html` | The page shell: navigation, the activity sidebar, a live region for toasts. |
| `app.js` | Boot: `startCrm()`, mounts the Dock once, starts the activity feed and the router. |
| `router.js` | A small History API router. Each page is `render(main, ctx)` and may return a cleanup function. |
| `dom.js` | `h(tag, attrs, ...children)`, the only DOM helper. |
| `notice.js`, `contact-form.js`, `activity.js` | Error and info notices, the contact form, the activity feed and toasts. |
| `pages/` | One file per page. |

## Pages and the Building Blocks they use

| Page | Uses |
|---|---|
| Contacts (`/contacts`) | Contacts REST API only: search, page through, add. |
| Contact (`/contacts/:id`) | REST API for editing and deleting, `<dc-contact-card>` (with its timeline), and the Dock for Call and Text. |
| Pipeline (`/pipeline`) | `<dc-pipeline-board>`. Opening a card opens the contact. |
| Inbox (`/inbox`) | `<dc-shared-inbox>`, sending from your business number. |
| Campaigns (`/campaigns`) | The campaign hub with a read-only campaigns token. |
| Phone (`/phone`) | `<dc-phone-hub>` and `<dc-number-picker>` with the phone token. Renting a number asks first. |
| Setup (`/setup`) | How this app signs in, the account checklist, the business number. |

The Dock is on every page. Its error events, and webhooks arriving on
`/api/events`, show up in the activity sidebar and as toasts.

Each page holds one token per purpose, however many widgets it shows, and
only the purposes it needs:

| Token | Who uses it |
|---|---|
| `contacts` | The Contacts, Contact and Pipeline pages: the REST calls, and `<dc-contact-card>` and `<dc-pipeline-board>` through the contacts bundle's token manager (`DropCowboy.contacts.getTokenManager()`). |
| `session` | The Dock, and `<dc-shared-inbox>`, which borrows the Dock's token manager (`DropCowboy.dock.getTokenManager()`). |

Drop Cowboy refuses to mint a calling token until the team has a connected
carrier and a balance. Because the contacts pages never need the session
token, they keep working then, and the banner says why the Dock is not
available (`byoc_required`, `insufficient_balance`).
