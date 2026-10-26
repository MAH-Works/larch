import { Popover as BasePopover } from '@base-ui/react/popover';
import { theme } from './styled.js';
import { ARROW, button, POPUP, POSITIONER } from './classes.js';
import Icon from '../components/Icon.js';

/** Base UI Popover with Larch styles. Trigger and Close also take a Button `variant`. */
export const Popover = theme(BasePopover, 'Popover', {
  Trigger: button(),
  Positioner: POSITIONER,
  Popup: `${POPUP} relative h-(--popup-height,auto) w-(--popup-width,auto) max-w-[min(340px,var(--available-width))] px-[14px] py-3 text-xs`,
  Arrow: ARROW,
  Viewport: 'relative size-full',
  Title: 'm-0 pr-6 text-[13px] font-[650] tracking-[-.02em] text-ink',
  Description: 'mb-0 mt-1 text-[11px] leading-[1.45] text-[#8f959e]',
  Close: { ...button('iconSm'), children: <Icon name="close" size="xs" /> },
});
