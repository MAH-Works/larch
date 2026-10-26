import { useState } from 'react';
import { Checkbox } from '@mah-works/larch/checkbox';
import { CheckboxGroup } from '@mah-works/larch/checkbox-group';

export const title = 'With a parent checkbox';
export const description = 'CheckboxGroup owns the array value. A `parent` checkbox plus `allValues` gives you select-all with no extra state.';
export const layout = 'padded';

const CHANNELS = [
  ['email', 'Email digest'],
  ['slack', 'Slack mentions'],
  ['sms', 'SMS for at-risk renewals'],
];

const row = 'flex items-center gap-2 text-xs text-[#656b74] dark:text-muted';

export default function Basic() {
  const [value, setValue] = useState(['email']);
  return (
    <CheckboxGroup aria-labelledby="channels" value={value} onValueChange={setValue} allValues={CHANNELS.map(([v]) => v)}>
      <label id="channels" className={`${row} font-semibold text-ink`}>
        <Checkbox.Root parent>
          <Checkbox.Indicator />
        </Checkbox.Root>
        All channels
      </label>
      {CHANNELS.map(([v, label]) => (
        <label key={v} className={`${row} ml-5`}>
          <Checkbox.Root value={v}>
            <Checkbox.Indicator />
          </Checkbox.Root>
          {label}
        </label>
      ))}
    </CheckboxGroup>
  );
}
