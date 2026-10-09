import { h, show } from '../dom.js';

export function renderNotFound(main) {
    show(main,
        h('h1', null, 'Page not found'),
        h('p', null, 'There is no page at this address.'),
        h('a', { href: '/contacts' }, 'Go to contacts')
    );
}
