import { Button } from '@mah-works/larch/button';
import { Icon } from '@mah-works/larch';

export const title = 'Icon buttons';
export const description = 'The `icon` variant is a 36px square for topbars and toolbars. Icon-only buttons always need an aria-label.';

export default function IconButtons() {
  return (
    <>
      <Button variant="icon" aria-label="Search">
        <Icon name="search" />
      </Button>
      <Button variant="icon" aria-label="Notifications">
        <Icon name="bell" />
      </Button>
      <Button variant="ghost" aria-label="Settings">
        <Icon name="settings" size="sm" />
      </Button>
      <Button variant="create">
        New client
        <Icon name="plus" size="sm" />
      </Button>
    </>
  );
}
