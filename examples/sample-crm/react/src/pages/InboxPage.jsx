import { useState } from 'react';
import { getBusinessNumber } from '@shared/settings.js';
import { DcSharedInbox } from '../blocks/DcSharedInbox.jsx';
import { ErrorNotice, Loading } from '../components/Notice.jsx';
import { usePageTitle, useSessionWidgets } from '../hooks.js';

/** The shared inbox: every text conversation the team has through this app. */
export function InboxPage() {
    usePageTitle('Inbox');
    const from = getBusinessNumber();
    const [problem, setProblem] = useState(null);
    const { tokenManager, error } = useSessionWidgets(['dc-shared-inbox']);
    let body = <Loading label="Loading inbox…" />;
    if (error) {
        body = <ErrorNotice error={error} />;
    } else if (tokenManager) {
        body = (
            <DcSharedInbox
                tokenManager={tokenManager}
                from={from}
                onError={(event) => setProblem(event.detail)}
                onSelectConversation={() => setProblem(null)}
            />
        );
    }
    return (
        <>
            <h1>Inbox</h1>
            {/* Asked for only once the inbox can load: without a carrier a business number would not help. */}
            {!from && tokenManager && <ErrorNotice error={{ code: 'business_number_missing' }} />}
            {problem && <ErrorNotice error={problem} />}
            {body}
        </>
    );
}
