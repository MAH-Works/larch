import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { theme } from './styled.js';
import { FOCUS_RING } from './classes.js';

// CSS chevron on the trigger, flipped while its panel is open.
export const CHEVRON =
  "after:size-[6px] after:shrink-0 after:-translate-y-px after:rotate-45 after:border-b-[1.5px] after:border-r-[1.5px] after:border-[#8c929b] after:transition-transform after:content-[''] data-panel-open:after:translate-y-px data-panel-open:after:-rotate-135";

// Height animates via Base UI's measured --*-panel-height; put padding on the panel's content, not the panel.
export const PANEL =
  'overflow-hidden text-xs leading-normal text-[#737983] transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0 dark:text-[#8a939f]';

/** Base UI Accordion with Larch styles: hairline-separated items with a chevron trigger. */
export const Accordion = theme(BaseAccordion, 'Accordion', {
  Root: 'flex w-full flex-col',
  Item: 'border-b border-line',
  Header: 'm-0',
  Trigger: `flex w-full items-center justify-between gap-3 rounded-xs py-3 text-left text-xs font-semibold text-ink data-disabled:opacity-50 ${CHEVRON} ${FOCUS_RING}`,
  Panel: `h-(--accordion-panel-height) ${PANEL}`,
});
