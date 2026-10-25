import { Badge, Button, Icon, PageHeading, Tabs } from '@mah-works/larch';

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
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', content: '12 projects · 48 open tasks · $24.8k billed this month.' },
          { id: 'projects', label: 'Projects', content: 'Website redesign, Mobile app audit, …' },
          { id: 'contacts', label: 'Contacts', content: 'Jamie Davis, Head of Product.' },
          { id: 'billing', label: 'Billing', content: 'Next invoice on Nov 1.' },
        ]}
      />
    </>
  );
}
