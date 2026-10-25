import { useCallback, useRef, useState } from 'react';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { useDismiss } from '../hooks/useDismiss.js';

/**
 * Button + popover menu that closes on outside click, Escape, or selection.
 * `items`: [{ label, icon?, danger?, onSelect? }]. `align`: 'left' | 'right'.
 */
export function Dropdown({ label, items, variant = 'outline', align = 'left', className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, ref);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <Button variant={variant} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {label} <Icon name="chevronDown" size="xs" />
      </Button>
      {open && (
        <div
          role="menu"
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} top-[calc(100%+6px)] z-[8] min-w-[174px] rounded-lg border border-line bg-surface p-[5px] shadow-pop dark:shadow-[0_14px_30px_rgba(0,0,0,.3)]`}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                item.onSelect?.();
                setOpen(false);
              }}
              className={`flex h-[31px] w-full items-center gap-2 rounded-[5px] px-2 text-left text-[11px] hover:bg-hover ${
                item.danger ? 'text-red' : 'text-[#626872] hover:text-ink dark:text-[#abb3be]'
              }`}
            >
              {item.icon && <Icon name={item.icon} size="xs" className={item.danger ? '' : 'text-[#9197a0]'} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
