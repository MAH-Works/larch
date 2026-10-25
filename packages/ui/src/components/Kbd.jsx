/** Keyboard key cap, e.g. <Kbd>⌘ K</Kbd>. */
export function Kbd({ children, className = '' }) {
  return (
    <kbd
      className={`inline-flex h-[21px] min-w-[22px] items-center justify-center rounded-[4px] border border-b-2 border-[#dfe2e6] bg-[#fafbfc] px-[5px] font-sans text-[10px] text-[#888e97] dark:border-line-strong dark:bg-[#1b2027] dark:text-[#8993a0] ${className}`}
    >
      {children}
    </kbd>
  );
}
