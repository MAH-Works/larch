import { Dropdown, useToast } from '@larch/ui';

export const title = 'Action menu';
export const description = 'Icons are optional; `danger` items render in red. Click outside or press Escape to close.';

export default function Basic() {
  const { showToast } = useToast();
  return (
    <Dropdown
      label="More actions"
      items={[
        { label: 'Export view', icon: 'download', onSelect: () => showToast('Export view') },
        { label: 'Duplicate view', icon: 'copy', onSelect: () => showToast('Duplicate view') },
        { label: 'Delete view', icon: 'trash', danger: true, onSelect: () => showToast('Delete view') },
      ]}
    />
  );
}
