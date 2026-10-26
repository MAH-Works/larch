import { Menu } from '@mah-works/larch/menu';
import { Icon, Toast } from '@mah-works/larch';

export const title = 'Action menu';
export const description = 'Trigger takes a Button `variant`. Items are plain Base UI Menu.Items; color a destructive one with `className`.';

export default function Actions() {
  const toastManager = Toast.useToastManager();
  return (
    <Menu.Root>
      <Menu.Trigger>
        More actions <Icon name="chevronDown" size="xs" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} align="start">
          <Menu.Popup>
            <Menu.Item onClick={() => toastManager.add({ title: 'Export view' })}>
              <Icon name="download" size="xs" className="text-[#9197a0]" /> Export view
            </Menu.Item>
            <Menu.Item onClick={() => toastManager.add({ title: 'Duplicate view' })}>
              <Icon name="copy" size="xs" className="text-[#9197a0]" /> Duplicate view
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item className="text-red data-highlighted:bg-red-soft data-highlighted:text-red" onClick={() => toastManager.add({ title: 'Delete view' })}>
              <Icon name="trash" size="xs" /> Delete view
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
