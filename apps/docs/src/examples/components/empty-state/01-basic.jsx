import { EmptyState } from '@larch/ui';

export const title = 'Basic';
export const layout = 'padded';

export default function Basic() {
  return <EmptyState title="No clients yet" description="Add your first client to get started." />;
}
