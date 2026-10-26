import { useState, type ReactNode } from 'react';
import { Trace } from './trace.js';
import { StatusIcon } from './status.js';

export interface ReasoningProps {
  /** The reasoning text so far. While empty the row is a plain line with nothing to expand. */
  text: string;
  /** True while the model is still thinking (e.g. `streaming && part.state === 'streaming'`). */
  running: boolean;
  /** Optional duration, e.g. "12s" — the AI SDK doesn't time reasoning, so send it as metadata. */
  duration?: ReactNode;
}

/**
 * The agent's thinking. It opens itself while running and closes when done, but once the reader opens or
 * closes it, their choice wins.
 *
 *   {message.parts.filter((p) => p.type === 'reasoning').map((p, i) => (
 *     <Reasoning key={i} text={p.text} running={streaming && p.state === 'streaming'} />
 *   ))}
 */
export function Reasoning({ text, running, duration }: ReasoningProps) {
  const [open, setOpen] = useState<boolean>();

  const line = (
    <Trace.Line status={running ? 'running' : undefined}>
      <Trace.Icon>
        <StatusIcon status={running ? 'running' : 'done'} />
      </Trace.Icon>
      <Trace.Title>{running ? 'Thinking' : 'Thought'}</Trace.Title>
      {duration != null && !running && <Trace.Description>{duration}</Trace.Description>}
    </Trace.Line>
  );

  if (!text) return <Trace.Root>{line}</Trace.Root>;

  return (
    <Trace.Root>
      <Trace.Collapsible open={open ?? running} onOpenChange={setOpen}>
        <Trace.Trigger>{line}</Trace.Trigger>
        <Trace.Content className="whitespace-pre-wrap text-muted">{text}</Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
