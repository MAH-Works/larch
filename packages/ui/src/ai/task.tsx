import type { ReactNode } from 'react';
import Icon, { type IconName } from '../components/Icon.js';
import { Trace } from './trace.js';
import { StatusIcon, traceStatus, type StepStatus } from './status.js';

export interface TaskStep {
  /** Present tense while running ("Updating the metadata"), past tense once done. */
  title: ReactNode;
  status?: StepStatus;
  icon?: IconName;
  /** Make the step a link, e.g. to the file it read. */
  href?: string;
}

export interface TaskProps {
  title: ReactNode;
  steps: TaskStep[];
  /** Overall status; defaults to running if any step runs, error if any failed. */
  status?: StepStatus;
  defaultOpen?: boolean;
}

/** Steps an agent takes as it discovers them (use Plan when they're known up front). */
export function Task({ title, steps, status, defaultOpen = true }: TaskProps) {
  const overall: StepStatus =
    status ?? (steps.some((s) => s.status === 'running') ? 'running' : steps.some((s) => s.status === 'error') ? 'error' : 'done');
  return (
    <Trace.Root>
      <Trace.Collapsible defaultOpen={defaultOpen}>
        <Trace.Trigger>
          <Trace.Line status={traceStatus(overall)}>
            <Trace.Title>{title}</Trace.Title>
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
              return step.href ? (
                <a key={i} href={step.href} className="rounded-[5px] no-underline hover:[&_*]:text-ink">
                  {line}
                </a>
              ) : (
                <div key={i}>{line}</div>
              );
            })}
          </Trace.Root>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
