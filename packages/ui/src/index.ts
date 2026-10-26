// Theme
export { ThemeProvider, useTheme, themeScript } from './theme/ThemeProvider.js';
export type { Theme, ThemeContextValue, ThemeProviderProps } from './theme/ThemeProvider.js';

// Hooks
export { useSelection } from './hooks/useSelection.js';
export { useHotkey } from './hooks/useHotkey.js';
export { useDismiss } from './hooks/useDismiss.js';

// Base UI components, themed by Larch. Same names, parts and props as @base-ui/react — also importable
// one at a time from `@mah-works/larch/<component>` (mirroring `@base-ui/react/<component>`).
export { Accordion } from './base-ui/accordion.js';
export { AlertDialog } from './base-ui/alert-dialog.js';
export { Autocomplete } from './base-ui/autocomplete.js';
export { Avatar, AVATAR_TONES, AVATAR_SIZES } from './base-ui/avatar.js';
export { Button } from './base-ui/button.js';
export { Checkbox } from './base-ui/checkbox.js';
export { CheckboxGroup } from './base-ui/checkbox-group.js';
export { Collapsible } from './base-ui/collapsible.js';
export { Combobox } from './base-ui/combobox.js';
export { ContextMenu } from './base-ui/context-menu.js';
export { Dialog } from './base-ui/dialog.js';
export { Drawer } from './base-ui/drawer.js';
export { Field } from './base-ui/field.js';
export { Fieldset } from './base-ui/fieldset.js';
export { Form } from './base-ui/form.js';
export { Input, TextArea } from './base-ui/input.js';
export { Menu } from './base-ui/menu.js';
export { Menubar } from './base-ui/menubar.js';
export { Meter } from './base-ui/meter.js';
export { NavigationMenu } from './base-ui/navigation-menu.js';
export { NumberField } from './base-ui/number-field.js';
export { OTPField } from './base-ui/otp-field.js';
export { Popover } from './base-ui/popover.js';
export { PreviewCard } from './base-ui/preview-card.js';
export { Progress } from './base-ui/progress.js';
export { Radio } from './base-ui/radio.js';
export { RadioGroup } from './base-ui/radio-group.js';
export { ScrollArea } from './base-ui/scroll-area.js';
export { Select } from './base-ui/select.js';
export { Separator } from './base-ui/separator.js';
export { Slider } from './base-ui/slider.js';
export { Switch } from './base-ui/switch.js';
export { Tabs } from './base-ui/tabs.js';
export { Toast } from './base-ui/toast.js';
export { Toggle } from './base-ui/toggle.js';
export { ToggleGroup } from './base-ui/toggle-group.js';
export { Toolbar } from './base-ui/toolbar.js';
export { Tooltip } from './base-ui/tooltip.js';
export { BUTTON_VARIANTS } from './base-ui/classes.js';
export type { ButtonVariant, Tone } from './base-ui/classes.js';

// Larch components (no Base UI equivalent)
export { default as Icon, ICON_NAMES } from './components/Icon.js';
export type { IconName, IconProps, IconSize } from './components/Icon.js';
export { default as Badge, BADGE_VARIANTS } from './components/Badge.js';
export type { BadgeProps, BadgeVariant } from './components/Badge.js';
export { AvatarStack } from './components/Avatar.js';
export type { AvatarStackItem } from './components/Avatar.js';
export { default as ClientMark, CLIENT_MARK_TONES } from './components/ClientMark.js';
export type { ClientMarkProps, ClientMarkTone } from './components/ClientMark.js';
export { Card, Panel, PanelGrid, PanelSelect } from './components/Card.js';
export type { CardProps, PanelProps, PanelSelectProps } from './components/Card.js';
export { MetricCard, MetricGrid } from './components/Metric.js';
export type { MetricCardProps } from './components/Metric.js';
export { ProgressRow, ProgressList, WorkloadRow, PROGRESS_TONES } from './components/Progress.js';
export type { ProgressRowProps } from './components/Progress.js';
export { Legend, Dot, LEGEND_TONES } from './components/Legend.js';
export type { LegendTone } from './components/Legend.js';
export { Alert } from './components/Alert.js';
export type { AlertProps, AlertTone } from './components/Alert.js';
export { Skeleton } from './components/Skeleton.js';
export { Kbd } from './components/Kbd.js';
export { Eyebrow } from './components/Typography.js';
export { EmptyState } from './components/EmptyState.js';
export type { EmptyStateProps } from './components/EmptyState.js';
export {
  DirectoryCard,
  DirectoryToolbar,
  ToolbarTitle,
  DirectoryTable,
  Row,
  Cell,
  Caption,
  CellTitle,
  MoreButton,
  TableFooter,
  Pagination,
  PageSizeSelect,
} from './components/Table.js';
export type { PageSizeSelectProps, PaginationProps } from './components/Table.js';
export { PageWrap, PageHeading } from './components/Page.js';
export type { PageHeadingProps } from './components/Page.js';

// Blocks
export { AppShell } from './blocks/AppShell.js';
export type { AppShellProps } from './blocks/AppShell.js';
export { Sidebar, SidebarNav, SidebarStatus } from './blocks/Sidebar.js';
export type { SidebarItem, SidebarNavProps, SidebarProps } from './blocks/Sidebar.js';
export { Topbar } from './blocks/Topbar.js';
export type { TopbarProps } from './blocks/Topbar.js';
export { Brand, BrandMark } from './blocks/BrandMark.js';
export { ClientsTable } from './blocks/ClientsTable.js';
export type { ClientId, ClientRow, ClientsTableProps } from './blocks/ClientsTable.js';
export { SelectionToolbar } from './blocks/SelectionToolbar.js';
export type { SelectionToolbarProps, ToolbarAction } from './blocks/SelectionToolbar.js';
export { ProjectCard, ProjectGrid } from './blocks/ProjectCard.js';
export type { ProjectCardProps } from './blocks/ProjectCard.js';
export { HealthChart, BarChart } from './blocks/Charts.js';
export type { HealthDatum } from './blocks/Charts.js';
export { ActivityList } from './blocks/ActivityList.js';
export type { ActivityItem } from './blocks/ActivityList.js';
export { AccountItem, RenewalItem, StatusList, Breakdown, PanelLink } from './blocks/Lists.js';
export type { AccountItemProps, BreakdownItem, PanelLinkProps } from './blocks/Lists.js';
export { Toaster } from './blocks/Toaster.js';
