import { useState } from 'react';
import { PageHeading, PageWrap, Sidebar, SidebarStatus, Topbar, type SidebarNavProps } from '@mah-works/larch';

export const title = 'Collapsible sidebar, dark topbar';
export const description =
  'Pass `collapsed` and `onCollapsedChange` to let people shrink the sidebar to an icon rail. `tone="dark"` keeps the topbar dark in light mode — useful to mark an admin area.';
export const layout = 'frame';

const SECTIONS: SidebarNavProps['sections'] = [
  {
    label: 'Operations',
    items: [
      { href: '#dashboard', label: 'Dashboard', icon: 'overview' },
      { href: '#bookings', label: 'Bookings', icon: 'calendar', count: 12 },
      { href: '#fleet', label: 'Fleet', icon: 'car' },
      { href: '#billing', label: 'Billing', icon: 'money' },
    ],
  },
  { label: 'Manage', items: [{ href: '#settings', label: 'Settings', icon: 'settings' }] },
];

export default function CollapsedSidebarExample() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar
        sections={SECTIONS}
        activeHref="#fleet"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        footer={collapsed ? undefined : <SidebarStatus initials="MA" />}
      />
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar tone="dark" section="Admin" title="Fleet" icon="car" />
        <PageWrap>
          <PageHeading title="Fleet" description={collapsed ? 'Sidebar collapsed to icons.' : 'Sidebar expanded.'} />
        </PageWrap>
      </main>
    </div>
  );
}
