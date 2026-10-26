import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { theme } from './styled.js';
import { button, CONTROL, FOCUS_RING } from './classes.js';

/** Base UI Toolbar with Larch styles. Toolbar.Button takes a Button `variant` (ghost by default). */
export const Toolbar = theme(BaseToolbar, 'Toolbar', {
  Root: 'flex items-center gap-[3px] rounded-lg border border-line bg-surface p-[3px] data-[orientation=vertical]:flex-col',
  Button: button('ghost'),
  Link: `inline-flex h-8 items-center rounded-md px-[9px] text-xs text-soft no-underline hover:text-ink ${FOCUS_RING}`,
  Input: `${CONTROL} h-8 w-auto px-[10px]`,
  Group: 'flex items-center gap-[3px] data-[orientation=vertical]:flex-col',
  // The separator is perpendicular to the toolbar, so a horizontal toolbar gets a vertical rule.
  Separator:
    'shrink-0 bg-line data-[orientation=vertical]:mx-1 data-[orientation=vertical]:h-[17px] data-[orientation=vertical]:w-px data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[17px]',
});
