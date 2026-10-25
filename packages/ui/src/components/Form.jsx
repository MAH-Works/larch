import { forwardRef } from 'react';

// Shared look only. Height, padding and border state are added per control so each element carries
// exactly one utility per property — nothing depends on which class Tailwind emits last.
const CONTROL =
  'w-full rounded-md border bg-surface text-xs text-ink outline-hidden transition placeholder:text-[#a0a5ad] disabled:cursor-not-allowed disabled:opacity-60';

const VALID = 'border-line-strong focus:border-blue focus:shadow-[0_0_0_3px_var(--blue-soft)]';
const INVALID = 'border-red focus:border-red focus:shadow-[0_0_0_3px_var(--red-soft)]';
const state = (invalid) => (invalid ? INVALID : VALID);

/** Label + control + optional hint/error. Stacked Fields get a 12px gap. */
export function Field({ label, id, hint, error, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-[6px] [&+&]:mt-3 ${className}`}>
      <label htmlFor={id} className="text-[11px] font-semibold text-[#5f656e] dark:text-[#8a939f]">
        {label}
      </label>
      {children}
      {(error || hint) && (
        <span className={`text-[10px] ${error ? 'text-red' : 'text-[#9298a1] dark:text-[#8a939f]'}`}>{error || hint}</span>
      )}
    </div>
  );
}

export const TextInput = forwardRef(function TextInput({ invalid, className = '', type = 'text', ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={`${CONTROL} ${state(invalid)} h-[35px] px-[10px] ${className}`}
      {...props}
    />
  );
});

export const TextArea = forwardRef(function TextArea({ invalid, className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={`${CONTROL} ${state(invalid)} h-[66px] resize-y px-[10px] py-[9px] ${className}`}
      {...props}
    />
  );
});

export const SelectInput = forwardRef(function SelectInput({ children, className = '', ...props }, ref) {
  return (
    <div className="relative">
      <select ref={ref} className={`${CONTROL} ${VALID} h-[35px] appearance-none pl-[10px] pr-[30px] ${className}`} {...props}>
        {children}
      </select>
      <span className="pointer-events-none absolute right-[10px] top-[8px] text-[13px] text-[#8c929b]">⌄</span>
    </div>
  );
});

/** Labelled toggle. Pass `checked` + `onChange` to control it, or `defaultChecked` for uncontrolled. */
export function Switch({ label, description, className = '', ...inputProps }) {
  return (
    <div className={`flex min-h-9 items-center justify-between gap-[14px] ${className}`}>
      <div>
        <strong className="block text-xs font-semibold text-ink">{label}</strong>
        {description && <span className="mt-[2px] block text-[10px] text-[#9298a1] dark:text-[#8a939f]">{description}</span>}
      </div>
      <label className="relative h-5 w-[34px] shrink-0">
        <input type="checkbox" role="switch" aria-label={label} className="peer absolute opacity-0" {...inputProps} />
        <span className="block h-5 w-[34px] rounded-full bg-[#d9dde3] transition-colors peer-checked:bg-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue dark:bg-[#4b5562]" />
        <span className="pointer-events-none absolute left-[3px] top-[3px] size-[14px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.12)] transition-transform peer-checked:translate-x-[14px]" />
      </label>
    </div>
  );
}

/** Native checkbox with an inline label. Stacked rows get a 10px gap. */
export function CheckRow({ children, className = '', ...inputProps }) {
  return (
    <label className={`flex items-center gap-2 text-xs text-[#656b74] dark:text-muted [&+&]:mt-[10px] ${className}`}>
      <input type="checkbox" className="size-[15px] accent-blue" {...inputProps} />
      {children}
    </label>
  );
}
