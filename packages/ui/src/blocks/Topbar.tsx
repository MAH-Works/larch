import { useRef, type ReactNode } from 'react';
import { Button } from '../base-ui/button.js';
import Icon, { type IconName } from '../components/Icon.js';
import { useHotkey } from '../hooks/useHotkey.js';
import { useTheme } from '../theme/ThemeProvider.js';

export interface TopbarProps {
  section?: string;
  title?: string;
  icon?: IconName;
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
  /** `dark` renders the bar with dark tokens in either page theme (e.g. to mark an admin area). */
  tone?: 'default' | 'dark';
  className?: string;
}

/**
 * App header: breadcrumb, ⌘K search, primary "create" action, theme toggle and notifications.
 * Every piece is optional — omit a handler/label to hide it. `tone="dark"` keeps the bar dark in light mode.
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
  tone = 'default',
  className = '',
}: TopbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const searchRef = useRef<HTMLInputElement>(null);
  useHotkey('k', () => searchRef.current?.focus());

  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header
      // A dark-tone bar is its own dark theme scope: tokens and dark: variants switch inside it.
      data-theme={tone === 'dark' ? 'dark' : undefined}
      className={`flex h-[70px] min-h-[70px] items-center gap-[15px] border-b border-line bg-sidebar px-[33px] text-ink tablet:px-5 mobile:h-[61px] mobile:min-h-[61px] mobile:gap-2 mobile:px-[14px] ${className}`}
    >
      {/* Wrapper toggles visibility so it never competes with Button's own display utility. */}
      {onOpenMenu && (
        <div className="hidden mobile:block">
          <Button variant="icon" aria-label="Open navigation" onClick={onOpenMenu}>
            <Icon name="menu" />
          </Button>
        </div>
      )}

      <div className="flex min-w-[183px] items-center gap-[9px] text-[13px] text-[#92969e] mobile:min-w-0">
        <Icon name={icon} size="sm" className="text-[#888d96]" />
        {section && <span className="mobile:hidden">{section} /</span>}
        <strong className="font-semibold text-[#2b2e34] dark:text-[#e3e7ed]">{title}</strong>
      </div>

      <div className="flex-1 mobile:hidden" />

      {onSearch && (
        <label className="flex h-9 w-[min(258px,28vw)] items-center gap-2 rounded-[7px] border border-line-strong bg-surface px-[10px] text-faint transition focus-within:border-blue focus-within:shadow-[0_0_0_3px_var(--blue-soft)] tablet:w-[220px] mobile:w-auto mobile:flex-1">
          <Icon name="search" size="sm" />
          <input
            ref={searchRef}
            type="search"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(e.currentTarget.value)}
            className="w-full min-w-0 border-0 bg-transparent text-xs text-ink outline-hidden placeholder:text-faint mobile:hidden"
          />
          <span className="whitespace-nowrap rounded-[4px] border border-[#e5e7ea] px-1 py-px text-[11px] leading-4 text-[#989da6] dark:border-line-strong dark:bg-[#1b2027] dark:text-[#8993a0] mobile:hidden">
            ⌘ K
          </span>
        </label>
      )}

      {actions}

      {createLabel && (
        <Button variant="create" onClick={onCreate}>
          <span className="mobile:hidden">{createLabel}</span>
          <Icon name="plus" size="sm" />
        </Button>
      )}

      {showThemeToggle && (
        <Button variant="icon" aria-label={themeLabel} title={themeLabel} onClick={toggleTheme}>
          <Icon name={isDark ? 'moon' : 'sun'} />
        </Button>
      )}

      {onNotifications && (
        <Button variant="icon" aria-label="Notifications" onClick={onNotifications}>
          <Icon name="bell" />
        </Button>
      )}
    </header>
  );
}
