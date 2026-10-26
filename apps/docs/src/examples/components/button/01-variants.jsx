import { Button } from '@mah-works/larch/button';
import { Icon } from '@mah-works/larch';

export const title = 'Variants';
export const description = 'Larch adds one visual prop to Base UI’s Button: `variant`. Outline is the default; use primary once per view, ghost inside toolbars and danger for destructive confirmations.';

export default function Variants() {
  return (
    <>
      <Button variant="primary">
        <Icon name="plus" size="sm" />
        Primary
      </Button>
      <Button>Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghostDanger">
        <Icon name="trash" size="sm" />
        Ghost danger
      </Button>
      <Button variant="danger">
        <Icon name="trash" size="sm" />
        Delete
      </Button>
    </>
  );
}
