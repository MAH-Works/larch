import { forwardRef } from 'react';

const CONTROL =
  'h-[35px] w-full rounded-md border border-line-strong bg-surface px-[10px] text-xs text-ink outline-none transition placeholder:text-[#a0a5ad] focus:border-blue focus:shadow-[0_0_0_3px_var(--blue-soft)] disabled:cursor-not-allowed disabled:opacity-60';

const INVALID = 'border-red focus:border-red focus:shadow-[0_0_0_3px_var(--red-soft)]';

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
      className={`${CONTROL} ${invalid ? INVALID : ''} ${className}`}
      {...props}
    />
  );
});

export const TextArea = forwardRef(function TextArea({ invalid, className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={`${CONTROL} h-[66px] resize-y px-[10px] py-[9px] ${invalid ? INVALID : ''} ${className}`}
      {...props}
    />
  );
});

export const SelectInput = forwardRef(function SelectInput({ children, className = '', ...props }, ref) {
  return (
    <div className="relative">
      <select ref={ref} className={`${CONTROL} appearance-none pr-[30px] ${className}`} {...props}>
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
