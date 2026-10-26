import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { theme } from './styled.js';
import { ARROW, FOCUS_RING, POPUP, POSITIONER } from './classes.js';

/** Base UI PreviewCard with Larch styles. The trigger is an inline link. */
export const PreviewCard = theme(BasePreviewCard, 'PreviewCard', {
  Trigger: `rounded-xs text-blue underline decoration-blue/35 underline-offset-2 hover:decoration-blue data-popup-open:decoration-blue ${FOCUS_RING}`,
  Positioner: POSITIONER,
  Popup: `${POPUP} relative h-(--popup-height,auto) w-(--popup-width,auto) max-w-[min(300px,var(--available-width))] p-[14px] text-xs`,
  Arrow: ARROW,
  Viewport: 'relative size-full',
});
