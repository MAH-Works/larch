import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { theme } from './styled.js';
import { ARROW, button } from './classes.js';

/**
 * Base UI Tooltip with Larch's dark tooltip. Trigger is unstyled by default because it usually wraps
 * another control — pass `variant` to give it a Button look instead.
 */
export const Tooltip = theme(BaseTooltip, 'Tooltip', {
  Trigger: button('unstyled'),
  Positioner: 'z-50',
  Popup:
    'w-max max-w-[190px] origin-(--transform-origin) rounded-[5px] bg-[#252a32] px-2 py-[6px] text-[10px] leading-[1.3] text-white ' +
    'transition-[opacity,scale] duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-instant:transition-none',
  Arrow: `${ARROW} before:border-0 before:bg-[#252a32]`,
  Viewport: 'relative',
});
