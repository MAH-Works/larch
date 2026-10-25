import { useState } from 'react';
import { Switch } from '@compass/ui';

export const title = 'Controlled';
export const layout = 'padded';

export default function Controlled() {
  const [on, setOn] = useState(false);
  return (
    <div className="max-w-[380px]">
      <Switch
        label="Share with workspace"
        description={on ? 'Everyone on the workspace can open this view.' : 'Only you can see this view.'}
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
    </div>
  );
}
