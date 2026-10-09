import { ADA } from '../support/data.js';
import { test, expect } from '../support/test.js';
import { deliverWebhook } from '../support/webhook.js';

// Drop Cowboy POSTs signed webhooks to the server; the server checks the
// signature and pushes each event to open pages over Server-Sent Events.

test.describe('Activity feed', () => {
    test('shows a signed webhook as it arrives', async ({ page, app, sampleServer, secrets }) => {
        await app.goto('/contacts');
        const feed = page.getByRole('list', { name: 'Recent activity' });
        await expect(page.getByText('Live: webhooks appear here')).toBeVisible();

        const delivery = await deliverWebhook(sampleServer.url, secrets.webhookSecret, {
            event: 'contact.msg.received',
            data: { contact_id: ADA.contact_id, from: ADA.main_phone, body: 'See you Thursday.' }
        });
        expect(delivery.status).toBe(200);

        const item = feed.getByRole('listitem').filter({ hasText: 'Text received' });
        await expect(item).toContainText(ADA.main_phone);
        await item.getByRole('link', { name: 'Text received' }).click();
        await expect(page).toHaveURL(app.url('/contacts/' + ADA.contact_id));
    });

    test('ignores a webhook signed with the wrong secret', async ({ page, app, sampleServer }) => {
        await app.goto('/contacts');
        await expect(page.getByText('Live: webhooks appear here')).toBeVisible();

        const forged = await deliverWebhook(sampleServer.url, 'not-the-webhook-secret', {
            event: 'contact.deleted',
            data: { contact_id: ADA.contact_id }
        });

        expect(forged.status).toBe(401);
        await page.waitForTimeout(500);
        await expect(page.getByRole('list', { name: 'Recent activity' }).getByText('Contact deleted')).toHaveCount(0);
    });
});
