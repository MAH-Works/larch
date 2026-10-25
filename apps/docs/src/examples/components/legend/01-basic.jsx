import { Dot, Legend } from '@mah-works/larch';

export const title = 'Legend & dot';

export default function Basic() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Legend
        items={[
          { label: 'Good', tone: 'green' },
          { label: 'Stable', tone: 'blue' },
          { label: 'Watch', tone: 'amber' },
          { label: 'Risk', tone: 'red' },
          { label: 'Expansion', tone: 'violet' },
        ]}
      />
      <span className="inline-flex items-center gap-2 text-xs text-muted">
        <Dot tone="green" /> Synced 2 minutes ago
      </span>
    </div>
  );
}
