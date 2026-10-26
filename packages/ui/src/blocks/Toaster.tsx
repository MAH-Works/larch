import { Toast } from '../base-ui/toast.js';

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Content>
        <div className="min-w-0 flex-1">
          <Toast.Title />
          <Toast.Description />
        </div>
        <Toast.Action />
        <Toast.Close aria-label="Dismiss" />
      </Toast.Content>
    </Toast.Root>
  ));
}

/**
 * Renders the toasts of the surrounding <Toast.Provider> as Larch's bottom-centre stack. It is the
 * Portal → Viewport → Root list from Base UI's Toast anatomy, pre-assembled:
 *
 *   <Toast.Provider>
 *     <App />            // anywhere inside: Toast.useToastManager().add({ title: 'Saved' })
 *     <Toaster />
 *   </Toast.Provider>
 */
export function Toaster() {
  return (
    <Toast.Portal>
      <Toast.Viewport>
        <ToastList />
      </Toast.Viewport>
    </Toast.Portal>
  );
}
