import { useState } from 'react';
import { Tabs } from '@mah-works/larch/tabs';
import { ActivityList } from '@mah-works/larch';

export const title = 'Controlled with rich content';
export const layout = 'padded';

export default function Controlled() {
  const [tab, setTab] = useState('activity');
  return (
    <div className="max-w-[520px]">
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List>
          <Tabs.Tab value="activity">Activity</Tabs.Tab>
          <Tabs.Tab value="notes">Notes</Tabs.Tab>
          <Tabs.Tab value="files" disabled>
            Files
          </Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="activity">
          <ActivityList
            items={[
              { icon: 'check', who: 'Jamie Chen', text: 'completed the onboarding brief.', time: '12 minutes ago' },
              { icon: 'plus', who: 'Maria Costa', text: 'added a new project.', time: '46 minutes ago' },
            ]}
          />
        </Tabs.Panel>
        <Tabs.Panel value="notes">No notes yet.</Tabs.Panel>
      </Tabs.Root>
      <p className="mb-0 mt-4 text-[11px] text-faint">Active tab: {tab}</p>
    </div>
  );
}
