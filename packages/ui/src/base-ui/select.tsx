import { Select as BaseSelect } from '@base-ui/react/select';
import { theme } from './styled.js';
import { ARROW, CONTROL, GROUP_LABEL, ITEM, LABEL, LIST_SEPARATOR, POPUP, POSITIONER } from './classes.js';
import Icon from '../components/Icon.js';

const SCROLL_ARROW = 'z-1 flex h-4 w-full cursor-default items-center justify-center bg-surface text-[#8c929b]';

/** Base UI Select with Larch styles. Icon, ItemIndicator and the scroll arrows get default glyphs. */
export const Select = theme(BaseSelect, 'Select', {
  Label: LABEL,
  Trigger: `${CONTROL} inline-flex h-[35px] cursor-default select-none items-center justify-between gap-2 pl-[10px] pr-[9px] text-left data-popup-open:border-blue`,
  Value: 'min-w-0 truncate data-placeholder:text-[#a0a5ad]',
  Icon: { base: 'flex shrink-0 text-[#8c929b]', children: <Icon name="chevronDown" size="xs" /> },
  Backdrop: '',
  Positioner: `${POSITIONER} select-none`,
  // In alignItemWithTrigger mode (data-side="none") the popup appears in place, so it skips the scale-in.
  Popup: `${POPUP} min-w-(--anchor-width) p-[5px] data-[side=none]:min-w-[calc(var(--anchor-width)+10px)] data-[side=none]:transition-none`,
  Arrow: ARROW,
  List: 'max-h-(--available-height) scroll-py-1 overflow-y-auto outline-hidden',
  Item: `${ITEM} relative pr-7`,
  ItemText: 'min-w-0 truncate',
  ItemIndicator: { base: 'absolute right-2 inline-flex text-blue', children: <Icon name="check" size="xs" /> },
  Group: '',
  GroupLabel: GROUP_LABEL,
  Separator: LIST_SEPARATOR,
  ScrollUpArrow: { base: `${SCROLL_ARROW} top-0`, children: <Icon name="chevronDown" size="xs" className="rotate-180" /> },
  ScrollDownArrow: { base: `${SCROLL_ARROW} bottom-0`, children: <Icon name="chevronDown" size="xs" /> },
});
