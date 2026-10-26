import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import { theme } from './styled.js';
import { ARROW, button, FOCUS_RING, POPUP } from './classes.js';
import Icon from '../components/Icon.jsx';

const EASE = 'duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

/** Base UI NavigationMenu with Larch styles. Trigger takes a Button `variant` (ghost by default). */
export const NavigationMenu = theme(BaseNavigationMenu, 'NavigationMenu', {
  Root: 'relative',
  List: 'm-0 flex list-none items-center gap-[2px] p-0',
  Item: '',
  Trigger: button('ghost'),
  Icon: {
    base: 'inline-flex transition-transform duration-200 data-popup-open:rotate-180',
    children: <Icon name="chevronDown" size="xs" />,
  },
  Link: `block rounded-[7px] px-3 py-2 text-xs text-soft no-underline hover:bg-hover hover:text-ink data-active:font-semibold data-active:text-ink ${FOCUS_RING}`,
  Content:
    `h-full w-[calc(100vw-40px)] p-[5px] sm:w-max sm:max-w-[420px] transition-[opacity,translate] ${EASE} data-starting-style:opacity-0 data-ending-style:opacity-0 ` +
    'data-starting-style:data-[activation-direction=left]:-translate-x-1/2 data-starting-style:data-[activation-direction=right]:translate-x-1/2 data-ending-style:data-[activation-direction=left]:translate-x-1/2 data-ending-style:data-[activation-direction=right]:-translate-x-1/2',
  Positioner:
    `z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] ${EASE} data-instant:transition-none ` +
    "before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-['']",
  Popup: `${POPUP} relative h-(--popup-height) w-(--popup-width) transition-[opacity,scale,width,height] ${EASE}`,
  Viewport: 'relative size-full overflow-hidden',
  Arrow: ARROW,
});
