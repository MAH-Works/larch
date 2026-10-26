import { Slider as BaseSlider } from '@base-ui/react/slider';
import { theme } from './styled.js';
import { LABEL, TONES } from './classes.js';

/** Base UI Slider with Larch styles. Label and Value sit on one row above the control. */
export const Slider = theme(BaseSlider, 'Slider', {
  Root: 'grid w-full grid-cols-[1fr_auto] items-center gap-y-1 data-disabled:opacity-50',
  Label: LABEL,
  Value: 'text-right text-[11px] font-semibold tabular-nums text-[#545a63] dark:text-[#c0c7d0]',
  Control:
    'col-span-full flex w-full touch-none select-none items-center py-[7px] data-[orientation=vertical]:h-36 data-[orientation=vertical]:w-auto data-[orientation=vertical]:justify-center data-[orientation=vertical]:px-[7px] data-[orientation=vertical]:py-0',
  Track:
    'relative h-[5px] w-full rounded-full bg-[#eef0f3] select-none dark:bg-[#252b34] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[5px]',
  Indicator: { base: 'rounded-full select-none', variants: { tone: TONES }, defaults: { tone: 'blue' } },
  Thumb:
    'size-[15px] rounded-full border border-line-strong bg-white shadow-[0_1px_2px_rgba(0,0,0,.14)] select-none ' +
    'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue data-dragging:border-blue',
});
