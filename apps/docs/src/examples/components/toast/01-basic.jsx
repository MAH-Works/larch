import { Button, useToast } from '@mah-works/larch';

export const title = 'Show a toast';
export const description = 'One toast at a time; a new message replaces the current one and resets the timer.';

export default function Basic() {
  const { showToast } = useToast();
  return (
    <>
      <Button variant="primary" onClick={() => showToast('View shared')}>
        Share view
      </Button>
      <Button onClick={() => showToast('Report export started')}>Export</Button>
      <Button variant="ghostDanger" onClick={() => showToast('Delete queued for 3 clients')}>
        Delete
      </Button>
    </>
  );
}
