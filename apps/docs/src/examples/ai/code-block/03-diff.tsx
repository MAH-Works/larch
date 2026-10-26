import { CodeBlock } from '@mah-works/larch/ai';

export const title = 'Diff';
export const description = 'Added and removed lines print a + / − marker, so the change never relies on colour alone.';
export const layout = 'padded';

export default function Diff() {
  return (
    <CodeBlock.Root size="sm" className="max-w-[560px]">
      <CodeBlock.Header>
        <CodeBlock.Title>components/Invoice.tsx</CodeBlock.Title>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Line>{'<Invoice'}</CodeBlock.Line>
        <CodeBlock.Line variant="removed">{'  total={amount}'}</CodeBlock.Line>
        <CodeBlock.Line variant="added">{'  total={amount + tax}'}</CodeBlock.Line>
        <CodeBlock.Line variant="added">{'  currency="USD"'}</CodeBlock.Line>
        <CodeBlock.Line>{'/>'}</CodeBlock.Line>
      </CodeBlock.Content>
    </CodeBlock.Root>
  );
}
