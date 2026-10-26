// Single source of truth for the docs navigation, component pages and block pages.
// Example code lives in src/examples/{components,blocks}/<slug>/NN-name.tsx and is discovered by glob.
import type { ComponentType } from 'react';
import type { IconName } from '@mah-works/larch';

/** [prop, type, default, description] — one row of a props table. */
export type PropRow = [name: string, type: string, defaultValue: string, description: string];
export type PropTables = Record<string, PropRow[]>;

/** How an example's live preview is framed. */
export type ExampleLayout = 'center' | 'padded' | 'canvas' | 'full' | 'frame';

/** What an example file exports. */
export interface ExampleModule {
  default: ComponentType;
  title?: string;
  description?: string;
  layout?: ExampleLayout;
}

export interface Example {
  id: string;
  title?: string;
  description?: string;
  layout?: ExampleLayout;
  Component: ComponentType;
  source: string;
}

export interface Guide {
  slug: string;
  label: string;
  icon: IconName;
}

export interface ComponentEntry {
  slug: string;
  name: string;
  group: string;
  description: string;
  imports: string[];
  /** Props of a Larch component. */
  props?: PropTables;
  /** Base UI components only: the export name, e.g. `Dialog`. */
  base?: string;
  /** Base UI components only: the slug of the matching page on base-ui.com. */
  baseUi?: string;
  /** Base UI components only: what Larch adds on top of Base UI. */
  additions?: PropTables;
}

export interface BlockEntry {
  slug: string;
  name: string;
  description: string;
  imports: string[];
  props?: PropTables;
}

export type EntryKind = 'components' | 'blocks';

const modules = import.meta.glob<ExampleModule>('../examples/**/*.tsx', { eager: true });
const sources = import.meta.glob<string>('../examples/**/*.tsx', { eager: true, query: '?raw', import: 'default' });

