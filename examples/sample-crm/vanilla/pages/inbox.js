import { getBusinessNumber } from '/shared/settings.js';
import { connectInbox, sessionWidgets } from '/shared/widgets.js';
import { h, show } from '../dom.js';
import { errorNotice, loading } from '../notice.js';

/** The shared inbox: every text conversation the team has through this app. */
export async function renderInbox(main, { crm, isCurrent }) {
    const problems = h('div');
    const slot = h('div', null, loading('Loading inbox…'));
    show(main, h('h1', null, 'Inbox'), problems, slot);

    let tokenManager;
    try {
        ({ tokenManager } = await sessionWidgets(crm, ['dc-shared-inbox']));
    } catch (err) {
        show(slot, errorNotice(err, crm));
        return undefined;
    }
    if (!isCurrent()) {
        return undefined;
    }

    const inbox = document.createElement('dc-shared-inbox');
    inbox.className = 'widget';
    connectInbox(inbox, crm, tokenManager);
    // A refused reply (consent, opt-out, funds) arrives as dc-error with a code.
    inbox.addEventListener('dc-error', (event) => show(problems, errorNotice(event.detail, crm)));
    inbox.addEventListener('dc-select-conversation', () => problems.replaceChildren());
    // Asked for only once the inbox can load: without a carrier a business
    // number would not help.
    show(slot, getBusinessNumber() ? null : errorNotice({ code: 'business_number_missing' }, crm), inbox);
    return undefined;
}
