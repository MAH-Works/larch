import { useState, type ReactNode } from 'react';
import Badge from '../components/Badge.js';
import { Trace } from './trace.js';
import { StatusIcon, traceStatus, type StepStatus } from './status.js';

export interface SubagentCall {
  title: ReactNode;
  status: Exclude<StepStatus, 'pending'>;
}

export interface SubagentProps {
  name: ReactNode;
  /** The instruction the subagent received. */
  task: ReactNode;
  status: Exclude<StepStatus, 'pending'>;
  model?: string;
  tools?: string[];
  /** e.g. "14s". */
  duration?: ReactNode;
  calls?: SubagentCall[];
  /** The subagent's findings, shown once it finishes. */
  result?: ReactNode;
}

/**
 * A subagent run with its tool calls and result. With the AI SDK: input streaming / available or a
 * `preliminary` output → running; final output → done; error, or still running after the chat stops → error.
 */
export function Subagent({ name, task, status, model, tools = [], duration, calls = [], result }: SubagentProps) {
  const [open, setOpen] = useState<boolean>();
  const verb = status === 'running' ? 'Running' : status === 'error' ? 'Failed to run' : 'Ran';
  return (
    <Trace.Root>
      <Trace.Collapsible open={open ?? status === 'running'} onOpenChange={setOpen}>
        <Trace.Trigger>
          <Trace.Line status={traceStatus(status)}>
            <Trace.Icon>
              <StatusIcon status={status} />
            </Trace.Icon>
            <Trace.Title>
              {verb} the {name} agent
            </Trace.Title>
            {duration != null && <Trace.Description>{duration}</Trace.Description>}
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content keepMounted>
          <div className="flex flex-col gap-2.5">
            <p className="m-0 leading-relaxed text-body">{task}</p>
            {(model || tools.length > 0) && (
              <div className="flex flex-wrap gap-1">
                {model && <Badge variant="blue">{model}</Badge>}
                {tools.map((tool) => (
                  <Badge key={tool}>{tool}</Badge>
                ))}
              </div>
            )}
            {calls.length > 0 && (
              <Trace.Root>
                {calls.map((call, i) => (
                  <Trace.Line key={i} status={traceStatus(call.status)}>
                    <Trace.Icon>
                      <StatusIcon status={call.status} />
                    </Trace.Icon>
                    <Trace.Title>{call.title}</Trace.Title>
                  </Trace.Line>
                ))}
              </Trace.Root>
            )}
            {result != null && <div className="rounded-md border border-line bg-head p-2.5 leading-relaxed">{result}</div>}
          </div>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
