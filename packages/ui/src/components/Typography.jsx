/** Small uppercase label used above groups of controls. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-[.12em] text-[#979ca5] dark:text-[#858e9a] ${className}`}>
      {children}
    </span>
  );
}

/** 1px horizontal rule with 19px vertical rhythm. */
export function Divider({ className = '' }) {
  return <div role="separator" className={`my-[19px] h-px bg-line ${className}`} />;
}

/** Thin vertical separator for toolbars. */
export function ToolbarDivider({ className = '' }) {
  return <span aria-hidden="true" className={`mx-[7px] h-[17px] w-px bg-line mobile:hidden ${className}`} />;
}
