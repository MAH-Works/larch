import { Marker } from '@mah-works/larch/ai';
import { Icon } from '@mah-works/larch';

export const title = 'Variants';
export const description = 'Give in-progress markers `role="status"` so updates are announced; don’t give labelled separators a role.';
export const layout = 'padded';

export default function Variants() {
  return (
    <div className="flex max-w-[460px] flex-col gap-4">
      <Marker.Root role="status">
        <Marker.Icon>
          <Icon name="loader" className="animate-spin" />
        </Marker.Icon>
        <Marker.Content className="shimmer-text">Compacting conversation</Marker.Content>
      </Marker.Root>
      <Marker.Root>
        <Marker.Icon>
          <Icon name="check" />
        </Marker.Icon>
        <Marker.Content>Explored 4 files</Marker.Content>
      </Marker.Root>
      <Marker.Root variant="border">
        <Marker.Icon>
          <Icon name="document" />
        </Marker.Icon>
        <Marker.Content>Opened implementation notes</Marker.Content>
      </Marker.Root>
      <Marker.Root variant="separator">
        <Marker.Content>Today</Marker.Content>
      </Marker.Root>
      <Marker.Root render={<a href="#pr" />} className="text-blue no-underline hover:underline">
        <Marker.Content>View the pull request</Marker.Content>
      </Marker.Root>
    </div>
  );
}
