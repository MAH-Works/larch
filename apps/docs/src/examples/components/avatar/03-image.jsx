import { Avatar } from '@mah-works/larch/avatar';

export const title = 'Image with fallback';
export const description = 'Avatar.Image renders once the image loads; until then (or if it fails) the Fallback shows the initials.';

export default function Image() {
  return (
    <>
      <Avatar.Root size="lg">
        <Avatar.Image src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80" alt="" />
        <Avatar.Fallback delay={400}>LT</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="lg" tone="green">
        <Avatar.Image src="/does-not-exist.png" alt="" />
        <Avatar.Fallback>AS</Avatar.Fallback>
      </Avatar.Root>
    </>
  );
}
