# @compass/ui

Quiet, dense React + Tailwind components for client-operations dashboards.

## Install

```bash
pnpm add @compass/ui     # peer deps: react >= 18, react-dom >= 18
```

### With Tailwind 3 (recommended)

```js
// tailwind.config.js
import compass from '@compass/ui/tailwind-preset';

export default {
  presets: [compass],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@compass/ui/dist/**/*.js'],
};
```

```css
/* src/index.css */
@import '@compass/ui/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Without Tailwind

```js
import '@compass/ui/styles.css'; // tokens + preflight + every utility the components use
```

Load Inter (UI) and DM Mono (numerics), e.g. from Google Fonts.

## Use

```jsx
import { ThemeProvider, ToastProvider, PageWrap, PageHeading, Button, Icon, MetricGrid } from '@compass/ui';

<ToastProvider>
  <ThemeProvider>
    <PageWrap>
      <PageHeading eyebrow="Workspace" title="Overview">
        <Button variant="primary"><Icon name="download" size="sm" /> Export</Button>
      </PageHeading>
      <MetricGrid items={[{ label: 'Active clients', value: '24', meta: [{ text: '↗ 8.3%', trend: 'up' }] }]} />
    </PageWrap>
  </ThemeProvider>
</ToastProvider>
```

The library is router-agnostic: `Button`, `Card` and `PanelLink` take `as={Link}`, and `Sidebar` /
`AppShell` take a `linkComponent` that receives `href`.

## Theming

Semantic colors (`bg-surface`, `text-ink`, `border-line`, `bg-blue`…) map to CSS variables. Set
`<html data-theme="dark">` (ThemeProvider does it for you) and everything re-themes. Override any
`--token` after importing `tokens.css` to rebrand.

## Exports

**Components** — Button, Badge, Avatar, AvatarStack, ClientMark, Icon, Checkbox, CheckRow, Switch,
Field, TextInput, TextArea, SelectInput, Card, Panel, PanelGrid, PanelSelect, MetricCard, MetricGrid,
ProgressBar, ProgressRow, ProgressList, Legend, Dot, Alert, Skeleton, Tooltip, Kbd, EmptyState,
Eyebrow, Divider, ToolbarDivider, Dropdown, Tabs, Dialog, DirectoryCard, DirectoryToolbar,
ToolbarTitle, DirectoryTable, Row, Cell, CellTitle, Caption, MoreButton, TableFooter, Pagination,
PageSizeSelect, PageWrap, PageHeading

**Blocks** — AppShell, Sidebar, SidebarNav, SidebarStatus, Topbar, Brand, BrandMark, ClientsTable,
SelectionToolbar, ProjectCard, ProjectGrid, HealthChart, BarChart, Breakdown, ActivityList,
AccountItem, StatusList, PanelLink

**Theme & hooks** — ThemeProvider, useTheme, themeScript, ToastProvider, useToast, useSelection,
useHotkey, useDismiss

Original Compass names `WorkloadRow` and `RenewalItem` remain as aliases of `ProgressRow` and
`AccountItem`.
