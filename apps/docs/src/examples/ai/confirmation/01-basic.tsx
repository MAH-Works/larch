import { useState } from 'react';
import { Confirmation, Tool, Trace, type ToolPart } from '@mah-works/larch/ai';

export const title = 'Approve before running';
export const description = 'Once answered, the call becomes a Tool line — approved runs, denied reads “Denied”.';
export const layout = 'padded';

export default function Basic() {
  const [part, setPart] = useState<ToolPart>({
    type: 'tool-runCommand',
    toolCallId: 'c1',
    state: 'approval-requested',
    input: { command: 'pnpm db:migrate' },
    approval: { id: 'ap1' },
  });

  if (part.state === 'approval-requested') {
    return (
      <div className="max-w-[520px]">
        <Confirmation
          title="Run pnpm db:migrate?"
          description="The command runs against the staging database."
          onApprove={() => setPart({ ...part, state: 'output-available', output: 'Applied 2 migrations.' })}
          onDeny={() => setPart({ ...part, state: 'output-denied', approval: { id: 'ap1', approved: false } })}
        />
      </div>
    );
  }
  return (
    <Trace.Root className="max-w-[520px]">
      <Tool part={part} streaming={false} label="pnpm db:migrate" />
    </Trace.Root>
  );
}
