import type { ReactNode } from 'react';

/** The Compass mark: rounded square, diagonal needle and a pivot dot. */
export function BrandMark({ className = 'size-[27px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`text-[#20242b] dark:text-[#e6e9ef] ${className}`}>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m21 8-10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="11" cy="20" r="2.5" strokeWidth="1.5" stroke="currentColor" className="fill-sidebar" />
    </svg>
  );
}

/** Mark + two-tone wordmark ("compass crm"). Pass `mark` to use your own logo. */
export function Brand({ name = 'compass', suffix = 'crm', mark = <BrandMark /> }: { name?: string; suffix?: string; mark?: ReactNode }) {
  return (
    <>
      {mark}
      <span className="text-base font-bold tracking-[-.03em]">
        {name} {suffix && <span className="font-medium text-muted">{suffix}</span>}
      </span>
    </>
  );
}
