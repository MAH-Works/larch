import { useState, type ComponentProps } from 'react';
import {
  AppShell,
  Button,
  Icon,
  MetricGrid,
  PageHeading,
  PageWrap,
  SidebarStatus,
  Toast,
  type SidebarNavProps,
} from '@mah-works/larch';

export const title = 'Application frame';
export const description =
  'Desktop sidebar, topbar with ⌘K search and a create action, and a slide-over drawer below 680px. This preview uses local state; in an app pass your router Link as `linkComponent` and the current path as `activeHref`.';
export const layout = 'frame';

const SECTIONS: SidebarNavProps['sections'] = [
  {
    label: 'Workspace',
    items: [
      { href: '#overview', label: 'Overview', icon: 'overview' },
      { href: '#clients', label: 'Clients', icon: 'table', count: 37 },
      { href: '#contacts', label: 'Contacts', icon: 'users' },
      { href: '#projects', label: 'Projects', icon: 'home' },
    ],
  },
  {
    label: 'Favorites',
    items: [
      { href: '#acme', label: 'Acme accounts', icon: 'star', count: 8 },
      { href: '#renewals', label: 'Renewals', icon: 'list', count: 12 },
    ],
  },
  { label: 'Manage', items: [{ href: '#reports', label: 'Reports', icon: 'chart' }] },
];

// A tiny link that updates local state instead of navigating.
const makeLink = (setActive: (href: string) => void) =>
  function DemoLink({ href, onClick, ...props }: ComponentProps<'a'> & { href: string }) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          setActive(href);
          onClick?.(e);
        }}
        {...props}
      />
    );
  };

export default function AppShellExample() {
  const toastManager = Toast.useToastManager();
  const [active, setActive] = useState('#overview');
  const [Link] = useState(() => makeLink(setActive));
  const current = SECTIONS.flatMap((s) => s.items).find((i) => i.href === active)!;
  const label = String(current.label);

  return (
    <AppShell
      sidebar={{
        sections: SECTIONS,
        activeHref: active,
        linkComponent: Link,
        brandHref: '#overview',
        footer: <SidebarStatus initials="MA" />,
      }}
      topbar={{
        section: 'Workspace',
        title: label,
        searchPlaceholder: `Search ${label.toLowerCase()}`,
        onSearch: (q) => toastManager.add({ title: q ? `Searching for “${q}”` : 'Type a search term' }),
        createLabel: 'New',
        onCreate: () => toastManager.add({ title: 'Create menu' }),
        onNotifications: () => toastManager.add({ title: 'No new notifications' }),
      }}
    >
      <PageWrap>
        <PageHeading eyebrow="Workspace" title={label} description="Page content renders here.">
          <Button variant="primary">
            <Icon name="download" size="sm" />
            Export
          </Button>
        </PageHeading>
        <MetricGrid
          items={[
            { label: 'Active clients', value: '24', meta: [{ text: '↗ 8.3%', trend: 'up' }] },
            { label: 'Projects', value: '84', meta: [{ text: '↗ 12.5%', trend: 'up' }] },
            { label: 'Open tasks', value: '327', meta: [{ text: '↘ 4.1%', trend: 'down' }] },
            { label: 'Revenue', value: '$184.2k', meta: [{ text: '↗ 16.8%', trend: 'up' }] },
          ]}
        />
      </PageWrap>
    </AppShell>
  );
}
