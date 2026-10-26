import { useEffect, useState } from 'react';
import { Terminal } from '@mah-works/larch/ai';
import { Button } from '@mah-works/larch/button';

export const title = 'Streaming output';
export const description = 'Opens when the first output arrives; a non-zero exit code marks it failed.';
export const layout = 'padded';

const LINES = ['> larch@2.4.0 build', 'vite v5.4.21 building for production...', '✓ 412 modules transformed.', 'dist/index.js  6.20 kB', '✓ built in 1.84s'];

export default function Streaming() {
  const [n, setN] = useState(LINES.length);
  const running = n < LINES.length;
  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => setN((x) => x + 1), 450);
    return () => clearTimeout(t);
  }, [n, running]);

  return (
    <div className="flex max-w-[520px] flex-col gap-4">
      <Terminal command="pnpm build" output={LINES.slice(0, n).join('\n')} running={running} exitCode={0} />
      <Terminal command="pnpm lint" output={'src/ai/tool.tsx\n  12:7  error  Unexpected any  @typescript-eslint/no-explicit-any'} running={false} exitCode={1} />
      <Button className="self-start" onClick={() => setN(0)} disabled={running}>
        Run again
      </Button>
    </div>
  );
}
