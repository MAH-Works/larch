import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import { theme } from './styled.js';
import { menuStyles } from './menu.jsx';

/** Base UI ContextMenu with the same Larch styles as Menu. The trigger is an unstyled region. */
export const ContextMenu = theme(BaseContextMenu, 'ContextMenu', menuStyles);
