import { Card } from '@mah-works/larch';

export const title = 'Card';
export const description = 'The base surface. Add your own padding.';
export const layout = 'canvas';

export default function Basic() {
  return (
    <Card className="max-w-[360px] p-5">
      <h3 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">Aperture Labs</h3>
      <p className="mb-0 mt-2 text-xs leading-relaxed text-muted">
        Enterprise account since 2021. 12 active projects, renewing in 4 days.
      </p>
    </Card>
  );
}
