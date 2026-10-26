import { part } from './part.js';

const Root = part('div', 'flex min-h-6 min-w-0 items-center gap-2 text-[11px] text-muted', {
  variants: {
    variant: {
      default: '',
      border: 'border-b border-line pb-2',
      // A centred label between hairlines, for dates and section breaks. Don't give it role="separator".
      separator:
        "justify-center gap-3 text-faint before:h-px before:flex-1 before:bg-line before:content-[''] after:h-px after:flex-1 after:bg-line after:content-['']",
    },
  },
  defaults: { variant: 'default' },
  name: 'Marker.Root',
});

const Icon = part('span', 'flex size-[13px] shrink-0 items-center justify-center text-faint *:size-[13px]', {
  attrs: { 'aria-hidden': true },
  name: 'Marker.Icon',
});

const Content = part('span', 'min-w-0', { name: 'Marker.Content' });

/**
 * A note between turns: streaming status (give it role="status"), system notes, or a labelled date break
 * (`variant="separator"`). Use `render` to make it a link or button.
 */
export const Marker = { Root, Icon, Content };
