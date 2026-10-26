import { part } from './part.js';

export const BUBBLE_VARIANTS = {
  default: 'bg-blue text-white',
  secondary: 'bg-hover text-ink',
  muted: 'bg-[#f2f3f5] text-ink dark:bg-[#20262e]',
  tinted: 'bg-blue-soft text-ink',
  outline: 'border border-line-strong bg-surface text-ink',
  ghost: 'max-w-full rounded-none bg-transparent text-ink',
  destructive: 'bg-red-soft text-red',
};

const Root = part(
  'div',
  'group/bubble relative flex max-w-[min(560px,85%)] min-w-0 flex-col rounded-[12px] data-[align=end]:self-end',
  {
    variants: { variant: BUBBLE_VARIANTS, align: { start: '', end: '' } },
    defaults: { variant: 'secondary', align: 'start' },
    name: 'Bubble.Root',
  },
);

const Content = part(
  'div',
  'min-w-0 px-3 py-2 text-[13px] leading-relaxed [overflow-wrap:anywhere] group-data-[variant=ghost]/bubble:p-0',
  { name: 'Bubble.Content' },
);

// Overlaps the bubble's edge; leave a little extra gap between rows that have reactions.
const Reactions = part(
  'div',
  'absolute -bottom-3 end-2 flex items-center gap-0.5 rounded-full border border-line bg-surface px-1.5 py-px text-[11px] shadow-card data-[side=top]:-top-3 data-[side=top]:bottom-auto data-[align=start]:start-2 data-[align=start]:end-auto',
  {
    variants: { side: { top: '', bottom: '' }, align: { start: '', end: '' } },
    defaults: { side: 'bottom', align: 'end' },
    name: 'Bubble.Reactions',
  },
);

const Group = part('div', 'flex flex-col gap-1', { name: 'Bubble.Group' });

/** The visible surface of a message. `ghost` is unframed — for assistant markdown and rich content. */
export const Bubble = { Root, Content, Reactions, Group };
