import { MetricGrid } from '@mah-works/larch';

export const title = 'Metric grid';
export const layout = 'canvas';

export default function Grid() {
  return (
    <MetricGrid
      className="mb-0"
      items={[
        { label: 'Active clients', value: '24', meta: [{ text: '↗ 8.3%', trend: 'up' }, { text: 'vs. last month' }] },
        { label: 'Projects in motion', value: '84', meta: [{ text: '↗ 12.5%', trend: 'up' }, { text: 'vs. last month' }] },
        { label: 'Open tasks', value: '327', meta: [{ text: '↘ 4.1%', trend: 'down' }, { text: 'vs. last month' }] },
        { label: 'Revenue this month', value: '$184.2k', meta: [{ text: '↗ 16.8%', trend: 'up' }, { text: 'vs. last month' }] },
      ]}
    />
  );
}
