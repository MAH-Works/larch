import { useEffect, useRef } from 'react';

/** Run `handler` on ⌘/Ctrl + `key` (e.g. `useHotkey('k', focusSearch)`). */
export function useHotkey(key, handler) {
  const saved = useRef(handler);
  saved.current = handler;

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        saved.current(e);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [key]);
}
