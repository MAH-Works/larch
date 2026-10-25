import { Badge, Button, Icon } from '@mah-works/larch';

export const title = 'States & composition';
export const description = 'Disabled buttons fade and ignore pointer events. Buttons compose with icons, badges and chevrons.';

export default function States() {
  return (
    <>
      <Button variant="primary" disabled>
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
      <Button variant="ghost">
        All statuses <Icon name="chevronDown" size="xs" />
      </Button>
    </>
  );
}
