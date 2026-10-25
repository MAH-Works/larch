import { useState } from 'react';
import { Dropdown } from '@larch/ui';

export const title = 'Ghost trigger as a filter';
export const description = 'Use a ghost trigger inside toolbars, and align the menu right when it sits at the end of a row.';

const STATUSES = ['All statuses', 'On track', 'Starting', 'At risk', 'Planning'];

export default function Filter() {
  const [status, setStatus] = useState(STATUSES[0]);
  return (
    <div className="flex w-full max-w-[420px] items-center justify-between rounded-lg border border-line px-3 py-2">
      <span className="text-xs text-muted">Projects</span>
      <Dropdown
        variant="ghost"
        align="right"
        label={status}
        items={STATUSES.map((s) => ({ label: s, onSelect: () => setStatus(s) }))}
      />
    </div>
  );
}
