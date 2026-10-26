import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ActivityList,
  Alert,
  Avatar,
  Badge,
  BarChart,
  Button,
  Card,
  Cell,
  CellTitle,
  Checkbox,
  ClientsTable,
  Dialog,
  DirectoryTable,
  EmptyState,
  Eyebrow as Label,
  Field,
  HealthChart,
  Icon,
  Input,
  Kbd,
  Menu,
  MetricGrid,
  PageHeading,
  PageWrap,
  Pagination,
  Panel,
  PanelGrid,
  ProgressList,
  ProjectCard,
  ProjectGrid,
  Row,
  Select,
  SelectionToolbar,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  TextArea,
  Toast,
  Tooltip,
  useSelection,
} from '@mah-works/larch';
import { CLIENTS } from '../data/clients.js';
import { ACTIVITY, HEALTH, OVERVIEW_METRICS, PROJECT_CARDS, WORKLOAD } from '../data/workspace.js';

const SPAN = {
  4: 'col-span-4 tablet:col-span-12',
  6: 'col-span-6 tablet:col-span-12',
  8: 'col-span-8 tablet:col-span-12',
  12: 'col-span-12',
};

/** A titled specimen card in the 12-column showcase grid. */
function Spec({ span = 12, title, caption, children }: { span?: keyof typeof SPAN; title: string; caption: string; children?: ReactNode }) {
  return (
    <Card className={`min-w-0 p-[22px] mobile:p-[17px] ${SPAN[span]}`}>
      <h2 className="m-0 text-sm font-[650] tracking-[-.02em]">{title}</h2>
      <p className="mb-[19px] mt-[5px] text-[11px] text-[#989ca4] dark:text-[#7f8895]">{caption}</p>
      {children}
    </Card>
  );
}

const SWATCHES = [
  ['Canvas', '#f6f7f9'],
  ['Surface', '#ffffff'],
  ['Border', '#e7e9ed'],
  ['Ink', '#17191d'],
  ['Selection', '#1d5bff'],
  ['Positive', '#e5f7ed'],
  ['Destructive', '#ffeaec'],
];

const STATUS_BADGES = [['Active', 'active'], ['Trial', 'trial'], ['Onboarding', 'onboarding'], ['Inactive', 'inactive'], ['Archived', 'archived']] as const;
const TAG_BADGES = [['High Priority', 'priority'], ['Low Priority', 'low'], ['VIP', 'vip'], ['Long-term', 'longterm']] as const;

const PERMISSIONS = ['Anyone on the workspace', 'Only invited people', 'Only me'];

