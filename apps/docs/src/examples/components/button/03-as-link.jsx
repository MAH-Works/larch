import { Link } from 'react-router-dom';
import { Button } from '@mah-works/larch/button';
import { Icon } from '@mah-works/larch';

export const title = 'Rendering a link';
export const description =
  'Base UI composition: pass `render` to swap the element (a router `Link`, an `<a>`) and set `nativeButton={false}` so Base UI applies link semantics.';

export default function AsLink() {
  return (
    <>
      <Button render={<Link to="/blocks/app-shell" />} nativeButton={false} variant="primary">
        Open blocks <Icon name="arrowRight" size="sm" />
      </Button>
      <Button render={<a href="https://base-ui.com/react/components/button" target="_blank" rel="noreferrer" />} nativeButton={false}>
        Base UI Button docs
      </Button>
    </>
  );
}
