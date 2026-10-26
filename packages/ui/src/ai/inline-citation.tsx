import { PreviewCard } from '../base-ui/preview-card.js';
import { FOCUS_RING } from '../base-ui/classes.js';
import Icon from '../components/Icon.js';
import { hostname } from './sources.js';
import type { SourceUrlPart } from './types.js';

export interface InlineCitationProps {
  /** The `source-url` parts this sentence cites (at least one). */
  sources: readonly SourceUrlPart[];
}

/**
 * A citation inside a sentence: a small pill with the first source's host (+N for more), which previews
 * every source on hover or keyboard focus. The pill is a real link, so it's reachable without a pointer.
 */
export function InlineCitation({ sources }: InlineCitationProps) {
  const [first, ...rest] = sources;
  if (!first) return null;
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger
        href={first.url}
        target="_blank"
        rel="noreferrer"
        delay={10}
        closeDelay={100}
        className={`mx-0.5 inline-flex h-[18px] items-center gap-1 rounded-full bg-hover px-1.5 align-[1px] text-[10px] font-medium text-soft no-underline hover:text-ink data-popup-open:bg-blue-soft data-popup-open:text-blue ${FOCUS_RING}`}
      >
        {hostname(first.url)}
        {rest.length > 0 && <span className="text-faint">+{rest.length}</span>}
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={6}>
          <PreviewCard.Popup className="flex w-72 flex-col gap-2.5">
            {sources.map((source) => (
              <div key={source.url} className="min-w-0">
                <div className="truncate text-xs font-semibold text-strong">{source.title ?? hostname(source.url)}</div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex max-w-full items-center gap-1 rounded-xs text-[11px] text-blue no-underline hover:underline ${FOCUS_RING}`}
                >
                  <span className="truncate">{hostname(source.url)}</span>
                  <Icon name="arrowUpRight" size="xs" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            ))}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
