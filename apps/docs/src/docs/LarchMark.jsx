/** The Larch mark: rounded square (shared with the Compass mark) holding a tiered conifer. */
export function LarchMark({ className = 'size-[27px]' }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`text-[#20242b] dark:text-[#e6e9ef] ${className}`}>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 7v18M11.5 13 16 8.5l4.5 4.5M10 18.5l6-6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
