import { Skeleton } from '@mah-works/larch';

export const title = 'Text lines';
export const layout = 'padded';

export default function Lines() {
  return (
    <div className="flex max-w-[360px] flex-col gap-[10px]">
      <Skeleton />
      <Skeleton width="w-[74%]" />
      <Skeleton width="w-[55%]" />
    </div>
  );
}
