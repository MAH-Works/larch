import { Badge, Button, Icon } from '@compass/ui';

export const title = 'Count';
export const description = 'A compact 17px pill for counts, usually inside a ghost button.';

export default function Count() {
  return (
    <>
      <Badge variant="blue" count>
        2
      </Badge>
      <Badge variant="red" count>
        12
      </Badge>
      <Button variant="ghost">
        <Icon name="filter" size="sm" />
        Filter
        <Badge variant="blue" count>
          3
        </Badge>
      </Button>
    </>
  );
}
