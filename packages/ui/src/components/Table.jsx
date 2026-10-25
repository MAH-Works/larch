import { Card } from './Card.jsx';
import Icon from './Icon.jsx';

/** Card shell for directory-style tables (contacts, accounts, projects). */
export function DirectoryCard({ children, className = '' }) {
  return <Card className={`overflow-hidden ${className}`}>{children}</Card>;
}

/** Header strip above a table: filters on the left, settings on the right. Stacks on mobile. */
export function DirectoryToolbar({ children, className = '' }) {
  return (
    <div
      className={`flex min-h-[58px] items-center justify-between gap-[14px] border-b border-line px-[18px] mobile:flex-col mobile:items-start mobile:px-[13px] mobile:py-3 ${className}`}
    >
      {children}
    </div>
  );
}

/** Title + caption pair for a DirectoryToolbar. */
export function ToolbarTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">{title}</h2>
      {subtitle && <p className="mb-0 mt-[5px] text-[11px] text-[#989da5]">{subtitle}</p>}
    </div>
  );
}

/** `headers` is an array of column titles; rows are passed as children using <Row>/<Cell>. */
export function DirectoryTable({ headers, children, minWidth = 760 }) {
  return (
    <div className="overflow-x-auto">
      <table
        style={{ minWidth }}
        className="w-full border-collapse
          [&_td+td]:border-l [&_td+td]:border-line-soft [&_th+th]:border-l [&_th+th]:border-line-soft
          [&_tbody_tr:last-child_td]:border-b-0"
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="h-10 border-b border-line bg-head px-[15px] text-left text-[11px] font-medium text-label"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Row({ children, className = '', ...props }) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
}

export function Cell({ children, className = '' }) {
  return (
    <td className={`h-[60px] border-b border-line px-[15px] text-xs text-[#575d66] dark:text-[#bac2cc] ${className}`}>
      {children}
    </td>
  );
}

/** Two-line cell: bold title with a small grey caption underneath. */
export function Caption({ children }) {
  return <span className="mt-[3px] block text-[10px] text-[#9b9fa7] dark:text-[#818b98]">{children}</span>;
}

/** Bold title + caption, optionally led by an avatar / mark. */
export function CellTitle({ leading, title, caption }) {
  const text = (
    <span className="min-w-0">
      <strong className="font-semibold text-strong">{title}</strong>
      {caption && <Caption>{caption}</Caption>}
    </span>
  );
  if (!leading) return text;
  return (
    <div className="flex items-center gap-[10px]">
      {leading}
      {text}
    </div>
  );
}

/** "···" row-actions trigger. */
export function MoreButton({ label = 'More actions', ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-[5px] border-0 bg-transparent p-[7px] text-lg leading-[10px] text-[#9ea2aa] hover:bg-hover hover:text-[#555a63] dark:text-[#7d8794] dark:hover:text-[#d5dae1]"
      {...props}
    >
      ···
    </button>
  );
}

export function TableFooter({ children, pagination, className = '' }) {
  return (
    <div
      className={`flex min-h-[59px] items-center justify-between gap-[9px] border-t border-line px-[18px] text-[11px] font-medium text-[#8c919a] dark:text-[#858e9a] mobile:flex-wrap mobile:px-[13px] mobile:py-[9px] ${className}`}
    >
      {children}
      {pagination}
    </div>
  );
}

const PAGE_BTN =
  'grid h-[27px] min-w-[27px] place-items-center rounded-[5px] border border-line bg-surface text-[#7c818a] enabled:hover:border-[#c7cbd1] enabled:hover:text-[#33373e] disabled:cursor-not-allowed disabled:opacity-[.42] dark:text-soft dark:enabled:hover:text-ink';

/** Previous / next page buttons. */
export function Pagination({ onPrev, onNext, disabledPrev = !onPrev, disabledNext = false }) {
  return (
    <div className="flex gap-1">
      <button type="button" className={PAGE_BTN} disabled={disabledPrev} aria-label="Previous page" onClick={onPrev}>
        <Icon name="chevronLeft" size="xs" />
      </button>
      <button type="button" className={PAGE_BTN} disabled={disabledNext} aria-label="Next page" onClick={onNext}>
        <Icon name="chevronRight" size="xs" />
      </button>
    </div>
  );
}

/** "Show [20]" rows-per-page select for table footers. */
export function PageSizeSelect({ value, onChange, options = [10, 20, 50] }) {
  return (
    <label>
      Show{' '}
      <select
        aria-label="Rows per page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-[5px] border border-line-strong bg-surface py-[5px] pl-2 pr-[23px] text-[11px] text-[#60656e] dark:text-soft"
      >
        {options.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  );
}
