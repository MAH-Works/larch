import Icon from '../components/Icon.js';
import { FOCUS_RING } from '../base-ui/classes.js';
import { Trace } from './trace.js';
import type { SourceUrlPart } from './types.js';

export const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

/** Keep the first part for each URL — agents often cite the same page more than once. */
export const uniqueSources = (parts: readonly { type: string }[]): SourceUrlPart[] =>
  (parts.filter((p) => p.type === 'source-url') as SourceUrlPart[]).filter(
    (part, i, all) => all.findIndex((other) => other.url === part.url) === i,
  );

export interface SourcesProps {
  /** `source-url` parts; pass `uniqueSources(message.parts)` to dedupe. */
  sources: readonly SourceUrlPart[];
  defaultOpen?: boolean;
}

/** The links an agent used, as "Used N sources" that expands into one link row per source. */
export function Sources({ sources, defaultOpen }: SourcesProps) {
  if (sources.length === 0) return null;
  return (
    <Trace.Root>
      <Trace.Collapsible defaultOpen={defaultOpen}>
        <Trace.Trigger>
          <Trace.Line>
            <Trace.Icon>
              <Icon name="globe" />
            </Trace.Icon>
            <Trace.Title>
              Used {sources.length} {sources.length === 1 ? 'source' : 'sources'}
            </Trace.Title>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content>
          <Trace.Root>
            {sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className={`rounded-[5px] no-underline outline-hidden hover:[&_*]:text-ink ${FOCUS_RING}`}
              >
                <Trace.Line>
                  <Trace.Icon>
                    <Icon name="globe" />
                  </Trace.Icon>
                  <Trace.Title>
                    {source.title ?? hostname(source.url)}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Trace.Title>
                  <Trace.Icon>
                    <Icon name="arrowUpRight" />
                  </Trace.Icon>
                </Trace.Line>
              </a>
            ))}
          </Trace.Root>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
