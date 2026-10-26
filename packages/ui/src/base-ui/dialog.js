import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { theme } from './styled.js';
import { BACKDROP, button, DESCRIPTION, DIALOG_POPUP, DIALOG_VIEWPORT, TITLE } from './classes.js';

export const dialogStyles = {
  Trigger: button(),
  Backdrop: `z-50 ${BACKDROP}`,
  Viewport: `z-50 ${DIALOG_VIEWPORT}`,
  Popup: `z-50 ${DIALOG_POPUP}`,
  Title: TITLE,
  Description: DESCRIPTION,
  Close: button(),
};

/** Base UI Dialog with Larch styles. Trigger and Close also take a Button `variant`. */
export const Dialog = theme(BaseDialog, 'Dialog', dialogStyles);
