import type { ComponentProps } from 'react';
import { Checkbox } from '@mah-works/larch/checkbox';

export const title = 'States';
export const description = 'An empty Checkbox.Indicator draws Larch’s check — or a dash when `indeterminate`.';

const STATES: [label: string, props: ComponentProps<typeof Checkbox.Root>][] = [
  ['Unchecked', {}],
  ['Checked', { defaultChecked: true }],
  ['Indeterminate', { indeterminate: true }],
  ['Disabled', { disabled: true }],
  ['Disabled checked', { disabled: true, defaultChecked: true }],
];

export default function States() {
  return (
    <>
      {STATES.map(([label, props]) => (
        <Checkbox.Root key={label} aria-label={label} {...props}>
          <Checkbox.Indicator />
        </Checkbox.Root>
      ))}
    </>
  );
}
