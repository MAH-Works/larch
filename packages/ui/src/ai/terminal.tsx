import { useState, type ReactNode } from 'react';
import Icon from '../components/Icon.js';
import { CodeBlock } from './code-block.js';
import { Trace } from './trace.js';

export interface TerminalProps {
  command: ReactNode;
  /** Output so far. Stream it as a `data-terminal` part keyed by the tool call id so it grows in place. */
  output: string;
  running: boolean;
  /** Non-zero marks the run as failed. */
  exitCode?: number;
  /**
   * Render the output yourself — e.g. ANSI colours with `useHighlightedCode(output, 'ansi')` from
   * `@mah-works/larch/ai/highlight`, mapped into `CodeBlock.Line`s.
   */
  children?: ReactNode;
}

/** A command and its streaming output. Opens when the first output arrives; then the reader decides. */
export function Terminal({ command, output, running, exitCode, children }: TerminalProps) {
  const [open, setOpen] = useState<boolean>();
  const failed = !running && exitCode != null && exitCode !== 0;
  return (
    <Trace.Root>
      <Trace.Collapsible open={open ?? (running && output.length > 0)} onOpenChange={setOpen}>
        <Trace.Trigger>
          <Trace.Line status={running ? 'running' : failed ? 'error' : undefined}>
            <Trace.Icon>
              <Icon name="terminal" />
            </Trace.Icon>
            <Trace.Title>
              {running ? 'Running' : failed ? 'Failed to run' : 'Ran'} {command}
            </Trace.Title>
            {failed && <Trace.Description>exit {exitCode}</Trace.Description>}
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content>
          <CodeBlock.Root size="sm">
            <CodeBlock.Content wrap className="max-h-64">
              {children ?? output}
            </CodeBlock.Content>
          </CodeBlock.Root>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
