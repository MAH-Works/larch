import { Bubble, BUBBLE_VARIANTS } from '@mah-works/larch/ai';

export const title = 'Variants';
export const description = '`secondary` is the neutral default; `ghost` drops the frame for assistant markdown.';
export const layout = 'padded';

export default function Variants() {
  return (
    <div className="flex max-w-[480px] flex-col gap-2">
      {(Object.keys(BUBBLE_VARIANTS) as (keyof typeof BUBBLE_VARIANTS)[]).map((variant) => (
        <Bubble.Root key={variant} variant={variant}>
          <Bubble.Content>
            <strong>{variant}</strong> — the quarterly report is ready.
          </Bubble.Content>
        </Bubble.Root>
      ))}
    </div>
  );
}
