import type { ReactNode } from 'react';
import Icon from '../components/Icon.js';
import { CodeBlock } from './code-block.js';
import { Trace } from './trace.js';

export interface TestCase {
  name: ReactNode;
  status: 'passed' | 'failed' | 'skipped';
  /** Failure message (and optionally its stack location). */
  message?: string;
  duration?: ReactNode;
}

export interface TestSuite {
  name: ReactNode;
  tests: TestCase[];
}

const summary = (tests: TestCase[]) => {
  const failed = tests.filter((t) => t.status === 'failed').length;
  const skipped = tests.filter((t) => t.status === 'skipped').length;
  return [`${tests.length} ${tests.length === 1 ? 'test' : 'tests'}`, failed && `${failed} failed`, skipped && `${skipped} skipped`]
    .filter(Boolean)
    .join(', ');
};

function TestLine({ test }: { test: TestCase }) {
  const failed = test.status === 'failed';
  const line = (
    <Trace.Line status={failed ? 'error' : test.status === 'skipped' ? 'pending' : undefined}>
      <Trace.Icon>
        <Icon name={failed ? 'close' : test.status === 'skipped' ? 'circleDashed' : 'check'} />
      </Trace.Icon>
      <Trace.Title>{test.name}</Trace.Title>
      {test.duration != null && <Trace.Description>{test.duration}</Trace.Description>}
    </Trace.Line>
  );
  if (!failed || !test.message) return line;
  return (
    <Trace.Collapsible defaultOpen>
      <Trace.Trigger>{line}</Trace.Trigger>
      <Trace.Content>
        <CodeBlock.Root size="sm" variant="destructive">
          <CodeBlock.Content wrap className="max-h-64">
            {test.message}
          </CodeBlock.Content>
        </CodeBlock.Root>
      </Trace.Content>
    </Trace.Collapsible>
  );
}

/** A test run: "Ran 14 tests, 2 failed", suites that open only when something in them failed. */
export function TestResults({ suites }: { suites: TestSuite[] }) {
  const all = suites.flatMap((s) => s.tests);
  const failed = all.some((t) => t.status === 'failed');
  return (
    <Trace.Root>
      <Trace.Collapsible defaultOpen={failed}>
        <Trace.Trigger>
          <Trace.Line status={failed ? 'error' : undefined}>
            <Trace.Icon>
              <Icon name="flask" />
            </Trace.Icon>
            <Trace.Title>Ran {summary(all)}</Trace.Title>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content>
          <Trace.Root>
            {suites.map((suite, i) => {
              const suiteFailed = suite.tests.some((t) => t.status === 'failed');
              return (
                <Trace.Collapsible key={i} defaultOpen={suiteFailed}>
                  <Trace.Trigger>
                    <Trace.Line status={suiteFailed ? 'error' : undefined}>
                      <Trace.Icon>
                        <Icon name="fileCode" />
                      </Trace.Icon>
                      <Trace.Title>
                        {suite.name}, {summary(suite.tests)}
                      </Trace.Title>
                    </Trace.Line>
                  </Trace.Trigger>
                  <Trace.Content>
                    <Trace.Root>
                      {suite.tests.map((test, j) => (
                        <TestLine key={j} test={test} />
                      ))}
                    </Trace.Root>
                  </Trace.Content>
                </Trace.Collapsible>
              );
            })}
          </Trace.Root>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
