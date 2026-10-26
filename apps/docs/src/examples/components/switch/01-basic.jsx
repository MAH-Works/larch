import { Field } from '@mah-works/larch/field';
import { Switch } from '@mah-works/larch/switch';

export const title = 'Settings list';
export const description = 'A Field per row: its Label names the Switch and its Description adds the caption.';
export const layout = 'padded';

const SETTINGS = [
  ['Email notifications', 'Get weekly workspace summaries.', true],
  ['Renewal reminders', 'Ping owners 30 days before renewal.', false],
  ['Compact rows', null, false],
];

export default function Basic() {
  return (
    <div className="flex max-w-[380px] flex-col gap-2">
      {SETTINGS.map(([label, description, checked]) => (
        <Field.Root key={label} className="min-h-9 flex-row items-center justify-between gap-[14px] [&+&]:mt-0">
          <div>
            <Field.Label className="text-xs text-ink">{label}</Field.Label>
            {description && <Field.Description className="mt-[2px]">{description}</Field.Description>}
          </div>
          <Switch.Root defaultChecked={checked}>
            <Switch.Thumb />
          </Switch.Root>
        </Field.Root>
      ))}
    </div>
  );
}
