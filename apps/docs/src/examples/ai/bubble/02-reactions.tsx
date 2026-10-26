import { Bubble } from '@mah-works/larch/ai';

export const title = 'Grouped, with reactions';
export const description = 'A Group stacks consecutive bubbles from one sender. Reactions overlap the edge, so leave room under the row.';
export const layout = 'padded';

export default function Reactions() {
  return (
    <Bubble.Group className="max-w-[420px] items-end pb-3">
      <Bubble.Root variant="default" align="end">
        <Bubble.Content>Can you pull last month’s churn?</Bubble.Content>
      </Bubble.Root>
      <Bubble.Root variant="default" align="end">
        <Bubble.Content>Split by plan, please.</Bubble.Content>
        <Bubble.Reactions>
          <span aria-label="1 thumbs up reaction">👍 1</span>
        </Bubble.Reactions>
      </Bubble.Root>
    </Bubble.Group>
  );
}
