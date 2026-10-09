import { contactName, formatPhone } from '/shared/format.js';
import { contactForm } from '../contact-form.js';
import { h, show } from '../dom.js';
import { errorNotice, loading } from '../notice.js';

const PAGE_SIZE = 25;

function contactRow(contact) {
    return h('tr', null,
        h('td', null, h('a', { href: '/contacts/' + encodeURIComponent(contact.id) }, contactName(contact))),
        h('td', null, formatPhone(contact.main_phone)),
        h('td', null, contact.email),
        h('td', null, contact.company)
    );
}

function contactTable(contacts) {
    return h('table', null,
        h('caption', { class: 'visually-hidden' }, 'Contacts'),
        h('thead', null, h('tr', null,
            h('th', { scope: 'col' }, 'Name'),
            h('th', { scope: 'col' }, 'Phone'),
            h('th', { scope: 'col' }, 'Email'),
            h('th', { scope: 'col' }, 'Company')
        )),
        h('tbody', null, contacts.map(contactRow))
    );
}

/** Contacts: search, page through, and add. All of it is the headless REST API. */
export function renderContacts(main, { crm, navigate }) {
    const results = h('div', { 'aria-live': 'polite' });
    const query = { text: '', offset: 0 };
    let latest = 0;

    async function load() {
        const id = ++latest;
        show(results, loading('Loading contacts…'));
        try {
            const page = await crm.contacts.find(query.text, { offset: query.offset, limit: PAGE_SIZE });
            if (id === latest) {
                show(results, resultsView(page));
            }
        } catch (err) {
            if (id === latest) {
                show(results, errorNotice(err, crm));
            }
        }
    }

    function resultsView(page) {
        if (!page.contacts.length) {
            return h('p', null, query.text ? 'No contact matches "' + query.text + '".' : 'No contacts yet. Add one below.');
        }
        const from = query.offset + 1;
        const to = query.offset + page.contacts.length;
        return h('div', null,
            h('p', { class: 'hint' }, 'Showing ' + from + '–' + to + ' of ' + page.total),
            contactTable(page.contacts),
            h('div', { class: 'actions pager' },
                h('button', { type: 'button', disabled: query.offset === 0, onclick: () => turn(-PAGE_SIZE) }, 'Previous'),
                h('button', { type: 'button', disabled: to >= page.total, onclick: () => turn(PAGE_SIZE) }, 'Next')
            )
        );
    }

    function turn(delta) {
        query.offset = Math.max(0, query.offset + delta);
        load();
    }

    const searchInput = h('input', { id: 'contact-search', type: 'search', name: 'q', autocomplete: 'off' });
    const searchForm = h('form', { class: 'search-row', role: 'search' },
        h('div', { class: 'field' },
            h('label', { for: 'contact-search' }, 'Search contacts'),
            searchInput
        ),
        h('button', { type: 'submit' }, 'Search')
    );
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        query.text = searchInput.value.trim();
        query.offset = 0;
        load();
    });

    const createForm = contactForm({
        crm,
        submitLabel: 'Add contact',
        onSubmit: async (values) => {
            const result = await crm.contacts.create(values);
            navigate('/contacts/' + encodeURIComponent(result.contact_id) + (result.created ? '' : '?existing=1'));
        }
    });

    show(main,
        h('h1', null, 'Contacts'),
        h('div', { class: 'card' },
            searchForm,
            h('p', { class: 'hint' }, 'A full email or phone number finds that exact contact. Anything else searches names and other fields.')
        ),
        results,
        h('h2', null, 'Add a contact'),
        h('p', { class: 'hint' }, 'Every contact needs a phone number or an email. If one already exists with the same phone or email, it is opened instead.'),
        createForm
    );
    load();
}
