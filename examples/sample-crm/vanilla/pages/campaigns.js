import { openCampaignHub } from '/shared/widgets.js';
import { h, show } from '../dom.js';
import { errorNotice, infoNotice, loading } from '../notice.js';

/**
 * Read-only campaign results, with a campaigns-only token. That token
 * cannot start, pause or create campaigns, so this page does not offer to.
 */
export async function renderCampaigns(main, { crm, isCurrent }) {
    const container = h('div', { class: 'widget' });
    show(main,
        h('h1', null, 'Campaigns'),
        h('p', { class: 'hint' }, 'A read-only view of your campaigns and their results. Start, pause and create campaigns in Drop Cowboy.'),
        container
    );

    if (!crm.tokens.supports('campaigns')) {
        show(container, infoNotice('Campaigns are not available in this mode',
            'mcp-session mode only has the session token. Run the sample in server or login mode to see campaigns.'));
        return undefined;
    }

    const status = loading('Loading campaigns…');
    container.before(status);
    let close;
    try {
        close = await openCampaignHub(crm, container);
    } catch (err) {
        show(container, errorNotice(err, crm));
        return undefined;
    } finally {
        status.remove();
    }
    if (!isCurrent()) {
        close();
        return undefined;
    }
    return close;
}
