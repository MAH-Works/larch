import { Topbar, useToast } from '@mah-works/larch';

export const title = 'Topbar on its own';
export const description = 'Every control is optional: omit `onSearch`, `createLabel` or `onNotifications` to hide it.';
export const layout = 'full';

export default function TopbarExample() {
  const { showToast } = useToast();
  return (
    <div className="flex flex-col gap-4 py-4">
      <Topbar
        section="Workspace"
        title="Clients"
        searchPlaceholder="Search clients"
        onSearch={(q) => showToast(`Searching for “${q}”`)}
        createLabel="New client"
        onCreate={() => showToast('New client form')}
        onNotifications={() => showToast('No new notifications')}
      />
      <Topbar section="Manage" title="Reports" icon="chart" />
    </div>
  );
}
