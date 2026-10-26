import { useState } from 'react';
import { AlertDialog } from '@mah-works/larch/alert-dialog';
import { Field } from '@mah-works/larch/field';
import { Input } from '@mah-works/larch/input';
import { Alert, Icon, Toast } from '@mah-works/larch';

export const title = 'Confirm a destructive action';
export const description =
  'An AlertDialog — it only closes through its buttons. The danger action stays disabled until the name is typed.';

export default function ConfirmDelete() {
  const [typed, setTyped] = useState('');
  const toastManager = Toast.useToastManager();

  return (
    <AlertDialog.Root onOpenChange={(open) => !open && setTyped('')}>
      <AlertDialog.Trigger variant="danger">
        <Icon name="trash" size="sm" />
        Delete client
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Delete Aperture Labs?</AlertDialog.Title>
          <AlertDialog.Description>This removes 12 projects and 48 tasks. It can't be undone.</AlertDialog.Description>
          <Alert tone="danger" title="Billing history is kept" className="mt-4">
            Invoices stay available in Reports for 7 years.
          </Alert>
          <Field.Root className="mt-4">
            <Field.Label>Type “Aperture Labs” to confirm</Field.Label>
            <Input value={typed} onValueChange={setTyped} autoComplete="off" />
          </Field.Root>
          <div className="mt-5 flex justify-end gap-2">
            <AlertDialog.Close>Cancel</AlertDialog.Close>
            <AlertDialog.Close
              variant="danger"
              disabled={typed !== 'Aperture Labs'}
              onClick={() => toastManager.add({ title: 'Aperture Labs deleted' })}
            >
              Delete client
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
