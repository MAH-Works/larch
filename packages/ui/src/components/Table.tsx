import type { ComponentProps, ReactNode } from 'react';
import { Select } from '../base-ui/select.js';
import { Card } from './Card.js';
import Icon from './Icon.js';

interface Slot {
  children?: ReactNode;
  className?: string;
}

/** Card shell for directory-style tables (contacts, accounts, projects). */
export function DirectoryCard({ children, className = '' }: Slot) {
  return <Card className={`overflow-hidden ${className}`}>{children}</Card>;
}

/** Header strip above a table: filters on the left, settings on the right. Stacks on mobile. */
export function DirectoryToolbar({ children, className = '' }: Slot) {
  return (
    <div
      className={`flex min-h-[58px] items-center justify-between gap-[14px] border-b border-line px-[18px] mobile:flex-col mobile:items-start mobile:px-[13px] mobile:py-3 ${className}`}
    >
      {children}
    </div>
  );
}

/** Title + caption pair for a DirectoryToolbar. */
export function ToolbarTitle({ title, subtitle }: { title: ReactNode; subtitle?: ReactNode }) {
  return (
    <div>
      <h2 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">{title}</h2>
      {subtitle && <p className="mb-0 mt-[5px] text-[11px] text-[#989da5]">{subtitle}</p>}
    </div>
  );
}

/** `headers` is an array of column titles; rows are passed as children using <Row>/<Cell>. */
export function DirectoryTable({
  headers,
  children,
  minWidth = 760,
}: {
  headers: ReactNode[];
  children?: ReactNode;
  minWidth?: number;
}) {
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

export function Row({ children, className = '', ...props }: ComponentProps<'tr'>) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
}

export function Cell({ children, className = '' }: Slot) {
  return (
    <td className={`h-[60px] border-b border-line px-[15px] text-xs text-[#575d66] dark:text-[#bac2cc] ${className}`}>
      {children}
    </td>
  );
}

/** Two-line cell: bold title with a small grey caption underneath. */
export function Caption({ children }: { children?: ReactNode }) {
  return <span className="mt-[3px] block text-[10px] text-[#9b9fa7] dark:text-[#818b98]">{children}</span>;
}

/** Bold title + caption, optionally led by an avatar / mark. */
export function CellTitle({ leading, title, caption }: { leading?: ReactNode; title: ReactNode; caption?: ReactNode }) {
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

/** "···" row-actions trigger. `ref` is a plain prop in React 19, so it can be a Base UI `render` target (e.g. Menu.Trigger). */
export function MoreButton({ label = 'More actions', ...props }: { label?: string } & ComponentProps<'button'>) {
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

export function TableFooter({ children, pagination, className = '' }: Slot & { pagination?: ReactNode }) {
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
export interface PaginationProps {
  onPrev?: () => void;
  onNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
}

export function Pagination({ onPrev, onNext, disabledPrev = !onPrev, disabledNext = false }: PaginationProps) {
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

/** "Show [20]" rows-per-page select for table footers, built on Base UI Select. */
export interface PageSizeSelectProps {
  value: number;
  onChange: (size: number) => void;
  options?: number[];
}

export function PageSizeSelect({ value, onChange, options = [10, 20, 50] }: PageSizeSelectProps) {
  return (
    <Select.Root value={value} onValueChange={(n) => onChange(Number(n))}>
      <span className="inline-flex items-center gap-[6px]">
        Show
        <Select.Trigger
          aria-label="Rows per page"
          className="h-auto w-auto gap-[6px] rounded-[5px] py-[5px] pl-2 pr-[7px] text-[11px] text-[#60656e] dark:text-soft"
        >
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
      </span>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              {options.map((n) => (
                <Select.Item key={n} value={n}>
                  <Select.ItemText>{n}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
