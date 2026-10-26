import { useState } from 'react';
import { Switch } from '@mah-works/larch/switch';

export const title = 'Controlled';
export const description = '`checked` + `onCheckedChange`, wrapped in a label.';
export const layout = 'padded';

export default function Controlled() {
  const [on, setOn] = useState(false);
  return (
    <label className="flex max-w-[380px] items-center justify-between gap-[14px]">
      <span>
        <strong className="block text-xs font-semibold text-ink">Share with workspace</strong>
        <span className="mt-[2px] block text-[10px] text-[#9298a1] dark:text-[#8a939f]">
          {on ? 'Everyone on the workspace can open this view.' : 'Only you can see this view.'}
        </span>
      </span>
      <Switch.Root checked={on} onCheckedChange={setOn}>
        <Switch.Thumb />
      </Switch.Root>
    </label>
  );
}
