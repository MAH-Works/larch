import { Toolbar } from '@mah-works/larch/toolbar';
import { Toggle } from '@mah-works/larch/toggle';
import { ToggleGroup } from '@mah-works/larch/toggle-group';
import { Icon } from '@mah-works/larch';

export const title = 'Table toolbar';
export const description =
  'One tab stop for the whole bar; arrow keys move between controls. Toolbar.Button defaults to the ghost variant.';

export default function Basic() {
  return (
    <Toolbar.Root aria-label="Table tools">
      <Toolbar.Button>
        <Icon name="filter" size="sm" />
        Filter
      </Toolbar.Button>
      <Toolbar.Button>
        <Icon name="sort" size="sm" />
        Sort
      </Toolbar.Button>
      <Toolbar.Separator />
      <ToggleGroup defaultValue={['table']} aria-label="Layout" className="border-0 p-0">
        <Toolbar.Button render={<Toggle value="table" aria-label="Table" />} variant="unstyled">
          <Icon name="table" size="sm" />
        </Toolbar.Button>
        <Toolbar.Button render={<Toggle value="list" aria-label="List" />} variant="unstyled">
          <Icon name="list" size="sm" />
        </Toolbar.Button>
      </ToggleGroup>
      <Toolbar.Separator />
      <Toolbar.Link href="#saved">Saved views</Toolbar.Link>
    </Toolbar.Root>
  );
}
