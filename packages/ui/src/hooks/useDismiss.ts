import { useEffect, type RefObject } from 'react';

/** While `active`, call `onDismiss` on Escape and (if `ref` is given) on a mousedown outside it. */
export function useDismiss(active: boolean, onDismiss: () => void, ref?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return undefined;
    const onDown = (e: MouseEvent) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) onDismiss();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [active, onDismiss, ref]);
}
