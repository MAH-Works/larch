import { useState } from 'react';
import { Button, Field, TextInput } from '@larch/ui';

export const title = 'Validation';
export const description = 'Set `invalid` on the control and pass `error` to the Field.';
export const layout = 'padded';

export default function Validation() {
  const [email, setEmail] = useState('jamie@');
  const [touched, setTouched] = useState(true);
  const error = touched && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? 'Enter a valid email address.' : null;

  return (
    <form className="max-w-[340px]" onSubmit={(e) => e.preventDefault()}>
      <Field label="Email" id="ex-email" error={error} hint="We'll send the invite here.">
        <TextInput
          id="ex-email"
          type="email"
          value={email}
          invalid={!!error}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
        />
      </Field>
      <Button type="submit" variant="primary" className="mt-4" disabled={!!error}>
        Send invite
      </Button>
    </form>
  );
}
