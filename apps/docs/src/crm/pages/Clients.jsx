import { useMemo, useState } from 'react';
import { ClientsTable, PageSizeSelect, Pagination, SelectionToolbar, useSelection, Toast } from '@mah-works/larch';
import { CLIENTS, CLIENT_TOTAL } from '../data/clients.js';

export default function Clients() {
  const toastManager = Toast.useToastManager();
  const [pageSize, setPageSize] = useState(20);
  const { selected, count, toggle, toggleAll } = useSelection(CLIENTS.filter((c) => c.selected).map((c) => c.id));
  const rows = useMemo(() => CLIENTS.slice(0, pageSize), [pageSize]);

  const runAction = (action) => {
    if (action === 'Delete') {
      toastManager.add({ title: count ? `Delete queued for ${count} ${count === 1 ? 'client' : 'clients'}` : 'Select a client first' });
    } else {
      toastManager.add({ title: `${action}${count ? ` for ${count} selected` : ''}` });
    }
  };

  return (
    <section aria-label="Clients table" className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface">
      <SelectionToolbar
        selectedCount={count}
        actions={[
          { label: 'Assign', icon: 'assign', onClick: () => runAction('Assign') },
          { label: 'Tag', icon: 'tag', onClick: () => runAction('Tag') },
          { label: 'Export', icon: 'download', onClick: () => runAction('Export') },
          { label: 'Delete', icon: 'trash', danger: true, onClick: () => runAction('Delete') },
        ]}
        tools={[
          { label: 'Filter', icon: 'filter', badge: 2, onClick: () => toastManager.add({ title: 'Filter menu opened' }) },
          { label: 'Sort', icon: 'sort', onClick: () => toastManager.add({ title: 'Sorted by recent activity' }) },
          { label: 'Table', icon: 'table', onClick: () => toastManager.add({ title: 'Table view active' }) },
          { label: 'Table settings', icon: 'settings', iconOnly: true, onClick: () => toastManager.add({ title: 'View settings opened' }) },
        ]}
      />

      <ClientsTable
        rows={rows}
        selected={selected}
        onToggle={toggle}
        onToggleAll={toggleAll}
        onSort={(key) => toastManager.add({ title: `Sorted by ${key}` })}
        onRowAction={(row) => toastManager.add({ title: `Actions for ${row.name}` })}
      />

      <footer className="flex h-[59px] flex-none items-center justify-between border-t border-line bg-surface px-[18px] text-[11px] font-medium text-[#8c919a] dark:text-[#858e9a] mobile:h-auto mobile:flex-wrap mobile:gap-[9px] mobile:px-[13px] mobile:py-[9px]">
        <PageSizeSelect value={pageSize} onChange={setPageSize} />
        <span className="text-[#7d828b] dark:text-[#858e9a] mobile:order-3 mobile:w-full">
          1 to {rows.length} of {CLIENT_TOTAL} results
        </span>
        <Pagination onNext={() => toastManager.add({ title: 'Next page' })} />
      </footer>
    </section>
  );
}
