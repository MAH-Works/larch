import { Button, Icon, PageHeading } from '@larch/ui';

export const title = 'Page heading';
export const description = 'Actions sit right on desktop and go full width on mobile. Wrap the page in PageWrap for the standard gutters.';
export const layout = 'canvas';

export default function Heading() {
  return (
    <PageHeading eyebrow="Workspace / People" title="Contacts" description="The people behind every client relationship.">
      <Button>
        <Icon name="download" size="sm" />
        Import
      </Button>
      <Button variant="primary">
        <Icon name="plus" size="sm" />
        Add contact
      </Button>
    </PageHeading>
  );
}
