import { Breakdown, Panel } from '@larch/ui';

export const title = 'Share of total';
export const layout = 'canvas';

export default function BreakdownExample() {
  return (
    <div className="max-w-[420px]">
      <Panel title="Revenue mix" subtitle="By client segment">
        <Breakdown
          items={[
            { label: 'Enterprise', amount: '$614k', share: 48, tone: 'blue' },
            { label: 'Growth', amount: '$320k', share: 25, tone: 'violet' },
            { label: 'Scale', amount: '$218k', share: 17, tone: 'green' },
            { label: 'Startup', amount: '$128k', share: 10, tone: 'amber' },
          ]}
        />
      </Panel>
    </div>
  );
}
