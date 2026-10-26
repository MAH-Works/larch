import { useCallback, useEffect, type ComponentType } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell, SidebarStatus, Toast, type SidebarNavProps } from '@mah-works/larch';
import { RouterLink } from '../RouterLink.js';
import { CRM_PAGES } from './routes.js';
import Overview from './pages/Overview.js';
import Clients from './pages/Clients.js';
import Contacts from './pages/Contacts.js';
import Projects from './pages/Projects.js';
import AcmeAccounts from './pages/AcmeAccounts.js';
import Renewals from './pages/Renewals.js';
import Reports from './pages/Reports.js';
import DesignSystem from './pages/DesignSystem.js';

const BASE = '/examples/crm';
const PAGES: Record<string, ComponentType> = { overview: Overview, clients: Clients, contacts: Contacts, projects: Projects, 'acme-accounts': AcmeAccounts, renewals: Renewals, reports: Reports, 'design-system': DesignSystem };

const SECTIONS: SidebarNavProps['sections'] = (['Workspace', 'Favorites', 'Manage'] as const).map((label) => ({
  label,
  items: CRM_PAGES.filter((p) => p.section === label).map((p) => ({ href: `${BASE}/${p.path}`, label: p.title, icon: p.icon, count: p.count })),
}));
SECTIONS.push({ label: 'Library', items: [{ href: '/', label: 'Back to docs', icon: 'chevronLeft' }] });

/** The Compass CRM, assembled from @mah-works/larch blocks. */
export default function CrmApp() {
  const { pathname } = useLocation();
  const toastManager = Toast.useToastManager();
  const page = CRM_PAGES.find((p) => pathname === `${BASE}/${p.path}`) ?? CRM_PAGES[0];
  // Block body on purpose: newer Chromium returns a Promise from scrollTo, which React would call as cleanup.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const onSearch = useCallback((q: string) => toastManager.add({ title: q ? `Searching for “${q}”` : 'Type a search term' }), [toastManager]);

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
        onCreate: () => toastManager.add({ title: `${page.create} form` }),
        onNotifications: () => toastManager.add({ title: 'No new notifications' }),
      }}
    >
      <Routes>
        {CRM_PAGES.map((p) => {
          const Page = PAGES[p.path]!;
          return <Route key={p.path} path={p.path} element={<Page />} />;
        })}
        <Route path="*" element={<Navigate to={`${BASE}/overview`} replace />} />
      </Routes>
    </AppShell>
  );
}
