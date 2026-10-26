import { CodeBlock } from '@mah-works/larch/ai';
import { useHighlightedCode } from '@mah-works/larch/ai/highlight';

export const title = 'Syntax highlighting';
export const description =
  '`useHighlightedCode` (from `@mah-works/larch/ai/highlight`) loads Shiki’s JavaScript engine and the language on first use. Tokens carry both themes, so dark mode just works.';
export const layout = 'padded';

const CODE = `import { useChat } from '@ai-sdk/react';
import { ChatThread } from '@mah-works/larch/ai';

export function Assistant() {
  const { messages, status } = useChat();
  return <ChatThread messages={messages} status={status} />;
}`;

export default function Highlighted() {
  const lines = useHighlightedCode(CODE, 'tsx');
  return (
    <CodeBlock.Root className="max-w-[560px]">
      <CodeBlock.Actions>
        <CodeBlock.CopyButton value={CODE} />
      </CodeBlock.Actions>
      <CodeBlock.Content lineNumbers>
        {lines.map((line, i) => (
          <CodeBlock.Line key={i} variant={i === 4 ? 'highlighted' : 'default'}>
            {line}
          </CodeBlock.Line>
        ))}
      </CodeBlock.Content>
    </CodeBlock.Root>
  );
}
