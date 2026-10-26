import { useState } from 'react';
import { Menu } from '@mah-works/larch/menu';
import { Icon } from '@mah-works/larch';

export const title = 'Checkbox items and a submenu';
export const description = 'CheckboxItemIndicator draws Larch’s check when left empty. Submenus are a SubmenuRoot with their own Portal.';

export default function CheckboxSubmenu() {
  const [columns, setColumns] = useState({ owner: true, billing: true, tags: false });
  const toggle = (key) => (checked) => setColumns((c) => ({ ...c, [key]: checked }));

  return (
    <Menu.Root>
      <Menu.Trigger variant="ghost">
        <Icon name="settings" size="sm" />
        View
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} align="start">
          <Menu.Popup>
            <Menu.Group>
              <Menu.GroupLabel>Columns</Menu.GroupLabel>
              {Object.entries(columns).map(([key, checked]) => (
                <Menu.CheckboxItem key={key} checked={checked} onCheckedChange={toggle(key)}>
                  <Menu.CheckboxItemIndicator />
                  {key[0].toUpperCase() + key.slice(1)}
                </Menu.CheckboxItem>
              ))}
            </Menu.Group>
            <Menu.Separator />
            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger>
                Density <Icon name="chevronRight" size="xs" className="text-[#9197a0]" />
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner sideOffset={-2} alignOffset={-5}>
                  <Menu.Popup>
                    <Menu.Item>Comfortable</Menu.Item>
                    <Menu.Item>Compact</Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
