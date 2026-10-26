import { Drawer } from '@mah-works/larch/drawer';
import { Badge, Icon } from '@mah-works/larch';

export const title = 'Side panel';
export const description = 'Set `swipeDirection="right"` on the Root; Larch places the sheet on that edge. Swipe or press Escape to dismiss.';

export default function SidePanel() {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger>
        <Icon name="window" size="sm" />
        Client details
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Content>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Drawer.Title>Aperture Labs</Drawer.Title>
                  <Drawer.Description>Enterprise · aperture.test</Drawer.Description>
                </div>
                <Drawer.Close variant="iconSm" aria-label="Close">
                  <Icon name="close" size="sm" />
                </Drawer.Close>
              </div>
              <dl className="mt-6 grid grid-cols-[100px_1fr] gap-y-3 text-xs">
                <dt className="text-muted">Status</dt>
                <dd className="m-0">
                  <Badge variant="active">Active</Badge>
                </dd>
                <dt className="text-muted">Owner</dt>
                <dd className="m-0 text-strong">Maria Costa</dd>
                <dt className="text-muted">Renewal</dt>
                <dd className="m-0 text-strong">Nov 12 · $24.8k</dd>
              </dl>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
