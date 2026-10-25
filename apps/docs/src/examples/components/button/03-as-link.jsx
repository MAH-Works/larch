import { Link } from 'react-router-dom';
import { Button, Icon } from '@mah-works/larch';

export const title = 'As a link';
export const description = 'Pass `as` to render any element with button styling — a router Link, an anchor, a label.';

export default function AsLink() {
  return (
    <>
      <Button as={Link} to="/blocks/app-shell" variant="primary">
        Open blocks <Icon name="arrowRight" size="sm" />
      </Button>
      <Button as="a" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
        External link
      </Button>
    </>
  );
}
