// Theme
export { ThemeProvider, useTheme, themeScript } from './theme/ThemeProvider.jsx';

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
export { Combobox } from './base-ui/combobox.jsx';
export { ContextMenu } from './base-ui/context-menu.js';
export { Dialog } from './base-ui/dialog.js';
export { Drawer } from './base-ui/drawer.js';
export { Field } from './base-ui/field.js';
export { Fieldset } from './base-ui/fieldset.js';
export { Form } from './base-ui/form.js';
export { Input, TextArea } from './base-ui/input.jsx';
export { Menu } from './base-ui/menu.jsx';
export { Menubar } from './base-ui/menubar.js';
export { Meter } from './base-ui/meter.js';
export { NavigationMenu } from './base-ui/navigation-menu.jsx';
export { NumberField } from './base-ui/number-field.jsx';
export { OTPField } from './base-ui/otp-field.js';
export { Popover } from './base-ui/popover.jsx';
export { PreviewCard } from './base-ui/preview-card.js';
export { Progress } from './base-ui/progress.js';
export { Radio } from './base-ui/radio.js';
export { RadioGroup } from './base-ui/radio-group.js';
export { ScrollArea } from './base-ui/scroll-area.js';
export { Select } from './base-ui/select.jsx';
export { Separator } from './base-ui/separator.js';
export { Slider } from './base-ui/slider.js';
export { Switch } from './base-ui/switch.js';
export { Tabs } from './base-ui/tabs.js';
export { Toast } from './base-ui/toast.jsx';
export { Toggle } from './base-ui/toggle.js';
export { ToggleGroup } from './base-ui/toggle-group.js';
export { Toolbar } from './base-ui/toolbar.js';
export { Tooltip } from './base-ui/tooltip.js';
export { BUTTON_VARIANTS } from './base-ui/classes.js';

// Larch components (no Base UI equivalent)
export { default as Icon, ICON_NAMES } from './components/Icon.jsx';
export { default as Badge, BADGE_VARIANTS } from './components/Badge.jsx';
export { AvatarStack } from './components/Avatar.jsx';
export { default as ClientMark, CLIENT_MARK_TONES } from './components/ClientMark.jsx';
export { Card, Panel, PanelGrid, PanelSelect } from './components/Card.jsx';
export { MetricCard, MetricGrid } from './components/Metric.jsx';
export { ProgressRow, ProgressList, WorkloadRow, PROGRESS_TONES } from './components/Progress.jsx';
export { Legend, Dot, LEGEND_TONES } from './components/Legend.jsx';
export { Alert } from './components/Alert.jsx';
export { Skeleton } from './components/Skeleton.jsx';
export { Kbd } from './components/Kbd.jsx';
export { Eyebrow } from './components/Typography.jsx';
export { EmptyState } from './components/EmptyState.jsx';
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
} from './components/Table.jsx';
export { PageWrap, PageHeading } from './components/Page.jsx';

// Blocks
export { AppShell } from './blocks/AppShell.jsx';
export { Sidebar, SidebarNav, SidebarStatus } from './blocks/Sidebar.jsx';
export { Topbar } from './blocks/Topbar.jsx';
export { Brand, BrandMark } from './blocks/BrandMark.jsx';
export { ClientsTable } from './blocks/ClientsTable.jsx';
export { SelectionToolbar } from './blocks/SelectionToolbar.jsx';
export { ProjectCard, ProjectGrid } from './blocks/ProjectCard.jsx';
export { HealthChart, BarChart } from './blocks/Charts.jsx';
export { ActivityList } from './blocks/ActivityList.jsx';
export { AccountItem, RenewalItem, StatusList, Breakdown, PanelLink } from './blocks/Lists.jsx';
export { Toaster } from './blocks/Toaster.jsx';
