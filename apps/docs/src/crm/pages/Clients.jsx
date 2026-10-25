import { useMemo, useState } from 'react';
import { ClientsTable, PageSizeSelect, Pagination, SelectionToolbar, useSelection, useToast } from '@larch/ui';
import { CLIENTS, CLIENT_TOTAL } from '../data/clients.js';

export default function Clients() {
  const { showToast } = useToast();
  const [pageSize, setPageSize] = useState(20);
  const { selected, count, toggle, toggleAll } = useSelection(CLIENTS.filter((c) => c.selected).map((c) => c.id));
  const rows = useMemo(() => CLIENTS.slice(0, pageSize), [pageSize]);

  const runAction = (action) => {
    if (action === 'Delete') {
      showToast(count ? `Delete queued for ${count} ${count === 1 ? 'client' : 'clients'}` : 'Select a client first');
    } else {
      showToast(`${action}${count ? ` for ${count} selected` : ''}`);
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
          { label: 'Filter', icon: 'filter', badge: 2, onClick: () => showToast('Filter menu opened') },
          { label: 'Sort', icon: 'sort', onClick: () => showToast('Sorted by recent activity') },
          { label: 'Table', icon: 'table', onClick: () => showToast('Table view active') },
          { label: 'Table settings', icon: 'settings', iconOnly: true, onClick: () => showToast('View settings opened') },
        ]}
      />

      <ClientsTable
        rows={rows}
        selected={selected}
        onToggle={toggle}
        onToggleAll={toggleAll}
        onSort={(key) => showToast(`Sorted by ${key}`)}
        onRowAction={(row) => showToast(`Actions for ${row.name}`)}
      />

      <footer className="flex h-[59px] flex-none items-center justify-between border-t border-line bg-surface px-[18px] text-[11px] font-medium text-[#8c919a] dark:text-[#858e9a] mobile:h-auto mobile:flex-wrap mobile:gap-[9px] mobile:px-[13px] mobile:py-[9px]">
        <PageSizeSelect value={pageSize} onChange={setPageSize} />
        <span className="text-[#7d828b] dark:text-[#858e9a] mobile:order-3 mobile:w-full">
          1 to {rows.length} of {CLIENT_TOTAL} results
        </span>
        <Pagination onNext={() => showToast('Next page')} />
      </footer>
    </section>
  );
}
