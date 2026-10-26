import { Tabs } from '@mah-works/larch/tabs';
import { Badge, Button, Icon, PageHeading } from '@mah-works/larch';

export const title = 'Record header with tabs';
export const description = 'A detail page: status badges in the eyebrow row, actions on the right, tabs underneath.';
export const layout = 'canvas';

export default function RecordHeader() {
  return (
    <>
      <PageHeading
        eyebrow={
          <span className="inline-flex items-center gap-2">
            Clients / Aperture Labs <Badge variant="active">Active</Badge> <Badge variant="vip">VIP</Badge>
          </span>
        }
        title="Aperture Labs"
        description="Enterprise · aperture.test · Owner: Maria Costa"
      >
        <Button>
          <Icon name="copy" size="sm" />
          Duplicate
        </Button>
        <Button variant="primary">
          <Icon name="plus" size="sm" />
          New project
        </Button>
      </PageHeading>
      <Tabs.Root defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="projects">Projects</Tabs.Tab>
          <Tabs.Tab value="contacts">Contacts</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="overview">12 projects · 48 open tasks · $24.8k billed this month.</Tabs.Panel>
        <Tabs.Panel value="projects">Website redesign, Mobile app audit, …</Tabs.Panel>
        <Tabs.Panel value="contacts">Jamie Davis, Head of Product.</Tabs.Panel>
        <Tabs.Panel value="billing">Next invoice on Nov 1.</Tabs.Panel>
      </Tabs.Root>
    </>
  );
}
