import { useEffect, useState } from 'react';
import { Reasoning } from '@mah-works/larch/ai';
import { Button } from '@mah-works/larch/button';

export const title = 'While it thinks';
export const description = 'Opens while running, closes when done. Open or close it yourself mid-stream and your choice wins.';
export const layout = 'padded';

const THOUGHT =
  'The user wants renewals due this month. I should filter by renewal date ≤ Nov 30, then rank by value. Harbor & Co. changed its billing contact, which raised its risk score — worth flagging.';

export default function Streaming() {
  const [shown, setShown] = useState(THOUGHT.length);
  const running = shown < THOUGHT.length;
  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => setShown((n) => Math.min(THOUGHT.length, n + 3)), 30);
    return () => clearTimeout(t);
  }, [shown, running]);

  return (
    <div className="flex max-w-[480px] flex-col gap-4">
      <Reasoning text={THOUGHT.slice(0, shown)} running={running} duration={running ? undefined : '4s'} />
      <Button className="self-start" onClick={() => setShown(0)} disabled={running}>
        Think again
      </Button>
    </div>
  );
}
