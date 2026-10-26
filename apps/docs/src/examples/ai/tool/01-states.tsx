import { Trace, Tool, type ToolPart } from '@mah-works/larch/ai';

export const title = 'Every state';
export const description = 'The same component for each AI SDK tool state. Finished calls expand into their output or error.';
export const layout = 'padded';

const call = (state: ToolPart['state'], extra: Partial<ToolPart> = {}): ToolPart => ({
  type: 'tool-runCommand',
  toolCallId: state,
  state,
  input: { command: 'pnpm test' },
  ...extra,
});

const PARTS: ToolPart[] = [
  call('input-available'),
  call('approval-requested', { approval: { id: 'a1' } }),
  call('output-available', { output: '✓ 48 tests passed in 3.1s' }),
  call('output-error', { errorText: 'Error: Cannot find module "./billing"' }),
  call('output-denied', { approval: { id: 'a2', approved: false } }),
];

export default function States() {
  return (
    <Trace.Root className="max-w-[480px]">
      {PARTS.map((part) => (
        <Tool key={part.toolCallId} part={part} streaming={part.state === 'input-available'} label="pnpm test" />
      ))}
    </Trace.Root>
  );
}
