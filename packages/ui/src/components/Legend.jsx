export const LEGEND_TONES = {
  blue: 'bg-blue',
  green: 'bg-[#39ad79]',
  amber: 'bg-[#d19a35]',
  red: 'bg-[#d45d6b]',
  violet: 'bg-[#7e61c4]',
};

/** Colored dot. Used by Legend and anywhere a series needs a key. */
export function Dot({ tone = 'blue', className = '' }) {
  return <i className={`inline-block size-[7px] shrink-0 rounded-full ${LEGEND_TONES[tone]} ${className}`} />;
}

/** Chart legend: `items` is [{ label, tone }]. */
export function Legend({ items, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-4 text-[11px] text-[#858b95] ${className}`}>
      {items.map(({ label, tone }) => (
        <span key={label} className="inline-flex items-center gap-[6px]">
          <Dot tone={tone} />
          {label}
        </span>
      ))}
    </div>
  );
}
