import Badge from '../components/Badge.jsx';
import { AvatarStack } from '../components/Avatar.jsx';
import Checkbox from '../components/Checkbox.jsx';
import ClientMark from '../components/ClientMark.jsx';
import { MoreButton } from '../components/Table.jsx';

const TH = 'h-[41px] border-b border-line bg-head px-[14px] text-left text-[11px] font-medium text-label';
const TD = 'h-[58px] border-b border-line px-[14px] align-middle text-xs font-medium text-body';
const NUM = 'text-right';

function SortHeader({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-[5px] font-medium hover:text-[#3f444c] dark:hover:text-ink"
    >
      {children}
      <span aria-hidden="true" className="inline-flex flex-col text-[9px] leading-[6px] text-[#aeb2b9]">
        <span>⌃</span>
        <span>⌄</span>
      </span>
    </button>
  );
}

/**
 * Dense, selectable client table with a sticky header. Selection is controlled by the parent via
 * `selected` (a Set of row ids) — pair it with `useSelection()`.
 *
 * Row shape: { id, name, domain, mark, status: [label, variant], tag: [label, variant] | null,
 *              avatars: [{ initials, tone }], projects, tasks, billing }
 */
export function ClientsTable({ rows, selected, onToggle, onToggleAll, onSort, onRowAction }) {
  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someChecked = rows.some((r) => selected.has(r.id));

  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <table
        className="w-full min-w-[930px] table-fixed border-collapse
          [&_td+td]:border-l [&_td+td]:border-line-soft [&_th+th]:border-l [&_th+th]:border-line-soft
          [&_tbody_tr:last-child_td]:border-b-0"
      >
        <thead className="sticky top-0 z-[1]">
          <tr>
            <th className={`${TH} w-[51px] px-0 text-center`}>
              <Checkbox
                aria-label="Select all rows"
                checked={allChecked}
                indeterminate={someChecked && !allChecked}
                onChange={(e) => onToggleAll(rows.map((r) => r.id), e.target.checked)}
              />
            </th>
            <th className={`${TH} w-[23%]`}>
              <SortHeader onClick={() => onSort?.('name')}>Client</SortHeader>
            </th>
            <th className={`${TH} w-[14%]`}>Status</th>
            <th className={`${TH} w-[15%]`}>Tags</th>
            <th className={`${TH} ${NUM} w-[9.5%]`}>
              <SortHeader onClick={() => onSort?.('lastContact')}>Last contact</SortHeader>
            </th>
            <th className={`${TH} ${NUM} w-[9.5%]`}>Projects</th>
            <th className={`${TH} ${NUM} w-[9.5%]`}>Tasks</th>
            <th className={`${TH} ${NUM} w-[9.5%]`}>Billing</th>
            <th className={`${TH} w-[50px] px-0`}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const isSelected = selected.has(r.id);
            return (
              <tr key={r.id} className={isSelected ? 'bg-selected hover:bg-selected-hover' : 'hover:bg-row-hover'}>
                <td className={`${TD} px-0 text-center`}>
                  <Checkbox
                    aria-label={`Select ${r.name}`}
                    checked={isSelected}
                    onChange={(e) => onToggle(r.id, e.target.checked)}
                  />
                </td>
                <td className={TD}>
                  <div className="flex min-w-0 items-center gap-[10px]">
                    <ClientMark tone={r.mark}>{r.name[0]}</ClientMark>
                    <span className="min-w-0 truncate font-semibold text-strong">
                      {r.name}
                      <span className="mt-[2px] block text-[10px] font-normal text-faint">{r.domain}</span>
                    </span>
                  </div>
                </td>
                <td className={TD}>
                  <Badge variant={r.status[1]}>{r.status[0]}</Badge>
                </td>
                <td className={TD}>
                  {r.tag ? (
                    <Badge variant={r.tag[1]}>{r.tag[0]}</Badge>
                  ) : (
                    <span className="text-[#babdc3] dark:text-[#68717e]">-</span>
                  )}
                </td>
                <td className={TD}>
                  <AvatarStack avatars={r.avatars} className="justify-end" />
                </td>
                <td className={`${TD} ${NUM} text-[#535861] dark:text-[#c0c7d0]`}>{r.projects}</td>
                <td className={`${TD} ${NUM} text-[#535861] dark:text-[#c0c7d0]`}>{r.tasks}</td>
                <td className={`${TD} ${NUM} text-[#535861] dark:text-[#c0c7d0]`}>{r.billing}</td>
                <td className={`${TD} px-0 text-center`}>
                  <MoreButton label={`More actions for ${r.name}`} onClick={() => onRowAction?.(r)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
