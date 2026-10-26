import { useState, type ReactNode } from 'react';
import Icon, { type IconName } from '../components/Icon.js';
import { Trace } from './trace.js';
import { StatusIcon, traceStatus, type StepStatus } from './status.js';

export interface ThoughtStep {
  id?: string;
  title: ReactNode;
  status?: StepStatus;
  icon?: IconName;
  /** Detail shown when the step is expanded, e.g. search-result badges. */
  detail?: ReactNode;
}

export interface ChainOfThoughtProps {
  steps: ThoughtStep[];
  /** True while the agent is still researching (e.g. streaming and not yet answering). */
  running: boolean;
  /** Summary while running. */
  runningLabel?: ReactNode;
  /** Summary once finished; defaults to "Researched in N steps". */
  doneLabel?: ReactNode;
}

/** A summary that expands into the steps behind it. Open while running unless the reader chose otherwise. */
export function ChainOfThought({ steps, running, runningLabel = 'Researching', doneLabel }: ChainOfThoughtProps) {
  const [open, setOpen] = useState<boolean>();
  const failed = steps.some((s) => s.status === 'error');
  return (
    <Trace.Root>
      <Trace.Collapsible open={open ?? running} onOpenChange={setOpen}>
        <Trace.Trigger>
          <Trace.Line status={running ? 'running' : failed ? 'error' : undefined}>
            <Trace.Icon>
              <Icon name="sparkles" />
            </Trace.Icon>
            <Trace.Title>{running ? runningLabel : (doneLabel ?? `Researched in ${steps.length} steps`)}</Trace.Title>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content keepMounted>
          <Trace.Root>
            {steps.map((step, i) => {
              const s = step.status ?? 'done';
              const line = (
                <Trace.Line status={traceStatus(s)}>
                  <Trace.Icon>{step.icon ? <Icon name={step.icon} /> : <StatusIcon status={s} />}</Trace.Icon>
                  <Trace.Title>{step.title}</Trace.Title>
                </Trace.Line>
              );
              return step.detail ? (
                <Trace.Collapsible key={step.id ?? i}>
                  <Trace.Trigger>{line}</Trace.Trigger>
                  <Trace.Content className="flex flex-wrap gap-1.5">{step.detail}</Trace.Content>
                </Trace.Collapsible>
              ) : (
                <div key={step.id ?? i}>{line}</div>
              );
            })}
          </Trace.Root>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
