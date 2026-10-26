import { Select } from '@mah-works/larch/select';

export const title = 'Groups and placeholder';
export const description = 'Groups get Larch’s small uppercase label; `alignItemWithTrigger={false}` opens the list below the trigger instead.';
export const layout = 'padded';

const OWNERS = {
  'Account team': ['Maria Costa', 'Jamie Chen'],
  Support: ['Alex Singh', 'Kai Foster'],
};

export default function Groups() {
  return (
    <div className="flex max-w-[280px] flex-col gap-[6px]">
      <Select.Root>
        <Select.Label>Owner</Select.Label>
        <Select.Trigger>
          <Select.Value placeholder="Assign an owner" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner alignItemWithTrigger={false} sideOffset={6}>
            <Select.Popup>
              <Select.List>
                {Object.entries(OWNERS).map(([group, people], i) => (
                  <Select.Group key={group}>
                    {i > 0 && <Select.Separator />}
                    <Select.GroupLabel>{group}</Select.GroupLabel>
                    {people.map((p) => (
                      <Select.Item key={p} value={p}>
                        <Select.ItemText>{p}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Group>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
