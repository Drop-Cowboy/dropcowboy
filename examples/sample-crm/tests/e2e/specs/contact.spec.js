import { expectAccessible } from '../support/a11y.js';
import { ADA, BUSINESS_NUMBER } from '../support/data.js';
import { test, expect } from '../support/test.js';

// The contact card has Call and Text buttons of its own, further down the
// page; these are the sample's, at the top.
function sampleButton(page, name) {
    return page.getByRole('button', { name, exact: true }).first();
}

// One contact: its fields come from the REST API, the Drop Cowboy contact
// card shows its timeline, and Call / Text hand the contact to the Dock.

test.describe('Contact page', () => {
    test('shows the Drop Cowboy contact card with its timeline', async ({ page, app }) => {
        await app.goto('/contacts/' + ADA.contact_id);

        await expect(page.getByRole('heading', { name: 'Ada Lovelace', level: 1 })).toBeVisible();
        const card = page.getByRole('region', { name: 'Drop Cowboy contact card' }).locator('dc-contact-card');
        await expect(card).toContainText('Ada Lovelace');
        await expect(card).toContainText('Asked for a callback next week.');

        await expectAccessible(page);
    });

    test('saves only the fields that changed, as top-level standard fields', async ({ page, app, dropcowboy }) => {
        await app.goto('/contacts/' + ADA.contact_id);

        await page.getByLabel('Company').fill('Difference Engines');
        await page.getByRole('button', { name: 'Save changes' }).click();

        await expect(app.toasts).toContainText('Saved Ada Lovelace');
        const [save] = dropcowboy.callsTo('PUT', '/contact/public/contacts/' + ADA.contact_id);
        expect(save.body).toEqual({ company: 'Difference Engines' });
        expect(dropcowboy.contacts.get(ADA.contact_id).company).toBe('Difference Engines');
    });

    test('records the consent a contact gave, one record per channel', async ({ page, app, dropcowboy }) => {
        await app.goto('/contacts/' + ADA.contact_id);
        const form = page.getByRole('form', { name: 'Record consent' });

        await form.getByRole('button', { name: 'Record consent' }).click();
        await expect(form.getByRole('alert')).toContainText('Choose texts, calls, or both.');
        expect(dropcowboy.callsTo('POST', '/contact/public/contacts/' + ADA.contact_id + '/consent')).toHaveLength(0);

        await form.getByLabel('Texts').check();
        await form.getByLabel('Calls').check();
        await form.getByLabel('How they agreed').selectOption('phone');
        await form.getByLabel('What they agreed to').fill('Yes, you can text and call me about my order.');
        await form.getByRole('button', { name: 'Record consent' }).click();

        await expect(app.toasts).toContainText('Recorded consent for Ada Lovelace');
        const sends = dropcowboy.callsTo('POST', '/contact/public/contacts/' + ADA.contact_id + '/consent');
        expect(sends.map((s) => s.body)).toEqual([
            { consent_type: 'sms_optin', phone_number: ADA.main_phone, consent_text: 'Yes, you can text and call me about my order.', consent_method: 'phone' },
            { consent_type: 'tcpa_optin', phone_number: ADA.main_phone, consent_text: 'Yes, you can text and call me about my order.', consent_method: 'phone' }
        ]);
        expect(dropcowboy.contacts.get(ADA.contact_id)).toMatchObject({ has_sms_consent: true, has_tcpa_consent: true });
        await expect(form.getByLabel('What they agreed to')).toHaveValue('');

        await expectAccessible(page);
    });

    test('asks before deleting, and deletes only once confirmed', async ({ page, app, dropcowboy }) => {
        await app.goto('/contacts/' + ADA.contact_id);
        await expect(page.getByRole('heading', { name: 'Ada Lovelace', level: 1 })).toBeVisible();

        await sampleButton(page, 'Delete').click();
        const dialog = page.getByRole('dialog', { name: 'Delete Ada Lovelace?' });
        await expect(dialog).toBeVisible();
        await expectAccessible(page);
        await dialog.getByRole('button', { name: 'Cancel' }).click();
        await expect(dialog).toBeHidden();
        expect(dropcowboy.callsTo('DELETE', '/contact/public/contacts/')).toEqual([]);

        await sampleButton(page, 'Delete').click();
        await page.getByRole('dialog').getByRole('button', { name: 'Delete contact' }).click();

        await expect(page).toHaveURL(app.url('/contacts'));
        await expect(app.toasts).toContainText('Deleted Ada Lovelace');
        expect(dropcowboy.callsTo('DELETE', '/contact/public/contacts/' + ADA.contact_id)).toHaveLength(1);
        await expect(page.getByRole('table', { name: 'Contacts' }).getByRole('link', { name: 'Ada Lovelace' })).toHaveCount(0);
    });

    test('Call hands the contact to the Dock by id and number', async ({ page, app }) => {
        await app.goto('/contacts/' + ADA.contact_id);
        await app.watchDock();

        await sampleButton(page, 'Call').click();

        await expect.poll(app.dockCalls).toEqual([
            { method: 'dial', target: { contact_id: ADA.contact_id, phone: ADA.main_phone } }
        ]);
    });

    test('Text hands the contact to the Dock once a business number is set', async ({ page, app }) => {
        await app.useBusinessNumber(BUSINESS_NUMBER);
        await app.goto('/contacts/' + ADA.contact_id);
        await app.watchDock();

        await sampleButton(page, 'Text').click();

        await expect.poll(app.dockCalls).toEqual([
            { method: 'text', target: { contact_id: ADA.contact_id, phone: ADA.main_phone } }
        ]);
    });

    test('Text explains that a business number is needed first', async ({ page, app }) => {
        await app.goto('/contacts/' + ADA.contact_id);
        await app.watchDock();

        await sampleButton(page, 'Text').click();

        await expect(page.getByRole('main')).toContainText('business number');
        expect(await app.dockCalls()).toEqual([]);
    });
});
