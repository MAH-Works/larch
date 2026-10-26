import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { styled } from './styled.js';
import { DISABLED, FOCUS_RING } from './classes.js';

export const TOGGLE =
  'inline-flex h-8 min-w-8 items-center justify-center gap-[7px] rounded-md px-[9px] text-xs font-medium text-soft transition-colors select-none ' +
  `hover:bg-hover hover:text-ink data-pressed:bg-blue-soft data-pressed:text-blue ${DISABLED} ${FOCUS_RING}`;

/** Base UI Toggle with Larch styles. Pressed toggles turn soft blue. */
export const Toggle = styled(BaseToggle, TOGGLE, { name: 'Toggle' });
