import { Checkbox } from '@mah-works/larch/checkbox';
import { useSelection } from '@mah-works/larch';

export const title = 'Select all';
export const description = 'The header checkbox is indeterminate when only some rows are selected. `onCheckedChange` receives the new boolean.';
export const layout = 'padded';

const ROWS = ['Aperture Labs', 'Northstar Health', 'Parallax Studio'];

export default function SelectAll() {
  const { selected, toggle, toggleAll } = useSelection(['Parallax Studio']);
  const all = ROWS.every((r) => selected.has(r));
  const some = ROWS.some((r) => selected.has(r));

  return (
    <div className="max-w-[300px] overflow-hidden rounded-lg border border-line text-xs">
      <label className="flex items-center gap-3 border-b border-line bg-head px-3 py-2 font-medium text-label">
        <Checkbox.Root checked={all} indeterminate={some && !all} onCheckedChange={(checked) => toggleAll(ROWS, checked)}>
          <Checkbox.Indicator />
        </Checkbox.Root>
        {selected.size ? `${selected.size} selected` : 'Select all'}
      </label>
      {ROWS.map((r) => (
        <label key={r} className={`flex items-center gap-3 px-3 py-[10px] text-body ${selected.has(r) ? 'bg-selected' : ''}`}>
          <Checkbox.Root checked={selected.has(r)} onCheckedChange={(checked) => toggle(r, checked)}>
            <Checkbox.Indicator />
          </Checkbox.Root>
          {r}
        </label>
      ))}
    </div>
  );
}
