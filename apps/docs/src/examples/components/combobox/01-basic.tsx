import { Combobox } from '@mah-works/larch/combobox';
import { Field } from '@mah-works/larch/field';

export const title = 'Basic';
export const description =
  'Type to filter, then pick one value. Inside an InputGroup the group draws the control and the input goes borderless. With an Input, label it through Field (Combobox.Label is for trigger-only comboboxes).';
export const layout = 'padded';

const CLIENTS = ['Aperture Labs', 'Harbor & Co.', 'Lumen Retail', 'Northstar Health', 'Orbit Freight', 'Parallax Studio', 'Quill Legal'];

export default function Basic() {
  return (
    <Field.Root className="max-w-[300px]">
      <Field.Label>Client</Field.Label>
      <Combobox.Root items={CLIENTS}>
        <Combobox.InputGroup>
          <Combobox.Input placeholder="Search clients" />
          <Combobox.Clear aria-label="Clear" />
          <Combobox.Trigger aria-label="Show clients" />
        </Combobox.InputGroup>
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={6}>
            <Combobox.Popup>
              <Combobox.Empty>No clients match.</Combobox.Empty>
              <Combobox.List>
                {(client) => (
                  <Combobox.Item key={client} value={client}>
                    {client}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </Field.Root>
  );
}
