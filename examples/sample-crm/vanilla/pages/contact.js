import { changedFields } from '/shared/contacts-api.js';
import { contactName } from '/shared/format.js';
import { callContact, connectContactWidget, contactWidgets, focusContact, textContact } from '/shared/widgets.js';
import { toast } from '../activity.js';
import { consentForm } from '../consent-form.js';
import { contactForm } from '../contact-form.js';
import { h, show } from '../dom.js';
import { errorNotice, infoNotice, loading } from '../notice.js';

function deleteDialog(contact, onConfirm) {
    const cancel = h('button', { type: 'button', autofocus: true }, 'Cancel');
    const confirm = h('button', { type: 'button', class: 'danger' }, 'Delete contact');
    const dialog = h('dialog', { 'aria-labelledby': 'delete-title' },
        h('h2', { id: 'delete-title' }, 'Delete ' + contactName(contact) + '?'),
        h('p', null, 'The contact is removed from Drop Cowboy. This cannot be undone here.'),
        h('div', { class: 'actions' }, cancel, confirm)
    );
    cancel.addEventListener('click', () => dialog.close());
    confirm.addEventListener('click', () => {
        dialog.close();
        onConfirm();
    });
    dialog.addEventListener('close', () => dialog.remove());
    return dialog;
}

/**
 * One contact: the editable fields come from the REST API, and the Drop
 * Cowboy contact card (with its activity timeline) shows what happened with
 * them. Call and Text hand the contact to the Dock.
 */
export async function renderContact(main, { crm, params, navigate, isCurrent }) {
    show(main, loading('Loading contact…'));
    let contact = await crm.contacts.get(params.id);
    if (!isCurrent()) {
        return undefined;
    }
    if (!contact) {
        show(main, h('h1', null, 'Contact not found'), h('p', null, 'No contact has that id. It may have been deleted.'), h('a', { href: '/contacts' }, 'Back to contacts'));
        return undefined;
    }

    const heading = h('h1', null, contactName(contact));
    const problems = h('div');
    const card = document.createElement('dc-contact-card');
    card.className = 'widget';
    const cardSlot = h('section', { class: 'card', 'aria-label': 'Drop Cowboy contact card' }, loading('Loading contact card…'));

    async function run(action) {
        problems.replaceChildren();
        try {
            await action();
        } catch (err) {
            show(problems, errorNotice(err, crm));
        }
    }

    function confirmDelete() {
        const dialog = deleteDialog(contact, () => run(async () => {
            await crm.contacts.remove(contact.id);
            toast('Deleted ' + contactName(contact));
            navigate('/contacts');
        }));
        document.body.appendChild(dialog);
        dialog.showModal();
    }

    const form = contactForm({
        crm,
        values: contact,
        submitLabel: 'Save changes',
        onSubmit: async (values) => {
            contact = await crm.contacts.update(contact.id, changedFields(contact, values));
            heading.textContent = contactName(contact);
            // The card reloads when its contactId changes, so bounce it.
            card.contactId = '';
            card.contactId = contact.id;
            toast('Saved ' + contactName(contact));
        }
    });

    const consent = consentForm({
        crm,
        getContact: () => contact,
        onRecorded: () => {
            card.contactId = '';
            card.contactId = contact.id;
            toast('Recorded consent for ' + contactName(contact));
        }
    });

    const existed = new URLSearchParams(location.search).get('existing') === '1';
    show(main,
        h('p', null, h('a', { href: '/contacts' }, '← All contacts')),
        heading,
        existed ? infoNotice('Already in your contacts', 'A contact with that phone or email already existed, so it was opened instead. Its empty fields were filled in.') : null,
        problems,
        h('div', { class: 'actions card' },
            h('button', { type: 'button', class: 'primary', disabled: !contact.main_phone, onclick: () => run(() => callContact(crm, contact)) }, 'Call'),
            h('button', { type: 'button', disabled: !contact.main_phone, onclick: () => run(() => textContact(crm, contact)) }, 'Text'),
            h('button', { type: 'button', class: 'danger', onclick: confirmDelete }, 'Delete'),
            contact.main_phone ? null : h('span', { class: 'hint' }, 'Add a phone number to call or text.')
        ),
        cardSlot,
        consent,
        h('h2', null, 'Edit details'),
        form
    );

    // The card loads the contact and its timeline itself, with the contacts
    // token manager. Its own Call and Text buttons fire events; they do the
    // same as the buttons above.
    card.addEventListener('dc-call', () => run(() => callContact(crm, contact)));
    card.addEventListener('dc-text', () => run(() => textContact(crm, contact)));
    card.addEventListener('dc-add-campaign', () => toast('Campaigns are read-only in this sample. Add contacts to campaigns in Drop Cowboy.'));

    // The Dock follows the contact on screen. If calling is not set up yet the
    // banner already says why, and the rest of this page works without it.
    focusContact(crm, contact).catch(() => {});

    try {
        const { tokenManager } = await contactWidgets(crm, ['dc-contact-card']);
        if (!isCurrent()) {
            return undefined;
        }
        connectContactWidget(card, crm, tokenManager);
        card.contactId = contact.id;
        show(cardSlot, card);
    } catch (err) {
        show(cardSlot, errorNotice(err, crm));
    }

    return () => {
        focusContact(crm, null).catch(() => {});
    };
}
