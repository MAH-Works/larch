import { PreviewCard } from '@mah-works/larch/preview-card';
import { Badge, ClientMark } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'Hover or focus the link to preview a record without leaving the page.';

export default function Basic() {
  return (
    <p className="m-0 max-w-[420px] text-[13px] leading-relaxed text-body">
      The renewal for{' '}
      <PreviewCard.Root>
        <PreviewCard.Trigger href="#aperture">Aperture Labs</PreviewCard.Trigger>
        <PreviewCard.Portal>
          <PreviewCard.Positioner sideOffset={8}>
            <PreviewCard.Popup className="w-[260px]">
              <PreviewCard.Arrow />
              <div className="flex items-center gap-[10px]">
                <ClientMark tone="sky">A</ClientMark>
                <div>
                  <strong className="block font-semibold text-strong">Aperture Labs</strong>
                  <span className="text-[11px] text-muted">Enterprise · 12 projects</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                Renews Nov 12 <Badge variant="active">Healthy</Badge>
              </div>
            </PreviewCard.Popup>
          </PreviewCard.Positioner>
        </PreviewCard.Portal>
      </PreviewCard.Root>{' '}
      is on track; the account team meets on Thursday.
    </p>
  );
}
