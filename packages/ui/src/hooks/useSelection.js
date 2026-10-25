import { useCallback, useState } from 'react';

/**
 * Set-based row selection for tables.
 * `toggle(id, checked)` flips one row, `toggleAll(ids, checked)` flips a page, `clear()` empties it.
 */
export function useSelection(initial = []) {
  const [selected, setSelected] = useState(() => new Set(initial));

  const toggle = useCallback(
    (id, checked) =>
      setSelected((prev) => {
        const next = new Set(prev);
        checked ? next.add(id) : next.delete(id);
        return next;
      }),
    [],
  );

  const toggleAll = useCallback(
    (ids, checked) =>
      setSelected((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
        return next;
      }),
    [],
  );

  const clear = useCallback(() => setSelected(new Set()), []);

  return { selected, count: selected.size, toggle, toggleAll, clear, setSelected };
}
