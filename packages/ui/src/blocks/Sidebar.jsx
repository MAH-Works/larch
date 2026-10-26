import { Drawer } from '../base-ui/drawer.js';
import Icon from '../components/Icon.jsx';
import { Brand } from './BrandMark.jsx';

const linkBase = 'flex min-h-[34px] items-center gap-[10px] rounded-[7px] px-[10px] text-[13px] no-underline transition-colors';

/**
 * Router-agnostic navigation. Pass your router's link as `linkComponent` (it receives `href`,
 * `className`, `onClick`, `aria-current`, `children`) and the current path as `activeHref`.
 *
 * `sections`: [{ label, items: [{ href, label, icon, count? }] }]
 */
export function SidebarNav({
  sections,
  activeHref,
  isActive = (item) => item.href === activeHref,
  linkComponent: Link = 'a',
  brand = <Brand />,
  brandHref = '/',
  footer,
  onNavigate,
}) {
  return (
    <>
      <Link href={brandHref} onClick={onNavigate} className="mb-[37px] flex items-center gap-[10px] px-[11px] text-ink no-underline" aria-label="Home">
        {brand}
      </Link>

      <nav aria-label="Main navigation">
        {sections.map((section) => (
          <div key={section.label} className="mb-[25px]">
            <div className="mb-[7px] px-[11px] text-[10px] font-semibold uppercase tracking-[.105em] text-[#a2a6ae] dark:text-[#707987]">
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
                  className={`${linkBase} ${
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
                  {item.label}
                  {item.count != null && <span className="ml-auto text-xs font-normal text-[#969ba4]">{item.count}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {footer && <div className="mt-auto px-[10px]">{footer}</div>}
    </>
  );
}

/** Status line + user initials for the bottom of the sidebar. */
export function SidebarStatus({ text = 'All systems operational', initials }) {
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

const PANEL = 'flex w-[244px] flex-col overflow-y-auto border-r border-line bg-sidebar px-[14px] pb-[18px] pt-[22px]';

/** Desktop sidebar (≥ 681px) plus a swipe-to-close Base UI Drawer on mobile when `open`. */
export function Sidebar({ open = false, onClose, ...navProps }) {
  return (
    <>
      <aside className={`${PANEL} sticky top-0 h-screen shrink-0 tablet:w-[214px] mobile:hidden`}>
        <SidebarNav {...navProps} />
      </aside>

      <Drawer.Root open={open} onOpenChange={(next) => !next && onClose?.()} swipeDirection="left">
        <Drawer.Portal>
          <Drawer.Backdrop className="hidden mobile:block" />
          <Drawer.Viewport className="hidden mobile:flex">
            {/* Placement styles are keyed to data-swipe-direction, so overrides use the same variant. */}
            <Drawer.Popup
              aria-label="Navigation"
              className={`${PANEL} data-[swipe-direction=left]:w-[244px] data-[swipe-direction=left]:px-[14px] data-[swipe-direction=left]:pb-[18px] data-[swipe-direction=left]:pt-[22px]`}
            >
              <SidebarNav
                {...navProps}
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
