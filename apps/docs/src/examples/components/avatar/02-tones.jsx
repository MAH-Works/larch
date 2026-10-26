import { Avatar } from '@mah-works/larch/avatar';

export const title = 'Tones';
export const description = 'Five gradients for people, plus `muted` for a "+N" overflow avatar.';

const PEOPLE = [
  ['JD', 'blue'],
  ['MC', 'coral'],
  ['AS', 'green'],
  ['KF', 'sand'],
  ['RB', 'purple'],
  ['+4', 'muted'],
];

export default function Tones() {
  return (
    <>
      {PEOPLE.map(([initials, tone]) => (
        <Avatar.Root key={initials} size="lg" tone={tone}>
          <Avatar.Fallback>{initials}</Avatar.Fallback>
        </Avatar.Root>
      ))}
    </>
  );
}
