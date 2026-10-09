import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { explainError } from '@shared/errors.js';
import { useCrm } from '../crm-context.js';
import { ActivityFeed } from './ActivityFeed.jsx';
import { ErrorNotice } from './Notice.jsx';
import { useToast } from './Toasts.jsx';

const NAV = [
    ['/contacts', 'Contacts'],
    ['/pipeline', 'Pipeline'],
    ['/inbox', 'Inbox'],
    ['/campaigns', 'Campaigns'],
    ['/phone', 'Phone'],
    ['/setup', 'Setup']
];

function Account() {
    const crm = useCrm();
    const mode = <span>Mode: {crm.config.auth_mode}</span>;
    if (!crm.login) {
        return <div className="account">{mode}</div>;
    }
    let status = <span>Sign-in not set up</span>;
    if (crm.login.isSignedIn()) {
        status = <span>Signed in</span>;
    } else if (crm.login.isConfigured()) {
        status = (
            <button type="button" className="primary" onClick={() => crm.login.signIn(window.location.pathname)}>
                Sign in with Drop Cowboy
            </button>
        );
    }
    return <div className="account">{mode}{status}</div>;
}

/**
 * The Dock is mounted once, for every page, and stays across navigation.
 * Its errors carry a code (and for consent a reason), so they are explained
 * rather than shown raw.
 */
function useDock(onFatal) {
    const crm = useCrm();
    const toast = useToast();
    useEffect(() => {
        if (crm.needsSignIn() || !crm.cdn) {
            return undefined;
        }
        let active = true;
        let off = null;
        crm.startDock().then(
            (dock) => {
                if (active) {
                    off = dock.addErrorListener((detail) => {
                        const g = explainError(detail);
                        toast(g.title + ': ' + g.message);
                    });
                }
            },
            (err) => active && onFatal(err)
        );
        return () => {
            active = false;
            if (off) {
                off();
            }
        };
    }, [crm, toast, onFatal]);
}

/** Moves focus to the page content after each navigation, for keyboard and screen reader users. */
function useFocusOnNavigate(mainRef) {
    const { pathname } = useLocation();
    const first = useRef(true);
    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        mainRef.current.focus();
    }, [pathname, mainRef]);
}

export function Layout() {
    const crm = useCrm();
    const main = useRef(null);
    const [banner, setBanner] = useState(crm.startupError);
    useDock(setBanner);
    useFocusOnNavigate(main);

    // Fired by any widget's token manager when it can no longer get a token.
    useEffect(() => {
        function expired() {
            setBanner({ code: crm.login ? 'login_expired' : 'unauthorized' });
        }
        window.addEventListener('dc-session-expired', expired);
        return () => window.removeEventListener('dc-session-expired', expired);
    }, [crm]);

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <header className="topbar">
                <Link className="brand" to="/contacts">Sample CRM</Link>
                <nav aria-label="Main">
                    <ul>
                        {NAV.map(([to, label]) => <li key={to}><NavLink to={to}>{label}</NavLink></li>)}
                    </ul>
                </nav>
                <Account />
            </header>
            {banner && <div className="banner"><ErrorNotice error={banner} full /></div>}
            <div className="layout">
                <main id="main" tabIndex={-1} ref={main}>
                    <Outlet />
                </main>
                <ActivityFeed />
            </div>
        </>
    );
}
