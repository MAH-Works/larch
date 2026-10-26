import { useState } from 'react';
import { Button } from '@mah-works/larch/button';
import { Dialog } from '@mah-works/larch/dialog';
import { Field } from '@mah-works/larch/field';
import { Form } from '@mah-works/larch/form';
import { Input } from '@mah-works/larch/input';
import { Select } from '@mah-works/larch/select';
import { Icon, Toast } from '@mah-works/larch';

export const title = 'Quick create';
export const description = 'A controlled Dialog wrapping a Base UI Form; the submit button closes it once the form is valid.';

const CLIENTS = ['Aperture Labs', 'Northstar Health', 'Parallax Studio'];

export default function QuickCreate() {
  const [open, setOpen] = useState(false);
  const toastManager = Toast.useToastManager();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger variant="primary">
        <Icon name="plus" size="sm" />
        New project
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>New project</Dialog.Title>
          <Dialog.Description>You can add tasks and people after creating it.</Dialog.Description>
          <Form
            className="mt-4"
            onFormSubmit={({ name, client }) => {
              setOpen(false);
              toastManager.add({ title: `${name} created`, description: `For ${client}` });
            }}
          >
            <Field.Root name="name">
              <Field.Label>Project name</Field.Label>
              <Input required placeholder="Website redesign" autoFocus />
              <Field.Error match="valueMissing">Give the project a name.</Field.Error>
            </Field.Root>
            <Field.Root name="client">
              <Select.Root defaultValue={CLIENTS[0]}>
                <Select.Label>Client</Select.Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner>
                    <Select.Popup>
                      <Select.List>
                        {CLIENTS.map((c) => (
                          <Select.Item key={c} value={c}>
                            <Select.ItemText>{c}</Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.List>
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
            </Field.Root>
            <div className="mt-5 flex justify-end gap-2">
              <Dialog.Close>Cancel</Dialog.Close>
              <Button type="submit" variant="primary">
                Create project
              </Button>
            </div>
          </Form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
