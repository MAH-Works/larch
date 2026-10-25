import { useState } from 'react';
import { Alert, Button, Dialog, Field, Icon, TextInput, useToast } from '@mah-works/larch';

export const title = 'Confirm a destructive action';
export const description = 'Ask the user to type the name before the danger button enables.';

export default function ConfirmDelete() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const { showToast } = useToast();
  const close = () => {
    setOpen(false);
    setTyped('');
  };

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        <Icon name="trash" size="sm" />
        Delete client
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title="Delete Aperture Labs?"
        description="This removes 12 projects and 48 tasks. It can't be undone."
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button
              variant="danger"
              disabled={typed !== 'Aperture Labs'}
              onClick={() => {
                close();
                showToast('Aperture Labs deleted');
              }}
            >
              Delete client
            </Button>
          </>
        }
      >
        <Alert tone="danger" title="Billing history is kept">
          Invoices stay available in Reports for 7 years.
        </Alert>
        <Field label="Type “Aperture Labs” to confirm" id="confirm-name" className="mt-4">
          <TextInput id="confirm-name" value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" />
        </Field>
      </Dialog>
    </>
  );
}
