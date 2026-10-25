import { Switch } from '@compass/ui';

export const title = 'Settings list';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="flex max-w-[380px] flex-col gap-2">
      <Switch label="Email notifications" description="Get weekly workspace summaries." defaultChecked />
      <Switch label="Renewal reminders" description="Ping owners 30 days before renewal." />
      <Switch label="Compact rows" />
    </div>
  );
}
