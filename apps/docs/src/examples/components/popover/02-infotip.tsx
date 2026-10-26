import { Popover } from '@mah-works/larch/popover';
import { Icon } from '@mah-works/larch';

export const title = 'Infotip on hover';
export const description =
  'Base UI recommends a Popover with `openOnHover` (not a Tooltip) for info icons, so touch and screen-reader users can reach the content.';

export default function Infotip() {
  return (
    <div className="flex items-center gap-1 text-xs text-muted">
      Net revenue retention
      <Popover.Root>
        <Popover.Trigger openOnHover delay={150} variant="iconSm" aria-label="What is net revenue retention?">
          <Icon name="info" size="xs" />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={6} side="top">
            <Popover.Popup className="max-w-[240px]">
              <Popover.Arrow />
              <Popover.Description className="mt-0">
                Revenue kept from existing clients over 12 months, including expansion and minus churn.
              </Popover.Description>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
