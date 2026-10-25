import { useState } from 'react';
import { ActivityList, Tabs } from '@mah-works/larch';

export const title = 'Controlled with rich content';
export const layout = 'padded';

export default function Controlled() {
  const [tab, setTab] = useState('activity');
  return (
    <div className="max-w-[520px]">
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          {
            id: 'activity',
            label: 'Activity',
            content: (
              <ActivityList
                items={[
                  { icon: 'check', who: 'Jamie Chen', text: 'completed the onboarding brief.', time: '12 minutes ago' },
                  { icon: 'plus', who: 'Maria Costa', text: 'added a new project.', time: '46 minutes ago' },
                ]}
              />
            ),
          },
          { id: 'notes', label: 'Notes', content: 'No notes yet.' },
        ]}
      />
      <p className="mb-0 mt-4 text-[11px] text-faint">Active tab: {tab}</p>
    </div>
  );
}
