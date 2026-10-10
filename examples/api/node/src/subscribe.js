// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Manage the webhooks that deliver the result of ringless voicemail sends to
// your receiver. A webhook is one URL, the event types it receives and its
// own signing secret, and an account can hold many of them.
//
//   npm run subscribe                        create one webhook for contact.rvm.status
//   npm run subscribe -- --receipt           ...for status and contact.rvm.receipt
//   npm run subscribe -- --events a,b        ...for exactly these event types
//   npm run subscribe -- --list              list your webhooks
//   npm run subscribe -- --update <id> --url <https url> --events a,b --name "My hook"
//                                            change one webhook; send only what changes
//   npm run subscribe -- --rotate <id>       issue a new signing secret for one webhook
//   npm run subscribe -- --delete <id>       delete one webhook
//
// Creating a webhook needs DC_PUBLIC_URL, the HTTPS address of a tunnel to
// your receiver. Listing, updating, rotating and deleting do not.

import { clientFromEnv } from './lib/client.js';
import { isMain, runCli } from './lib/cli.js';
import { ROUTES, RecipeError, lastFour, publicUrl, splitList } from './lib/config.js';
import { refuseSampleValues } from './lib/sample-values.js';

const WEBHOOKS_PATH = '/register/public/webhooks';
const STATUS_EVENT = 'contact.rvm.status';
const RECEIPT_EVENT = 'contact.rvm.receipt';
const MAX_NAME_LENGTH = 100;

async function run({ env = process.env, out = console, client = clientFromEnv(env), argv = process.argv.slice(2) } = {}) {
    refuseSampleValues(env);
    const command = parseArgs(argv);

    if (command.action === 'list') {
        return listWebhooks({ client, out });
    }
    if (command.action === 'delete') {
        return deleteWebhook({ client, out, webhookId: command.webhookId });
    }
    if (command.action === 'update') {
        return updateWebhook({ client, out, webhookId: command.webhookId, changes: command.changes });
    }
    if (command.action === 'rotate') {
        return rotateSecret({ client, out, webhookId: command.webhookId });
    }
    return createWebhook({ env, client, out, eventTypes: command.eventTypes });
}

// One webhook carrying every requested event type. Creating never replaces
// another webhook, and the signing secret belongs to this webhook alone.
async function createWebhook({ env, client, out, eventTypes }) {
    const base = publicUrl(env);
    if (base === null || !base.toLowerCase().startsWith('https://')) {
        throw new RecipeError('Set DC_PUBLIC_URL to the HTTPS address of a tunnel to your receiver. Webhooks are only sent to public HTTPS URLs.');
    }
    const hookUrl = base + ROUTES.webhook;

    const body = await client.post(WEBHOOKS_PATH, { hook_url: hookUrl, event_types: eventTypes });
    const webhook = body && body.data ? body.data : {};
    out.log('Created webhook ' + (webhook.webhook_id || 'unknown') + ' for ' + eventTypes.join(', ') + ' at ' + hookUrl);
    out.log('Signing secret ends in ' + (webhook.signing_secret ? lastFour(webhook.signing_secret) : 'unknown') + '. This webhook signs its deliveries with its own secret.');
    out.log('The receiver loads its signing secrets by itself when it starts, or set DC_WEBHOOK_SECRET.');
    out.log('Creating another webhook adds to the list; it never replaces this one. To change a secret, rotate it: npm run subscribe -- --rotate <webhook_id>');
    return webhook;
}

async function listWebhooks({ client, out }) {
    const body = await client.get(WEBHOOKS_PATH);
    const webhooks = body && Array.isArray(body.data) ? body.data : [];
    if (webhooks.length === 0) {
        out.log('No webhooks yet. Run "npm run subscribe" to create one.');
        return webhooks;
    }
    for (let i = 0; i < webhooks.length; i++) {
        const hook = webhooks[i];
        const events = Array.isArray(hook.event_types) ? hook.event_types.join(', ') : 'unknown';
        out.log(hook.webhook_id + '  ' + events + '  ' + (hook.hook_url || hook.url));
    }
    return webhooks;
}

// Sends only the fields you pass. event_types replaces the whole set of event
// types of this webhook. The webhook_id and the signing secret stay the same.
async function updateWebhook({ client, out, webhookId, changes }) {
    const body = await client.put(WEBHOOKS_PATH + '/' + encodeURIComponent(webhookId), changes);
    const webhook = body && body.data ? body.data : {};
    const events = Array.isArray(webhook.event_types) ? webhook.event_types.join(', ') : 'unknown';
    out.log('Updated webhook ' + (webhook.webhook_id || webhookId));
    out.log('  name:   ' + (webhook.name || 'none'));
    out.log('  url:    ' + (webhook.hook_url || webhook.url || 'unknown'));
    out.log('  events: ' + events);
    out.log('The signing secret did not change.');
    return webhook;
}

