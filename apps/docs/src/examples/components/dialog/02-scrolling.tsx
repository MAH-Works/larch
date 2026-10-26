import { Dialog } from '@mah-works/larch/dialog';
import { ScrollArea } from '@mah-works/larch/scroll-area';

export const title = 'Viewport and long content';
export const description =
  'Wrap the popup in `Dialog.Viewport` (as in Base UI’s anatomy) and Larch lays the dialog out inside it; a ScrollArea keeps long content inside the popup.';

const EVENTS = Array.from({ length: 24 }, (_, i) => `Week ${i + 1} · health check logged`);

export default function Scrolling() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View history</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Title>Aperture Labs history</Dialog.Title>
            <Dialog.Description>Every health check since onboarding.</Dialog.Description>
            <ScrollArea.Root className="-mx-[19px] mt-4 h-[260px] border-y border-line">
              <ScrollArea.Viewport>
                <ScrollArea.Content className="px-[19px] py-2">
                  {EVENTS.map((e) => (
                    <p key={e} className="m-0 border-b border-line-soft py-2 text-xs text-body last:border-0">
                      {e}
                    </p>
                  ))}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <div className="mt-4 flex justify-end">
              <Dialog.Close>Done</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
