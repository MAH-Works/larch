import {
  AccountItem,
  ActivityList,
  HealthChart,
  Panel,
  PanelGrid,
  PanelLink,
  PanelSelect,
  ProgressList,
} from '@compass/ui';

export const title = 'Overview panels';
export const description = 'Two PanelGrids stacked: chart + renewals, then activity + workload.';
export const layout = 'canvas';

export default function OverviewPanels() {
  return (
    <>
      <PanelGrid>
        <Panel
          title="Client health"
          subtitle="Portfolio sentiment across the last four weeks."
          action={<PanelSelect label="Health period" options={['4 weeks', '3 months']} />}
        >
          <HealthChart
            data={[
              { label: 'Good', value: 24, height: 78, tone: 'green' },
              { label: 'Stable', value: 8, height: 58, tone: 'blue' },
              { label: 'Watch', value: 4, height: 34, tone: 'amber' },
              { label: 'Risk', value: 1, height: 18, tone: 'red' },
            ]}
          />
        </Panel>
        <Panel title="Upcoming renewals" subtitle="Next 30 days" action={<PanelLink href="#">View all</PanelLink>}>
          <AccountItem name="Aperture Labs" mark="sky" meta="Renews in 4 days" value="$24.8k" />
          <AccountItem name="Parallax Studio" mark="violet" meta="Renews in 11 days" value="$16.2k" />
          <AccountItem name="Northstar Health" mark="lime" meta="Renews in 21 days" value="$8.4k" />
        </Panel>
      </PanelGrid>

      <PanelGrid>
        <Panel title="Recent activity" subtitle="Latest updates from your team." action={<PanelLink href="#">See activity</PanelLink>}>
          <ActivityList
            items={[
              { icon: 'check', who: 'Jamie Chen', text: 'completed the onboarding brief for Aperture Labs.', time: '12 minutes ago' },
              { icon: 'plus', who: 'Maria Costa', text: 'added a new project to Parallax Studio.', time: '46 minutes ago' },
              { icon: 'checkSmall', who: 'You', text: 'moved Northstar Health to onboarding.', time: '2 hours ago' },
            ]}
          />
        </Panel>
        <Panel title="Team workload" subtitle="Tasks by owner">
          <ProgressList
            items={[
              { label: 'Jamie Chen', value: 42, percent: 78, tone: 'blue' },
              { label: 'Maria Costa', value: 35, percent: 64, tone: 'green' },
              { label: 'Alex Singh', value: 26, percent: 48, tone: 'amber' },
              { label: 'Riley Brown', value: 19, percent: 35, tone: 'violet' },
            ]}
          />
        </Panel>
      </PanelGrid>
    </>
  );
}
