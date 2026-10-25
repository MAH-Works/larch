import { Badge } from '@larch/ui';

export const title = 'Status';
export const description = 'Lifecycle states. Green is healthy, blue is in progress, grey is dormant, red is gone or at risk.';

export default function Status() {
  return (
    <>
      <Badge variant="active">Active</Badge>
      <Badge variant="trial">Trial</Badge>
      <Badge variant="onboarding">Onboarding</Badge>
      <Badge variant="inactive">Inactive</Badge>
      <Badge variant="archived">Archived</Badge>
    </>
  );
}
