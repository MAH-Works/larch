import { useState } from 'react';
import {
  Brand,
  PageHeading,
  PageWrap,
  Select,
  SidebarBrand,
  SidebarFooter,
  SidebarMenu,
  SidebarRoot,
  SidebarSlot,
  SidebarStatus,
  TopbarRoot,
  TopbarTitle,
  type SidebarMenuProps,
} from '@mah-works/larch';

export const title = 'Compose your own sidebar';
export const description =
  'Arrange the Sidebar parts inside `SidebarRoot` — here a workspace picker in a `SidebarSlot` under the brand. The parts work in the desktop sidebar and the mobile drawer; read `useSidebar()` in your own parts to react to the collapsed rail.';
export const layout = 'frame';

const WORKSPACES = [
  { value: 'fleet', label: 'Fleet' },
  { value: 'notes', label: 'Notes' },
];

const SECTIONS: SidebarMenuProps['sections'] = [
  {
    label: 'Workspace',
    items: [
      { href: '#dashboard', label: 'Dashboard', icon: 'overview' },
      { href: '#customers', label: 'Customers', icon: 'users', count: 128 },
      { href: '#plans', label: 'Plans', icon: 'star' },
    ],
  },
  { label: 'Manage', items: [{ href: '#settings', label: 'Settings', icon: 'settings' }] },
];

export default function ComposedSidebarExample() {
  const [workspace, setWorkspace] = useState('fleet');
  const name = WORKSPACES.find((w) => w.value === workspace)?.label;
  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <SidebarRoot>
        <SidebarBrand brand={<Brand name="control" suffix="panel" />} className="mb-4" />
        <SidebarSlot>
          <Select.Root items={WORKSPACES} value={workspace} onValueChange={(v) => v && setWorkspace(v as string)}>
            <Select.Trigger aria-label="Workspace" className="w-full">
              <Select.Value />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    {WORKSPACES.map((w) => (
                      <Select.Item key={w.value} value={w.value}>
                        <Select.ItemText>{w.label}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </SidebarSlot>
        <SidebarMenu sections={SECTIONS} activeHref="#plans" />
        <SidebarFooter>
          <SidebarStatus initials="MA" />
        </SidebarFooter>
      </SidebarRoot>
      <main className="flex min-w-0 flex-1 flex-col">
        <TopbarRoot>
          <TopbarTitle>Plans</TopbarTitle>
        </TopbarRoot>
        <PageWrap>
          <PageHeading title={`${name} plans`} description="The menu follows the workspace picked in the sidebar." />
        </PageWrap>
      </main>
    </div>
  );
}
