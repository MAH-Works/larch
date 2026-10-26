import { Bubble, Message } from '@mah-works/larch/ai';
import { Avatar } from '@mah-works/larch/avatar';
import { Tooltip } from '@mah-works/larch/tooltip';
import { Icon } from '@mah-works/larch';

export const title = 'A turn each way';
export const description = '`align="end"` puts the person’s turn on the right. The footer follows the message side; the avatar lifts above it.';
export const layout = 'padded';

function Action({ label, icon }: { label: string; icon: 'copy' | 'refresh' | 'thumbsUp' | 'thumbsDown' }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger variant="iconSm" aria-label={label}>
        <Icon name={icon} size="xs" />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={6}>
          <Tooltip.Popup>{label}</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function Basic() {
  return (
    <div className="flex max-w-[560px] flex-col gap-5">
      <Message.Root align="end">
        <Message.Content>
          <Bubble.Root variant="muted">
            <Bubble.Content>Draft a renewal reminder for Harbor & Co.</Bubble.Content>
          </Bubble.Root>
        </Message.Content>
      </Message.Root>
      <Message.Root>
        <Message.Avatar>
          <Avatar.Root tone="purple" size="sm">
            <Avatar.Fallback>AI</Avatar.Fallback>
          </Avatar.Root>
        </Message.Avatar>
        <Message.Content>
          <Message.Header>Compass assistant</Message.Header>
          <Bubble.Root variant="outline">
            <Bubble.Content>
              Hi Dana — your Harbor & Co. plan renews on Nov 19. Since your billing contact changed, could you confirm who should receive
              the invoice?
            </Bubble.Content>
          </Bubble.Root>
          <Message.Footer>
            <Action label="Copy" icon="copy" />
            <Action label="Retry" icon="refresh" />
            <Action label="Good response" icon="thumbsUp" />
            <Action label="Bad response" icon="thumbsDown" />
          </Message.Footer>
        </Message.Content>
      </Message.Root>
    </div>
  );
}
