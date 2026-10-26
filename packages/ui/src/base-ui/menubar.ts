import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import { styled } from './styled.js';

/** Base UI Menubar with Larch styles. Use `<Menu.Trigger variant="ghost">` for its menus. */
export const Menubar = styled(
  BaseMenubar,
  'flex items-center gap-[2px] rounded-lg border border-line bg-surface p-[3px] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
  { name: 'Menubar' },
);
