import { Badge } from '@larch/ui';

export const title = 'Tags';
export const description = 'Classification tags share the same pill shape.';

export default function Tags() {
  return (
    <>
      <Badge variant="priority">High Priority</Badge>
      <Badge variant="low">Low Priority</Badge>
      <Badge variant="vip">VIP</Badge>
      <Badge variant="longterm">Long-term</Badge>
      <Badge variant="blue">Growth</Badge>
    </>
  );
}
