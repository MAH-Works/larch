import { ActivityList, Panel } from '@mah-works/larch';

export const title = 'Activity feed';
export const layout = 'canvas';

export default function Activity() {
  return (
    <div className="max-w-[420px]">
      <Panel title="Recent activity" subtitle="Latest updates from your team.">
        <ActivityList
          items={[
            { icon: 'check', who: 'Jamie Chen', text: 'completed the onboarding brief for Aperture Labs.', time: '12 minutes ago' },
            { icon: 'plus', who: 'Maria Costa', text: 'added a new project to Parallax Studio.', time: '46 minutes ago' },
            { icon: 'tag', who: 'Alex Singh', text: 'tagged Harbor & Co. as High Priority.', time: '1 hour ago' },
            { icon: 'checkSmall', who: 'You', text: 'moved Northstar Health to onboarding.', time: '2 hours ago' },
          ]}
        />
      </Panel>
    </div>
  );
}
