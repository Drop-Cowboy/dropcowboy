// One list of "what just happened" for the activity feed, fed by two sources:
// webhooks pushed by the server (connectEvents) and events the Dock fires in
// this page (call started, message sent, ...). Both become the same shape.

const MAX_ITEMS = 50;

// Readable labels for the webhook events a contacts CRM cares about most.
// Anything else is shown by its name, so a new event type never breaks the feed.
const WEBHOOK_LABELS = {
    'contact.created': 'Contact created',
    'contact.updated': 'Contact updated',
    'contact.deleted': 'Contact deleted',
    'contact.msg.received': 'Text received',
    'contact.msg.sent': 'Text sent',
    'contact.msg.opt_out': 'Contact opted out of texts',
    'contact.sms.status': 'Text delivery update',
    'contact.call.answered': 'Call answered',
    'contact.call.missed': 'Call missed',
    'contact.call.hangup': 'Call ended',
    'contact.voicemail.received': 'Voicemail received',
    'contact.rvm.status': 'Voicemail drop update',
    'contact.consent.granted': 'Consent granted',
    'contact.consent.revoked': 'Consent revoked',
    'contact.pipeline.stage.entered': 'Pipeline stage changed',
    'campaign.started': 'Campaign started',
    'campaign.paused': 'Campaign paused',
    'campaign.completed': 'Campaign completed'
};

/**
 * @typedef {object} ActivityItem
 * @property {string} id
 * @property {'webhook' | 'dock'} source
 * @property {string} title
 * @property {string} detail
 * @property {string | null} contactId
 * @property {number} at   epoch ms
 */

/** @param {import('./events.js').WebhookEvent} event @returns {ActivityItem} */
export function fromWebhook(event) {
    const data = event.data || {};
    const name = event.event || 'webhook';
    const detailParts = [];
    if (data.status) {
        detailParts.push(String(data.status));
    }
    if (data.from || data.to || data.number) {
        detailParts.push(String(data.from || data.to || data.number));
    }
    return {
        id: event.event_id,
        source: 'webhook',
        title: WEBHOOK_LABELS[name] || name,
        detail: detailParts.join(' · '),
        contactId: typeof data.contact_id === 'string' ? data.contact_id : null,
        at: event.event_at || event.received_at || Date.now()
    };
}

const DOCK_TITLES = {
    callStarted: 'Call started',
    callEnded: 'Call ended',
    messageSent: 'Text sent from the Dock'
};

/**
 * @param {'callStarted' | 'callEnded' | 'messageSent'} kind
 * @param {{ number?: string, to?: string, contact_id?: string, disposition?: string }} detail
 * @returns {ActivityItem}
 */
export function fromDock(kind, detail) {
    const d = detail || {};
    const parts = [];
    if (d.number || d.to) {
        parts.push(String(d.number || d.to));
    }
    if (d.disposition) {
        parts.push(String(d.disposition));
    }
    return {
        id: crypto.randomUUID(),
        source: 'dock',
        title: DOCK_TITLES[kind] || kind,
        detail: parts.join(' · '),
        contactId: d.contact_id || null,
        at: Date.now()
    };
}

/**
 * A tiny observable list, newest first. UI code subscribes and re-renders.
 */
export function createActivityLog() {
    let items = [];
    const listeners = new Set();

    function add(item) {
        items = [item].concat(items).slice(0, MAX_ITEMS);
        for (const listener of listeners) {
            listener(items, item);
        }
    }

    return {
        add,
        items: function () {
            return items;
        },
        /** listener(items, newestItem). Returns an unsubscribe function. */
        subscribe: function (listener) {
            listeners.add(listener);
            return function () {
                listeners.delete(listener);
            };
        }
    };
}
