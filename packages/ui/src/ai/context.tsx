import type { ReactNode } from 'react';
import { PreviewCard } from '../base-ui/preview-card.js';
import { Meter } from '../base-ui/meter.js';
import { buttonClasses } from '../base-ui/classes.js';
import { merge } from '../base-ui/styled.js';

export interface ContextProps {
  /** Tokens used — e.g. `inputTokens + outputTokens` from the message's `usage` metadata. */
  used: number;
  /** The model's context window. The AI SDK doesn't send it; set it per model. */
  limit: number;
  /** Optional rows under the bar, e.g. input / output / reasoning / cached tokens or cost. */
  details?: { label: ReactNode; value: ReactNode }[];
  className?: string;
}

const fmt = new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 });

/** How much of the context window is used: "{n}% context", with a breakdown on hover or focus. */
export function Context({ used, limit, details = [], className }: ContextProps) {
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const tone = percent >= 90 ? 'red' : percent >= 75 ? 'amber' : 'blue';
  const circumference = 2 * Math.PI * 6;

  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger
        delay={10}
        closeDelay={100}
        render={<button type="button" />}
        className={merge(buttonClasses('ghost'), 'h-7 gap-1.5 px-2 text-[11px] no-underline tabular-nums', className)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-[14px] -rotate-90">
          <circle cx="8" cy="8" r="6" fill="none" strokeWidth="2" className="stroke-line-strong" />
          <circle
            cx="8"
            cy="8"
            r="6"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percent / 100)}
            className={tone === 'red' ? 'stroke-red' : tone === 'amber' ? 'stroke-amber' : 'stroke-blue'}
          />
        </svg>
        {percent}% context
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={6} side="top">
          <PreviewCard.Popup className="flex w-64 flex-col gap-3">
            <Meter.Root value={percent} getAriaValueText={() => `${percent}% of the context window used`}>
              <Meter.Label className="font-semibold text-ink">Context</Meter.Label>
              <Meter.Value>{() => `${fmt.format(used)} / ${fmt.format(limit)}`}</Meter.Value>
              <Meter.Track>
                <Meter.Indicator tone={tone} />
              </Meter.Track>
            </Meter.Root>
            {details.length > 0 && (
              <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-t border-line pt-2.5 text-[11px]">
                {details.map((row, i) => (
                  <div key={i} className="contents">
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="m-0 text-right font-medium tabular-nums text-strong">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
