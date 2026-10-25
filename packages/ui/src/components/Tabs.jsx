import { useId, useState } from 'react';

/**
 * Underlined tabs. `tabs`: [{ id, label, content }].
 * Uncontrolled by default (`defaultValue`); pass `value` + `onChange` to control.
 */
export function Tabs({ tabs, value, defaultValue, onChange, className = '' }) {
  const [inner, setInner] = useState(defaultValue ?? tabs[0]?.id);
  const active = value ?? inner;
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const base = useId();

  const select = (id) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
  };

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = tabs.findIndex((t) => t.id === current.id);
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    select(next.id);
    document.getElementById(`${base}-tab-${next.id}`)?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-1 border-b border-line" onKeyDown={onKeyDown}>
        {tabs.map((t) => {
          const on = t.id === current.id;
          return (
            <button
              key={t.id}
              id={`${base}-tab-${t.id}`}
              role="tab"
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              type="button"
              onClick={() => select(t.id)}
              className={`relative h-8 rounded-t-[5px] px-[10px] text-[11px] hover:text-ink ${
                on
                  ? 'font-semibold text-ink after:absolute after:inset-x-2 after:-bottom-px after:h-[2px] after:rounded-t-sm after:bg-blue after:content-[""]'
                  : 'text-[#9298a1]'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${current.id}`}
        className="pt-[14px] text-xs leading-normal text-[#737983] dark:text-[#8a939f]"
      >
        {current.content}
      </div>
    </div>
  );
}
