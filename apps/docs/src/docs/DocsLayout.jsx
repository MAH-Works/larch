import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppShell, Brand, Button, Icon, SidebarStatus, Toast } from '@mah-works/larch';
import { RouterLink } from '../RouterLink.jsx';
import { LarchMark } from './LarchMark.jsx';
import { BLOCKS, COMPONENTS, COMPONENT_GROUPS, GUIDES } from './registry.js';

const guideHref = (slug) => (slug ? `/docs/${slug}` : '/');

export const NAV_SECTIONS = [
  { label: 'Getting started', items: GUIDES.map((g) => ({ href: guideHref(g.slug), label: g.label, icon: g.icon })) },
  ...COMPONENT_GROUPS.map((group) => ({
    label: group,
    items: COMPONENTS.filter((c) => c.group === group).map((c) => ({ href: `/components/${c.slug}`, label: c.name })),
  })),
  { label: 'Blocks', items: BLOCKS.map((b) => ({ href: `/blocks/${b.slug}`, label: b.name })) },
  {
    label: 'Examples',
    items: [
      { href: '/examples', label: 'Example pages', icon: 'window' },
      { href: '/examples/crm/overview', label: 'Compass CRM', icon: 'arrowRight' },
      { href: '/examples/auth/sign-in', label: 'Auth pages', icon: 'lock' },
    ],
  },
];

const SEARCHABLE = [
  ...GUIDES.map((g) => ({ label: g.label, href: guideHref(g.slug) })),
  ...COMPONENTS.map((c) => ({ label: `${c.name} ${c.imports.join(' ')}`, href: `/components/${c.slug}` })),
  ...BLOCKS.map((b) => ({ label: `${b.name} ${b.imports.join(' ')}`, href: `/blocks/${b.slug}` })),
];

function breadcrumb(pathname) {
  if (pathname.startsWith('/components/')) {
    const c = COMPONENTS.find((x) => pathname.endsWith(`/${x.slug}`));
    return { section: 'Components', title: c?.name ?? 'Not found' };
  }
  if (pathname.startsWith('/blocks/')) {
    const b = BLOCKS.find((x) => pathname.endsWith(`/${x.slug}`));
    return { section: 'Blocks', title: b?.name ?? 'Not found' };
  }
  if (pathname.startsWith('/examples')) return { section: 'Examples', title: 'Example pages' };
  const g = GUIDES.find((x) => guideHref(x.slug) === pathname);
  return { section: 'Docs', title: g?.label ?? 'Not found' };
}

/** Docs frame — built from the library's own AppShell, Sidebar and Topbar. */
export default function DocsLayout() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const toastManager = Toast.useToastManager();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  const onSearch = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return toastManager.add({ title: 'Type a component name' });
    const hit = SEARCHABLE.find((s) => s.label.toLowerCase().includes(q));
    if (hit) navigate(hit.href);
    else toastManager.add({ title: `Nothing matches “${query}”` });
  };

  return (
    <AppShell
      sidebar={{
        sections: NAV_SECTIONS,
        activeHref: pathname,
        linkComponent: RouterLink,
        brand: <Brand name="larch" suffix="ui" mark={<LarchMark />} />,
        footer: <SidebarStatus text="v2.0.0 · Base UI 1.9 · Tailwind 4" />,
      }}
      topbar={{
        ...breadcrumb(pathname),
        icon: 'document',
        searchPlaceholder: 'Search docs',
        onSearch,
        actions: (
          <Button render={<Link to="/examples/crm/overview" />} nativeButton={false} className="h-9 mobile:hidden">
            Live example <Icon name="arrowRight" size="xs" />
          </Button>
        ),
      }}
    >
      <Outlet />
    </AppShell>
  );
}
