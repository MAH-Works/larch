import { Tooltip } from '@mah-works/larch/tooltip';
import { Icon } from '@mah-works/larch';

export const title = 'Basic';
export const description =
  'Tooltip.Trigger is unstyled by default because it usually wraps another control; give it a Button `variant` instead of nesting a Button. A Provider lets adjacent tooltips open instantly.';

function Tip({ label, children }) {
  return (
    <Tooltip.Root>
      {children}
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup>
            <Tooltip.Arrow />
            {label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function Basic() {
  return (
    <Tooltip.Provider>
      <Tip label="Use ⌘ K to focus search">
        <Tooltip.Trigger variant="outline">
          <Icon name="keyboard" size="sm" />
          Hover for help
        </Tooltip.Trigger>
      </Tip>
      <Tip label="Export the current view as CSV">
        <Tooltip.Trigger variant="icon" aria-label="Export">
          <Icon name="download" />
        </Tooltip.Trigger>
      </Tip>
      <Tip label="Duplicate view">
        <Tooltip.Trigger variant="icon" aria-label="Duplicate">
          <Icon name="copy" />
        </Tooltip.Trigger>
      </Tip>
    </Tooltip.Provider>
  );
}
