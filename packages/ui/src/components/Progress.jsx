import { Meter } from '../base-ui/meter.js';

export { TONES as PROGRESS_TONES } from '../base-ui/classes.js';

/**
 * One "label ── bar ── value" row (team workload, playbook progress, data health), built on Base UI Meter.
 * `percent` (0–100) fills the bar; `value` is the text shown on the right and announced to screen readers.
 */
export function ProgressRow({ label, value, percent, tone = 'blue' }) {
  return (
    <Meter.Root
      value={Math.max(0, Math.min(100, percent))}
      getAriaValueText={(formatted) => (value == null ? formatted : String(value))}
      className="grid-cols-[90px_1fr_34px]"
    >
      <Meter.Label>{label}</Meter.Label>
      <Meter.Track className="col-span-1">
        <Meter.Indicator tone={tone} />
      </Meter.Track>
      <Meter.Value>{(formatted) => value ?? formatted}</Meter.Value>
    </Meter.Root>
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
