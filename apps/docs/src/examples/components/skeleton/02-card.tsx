import { Card, Skeleton } from '@mah-works/larch';

export const title = 'Loading metric cards';
export const layout = 'canvas';

export default function LoadingCards() {
  return (
    <div className="grid grid-cols-3 gap-[14px] mobile:grid-cols-1">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="flex min-h-[126px] flex-col gap-4 px-[19px] py-[18px]">
          <Skeleton width="w-[45%]" />
          <Skeleton width="w-[60%]" className="h-5" />
          <Skeleton width="w-[35%]" />
        </Card>
      ))}
    </div>
  );
}
