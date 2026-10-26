import { Trace } from '@mah-works/larch/ai';
import { Icon } from '@mah-works/larch';

export const title = 'Rows and states';
export const description =
  'Done rows have no status. Running titles shimmer, errors turn red, pending steps go faint. A Collapsible row expands into detail.';
export const layout = 'padded';

export default function Basic() {
  return (
    <Trace.Root className="max-w-[440px]">
      <Trace.Collapsible>
        <Trace.Trigger>
          <Trace.Line>
            <Trace.Icon>
              <Icon name="terminal" />
            </Trace.Icon>
            <Trace.Title>Ran node --version</Trace.Title>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content className="font-mono">v24.18.0</Trace.Content>
      </Trace.Collapsible>
      <Trace.Line>
        <Trace.Icon>
          <Icon name="fileCode" />
        </Trace.Icon>
        <Trace.Title>Edited app/billing.ts</Trace.Title>
        <Trace.Description>+12 −3</Trace.Description>
      </Trace.Line>
      <Trace.Line status="running">
        <Trace.Icon>
          <Icon name="terminal" />
        </Trace.Icon>
        <Trace.Title>Running pnpm build</Trace.Title>
      </Trace.Line>
      <Trace.Line status="error">
        <Trace.Icon>
          <Icon name="terminal" />
        </Trace.Icon>
        <Trace.Title>Failed to run pnpm lint</Trace.Title>
      </Trace.Line>
      <Trace.Line status="pending">
        <Trace.Icon>
          <Icon name="circle" />
        </Trace.Icon>
        <Trace.Title>Open a pull request</Trace.Title>
      </Trace.Line>
    </Trace.Root>
  );
}
