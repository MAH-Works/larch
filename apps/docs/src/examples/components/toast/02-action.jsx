import { Button } from '@mah-works/larch/button';
import { Toast } from '@mah-works/larch/toast';

export const title = 'With an action';
export const description = '`actionProps` renders a Toast.Action button — here an undo that closes the toast.';

export default function WithAction() {
  const toastManager = Toast.useToastManager();
  const archive = () => {
    const id = toastManager.add({
      title: '3 clients archived',
      timeout: 8000,
      actionProps: {
        children: 'Undo',
        onClick: () => {
          toastManager.close(id);
          toastManager.add({ title: 'Archive undone' });
        },
      },
    });
  };
  return (
    <Button variant="ghostDanger" onClick={archive}>
      Archive selected
    </Button>
  );
}
