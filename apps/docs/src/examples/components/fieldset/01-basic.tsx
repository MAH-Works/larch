import { Field } from '@mah-works/larch/field';
import { Fieldset } from '@mah-works/larch/fieldset';
import { Input } from '@mah-works/larch/input';

export const title = 'Basic';
export const description = 'Groups related fields under a legend (Larch’s eyebrow style); `disabled` on the Root disables every field inside.';
export const layout = 'padded';

export default function Basic() {
  return (
    <Fieldset.Root className="max-w-[340px]">
      <Fieldset.Legend>Billing contact</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input defaultValue="Maria Costa" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input defaultValue="billing@parallax.studio" />
      </Field.Root>
    </Fieldset.Root>
  );
}
