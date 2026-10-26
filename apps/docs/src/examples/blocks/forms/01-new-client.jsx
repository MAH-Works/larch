import { Button } from '@mah-works/larch/button';
import { Checkbox } from '@mah-works/larch/checkbox';
import { Field } from '@mah-works/larch/field';
import { Form } from '@mah-works/larch/form';
import { Input, TextArea } from '@mah-works/larch/input';
import { Select } from '@mah-works/larch/select';
import { Card, Toast } from '@mah-works/larch';

export const title = 'Create a record';
export const description =
  'Two-column fields that stack on mobile. Base UI’s Form validates on submit and focuses the first invalid field.';
export const layout = 'canvas';

function SelectField({ name, label, options }) {
  return (
    <Field.Root name={name}>
      <Select.Root defaultValue={options[0]}>
        <Select.Label>{label}</Select.Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.List>
                {options.map((o) => (
                  <Select.Item key={o} value={o}>
                    <Select.ItemText>{o}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  );
}

export default function NewClient() {
  const toastManager = Toast.useToastManager();

  return (
    <Card as={Form} onFormSubmit={({ name }) => toastManager.add({ title: `${name} created` })} className="max-w-[640px]">
      <div className="border-b border-line px-5 py-4">
        <h2 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">New client</h2>
        <p className="mb-0 mt-[5px] text-[11px] text-[#989da5]">Clients group contacts, projects and billing.</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 mobile:grid-cols-1 *:mt-0!">
        <Field.Root name="name" validate={(v) => (v.trim() ? null : 'Client name is required.')}>
          <Field.Label>Client name</Field.Label>
          <Input placeholder="Aperture Labs" />
          <Field.Error />
        </Field.Root>
        <Field.Root name="domain">
          <Field.Label>Website</Field.Label>
          <Input placeholder="aperture.test" />
        </Field.Root>
        <SelectField name="status" label="Status" options={['Trial', 'Onboarding', 'Active']} />
        <SelectField name="owner" label="Owner" options={['Maria Costa', 'Jamie Chen', 'Alex Singh']} />
        <Field.Root name="notes" className="col-span-2 mobile:col-span-1">
          <Field.Label>Notes</Field.Label>
          <TextArea placeholder="Add a short note..." />
        </Field.Root>
        <Field.Root name="notify" className="col-span-2 mobile:col-span-1">
          <Field.Label className="flex items-center gap-2 text-xs font-normal text-[#656b74] dark:text-muted">
            <Checkbox.Root defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            Notify the owner
          </Field.Label>
        </Field.Root>
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
        <Button type="reset">Cancel</Button>
        <Button type="submit" variant="primary">
          Create client
        </Button>
      </div>
    </Card>
  );
}
