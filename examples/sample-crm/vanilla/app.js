import { startCrm } from '/shared/crm.js';
import { explainError } from '/shared/errors.js';
import { startActivityFeed, toast } from './activity.js';
import { h, show } from './dom.js';
import { errorNotice } from './notice.js';
import { createRouter } from './router.js';
import { renderCampaigns } from './pages/campaigns.js';
import { renderContact } from './pages/contact.js';
import { renderContacts } from './pages/contacts.js';
import { renderInbox } from './pages/inbox.js';
import { renderNotFound } from './pages/not-found.js';
import { renderPhone } from './pages/phone.js';
import { renderPipeline } from './pages/pipeline.js';
import { renderSetup } from './pages/setup.js';

const ROUTES = [
    { path: '/', title: 'Contacts', render: renderContacts },
    { path: '/contacts', title: 'Contacts', render: renderContacts },
    { path: '/contacts/:id', title: 'Contact', render: renderContact },
    { path: '/pipeline', title: 'Pipeline', render: renderPipeline },
    { path: '/inbox', title: 'Inbox', render: renderInbox },
    { path: '/campaigns', title: 'Campaigns', render: renderCampaigns },
    { path: '/phone', title: 'Phone', render: renderPhone },
    { path: '/setup', title: 'Setup', render: renderSetup },
    { path: '*', title: 'Not found', render: renderNotFound }
];

const main = document.getElementById('main');
const banner = document.getElementById('banner');

function markCurrentLink(path) {
    for (const link of document.querySelectorAll('.topbar nav a')) {
        const href = link.getAttribute('href');
        const current = path === href || path.startsWith(href + '/') || (path === '/' && href === '/contacts');
        if (current) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    }
}

function renderAccount(crm) {
    const account = document.getElementById('account');
    const mode = h('span', null, 'Mode: ' + crm.config.auth_mode);
    if (!crm.login) {
        show(account, mode);
        return;
    }
    const button = crm.login.isSignedIn()
        ? h('span', null, 'Signed in')
        : h('button', { type: 'button', class: 'primary', onclick: () => crm.login.signIn(location.pathname) }, 'Sign in with Drop Cowboy');
    show(account, mode, crm.login.isConfigured() ? button : h('span', null, 'Sign-in not set up'));
}

function showBanner(err, crm) {
    show(banner, h('div', { class: 'banner' }, errorNotice(err, crm, { full: true })));
}

/** The Dock is mounted once, for every page, and stays across navigation. */
async function mountDock(crm) {
    if (crm.needsSignIn() || !crm.cdn) {
        return;
    }
    try {
        const dock = await crm.startDock();
        // Dock errors carry a code, and for consent a reason. Explain them
        // instead of showing the raw message.
        dock.addErrorListener((detail) => {
            const g = explainError(detail);
            toast(g.title + ': ' + g.message);
        });
    } catch (err) {
        showBanner(err, crm);
    }
}

async function boot() {
    let crm;
    try {
        crm = await startCrm({ basePath: '' });
    } catch (err) {
        show(main, errorNotice(err, { login: null }, { full: true }));
        return;
    }
    if (crm.returnTo) {
        history.replaceState(null, '', crm.returnTo);
    }
    if (crm.startupError) {
        showBanner(crm.startupError, crm);
    }

    // Fired by any widget's token manager when it can no longer get a token.
    window.addEventListener('dc-session-expired', () => {
        showBanner({ code: crm.login ? 'login_expired' : 'unauthorized' }, crm);
    });

    renderAccount(crm);
    startActivityFeed(crm);
    mountDock(crm);

    const router = createRouter({
        routes: ROUTES,
        main,
        context: { crm },
        onChange: markCurrentLink,
        onError: (err, target) => show(target, h('h1', null, 'This page could not load'), errorNotice(err, crm))
    });
    router.start();
}

boot();
