import { useState } from 'react';
import { Button, CheckRow, Dialog, Field, Icon, SelectInput, useToast } from '@compass/ui';

export const title = 'Share dialog';
export const description = 'Escape, the × button or a backdrop click all close it.';

export default function Basic() {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Icon name="window" size="sm" />
        Open dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Share client view"
        description="Choose who can access this saved view."
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                setOpen(false);
                showToast('View shared');
              }}
            >
              Share view
            </Button>
          </>
        }
      >
        <Field label="Permission" id="share-permission">
          <SelectInput id="share-permission">
            <option>Anyone on the workspace</option>
            <option>Only invited people</option>
            <option>Only me</option>
          </SelectInput>
        </Field>
        <div className="mt-[14px]">
          <CheckRow defaultChecked>Allow copying and exporting</CheckRow>
        </div>
      </Dialog>
    </>
  );
}
