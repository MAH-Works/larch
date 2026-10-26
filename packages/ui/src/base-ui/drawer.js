import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { theme } from './styled.js';
import { BACKDROP, button, DESCRIPTION, TITLE } from './classes.js';

// Placement follows the Root's `swipeDirection`, which Base UI mirrors onto the popup as data-swipe-direction.
const POPUP = [
  'relative flex flex-col overflow-y-auto overscroll-contain border-line bg-surface text-ink shadow-dialog outline-hidden touch-auto',
  'transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-swiping:duration-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)]',
  // down (default): bottom sheet
  'data-[swipe-direction=down]:mt-auto data-[swipe-direction=down]:max-h-[80dvh] data-[swipe-direction=down]:w-full data-[swipe-direction=down]:rounded-t-[12px] data-[swipe-direction=down]:border-t data-[swipe-direction=down]:px-5 data-[swipe-direction=down]:pt-3 data-[swipe-direction=down]:pb-[calc(20px+env(safe-area-inset-bottom,0px))]',
  'data-[swipe-direction=down]:[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))] data-[swipe-direction=down]:data-starting-style:[transform:translateY(100%)] data-[swipe-direction=down]:data-ending-style:[transform:translateY(100%)]',
  // up: top sheet
  'data-[swipe-direction=up]:mb-auto data-[swipe-direction=up]:max-h-[80dvh] data-[swipe-direction=up]:w-full data-[swipe-direction=up]:rounded-b-[12px] data-[swipe-direction=up]:border-b data-[swipe-direction=up]:px-5 data-[swipe-direction=up]:pt-5 data-[swipe-direction=up]:pb-3',
  'data-[swipe-direction=up]:[transform:translateY(var(--drawer-swipe-movement-y,0px))] data-[swipe-direction=up]:data-starting-style:[transform:translateY(-100%)] data-[swipe-direction=up]:data-ending-style:[transform:translateY(-100%)]',
  // right: side panel
  'data-[swipe-direction=right]:ml-auto data-[swipe-direction=right]:h-full data-[swipe-direction=right]:w-[min(380px,calc(100vw-40px))] data-[swipe-direction=right]:border-l data-[swipe-direction=right]:p-5',
  'data-[swipe-direction=right]:[transform:translateX(var(--drawer-swipe-movement-x,0px))] data-[swipe-direction=right]:data-starting-style:[transform:translateX(100%)] data-[swipe-direction=right]:data-ending-style:[transform:translateX(100%)]',
  // left: side panel
  'data-[swipe-direction=left]:mr-auto data-[swipe-direction=left]:h-full data-[swipe-direction=left]:w-[min(380px,calc(100vw-40px))] data-[swipe-direction=left]:border-r data-[swipe-direction=left]:p-5',
  'data-[swipe-direction=left]:[transform:translateX(var(--drawer-swipe-movement-x,0px))] data-[swipe-direction=left]:data-starting-style:[transform:translateX(-100%)] data-[swipe-direction=left]:data-ending-style:[transform:translateX(-100%)]',
].join(' ');

/** Base UI Drawer with Larch styles. Bottom, top and side sheets follow `swipeDirection` on the Root. */
export const Drawer = theme(BaseDrawer, 'Drawer', {
  Trigger: button(),
  Backdrop: `z-50 ${BACKDROP} opacity-[calc(1-var(--drawer-swipe-progress,0))] data-swiping:duration-0`,
  Viewport: 'fixed inset-0 z-50 flex',
  Popup: POPUP,
  Content: 'mx-auto w-full',
  Title: TITLE,
  Description: DESCRIPTION,
  Close: button(),
});
