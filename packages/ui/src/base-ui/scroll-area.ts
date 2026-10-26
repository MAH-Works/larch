import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import { theme } from './styled.js';
import { FOCUS_RING } from './classes.js';

/** Base UI ScrollArea with Larch's thin overlay scrollbars, shown while hovering or scrolling. */
export const ScrollArea = theme(BaseScrollArea, 'ScrollArea', {
  Root: 'relative overflow-hidden',
  Viewport: `size-full overscroll-contain rounded-[inherit] outline-hidden ${FOCUS_RING}`,
  Scrollbar:
    'pointer-events-none m-[3px] flex rounded-full opacity-0 transition-opacity delay-300 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-0 ' +
    'data-[orientation=vertical]:w-[6px] data-[orientation=horizontal]:h-[6px] data-[orientation=horizontal]:flex-col',
  Thumb: 'rounded-full bg-[#c9cdd3] dark:bg-[#4b5562] data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-full',
  Corner: '',
});
