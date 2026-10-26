import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { theme } from './styled.js';
import { FOCUS_RING } from './classes.js';

/** Base UI Tabs with Larch's underlined style. Add `<Tabs.Indicator />` to the list for the sliding underline. */
export const Tabs = theme(BaseTabs, 'Tabs', {
  Root: 'flex flex-col data-[orientation=vertical]:flex-row data-[orientation=vertical]:gap-4',
  List: 'relative z-0 flex gap-1 border-b border-line data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r',
  Tab:
    `relative h-8 whitespace-nowrap rounded-t-[5px] px-[10px] text-[11px] text-[#9298a1] outline-hidden hover:text-ink ` +
    `data-active:font-semibold data-active:text-ink data-disabled:pointer-events-none data-disabled:opacity-50 data-[orientation=vertical]:rounded-[5px] data-[orientation=vertical]:text-left ${FOCUS_RING}`,
  Indicator:
    'absolute -bottom-px left-0 h-[2px] w-[calc(var(--active-tab-width)-16px)] translate-x-[calc(var(--active-tab-left)+8px)] rounded-t-xs bg-blue transition-[translate,width,height] duration-200 ease-out ' +
    'data-[orientation=vertical]:top-0 data-[orientation=vertical]:-right-px data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-auto data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-[2px] data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-(--active-tab-top) data-[orientation=vertical]:rounded-l-xs data-[orientation=vertical]:rounded-tr-none',
  Panel: `pt-[14px] text-xs leading-normal text-[#737983] outline-hidden dark:text-[#8a939f] data-[orientation=vertical]:pt-0 ${FOCUS_RING}`,
});
