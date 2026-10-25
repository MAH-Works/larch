import { ProgressList } from '@larch/ui';

export const title = 'Progress rows';
export const description = 'Label, bar and value in a fixed three-column grid — workload, pipeline stages, data health.';
export const layout = 'padded';

export default function Rows() {
  return (
    <div className="max-w-[420px]">
      <ProgressList
        items={[
          { label: 'Discovery', value: '86%', percent: 86, tone: 'green' },
          { label: 'Proposal', value: '64%', percent: 64, tone: 'blue' },
          { label: 'Negotiation', value: '42%', percent: 42, tone: 'amber' },
          { label: 'Contract', value: '28%', percent: 28, tone: 'violet' },
        ]}
      />
    </div>
  );
}
