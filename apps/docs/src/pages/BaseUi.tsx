import { Link } from 'react-router-dom';
import { Alert } from '@mah-works/larch';
import { C, CodeBlock, md } from '../docs/CodeBlock.js';
import { DocHeader, Prose } from '../docs/Prose.js';

const Code = ({ children }: { children: string }) => <CodeBlock className="my-4" code={children} />;

/** Plain bordered table for reference lists on this page. */
function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-[10px] border border-line bg-surface">
      <table className="w-full min-w-[620px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-head text-[11px] text-label">
            {head.map((h) => (
              <th key={h} className="h-9 border-b border-line px-[14px] font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="align-top [&:last-child>td]:border-b-0">
              {row.map((cell, i) => (
                <td key={i} className={`border-b border-line px-[14px] py-[10px] leading-relaxed ${i === 0 ? 'whitespace-nowrap font-mono text-[11.5px] text-strong' : 'text-body'}`}>
                  {md(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CONVENTIONS = [
  ['Focus', '`focus-visible:` 2px blue outline, 2px offset, on every interactive part (`FOCUS_RING`).'],
  ['Disabled', '`data-disabled` → 50% opacity, no pointer events. Controls use 60% and a not-allowed cursor.'],
  ['Hover / highlight', 'Soft grey `bg-hover` + `text-ink`; list items use Base UI’s `data-highlighted`, triggers `data-popup-open`.'],
  ['Selected', '`data-checked`, `data-pressed` and `data-active` switch to Larch blue (`bg-blue`, `bg-blue-soft`).'],
  ['Invalid', 'Field’s `data-invalid` (or `aria-invalid`) → red border and a red focus ring.'],
  ['Popups', '8px radius, hairline border, `shadow-pop`; scale + fade from `--transform-origin` on `data-starting-style` / `data-ending-style`.'],
  ['Modals', '`rgba(16,21,29,.52)` backdrop, 10px radius, `shadow-dialog`, 19px padding.'],
  ['Controls', '35px tall, 6px radius, `border-line-strong`, blue border + 3px `--blue-soft` ring on focus.'],
  ['Motion', '150 ms ease-out for popups, 200 ms for dialogs and panels; `data-instant` disables it.'],
];

const MIGRATION = [
  ['<Button as={Link} to="/x">', '<Button render={<Link to="/x" />} nativeButton={false}>'],
  ['<Dialog open onClose title description footer>', 'Dialog.Root / Trigger / Portal / Backdrop / Popup / Title / Description / Close'],
  ['<Dropdown label items />', 'Menu.Root / Trigger / Portal / Positioner / Popup / Item (RadioItem, CheckboxItem…)'],
  ['<Tabs tabs value onChange />', 'Tabs.Root / List / Tab / Indicator / Panel — `onValueChange`'],
  ['<Tooltip text>', 'Tooltip.Root / Trigger / Portal / Positioner / Popup / Arrow'],
  ['<Checkbox onChange indeterminate />', '<Checkbox.Root onCheckedChange indeterminate><Checkbox.Indicator /></Checkbox.Root>'],
  ['<CheckRow>', '<label><Checkbox.Root>…</Checkbox.Root>Text</label>'],
  ['<Switch label description />', 'Field.Root + Field.Label + Field.Description + Switch.Root / Thumb'],
  ['<Field label id hint error>', 'Field.Root / Label / Control / Description / Error — no ids needed'],
  ['<TextInput invalid />', '<Input /> inside a Field (or `aria-invalid`)'],
  ['<SelectInput><option/></SelectInput>', 'Select.Root / Trigger / Value / Icon / Portal / Positioner / Popup / List / Item'],
  ['<ProgressBar percent tone />', '<Progress.Root value><Progress.Track><Progress.Indicator tone /></Progress.Track></Progress.Root>'],
  ['<Avatar initials tone size more />', '<Avatar.Root tone size><Avatar.Fallback>JD</Avatar.Fallback></Avatar.Root> — `more` → `tone="muted"`'],
  ['<Divider /> · <ToolbarDivider />', '<Separator className="my-[19px]" /> · <Separator orientation="vertical" … />'],
  ['<ToastProvider> + useToast().showToast(msg)', '<Toast.Provider> + <Toaster /> + Toast.useToastManager().add({ title })'],
];

export default function BaseUi() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader
        eyebrow="Getting started"
        title="Base UI & styling"
        description="Larch is Base UI with Larch’s visual language applied. Base UI owns the API and behaviour; Larch owns the look."
      />
      <Prose>
        <h2>How Larch relates to Base UI</h2>
        <p>
          Every component in Base UI’s catalog is exported under the same name with the same parts. For each part that renders an
          element, Larch substitutes a thin wrapper that adds default classes and passes everything else — props, ref,{' '}
          <C>render</C>, <C>className</C> and <C>style</C> functions — straight through. Parts that render nothing of their own
          (<C>Root</C> on popups, <C>Portal</C>, <C>Provider</C>, <C>Handle</C>) and helpers (<C>createHandle</C>,{' '}
          <C>useToastManager</C>, <C>useFilter</C>…) <em>are</em> Base UI’s objects. Behaviour, keyboard handling, focus
          management and accessibility are untouched, so Base UI’s docs apply line for line.
        </p>

        <h2>Importing</h2>
      </Prose>
      <Code>{`// Mirrors @base-ui/react/<component>
import { Dialog } from '@mah-works/larch/dialog';

// Or from the root, next to Larch's own components
import { Dialog, Badge, PageHeading } from '@mah-works/larch';

// Need a part without Larch styles? It's still Base UI.
import { Dialog as UnstyledDialog } from '@base-ui/react/dialog';
import { mergeProps, useRender } from '@base-ui/react';`}</Code>
      <Prose>
        <p>
          Base UI is a peer dependency, so both import paths share one copy of Base UI and its React contexts — you can mix styled
          and unstyled parts inside the same Root.
        </p>

        <h2>Overriding styles</h2>
        <p>
          A part’s <C>className</C> is merged after Larch’s defaults with <C>tailwind-merge</C>, so a conflicting utility always
          wins — <C>{'<Dialog.Popup className="w-[560px]">'}</C> replaces the default width instead of fighting it. Base UI’s{' '}
          <C>{'className={(state) => …}'}</C> form works too, and you can style any state through Base UI’s data attributes and CSS
          variables:
        </p>
      </Prose>
      <Code>{`<Menu.Item className="data-highlighted:bg-red-soft data-highlighted:text-red">Delete</Menu.Item>

<Select.Popup className={(state) => (state.side === 'top' ? 'origin-bottom' : 'origin-top')} />

<Accordion.Panel className="h-(--accordion-panel-height)" />`}</Code>
      <Alert tone="info" title="Variant-scoped defaults">
        A few placement defaults are keyed to a Base UI attribute — Drawer’s to <C>data-swipe-direction</C>, and a Dialog.Viewport
        resets its child with <C>*:</C>. Override those with the same variant (e.g.{' '}
        <C>data-[swipe-direction=left]:w-[244px]</C>) or Tailwind’s <C>!</C> suffix.
      </Alert>

      <Prose>
        <h2>What Larch adds</h2>
        <p>Larch adds visual props only. They are read by the wrapper and never reach Base UI or the DOM.</p>
        <ul>
          <li>
            <strong>
              <C>variant</C>
            </strong>{' '}
            on <Link to="/components/button">Button</Link> and on every trigger / close part that renders a button (Dialog,
            AlertDialog, Drawer, Popover, Menu, Tooltip, Toolbar, NavigationMenu). Values: <C>outline</C>, <C>ghost</C>,{' '}
            <C>ghostDanger</C>, <C>primary</C>, <C>danger</C>, <C>create</C>, <C>icon</C>, <C>iconSm</C> and <C>unstyled</C>. So
            instead of nesting a Button in a trigger, write <C>{'<Dialog.Trigger variant="primary">'}</C>.
          </li>
          <li>
            <strong>
              <C>tone</C> / <C>size</C>
            </strong>{' '}
            on Avatar.Root, and <C>tone</C> on Progress, Meter and Slider indicators.
          </li>
          <li>
            <strong>Default glyphs</strong> for icon-only parts left empty: Select.Icon, item indicators, Combobox / Autocomplete
            trigger and clear, NumberField steppers, Popover / Toast close, NavigationMenu.Icon. An empty Checkbox.Indicator draws
            the check in CSS.
          </li>
        </ul>
        <p>
          Every component page lists the parts Larch styles, the parts it passes through, and these additions; the rest of its
          API is linked to Base UI’s reference.
        </p>

        <h2>Design conventions</h2>
        <p>
          Shared looks live in one module (<C>packages/ui/src/base-ui/classes.js</C>) and are built only from Larch’s{' '}
          <Link to="/docs/tokens">design tokens</Link>, so Base UI parts and Larch’s own components match in both themes.
        </p>
      </Prose>
      <Table head={['State', 'Larch treatment']} rows={CONVENTIONS} />

      <Prose>
        <h2>Differences and gaps</h2>
        <ul>
          <li>
            <strong>Larch-only components.</strong> Base UI has no badge, card, table, alert, skeleton, empty state, icon or page
            layout, so those stay Larch components with their own APIs (see “Larch components” in the sidebar), alongside the
            blocks.
          </li>
          <li>
            <strong>TextArea</strong> is a Larch extension: Base UI’s Input rendered as a <C>{'<textarea>'}</C>. Base UI has no
            textarea component.
          </li>
          <li>
            <strong>Toaster</strong>, <strong>AvatarStack</strong>, <strong>ProgressRow</strong> and the selects inside{' '}
            <C>PanelSelect</C> / <C>PageSizeSelect</C> are Larch compositions of Base UI parts, not Base UI components.
          </li>
          <li>
            <strong>Form</strong> is re-exported unchanged — it renders a plain <C>{'<form>'}</C> with nothing to style.
          </li>
          <li>
            <strong>Utilities</strong> (<C>mergeProps</C>, <C>useRender</C>, <C>DirectionProvider</C>, <C>CSPProvider</C>) are
            not re-exported; import them from <C>@base-ui/react</C>.
          </li>
          <li>
            <strong>TypeScript namespaces.</strong> Larch ships types, and every part keeps Base UI’s prop types plus Larch’s
            additions. But <C>Dialog</C> is a value, so Base UI’s type namespace (<C>Dialog.Root.Props</C>) doesn’t come with it:
            use <C>{'ComponentProps<typeof Dialog.Root>'}</C>, or import the namespace types from <C>@base-ui/react/dialog</C>.
          </li>
        </ul>

        <h2>Migrating from Larch 1.x</h2>
        <p>
          2.0 replaces Larch’s hand-rolled interactive components with Base UI. Larch-only components, blocks, tokens and the theme
          are unchanged apart from the internals noted.
        </p>
      </Prose>
      <Table head={['Larch 1.x', 'Larch 2.0 (Base UI)']} rows={MIGRATION} />
    </div>
  );
}
