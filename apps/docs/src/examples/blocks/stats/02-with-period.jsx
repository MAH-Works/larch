import { useState } from 'react';
import { MetricGrid, PanelSelect } from '@mah-works/larch';

export const title = 'With a period switcher';
export const layout = 'canvas';

const DATA = {
  'Next 90 days': [
    { label: 'Renewing soon', value: '12', meta: [{ text: 'Next 90 days' }] },
    { label: 'Renewal value', value: '$286k', meta: [{ text: '↗ 8.4%', trend: 'up' }, { text: 'vs. last quarter' }] },
    { label: 'At risk', value: '2', meta: [{ text: '$34.1k', trend: 'down' }, { text: 'annual value' }] },
    { label: 'Won this quarter', value: '$148k', meta: [{ text: '↗ 12.6%', trend: 'up' }, { text: 'vs. last quarter' }] },
  ],
  'Next 6 months': [
    { label: 'Renewing soon', value: '27', meta: [{ text: 'Next 6 months' }] },
    { label: 'Renewal value', value: '$612k', meta: [{ text: '↗ 5.2%', trend: 'up' }, { text: 'vs. last half' }] },
    { label: 'At risk', value: '5', meta: [{ text: '$71.8k', trend: 'down' }, { text: 'annual value' }] },
    { label: 'Won this half', value: '$301k', meta: [{ text: '↗ 9.9%', trend: 'up' }, { text: 'vs. last half' }] },
  ],
};

export default function WithPeriod() {
  const [period, setPeriod] = useState('Next 90 days');
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">Renewals at a glance</h2>
        <PanelSelect label="Period" options={Object.keys(DATA)} value={period} onChange={(e) => setPeriod(e.target.value)} />
      </div>
      <MetricGrid className="mb-0" items={DATA[period]} />
    </>
  );
}