/** Field + Select with plain string options. */
function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <Field.Root>
      <Select.Root defaultValue={options[0]}>
        <Select.Label>{label}</Select.Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.List>
                {options.map((o) => (
                  <Select.Item key={o} value={o}>
                    <Select.ItemText>{o}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  );
}

function CheckboxRow({ children, defaultChecked }: { children: ReactNode; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-xs text-[#656b74] dark:text-muted [&+&]:mt-[10px]">
      <Checkbox.Root defaultChecked={defaultChecked}>
        <Checkbox.Indicator />
      </Checkbox.Root>
      {children}
    </label>
  );
}

const CUES = [
  ['Hover', 'Soft gray fill', 'border-line bg-[#fafbfc] text-[#545a63] dark:bg-[#1b2028] dark:text-[#c2c9d2]'],
  ['Selected', 'Blue accent', 'border-[#dce5ff] bg-[#f7f9ff] text-[#365dc1] dark:border-[#2c427b] dark:bg-[#172342] dark:text-[#8eafff]'],
  ['Danger', 'Red, not loud', 'border-[#ffdde0] bg-[#fff8f8] text-[#bf4a58] dark:border-[#51272d] dark:bg-[#26171a]'],
];

export default function DesignSystem() {
  const toastManager = Toast.useToastManager();
  const anatomy = useSelection([CLIENTS[0].id]);

  return (
    <PageWrap max="max-w-[1240px]">
      <PageHeading
        eyebrow="Reference / v1.0"
        title="Larch design system"
        description="Quiet, dense interface primitives for client operations."
      >
        <Button render={<Link to="/examples/crm/clients" />} nativeButton={false} variant="primary">
          Open dashboard <Icon name="arrowRight" size="sm" />
        </Button>
      </PageHeading>

      <div className="grid grid-cols-12 gap-4">
        <Spec span={8} title="Color tokens" caption="Neutrals carry the interface. Color is reserved for meaning.">
          <div className="flex flex-wrap gap-3">
            {SWATCHES.map(([name, color]) => (
              <div key={name} className="w-[76px]">
                <div className="mb-[7px] h-12 rounded-[7px] border border-black/5" style={{ background: color }} />
                <div className="text-[10px] text-[#747981] dark:text-[#858e9a]">{name}</div>
              </div>
            ))}
          </div>
          <Separator className="my-[19px]" />
          <h2 className="m-0 text-sm font-[650] tracking-[-.02em]">Actions</h2>
          <p className="mb-[19px] mt-[5px] text-[11px] text-[#989ca4]">Ghost controls keep attention on the data.</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary">
              <Icon name="plus" size="sm" />
              Primary action
            </Button>
            <Button>
              <Icon name="plus" size="sm" />
              Secondary
            </Button>
            <Button variant="danger">
              <Icon name="trash" size="sm" />
              Delete
            </Button>
            <Kbd>⌘ K</Kbd>
          </div>
        </Spec>

        <Spec span={4} title="Typography" caption="Inter · restrained hierarchy.">
          <div className="flex flex-col gap-[14px] divide-y divide-line [&>div]:pb-[14px] [&>div:last-child]:pb-0 [&>div+div]:pt-[14px]">
            {(
              [
                ['Heading', <strong key="h" className="text-lg tracking-[-.04em]">Clients overview</strong>],
                ['Body', <span key="b" className="text-[#555a63] dark:text-[#c2c9d2]">Keep teams aligned with clarity.</span>],
                ['Label', <Label key="l">Last contact</Label>],
                ['Numeric', <span key="n" className="font-mono text-xs text-[#555a63] dark:text-[#c2c9d2]">1,248.00</span>],
              ] as [string, ReactNode][]
            ).map(([name, sample]) => (
              <div key={name} className="flex items-start gap-[14px]">
                <span className="w-[83px] shrink-0 pt-1 text-[10px] text-[#a0a4ac] dark:text-[#858e9a]">{name}</span>
                {sample}
              </div>
            ))}
          </div>
        </Spec>

        <Spec span={6} title="Semantic badges" caption="Pills share one shape; hue communicates state or tag.">
          <div className="flex flex-wrap gap-2">
            {STATUS_BADGES.map(([l, v]) => (
              <Badge key={l} variant={v}>{l}</Badge>
            ))}
          </div>
          <Separator className="my-[19px]" />
          <div className="flex flex-wrap gap-2">
            {TAG_BADGES.map(([l, v]) => (
              <Badge key={l} variant={v}>{l}</Badge>
            ))}
          </div>
        </Spec>

        <Spec span={6} title="Controls & avatars" caption="Small functional objects for filters and people.">
          <div className="flex flex-wrap gap-2">
            {['Filter', 'Sort: recent'].map((l) => (
              <div key={l} className="flex h-[34px] min-w-[132px] items-center justify-between rounded-md border border-line-strong bg-surface px-[10px] text-xs text-[#747982] dark:text-soft">
                {l} <Icon name="chevronDown" size="xs" />
              </div>
            ))}
          </div>
          <div className="mt-[17px] flex items-center gap-[14px]">
            {([['JD', 'blue'], ['MC', 'coral'], ['AS', 'green'], ['+4', 'purple']] as const).map(([initials, tone]) => (
              <Avatar.Root key={initials} size="lg" tone={tone}>
                <Avatar.Fallback>{initials}</Avatar.Fallback>
              </Avatar.Root>
            ))}
            <span className="text-xs text-[#8c9199]">Contact stack</span>
          </div>
        </Spec>

        <Spec span={12} title="Table anatomy" caption="The primary surface: 54px rows, hairline dividers, aligned numbers.">
          <div className="overflow-hidden rounded-lg border border-line">
            <SelectionToolbar
              selectedCount={anatomy.count}
              actions={[
                { label: 'Assign', icon: 'copy' },
                { label: 'Tag', icon: 'tag' },
                { label: 'Export', icon: 'download' },
                { label: 'Delete', icon: 'trash', danger: true },
              ]}
              tools={[
                { label: 'Filter', badge: 2 },
                { label: 'Sort' },
                { label: 'Table' },
                { label: 'Settings', icon: 'settings', iconOnly: true },
              ]}
            />
            <ClientsTable
              rows={CLIENTS.slice(0, 1)}
              selected={anatomy.selected}
              onToggle={anatomy.toggle}
              onToggleAll={anatomy.toggleAll}
            />
          </div>
        </Spec>

        <Spec span={4} title="Empty state" caption="A quiet answer when there is no data.">
          <EmptyState title="No clients yet" description="Add your first client to get started." />
        </Spec>

        <Spec span={8} title="Interaction cues" caption="Lightweight feedback for a keyboard-first workspace.">
          <div className="grid grid-cols-3 gap-[13px] mobile:grid-cols-1">
            {CUES.map(([name, text, look]) => (
              <div key={name} className={`rounded-[7px] border p-[14px] ${look}`}>
                <Label>{name}</Label>
                <div className="mt-[10px] text-xs">{text}</div>
              </div>
            ))}
          </div>
        </Spec>

        <Spec span={12} title="Metrics & panels" caption="Reusable information surfaces for overview and reporting pages.">
          <MetricGrid items={OVERVIEW_METRICS} />
          <Separator className="my-[19px]" />
          <PanelGrid>
            <Panel title="Client health" subtitle="Portfolio sentiment across four weeks.">
              <HealthChart data={HEALTH} legend={false} />
            </Panel>
            <Panel title="Team workload" subtitle="Tasks by owner.">
              <ProgressList items={WORKLOAD.slice(0, 3)} />
            </Panel>
          </PanelGrid>
        </Spec>

        <Spec span={8} title="Charts & activity" caption="Quiet data visualization with a readable task trail.">
          <BarChart bars={[['May', 42], ['Jun', 58], ['Jul', 51], ['Aug', 74], ['Sep', 68], ['Oct', 88]]} />
        </Spec>
        <Spec span={4} title="Activity feed" caption="Recent events with a clear time cue.">
          <ActivityList items={ACTIVITY} />
        </Spec>

        <Spec span={12} title="Project cards" caption="Compact progress surfaces for work in motion.">
          <ProjectGrid>
            {PROJECT_CARDS.map((p) => (
              <ProjectCard key={p.name} {...p} />
            ))}
          </ProjectGrid>
        </Spec>

        <Spec span={12} title="Directory table" caption="The same quiet table language extends to contacts, accounts, and projects.">
          <div className="overflow-hidden rounded-lg border border-line">
            <div className="flex min-h-[58px] items-center justify-between gap-[14px] border-b border-line px-[18px]">
              <div className="flex items-center gap-[3px]">
                <Button variant="ghost"><Icon name="filter" size="sm" />Filter</Button>
                <Button variant="ghost"><Icon name="sort" size="sm" />Sort</Button>
              </div>
              <span className="text-[11px] text-[#969ba4]">142 contacts</span>
            </div>
            <DirectoryTable headers={['Contact', 'Company', 'Role', 'Status']}>
              <Row>
                <Cell>
                  <CellTitle leading={<Avatar.Root size="md" tone="blue"><Avatar.Fallback>JD</Avatar.Fallback></Avatar.Root>} title="Jamie Davis" caption="jamie@aperture.test" />
                </Cell>
                <Cell>Aperture Labs</Cell>
                <Cell>Head of Product</Cell>
                <Cell><Badge variant="active">Active</Badge></Cell>
              </Row>
              <Row>
                <Cell>
                  <CellTitle leading={<Avatar.Root size="md" tone="coral"><Avatar.Fallback>MC</Avatar.Fallback></Avatar.Root>} title="Maria Costa" caption="maria@parallax.studio" />
                </Cell>
                <Cell>Parallax Studio</Cell>
                <Cell>Founder</Cell>
                <Cell><Badge variant="vip">VIP</Badge></Cell>
              </Row>
            </DirectoryTable>
          </div>
        </Spec>

        <Spec span={12} title="Forms, menus & feedback" caption="Everyday dashboard primitives, shown with their useful states.">
          <div className="grid grid-cols-12 gap-[18px]">
            <div className="col-span-4 min-w-0 tablet:col-span-12">
              <Label>Form fields</Label>
              <div className="mt-[10px]">
                <Field.Root>
                  <Field.Label>Client name</Field.Label>
                  <Input placeholder="Search or enter a name" />
                </Field.Root>
                <SelectField label="Status" options={['Active', 'Trial', 'Onboarding']} />
                <Field.Root>
                  <Field.Label>Note</Field.Label>
                  <TextArea placeholder="Add a short note..." />
                </Field.Root>
              </div>
            </div>

            <div className="col-span-4 min-w-0 tablet:col-span-12">
              <Label>Menu &amp; alerts</Label>
              <div className="mb-[14px] mt-[10px]">
                <Menu.Root>
                  <Menu.Trigger>
                    More actions <Icon name="chevronDown" size="xs" />
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner sideOffset={6} align="start">
                      <Menu.Popup>
                        <Menu.Item onClick={() => toastManager.add({ title: 'Export view' })}>
                          <Icon name="download" size="xs" className="text-[#9197a0]" /> Export view
                        </Menu.Item>
                        <Menu.Item onClick={() => toastManager.add({ title: 'Duplicate view' })}>
                          <Icon name="copy" size="xs" className="text-[#9197a0]" /> Duplicate view
                        </Menu.Item>
                        <Menu.Item className="text-red data-highlighted:text-red" onClick={() => toastManager.add({ title: 'Delete view' })}>
                          <Icon name="trash" size="xs" /> Delete view
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </div>
              <Alert tone="info" title="Heads up">Two clients have not been contacted this week.</Alert>
              <Alert tone="success" title="Saved">Your view is ready to share.</Alert>
              <Alert tone="warning" title="Review needed">One renewal is at risk.</Alert>
              <Alert tone="danger" title="Could not sync">Try again in a moment.</Alert>
            </div>

            <div className="col-span-4 min-w-0 tablet:col-span-12">
              <Label>Selection &amp; states</Label>
              <div className="mt-[10px]">
                <Field.Root className="min-h-9 flex-row items-center justify-between gap-[14px]">
                  <div>
                    <Field.Label className="text-xs text-ink">Email notifications</Field.Label>
                    <Field.Description className="mt-[2px]">Get weekly workspace summaries.</Field.Description>
                  </div>
                  <Switch.Root defaultChecked>
                    <Switch.Thumb />
                  </Switch.Root>
                </Field.Root>
                <Separator className="my-[19px]" />
                <CheckboxRow defaultChecked>Include archived clients</CheckboxRow>
                <CheckboxRow>Only overdue tasks</CheckboxRow>
                <Separator className="my-[19px]" />
                <Tooltip.Root>
                  <Tooltip.Trigger variant="outline">
                    <Icon name="keyboard" size="sm" />
                    Hover for help
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner sideOffset={8}>
                      <Tooltip.Popup>
                        <Tooltip.Arrow />
                        Use ⌘ K to focus search
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <div className="mt-4 flex flex-col gap-[10px]">
                  <Skeleton />
                  <Skeleton width="w-[74%]" />
                  <Skeleton width="w-[55%]" />
                </div>
              </div>
            </div>

            <div className="col-span-8 min-w-0 tablet:col-span-12">
              <Label>Tabs</Label>
              <div className="mt-[10px]">
                <Tabs.Root defaultValue="overview">
                  <Tabs.List>
                    <Tabs.Tab value="overview">Overview</Tabs.Tab>
                    <Tabs.Tab value="activity">Activity</Tabs.Tab>
                    <Tabs.Tab value="settings">Settings</Tabs.Tab>
                    <Tabs.Indicator />
                  </Tabs.List>
                  <Tabs.Panel value="overview">A compact panel keeps the primary summary visible without competing with the data surface.</Tabs.Panel>
                  <Tabs.Panel value="activity">Activity panels work well for chronological updates, comments, and audit history.</Tabs.Panel>
                  <Tabs.Panel value="settings">Settings panels group secondary controls without taking over the main workflow.</Tabs.Panel>
                </Tabs.Root>
              </div>
            </div>

            <div className="col-span-4 min-w-0 tablet:col-span-12">
              <Label>Dialog &amp; pagination</Label>
              <div className="mt-[10px]">
                <Dialog.Root>
                  <Dialog.Trigger variant="primary">
                    <Icon name="window" size="sm" />
                    Open dialog
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Backdrop />
                    <Dialog.Popup>
                      <Dialog.Title>Share client view</Dialog.Title>
                      <Dialog.Description>Choose who can access this saved view.</Dialog.Description>
                      <div className="mt-4">
                        <SelectField label="Permission" options={PERMISSIONS} />
                        <div className="mt-[14px]">
                          <CheckboxRow defaultChecked>Allow copying and exporting</CheckboxRow>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-end gap-2">
                        <Dialog.Close>Cancel</Dialog.Close>
                        <Dialog.Close variant="primary" onClick={() => toastManager.add({ title: 'View shared' })}>
                          Share view
                        </Dialog.Close>
                      </div>
                    </Dialog.Popup>
                  </Dialog.Portal>
                </Dialog.Root>
                <div className="mt-[17px] flex items-center justify-between gap-[10px] pt-[3px]">
                  <span className="text-[11px] text-[#858b95]">1–20 of 37</span>
                  <Pagination onNext={() => toastManager.add({ title: 'Next page' })} />
                </div>
              </div>
            </div>
          </div>
        </Spec>
      </div>
    </PageWrap>
  );
}
