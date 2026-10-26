import { Field } from '@mah-works/larch/field';

export const title = 'Validation';
export const description =
  'Native constraints (`required`, `type`, `minLength`…) plus a `validate` function. `validationMode="onBlur"` checks as you leave the field; Field.Error turns the control red.';
export const layout = 'padded';

export default function Validation() {
  return (
    <div className="max-w-[340px]">
      <Field.Root validationMode="onBlur" validate={(v) => (v.endsWith('.test') ? 'Use a real domain, not .test.' : null)}>
        <Field.Label>Work email</Field.Label>
        <Field.Control type="email" required defaultValue="jamie@aperture.test" />
        <Field.Error match="valueMissing">Enter an email address.</Field.Error>
        <Field.Error match="typeMismatch">Enter a valid email address.</Field.Error>
        <Field.Error match="customError" />
        <Field.Description>Tab out of the field to validate it.</Field.Description>
      </Field.Root>
    </div>
  );
}
