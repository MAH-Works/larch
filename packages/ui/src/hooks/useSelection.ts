import { useCallback, useState } from 'react';

/**
 * Set-based row selection for tables.
 * `toggle(id, checked)` flips one row, `toggleAll(ids, checked)` flips a page, `clear()` empties it.
 */
export function useSelection<Id = string | number>(initial: Id[] = []) {
  const [selected, setSelected] = useState(() => new Set<Id>(initial));

  const toggle = useCallback(
    (id: Id, checked: boolean) =>
      setSelected((prev) => {
        const next = new Set(prev);
        checked ? next.add(id) : next.delete(id);
        return next;
      }),
    [],
  );

  const toggleAll = useCallback(
    (ids: Id[], checked: boolean) =>
      setSelected((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
        return next;
      }),
    [],
  );

  const clear = useCallback(() => setSelected(new Set<Id>()), []);

  return { selected, count: selected.size, toggle, toggleAll, clear, setSelected };
}
