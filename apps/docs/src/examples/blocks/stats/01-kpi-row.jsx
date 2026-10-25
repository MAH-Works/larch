import { MetricGrid } from '@larch/ui';

export const title = 'KPI row';
export const layout = 'canvas';

export default function KpiRow() {
  return (
    <MetricGrid
      className="mb-0"
      items={[
        { label: 'Net revenue', value: '$1.28m', meta: [{ text: '↗ 14.2%', trend: 'up' }, { text: 'year over year' }] },
        { label: 'Retention', value: '94.8%', meta: [{ text: '↗ 2.1%', trend: 'up' }, { text: 'year over year' }] },
        { label: 'Avg. project value', value: '$18.4k', meta: [{ text: '↗ 6.7%', trend: 'up' }, { text: 'year over year' }] },
        { label: 'Delivery on time', value: '87%', meta: [{ text: '↘ 1.4%', trend: 'down' }, { text: 'year over year' }] },
      ]}
    />
  );
}
