import { Menu as BaseMenu } from '@base-ui/react/menu';
import { theme } from './styled.js';
import { ARROW, button, GROUP_LABEL, ITEM, LIST_SEPARATOR, POPUP, POSITIONER } from './classes.js';
import Icon from '../components/Icon.jsx';

// Checkbox / radio rows reserve a left gutter for their indicator.
const CHECK_ITEM = `${ITEM} relative pl-[26px]`;
const INDICATOR = 'absolute left-2 inline-flex size-[13px] items-center justify-center text-blue';

/** Parts shared by Menu and ContextMenu (everything except the trigger). */
export const menuStyles = {
  Positioner: POSITIONER,
  Popup: `${POPUP} min-w-[174px] p-[5px]`,
  Arrow: ARROW,
  Item: ITEM,
  LinkItem: `${ITEM} no-underline`,
  CheckboxItem: CHECK_ITEM,
  CheckboxItemIndicator: { base: INDICATOR, children: <Icon name="check" size="xs" /> },
  RadioItem: CHECK_ITEM,
  RadioItemIndicator: `${INDICATOR} before:size-[6px] before:rounded-full before:bg-current`,
  SubmenuTrigger: `${ITEM} justify-between data-popup-open:bg-hover data-popup-open:text-ink`,
  Separator: LIST_SEPARATOR,
  GroupLabel: GROUP_LABEL,
  Viewport: 'relative',
  // Filterable menus (Menu.FilterProvider + Menu.Input)
  Input:
    'mb-[5px] h-[31px] w-full rounded-[5px] border border-line-strong bg-surface px-2 text-[11px] text-ink outline-hidden placeholder:text-[#a0a5ad] focus:border-blue',
  List: 'max-h-[min(320px,var(--available-height))] overflow-y-auto outline-hidden',
  Empty: 'px-2 py-3 text-[11px] text-faint empty:hidden',
  Clear: { ...button('iconSm'), children: <Icon name="close" size="xs" /> },
};

/** Base UI Menu with Larch styles. Trigger takes a Button `variant`. */
export const Menu = theme(BaseMenu, 'Menu', { Trigger: button(), ...menuStyles });
