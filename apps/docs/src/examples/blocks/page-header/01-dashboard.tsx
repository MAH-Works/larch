import { Button, Icon, PageHeading, Toast } from '@mah-works/larch';

export const title = 'Dashboard greeting';
export const layout = 'canvas';

export default function DashboardHeader() {
  const toastManager = Toast.useToastManager();
  return (
    <PageHeading
      eyebrow="Monday, October 24, 2026"
      title="Good morning, Mohamad"
      description="Here is what is happening across your client workspace."
    >
      <Button onClick={() => toastManager.add({ title: 'Date range menu' })}>
        <Icon name="calendar" size="sm" />
        Last 30 days
      </Button>
      <Button variant="primary" onClick={() => toastManager.add({ title: 'Report export started' })}>
        <Icon name="download" size="sm" />
        Export
      </Button>
    </PageHeading>
  );
}
