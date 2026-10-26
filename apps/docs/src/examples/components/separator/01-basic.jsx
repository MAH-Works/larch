import { Separator } from '@mah-works/larch/separator';
import { Button } from '@mah-works/larch/button';
import { Icon } from '@mah-works/larch';

export const title = 'Horizontal and vertical';
export const description =
  'A hairline in either orientation. Add spacing with `className` — Larch uses `my-[19px]` between sections and `mx-[7px] h-[17px]` in toolbars.';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[420px]">
      <p className="m-0 text-xs text-muted">Group related controls, then separate the next section.</p>
      <Separator className="my-[19px]" />
      <div className="flex items-center">
        <Button variant="ghost">
          <Icon name="filter" size="sm" />
          Filter
        </Button>
        <Button variant="ghost">
          <Icon name="sort" size="sm" />
          Sort
        </Button>
        <Separator orientation="vertical" className="mx-[7px] h-[17px] self-center" />
        <span className="text-[11px] text-faint">142 contacts</span>
      </div>
    </div>
  );
}
