/** Small uppercase label used above groups of controls. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-[.12em] text-[#979ca5] dark:text-[#858e9a] ${className}`}>
      {children}
    </span>
  );
}
