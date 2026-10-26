import { Menu } from '@mah-works/larch/menu';
import { Menubar } from '@mah-works/larch/menubar';

export const title = 'Basic';
export const description = 'A Menubar of Menu.Roots. Use `variant="ghost"` triggers inside the bar; arrow keys move between menus.';

const MENUS = {
  File: ['New client', 'Import CSV', 'Export view'],
  Edit: ['Undo', 'Redo', 'Select all'],
  View: ['Table', 'Board', 'Timeline'],
};

export default function Basic() {
  return (
    <Menubar>
      {Object.entries(MENUS).map(([label, items]) => (
        <Menu.Root key={label}>
          <Menu.Trigger variant="ghost">{label}</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={6} align="start">
              <Menu.Popup>
                {items.map((item) => (
                  <Menu.Item key={item}>{item}</Menu.Item>
                ))}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      ))}
    </Menubar>
  );
}
