import { Queue } from '@mah-works/larch/ai';

export const title = 'Basic';
export const description = 'Todos with a description become expandable. In-progress todos shimmer while streaming.';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[440px]">
      <Queue
        streaming
        todos={[
          { title: 'Fix the focus ring on the select trigger', status: 'in_progress', description: 'It is clipped by overflow-hidden on the field.' },
          { title: 'Add tests for the combobox', status: 'pending' },
          { title: 'Update the registry snapshots', status: 'pending' },
          { title: 'Add a changeset', status: 'completed' },
        ]}
      />
    </div>
  );
}
