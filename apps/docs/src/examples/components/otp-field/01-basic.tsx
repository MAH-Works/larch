import { useState } from 'react';
import { Field } from '@mah-works/larch/field';
import { OTPField } from '@mah-works/larch/otp-field';

export const title = 'Verification code';
export const description = 'Auto-advance, backspace, arrow keys and paste-to-fill come from Base UI. `onValueComplete` fires once every slot is filled.';
export const layout = 'padded';

const LENGTH = 6;

export default function Basic() {
  const [code, setCode] = useState('');
  return (
    <Field.Root>
      <Field.Label>Verification code</Field.Label>
      <OTPField.Root length={LENGTH} onValueComplete={setCode} onValueChange={() => setCode('')}>
        {Array.from({ length: LENGTH }, (_, i) => (
          <OTPField.Input key={i} aria-label={i === 0 ? undefined : `Character ${i + 1} of ${LENGTH}`} />
        ))}
      </OTPField.Root>
      <Field.Description>{code ? `Complete: ${code}` : 'Enter the 6 digits we emailed you.'}</Field.Description>
    </Field.Root>
  );
}
