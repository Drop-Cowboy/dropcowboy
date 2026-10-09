import { useNavigate } from 'react-router';
import { DcPipelineBoard } from '../blocks/DcPipelineBoard.jsx';
import { ErrorNotice, Loading } from '../components/Notice.jsx';
import { useContactWidgets, usePageTitle } from '../hooks.js';

/** The pipeline board. Opening a card opens that contact here. */
export function PipelinePage() {
    usePageTitle('Pipeline');
    const navigate = useNavigate();
    const { tokenManager, error } = useContactWidgets(['dc-pipeline-board']);
    let body = <Loading label="Loading pipeline…" />;
    if (error) {
        body = <ErrorNotice error={error} />;
    } else if (tokenManager) {
        body = <DcPipelineBoard tokenManager={tokenManager} onOpenContact={(id) => navigate('/contacts/' + encodeURIComponent(id))} />;
    }
    return (
        <>
            <h1>Pipeline</h1>
            <p className="hint">Each column is a stage of your first pipeline. Drag a card to another column, or pick one from its Move to stage menu, to move the contact to that stage. Click a card to open the contact.</p>
            {body}
        </>
    );
}
