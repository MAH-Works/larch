import type { ReactNode } from 'react';
import Icon, { type IconName } from '../components/Icon.js';
import { CodeBlock } from './code-block.js';
import { Trace } from './trace.js';
import { toolName, type ToolPart } from './types.js';

const stringify = (value: unknown): string =>
  value == null ? '' : typeof value === 'string' ? value : JSON.stringify(value, null, 2);

export interface ToolProps {
  /** An AI SDK tool part (`tool-<name>` or `dynamic-tool`). */
  part: ToolPart;
  /** Whether the chat is still streaming. An unfinished call after the stream stops reads as failed. */
  streaming: boolean;
  icon?: IconName;
  /** What the call acts on, used in the title ("Ran {label}"). Defaults to the part's title or tool name. */
  label?: ReactNode;
  /** The expanded detail for a finished call. Defaults to the output (or error text) as text/JSON. */
  renderOutput?: (part: ToolPart) => ReactNode;
}

/**
 * One tool call as a Trace line, from input to output:
 *
 * - `input-streaming` / `input-available` (and approved calls): running → "Running {label}"
 * - `approval-requested`: pending → "Waiting to run {label}" (pair it with a Confirmation)
 * - `output-available`: collapsible → "Ran {label}", output inside
 * - `output-error`: collapsible, error → "Failed to run {label}", error text inside
 * - `output-denied` or a denied approval: plain → "Denied {label}"
 *
 * A client-side tool stays `input-available` after the stream stops until you call `addToolOutput`;
 * pass `streaming` accordingly if that call is still pending.
 */
export function Tool({ part, streaming, icon = 'terminal', label, renderOutput }: ToolProps) {
  const name = label ?? part.title ?? toolName(part);
  const glyph = (
    <Trace.Icon>
      <Icon name={icon} />
    </Trace.Icon>
  );

  const denied = part.state === 'output-denied' || (part.state === 'approval-responded' && part.approval?.approved === false);
  if (denied) {
    return (
      <Trace.Line>
        {glyph}
        <Trace.Title>Denied {name}</Trace.Title>
      </Trace.Line>
    );
  }

  if (part.state === 'approval-requested') {
    return (
      <Trace.Line status="pending">
        {glyph}
        <Trace.Title>Waiting to run {name}</Trace.Title>
      </Trace.Line>
    );
  }

  if (part.state === 'output-available' || part.state === 'output-error') {
    const failed = part.state === 'output-error';
    const preliminary = part.preliminary && streaming;
    return (
      <Trace.Collapsible>
        <Trace.Trigger>
          <Trace.Line status={failed ? 'error' : preliminary ? 'running' : undefined}>
            {glyph}
            <Trace.Title>
              {failed ? 'Failed to run' : preliminary ? 'Running' : 'Ran'} {name}
            </Trace.Title>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content>
          {renderOutput?.(part) ?? (
            <CodeBlock.Root size="sm" variant={failed ? 'destructive' : 'default'}>
              <CodeBlock.Content wrap className="max-h-64">
                {failed ? part.errorText : stringify(part.output)}
              </CodeBlock.Content>
            </CodeBlock.Root>
          )}
        </Trace.Content>
      </Trace.Collapsible>
    );
  }

  const running = streaming || part.state === 'approval-responded';
  return (
    <Trace.Line status={running ? 'running' : 'error'}>
      {glyph}
      <Trace.Title>
        {running ? 'Running' : 'Failed to run'} {name}
      </Trace.Title>
    </Trace.Line>
  );
}
