import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { theme } from './styled.js';
import { dialogStyles } from './dialog.js';

/** Base UI AlertDialog with the same Larch styles as Dialog. */
export const AlertDialog = theme(BaseAlertDialog, 'AlertDialog', dialogStyles);
