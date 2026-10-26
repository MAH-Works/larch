import { useState } from 'react';
import { Button } from '@mah-works/larch/button';
import { Field } from '@mah-works/larch/field';
import { Form } from '@mah-works/larch/form';
import { Input } from '@mah-works/larch/input';

export const title = 'Submit with server errors';
export const description =
  'Form validates every Field on submit and focuses the first invalid one. `onFormSubmit` receives values by field `name`; errors returned by a server go in `errors`.';
export const layout = 'padded';

const TAKEN = ['aperture', 'northstar'];

export default function Submit() {
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(null);

  return (
    <Form
      className="max-w-[340px]"
      errors={errors}
      onFormSubmit={({ workspace }) => {
        // Pretend the server rejected names that are already in use.
        if (TAKEN.includes(workspace.toLowerCase())) {
          setErrors({ workspace: 'That workspace name is taken.' });
          return;
        }
        setErrors({});
        setSaved(workspace);
      }}
    >
      <Field.Root name="workspace">
        <Field.Label>Workspace name</Field.Label>
        <Input required minLength={3} placeholder="Try “aperture”" />
        <Field.Error match="valueMissing">Name your workspace.</Field.Error>
        <Field.Error match="tooShort">Use at least 3 characters.</Field.Error>
        <Field.Error />
      </Field.Root>
      <Button type="submit" variant="primary" className="mt-4">
        Create workspace
      </Button>
      {saved && <p className="mb-0 mt-3 text-[11px] text-green">Created “{saved}”.</p>}
    </Form>
  );
}
