import { Popover } from '@mah-works/larch/popover';
import { Icon } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'A Popover for content the trigger is about. Close renders Larch’s × glyph when left empty.';

export default function Basic() {
  return (
    <Popover.Root>
      <Popover.Trigger variant="icon" aria-label="Notifications">
        <Icon name="bell" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Title>Notifications</Popover.Title>
            <Popover.Description>You’re all caught up. Renewal reminders will appear here.</Popover.Description>
            <Popover.Close aria-label="Close" className="absolute right-2 top-2" />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
