import { AccountItem, Panel, PanelSelect } from '@mah-works/larch';

export const title = 'Account list';
export const layout = 'canvas';

export default function Accounts() {
  return (
    <div className="max-w-[520px]">
      <Panel
        title="Renewal calendar"
        subtitle="Prioritized by date and account health."
        action={<PanelSelect label="Renewal horizon" options={['Next 90 days', 'Next 6 months']} />}
      >
        <AccountItem name="Aperture Labs" mark="sky" meta="Oct 28 · Maria Costa · 4 days left" badge={['Healthy', 'active']} value="$24.8k" />
        <AccountItem name="Harbor & Co." mark="rose" meta="Nov 09 · Maria Costa · 16 days left" badge={['Watch', 'priority']} value="$38.9k" />
        <AccountItem name="Cedar & Finch" mark="blue" meta="Dec 01 · Jamie Chen · 38 days left" badge={['Inactive', 'inactive']} value="$9.6k" />
      </Panel>
    </div>
  );
}
