import type { ReactNode } from 'react';

/** Small uppercase label used above groups of controls. */
export function Eyebrow({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-[.12em] text-[#979ca5] dark:text-[#858e9a] ${className}`}>
      {children}
    </span>
  );
}
