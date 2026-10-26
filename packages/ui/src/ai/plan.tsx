import type { ReactNode } from 'react';
import Icon from '../components/Icon.js';
import { Trace } from './trace.js';
import { StatusIcon, traceStatus, type StepStatus } from './status.js';

export interface PlanStep {
  title: ReactNode;
  status: Exclude<StepStatus, 'error'>;
}

export interface PlanProps {
  title: ReactNode;
  steps: PlanStep[];
  defaultOpen?: boolean;
}

/**
 * The steps an agent intends to take, each pending, running or done; the header counts what's done.
 * Stream it as a data part with a fixed `id` — the AI SDK replaces it in place as steps change. Use Task
 * instead when the steps aren't known up front.
 */
export function Plan({ title, steps, defaultOpen = true }: PlanProps) {
  const done = steps.filter((s) => s.status === 'done').length;
  const running = steps.some((s) => s.status === 'running');
  return (
    <Trace.Root>
      <Trace.Collapsible defaultOpen={defaultOpen}>
        <Trace.Trigger>
          <Trace.Line status={running ? 'running' : undefined}>
            <Trace.Icon>
              <Icon name="route" />
            </Trace.Icon>
            <Trace.Title>{title}</Trace.Title>
            <Trace.Description>
              {done} of {steps.length} done
            </Trace.Description>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content>
          <Trace.Root>
            {steps.map((step, i) => (
              <Trace.Line key={i} status={traceStatus(step.status)}>
                <Trace.Icon>
                  <StatusIcon status={step.status} name={step.status === 'running' ? 'circleDot' : undefined} />
                </Trace.Icon>
                <Trace.Title>{step.title}</Trace.Title>
              </Trace.Line>
            ))}
          </Trace.Root>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
