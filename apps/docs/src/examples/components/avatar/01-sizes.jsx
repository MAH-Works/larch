import { Avatar } from '@larch/ui';

export const title = 'Sizes';
export const description = 'sm (25px) for stacks, md (30px) for table rows, lg (35px) for profile headers.';

export default function Sizes() {
  return (
    <>
      <Avatar size="sm" initials="JD" />
      <Avatar size="md" initials="JD" />
      <Avatar size="lg" initials="JD" />
    </>
  );
}
