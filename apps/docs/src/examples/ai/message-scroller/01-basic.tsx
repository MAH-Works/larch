import { useEffect, useRef, useState } from 'react';
import { Bubble, Message, MessageScroller } from '@mah-works/larch/ai';
import { Button } from '@mah-works/larch/button';

export const title = 'Anchored turns';
export const description =
  'Each question is a scroll anchor, so it settles near the top and the reply streams in under it. Scroll up mid-reply and following stops; the button brings you back.';
export const layout = 'padded';

type Turn = { id: string; role: 'user' | 'assistant'; text: string };

const REPLY =
  'Renewals due this month: Aperture Labs (Nov 12, $24.8k, healthy), Harbor & Co. (Nov 19, $38.9k, at risk — billing contact changed) and Parallax Studio (Nov 28, $16.2k). Harbor needs a call before Friday; the other two can go out on the standard reminder.';

const seed: Turn[] = Array.from({ length: 4 }, (_, i) => [
  { id: `q${i}`, role: 'user' as const, text: `Question ${i + 1}: anything I should know about this week?` },
  { id: `a${i}`, role: 'assistant' as const, text: 'Nothing urgent — two invoices went out and one contact changed roles.' },
]).flat();

export default function Basic() {
  const [turns, setTurns] = useState(seed);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  useEffect(() => () => clearInterval(timer.current), []);

  const ask = () => {
    const n = turns.length;
    setTurns((t) => [...t, { id: `q${n}`, role: 'user', text: 'Which renewals are due this month?' }, { id: `a${n}`, role: 'assistant', text: '' }]);
    let i = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      i += 6;
      setTurns((t) => t.map((turn) => (turn.id === `a${n}` ? { ...turn, text: REPLY.slice(0, i) } : turn)));
      if (i >= REPLY.length) clearInterval(timer.current);
    }, 40);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="h-[360px] overflow-hidden rounded-[10px] border border-line bg-canvas">
        <MessageScroller.Provider autoScroll defaultScrollPosition="last-anchor">
          <MessageScroller.Root>
            <MessageScroller.Viewport aria-label="Conversation">
              <MessageScroller.Content>
                {turns.map((turn) => (
                  <MessageScroller.Item key={turn.id} messageId={turn.id} scrollAnchor={turn.role === 'user'}>
                    <Message.Root align={turn.role === 'user' ? 'end' : 'start'}>
                      <Message.Content>
                        <Bubble.Root variant={turn.role === 'user' ? 'muted' : 'ghost'}>
                          <Bubble.Content>{turn.text}</Bubble.Content>
                        </Bubble.Root>
                      </Message.Content>
                    </Message.Root>
                  </MessageScroller.Item>
                ))}
              </MessageScroller.Content>
            </MessageScroller.Viewport>
            <MessageScroller.Button aria-label="Scroll to the latest message" />
          </MessageScroller.Root>
        </MessageScroller.Provider>
      </div>
      <Button className="self-start" onClick={ask}>
        Ask a question
      </Button>
    </div>
  );
}
