import { NavigationMenu } from '@mah-works/larch/navigation-menu';

export const title = 'Site navigation';
export const description = 'Triggers are ghost buttons with a default chevron Icon; the popup morphs between panels as you move across them.';
export const layout = 'padded';

const GUIDES = [
  { href: '#install', title: 'Installation', text: 'Add the package and the Tailwind theme.' },
  { href: '#theming', title: 'Theming', text: 'Tokens, dark mode and overrides.' },
];
const BLOCKS = [
  { href: '#shell', title: 'App shell', text: 'Sidebar + topbar frame.' },
  { href: '#tables', title: 'Data table', text: 'Selectable, sticky-header table.' },
  { href: '#charts', title: 'Charts', text: 'Dependency-free CSS charts.' },
];

function Panel({ links }: { links: { href: string; title: string; text: string }[] }) {
  return (
    <ul className="m-0 grid w-[300px] list-none gap-px p-0">
      {links.map((l) => (
        <li key={l.href}>
          <NavigationMenu.Link href={l.href}>
            <span className="block font-semibold text-strong">{l.title}</span>
            <span className="text-[11px] text-muted">{l.text}</span>
          </NavigationMenu.Link>
        </li>
      ))}
    </ul>
  );
}

export default function Basic() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Guides <NavigationMenu.Icon />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <Panel links={GUIDES} />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Blocks <NavigationMenu.Icon />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <Panel links={BLOCKS} />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#changelog" className="py-[7px]">
            Changelog
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner sideOffset={8} align="start">
          <NavigationMenu.Popup>
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
