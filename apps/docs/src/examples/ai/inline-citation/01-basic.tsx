import { InlineCitation } from '@mah-works/larch/ai';

export const title = 'In a sentence';
export const description = 'The pill is a real link, so it’s reachable by keyboard; the preview opens on hover or focus.';
export const layout = 'padded';

export default function Basic() {
  return (
    <p className="m-0 max-w-[520px] text-[13px] leading-relaxed text-body">
      Base UI recommends a stacking context on the app root so portalled popups stay on top
      <InlineCitation sources={[{ type: 'source-url', sourceId: '1', url: 'https://base-ui.com/react/overview/quick-start', title: 'Quick start — Base UI' }]} />, and
      shadcn’s AI Elements build every agent step from one Trace component
      <InlineCitation
        sources={[
          { type: 'source-url', sourceId: '2', url: 'https://ui.shadcn.com/docs/components/base/trace', title: 'Trace — shadcn/ui' },
          { type: 'source-url', sourceId: '3', url: 'https://ui.shadcn.com/docs/ai-elements', title: 'AI Elements — shadcn/ui' },
        ]}
      />
      .
    </p>
  );
}
