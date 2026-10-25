// Single source of truth for the docs navigation, component pages and block pages.
// Example code lives in src/examples/{components,blocks}/<slug>/NN-name.jsx and is discovered by glob.

const modules = import.meta.glob('../examples/**/*.jsx', { eager: true });
const sources = import.meta.glob('../examples/**/*.jsx', { eager: true, query: '?raw', import: 'default' });

/** Examples for one component/block page, ordered by their NN- filename prefix. */
export function examplesFor(kind, slug) {
  const prefix = `../examples/${kind}/${slug}/`;
  return Object.keys(modules)
    .filter((path) => path.startsWith(prefix))
    .sort()
    .map((path) => {
      const mod = modules[path];
      const file = path.slice(prefix.length).replace(/\.jsx$/, '');
      return {
        id: file.replace(/^\d+-/, ''),
        title: mod.title,
        description: mod.description,
        layout: mod.layout,
        Component: mod.default,
        source: sources[path],
      };
    });
}

export const GUIDES = [
  { slug: '', label: 'Introduction', icon: 'overview' },
  { slug: 'installation', label: 'Installation', icon: 'download' },
  { slug: 'theming', label: 'Theming & dark mode', icon: 'moon' },
  { slug: 'tokens', label: 'Design tokens', icon: 'tag' },
  { slug: 'hooks', label: 'Hooks', icon: 'settings' },
];

