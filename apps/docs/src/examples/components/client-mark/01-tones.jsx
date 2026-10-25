import { ClientMark } from '@mah-works/larch';

export const title = 'Tones';

const TONES = ['sky', 'lime', 'yellow', 'violet', 'rose', 'blue', 'slate'];

export default function Tones() {
  return (
    <>
      {TONES.map((tone) => (
        <ClientMark key={tone} tone={tone} size="lg">
          {tone[0].toUpperCase()}
        </ClientMark>
      ))}
    </>
  );
}
