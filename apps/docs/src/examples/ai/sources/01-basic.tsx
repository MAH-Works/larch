import { Sources, uniqueSources } from '@mah-works/larch/ai';

export const title = 'Basic';
export const description = '`uniqueSources(message.parts)` keeps one row per URL; a missing title falls back to the host.';
export const layout = 'padded';

const parts = [
  { type: 'source-url', sourceId: '1', url: 'https://base-ui.com/react/components/dialog', title: 'Dialog — Base UI' },
  { type: 'source-url', sourceId: '2', url: 'https://ui.shadcn.com/docs/ai-elements' },
  { type: 'source-url', sourceId: '3', url: 'https://base-ui.com/react/components/dialog', title: 'Dialog — Base UI' },
  { type: 'text', text: '…' },
];

export default function Basic() {
  return (
    <div className="max-w-[440px]">
      <Sources sources={uniqueSources(parts)} defaultOpen />
    </div>
  );
}
