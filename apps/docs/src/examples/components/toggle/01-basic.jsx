import { Toggle } from '@mah-works/larch/toggle';
import { Icon } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'A two-state button. Pressed toggles turn soft blue (`data-pressed`).';

export default function Basic() {
  return (
    <>
      <Toggle aria-label="Star view" defaultPressed>
        <Icon name="star" size="sm" />
      </Toggle>
      <Toggle>
        <Icon name="eye" size="sm" />
        Show archived
      </Toggle>
    </>
  );
}
