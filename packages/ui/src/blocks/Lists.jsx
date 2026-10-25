import Badge from '../components/Badge.jsx';
import ClientMark from '../components/ClientMark.jsx';
import Icon from '../components/Icon.jsx';
import { Dot } from '../components/Legend.jsx';

/** Account row: monogram, title + meta, optional badge, value. Rows are divided by hairlines. */
export function AccountItem({ name, mark = 'sky', meta, badge, value }) {
  return (
    <div className="flex items-center gap-[11px] border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0">
      <ClientMark tone={mark} size="lg">
        {name[0]}
      </ClientMark>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold text-[#30343a] dark:text-[#e0e5eb]">{name}</div>
        <div className="mt-[3px] text-[10px] text-[#969ba4] dark:text-[#858e9a]">{meta}</div>
      </div>
      {badge && <Badge variant={badge[1]}>{badge[0]}</Badge>}
      <div className="whitespace-nowrap text-xs font-semibold text-[#555b65] dark:text-[#c0c7d0]">{value}</div>
    </div>
  );
}

/** @deprecated Original Compass name — use AccountItem. */
export const RenewalItem = AccountItem;

/** Title + meta on the left, status badge on the right (saved reports, documents). */
export function StatusList({ items }) {
  return (
    <div className="flex flex-col gap-[14px]">
      {items.map((r) => (
        <div key={r.name} className="flex items-center justify-between gap-3 text-[11px]">
          <span>
            <strong className="text-xs font-semibold text-[#343940] dark:text-[#e0e5eb]">{r.name}</strong>
            <small className="mt-[3px] block text-[10px] text-[#9b9fa7] dark:text-[#818b98]">{r.meta}</small>
          </span>
          {r.badge && <Badge variant={r.badge[1]}>{r.badge[0]}</Badge>}
        </div>
      ))}
    </div>
  );
}

const SEGMENT = { blue: 'bg-blue', violet: 'bg-[#7e61c4]', green: 'bg-[#39a978]', amber: 'bg-[#d19a35]', red: 'bg-[#d45d6b]' };

/**
 * Share-of-total breakdown: a segmented bar plus a labelled list.
 * `items`: [{ label, amount, share (0–100), tone }].
 */
export function Breakdown({ items }) {
  return (
    <>
      <div className="flex h-[7px] gap-[2px] overflow-hidden rounded-full bg-[#eef0f3] dark:bg-[#252b34]">
        {items.map((m) => (
          <span key={m.label} className={SEGMENT[m.tone]} style={{ width: `${m.share}%` }} />
        ))}
      </div>
      <div className="mt-[22px] flex flex-col gap-[14px]">
        {items.map((m) => (
          <div key={m.label} className="flex items-center justify-between gap-3 text-[11px] text-[#6f7580] dark:text-muted">
            <span className="flex items-center gap-[7px]">
              <Dot tone={m.tone} />
              {m.label}
            </span>
            <strong className="text-xs font-semibold text-[#343940] dark:text-[#e0e5eb]">
              {m.amount} <span className="text-[10px] font-normal text-[#9a9fa8]">{m.share}%</span>
            </strong>
          </div>
        ))}
      </div>
    </>
  );
}

/** Small text link with a trailing arrow, used in panel headers. Polymorphic via `as`. */
export function PanelLink({ as: Tag = 'a', children, ...props }) {
  return (
    <Tag
      className="inline-flex h-8 items-center gap-[7px] whitespace-nowrap rounded-md px-[9px] text-xs font-medium text-soft no-underline hover:bg-hover hover:text-ink"
      {...props}
    >
      {children}
      <Icon name="arrowRight" size="xs" />
    </Tag>
  );
}
