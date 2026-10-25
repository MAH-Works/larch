import { Checkbox } from '@compass/ui';

export const title = 'States';

export default function States() {
  return (
    <>
      <Checkbox aria-label="Unchecked" />
      <Checkbox aria-label="Checked" defaultChecked />
      <Checkbox aria-label="Indeterminate" indeterminate />
      <Checkbox aria-label="Disabled" disabled />
    </>
  );
}
