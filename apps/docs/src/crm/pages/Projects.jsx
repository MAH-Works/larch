import { useState } from 'react';
import {
  Badge,
  Button,
  Cell,
  CellTitle,
  DirectoryCard,
  DirectoryTable,
  DirectoryToolbar,
  Icon,
  Menu,
  MoreButton,
  PageHeading,
  PageWrap,
  ProjectCard,
  ProjectGrid,
  Row,
  ToolbarTitle,
  Toast,
} from '@mah-works/larch';
import { PROJECTS, PROJECT_CARDS } from '../data/workspace.js';

const STATUSES = ['All statuses', 'On track', 'Starting', 'At risk', 'Planning'];

export default function Projects() {
  const toastManager = Toast.useToastManager();
  const [status, setStatus] = useState(STATUSES[0]);
  return (
    <PageWrap>
      <PageHeading eyebrow="Workspace / Delivery" title="Projects" description="Keep every engagement moving from kickoff to delivery.">
        <Button onClick={() => toastManager.add({ title: 'Project filters' })}>
          <Icon name="filter" size="sm" />
          Filter
        </Button>
        <Button variant="primary" onClick={() => toastManager.add({ title: 'New project form' })}>
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
            <Menu.Root>
              <Menu.Trigger variant="ghost">
                {status} <Icon name="chevronDown" size="xs" />
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner sideOffset={6} align="end">
                  <Menu.Popup>
                    <Menu.RadioGroup
                      value={status}
                      onValueChange={(s) => {
                        setStatus(s);
                        toastManager.add({ title: `Showing: ${s}` });
                      }}
                    >
                      {STATUSES.map((s) => (
                        <Menu.RadioItem key={s} value={s}>
                          <Menu.RadioItemIndicator />
                          {s}
                        </Menu.RadioItem>
                      ))}
                    </Menu.RadioGroup>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
            <Button variant="ghost" aria-label="Project view settings" onClick={() => toastManager.add({ title: 'Project view settings' })}>
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
