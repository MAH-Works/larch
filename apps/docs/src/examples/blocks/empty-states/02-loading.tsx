import { useEffect, useState } from 'react';
import { Button, Card, MetricGrid, Skeleton, type MetricCardProps } from '@mah-works/larch';

export const title = 'Loading → loaded';
export const description = 'Skeletons keep the layout stable while data loads.';
export const layout = 'canvas';

const METRICS: MetricCardProps[] = [
  { label: 'Active clients', value: '24', meta: [{ text: '↗ 8.3%', trend: 'up' }] },
  { label: 'Projects in motion', value: '84', meta: [{ text: '↗ 12.5%', trend: 'up' }] },
  { label: 'Open tasks', value: '327', meta: [{ text: '↘ 4.1%', trend: 'down' }] },
  { label: 'Revenue this month', value: '$184.2k', meta: [{ text: '↗ 16.8%', trend: 'up' }] },
];

export default function Loading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) return undefined;
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="mb-4 grid grid-cols-4 gap-[14px] narrow:grid-cols-2 mobile:grid-cols-1">
          {METRICS.map((m) => (
            <Card key={m.label} className="flex min-h-[126px] flex-col gap-4 px-[19px] py-[18px]">
              <Skeleton width="w-[55%]" />
              <Skeleton width="w-[40%]" className="h-5" />
              <Skeleton width="w-[30%]" />
            </Card>
          ))}
        </div>
      ) : (
        <MetricGrid items={METRICS} />
      )}
      <Button onClick={() => setLoading(true)} disabled={loading}>
        {loading ? 'Loading…' : 'Reload'}
      </Button>
    </>
  );
}
