import { connectContactWidget, contactWidgets } from '/shared/widgets.js';
import { h, show } from '../dom.js';
import { errorNotice, loading } from '../notice.js';

/**
 * The pipeline board loads the team's first board (or board-id) by itself,
 * with the contacts token manager. Opening a card opens that contact here.
 */
export async function renderPipeline(main, { crm, navigate, isCurrent }) {
    const slot = h('div', null, loading('Loading pipeline…'));
    show(main,
        h('h1', null, 'Pipeline'),
        h('p', { class: 'hint' }, 'Each column is a stage of your first pipeline. Drag a card to another column, or pick one from its Move to stage menu, to move the contact to that stage. Click a card to open the contact.'),
        slot
    );

    let tokenManager;
    try {
        ({ tokenManager } = await contactWidgets(crm, ['dc-pipeline-board']));
    } catch (err) {
        show(slot, errorNotice(err, crm));
        return undefined;
    }
    if (!isCurrent()) {
        return undefined;
    }

    const board = document.createElement('dc-pipeline-board');
    board.className = 'widget';
    connectContactWidget(board, crm, tokenManager);
    board.addEventListener('dc-open-contact', (event) => {
        const detail = event.detail || {};
        // This event names the id contactId; most others say contact_id.
        const id = detail.contact_id || detail.contactId;
        if (id) {
            navigate('/contacts/' + encodeURIComponent(id));
        }
    });
    show(slot, board);
    return undefined;
}
