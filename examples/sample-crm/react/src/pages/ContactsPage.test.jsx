import { cleanup, fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '@shared/errors.js';
import { fakeCrm, renderPage } from '../test/render.jsx';
import { ContactsPage } from './ContactsPage.jsx';

const ADA = {
    id: '8f3e1a9c-2d4b-4e7a-9c1f-5b6a7c8d9e0f',
    first_name: 'Ada',
    last_name: 'Lovelace',
    main_phone: '+15555550101',
    email: 'ada@example.com',
    company: 'Analytical Engines'
};

afterEach(cleanup);

describe('ContactsPage', () => {
    it('lists contacts with links to each one', async () => {
        const find = vi.fn().mockResolvedValue({ contacts: [ADA], total: 1 });
        renderPage(<ContactsPage />, { crm: fakeCrm({ contacts: { find } }) });

        const link = await screen.findByRole('link', { name: 'Ada Lovelace' });
        expect(link.getAttribute('href')).toBe('/contacts/' + ADA.id);
        expect(screen.getByText('Showing 1–1 of 1')).toBeTruthy();
        expect(find).toHaveBeenCalledWith('', { offset: 0, limit: 25 });
    });

    it('searches with the text typed into the search box', async () => {
        const find = vi.fn().mockResolvedValue({ contacts: [], total: 0 });
        renderPage(<ContactsPage />, { crm: fakeCrm({ contacts: { find } }) });

        fireEvent.change(screen.getByLabelText('Search contacts'), { target: { value: '  ada@example.com ' } });
        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        expect(await screen.findByText('No contact matches "ada@example.com".')).toBeTruthy();
        expect(find).toHaveBeenLastCalledWith('ada@example.com', { offset: 0, limit: 25 });
    });

    it('explains a refused token instead of showing a raw error', async () => {
        const find = vi.fn().mockRejectedValue(new AppError('unauthorized', 'Unauthorized', { status: 401 }));
        renderPage(<ContactsPage />, { crm: fakeCrm({ contacts: { find } }) });

        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toMatch(/Session expired/);
        expect(alert.textContent).not.toMatch(/Unauthorized/);
    });

    it('lists contacts when the session mint fails with byoc_required', async () => {
        const find = vi.fn().mockResolvedValue({ contacts: [ADA], total: 1 });
        const startDock = vi.fn().mockRejectedValue(new AppError('byoc_required', 'Connect a carrier.', { status: 403 }));
        renderPage(<ContactsPage />, { crm: fakeCrm({ contacts: { find }, startDock }) });

        expect(await screen.findByRole('link', { name: 'Ada Lovelace' })).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
    });

    it('opens the new contact after adding it', async () => {
        const find = vi.fn().mockResolvedValue({ contacts: [], total: 0 });
        const create = vi.fn().mockResolvedValue({ contact_id: ADA.id, created: true });
        renderPage(<ContactsPage />, { crm: fakeCrm({ contacts: { find, create } }) });

        fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Ada' } });
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '(555) 555-0101' } });
        fireEvent.click(screen.getByRole('button', { name: 'Add contact' }));

        expect(await screen.findByText('Navigated away')).toBeTruthy();
        expect(create.mock.calls[0][0]).toMatchObject({ first_name: 'Ada', main_phone: '(555) 555-0101' });
    });
});
