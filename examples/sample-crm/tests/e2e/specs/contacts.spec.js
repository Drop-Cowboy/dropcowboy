import { expectAccessible } from '../support/a11y.js';
import { ADA, GRACE, KATHERINE } from '../support/data.js';
import { test, expect } from '../support/test.js';

// The Contacts page is the headless REST API: no widget, just fetch calls
// with the contacts token.

test.describe('Contacts page', () => {
    test('lists the account\'s contacts', async ({ page, app }) => {
        await app.goto('/contacts');

        const table = page.getByRole('table', { name: 'Contacts' });
        await expect(table.getByRole('link', { name: 'Ada Lovelace' })).toBeVisible();
        await expect(table.getByRole('link', { name: 'Grace Hopper' })).toBeVisible();
        await expect(table.getByRole('link', { name: 'Katherine Johnson' })).toBeVisible();
        await expect(page.getByText('Showing 1–3 of 3')).toBeVisible();

        await expectAccessible(page);
    });

    test('searches by name, and finds an exact email', async ({ page, app, dropcowboy }) => {
        await app.goto('/contacts');
        const table = page.getByRole('table', { name: 'Contacts' });
        await expect(table.getByRole('link', { name: 'Ada Lovelace' })).toBeVisible();

        await page.getByLabel('Search contacts').fill('Hopper');
        await page.getByRole('button', { name: 'Search' }).click();
        await expect(table.getByRole('link')).toHaveText(['Grace Hopper']);
        expect(dropcowboy.callsTo('GET', '/contact/public/contacts').at(-1).query.search_term).toBe('Hopper');

        await page.getByLabel('Search contacts').fill(KATHERINE.email);
        await page.getByRole('button', { name: 'Search' }).click();
        await expect(table.getByRole('link')).toHaveText(['Katherine Johnson']);
        expect(dropcowboy.callsTo('GET', '/contact/public/contacts/search').at(-1).query).toEqual({ email: KATHERINE.email });
    });

    test('adds a contact and opens it', async ({ page, app, dropcowboy }) => {
        await app.goto('/contacts');

        await page.getByLabel('First name').fill('Mary');
        await page.getByLabel('Last name').fill('Jackson');
        await page.getByLabel('Phone').fill('(312) 555-0145');
        await page.getByLabel('Email').fill('mary@example.com');
        await page.getByLabel('Company').fill('Wind Tunnel Labs');
        await page.getByRole('button', { name: 'Add contact' }).click();

        await expect(page.getByRole('heading', { name: 'Mary Jackson', level: 1 })).toBeVisible();
        const [create] = dropcowboy.callsTo('POST', '/contact/public/contacts');
        expect(create.body).toEqual({
            fields: [{ type: 'first_name' }, { type: 'last_name' }, { type: 'email' }, { type: 'main_phone' }, { type: 'company' }],
            values: [['Mary', 'Jackson', 'mary@example.com', '+13125550145', 'Wind Tunnel Labs']],
            conflict_mode: 'append',
            fire_webhook_events: true
        });
        const created = [...dropcowboy.contacts.values()].find((c) => c.email === 'mary@example.com');
        await expect(page).toHaveURL(app.url('/contacts/' + created.contact_id));
    });

    test('opens the existing contact instead of adding a duplicate', async ({ page, app }) => {
        await app.goto('/contacts');

        await page.getByLabel('First name').fill('Grace');
        await page.getByLabel('Phone').fill(GRACE.main_phone);
        await page.getByRole('button', { name: 'Add contact' }).click();

        await expect(page).toHaveURL(app.url('/contacts/' + GRACE.contact_id + '?existing=1'));
        await expect(page.getByText('Already in your contacts')).toBeVisible();
    });

    test('a refused contacts token is refreshed exactly once, then the call succeeds', async ({ page, app, dropcowboy }) => {
        await app.goto('/contacts');
        const table = page.getByRole('table', { name: 'Contacts' });
        await expect(table.getByRole('link', { name: ADA.first_name + ' ' + ADA.last_name })).toBeVisible();
        const mintsBefore = dropcowboy.mintsFor('contacts').length;

        // The token the page holds stops working, as if it had expired early.
        dropcowboy.revokeTokens('contacts');
        await page.getByLabel('Search contacts').fill('Lovelace');
        await page.getByRole('button', { name: 'Search' }).click();

        await expect(table.getByRole('link')).toHaveText(['Ada Lovelace']);
        expect(dropcowboy.mintsFor('contacts').length - mintsBefore).toBe(1);
        const searches = dropcowboy.callsTo('GET', '/contact/public/contacts').filter((c) => c.query.search_term === 'Lovelace');
        expect(searches.map((c) => c.status)).toEqual([401, 200]);
    });
});
