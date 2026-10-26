import { Link } from 'react-router-dom';
import { Button, EmptyState, PageWrap } from '@mah-works/larch';

export default function NotFound() {
  return (
    <PageWrap max="max-w-[640px]">
      <EmptyState
        icon="search"
        title="Page not found"
        description="That page doesn't exist in the Larch docs."
        action={
          <Button render={<Link to="/" />} nativeButton={false} variant="primary">
            Back to introduction
          </Button>
        }
      />
    </PageWrap>
  );
}
