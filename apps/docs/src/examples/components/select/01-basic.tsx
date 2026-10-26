import { Select } from '@mah-works/larch/select';

export const title = 'Basic';
export const description =
  'Pass `items` so Select.Value can show the label. Select.Icon, ItemIndicator and the scroll arrows render Larch glyphs when left empty.';
export const layout = 'padded';

const STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Trial', value: 'trial' },
  { label: 'Onboarding', value: 'onboarding' },
  { label: 'Inactive', value: 'inactive' },
];

export default function Basic() {
  return (
    <div className="flex max-w-[280px] flex-col gap-[6px]">
      <Select.Root items={STATUSES} defaultValue="trial">
        <Select.Label>Status</Select.Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.ScrollUpArrow />
              <Select.List>
                {STATUSES.map(({ label, value }) => (
                  <Select.Item key={value} value={value}>
                    <Select.ItemText>{label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.List>
              <Select.ScrollDownArrow />
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
