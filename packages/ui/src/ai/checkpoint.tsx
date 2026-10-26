import type { ReactNode } from 'react';
import { Button } from '../base-ui/button.js';
import { Marker } from './marker.js';

export interface CheckpointProps {
  label: ReactNode;
  /** Keep this turn and everything before it: `setMessages(messages.slice(0, index + 1))`. */
  onRestore: () => void;
  restoreLabel?: ReactNode;
}

/** A point in the conversation you can return to: a separator marker with a Restore button. */
export function Checkpoint({ label, onRestore, restoreLabel = 'Restore' }: CheckpointProps) {
  return (
    <Marker.Root variant="separator">
      <Marker.Content className="inline-flex items-center gap-2">
        {label}
        <Button variant="outline" className="h-6 px-2 text-[11px]" onClick={onRestore}>
          {restoreLabel}
        </Button>
      </Marker.Content>
    </Marker.Root>
  );
}
