import { Radio as BaseRadio } from '@base-ui/react/radio';
import { theme } from './styled.js';
import { FOCUS_RING } from './classes.js';

/** Base UI Radio with Larch styles: a 15px ring that fills blue with a white dot. */
export const Radio = theme(BaseRadio, 'Radio', {
  Root:
    `inline-flex size-[15px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#c9cdd3] bg-white dark:border-[#56606d] dark:bg-[#151a20] ` +
    `data-checked:border-blue data-checked:bg-blue data-disabled:cursor-not-allowed data-disabled:opacity-50 ${FOCUS_RING}`,
  Indicator: 'flex items-center justify-center data-unchecked:hidden before:size-[5px] before:rounded-full before:bg-white',
});
