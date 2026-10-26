import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { theme } from './styled.js';
import { CHEVRON, PANEL } from './accordion.js';
import { FOCUS_RING } from './classes.js';

/** Base UI Collapsible with Larch styles. */
export const Collapsible = theme(BaseCollapsible, 'Collapsible', {
  Trigger: `inline-flex items-center gap-[9px] rounded-xs text-xs font-medium text-soft hover:text-ink data-panel-open:text-ink data-disabled:opacity-50 ${CHEVRON} ${FOCUS_RING}`,
  Panel: `h-(--collapsible-panel-height) ${PANEL}`,
});
