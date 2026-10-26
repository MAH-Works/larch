import { useState } from 'react';
import { Menu } from '@mah-works/larch/menu';
import { Icon } from '@mah-works/larch';

export const title = 'Filter with radio items';
export const description = 'A ghost trigger inside a toolbar, aligned to the end. Menu.RadioGroup keeps one choice checked.';

const STATUSES = ['All statuses', 'On track', 'Starting', 'At risk', 'Planning'];

export default function RadioFilter() {
  const [status, setStatus] = useState(STATUSES[0]);
  return (
    <div className="flex w-full max-w-[420px] items-center justify-between rounded-lg border border-line px-3 py-2">
      <span className="text-xs text-muted">Projects</span>
      <Menu.Root>
        <Menu.Trigger variant="ghost">
          {status} <Icon name="chevronDown" size="xs" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={6} align="end">
            <Menu.Popup>
              <Menu.RadioGroup value={status} onValueChange={setStatus}>
                <Menu.GroupLabel>Status</Menu.GroupLabel>
                {STATUSES.map((s) => (
                  <Menu.RadioItem key={s} value={s}>
                    <Menu.RadioItemIndicator />
                    {s}
                  </Menu.RadioItem>
                ))}
              </Menu.RadioGroup>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}
