import { ProgressBar } from '@mah-works/larch';

export const title = 'Progress bar';
export const layout = 'padded';

export default function Bar() {
  return (
    <div className="flex max-w-[420px] flex-col gap-4">
      <ProgressBar percent={78} label="Website redesign" />
      <ProgressBar percent={52} tone="amber" label="Campaign launch" />
      <ProgressBar percent={34} tone="green" label="Brand system" />
      <ProgressBar percent={18} tone="red" label="At-risk renewals" />
    </div>
  );
}
