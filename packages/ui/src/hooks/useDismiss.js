import { useEffect } from 'react';

/** While `active`, call `onDismiss` on Escape and (if `ref` is given) on a mousedown outside it. */
export function useDismiss(active, onDismiss, ref) {
  useEffect(() => {
    if (!active) return undefined;
    const onDown = (e) => ref?.current && !ref.current.contains(e.target) && onDismiss();
    const onKey = (e) => e.key === 'Escape' && onDismiss();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [active, onDismiss, ref]);
}
