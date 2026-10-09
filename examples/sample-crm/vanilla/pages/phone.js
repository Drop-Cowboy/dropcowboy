import { startPhoneHub } from '/shared/widgets.js';
import { toast } from '../activity.js';
import { h, show } from '../dom.js';
import { errorNotice, infoNotice, loading } from '../notice.js';

/**
 * Phone numbers and routing. This is the only page with the phone token,
 * because it can rent numbers, which costs money. Renting asks first.
 */
export async function renderPhone(main, { crm, isCurrent }) {
    const hubSlot = h('div', null, loading('Loading phone hub…'));
    const pickerSection = h('section', { 'aria-labelledby': 'get-number-title', tabindex: '-1' },
        h('h2', { id: 'get-number-title' }, 'Get a number')
    );
    show(main,
        h('h1', null, 'Phone'),
        h('p', { class: 'hint' }, 'Your numbers and where calls to them go. Getting a number charges your account, so you are asked to confirm first.'),
        hubSlot,
        pickerSection
    );

    if (!crm.tokens.supports('phone')) {
        show(hubSlot, infoNotice('Phone is not available in this mode',
            'mcp-session mode only has the session token. Run the sample in server or login mode to manage numbers.'));
        pickerSection.remove();
        return undefined;
    }

    const hub = document.createElement('dc-phone-hub');
    hub.className = 'widget';
    let close;
    try {
        close = await startPhoneHub(crm, hub);
    } catch (err) {
        show(hubSlot, errorNotice(err, crm));
        pickerSection.remove();
        return undefined;
    }
    if (!isCurrent()) {
        close();
        return undefined;
    }
    show(hubSlot, hub);

    // Added after init, so the phone bundle hands it the session itself.
    const picker = document.createElement('dc-number-picker');
    picker.className = 'widget';
    pickerSection.appendChild(picker);

    hub.addEventListener('dc-number-add', () => pickerSection.focus());
    picker.addEventListener('dc-number-purchased', (event) => {
        const number = event.detail && event.detail.number;
        toast('Number added: ' + ((number && (number.display || number.number)) || 'new number'));
    });

    return close;
}
