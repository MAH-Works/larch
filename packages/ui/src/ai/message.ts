import { part } from './part.js';

const Root = part(
  'div',
  'group/message flex w-full min-w-0 items-end gap-[10px] data-[align=end]:flex-row-reverse',
  { variants: { align: { start: '', end: '' } }, defaults: { align: 'start' }, name: 'Message.Root' },
);

// Bottom-aligned with the bubble; lifts above the footer row when there is one.
const Avatar = part('div', 'shrink-0 group-has-[[data-slot=message-footer]]/message:mb-[30px]', {
  name: 'Message.Avatar',
});

const Content = part(
  'div',
  'flex min-w-0 flex-1 flex-col items-start gap-1 group-data-[align=end]/message:items-end',
  { name: 'Message.Content' },
);

const Header = part('div', 'self-start px-1 text-[11px] font-medium text-label', { name: 'Message.Header' });

const Footer = part('div', 'flex min-h-[26px] items-center gap-0.5 text-[11px] text-faint', {
  attrs: { 'data-slot': 'message-footer' },
  name: 'Message.Footer',
});

const Group = part('div', 'flex flex-col gap-1', { name: 'Message.Group' });

/**
 * One row of a conversation: avatar, header, the message surface (usually a Bubble) and a footer for
 * status or actions. `align="end"` puts the person's own turns on the right.
 */
export const Message = { Root, Avatar, Content, Header, Footer, Group };
