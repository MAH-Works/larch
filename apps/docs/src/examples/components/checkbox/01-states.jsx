import { Checkbox } from '@mah-works/larch/checkbox';

export const title = 'States';
export const description = 'An empty Checkbox.Indicator draws Larch’s check — or a dash when `indeterminate`.';

export default function States() {
  return (
    <>
      {[
        ['Unchecked', {}],
        ['Checked', { defaultChecked: true }],
        ['Indeterminate', { indeterminate: true }],
        ['Disabled', { disabled: true }],
        ['Disabled checked', { disabled: true, defaultChecked: true }],
      ].map(([label, props]) => (
        <Checkbox.Root key={label} aria-label={label} {...props}>
          <Checkbox.Indicator />
        </Checkbox.Root>
      ))}
    </>
  );
}
