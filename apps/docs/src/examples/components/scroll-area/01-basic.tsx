import { ScrollArea } from '@mah-works/larch/scroll-area';
import { AccountItem } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'Native scrolling with thin overlay scrollbars that appear while hovering or scrolling.';

const ACCOUNTS = ['Aperture Labs', 'Northstar Health', 'Parallax Studio', 'Harbor & Co.', 'Lumen Retail', 'Quill Legal', 'Orbit Freight'];

export default function Basic() {
  return (
    <ScrollArea.Root className="h-[220px] w-full max-w-[360px] rounded-[10px] border border-line bg-surface">
      <ScrollArea.Viewport>
        <ScrollArea.Content className="px-4 py-1">
          {ACCOUNTS.map((name) => (
            <AccountItem key={name} name={name} meta="Renews this quarter" value="$12.4k" />
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
