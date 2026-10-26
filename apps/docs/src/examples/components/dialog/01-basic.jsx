import { Dialog } from '@mah-works/larch/dialog';
import { Icon } from '@mah-works/larch';

export const title = 'Basic';
export const description =
  'The anatomy from Base UI’s docs, unchanged. Trigger and Close take a Button `variant`; Escape and a backdrop click also close it.';

export default function Basic() {
  return (
    <Dialog.Root>
      <Dialog.Trigger variant="primary">
        <Icon name="window" size="sm" />
        Open dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Share client view</Dialog.Title>
          <Dialog.Description>Anyone on the workspace with the link can open this saved view.</Dialog.Description>
          <Dialog.Close variant="iconSm" aria-label="Close" className="absolute right-3 top-3">
            <Icon name="close" size="sm" />
          </Dialog.Close>
          <div className="mt-5 flex justify-end gap-2">
            <Dialog.Close>Cancel</Dialog.Close>
            <Dialog.Close variant="primary">Share view</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
