import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { theme } from './styled.js';
import { FOCUS_RING } from './classes.js';

/** Base UI Switch with Larch's 34×20 track. */
export const Switch = theme(BaseSwitch, 'Switch', {
  Root:
    `relative inline-flex h-5 w-[34px] shrink-0 cursor-pointer rounded-full bg-[#d9dde3] p-[3px] transition-colors dark:bg-[#4b5562] ` +
    `data-checked:bg-blue data-disabled:cursor-not-allowed data-disabled:opacity-50 ${FOCUS_RING}`,
  Thumb: 'block size-[14px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.12)] transition-transform data-checked:translate-x-[14px]',
});
