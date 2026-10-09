import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { changedFields } from '@shared/contacts-api.js';
import { contactName } from '@shared/format.js';
import { callContact, focusContact, textContact } from '@shared/widgets.js';
import { DcContactCard } from '../blocks/DcContactCard.jsx';
import { ConsentForm } from '../components/ConsentForm.jsx';
import { ContactForm } from '../components/ContactForm.jsx';
import { ErrorNotice, InfoNotice, Loading } from '../components/Notice.jsx';
import { useToast } from '../components/Toasts.jsx';
import { useCrm } from '../crm-context.js';
import { useContactWidgets, usePageTitle } from '../hooks.js';

function DeleteDialog({ contact, open, onCancel, onConfirm }) {
    const ref = useRef(null);
    useEffect(() => {
        const dialog = ref.current;
        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);
    return (
        <dialog ref={ref} aria-labelledby="delete-title" onClose={onCancel}>
            <h2 id="delete-title">Delete {contactName(contact)}?</h2>
            <p>The contact is removed from Drop Cowboy. This cannot be undone here.</p>
            <div className="actions">
                <button type="button" autoFocus onClick={onCancel}>Cancel</button>
                <button type="button" className="danger" onClick={onConfirm}>Delete contact</button>
            </div>
        </dialog>
    );
}

/**
 * The Drop Cowboy contact card. It loads the contact and its timeline itself
 * with the contacts token manager; `version` changes after a save so it reloads.
 */
function ContactCard({ contact, version, onCall, onText }) {
    const toast = useToast();
    const { tokenManager, error } = useContactWidgets(['dc-contact-card']);
    let body = <Loading label="Loading contact card…" />;
    if (error) {
        body = <ErrorNotice error={error} />;
    } else if (tokenManager) {
        body = (
            <DcContactCard
                key={version}
                contactId={contact.id}
                tokenManager={tokenManager}
                onCall={onCall}
                onText={onText}
                onAddCampaign={() => toast('Campaigns are read-only in this sample. Add contacts to campaigns in Drop Cowboy.')}
            />
        );
    }
    return <section className="card" aria-label="Drop Cowboy contact card">{body}</section>;
}

/**
 * One contact: the editable fields come from the REST API, and the Drop
 * Cowboy contact card (with its activity timeline) shows what happened with
 * them. Call and Text hand the contact to the Dock.
 */
function ContactDetail({ initial }) {
    const crm = useCrm();
    const toast = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [contact, setContact] = useState(initial);
    const [version, setVersion] = useState(0);
    const [problem, setProblem] = useState(null);
    const [confirming, setConfirming] = useState(false);
    usePageTitle(contactName(contact));

    // The Dock follows the contact on screen, and lets go when the page closes.
    // If calling is not set up yet the banner already says why, and the rest
    // of this page works without the Dock.
    useEffect(() => {
        focusContact(crm, initial).catch(() => {});
        return () => {
            focusContact(crm, null).catch(() => {});
        };
    }, [crm, initial]);

    async function run(action) {
        setProblem(null);
        try {
            await action();
        } catch (err) {
            setProblem(err);
        }
    }

    const call = () => run(() => callContact(crm, contact));
    const text = () => run(() => textContact(crm, contact));

    function remove() {
        setConfirming(false);
        run(async () => {
            await crm.contacts.remove(contact.id);
            toast('Deleted ' + contactName(contact));
            navigate('/contacts');
        });
    }

    async function save(values) {
        const saved = await crm.contacts.update(contact.id, changedFields(contact, values));
        setContact(saved);
        setVersion(version + 1);
        toast('Saved ' + contactName(saved));
    }

    function recorded() {
        setVersion((v) => v + 1);
        toast('Recorded consent for ' + contactName(contact));
    }

    return (
        <>
            <p><Link to="/contacts">← All contacts</Link></p>
            <h1>{contactName(contact)}</h1>
            {searchParams.get('existing') === '1' && (
                <InfoNotice title="Already in your contacts">
                    A contact with that phone or email already existed, so it was opened instead. Its empty fields were filled in.
                </InfoNotice>
            )}
            {problem && <ErrorNotice error={problem} />}
            <div className="actions card">
                <button type="button" className="primary" disabled={!contact.main_phone} onClick={call}>Call</button>
                <button type="button" disabled={!contact.main_phone} onClick={text}>Text</button>
                <button type="button" className="danger" onClick={() => setConfirming(true)}>Delete</button>
                {!contact.main_phone && <span className="hint">Add a phone number to call or text.</span>}
            </div>
            <ContactCard contact={contact} version={version} onCall={call} onText={text} />
            <ConsentForm contact={contact} onRecorded={recorded} />
            <h2>Edit details</h2>
            <ContactForm values={contact} submitLabel="Save changes" onSubmit={save} />
            <DeleteDialog contact={contact} open={confirming} onCancel={() => setConfirming(false)} onConfirm={remove} />
        </>
    );
}

export function ContactPage() {
    usePageTitle('Contact');
    const crm = useCrm();
    const { id } = useParams();
    const [state, setState] = useState({ id: null, contact: null, error: null });

    useEffect(() => {
        let current = true;
        crm.contacts.get(id).then(
            (contact) => current && setState({ id, contact, error: null }),
            (error) => current && setState({ id, contact: null, error })
        );
        return () => {
            current = false;
        };
    }, [crm, id]);

    if (state.id !== id) {
        return <Loading label="Loading contact…" />;
    }
    if (state.error) {
        return (
            <>
                <h1>This contact could not load</h1>
                <ErrorNotice error={state.error} />
            </>
        );
    }
    if (!state.contact) {
        return (
            <>
                <h1>Contact not found</h1>
                <p>No contact has that id. It may have been deleted.</p>
                <Link to="/contacts">Back to contacts</Link>
            </>
        );
    }
    return <ContactDetail key={id} initial={state.contact} />;
}
