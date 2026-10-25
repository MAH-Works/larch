import { useState } from 'react';
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
  CheckRow,
  ClientsTable,
  Dialog,
  DirectoryTable,
  Divider,
  Dropdown,
  EmptyState,
  Eyebrow as Label,
  Field,
  HealthChart,
  Icon,
  Kbd,
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
  SelectInput,
  SelectionToolbar,
  Skeleton,
  Switch,
  Tabs,
  TextArea,
  TextInput,
  Tooltip,
  useSelection,
  useToast,
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
function Spec({ span = 12, title, caption, children }) {
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

const STATUS_BADGES = [['Active', 'active'], ['Trial', 'trial'], ['Onboarding', 'onboarding'], ['Inactive', 'inactive'], ['Archived', 'archived']];
const TAG_BADGES = [['High Priority', 'priority'], ['Low Priority', 'low'], ['VIP', 'vip'], ['Long-term', 'longterm']];

const CUES = [
  ['Hover', 'Soft gray fill', 'border-line bg-[#fafbfc] text-[#545a63] dark:bg-[#1b2028] dark:text-[#c2c9d2]'],
  ['Selected', 'Blue accent', 'border-[#dce5ff] bg-[#f7f9ff] text-[#365dc1] dark:border-[#2c427b] dark:bg-[#172342] dark:text-[#8eafff]'],
  ['Danger', 'Red, not loud', 'border-[#ffdde0] bg-[#fff8f8] text-[#bf4a58] dark:border-[#51272d] dark:bg-[#26171a]'],
];

export default function DesignSystem() {
  const { showToast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const anatomy = useSelection([CLIENTS[0].id]);

  return (
    <PageWrap max="max-w-[1240px]">
      <PageHeading
        eyebrow="Reference / v1.0"
        title="Larch design system"
        description="Quiet, dense interface primitives for client operations."
      >
        <Button as={Link} to="/examples/crm/clients" variant="primary">
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
          <Divider />
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
            {[
              ['Heading', <strong key="h" className="text-lg tracking-[-.04em]">Clients overview</strong>],
              ['Body', <span key="b" className="text-[#555a63] dark:text-[#c2c9d2]">Keep teams aligned with clarity.</span>],
              ['Label', <Label key="l">Last contact</Label>],
              ['Numeric', <span key="n" className="font-mono text-xs text-[#555a63] dark:text-[#c2c9d2]">1,248.00</span>],
            ].map(([name, sample]) => (
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
          <Divider />
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
            <Avatar size="lg" initials="JD" tone="blue" />
            <Avatar size="lg" initials="MC" tone="coral" />
            <Avatar size="lg" initials="AS" tone="green" />
            <Avatar size="lg" initials="+4" tone="purple" />
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
          <Divider />
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
                  <CellTitle leading={<Avatar size="md" initials="JD" tone="blue" />} title="Jamie Davis" caption="jamie@aperture.test" />
                </Cell>
                <Cell>Aperture Labs</Cell>
                <Cell>Head of Product</Cell>
                <Cell><Badge variant="active">Active</Badge></Cell>
              </Row>
              <Row>
                <Cell>
                  <CellTitle leading={<Avatar size="md" initials="MC" tone="coral" />} title="Maria Costa" caption="maria@parallax.studio" />
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
                <Field label="Client name" id="demo-name"><TextInput id="demo-name" placeholder="Search or enter a name" /></Field>
                <Field label="Status" id="demo-status">
                  <SelectInput id="demo-status"><option>Active</option><option>Trial</option><option>Onboarding</option></SelectInput>
                </Field>
                <Field label="Note" id="demo-note"><TextArea id="demo-note" placeholder="Add a short note..." /></Field>
              </div>
            </div>

            <div className="col-span-4 min-w-0 tablet:col-span-12">
              <Label>Dropdown &amp; alerts</Label>
              <div className="mb-[14px] mt-[10px]">
                <Dropdown
                  label="More actions"
                  items={[
                    { label: 'Export view', icon: 'download', onSelect: () => showToast('Export view') },
                    { label: 'Duplicate view', icon: 'copy', onSelect: () => showToast('Duplicate view') },
                    { label: 'Delete view', icon: 'trash', danger: true, onSelect: () => showToast('Delete view') },
                  ]}
                />
              </div>
              <Alert tone="info" title="Heads up">Two clients have not been contacted this week.</Alert>
              <Alert tone="success" title="Saved">Your view is ready to share.</Alert>
              <Alert tone="warning" title="Review needed">One renewal is at risk.</Alert>
              <Alert tone="danger" title="Could not sync">Try again in a moment.</Alert>
            </div>

            <div className="col-span-4 min-w-0 tablet:col-span-12">
              <Label>Selection &amp; states</Label>
              <div className="mt-[10px]">
                <Switch label="Email notifications" description="Get weekly workspace summaries." defaultChecked />
                <Divider />
                <CheckRow defaultChecked>Include archived clients</CheckRow>
                <CheckRow>Only overdue tasks</CheckRow>
                <Divider />
                <Tooltip text="Use ⌘ K to focus search">
                  <Button aria-label="Keyboard shortcut help"><Icon name="keyboard" size="sm" />Hover for help</Button>
                </Tooltip>
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
                <Tabs
                  tabs={[
                    { id: 'overview', label: 'Overview', content: 'A compact panel keeps the primary summary visible without competing with the data surface.' },
                    { id: 'activity', label: 'Activity', content: 'Activity panels work well for chronological updates, comments, and audit history.' },
                    { id: 'settings', label: 'Settings', content: 'Settings panels group secondary controls without taking over the main workflow.' },
                  ]}
                />
              </div>
            </div>

            <div className="col-span-4 min-w-0 tablet:col-span-12">
              <Label>Dialog &amp; pagination</Label>
              <div className="mt-[10px]">
                <Button variant="primary" onClick={() => setDialogOpen(true)}>
                  <Icon name="window" size="sm" />Open dialog
                </Button>
                <div className="mt-[17px] flex items-center justify-between gap-[10px] pt-[3px]">
                  <span className="text-[11px] text-[#858b95]">1–20 of 37</span>
                  <Pagination onNext={() => showToast('Next page')} />
                </div>
              </div>
            </div>
          </div>

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Share client view"
            description="Choose who can access this saved view."
            footer={
              <>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setDialogOpen(false);
                    showToast('View shared');
                  }}
                >
                  Share view
                </Button>
              </>
            }
          >
            <Field label="Permission" id="dialog-permission">
              <SelectInput id="dialog-permission">
                <option>Anyone on the workspace</option>
                <option>Only invited people</option>
                <option>Only me</option>
              </SelectInput>
            </Field>
            <div className="mt-[14px]"><CheckRow defaultChecked>Allow copying and exporting</CheckRow></div>
          </Dialog>
        </Spec>
      </div>
    </PageWrap>
  );
}
