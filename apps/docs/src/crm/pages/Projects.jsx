import {
  Badge,
  Button,
  Cell,
  CellTitle,
  DirectoryCard,
  DirectoryTable,
  DirectoryToolbar,
  Dropdown,
  Icon,
  MoreButton,
  PageHeading,
  PageWrap,
  ProjectCard,
  ProjectGrid,
  Row,
  ToolbarTitle,
  useToast,
} from '@mah-works/larch';
import { PROJECTS, PROJECT_CARDS } from '../data/workspace.js';

const STATUSES = ['All statuses', 'On track', 'Starting', 'At risk', 'Planning'];

export default function Projects() {
  const { showToast } = useToast();
  return (
    <PageWrap>
      <PageHeading eyebrow="Workspace / Delivery" title="Projects" description="Keep every engagement moving from kickoff to delivery.">
        <Button onClick={() => showToast('Project filters')}>
          <Icon name="filter" size="sm" />
          Filter
        </Button>
        <Button variant="primary" onClick={() => showToast('New project form')}>
          <Icon name="plus" size="sm" />
          New project
        </Button>
      </PageHeading>

      <ProjectGrid>
        {PROJECT_CARDS.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </ProjectGrid>

      <DirectoryCard>
        <DirectoryToolbar>
          <ToolbarTitle title="All projects" subtitle="28 active engagements across 19 clients." />
          <div className="flex items-center gap-[3px]">
            <Dropdown
              variant="ghost"
              align="right"
              label="All statuses"
              items={STATUSES.map((s) => ({ label: s, onSelect: () => showToast(`Showing: ${s}`) }))}
            />
            <Button variant="ghost" aria-label="Project view settings" onClick={() => showToast('Project view settings')}>
              <Icon name="settings" size="sm" />
            </Button>
          </div>
        </DirectoryToolbar>

        <DirectoryTable headers={['Project', 'Client', 'Status', 'Owner', 'Due date', 'Progress', '']}>
          {PROJECTS.map((p) => (
            <Row key={p.name}>
              <Cell>
                <CellTitle title={p.name} caption={p.type} />
              </Cell>
              <Cell>{p.client}</Cell>
              <Cell>
                <Badge variant={p.status[1]}>{p.status[0]}</Badge>
              </Cell>
              <Cell>{p.owner}</Cell>
              <Cell>{p.due}</Cell>
              <Cell>{p.progress}</Cell>
              <Cell>
                <MoreButton label={`More actions for ${p.name}`} />
              </Cell>
            </Row>
          ))}
        </DirectoryTable>
      </DirectoryCard>
    </PageWrap>
  );
}
