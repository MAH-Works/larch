import { Button, EmptyState, Icon } from '@compass/ui';

export const title = 'With an action';
export const layout = 'padded';

export default function WithAction() {
  return (
    <EmptyState
      icon="search"
      title="No results for “acme”"
      description="Try a different name or clear the filters."
      action={
        <Button>
          <Icon name="close" size="sm" />
          Clear filters
        </Button>
      }
    />
  );
}
