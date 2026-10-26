import { Button } from '@mah-works/larch/button';
import { Badge, Icon } from '@mah-works/larch';

export const title = 'States & composition';
export const description =
  'Disabled buttons fade and ignore the pointer. `focusableWhenDisabled` keeps a loading button in the tab order. Buttons compose with icons and badges.';

export default function States() {
  return (
    <>
      <Button variant="primary" disabled focusableWhenDisabled>
        Saving…
      </Button>
      <Button disabled>Disabled</Button>
      <Button variant="ghost">
        <Icon name="filter" size="sm" />
        Filter
        <Badge variant="blue" count>
          2
        </Badge>
      </Button>
      <Button variant="ghost" className="px-4 text-ink">
        className overrides win
      </Button>
    </>
  );
}
