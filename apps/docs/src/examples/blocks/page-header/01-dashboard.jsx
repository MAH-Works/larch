import { Button, Icon, PageHeading, useToast } from '@mah-works/larch';

export const title = 'Dashboard greeting';
export const layout = 'canvas';

export default function DashboardHeader() {
  const { showToast } = useToast();
  return (
    <PageHeading
      eyebrow="Monday, October 24, 2026"
      title="Good morning, Mohamad"
      description="Here is what is happening across your client workspace."
    >
      <Button onClick={() => showToast('Date range menu')}>
        <Icon name="calendar" size="sm" />
        Last 30 days
      </Button>
      <Button variant="primary" onClick={() => showToast('Report export started')}>
        <Icon name="download" size="sm" />
        Export
      </Button>
    </PageHeading>
  );
}
