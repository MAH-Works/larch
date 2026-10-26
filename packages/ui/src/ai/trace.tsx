import type { ComponentProps } from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { styled } from '../base-ui/styled.js';
import { FOCUS_RING } from '../base-ui/classes.js';
import { CHEVRON } from '../base-ui/accordion.js';
import { part } from './part.js';

/** A row's progress. Omit it for finished work. */
export type TraceStatus = 'running' | 'error' | 'pending';

const Root = part('div', 'flex min-w-0 flex-col gap-px text-xs', { name: 'Trace.Root' });

// The row carries its status as data-status, so Title and Icon restyle through the named group.
const Line = part(
  'span',
  'group/trace-line flex min-h-7 min-w-0 items-center gap-2 text-soft data-[status=error]:text-red data-[status=pending]:text-faint',
  {
    variants: { status: { running: '', error: '', pending: '' } satisfies Record<TraceStatus, string> },
    name: 'Trace.Line',
  },
);

const Icon = part(
  'span',
  'flex size-[13px] shrink-0 items-center justify-center text-[#9197a0] *:size-[13px] group-data-[status=error]/trace-line:text-red group-data-[status=pending]/trace-line:text-faint group-data-[status=running]/trace-line:text-blue',
  { name: 'Trace.Icon' },
);

const Title = part('span', 'min-w-0 truncate group-data-[status=running]/trace-line:shimmer-text', { name: 'Trace.Title' });

const Description = part('span', 'shrink-0 text-faint tabular-nums', { name: 'Trace.Description' });

const CollapsibleRoot = styled(BaseCollapsible.Root, 'flex min-w-0 flex-col', { name: 'Trace.Collapsible' });

const Trigger = styled(
  BaseCollapsible.Trigger,
  `flex w-full min-w-0 items-center gap-1 rounded-[5px] pr-1 text-left outline-hidden hover:[&_*]:text-ink ${CHEVRON} after:size-[5px] ${FOCUS_RING}`,
  { name: 'Trace.Trigger' },
);

const Panel = styled(
  BaseCollapsible.Panel,
  'h-(--collapsible-panel-height) overflow-hidden text-body transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0',
  { name: 'Trace.Content' },
);

/** The expanded detail. Height animates, so the indent and spacing sit on an inner wrapper. */
function Content({ children, ...props }: ComponentProps<typeof Panel>) {
  return (
    <Panel {...props}>
      <div className="pb-1.5 pl-[21px] pt-0.5">{children}</div>
    </Panel>
  );
}
Content.displayName = 'Trace.Content';

/**
 * A list of an agent's steps: tool calls, reasoning, sources, file edits. Every row has the same shape,
 * so the patterns built on it (Reasoning, Tool, Plan, Sources…) read as one system.
 *
 *   <Trace.Root>
 *     <Trace.Collapsible>
 *       <Trace.Trigger>
 *         <Trace.Line status="running">
 *           <Trace.Icon><Icon name="terminal" /></Trace.Icon>
 *           <Trace.Title>Running pnpm build</Trace.Title>
 *         </Trace.Line>
 *       </Trace.Trigger>
 *       <Trace.Content>…</Trace.Content>
 *     </Trace.Collapsible>
 *   </Trace.Root>
 */
export const Trace = { Root, Line, Icon, Title, Description, Collapsible: CollapsibleRoot, Trigger, Content };
