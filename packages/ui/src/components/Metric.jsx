import { Card } from './Card.jsx';

/** KPI tile. `meta` is [{ text, trend?: 'up' | 'down' }] — trend colors the text green/red. */
export function MetricCard({ label, value, meta = [], className = '' }) {
  return (
    <Card className={`min-h-[126px] px-[19px] py-[18px] mobile:min-h-[112px] ${className}`}>
      <div className="text-[11px] font-semibold uppercase tracking-[.08em] text-label">{label}</div>
      <div className="mt-[13px] text-[25px] font-[650] tracking-[-.045em] text-ink">{value}</div>
      <div className="mt-[7px] flex items-center gap-[7px] text-[11px] text-[#969ba4] dark:text-[#858e9a]">
        {meta.map((m, i) => (
          <span key={i} className={m.trend === 'up' ? 'text-green' : m.trend === 'down' ? 'text-red' : ''}>
            {m.text}
          </span>
        ))}
      </div>
    </Card>
  );
}

/** Four-up row of MetricCards (2-up below 980px, stacked on mobile). */
export function MetricGrid({ items, className = '' }) {
  return (
    <div className={`mb-4 grid grid-cols-4 gap-[14px] narrow:grid-cols-2 mobile:grid-cols-1 ${className}`}>
      {items.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </div>
  );
}
