import { useEffect, useState } from 'react';
import { Markdown } from '@mah-works/larch/ai/markdown';
import { useHighlightedCode } from '@mah-works/larch/ai/highlight';
import { Button } from '@mah-works/larch/button';

export const title = 'Streaming a reply';
export const description =
  'Incomplete markdown (an unclosed `**` or code fence) renders sensibly mid-stream. Fenced code becomes a Code Block whose copy button waits for the closing fence.';
export const layout = 'padded';

const REPLY = `Here’s how to list **renewals due this month**:

1. Query renewals with a date before the end of the month.
2. Sort by *value*, highest first.

\`\`\`ts
const due = await renewalsDue(30);
due.sort((a, b) => b.value - a.value);
\`\`\`

> Harbor & Co. is flagged at risk — call before Friday.`;

export default function Streaming() {
  const [shown, setShown] = useState(REPLY.length);
  const streaming = shown < REPLY.length;

  useEffect(() => {
    if (!streaming) return undefined;
    const t = setTimeout(() => setShown((n) => Math.min(REPLY.length, n + 4)), 25);
    return () => clearTimeout(t);
  }, [shown, streaming]);

  return (
    <div className="flex max-w-[560px] flex-col gap-4">
      <Markdown mode="streaming" isAnimating={streaming} highlight={useHighlightedCode}>
        {REPLY.slice(0, shown)}
      </Markdown>
      <Button className="self-start" onClick={() => setShown(0)} disabled={streaming}>
        Replay stream
      </Button>
    </div>
  );
}
