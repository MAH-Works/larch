import { useMemo, useState } from 'react';
import { ClientsTable, PageSizeSelect, Pagination, SelectionToolbar, useSelection, Toast, type AvatarStackItem, type ClientRow } from '@mah-works/larch';

export const title = 'Selectable client table';
export const description =
  'useSelection drives the checkboxes, the indeterminate header state and the live “N selected” label. The table owns its scroll area and keeps the header sticky.';
export const layout = 'canvas';

const av = (initials: string, tone: AvatarStackItem['tone']): AvatarStackItem => ({ initials, tone });
const CLIENTS: ClientRow[] = [
  { id: 'aperture', name: 'Aperture Labs', domain: 'aperture.test', mark: 'sky', status: ['Active', 'active'], tag: ['VIP', 'vip'], avatars: [av('JD', 'blue'), av('MC', 'coral')], projects: 12, tasks: 48, billing: '$24.8k' },
  { id: 'northstar', name: 'Northstar Health', domain: 'northstar.health', mark: 'lime', status: ['Onboarding', 'onboarding'], tag: ['High Priority', 'priority'], avatars: [av('AS', 'green')], projects: 4, tasks: 17, billing: '$8.4k' },
  { id: 'parallax', name: 'Parallax Studio', domain: 'parallax.studio', mark: 'violet', status: ['Active', 'active'], tag: ['Long-term', 'longterm'], avatars: [av('RB', 'purple'), av('+1', 'sand')], projects: 8, tasks: 31, billing: '$16.2k' },
  { id: 'vercel', name: 'Vercel Systems', domain: 'vercel.systems', mark: 'yellow', status: ['Trial', 'trial'], tag: ['Growth', 'blue'], avatars: [av('LM', 'coral')], projects: 2, tasks: 8, billing: '$2.1k' },
  { id: 'harbor', name: 'Harbor & Co.', domain: 'harborco.com', mark: 'rose', status: ['Active', 'active'], tag: ['Low Priority', 'low'], avatars: [av('KF', 'sand'), av('+2', 'blue')], projects: 19, tasks: 74, billing: '$38.9k' },
  { id: 'cedar', name: 'Cedar & Finch', domain: 'cedarfinch.co', mark: 'blue', status: ['Inactive', 'inactive'], tag: ['VIP', 'vip'], avatars: [av('TS', 'green')], projects: 6, tasks: 12, billing: '$9.6k' },
  { id: 'meridian', name: 'Meridian Works', domain: 'meridian.works', mark: 'slate', status: ['Archived', 'archived'], tag: null, avatars: [av('-', 'purple')], projects: 3, tasks: '-', billing: '$4.2k' },
];

export default function ClientsTableBlock() {
  const toastManager = Toast.useToastManager();
  const [pageSize, setPageSize] = useState(10);
  const { selected, count, toggle, toggleAll, clear } = useSelection<ClientRow['id']>(['parallax']);
  const rows = useMemo(() => CLIENTS.slice(0, pageSize), [pageSize]);
  const bulk = (action: string) => () => toastManager.add({ title: count ? `${action} ${count} selected` : 'Select a client first' });

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-[10px] border border-line bg-surface">
      <SelectionToolbar
        selectedCount={count}
        actions={[
          { label: 'Assign', icon: 'assign', onClick: bulk('Assign') },
          { label: 'Tag', icon: 'tag', onClick: bulk('Tag') },
          { label: 'Export', icon: 'download', onClick: bulk('Export') },
          { label: 'Delete', icon: 'trash', danger: true, onClick: () => (count ? (clear(), toastManager.add({ title: 'Deleted' })) : toastManager.add({ title: 'Select a client first' })) },
        ]}
        tools={[
          { label: 'Filter', icon: 'filter', badge: 2, onClick: () => toastManager.add({ title: 'Filter menu' }) },
          { label: 'Sort', icon: 'sort', onClick: () => toastManager.add({ title: 'Sort menu' }) },
          { label: 'Table settings', icon: 'settings', iconOnly: true, onClick: () => toastManager.add({ title: 'View settings' }) },
        ]}
      />
      <ClientsTable rows={rows} selected={selected} onToggle={toggle} onToggleAll={toggleAll} onRowAction={(r) => toastManager.add({ title: r.name })} />
      <footer className="flex h-[59px] flex-none items-center justify-between gap-3 border-t border-line px-[18px] text-[11px] font-medium text-[#8c919a]">
        <PageSizeSelect value={pageSize} onChange={setPageSize} options={[5, 10]} />
        <span>
          1 to {rows.length} of {CLIENTS.length} results
        </span>
        <Pagination onNext={() => toastManager.add({ title: 'Next page' })} disabledNext={rows.length >= CLIENTS.length} />
      </footer>
    </div>
  );
}
