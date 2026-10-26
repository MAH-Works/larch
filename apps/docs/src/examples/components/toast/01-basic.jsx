import { Button } from '@mah-works/larch/button';
import { Toast } from '@mah-works/larch/toast';

export const title = 'Add a toast';
export const description =
  'This site wraps the app in `<Toast.Provider>` with Larch’s `<Toaster />`. Anything inside can queue toasts through `Toast.useToastManager()`; they stack, expand on hover and swipe away.';

export default function Basic() {
  const toastManager = Toast.useToastManager();
  return (
    <>
      <Button variant="primary" onClick={() => toastManager.add({ title: 'View shared' })}>
        Share view
      </Button>
      <Button onClick={() => toastManager.add({ title: 'Report export started', description: 'We’ll email you when the CSV is ready.' })}>
        Export
      </Button>
    </>
  );
}
