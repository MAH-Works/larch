import { Field } from '@mah-works/larch/field';
import { Fieldset } from '@mah-works/larch/fieldset';
import { Separator } from '@mah-works/larch/separator';
import { Switch } from '@mah-works/larch/switch';
import { Panel } from '@mah-works/larch';

export const title = 'Notification settings';
export const description = 'Each row is a Field whose Label names the Switch; a Fieldset groups each section under a legend.';
export const layout = 'canvas';

function SettingRow({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <Field.Root className="min-h-9 flex-row items-center justify-between gap-[14px] [&+&]:mt-0">
      <div>
        <Field.Label className="text-xs text-ink">{label}</Field.Label>
        <Field.Description className="mt-[2px]">{description}</Field.Description>
      </div>
      <Switch.Root defaultChecked={defaultChecked}>
        <Switch.Thumb />
      </Switch.Root>
    </Field.Root>
  );
}

export default function Settings() {
  return (
    <div className="max-w-[520px]">
      <Panel title="Notifications" subtitle="Choose what reaches your inbox.">
        <Fieldset.Root className="gap-1">
          <Fieldset.Legend>Email</Fieldset.Legend>
          <SettingRow label="Weekly summary" description="A Monday digest of workspace activity." defaultChecked />
          <SettingRow label="Renewal reminders" description="30 days before each renewal you own." defaultChecked />
        </Fieldset.Root>
        <Separator className="my-[19px]" />
        <Fieldset.Root className="gap-1">
          <Fieldset.Legend>In-app</Fieldset.Legend>
          <SettingRow label="Mentions" description="When someone @mentions you on a record." defaultChecked />
          <SettingRow label="Task assignments" description="When a task is assigned to you." />
        </Fieldset.Root>
      </Panel>
    </div>
  );
}
