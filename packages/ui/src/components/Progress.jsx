export const PROGRESS_TONES = {
  blue: 'bg-blue',
  green: 'bg-[#36a978]',
  amber: 'bg-[#c99537]',
  violet: 'bg-[#8061c4]',
  red: 'bg-[#d45d6b]',
};

/** 7px rounded track with a tone-colored fill. `percent` is 0–100. */
export function ProgressBar({ percent, tone = 'blue', className = '', label }) {
  const value = Math.max(0, Math.min(100, percent));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`h-[7px] overflow-hidden rounded-full bg-[#eef0f3] dark:bg-[#252b34] ${className}`}
    >
      <div className={`h-full rounded-[inherit] ${PROGRESS_TONES[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}

/** One "label ── bar ── value" row (team workload, playbook progress, data health). */
export function ProgressRow({ label, value, percent, tone = 'blue' }) {
  return (
    <div className="grid grid-cols-[90px_1fr_34px] items-center gap-[10px] text-[11px] text-[#727883] dark:text-muted">
      <span>{label}</span>
      <ProgressBar percent={percent} tone={tone} label={label} />
      <span className="text-right text-[11px] font-semibold text-[#545a63] dark:text-[#c0c7d0]">{value}</span>
    </div>
  );
}

/** Vertical stack of ProgressRows with the standard 17px rhythm. */
export function ProgressList({ items }) {
  return (
    <div className="flex flex-col gap-[17px]">
      {items.map((item) => (
        <ProgressRow key={item.label} {...item} />
      ))}
    </div>
  );
}

/** @deprecated Original compass-react name — use ProgressRow. */
export const WorkloadRow = ProgressRow;
