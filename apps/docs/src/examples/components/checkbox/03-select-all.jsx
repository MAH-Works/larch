import { Checkbox, useSelection } from '@larch/ui';

export const title = 'Select all';
export const description = 'The header checkbox is indeterminate when only some rows are selected.';
export const layout = 'padded';

const ROWS = ['Aperture Labs', 'Northstar Health', 'Parallax Studio'];

export default function SelectAll() {
  const { selected, toggle, toggleAll } = useSelection(['Parallax Studio']);
  const all = ROWS.every((r) => selected.has(r));
  const some = ROWS.some((r) => selected.has(r));

  return (
    <div className="max-w-[300px] overflow-hidden rounded-lg border border-line text-xs">
      <label className="flex items-center gap-3 border-b border-line bg-head px-3 py-2 font-medium text-label">
        <Checkbox checked={all} indeterminate={some && !all} onChange={(e) => toggleAll(ROWS, e.target.checked)} />
        {selected.size ? `${selected.size} selected` : 'Select all'}
      </label>
      {ROWS.map((r) => (
        <label key={r} className={`flex items-center gap-3 px-3 py-[10px] text-body ${selected.has(r) ? 'bg-selected' : ''}`}>
          <Checkbox checked={selected.has(r)} onChange={(e) => toggle(r, e.target.checked)} />
          {r}
        </label>
      ))}
    </div>
  );
}
