import { connectEvents } from '/shared/events.js';
import { fromWebhook } from '/shared/activity.js';
import { formatTime } from '/shared/format.js';
import { h, show } from './dom.js';

const STATUS_TEXT = {
    connecting: 'Connecting to live events…',
    open: 'Live: webhooks appear here as Drop Cowboy sends them.',
    reconnecting: 'Live events disconnected. Reconnecting…'
};

const TOAST_MS = 5000;

/** Shows a short message in the polite live region, then removes it. */
export function toast(text) {
    const box = document.getElementById('toasts');
    const item = h('div', { class: 'toast' }, text);
    box.appendChild(item);
    setTimeout(() => item.remove(), TOAST_MS);
}

function renderItem(item) {
    const title = item.contactId
        ? h('a', { href: '/contacts/' + encodeURIComponent(item.contactId) }, item.title)
        : h('strong', null, item.title);
    return h('li', null,
        title,
        item.detail ? h('div', null, item.detail) : null,
        h('div', { class: 'when' }, (item.source === 'webhook' ? 'Webhook · ' : 'Dock · ') + formatTime(item.at))
    );
}

/** Wires the activity sidebar: live webhooks from the server plus Dock events. */
export function startActivityFeed(crm) {
    const list = document.getElementById('activity-list');
    const status = document.getElementById('activity-status');

    crm.activity.subscribe((items, newest) => {
        show(list, items.map(renderItem));
        toast(newest.title + (newest.detail ? ': ' + newest.detail : ''));
    });

    return connectEvents({
        onEvent: (event) => crm.activity.add(fromWebhook(event)),
        onStatus: (state) => {
            status.textContent = STATUS_TEXT[state];
        }
    });
}