export const COMPONENTS = [
  // ── Actions ──
  {
    slug: 'button',
    name: 'Button',
    group: 'Actions',
    description: 'Polymorphic button with seven variants. Ghost controls keep attention on the data; primary is reserved for the one thing a page wants you to do.',
    imports: ['Button'],
    props: {
      Button: [
        ['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon'", "'outline'", 'Visual style. `create` is the taller topbar primary; `icon` is a 36px square (always pass aria-label).'],
        ['as', 'ElementType', "'button'", 'Render as another element, e.g. a router <Link> or <a>.'],
        ['className', 'string', '', 'Extra classes appended to the variant.'],
        ['...props', 'ButtonHTMLAttributes', '', 'Forwarded to the element. `type="button"` is set by default. Ref is forwarded.'],
      ],
    },
  },
  {
    slug: 'dropdown',
    name: 'Dropdown',
    group: 'Actions',
    description: 'A button that opens a small action menu. Closes on outside click, Escape or selection.',
    imports: ['Dropdown'],
    props: {
      Dropdown: [
        ['label', 'ReactNode', '', 'Trigger content (a chevron is appended).'],
        ['items', '{ label, icon?, danger?, onSelect? }[]', '', 'Menu entries. `danger` colors the row red.'],
        ['variant', 'Button variant', "'outline'", 'Trigger button style.'],
        ['align', "'left' | 'right'", "'left'", 'Which edge of the trigger the menu aligns to.'],
      ],
    },
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    group: 'Actions',
    description: 'Keyboard key cap for shortcuts and hints.',
    imports: ['Kbd'],
    props: { Kbd: [['children', 'ReactNode', '', 'Key label, e.g. "⌘ K".']] },
  },

  // ── Data display ──
  {
    slug: 'badge',
    name: 'Badge',
    group: 'Data display',
    description: 'Pills share one shape; hue communicates state (status) or classification (tag). A `count` badge is a compact numeric pill.',
    imports: ['Badge', 'BADGE_VARIANTS'],
    props: {
      Badge: [
        ['variant', "'active' | 'trial' | 'onboarding' | 'inactive' | 'archived' | 'priority' | 'low' | 'vip' | 'longterm' | 'green' | 'blue' | 'red'", "'inactive'", 'Semantic color.'],
        ['count', 'boolean', 'false', 'Compact 17px numeric pill for counts inside buttons.'],
        ['className', 'string', '', 'Extra classes.'],
      ],
    },
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    group: 'Data display',
    description: 'Gradient initials avatar in three sizes, plus an overlapping stack for teams.',
    imports: ['Avatar', 'AvatarStack'],
    props: {
      Avatar: [
        ['initials', 'string', '', 'One or two characters, or "+N" for overflow.'],
        ['tone', "'blue' | 'coral' | 'green' | 'sand' | 'purple'", "'blue'", 'Gradient.'],
        ['size', "'sm' | 'md' | 'lg'", "'sm'", '25px · 30px · 35px.'],
        ['more', 'boolean', 'false', 'Neutral grey look for "+N" overflow avatars.'],
        ['stacked', 'boolean', 'false', 'Adds the overlap + surface ring (set automatically by AvatarStack).'],
      ],
      AvatarStack: [
        ['avatars', 'AvatarProps[]', '[]', 'Avatars to overlap, left to right.'],
        ['className', 'string', '', 'Extra classes on the flex wrapper.'],
      ],
    },
  },
  {
    slug: 'client-mark',
    name: 'ClientMark',
    group: 'Data display',
    description: 'Rounded-square monogram that identifies an organisation in tables and lists.',
    imports: ['ClientMark'],
    props: {
      ClientMark: [
        ['tone', "'sky' | 'lime' | 'yellow' | 'violet' | 'rose' | 'blue' | 'slate'", "'sky'", 'Pastel background + matching text.'],
        ['size', "'md' | 'lg'", "'md'", '29px or 30px.'],
        ['children', 'ReactNode', '', 'Usually the first letter of the name.'],
      ],
    },
  },
  {
    slug: 'icon',
    name: 'Icon',
    group: 'Data display',
    description: 'A compact 24×24 stroke icon set. Icons inherit `currentColor`, so color them with text utilities.',
    imports: ['Icon', 'ICON_NAMES'],
    props: {
      Icon: [
        ['name', 'IconName', '', 'One of ICON_NAMES (see gallery below).'],
        ['size', "'md' | 'sm' | 'xs'", "'md'", '17px · 15px · 13px.'],
        ['className', 'string', '', 'Color / spacing classes.'],
      ],
    },
  },
  {
    slug: 'card',
    name: 'Card & Panel',
    group: 'Data display',
    description: 'Card is the base surface. Panel adds a title, subtitle and header action; PanelGrid lays panels out wide + narrow.',
    imports: ['Card', 'Panel', 'PanelGrid', 'PanelSelect'],
    props: {
      Card: [
        ['as', 'ElementType', "'div'", 'Element to render.'],
        ['className', 'string', '', 'Padding and layout classes (Card has none by default).'],
      ],
      Panel: [
        ['title', 'ReactNode', '', 'Panel heading (h2).'],
        ['subtitle', 'ReactNode', '', 'Small grey caption under the title.'],
        ['action', 'ReactNode', '', 'Right-aligned header control — a PanelSelect, PanelLink or ghost Button.'],
      ],
      PanelGrid: [
        ['columns', "'wide' | 'report' | 'even'", "'wide'", 'Column template. Stacks below 980px.'],
      ],
      PanelSelect: [
        ['label', 'string', '', 'Accessible label.'],
        ['options', 'string[]', '', 'Option labels.'],
      ],
    },
  },
  {
    slug: 'metric-card',
    name: 'MetricCard',
    group: 'Data display',
    description: 'KPI tile with an uppercase label, a large value and trend meta. MetricGrid lays out four in a row.',
    imports: ['MetricCard', 'MetricGrid'],
    props: {
      MetricCard: [
        ['label', 'string', '', 'Uppercase caption.'],
        ['value', 'ReactNode', '', 'The number.'],
        ['meta', "{ text, trend?: 'up' | 'down' }[]", '[]', 'Footnotes; `trend` colors the text green or red.'],
      ],
      MetricGrid: [['items', 'MetricCardProps[]', '', 'Four is the sweet spot (2-up < 980px, 1-up on mobile).']],
    },
  },
  {
    slug: 'progress',
    name: 'Progress',
    group: 'Data display',
    description: 'A thin progress track, a labelled row for workload-style breakdowns, and a list helper.',
    imports: ['ProgressBar', 'ProgressRow', 'ProgressList'],
    props: {
      ProgressBar: [
        ['percent', 'number', '', '0–100 (clamped).'],
        ['tone', "'blue' | 'green' | 'amber' | 'violet' | 'red'", "'blue'", 'Fill color.'],
        ['label', 'string', '', 'Accessible name.'],
      ],
      ProgressRow: [
        ['label', 'string', '', 'Left label (90px column).'],
        ['value', 'ReactNode', '', 'Right-aligned value.'],
        ['percent', 'number', '', 'Bar fill.'],
        ['tone', 'string', "'blue'", 'Bar color.'],
      ],
      ProgressList: [['items', 'ProgressRowProps[]', '', 'Rows stacked with 17px gaps.']],
    },
  },
  {
    slug: 'legend',
    name: 'Legend',
    group: 'Data display',
    description: 'Colored dots that key chart series.',
    imports: ['Legend', 'Dot'],
    props: {
      Legend: [['items', '{ label, tone }[]', '', 'Series to list.']],
      Dot: [['tone', "'blue' | 'green' | 'amber' | 'red' | 'violet'", "'blue'", 'Dot color.']],
    },
  },
  {
    slug: 'table',
    name: 'Directory table',
    group: 'Data display',
    description: 'Composable table parts for people, accounts and projects: a card shell, toolbar, header row, cells with captions and a footer.',
    imports: ['DirectoryCard', 'DirectoryToolbar', 'ToolbarTitle', 'DirectoryTable', 'Row', 'Cell', 'CellTitle', 'Caption', 'MoreButton', 'TableFooter'],
    props: {
      DirectoryTable: [
        ['headers', 'ReactNode[]', '', 'Column titles. Use "" for an actions column.'],
        ['minWidth', 'number', '760', 'Horizontal scroll kicks in below this width.'],
      ],
      Cell: [['className', 'string', '', 'Alignment etc. Cells are 60px tall with hairline dividers.']],
      CellTitle: [
        ['leading', 'ReactNode', '', 'Avatar or ClientMark before the text.'],
        ['title', 'ReactNode', '', 'Bold primary line.'],
        ['caption', 'ReactNode', '', 'Small grey second line.'],
      ],
      TableFooter: [
        ['children', 'ReactNode', '', 'Left side (result count).'],
        ['pagination', 'ReactNode', '', 'Right side, usually <Pagination>.'],
      ],
      MoreButton: [['label', 'string', "'More actions'", 'Accessible label for the "···" trigger.']],
    },
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    group: 'Data display',
    description: 'Previous/next buttons and a rows-per-page select for table footers.',
    imports: ['Pagination', 'PageSizeSelect'],
    props: {
      Pagination: [
        ['onPrev', '() => void', '', 'Previous handler. When omitted, the button is disabled.'],
        ['onNext', '() => void', '', 'Next handler.'],
        ['disabledPrev', 'boolean', '!onPrev', 'Force the previous state.'],
        ['disabledNext', 'boolean', 'false', 'Disable next on the last page.'],
      ],
      PageSizeSelect: [
        ['value', 'number', '', 'Current page size.'],
        ['onChange', '(n: number) => void', '', 'Called with the new size.'],
        ['options', 'number[]', '[10, 20, 50]', 'Choices.'],
      ],
    },
  },

  // ── Forms ──
  {
    slug: 'form',
    name: 'Inputs & Field',
    group: 'Forms',
    description: 'Text input, textarea and select share one 35px control style with a soft blue focus ring. Field adds the label and an optional hint or error.',
    imports: ['Field', 'TextInput', 'TextArea', 'SelectInput'],
    props: {
      Field: [
        ['label', 'ReactNode', '', 'Label text.'],
        ['id', 'string', '', 'Links the label to the control — pass the same id to the input.'],
        ['hint', 'ReactNode', '', 'Helper text under the control.'],
        ['error', 'ReactNode', '', 'Error text (replaces the hint, shown in red).'],
      ],
      'TextInput / TextArea': [
        ['invalid', 'boolean', 'false', 'Red border + aria-invalid.'],
        ['...props', 'InputHTMLAttributes', '', 'Forwarded to the native element; refs are forwarded.'],
      ],
      SelectInput: [['children', '<option>[]', '', 'Native options. All select props are forwarded.']],
    },
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    group: 'Forms',
    description: 'A custom-drawn checkbox with an indeterminate state for select-all, and CheckRow for labelled options.',
    imports: ['Checkbox', 'CheckRow'],
    props: {
      Checkbox: [
        ['indeterminate', 'boolean', 'false', 'Shows a dash — use when some, not all, rows are selected.'],
        ['...props', 'InputHTMLAttributes', '', 'checked, onChange, aria-label… Ref is forwarded.'],
      ],
      CheckRow: [
        ['children', 'ReactNode', '', 'Label.'],
        ['...props', 'InputHTMLAttributes', '', 'defaultChecked / checked / onChange.'],
      ],
    },
  },
  {
    slug: 'switch',
    name: 'Switch',
    group: 'Forms',
    description: 'A labelled on/off toggle for settings, with an optional description.',
    imports: ['Switch'],
    props: {
      Switch: [
        ['label', 'string', '', 'Bold label (also the accessible name).'],
        ['description', 'ReactNode', '', 'Small caption under the label.'],
        ['checked / onChange', 'boolean / handler', '', 'Controlled usage.'],
        ['defaultChecked', 'boolean', '', 'Uncontrolled usage.'],
      ],
    },
  },

  // ── Feedback ──
  {
    slug: 'alert',
    name: 'Alert',
    group: 'Feedback',
    description: 'Inline messages in four tones. Warnings and errors use role="alert".',
    imports: ['Alert'],
    props: {
      Alert: [
        ['tone', "'info' | 'success' | 'warning' | 'danger'", "'info'", 'Color + icon.'],
        ['title', 'ReactNode', '', 'Bold first line.'],
        ['children', 'ReactNode', '', 'Body text.'],
      ],
    },
  },
  {
    slug: 'toast',
    name: 'Toast',
    group: 'Feedback',
    description: 'A single global toast for lightweight confirmations. Wrap the app in ToastProvider, then call showToast() anywhere.',
    imports: ['ToastProvider', 'useToast'],
    props: {
      ToastProvider: [['duration', 'number', '1800', 'Milliseconds the toast stays visible.']],
      'useToast()': [['showToast', '(message: string) => void', '', 'Shows (or replaces) the toast.']],
    },
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    group: 'Feedback',
    description: 'Shimmering placeholder bars for loading states.',
    imports: ['Skeleton'],
    props: { Skeleton: [['width', 'string', "'w-full'", 'A Tailwind width class.']] },
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    group: 'Feedback',
    description: 'A CSS-only tooltip that appears above its child on hover and keyboard focus.',
    imports: ['Tooltip'],
    props: {
      Tooltip: [
        ['text', 'ReactNode', '', 'Tooltip content (max 190px wide).'],
        ['children', 'ReactNode', '', 'The focusable trigger.'],
      ],
    },
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    group: 'Feedback',
    description: 'A quiet answer when there is no data, with an optional call to action.',
    imports: ['EmptyState'],
    props: {
      EmptyState: [
        ['icon', 'IconName', "'document'", 'Glyph in the rounded tile.'],
        ['title', 'ReactNode', '', 'Bold line.'],
        ['description', 'ReactNode', '', 'Supporting copy.'],
        ['action', 'ReactNode', '', 'Optional button.'],
      ],
    },
  },

  // ── Overlays & navigation ──
  {
    slug: 'dialog',
    name: 'Dialog',
    group: 'Overlays & navigation',
    description: 'Modal dialog rendered into a portal. Closes on backdrop click or Escape, locks scroll and restores focus on close.',
    imports: ['Dialog'],
    props: {
      Dialog: [
        ['open', 'boolean', '', 'Visibility.'],
        ['onClose', '() => void', '', 'Called on Escape, backdrop click or the × button.'],
        ['title', 'string', '', 'Heading and accessible name.'],
        ['description', 'ReactNode', '', 'Caption under the title.'],
        ['footer', 'ReactNode', '', 'Right-aligned action buttons.'],
        ['width', 'number', '440', 'Max width in px.'],
      ],
    },
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    group: 'Overlays & navigation',
    description: 'Underlined tabs with arrow-key navigation. Uncontrolled by default, controllable when needed.',
    imports: ['Tabs'],
    props: {
      Tabs: [
        ['tabs', '{ id, label, content }[]', '', 'Tab definitions.'],
        ['defaultValue', 'string', 'tabs[0].id', 'Initially active tab (uncontrolled).'],
        ['value / onChange', 'string / (id) => void', '', 'Controlled usage.'],
      ],
    },
  },

  // ── Layout ──
  {
    slug: 'page',
    name: 'Page layout',
    group: 'Layout',
    description: 'PageWrap is the centered content column; PageHeading is the eyebrow, title, description and right-aligned actions at the top of every page.',
    imports: ['PageWrap', 'PageHeading'],
    props: {
      PageWrap: [['max', 'string', "'max-w-[1600px]'", 'Tailwind max-width class.']],
      PageHeading: [
        ['eyebrow', 'ReactNode', '', 'Small uppercase line above the title.'],
        ['title', 'ReactNode', '', 'The H1.'],
        ['description', 'ReactNode', '', 'One sentence under the title.'],
        ['children', 'ReactNode', '', 'Page actions (buttons). Full width on mobile.'],
      ],
    },
  },
  {
    slug: 'typography',
    name: 'Eyebrow & Divider',
    group: 'Layout',
    description: 'Small typographic helpers: section eyebrows, horizontal dividers and toolbar separators.',
    imports: ['Eyebrow', 'Divider', 'ToolbarDivider'],
    props: {
      Eyebrow: [['children', 'ReactNode', '', 'Uppercase label text.']],
      Divider: [['className', 'string', '', 'Override the 19px vertical margin.']],
      ToolbarDivider: [['className', 'string', '', 'Hidden on mobile.']],
    },
  },
];

export const BLOCKS = [
  {
    slug: 'app-shell',
    name: 'App shell',
    description: 'Sidebar + topbar frame with a mobile drawer, ⌘K search, theme toggle and a primary create action. Router-agnostic: pass your Link as `linkComponent`.',
    imports: ['AppShell', 'Sidebar', 'SidebarNav', 'SidebarStatus', 'Topbar', 'Brand'],
    props: {
      AppShell: [
        ['sidebar', 'SidebarProps', '', 'Forwarded to <Sidebar> (the drawer state is managed for you).'],
        ['topbar', 'TopbarProps', '', 'Forwarded to <Topbar>.'],
        ['fixed', 'boolean', 'false', 'Pin the frame to the viewport so a full-height child scrolls itself.'],
      ],
      Sidebar: [
        ['sections', '{ label, items: { href, label, icon?, count? }[] }[]', '', 'Navigation groups.'],
        ['activeHref', 'string', '', 'Current path; the matching item is highlighted.'],
        ['isActive', '(item) => boolean', 'href === activeHref', 'Custom matcher (e.g. prefix matching).'],
        ['linkComponent', 'ElementType', "'a'", 'Receives href, className, onClick, aria-current.'],
        ['brand / brandHref', 'ReactNode / string', '<Brand /> / "/"', 'Logo area.'],
        ['footer', 'ReactNode', '', 'Pinned to the bottom, e.g. <SidebarStatus>.'],
      ],
      Topbar: [
        ['section / title / icon', 'string', '', 'Breadcrumb.'],
        ['onSearch', '(query) => void', '', 'Shows the ⌘K search field; called on Enter.'],
        ['searchPlaceholder', 'string', "'Search'", 'Placeholder and accessible label.'],
        ['createLabel / onCreate', 'string / () => void', '', 'Primary create button.'],
        ['onNotifications', '() => void', '', 'Shows the bell button.'],
        ['showThemeToggle', 'boolean', 'true', 'Sun/moon toggle wired to ThemeProvider.'],
        ['actions', 'ReactNode', '', 'Extra controls before the create button.'],
      ],
    },
  },
  { slug: 'page-header', name: 'Page header', description: 'Page headings with action groups for dashboards, directories and reports.', imports: ['PageHeading', 'Button', 'Icon'] },
  { slug: 'stats', name: 'Stats', description: 'KPI rows built from MetricGrid.', imports: ['MetricGrid', 'MetricCard'] },
  {
    slug: 'charts',
    name: 'Charts',
    description: 'Dependency-free CSS charts: category bars, a monthly series and a share-of-total breakdown.',
    imports: ['HealthChart', 'BarChart', 'Breakdown', 'Legend'],
    props: {
      HealthChart: [
        ['data', '{ label, value, height, tone }[]', '', '`height` is 0–100 (% of the chart).'],
        ['legend', 'boolean', 'true', 'Show a legend under the bars.'],
      ],
      BarChart: [
        ['bars', '[label, heightPercent][]', '', 'One bar per period.'],
        ['tone', 'string', "'blue'", 'Bar gradient.'],
      ],
      Breakdown: [['items', '{ label, amount, share, tone }[]', '', '`share` is 0–100 and should total 100.']],
    },
  },
  {
    slug: 'dashboard-panels',
    name: 'Dashboard panels',
    description: 'The overview layout: wide + narrow panels combining charts, account lists, activity and workload.',
    imports: ['PanelGrid', 'Panel', 'HealthChart', 'AccountItem', 'ActivityList', 'ProgressList', 'PanelLink'],
  },
  {
    slug: 'data-table',
    name: 'Data table',
    description: 'The primary surface: a selectable, sticky-header client table with a bulk-action toolbar and a paginated footer.',
    imports: ['ClientsTable', 'SelectionToolbar', 'useSelection', 'TableFooter', 'PageSizeSelect', 'Pagination'],
    props: {
      ClientsTable: [
        ['rows', 'ClientRow[]', '', '{ id, name, domain, mark, status, tag, avatars, projects, tasks, billing }.'],
        ['selected', 'Set<id>', '', 'Selected ids (from useSelection).'],
        ['onToggle', '(id, checked) => void', '', 'Row checkbox.'],
        ['onToggleAll', '(ids, checked) => void', '', 'Header checkbox — receives the visible ids.'],
        ['onSort', '(key) => void', '', 'Sortable header clicked.'],
        ['onRowAction', '(row) => void', '', '"···" clicked.'],
      ],
      SelectionToolbar: [
        ['actions', '{ label, icon?, danger?, onClick }[]', '[]', 'Bulk actions (left) with the selection count.'],
        ['tools', '{ label, icon?, badge?, iconOnly?, onClick }[]', '[]', 'View tools (right).'],
        ['selectedCount', 'number', '0', 'Shows “N selected”.'],
        ['emptyLabel', 'string', "'Select rows'", 'Shown when nothing is selected.'],
      ],
    },
  },
  { slug: 'directory-table', name: 'Directory tables', description: 'Contacts, accounts and projects tables built from the directory table parts.', imports: ['DirectoryCard', 'DirectoryToolbar', 'DirectoryTable', 'Row', 'Cell', 'CellTitle'] },
  {
    slug: 'project-cards',
    name: 'Project cards',
    description: 'Compact progress surfaces for work in motion.',
    imports: ['ProjectCard', 'ProjectGrid'],
    props: {
      ProjectCard: [
        ['name', 'string', '', 'Project title.'],
        ['client', 'string', '', 'Caption line.'],
        ['status', '[label, badgeVariant]', '', 'Top-right badge.'],
        ['progress', 'number', '', '0–100.'],
        ['tone', "'blue' | 'green' | 'amber' | 'violet' | 'red'", "'blue'", 'Bar color.'],
        ['due', 'string', '', 'Bottom-right caption.'],
        ['people', 'AvatarProps[]', '[]', 'Team stack.'],
      ],
    },
  },
  {
    slug: 'lists',
    name: 'Lists & feeds',
    description: 'Account rows, status lists and an activity timeline for side panels.',
    imports: ['AccountItem', 'StatusList', 'ActivityList'],
    props: {
      AccountItem: [
        ['name', 'string', '', 'Title; its first letter becomes the monogram.'],
        ['mark', 'ClientMark tone', "'sky'", 'Monogram color.'],
        ['meta', 'ReactNode', '', 'Caption line.'],
        ['badge', '[label, variant]', '', 'Optional status.'],
        ['value', 'ReactNode', '', 'Right-aligned figure.'],
      ],
      StatusList: [['items', '{ name, meta, badge? }[]', '', 'Rows.']],
      ActivityList: [['items', '{ icon, who, text, time }[]', '', 'Events, newest first.']],
    },
  },
  { slug: 'forms', name: 'Forms & settings', description: 'Form layouts for creating records and managing preferences.', imports: ['Field', 'TextInput', 'SelectInput', 'TextArea', 'Switch', 'CheckRow'] },
  { slug: 'dialogs', name: 'Dialogs', description: 'Common modal flows: share, confirm a destructive action, quick create.', imports: ['Dialog'] },
  { slug: 'empty-states', name: 'Empty & loading states', description: 'What a panel shows before data arrives, or when there is none.', imports: ['EmptyState', 'Skeleton'] },
];

export const COMPONENT_GROUPS = [...new Set(COMPONENTS.map((c) => c.group))];
