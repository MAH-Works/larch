import { Divider, Eyebrow, Panel, Switch } from '@compass/ui';

export const title = 'Notification settings';
export const layout = 'canvas';

export default function Settings() {
  return (
    <div className="max-w-[520px]">
      <Panel title="Notifications" subtitle="Choose what reaches your inbox.">
        <Eyebrow>Email</Eyebrow>
        <div className="mt-2 flex flex-col gap-1">
          <Switch label="Weekly summary" description="A Monday digest of workspace activity." defaultChecked />
          <Switch label="Renewal reminders" description="30 days before each renewal you own." defaultChecked />
        </div>
        <Divider />
        <Eyebrow>In-app</Eyebrow>
        <div className="mt-2 flex flex-col gap-1">
          <Switch label="Mentions" description="When someone @mentions you on a record." defaultChecked />
          <Switch label="Task assignments" description="When a task is assigned to you." />
        </div>
      </Panel>
    </div>
  );
}
