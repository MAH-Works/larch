import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';

/**
 * Modal dialog rendered into document.body. Closes on backdrop click or Escape,
 * locks body scroll while open and moves focus into the panel.
 */
export function Dialog({ open, onClose, title, description, children, footer, width = 440 }) {
  const panel = useRef(null);
  // Keep the latest onClose without re-running the effect (inline handlers change every render).
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    const previous = document.activeElement;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(16,21,29,.52)] p-5 mobile:p-[13px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ width: `min(${width}px, 100%)` }}
        className="rounded-[10px] border border-line bg-surface text-ink shadow-dialog outline-none"
      >
        <div className="flex items-start justify-between gap-[15px] border-b border-line px-[19px] pb-[13px] pt-[18px]">
          <div>
            <h3 className="m-0 text-[15px] font-[650] tracking-[-.025em] text-ink">{title}</h3>
            {description && <p className="mb-0 mt-[5px] text-[11px] leading-[1.45] text-[#8f959e]">{description}</p>}
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="grid size-[25px] place-items-center rounded-[5px] text-[#8e949d] hover:bg-hover hover:text-ink"
          >
            <Icon name="close" size="sm" />
          </button>
        </div>
        <div className="px-[19px] pb-[18px] pt-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-line px-[19px] py-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
