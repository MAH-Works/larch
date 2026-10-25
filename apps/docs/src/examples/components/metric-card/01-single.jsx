import { MetricCard } from '@compass/ui';

export const title = 'Metric card';
export const description = 'Trend text is green for up, red for down; plain meta stays grey.';
export const layout = 'canvas';

export default function Single() {
  return (
    <div className="grid max-w-[560px] grid-cols-2 gap-[14px] mobile:grid-cols-1">
      <MetricCard label="Revenue this month" value="$184.2k" meta={[{ text: '↗ 16.8%', trend: 'up' }, { text: 'vs. last month' }]} />
      <MetricCard label="Open tasks" value="327" meta={[{ text: '↘ 4.1%', trend: 'down' }, { text: 'vs. last month' }]} />
    </div>
  );
}
