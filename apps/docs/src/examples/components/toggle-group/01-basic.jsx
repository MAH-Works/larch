import { useState } from 'react';
import { Toggle } from '@mah-works/larch/toggle';
import { ToggleGroup } from '@mah-works/larch/toggle-group';
import { Icon } from '@mah-works/larch';

export const title = 'Segmented control';
export const description = 'Single selection by default; pass `multiple` to allow several. The value is always an array.';

export default function Basic() {
  const [view, setView] = useState(['table']);
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup value={view} onValueChange={(v) => v.length && setView(v)} aria-label="Layout">
        <Toggle value="table">
          <Icon name="table" size="sm" /> Table
        </Toggle>
        <Toggle value="list">
          <Icon name="list" size="sm" /> List
        </Toggle>
        <Toggle value="chart">
          <Icon name="chart" size="sm" /> Chart
        </Toggle>
      </ToggleGroup>
      <ToggleGroup multiple defaultValue={['email']} aria-label="Channels">
        <Toggle value="email">Email</Toggle>
        <Toggle value="slack">Slack</Toggle>
        <Toggle value="sms">SMS</Toggle>
      </ToggleGroup>
    </div>
  );
}
