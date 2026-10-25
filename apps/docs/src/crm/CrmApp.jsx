import { useCallback, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell, SidebarStatus, useToast } from '@compass/ui';
import { RouterLink } from '../RouterLink.jsx';
import { CRM_PAGES } from './routes.js';
import Overview from './pages/Overview.jsx';
import Clients from './pages/Clients.jsx';
import Contacts from './pages/Contacts.jsx';
import Projects from './pages/Projects.jsx';
import AcmeAccounts from './pages/AcmeAccounts.jsx';
import Renewals from './pages/Renewals.jsx';
import Reports from './pages/Reports.jsx';
import DesignSystem from './pages/DesignSystem.jsx';

const BASE = '/examples/crm';
const PAGES = { overview: Overview, clients: Clients, contacts: Contacts, projects: Projects, 'acme-accounts': AcmeAccounts, renewals: Renewals, reports: Reports, 'design-system': DesignSystem };

const SECTIONS = ['Workspace', 'Favorites', 'Manage'].map((label) => ({
  label,
  items: CRM_PAGES.filter((p) => p.section === label).map((p) => ({ href: `${BASE}/${p.path}`, label: p.title, icon: p.icon, count: p.count })),
}));
SECTIONS.push({ label: 'Library', items: [{ href: '/', label: 'Back to docs', icon: 'chevronLeft' }] });

/** The Compass CRM, assembled from @compass/ui blocks. */
export default function CrmApp() {
  const { pathname } = useLocation();
  const { showToast } = useToast();
  const page = CRM_PAGES.find((p) => pathname === `${BASE}/${p.path}`) ?? CRM_PAGES[0];
  // Block body on purpose: newer Chromium returns a Promise from scrollTo, which React would call as cleanup.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const onSearch = useCallback((q) => showToast(q ? `Searching for “${q}”` : 'Type a search term'), [showToast]);

  return (
    <AppShell
      fixed={page.fixed}
      sidebar={{
        sections: SECTIONS,
        activeHref: pathname,
        linkComponent: RouterLink,
        brandHref: `${BASE}/overview`,
        footer: <SidebarStatus initials="MA" />,
      }}
      topbar={{
        section: page.section,
        title: page.title,
        searchPlaceholder: page.search,
        onSearch,
        createLabel: page.create,
        onCreate: () => showToast(`${page.create} form`),
        onNotifications: () => showToast('No new notifications'),
      }}
    >
      <Routes>
        {CRM_PAGES.map((p) => {
          const Page = PAGES[p.path];
          return <Route key={p.path} path={p.path} element={<Page />} />;
        })}
        <Route path="*" element={<Navigate to={`${BASE}/overview`} replace />} />
      </Routes>
    </AppShell>
  );
}
