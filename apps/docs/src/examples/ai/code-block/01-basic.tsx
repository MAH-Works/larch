import { CodeBlock } from '@mah-works/larch/ai';

export const title = 'Header, copy and line numbers';
export const description = 'Line numbers are CSS counters, so they’re never copied or read out. The copy button copies `value`.';
export const layout = 'padded';

const CODE = `export async function renewalsDue(days = 30) {
  const until = addDays(new Date(), days);
  return db.renewals.findMany({ where: { date: { lte: until } } });
}`;

export default function Basic() {
  return (
    <CodeBlock.Root className="max-w-[560px]">
      <CodeBlock.Header>
        <CodeBlock.Title>lib/renewals.ts</CodeBlock.Title>
        <CodeBlock.Actions>
          <CodeBlock.CopyButton value={CODE} />
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content lineNumbers>{CODE}</CodeBlock.Content>
    </CodeBlock.Root>
  );
}
