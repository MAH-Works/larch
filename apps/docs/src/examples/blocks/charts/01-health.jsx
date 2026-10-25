import { HealthChart, Panel, PanelSelect } from '@compass/ui';

export const title = 'Category bars';
export const layout = 'canvas';

export default function Health() {
  return (
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
  );
}
