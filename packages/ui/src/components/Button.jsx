import { forwardRef } from 'react';

const BASE =
  'inline-flex items-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue';

export const BUTTON_VARIANTS = {
  ghost: 'h-8 gap-[7px] rounded-md px-[9px] text-xs font-medium text-soft hover:bg-hover hover:text-ink',
  ghostDanger: 'h-8 gap-[7px] rounded-md px-[9px] text-xs font-medium text-red hover:bg-red-soft',
  outline:
    'h-8 gap-[7px] rounded-md border border-line-strong bg-surface px-[11px] text-xs text-soft hover:bg-hover hover:text-ink',
  primary:
    'h-8 gap-[7px] rounded-md border border-blue-border bg-blue px-3 text-xs font-semibold text-white hover:bg-blue-hover',
  danger:
    'h-8 gap-[7px] rounded-md border border-[#ffd9dc] bg-[#fff8f8] px-[11px] text-xs text-red dark:border-[#51272d] dark:bg-[#26171a]',
  // Taller primary used for the topbar "create" action.
  create:
    'h-9 gap-[7px] rounded-[7px] border border-blue-border bg-blue px-3 text-xs font-semibold text-white shadow-[0_1px_1px_rgba(24,73,201,.14)] hover:bg-blue-hover mobile:px-[10px]',
  // Square 36px icon button (topbar, toolbars). Always pass `aria-label`.
  icon: 'size-9 justify-center rounded-[7px] border border-line-strong bg-surface text-soft hover:bg-hover hover:text-ink',
};

/** Polymorphic button. `as` renders a router <Link> (or <a>) with the same look. */
const Button = forwardRef(function Button({ as: Tag = 'button', variant = 'outline', className = '', children, ...props }, ref) {
  const extra = Tag === 'button' && !props.type ? { type: 'button' } : {};
  const link = Tag === 'button' ? '' : 'no-underline';
  return (
    <Tag ref={ref} className={`${BASE} ${BUTTON_VARIANTS[variant]} ${link} ${className}`} {...extra} {...props}>
      {children}
    </Tag>
  );
});

export default Button;
