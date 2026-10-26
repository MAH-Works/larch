import { Toast as BaseToast } from '@base-ui/react/toast';
import { theme } from './styled.js';
import { ARROW, FOCUS_RING } from './classes.js';
import Icon from '../components/Icon.js';

// Stacked toasts follow Base UI's CSS-variable recipe: the frontmost toast sits at the bottom, the ones
// behind peek above it and shrink; hovering or focusing the viewport (data-expanded) fans them out.
const ROOT = [
  '[--gap:8px] [--peek:8px] [--scale:calc(max(0,1-(var(--toast-index)*0.08)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))]',
  '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
  "absolute inset-x-0 bottom-0 z-[calc(1000-var(--toast-index))] h-(--height) origin-bottom select-none rounded-[7px] bg-[#252a32] text-white shadow-toast after:absolute after:left-0 after:top-full after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
  'data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
  'data-starting-style:[transform:translateY(150%)] data-ending-style:opacity-0 data-limited:opacity-0 [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
  'data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
  'data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
  '[transition:transform_.45s_cubic-bezier(0.22,1,0.36,1),opacity_.45s,height_.15s]',
].join(' ');

/** Base UI Toast with Larch's dark toast. Close gets a default × glyph. See the Toaster block for a ready list. */
export const Toast = theme(BaseToast, 'Toast', {
  Viewport: 'fixed bottom-6 left-1/2 z-50 w-[min(360px,calc(100vw-32px))] -translate-x-1/2 outline-hidden',
  Root: ROOT,
  Content:
    'flex items-center gap-3 overflow-hidden px-[14px] py-[10px] transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100',
  Title: 'm-0 text-xs font-semibold text-white',
  Description: 'm-0 mt-px text-[11px] leading-[1.4] text-[#c0c6cf]',
  Action: `h-7 shrink-0 rounded-[5px] bg-white/10 px-2 text-[11px] font-semibold text-white hover:bg-white/15 ${FOCUS_RING}`,
  Close: {
    base: `grid size-[22px] shrink-0 place-items-center rounded-[5px] text-[#9aa2af] hover:bg-white/10 hover:text-white ${FOCUS_RING}`,
    children: <Icon name="close" size="xs" />,
  },
  Positioner: 'z-50',
  Arrow: `${ARROW} before:border-0 before:bg-[#252a32]`,
});
