import { Button, EmptyState, Icon, Panel, PanelGrid } from '@mah-works/larch';

export const title = 'Empty panels';
export const layout = 'canvas';

export default function EmptyPanels() {
  return (
    <PanelGrid columns="even">
      <Panel title="Upcoming renewals" subtitle="Next 30 days">
        <EmptyState icon="calendar" title="Nothing renewing soon" description="Renewals within 30 days will appear here." />
      </Panel>
      <Panel title="Projects" subtitle="Work in motion">
        <EmptyState
          title="No projects yet"
          description="Create a project to start tracking delivery."
          action={
            <Button variant="primary">
              <Icon name="plus" size="sm" />
              New project
            </Button>
          }
        />
      </Panel>
    </PanelGrid>
  );
}
