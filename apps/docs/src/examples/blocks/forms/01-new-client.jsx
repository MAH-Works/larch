import { useState } from 'react';
import { Button, Card, CheckRow, Field, SelectInput, TextArea, TextInput, useToast } from '@mah-works/larch';

export const title = 'Create a record';
export const description = 'Two-column fields that stack on mobile, with a footer action bar.';
export const layout = 'canvas';

export default function NewClient() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const nameError = submitted && !name.trim() ? 'Client name is required.' : null;

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (name.trim()) showToast(`${name} created`);
  };

  return (
    <Card as="form" onSubmit={onSubmit} className="max-w-[640px]">
      <div className="border-b border-line px-5 py-4">
        <h2 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">New client</h2>
        <p className="mb-0 mt-[5px] text-[11px] text-[#989da5]">Clients group contacts, projects and billing.</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 mobile:grid-cols-1 *:mt-0!">
        <Field label="Client name" id="nc-name" error={nameError}>
          <TextInput id="nc-name" value={name} invalid={!!nameError} onChange={(e) => setName(e.target.value)} placeholder="Aperture Labs" />
        </Field>
        <Field label="Website" id="nc-domain">
          <TextInput id="nc-domain" placeholder="aperture.test" />
        </Field>
        <Field label="Status" id="nc-status">
          <SelectInput id="nc-status">
            <option>Trial</option>
            <option>Onboarding</option>
            <option>Active</option>
          </SelectInput>
        </Field>
        <Field label="Owner" id="nc-owner">
          <SelectInput id="nc-owner">
            <option>Maria Costa</option>
            <option>Jamie Chen</option>
            <option>Alex Singh</option>
          </SelectInput>
        </Field>
        <Field label="Notes" id="nc-notes" className="col-span-2 mobile:col-span-1">
          <TextArea id="nc-notes" placeholder="Add a short note..." />
        </Field>
        <CheckRow className="col-span-2 mobile:col-span-1" defaultChecked>
          Notify the owner
        </CheckRow>
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
        <Button type="reset" onClick={() => (setName(''), setSubmitted(false))}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create client
        </Button>
      </div>
    </Card>
  );
}
