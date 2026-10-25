import { Button, Divider, Eyebrow, Icon, ToolbarDivider } from '@mah-works/larch';

export const title = 'Eyebrow, divider, toolbar divider';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[420px]">
      <Eyebrow>Form fields</Eyebrow>
      <p className="mb-0 mt-2 text-xs text-muted">Group related controls under a quiet uppercase label.</p>
      <Divider />
      <div className="flex items-center">
        <Button variant="ghost">
          <Icon name="filter" size="sm" />
          Filter
        </Button>
        <Button variant="ghost">
          <Icon name="sort" size="sm" />
          Sort
        </Button>
        <ToolbarDivider />
        <span className="text-[11px] text-faint">142 contacts</span>
      </div>
    </div>
  );
}
