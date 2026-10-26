import { AlertDialog } from '@mah-works/larch/alert-dialog';
import { Icon } from '@mah-works/larch';

export const title = 'Confirm a destructive action';
export const description = 'Unlike Dialog, an AlertDialog ignores outside clicks — the user has to choose.';

export default function Basic() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger variant="ghostDanger">
        <Icon name="trash" size="sm" />
        Discard draft
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup className="w-[min(380px,calc(100vw-40px))]">
          <AlertDialog.Title>Discard this draft?</AlertDialog.Title>
          <AlertDialog.Description>The renewal note and its two attachments will be deleted.</AlertDialog.Description>
          <div className="mt-5 flex justify-end gap-2">
            <AlertDialog.Close>Keep editing</AlertDialog.Close>
            <AlertDialog.Close variant="danger">Discard</AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
