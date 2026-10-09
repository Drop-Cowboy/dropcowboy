import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fromWebhook } from '@shared/activity.js';
import { connectEvents } from '@shared/events.js';
import { formatTime } from '@shared/format.js';
import { useCrm } from '../crm-context.js';
import { useToast } from './Toasts.jsx';

const STATUS_TEXT = {
    connecting: 'Connecting to live events…',
    open: 'Live: webhooks appear here as Drop Cowboy sends them.',
    reconnecting: 'Live events disconnected. Reconnecting…'
};

function ActivityItem({ item }) {
    return (
        <li>
            {item.contactId
                ? <Link to={'/contacts/' + encodeURIComponent(item.contactId)}>{item.title}</Link>
                : <strong>{item.title}</strong>}
            {item.detail && <div>{item.detail}</div>}
            <div className="when">{(item.source === 'webhook' ? 'Webhook · ' : 'Dock · ') + formatTime(item.at)}</div>
        </li>
    );
}

/** The activity sidebar: live webhooks from the server plus Dock events. */
export function ActivityFeed() {
    const crm = useCrm();
    const toast = useToast();
    const [items, setItems] = useState(() => crm.activity.items());
    const [status, setStatus] = useState('connecting');

    useEffect(() => {
        return crm.activity.subscribe((list, newest) => {
            setItems(list);
            toast(newest.title + (newest.detail ? ': ' + newest.detail : ''));
        });
    }, [crm, toast]);

    useEffect(() => {
        const events = connectEvents({
            onEvent: (event) => crm.activity.add(fromWebhook(event)),
            onStatus: setStatus
        });
        return () => events.close();
    }, [crm]);

    return (
        <aside className="activity card" aria-labelledby="activity-title">
            <h2 id="activity-title">Activity</h2>
            <p className="hint">{STATUS_TEXT[status]}</p>
            <ol aria-label="Recent activity">
                {items.map((item) => <ActivityItem item={item} key={item.id} />)}
            </ol>
        </aside>
    );
}
