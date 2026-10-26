import { Button, Icon, Toast, TopbarCreateButton, TopbarRoot, TopbarSearch, TopbarSpacer, TopbarThemeToggle, TopbarTitle } from '@mah-works/larch';

export const title = 'Compose your own topbar';
export const description =
  'Arrange the Topbar parts inside `TopbarRoot` to build the header your app needs — e.g. a title with no icon or breadcrumb, a sidebar toggle first, and your own buttons.';
export const layout = 'full';

export default function ComposedTopbar() {
  const toastManager = Toast.useToastManager();
  return (
    <div className="flex flex-col gap-4 py-4">
      <TopbarRoot>
        <Button variant="icon" aria-label="Collapse sidebar">
          <Icon name="sidebar" />
        </Button>
        <TopbarTitle>Bookings</TopbarTitle>
        <TopbarSpacer />
        <TopbarSearch placeholder="Search bookings" onSearch={(q) => toastManager.add({ title: `Searching for “${q}”` })} />
        <TopbarCreateButton label="New booking" onClick={() => toastManager.add({ title: 'New booking' })} />
        <TopbarThemeToggle />
      </TopbarRoot>
      <TopbarRoot tone="dark">
        <TopbarTitle section="Admin" icon="chart">
          Reports
        </TopbarTitle>
        <TopbarSpacer />
        <TopbarThemeToggle />
      </TopbarRoot>
    </div>
  );
}
