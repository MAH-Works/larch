import { Field, SelectInput, TextArea, TextInput } from '@compass/ui';

export const title = 'Fields';
export const description = 'Field pairs a label with a control through `id`. Stacked fields get 12px of space.';
export const layout = 'padded';

export default function Fields() {
  return (
    <div className="max-w-[340px]">
      <Field label="Client name" id="ex-name">
        <TextInput id="ex-name" placeholder="Search or enter a name" />
      </Field>
      <Field label="Status" id="ex-status">
        <SelectInput id="ex-status" defaultValue="Trial">
          <option>Active</option>
          <option>Trial</option>
          <option>Onboarding</option>
        </SelectInput>
      </Field>
      <Field label="Note" id="ex-note" hint="Visible to everyone on the account team.">
        <TextArea id="ex-note" placeholder="Add a short note..." />
      </Field>
    </div>
  );
}
