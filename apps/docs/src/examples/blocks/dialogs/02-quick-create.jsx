import { useState } from 'react';
import { Button, Dialog, Field, Icon, SelectInput, TextInput, useToast } from '@compass/ui';

export const title = 'Quick create';

export default function QuickCreate() {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get('name') || 'Untitled project';
    setOpen(false);
    showToast(`${name} created`);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Icon name="plus" size="sm" />
        New project
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="New project"
        description="You can add tasks and people after creating it."
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" form="quick-create" variant="primary">
              Create project
            </Button>
          </>
        }
      >
        <form id="quick-create" onSubmit={onSubmit}>
          <Field label="Project name" id="qc-name">
            <TextInput id="qc-name" name="name" placeholder="Website redesign" autoFocus />
          </Field>
          <Field label="Client" id="qc-client">
            <SelectInput id="qc-client" name="client">
              <option>Aperture Labs</option>
              <option>Northstar Health</option>
              <option>Parallax Studio</option>
            </SelectInput>
          </Field>
        </form>
      </Dialog>
    </>
  );
}
