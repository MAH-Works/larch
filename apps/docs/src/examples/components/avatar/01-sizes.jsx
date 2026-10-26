import { Avatar } from '@mah-works/larch/avatar';

export const title = 'Sizes';
export const description = 'Larch adds `size` and `tone` to Avatar.Root: sm (25px) for stacks, md (30px) for table rows, lg (35px) for headers.';

export default function Sizes() {
  return (
    <>
      {['sm', 'md', 'lg'].map((size) => (
        <Avatar.Root key={size} size={size}>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar.Root>
      ))}
    </>
  );
}
