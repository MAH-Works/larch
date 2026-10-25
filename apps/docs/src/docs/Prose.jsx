import { md } from './CodeBlock.jsx';

/** Typography for long-form docs pages. */
export function Prose({ children, className = '' }) {
  return (
    <div
      className={`max-w-[760px] text-[13.5px] leading-[1.7] text-body
        [&_a]:font-medium [&_a]:text-blue [&_a]:no-underline [&_a]:hover:underline
        [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-lg [&_h2]:font-[650] [&_h2]:tracking-[-.03em] [&_h2]:text-ink [&>h2:first-child]:mt-0
        [&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:text-[14px] [&_h3]:font-[650] [&_h3]:text-ink
        [&_li]:my-1 [&_ol]:pl-5 [&_p]:my-3 [&_strong]:font-semibold [&_strong]:text-strong [&_ul]:pl-5
        ${className}`}
    >
      {children}
    </div>
  );
}

/** Page title block shared by every docs page. */
export function DocHeader({ eyebrow, title, description, children }) {
  return (
    <header className="mb-8 border-b border-line pb-6">
      {eyebrow && <p className="mb-2 mt-0 text-[11px] font-semibold uppercase tracking-[.13em] text-[#999da5] dark:text-[#7f8895]">{eyebrow}</p>}
      <h1 className="m-0 text-[28px] font-[650] leading-[1.1] tracking-[-.045em] text-ink mobile:text-[24px]">{title}</h1>
      {description && <p className="mb-0 mt-3 max-w-[68ch] text-[14px] leading-relaxed text-muted">{md(description)}</p>}
      {children}
    </header>
  );
}
