import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { theme } from './styled.js';
import { FOCUS_RING } from './classes.js';

/**
 * Base UI Checkbox with Larch's 15px box. An empty Indicator draws the check (or the indeterminate dash)
 * in CSS; pass children to use your own glyph instead.
 */
export const Checkbox = theme(BaseCheckbox, 'Checkbox', {
  Root:
    `relative inline-flex size-[15px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] border border-[#c9cdd3] bg-white align-middle text-white dark:border-[#56606d] dark:bg-[#151a20] ` +
    `data-checked:border-blue data-checked:bg-blue data-indeterminate:border-blue data-indeterminate:bg-blue data-disabled:cursor-not-allowed data-disabled:opacity-50 ${FOCUS_RING}`,
  Indicator:
    'absolute inset-0 flex items-center justify-center ' +
    'data-checked:empty:after:absolute data-checked:empty:after:left-[3px] data-checked:empty:after:top-[3px] data-checked:empty:after:h-1 data-checked:empty:after:w-[7px] data-checked:empty:after:-rotate-45 data-checked:empty:after:border-b-[1.5px] data-checked:empty:after:border-l-[1.5px] data-checked:empty:after:border-white ' +
    'data-indeterminate:empty:after:h-[1.5px] data-indeterminate:empty:after:w-[7px] data-indeterminate:empty:after:bg-white',
});
