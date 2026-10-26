import { Drawer } from '../base-ui/drawer.js';
import type { ElementType, ReactNode } from 'react';
import Icon, { type IconName } from '../components/Icon.js';
import { Brand, BrandMark } from './BrandMark.js';

const linkBase = 'flex min-h-[34px] items-center gap-[10px] rounded-[7px] px-[10px] text-[13px] no-underline transition-colors';

/**
 * Router-agnostic navigation. Pass your router's link as `linkComponent` (it receives `href`,
 * `className`, `onClick`, `aria-current`, `children`) and the current path as `activeHref`.
 *
 * `sections`: [{ label, items: [{ href, label, icon, count? }] }]
 */
export interface SidebarItem {
  href: string;
  label: ReactNode;
  icon?: IconName;
  count?: ReactNode;
}

export interface SidebarNavProps {
  sections: { label: string; items: SidebarItem[] }[];
  /** Current path; the matching item is highlighted. */
  activeHref?: string;
  /** Custom matcher (e.g. prefix matching). */
  isActive?: (item: SidebarItem) => boolean;
  /** Receives href, className, onClick, aria-current and children. */
  linkComponent?: ElementType;
  brand?: ReactNode;
  brandHref?: string;
  footer?: ReactNode;
  onNavigate?: () => void;
  /** Icons-only rail: labels become tooltips and screen-reader text. Ignored in the mobile drawer. */
  collapsed?: boolean;
  /** Logo shown while collapsed. */
  collapsedBrand?: ReactNode;
  /** Shows a collapse / expand button at the bottom of the desktop sidebar. */
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function SidebarNav({
  sections,
  activeHref,
  isActive = (item) => item.href === activeHref,
  linkComponent: Link = 'a',
  brand = <Brand />,
  brandHref = '/',
  footer,
  onNavigate,
  collapsed = false,
  collapsedBrand = <BrandMark />,
  onCollapsedChange,
}: SidebarNavProps) {
  return (
    <>
      <Link
        href={brandHref}
        onClick={onNavigate}
        className={`mb-[37px] flex items-center gap-[10px] text-ink no-underline ${collapsed ? 'justify-center' : 'px-[11px]'}`}
        aria-label="Home"
      >
        {collapsed ? collapsedBrand : brand}
      </Link>

      <nav aria-label="Main navigation">
        {sections.map((section) => (
          <div key={section.label} className="mb-[25px]">
            <div
              className={
                collapsed
                  ? 'sr-only'
                  : 'mb-[7px] px-[11px] text-[10px] font-semibold uppercase tracking-[.105em] text-[#a2a6ae] dark:text-[#707987]'
              }
            >
              {section.label}
            </div>
            {section.items.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  title={collapsed && typeof item.label === 'string' ? item.label : undefined}
                  className={`${linkBase} ${collapsed ? 'justify-center px-0' : ''} ${
                    active
                      ? 'bg-[#ebedf0] font-semibold text-[#22252a] dark:bg-[#252b34] dark:text-[#f2f4f7]'
                      : 'font-medium text-[#646974] hover:bg-[#f0f1f3] hover:text-ink dark:text-muted dark:hover:bg-[#1b2028]'
                  }`}
                >
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      className={active ? 'text-[#4d535d] dark:text-[#b9c1cc]' : 'text-[#80858e] dark:text-[#7f8997]'}
                    />
                  )}
                  {collapsed ? <span className="sr-only">{item.label}</span> : item.label}
                  {item.count != null && !collapsed && <span className="ml-auto text-xs font-normal text-[#969ba4]">{item.count}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {(footer || onCollapsedChange) && (
        <div className={`mt-auto ${collapsed ? '' : 'px-[10px]'}`}>
          {footer}
          {onCollapsedChange && (
            <button
              type="button"
              onClick={() => onCollapsedChange(!collapsed)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={`${linkBase} mt-2 w-full border-0 bg-transparent font-medium text-[#80858e] hover:bg-[#f0f1f3] hover:text-ink dark:text-[#7f8997] dark:hover:bg-[#1b2028] ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon name={collapsed ? 'chevronRight' : 'chevronLeft'} />
              {!collapsed && 'Collapse'}
            </button>
          )}
        </div>
      )}
    </>
  );
}

/** Status line + user initials for the bottom of the sidebar. */
export function SidebarStatus({ text = 'All systems operational', initials }: { text?: ReactNode; initials?: string }) {
  return (
    <div className="flex items-center gap-[9px] border-t border-line pt-[17px] text-xs font-medium text-[#747982] dark:text-[#89929e]">
      <span className="size-[7px] rounded-full bg-[#35b879] shadow-[0_0_0_3px_#e8f8ef] dark:shadow-[0_0_0_3px_#173a2c]" />
      <span>{text}</span>
      {initials && (
        <span className="ml-auto grid size-[25px] place-items-center rounded-full bg-[#e8defd] text-[10px] font-bold text-[#6546aa]">
          {initials}
        </span>
      )}
    </div>
  );
}

const PANEL = 'flex flex-col overflow-y-auto border-r border-line bg-sidebar pb-[18px] pt-[22px]';
const PANEL_WIDTH = 'w-[244px] px-[14px]';

/**
 * Desktop sidebar (≥ 681px) plus a swipe-to-close Base UI Drawer on mobile when `open`.
 * `collapsed` turns the desktop sidebar into a 64px icon rail; `onCollapsedChange` adds the toggle.
 */
export interface SidebarProps extends SidebarNavProps {
  /** Mobile drawer visibility. */
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose, ...navProps }: SidebarProps) {
  const collapsed = navProps.collapsed ?? false;
  const drawerProps = { ...navProps, collapsed: false, onCollapsedChange: undefined };
  return (
    <>
      <aside
        className={`${PANEL} sticky top-0 h-screen shrink-0 transition-[width] mobile:hidden ${
          collapsed ? 'w-[64px] px-[10px]' : `${PANEL_WIDTH} tablet:w-[214px]`
        }`}
      >
        <SidebarNav {...navProps} />
      </aside>

      <Drawer.Root open={open} onOpenChange={(next) => !next && onClose?.()} swipeDirection="left">
        <Drawer.Portal>
          <Drawer.Backdrop className="hidden mobile:block" />
          <Drawer.Viewport className="hidden mobile:flex">
            {/* Placement styles are keyed to data-swipe-direction, so overrides use the same variant. */}
            <Drawer.Popup
              aria-label="Navigation"
              className={`${PANEL} ${PANEL_WIDTH} data-[swipe-direction=left]:w-[244px] data-[swipe-direction=left]:px-[14px] data-[swipe-direction=left]:pb-[18px] data-[swipe-direction=left]:pt-[22px]`}
            >
              {/* The drawer always shows the full menu. */}
              <SidebarNav
                {...drawerProps}
                onNavigate={() => {
                  navProps.onNavigate?.();
                  onClose?.();
                }}
              />
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
