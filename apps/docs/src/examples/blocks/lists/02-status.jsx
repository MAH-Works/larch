import { Button, Icon, Panel, StatusList } from '@compass/ui';

export const title = 'Status list';
export const layout = 'canvas';

export default function Status() {
  return (
    <div className="max-w-[520px]">
      <Panel
        title="Saved reports"
        subtitle="Shared with your workspace."
        action={
          <Button variant="ghost">
            Create report <Icon name="plus" size="xs" />
          </Button>
        }
      >
        <StatusList
          items={[
            { name: 'Monthly client health', meta: 'Updated 2 hours ago · 4 viewers', badge: ['Ready', 'active'] },
            { name: 'Renewal forecast', meta: 'Updated yesterday · 6 viewers', badge: ['Shared', 'blue'] },
            { name: 'Delivery capacity', meta: 'Updated Oct 20 · 3 viewers', badge: ['Draft', 'inactive'] },
          ]}
        />
      </Panel>
    </div>
  );
}
