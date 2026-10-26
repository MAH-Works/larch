import { useRef, type ReactNode } from 'react';
import { Button } from '../base-ui/button.js';
import Icon, { type IconName } from '../components/Icon.js';
import { useHotkey } from '../hooks/useHotkey.js';
import { useTheme } from '../theme/ThemeProvider.js';

// Topbar parts. Compose them inside <TopbarRoot> to build your own header, or use <Topbar> for the
// ready-made layout (breadcrumb, ⌘K search, create action, theme toggle, notifications).

export interface TopbarRootProps {
  /** `dark` renders the bar with dark tokens in either page theme (e.g. to mark an admin area). */
  tone?: 'default' | 'dark';
  className?: string;
  children?: ReactNode;
}

/** The header bar itself: height, padding, border and background. Lay out any parts inside it. */
export function TopbarRoot({ tone = 'default', className = '', children }: TopbarRootProps) {
  return (
    <header
      // A dark-tone bar is its own dark theme scope: tokens and dark: variants switch inside it.
      data-theme={tone === 'dark' ? 'dark' : undefined}
      className={`flex h-[70px] min-h-[70px] items-center gap-[15px] border-b border-line bg-sidebar px-[33px] text-ink tablet:px-5 mobile:h-[61px] mobile:min-h-[61px] mobile:gap-2 mobile:px-[14px] ${className}`}
    >
      {children}
    </header>
  );
}

/** Opens the mobile navigation drawer. Only visible on phones. */
export function TopbarMenuButton({ onClick, label = 'Open navigation' }: { onClick: () => void; label?: string }) {
  // Wrapper toggles visibility so it never competes with Button's own display utility.
  return (
    <div className="hidden mobile:block">
      <Button variant="icon" aria-label={label} onClick={onClick}>
        <Icon name="menu" />
      </Button>
    </div>
  );
}

export interface TopbarTitleProps {
  /** Breadcrumb before the title ("Workspace / Clients"). Hidden on phones. */
  section?: ReactNode;
  /** Icon before the breadcrumb; omit for none. */
  icon?: IconName;
  children?: ReactNode;
  className?: string;
}

/** Page title, optionally with an icon and a breadcrumb section. */
export function TopbarTitle({ section, icon, children, className = '' }: TopbarTitleProps) {
  return (
    <div className={`flex min-w-[183px] items-center gap-[9px] text-[13px] text-[#92969e] mobile:min-w-0 ${className}`}>
      {icon && <Icon name={icon} size="sm" className="text-[#888d96]" />}
      {section && <span className="mobile:hidden">{section} /</span>}
      <strong className="font-semibold text-[#2b2e34] dark:text-[#e3e7ed]">{children}</strong>
    </div>
  );
}

/** Pushes the following parts to the right edge. */
export function TopbarSpacer() {
  return <div className="flex-1 mobile:hidden" />;
}

export interface TopbarSearchProps {
  placeholder?: string;
  /** Called on Enter with the typed query. */
  onSearch: (query: string) => void;
  /** ⌘/Ctrl + this key focuses the field. */
  hotkey?: string;
}

/** Search field with a ⌘K hint. Collapses to an icon box on phones. */
export function TopbarSearch({ placeholder = 'Search', onSearch, hotkey = 'k' }: TopbarSearchProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  useHotkey(hotkey, () => searchRef.current?.focus());
  return (
    <label className="flex h-9 w-[min(258px,28vw)] items-center gap-2 rounded-[7px] border border-line-strong bg-surface px-[10px] text-faint transition focus-within:border-blue focus-within:shadow-[0_0_0_3px_var(--blue-soft)] tablet:w-[220px] mobile:w-auto mobile:flex-1">
      <Icon name="search" size="sm" />
      <input
        ref={searchRef}
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(e.currentTarget.value)}
        className="w-full min-w-0 border-0 bg-transparent text-xs text-ink outline-hidden placeholder:text-faint mobile:hidden"
      />
      <span className="whitespace-nowrap rounded-[4px] border border-[#e5e7ea] px-1 py-px text-[11px] leading-4 text-[#989da6] dark:border-line-strong dark:bg-[#1b2027] dark:text-[#8993a0] mobile:hidden">
        ⌘ {hotkey.toUpperCase()}
      </span>
    </label>
  );
}

/** Sun / moon button wired to ThemeProvider. */
export function TopbarThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <Button variant="icon" aria-label={label} title={label} onClick={toggleTheme}>
      <Icon name={isDark ? 'moon' : 'sun'} />
    </Button>
  );
}

/** Primary "create" action; the label hides on phones, leaving the plus. */
export function TopbarCreateButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <Button variant="create" onClick={onClick}>
      <span className="mobile:hidden">{label}</span>
      <Icon name="plus" size="sm" />
    </Button>
  );
}

export interface TopbarProps {
  section?: string;
  title?: string;
  /** Icon before the breadcrumb; pass `null` for none. */
  icon?: IconName | null;
  searchPlaceholder?: string;
  /** Shows the ⌘K search field; called on Enter. */
  onSearch?: (query: string) => void;
  createLabel?: string;
  onCreate?: () => void;
  onNotifications?: () => void;
  onOpenMenu?: () => void;
  showThemeToggle?: boolean;
  /** Extra controls before the create button. */
  actions?: ReactNode;
  /** Controls before the breadcrumb, e.g. a sidebar collapse toggle. */
  leading?: ReactNode;
  tone?: 'default' | 'dark';
  className?: string;
}

/**
 * Ready-made app header built from the Topbar parts: breadcrumb, ⌘K search, primary "create" action,
 * theme toggle and notifications. Every piece is optional — omit a handler/label to hide it. For a
 * different arrangement, compose the parts inside <TopbarRoot> yourself.
 */
export function Topbar({
  section,
  title,
  icon = 'table',
  searchPlaceholder = 'Search',
  onSearch,
  createLabel,
  onCreate,
  onNotifications,
  onOpenMenu,
  showThemeToggle = true,
  actions,
  leading,
  tone,
  className,
}: TopbarProps) {
  return (
    <TopbarRoot tone={tone} className={className}>
      {onOpenMenu && <TopbarMenuButton onClick={onOpenMenu} />}
      {leading}
      <TopbarTitle section={section} icon={icon ?? undefined}>
        {title}
      </TopbarTitle>
      <TopbarSpacer />
      {onSearch && <TopbarSearch placeholder={searchPlaceholder} onSearch={onSearch} />}
      {actions}
      {createLabel && <TopbarCreateButton label={createLabel} onClick={onCreate} />}
      {showThemeToggle && <TopbarThemeToggle />}
      {onNotifications && (
        <Button variant="icon" aria-label="Notifications" onClick={onNotifications}>
          <Icon name="bell" />
        </Button>
      )}
    </TopbarRoot>
  );
}