/** Examples for one component/block page, ordered by their NN- filename prefix. */
export function examplesFor(kind: EntryKind, slug: string): Example[] {
  const prefix = `../examples/${kind}/${slug}/`;
  return Object.keys(modules)
    .filter((path) => path.startsWith(prefix))
    .sort()
    .map((path) => {
      const mod = modules[path];
      const file = path.slice(prefix.length).replace(/\.tsx$/, '');
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

export const GUIDES: Guide[] = [
  { slug: '', label: 'Introduction', icon: 'overview' },
  { slug: 'installation', label: 'Installation', icon: 'download' },
  { slug: 'base-ui', label: 'Base UI & styling', icon: 'window' },
  { slug: 'theming', label: 'Theming & dark mode', icon: 'moon' },
  { slug: 'tokens', label: 'Design tokens', icon: 'tag' },
  { slug: 'hooks', label: 'Hooks', icon: 'settings' },
];


// Base UI's catalog, one page per component, in Base UI's order. `base` is the export name (a namespace or
// a single component); `baseUi` is the slug of the matching page on base-ui.com. `additions` documents only
// what Larch adds on top of Base UI — every other prop is Base UI's own.
type BaseUiEntry = Pick<ComponentEntry, 'slug' | 'name' | 'description' | 'additions'> & { base: string; also?: string[] };

const fromBaseUi = (entries: BaseUiEntry[]): ComponentEntry[] =>
  entries.map(({ also, ...entry }) => ({
    ...entry,
    group: 'Components',
    baseUi: entry.slug,
    imports: [entry.base, ...(also ?? [])],
  }));

const BASE_UI = fromBaseUi([
  {
    slug: 'accordion', name: 'Accordion', base: 'Accordion',
    description: 'Collapsible sections with hairline dividers and a CSS chevron on each trigger.',
  },
  {
    slug: 'alert-dialog', name: 'Alert Dialog', base: 'AlertDialog',
    description: 'A dialog that requires a response. Shares every Dialog style.',
    additions: { 'AlertDialog.Trigger · AlertDialog.Close': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'outline'", 'Larch Button look for this part.']] },
  },
  {
    slug: 'autocomplete', name: 'Autocomplete', base: 'Autocomplete',
    description: 'A text input with suggestions; the value is the free text. Shares Combobox’s styles.',
    additions: { 'Autocomplete.Trigger': [['children', 'ReactNode', '<Icon name="chevronDown" />', 'Rendered when you pass no children.']], 'Autocomplete.Clear': [['children', 'ReactNode', '<Icon name="close" />', 'Rendered when you pass no children.']] },
  },
  {
    slug: 'avatar', name: 'Avatar', base: 'Avatar',
    description: 'Gradient initials avatars with an optional image. AvatarStack is a Larch helper that overlaps several.',
    additions: {
      'Avatar.Root': [
        ['tone', "'blue' | 'coral' | 'green' | 'sand' | 'purple' | 'muted'", "'blue'", 'Gradient (or the neutral `muted` look for “+N”).'],
        ['size', "'sm' | 'md' | 'lg'", "'sm'", '25px · 30px · 35px.'],
      ],
      'AvatarStack (Larch)': [
        ['avatars', '{ initials, tone?, size?, src? }[]', '[]', 'Avatars to overlap, left to right.'],
        ['className', 'string', '', 'Extra classes on the flex wrapper.'],
      ],
    },
  },
  {
    slug: 'button', name: 'Button', base: 'Button',
    description: 'Base UI’s Button with Larch’s variants. Ghost controls keep attention on the data; primary is for the one thing a page wants you to do.',
    additions: { Button: [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'outline'", 'Larch Button look for this part.']] },
  },
  {
    slug: 'checkbox', name: 'Checkbox', base: 'Checkbox',
    description: 'A 15px box that fills blue. An empty Indicator draws the check or the indeterminate dash.',
    additions: { 'Checkbox.Indicator': [['children', 'ReactNode', 'CSS check / dash', 'Pass an icon to replace the drawn glyph.']] },
  },
  {
    slug: 'checkbox-group', name: 'Checkbox Group', base: 'CheckboxGroup', also: ['Checkbox'],
    description: 'Shared state for a list of checkboxes, including a parent “select all” checkbox.',
  },
  {
    slug: 'collapsible', name: 'Collapsible', base: 'Collapsible',
    description: 'A single disclosure with an animated panel.',
  },
  {
    slug: 'combobox', name: 'Combobox', base: 'Combobox',
    description: 'An input that filters a list and selects one or many values. Multiple values render as Larch pills.',
    additions: {
      'Combobox.Trigger': [['children', 'ReactNode', '<Icon name="chevronDown" />', 'Rendered when you pass no children.']],
      'Combobox.Clear · Combobox.ChipRemove': [['children', 'ReactNode', '<Icon name="close" />', 'Rendered when you pass no children.']],
      'Combobox.ItemIndicator': [['children', 'ReactNode', '<Icon name="check" />', 'Rendered when you pass no children.']],
    },
  },
  {
    slug: 'context-menu', name: 'Context Menu', base: 'ContextMenu',
    description: 'A menu opened by right-click or long-press. Shares every Menu style.',
    additions: { 'ContextMenu.CheckboxItemIndicator': [['children', 'ReactNode', '<Icon name="check" />', 'Rendered when you pass no children.']] },
  },
  {
    slug: 'dialog', name: 'Dialog', base: 'Dialog',
    description: 'A modal window. Centred on its own, or laid out by Dialog.Viewport when you include it.',
    additions: { 'Dialog.Trigger · Dialog.Close': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'outline'", 'Larch Button look for this part.']] },
  },
  {
    slug: 'drawer', name: 'Drawer', base: 'Drawer',
    description: 'A sheet that slides in from an edge and can be swiped away. Placement follows `swipeDirection` on the Root.',
    additions: { 'Drawer.Trigger · Drawer.Close': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'outline'", 'Larch Button look for this part.']] },
  },
  {
    slug: 'field', name: 'Field', base: 'Field',
    description: 'Label, control, description and error wired together, with Larch’s 35px control and red invalid state.',
  },
  {
    slug: 'fieldset', name: 'Fieldset', base: 'Fieldset',
    description: 'Groups related fields under a legend in Larch’s eyebrow style.',
  },
  {
    slug: 'form', name: 'Form', base: 'Form', also: ['Field', 'Input'],
    description: 'Native form with Base UI validation and server errors. Larch re-exports it unchanged — a form has no look of its own.',
  },
  {
    slug: 'input', name: 'Input', base: 'Input', also: ['TextArea'],
    description: 'Text input with Larch’s 35px control style, plus a TextArea extension.',
    additions: {
      'TextArea (Larch)': [
        ['…Input props', 'Input.Props', '', 'Base UI Input rendered as `<textarea>` — Base UI has no textarea of its own.'],
      ],
    },
  },
  {
    slug: 'menu', name: 'Menu', base: 'Menu',
    description: 'A list of actions in a popup, with checkbox and radio items, groups and submenus.',
    additions: {
      'Menu.Trigger': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'outline'", 'Larch Button look for this part.']],
      'Menu.CheckboxItemIndicator': [['children', 'ReactNode', '<Icon name="check" />', 'Rendered when you pass no children.']],
      'Menu.Clear': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'iconSm'", 'Larch Button look for this part.'], ['children', 'ReactNode', '<Icon name="close" />', 'Rendered when you pass no children.']],
    },
  },
  {
    slug: 'menubar', name: 'Menubar', base: 'Menubar', also: ['Menu'],
    description: 'A bar of menus with arrow-key navigation between them.',
  },
  {
    slug: 'meter', name: 'Meter', base: 'Meter',
    description: 'A static measurement within a range, on Larch’s 7px track.',
    additions: { 'Meter.Indicator': [['tone', "'blue' | 'green' | 'amber' | 'violet' | 'red'", "'blue'", 'Fill color.']] },
  },
  {
    slug: 'navigation-menu', name: 'Navigation Menu', base: 'NavigationMenu',
    description: 'Site navigation whose popup morphs between panels.',
    additions: { 'NavigationMenu.Trigger': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'ghost'", 'Larch Button look for this part.']], 'NavigationMenu.Icon': [['children', 'ReactNode', '<Icon name="chevronDown" />', 'Rendered when you pass no children.']] },
  },
  {
    slug: 'number-field', name: 'Number Field', base: 'NumberField',
    description: 'A numeric input with steppers and scrubbing.',
    additions: { 'NumberField.Decrement · NumberField.Increment': [['children', 'ReactNode', '<Icon name="minus" /> · <Icon name="plus" />', 'Rendered when you pass no children.']] },
  },
  {
    slug: 'otp-field', name: 'OTP Field', base: 'OTPField',
    description: 'One square control per character of a one-time code.',
  },
  {
    slug: 'popover', name: 'Popover', base: 'Popover',
    description: 'A floating panel anchored to its trigger.',
    additions: { 'Popover.Trigger': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'outline'", 'Larch Button look for this part.']], 'Popover.Close': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'iconSm'", 'Larch Button look for this part.'], ['children', 'ReactNode', '<Icon name="close" />', 'Rendered when you pass no children.']] },
  },
  {
    slug: 'preview-card', name: 'Preview Card', base: 'PreviewCard',
    description: 'A hover card that previews a link’s destination.',
  },
  {
    slug: 'progress', name: 'Progress', base: 'Progress',
    description: 'Task progress on Larch’s 7px track, determinate or indeterminate.',
    additions: { 'Progress.Indicator': [['tone', "'blue' | 'green' | 'amber' | 'violet' | 'red'", "'blue'", 'Fill color.']] },
  },
  {
    slug: 'radio-group', name: 'Radio Group', base: 'RadioGroup', also: ['Radio'],
    description: 'A set of radio buttons where one can be selected.',
  },
  {
    slug: 'scroll-area', name: 'Scroll Area', base: 'ScrollArea',
    description: 'Native scrolling with thin overlay scrollbars.',
  },
  {
    slug: 'select', name: 'Select', base: 'Select',
    description: 'Choose one value from a popup list, with Larch’s 35px trigger.',
    additions: {
      'Select.Icon': [['children', 'ReactNode', '<Icon name="chevronDown" />', 'Rendered when you pass no children.']],
      'Select.ItemIndicator': [['children', 'ReactNode', '<Icon name="check" />', 'Rendered when you pass no children.']],
      'Select.ScrollUpArrow · Select.ScrollDownArrow': [['children', 'ReactNode', 'chevron glyphs', 'Rendered when you pass no children.']],
    },
  },
  {
    slug: 'separator', name: 'Separator', base: 'Separator',
    description: 'A hairline rule in either orientation. Replaces Larch 1’s Divider and ToolbarDivider.',
  },
  {
    slug: 'slider', name: 'Slider', base: 'Slider',
    description: 'Pick a value or a range by dragging along a track.',
    additions: { 'Slider.Indicator': [['tone', "'blue' | 'green' | 'amber' | 'violet' | 'red'", "'blue'", 'Fill color.']] },
  },
  {
    slug: 'switch', name: 'Switch', base: 'Switch',
    description: 'A 34×20 on/off toggle. Pair it with a Field for a labelled settings row.',
  },
  {
    slug: 'tabs', name: 'Tabs', base: 'Tabs',
    description: 'Underlined tabs; Tabs.Indicator slides the blue underline between them.',
  },
  {
    slug: 'toast', name: 'Toast', base: 'Toast',
    description: 'Stacked notifications. Wrap the app in Toast.Provider and render the Toaster block (or your own list).',
    additions: {
      'Toast.Close': [['children', 'ReactNode', '<Icon name="close" />', 'Rendered when you pass no children.']],
      'Toaster (Larch block)': [['—', '', '', 'Renders Toast.Portal → Toast.Viewport → one Toast.Root per toast from the surrounding Provider.']],
    },
  },
  {
    slug: 'toggle', name: 'Toggle', base: 'Toggle',
    description: 'A two-state button that turns soft blue when pressed.',
  },
  {
    slug: 'toggle-group', name: 'Toggle Group', base: 'ToggleGroup', also: ['Toggle'],
    description: 'A segmented control of Toggles.',
  },
  {
    slug: 'toolbar', name: 'Toolbar', base: 'Toolbar',
    description: 'A row of controls with one tab stop and arrow-key navigation.',
    additions: { 'Toolbar.Button': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'ghost'", 'Larch Button look for this part.']] },
  },
  {
    slug: 'tooltip', name: 'Tooltip', base: 'Tooltip',
    description: 'Larch’s small dark tooltip for supplementary hints.',
    additions: { 'Tooltip.Trigger': [['variant', "'outline' | 'ghost' | 'ghostDanger' | 'primary' | 'danger' | 'create' | 'icon' | 'iconSm' | 'unstyled'", "'unstyled'", 'Larch Button look for this part.']] },
  },
]);

// Larch's own components — no Base UI equivalent.
const LARCH: ComponentEntry[] = [
  {
    slug: 'badge',
    name: 'Badge',
    group: 'Larch components',
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
    slug: 'client-mark',
    name: 'ClientMark',
    group: 'Larch components',
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
    group: 'Larch components',
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
    group: 'Larch components',
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
    group: 'Larch components',
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
    slug: 'legend',
    name: 'Legend',
    group: 'Larch components',
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
    group: 'Larch components',
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
    group: 'Larch components',
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
  {
    slug: 'alert',
    name: 'Alert',
    group: 'Larch components',
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
    slug: 'skeleton',
    name: 'Skeleton',
    group: 'Larch components',
    description: 'Shimmering placeholder bars for loading states.',
    imports: ['Skeleton'],
    props: { Skeleton: [['width', 'string', "'w-full'", 'A Tailwind width class.']] },
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    group: 'Larch components',
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
  {
    slug: 'kbd',
    name: 'Kbd',
    group: 'Larch components',
    description: 'Keyboard key cap for shortcuts and hints.',
    imports: ['Kbd'],
    props: { Kbd: [['children', 'ReactNode', '', 'Key label, e.g. "⌘ K".']] },
  },
  {
    slug: 'page',
    name: 'Page layout',
    group: 'Larch components',
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
    slug: 'progress-row',
    name: 'ProgressRow',
    group: 'Larch components',
    description: 'A label ── bar ── value row for workload and pipeline breakdowns, built on Base UI Meter. ProgressList stacks them.',
    imports: ['ProgressRow', 'ProgressList'],
    props: {
      ProgressRow: [
        ['label', 'ReactNode', '', 'Left label (90px column) — the Meter.Label.'],
        ['value', 'ReactNode', '', 'Right-aligned text, also used as the aria-valuetext.'],
        ['percent', 'number', '', 'Bar fill, 0–100 (clamped).'],
        ['tone', "'blue' | 'green' | 'amber' | 'violet' | 'red'", "'blue'", 'Indicator tone.'],
      ],
      ProgressList: [['items', 'ProgressRowProps[]', '', 'Rows stacked with 17px gaps.']],
    },
  },
  {
    slug: 'eyebrow',
    name: 'Eyebrow',
    group: 'Larch components',
    description: 'Small uppercase label above groups of controls. (Rules and toolbar dividers are Base UI Separator.)',
    imports: ['Eyebrow'],
    props: { Eyebrow: [['children', 'ReactNode', '', 'Uppercase label text.']] },
  },
];

export const COMPONENTS = [...BASE_UI, ...LARCH];

export const BLOCKS: BlockEntry[] = [
  {
    slug: 'app-shell',
    name: 'App shell',
    description: 'Sidebar + topbar frame with a mobile drawer, ⌘K search, theme toggle and a primary create action. Router-agnostic: pass your Link as `linkComponent`.',
    imports: ['AppShell', 'Sidebar', 'SidebarNav', 'SidebarStatus', 'Topbar', 'TopbarRoot', 'TopbarTitle', 'TopbarSearch', 'TopbarThemeToggle', 'Brand'],
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
        ['Brand: name / suffix / mark', 'string / string / ReactNode', "'compass' / 'crm' / <BrandMark />", 'Wordmark text and logo for the default brand.'],
        ['footer', 'ReactNode', '', 'Pinned to the bottom, e.g. <SidebarStatus>.'],
        ['collapsed', 'boolean', 'false', 'Desktop icon rail (64px): labels become tooltips and screen-reader text. The mobile drawer always shows the full menu.'],
        ['collapsedBrand', 'ReactNode', '<BrandMark />', 'Logo shown while collapsed.'],
        ['onCollapsedChange', '(collapsed) => void', '', 'Shows a collapse / expand button at the bottom.'],
      ],
      Topbar: [
        ['section / title / icon', 'string', '', 'Breadcrumb.'],
        ['onSearch', '(query) => void', '', 'Shows the ⌘K search field; called on Enter.'],
        ['searchPlaceholder', 'string', "'Search'", 'Placeholder and accessible label.'],
        ['createLabel / onCreate', 'string / () => void', '', 'Primary create button.'],
        ['onNotifications', '() => void', '', 'Shows the bell button.'],
        ['showThemeToggle', 'boolean', 'true', 'Sun/moon toggle wired to ThemeProvider.'],
        ['actions', 'ReactNode', '', 'Extra controls before the create button.'],
        ['leading', 'ReactNode', '', 'Controls before the breadcrumb, e.g. a sidebar collapse toggle.'],
        ['tone', "'default' | 'dark'", "'default'", '`dark` keeps the bar dark in light mode (a dark theme scope), e.g. to mark an admin area.'],
        ['className', 'string', '', 'Merged onto the <header>.'],
      ],
      'Topbar parts': [
        ['TopbarRoot', '{ tone?, className?, children }', '', 'The bar itself (height, padding, border, background). Compose the parts inside it.'],
        ['TopbarMenuButton', '{ onClick, label? }', '', 'Opens the mobile drawer; only visible on phones.'],
        ['TopbarTitle', '{ section?, icon?, children }', '', 'Page title with an optional icon and breadcrumb section.'],
        ['TopbarSpacer', '', '', 'Pushes the following parts to the right.'],
        ['TopbarSearch', '{ onSearch, placeholder?, hotkey? }', "hotkey 'k'", 'Search field with a ⌘K hint; called on Enter.'],
        ['TopbarThemeToggle', '', '', 'Sun / moon button wired to ThemeProvider.'],
        ['TopbarCreateButton', '{ label, onClick? }', '', 'Primary create action; the label hides on phones.'],
      ],
    },
  },
  { slug: 'page-header', name: 'Page header', description: 'Page headings with action groups for dashboards, directories and reports.', imports: ['PageHeading', 'Button', 'Icon', 'Tabs'] },
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
  { slug: 'forms', name: 'Forms & settings', description: 'Form layouts for creating records and managing preferences, built from Form, Field, Select and Switch.', imports: ['Form', 'Field', 'Input', 'TextArea', 'Select', 'Checkbox', 'Fieldset', 'Switch'] },
  { slug: 'dialogs', name: 'Dialogs', description: 'Common modal flows: confirm a destructive action, quick create with a form.', imports: ['AlertDialog', 'Dialog', 'Form'] },
  { slug: 'empty-states', name: 'Empty & loading states', description: 'What a panel shows before data arrives, or when there is none.', imports: ['EmptyState', 'Skeleton'] },
];

export const COMPONENT_GROUPS = [...new Set(COMPONENTS.map((c) => c.group))];
