import { Button, Icon, Tooltip } from '@compass/ui';

export const title = 'Hover or focus';

export default function Basic() {
  return (
    <>
      <Tooltip text="Use ⌘ K to focus search">
        <Button>
          <Icon name="keyboard" size="sm" />
          Hover for help
        </Button>
      </Tooltip>
      <Tooltip text="Export the current view as CSV">
        <Button variant="icon" aria-label="Export">
          <Icon name="download" />
        </Button>
      </Tooltip>
    </>
  );
}
