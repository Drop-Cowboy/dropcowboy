import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { contactName, formatPhone } from '@shared/format.js';
import { ContactForm } from '../components/ContactForm.jsx';
import { ErrorNotice, Loading } from '../components/Notice.jsx';
import { useCrm } from '../crm-context.js';
import { usePageTitle } from '../hooks.js';

const PAGE_SIZE = 25;

function ContactTable({ contacts }) {
    return (
        <table>
            <caption className="visually-hidden">Contacts</caption>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Company</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td><Link to={'/contacts/' + encodeURIComponent(contact.id)}>{contactName(contact)}</Link></td>
                        <td>{formatPhone(contact.main_phone)}</td>
                        <td>{contact.email}</td>
                        <td>{contact.company}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Results({ result, query, onTurn }) {
    if (result.query !== query) {
        return <Loading label="Loading contacts…" />;
    }
    if (result.error) {
        return <ErrorNotice error={result.error} />;
    }
    const { contacts, total } = result.page;
    if (!contacts.length) {
        return <p>{query.text ? 'No contact matches "' + query.text + '".' : 'No contacts yet. Add one below.'}</p>;
    }
    const from = query.offset + 1;
    const to = query.offset + contacts.length;
    return (
        <div>
            <p className="hint">Showing {from}–{to} of {total}</p>
            <ContactTable contacts={contacts} />
            <div className="actions pager">
                <button type="button" disabled={query.offset === 0} onClick={() => onTurn(-PAGE_SIZE)}>Previous</button>
                <button type="button" disabled={to >= total} onClick={() => onTurn(PAGE_SIZE)}>Next</button>
            </div>
        </div>
    );
}

/** Contacts: search, page through, and add. All of it is the headless REST API. */
export function ContactsPage() {
    usePageTitle('Contacts');
    const crm = useCrm();
    const navigate = useNavigate();
    const [query, setQuery] = useState({ text: '', offset: 0 });
    // Each result remembers the query it answers, so an older, slower
    // response never replaces a newer one, and anything else shows loading.
    const [result, setResult] = useState({ query: null, page: null, error: null });

    useEffect(() => {
        let current = true;
        crm.contacts.find(query.text, { offset: query.offset, limit: PAGE_SIZE }).then(
            (page) => current && setResult({ query, page, error: null }),
            (error) => current && setResult({ query, page: null, error })
        );
        return () => {
            current = false;
        };
    }, [crm, query]);

    function search(event) {
        event.preventDefault();
        const text = String(new FormData(event.currentTarget).get('q') || '').trim();
        setQuery({ text, offset: 0 });
    }

    function turn(delta) {
        setQuery({ text: query.text, offset: Math.max(0, query.offset + delta) });
    }

    async function create(values) {
        const created = await crm.contacts.create(values);
        navigate('/contacts/' + encodeURIComponent(created.contact_id) + (created.created ? '' : '?existing=1'));
    }

    return (
        <>
            <h1>Contacts</h1>
            <div className="card">
                <form className="search-row" role="search" onSubmit={search}>
                    <div className="field">
                        <label htmlFor="contact-search">Search contacts</label>
                        <input id="contact-search" type="search" name="q" autoComplete="off" />
                    </div>
                    <button type="submit">Search</button>
                </form>
                <p className="hint">A full email or phone number finds that exact contact. Anything else searches names and other fields.</p>
            </div>
            <div aria-live="polite">
                <Results result={result} query={query} onTurn={turn} />
            </div>
            <h2>Add a contact</h2>
            <p className="hint">Every contact needs a phone number or an email. If one already exists with the same phone or email, it is opened instead.</p>
            <ContactForm submitLabel="Add contact" onSubmit={create} />
        </>
    );
}
