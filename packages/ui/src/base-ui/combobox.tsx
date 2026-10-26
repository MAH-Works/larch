import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { theme } from './styled.js';
import { ARROW, CONTROL, GROUP_LABEL, ITEM, LABEL, LIST_SEPARATOR, POPUP, POSITIONER } from './classes.js';
import Icon from '../components/Icon.js';

/**
 * Text field with a popup list, shared by Combobox and Autocomplete. The Input is a full control on its
 * own; inside an InputGroup the group draws the box and the input goes borderless.
 */
export const listboxStyles = {
  Label: LABEL,
  InputGroup:
    'relative flex min-h-[35px] w-full items-center rounded-md border border-line-strong bg-surface text-xs text-ink transition ' +
    'focus-within:border-blue focus-within:shadow-[0_0_0_3px_var(--blue-soft)] data-invalid:border-red data-disabled:opacity-60 ' +
    '[&_input]:h-[33px] [&_input]:min-w-[6ch] [&_input]:flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:bg-transparent [&_input]:shadow-none!',
  Input: `${CONTROL} h-[35px] px-[10px]`,
  Trigger: {
    base: 'grid h-[33px] w-7 shrink-0 place-items-center text-[#8c929b] outline-hidden hover:text-ink',
    children: <Icon name="chevronDown" size="xs" />,
  },
  Clear: {
    base: 'grid h-[33px] w-6 shrink-0 place-items-center text-[#8c929b] outline-hidden hover:text-ink',
    children: <Icon name="close" size="xs" />,
  },
  Icon: 'flex shrink-0 text-[#8c929b]',
  Positioner: POSITIONER,
  Popup: `${POPUP} w-(--anchor-width) max-w-(--available-width) p-[5px]`,
  Arrow: ARROW,
  Status: 'px-2 py-2 text-[11px] text-faint empty:hidden',
  Empty: 'px-2 py-3 text-[11px] text-faint empty:hidden',
  List: 'max-h-[min(320px,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain outline-hidden data-empty:hidden',
  Row: 'flex gap-1',
  Item: ITEM,
  Group: '',
  GroupLabel: GROUP_LABEL,
  Separator: LIST_SEPARATOR,
};

/** Base UI Combobox with Larch styles. Chips render as Larch pills. */
export const Combobox = theme(BaseCombobox, 'Combobox', {
  ...listboxStyles,
  Item: `${ITEM} relative pr-7`,
  ItemIndicator: { base: 'absolute right-2 inline-flex text-blue', children: <Icon name="check" size="xs" /> },
  Chips: 'flex flex-1 flex-wrap items-center gap-1 py-[5px] pl-[5px]',
  Chip:
    'inline-flex h-[23px] items-center gap-1 rounded-full bg-[#eef0f2] pl-2 pr-1 text-[11px] font-medium text-[#5f656e] outline-hidden dark:bg-[#282e36] dark:text-[#a0a8b3] data-highlighted:bg-blue-soft data-highlighted:text-blue',
  ChipRemove: {
    base: 'grid size-4 place-items-center rounded-full text-[#8c929b] hover:bg-hover hover:text-ink',
    children: <Icon name="close" size="xs" />,
  },
});
