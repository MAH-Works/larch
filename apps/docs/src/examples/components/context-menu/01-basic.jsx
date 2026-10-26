import { ContextMenu } from '@mah-works/larch/context-menu';
import { Icon, Toast } from '@mah-works/larch';

export const title = 'Right-click a row';
export const description = 'ContextMenu shares every Menu style; its Trigger is the area that listens for the context-menu gesture.';

export default function Basic() {
  const toastManager = Toast.useToastManager();
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="flex h-[120px] w-full max-w-[360px] select-none items-center justify-center rounded-lg border border-dashed border-line-strong text-xs text-muted">
        Right-click (or long-press) here
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <ContextMenu.Item onClick={() => toastManager.add({ title: 'Opened Aperture Labs' })}>
              <Icon name="window" size="xs" className="text-[#9197a0]" /> Open
            </ContextMenu.Item>
            <ContextMenu.Item onClick={() => toastManager.add({ title: 'Link copied' })}>
              <Icon name="copy" size="xs" className="text-[#9197a0]" /> Copy link
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item className="text-red data-highlighted:bg-red-soft data-highlighted:text-red">
              <Icon name="trash" size="xs" /> Archive
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
