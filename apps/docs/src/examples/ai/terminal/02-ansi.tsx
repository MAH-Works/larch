import { CodeBlock, Terminal } from '@mah-works/larch/ai';
import { useHighlightedCode } from '@mah-works/larch/ai/highlight';

export const title = 'ANSI colours';
export const description = 'Pass `"ansi"` to `useHighlightedCode` and render the lines as the Terminal’s children.';
export const layout = 'padded';

const OUTPUT = '\x1b[32m✓\x1b[0m billing.test.ts \x1b[2m(14 tests)\x1b[0m\n\x1b[31m✗\x1b[0m renewals.test.ts \x1b[2m(6 tests)\x1b[0m\n  \x1b[31mExpected 2 reminders, received 1\x1b[0m';

export default function Ansi() {
  const lines = useHighlightedCode(OUTPUT, 'ansi');
  return (
    <div className="max-w-[520px]">
      <Terminal command="pnpm test" output={OUTPUT} running={false} exitCode={1}>
        {lines.map((line, i) => (
          <CodeBlock.Line key={i}>{line}</CodeBlock.Line>
        ))}
      </Terminal>
    </div>
  );
}
