import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './components/Layout.jsx';
import { ToastProvider } from './components/Toasts.jsx';
import { CampaignsPage } from './pages/CampaignsPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { ContactsPage } from './pages/ContactsPage.jsx';
import { InboxPage } from './pages/InboxPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { PhonePage } from './pages/PhonePage.jsx';
import { PipelinePage } from './pages/PipelinePage.jsx';
import { SetupPage } from './pages/SetupPage.jsx';

export function App() {
    return (
        <ToastProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Navigate to="/contacts" replace />} />
                    <Route path="contacts" element={<ContactsPage />} />
                    <Route path="contacts/:id" element={<ContactPage />} />
                    <Route path="pipeline" element={<PipelinePage />} />
                    <Route path="inbox" element={<InboxPage />} />
                    <Route path="campaigns" element={<CampaignsPage />} />
                    <Route path="phone" element={<PhonePage />} />
                    <Route path="setup" element={<SetupPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </ToastProvider>
    );
}
