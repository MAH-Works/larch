import { Link } from 'react-router-dom';
import { Button, EmptyState, PageWrap } from '@larch/ui';

export default function NotFound() {
  return (
    <PageWrap max="max-w-[640px]">
      <EmptyState
        icon="search"
        title="Page not found"
        description="That page doesn't exist in the Larch docs."
        action={
          <Button as={Link} to="/" variant="primary">
            Back to introduction
          </Button>
        }
      />
    </PageWrap>
  );
}
