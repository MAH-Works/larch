import { Progress as BaseProgress } from '@base-ui/react/progress';
import { theme } from './styled.js';
import { TONES, TRACK } from './classes.js';

/** Label / value / bar layout shared by Progress and Meter: label + value on one row, the track below. */
export const gaugeStyles = {
  Root: 'grid w-full grid-cols-[1fr_auto] items-center gap-x-[10px] gap-y-2',
  Label: 'text-[11px] text-[#727883] dark:text-muted',
  Value: 'text-right text-[11px] font-semibold tabular-nums text-[#545a63] dark:text-[#c0c7d0]',
  Track: `col-span-full ${TRACK}`,
  Indicator: {
    base: 'block h-full rounded-[inherit] transition-[width] duration-500',
    variants: { tone: TONES },
    defaults: { tone: 'blue' },
  },
};

/** Base UI Progress with Larch's 7px track. Indicator adds a visual `tone` prop. */
export const Progress = theme(BaseProgress, 'Progress', {
  ...gaugeStyles,
  Indicator: {
    ...gaugeStyles.Indicator,
    base: `${gaugeStyles.Indicator.base} data-indeterminate:w-2/5 data-indeterminate:animate-indeterminate`,
  },
});
