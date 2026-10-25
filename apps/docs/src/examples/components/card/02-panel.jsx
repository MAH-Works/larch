import { Panel, PanelLink, PanelSelect, ProgressList } from '@larch/ui';

export const title = 'Panel';
export const description = 'Title, subtitle and a header action — a PanelSelect, a PanelLink or a ghost button.';
export const layout = 'canvas';

export default function PanelExample() {
  return (
    <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
      <Panel
        title="Team workload"
        subtitle="Tasks by owner"
        action={<PanelSelect label="Workload period" options={['This week', 'This month']} />}
      >
        <ProgressList
          items={[
            { label: 'Jamie Chen', value: 42, percent: 78, tone: 'blue' },
            { label: 'Maria Costa', value: 35, percent: 64, tone: 'green' },
          ]}
        />
      </Panel>
      <Panel title="Upcoming renewals" subtitle="Next 30 days" action={<PanelLink href="#">View all</PanelLink>}>
        <p className="m-0 text-xs text-muted">Three renewals worth $49.4k.</p>
      </Panel>
    </div>
  );
}
