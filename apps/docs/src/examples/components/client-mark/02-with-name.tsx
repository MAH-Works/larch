import { ClientMark } from '@mah-works/larch';

export const title = 'With a name';
export const description = 'The standard client cell: mark, bold name and a faint domain.';

export default function WithName() {
  return (
    <div className="flex items-center gap-[10px]">
      <ClientMark tone="violet">P</ClientMark>
      <span className="text-xs font-semibold text-strong">
        Parallax Studio
        <span className="mt-[2px] block text-[10px] font-normal text-faint">parallax.studio</span>
      </span>
    </div>
  );
}
