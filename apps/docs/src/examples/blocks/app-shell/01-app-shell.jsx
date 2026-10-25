import { useState } from 'react';
import {
  AppShell,
  Button,
  Icon,
  MetricGrid,
  PageHeading,
  PageWrap,
  SidebarStatus,
  useToast,
} from '@larch/ui';

export const title = 'Application frame';
export const description =
  'Desktop sidebar, topbar with ⌘K search and a create action, and a slide-over drawer below 680px. This preview uses local state; in an app pass your router Link as `linkComponent` and the current path as `activeHref`.';
export const layout = 'frame';

const SECTIONS = [
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
const makeLink = (setActive) =>
  function DemoLink({ href, onClick, ...props }) {
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
  const { showToast } = useToast();
  const [active, setActive] = useState('#overview');
  const [Link] = useState(() => makeLink(setActive));
  const current = SECTIONS.flatMap((s) => s.items).find((i) => i.href === active);

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
        title: current.label,
        searchPlaceholder: `Search ${current.label.toLowerCase()}`,
        onSearch: (q) => showToast(q ? `Searching for “${q}”` : 'Type a search term'),
        createLabel: 'New',
        onCreate: () => showToast('Create menu'),
        onNotifications: () => showToast('No new notifications'),
      }}
    >
      <PageWrap>
        <PageHeading eyebrow="Workspace" title={current.label} description="Page content renders here.">
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