async function deleteWebhook({ client, out, webhookId }) {
    await client.delete(WEBHOOKS_PATH + '/' + encodeURIComponent(webhookId));
    out.log('Deleted webhook ' + webhookId + '. Your other webhooks are unchanged.');
    return { webhook_id: webhookId, deleted: true };
}

// Deliveries are signed with the new secret from now on. The receiver accepts
// a delivery signed with any secret it holds, so give it the new secret
// (restart it, or set DC_WEBHOOK_SECRET) and keep the old one until the
// deliveries already in flight have arrived, then remove the old one.
async function rotateSecret({ client, out, webhookId }) {
    const body = await client.post(WEBHOOKS_PATH + '/' + encodeURIComponent(webhookId) + '/rotate-secret');
    const rotated = body && body.data ? body.data : {};
    out.log('Rotated the signing secret of webhook ' + webhookId + '. The new secret ends in ' + (rotated.signing_secret ? lastFour(rotated.signing_secret) : 'unknown') + '.');
    out.log('New deliveries are signed with it. Add it to the receiver (restart it, or set DC_WEBHOOK_SECRET) and keep the old secret there until in-flight deliveries have arrived.');
    return rotated;
}

function parseArgs(argv) {
    const args = Array.isArray(argv) ? argv : [];
    const list = args.includes('--list');
    const deleteId = valueOf(args, '--delete');
    const rotateId = valueOf(args, '--rotate');
    const updateId = valueOf(args, '--update');
    const chosen = [list, deleteId !== null, rotateId !== null, updateId !== null].filter(Boolean).length;
    if (chosen > 1) {
        throw new RecipeError('Use only one of --list, --update <webhook_id>, --delete <webhook_id> and --rotate <webhook_id>.');
    }
    if (updateId === null && (args.includes('--url') || args.includes('--name'))) {
        throw new RecipeError('--url and --name go with --update <webhook_id>.');
    }
    if (list) {
        return { action: 'list' };
    }
    if (deleteId !== null) {
        return { action: 'delete', webhookId: deleteId };
    }
    if (rotateId !== null) {
        return { action: 'rotate', webhookId: rotateId };
    }
    if (updateId !== null) {
        return { action: 'update', webhookId: updateId, changes: changesFrom(args) };
    }
    return { action: 'create', eventTypes: eventTypesFrom(args) };
}

function changesFrom(args) {
    const changes = {};
    const url = valueOf(args, '--url');
    if (url !== null) {
        if (!url.toLowerCase().startsWith('https://')) {
            throw new RecipeError('--url must be a public HTTPS address, for example https://abc123.example.com/webhooks/dropcowboy');
        }
        changes.hook_url = url;
    }
    const eventTypes = namedEventTypes(args);
    if (eventTypes !== null) {
        changes.event_types = eventTypes;
    }
    const name = valueOf(args, '--name');
    if (name !== null) {
        if (name.length > MAX_NAME_LENGTH) {
            throw new RecipeError('--name can be at most ' + MAX_NAME_LENGTH + ' characters.');
        }
        changes.name = name;
    }
    if (Object.keys(changes).length === 0) {
        throw new RecipeError('Nothing to update. Pass at least one of --url, --events (or --receipt) and --name.');
    }
    return changes;
}

function eventTypesFrom(args) {
    const named = namedEventTypes(args);
    return named === null ? [STATUS_EVENT] : named;
}

function namedEventTypes(args) {
    const listed = valueOf(args, '--events');
    if (listed !== null) {
        const events = splitList(listed);
        if (events.length === 0) {
            throw new RecipeError('--events needs a comma separated list of event types, for example --events contact.rvm.status,contact.rvm.receipt');
        }
        return events;
    }
    return args.includes('--receipt') ? [STATUS_EVENT, RECEIPT_EVENT] : null;
}

// The value after a flag, or null when the flag is absent. A flag with no
// value is an error, so a typo never deletes or rotates the wrong thing.
function valueOf(args, flag) {
    const index = args.indexOf(flag);
    if (index === -1) {
        return null;
    }
    const value = args[index + 1];
    if (value === undefined || value.startsWith('--') || value.trim() === '') {
        throw new RecipeError(flag + ' needs a value.');
    }
    return value.trim();
}

if (isMain(import.meta.url)) {
    await runCli(run);
}

export { run };
