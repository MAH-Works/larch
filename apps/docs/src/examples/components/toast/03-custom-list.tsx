import { Toast } from '@mah-works/larch/toast';
import { Button } from '@mah-works/larch/button';

export const title = 'Without the Toaster block';
export const description =
  'Toaster is only Base UI’s Portal → Viewport → Root list, pre-assembled. Render the parts yourself to change the layout — they keep Larch’s styles.';

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Content>
        <div className="min-w-0 flex-1">
          <Toast.Title />
          <Toast.Description />
        </div>
        <Toast.Close aria-label="Dismiss" />
      </Toast.Content>
    </Toast.Root>
  ));
}

function AddButton() {
  const toastManager = Toast.useToastManager();
  return <Button onClick={() => toastManager.add({ title: 'Saved', description: 'Shown by a separate provider, bottom-right.' })}>Show toast</Button>;
}

export default function CustomList() {
  return (
    <Toast.Provider>
      <AddButton />
      <Toast.Portal>
        <Toast.Viewport className="left-auto right-4 translate-x-0">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
