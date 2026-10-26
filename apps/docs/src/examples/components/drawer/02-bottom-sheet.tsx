import { Drawer } from '@mah-works/larch/drawer';

export const title = 'Bottom sheet';
export const description = 'The default `swipeDirection` is `"down"`: a rounded sheet from the bottom edge, ideal on mobile.';

export default function BottomSheet() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Open bottom sheet</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" />
            <Drawer.Content className="max-w-[420px] text-center">
              <Drawer.Title>You’re all caught up</Drawer.Title>
              <Drawer.Description>No renewals need attention this week.</Drawer.Description>
              <div className="mt-5 flex justify-center">
                <Drawer.Close variant="primary">Close</Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
