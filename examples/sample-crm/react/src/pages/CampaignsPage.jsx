import { CampaignHub } from '../blocks/CampaignHub.jsx';
import { InfoNotice } from '../components/Notice.jsx';
import { useCrm } from '../crm-context.js';
import { usePageTitle } from '../hooks.js';

/**
 * Read-only campaign results, with a campaigns-only token. That token
 * cannot start, pause or create campaigns, so this page does not offer to.
 */
export function CampaignsPage() {
    usePageTitle('Campaigns');
    const crm = useCrm();
    return (
        <>
            <h1>Campaigns</h1>
            <p className="hint">A read-only view of your campaigns and their results. Start, pause and create campaigns in Drop Cowboy.</p>
            {crm.tokens.supports('campaigns')
                ? <CampaignHub />
                : (
                    <InfoNotice title="Campaigns are not available in this mode">
                        mcp-session mode only has the session token. Run the sample in server or login mode to see campaigns.
                    </InfoNotice>
                )}
        </>
    );
}
