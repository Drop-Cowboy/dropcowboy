import { Link } from 'react-router';
import { usePageTitle } from '../hooks.js';

export function NotFoundPage() {
    usePageTitle('Not found');
    return (
        <>
            <h1>Page not found</h1>
            <p><Link to="/contacts">Go to contacts</Link></p>
        </>
    );
}
