import { Field } from '@mah-works/larch/field';
import { TextArea } from '@mah-works/larch/input';

export const title = 'Fields';
export const description =
  'Field.Root wires the Label, Control and Description together — no ids needed. Stacked fields get Larch’s 12px rhythm.';
export const layout = 'padded';

export default function Fields() {
  return (
    <div className="max-w-[340px]">
      <Field.Root>
        <Field.Label>Client name</Field.Label>
        <Field.Control placeholder="Search or enter a name" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Website</Field.Label>
        <Field.Control placeholder="aperture.test" disabled />
        <Field.Description>Set by the integration — edit it in Settings.</Field.Description>
      </Field.Root>
      <Field.Root>
        <Field.Label>Note</Field.Label>
        <TextArea placeholder="Add a short note..." />
        <Field.Description>Visible to everyone on the account team.</Field.Description>
      </Field.Root>
    </div>
  );
}
