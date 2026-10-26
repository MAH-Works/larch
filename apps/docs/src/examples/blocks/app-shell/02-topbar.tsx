import { Topbar, Toast } from '@mah-works/larch';

export const title = 'Topbar on its own';
export const description = 'Every control is optional: omit `onSearch`, `createLabel` or `onNotifications` to hide it.';
export const layout = 'full';

export default function TopbarExample() {
  const toastManager = Toast.useToastManager();
  return (
    <div className="flex flex-col gap-4 py-4">
      <Topbar
        section="Workspace"
        title="Clients"
        searchPlaceholder="Search clients"
        onSearch={(q) => toastManager.add({ title: `Searching for “${q}”` })}
        createLabel="New client"
        onCreate={() => toastManager.add({ title: 'New client form' })}
        onNotifications={() => toastManager.add({ title: 'No new notifications' })}
      />
      <Topbar section="Manage" title="Reports" icon="chart" />
    </div>
  );
}
