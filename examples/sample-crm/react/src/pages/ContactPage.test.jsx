import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '@shared/errors.js';
import { fakeCrm, renderPage } from '../test/render.jsx';
import { ContactPage } from './ContactPage.jsx';
import { PipelinePage } from './PipelinePage.jsx';

const ADA = {
    id: '8f3e1a9c-2d4b-4e7a-9c1f-5b6a7c8d9e0f',
    first_name: 'Ada',
    last_name: 'Lovelace',
    main_phone: '+15555550101',
    email: 'ada@example.com',
    company: 'Analytical Engines'
};

// A team with no connected carrier: the session token (and with it the Dock)
// cannot be minted, but the contacts token can.
function crmWithoutCarrier(overrides) {
    const byoc = new AppError('byoc_required', 'Connect a carrier.', { status: 403 });
    return fakeCrm(Object.assign({
        contacts: { get: vi.fn().mockResolvedValue(ADA) },
        startDock: vi.fn().mockRejectedValue(byoc)
    }, overrides));
}

afterEach(cleanup);

describe('contacts pages without a connected carrier', () => {
    it('shows the contact and its card when the session mint fails with byoc_required', async () => {
        const crm = crmWithoutCarrier();
        const { container } = renderPage(<ContactPage />, { crm, path: '/contacts/' + ADA.id, route: '/contacts/:id' });

        expect(await screen.findByRole('heading', { level: 1, name: 'Ada Lovelace' })).toBeTruthy();
        await waitFor(() => expect(container.querySelector('dc-contact-card')).toBeTruthy());
        expect(screen.queryByRole('alert')).toBeNull();
        expect(crm.contacts.get).toHaveBeenCalledWith(ADA.id);
    });

    it('explains why Call is unavailable instead of breaking the page', async () => {
        renderPage(<ContactPage />, { crm: crmWithoutCarrier(), path: '/contacts/' + ADA.id, route: '/contacts/:id' });

        fireEvent.click(await screen.findByRole('button', { name: 'Call' }));

        // The app banner explains the missing carrier in full; the page points at it.
        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toMatch(/Calling and texting are off/);
        expect(alert.textContent).toMatch(/until you connect your carrier/);
        expect(screen.getByRole('link', { name: 'Setup: carrier' }).getAttribute('href')).toBe('/setup#connect_byoc');
        expect(screen.getByRole('heading', { level: 1, name: 'Ada Lovelace' })).toBeTruthy();
    });

    it('shows the pipeline board when the session mint fails with byoc_required', async () => {
        const crm = crmWithoutCarrier();
        const { container } = renderPage(<PipelinePage />, { crm });

        await waitFor(() => expect(container.querySelector('dc-pipeline-board')).toBeTruthy());
        expect(screen.queryByRole('alert')).toBeNull();
        expect(crm.startDock).not.toHaveBeenCalled();
    });
});
