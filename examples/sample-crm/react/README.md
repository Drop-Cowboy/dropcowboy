# react/

This is one of two front-ends for the sample CRM. Start at the folder above
this one.

The same CRM as `../vanilla`, in React 19 with React Router. It uses the same
`../shared` modules, so only the rendering differs.

```bash
npm install
npm run dev      # http://localhost:5173/react/ , needs a sample server on 127.0.0.1:8080
npm run build    # writes dist/, which the sample server serves at /react/
npm test         # vitest + Testing Library
npm run lint
```

In development Vite forwards `/api`, `/__dev`, `/shared` and `/webhooks` to
the sample server, so the browser sees one origin, as it does in production.
In `login` mode, add `http://localhost:5173/react/` as an allowed callback URL
next to `http://127.0.0.1:8080/react/`.

## How the Building Blocks are wrapped

React 19 passes props to a custom element as JavaScript properties when the
element defines them. So each Building Block gets a tiny wrapper in
`src/blocks/` that renders the element with its properties as props and
listens for its events through a ref:

```jsx
<dc-contact-card ref={ref} apiBase={crm.widgetApiBase} tokenManager={tokenManager} contactId={id} />
```

- The element must be defined before it renders with those props, or React
  would fall back to attributes. `useContactWidgets()` (contact card,
  pipeline: the `contacts` token) and `useSessionWidgets()` (inbox: the Dock's
  `session` token) load the bundle first. This is also what keeps the token
  manager out of the DOM. The contacts pages never wait for the Dock, so they
  work for a team that has not connected a carrier yet.
- Events (`dc-call`, `dc-open-contact`, `dc-error`, ...) are received with
  `useElementEvent(ref, type, handler)`.
- The campaign hub and phone hub are opened by their bundles (`useOpenWidget`).
  Their bundles keep one hub per page, so opens and closes are queued. React
  runs effects twice in development, and an overlapping close would shut the
  newly opened hub.

| Wrapper | Element |
|---|---|
| `DcContactCard` | `<dc-contact-card>` |
| `DcPipelineBoard` | `<dc-pipeline-board>` |
| `DcSharedInbox` | `<dc-shared-inbox>` |
| `CampaignHub` | the campaigns bundle's hub, in a container div |
| `DcPhoneHub`, `DcNumberPicker` | `<dc-phone-hub>`, `<dc-number-picker>` |
