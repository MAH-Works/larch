import { useState } from 'react';
import { PageSizeSelect, Pagination } from '@compass/ui';

export const title = 'Paginated footer';
export const description = 'Previous disables on the first page and next on the last.';
export const layout = 'padded';

const TOTAL = 37;

export default function Basic() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(TOTAL / size);
  const from = page * size + 1;
  const to = Math.min(TOTAL, from + size - 1);

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line px-[18px] py-3 text-[11px] font-medium text-[#8c919a]">
      <PageSizeSelect
        value={size}
        onChange={(n) => {
          setSize(n);
          setPage(0);
        }}
      />
      <span>
        {from} to {to} of {TOTAL} results
      </span>
      <Pagination
        onPrev={page > 0 ? () => setPage(page - 1) : undefined}
        onNext={() => setPage(page + 1)}
        disabledNext={page >= pages - 1}
      />
    </div>
  );
}
