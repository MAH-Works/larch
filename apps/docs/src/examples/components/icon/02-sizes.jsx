import { Icon } from '@mah-works/larch';

export const title = 'Sizes & color';
export const description = 'Icons use currentColor — set the color with a text utility.';

export default function Sizes() {
  return (
    <>
      <Icon name="star" size="md" />
      <Icon name="star" size="sm" />
      <Icon name="star" size="xs" />
      <Icon name="check" className="text-green" />
      <Icon name="warning" className="text-amber" />
      <Icon name="error" className="text-red" />
      <Icon name="info" className="text-blue" />
    </>
  );
}
