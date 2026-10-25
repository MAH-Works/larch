import { Alert } from '@mah-works/larch';

export const title = 'Tones';
export const layout = 'padded';

export default function Tones() {
  return (
    <div className="max-w-[420px]">
      <Alert tone="info" title="Heads up">Two clients have not been contacted this week.</Alert>
      <Alert tone="success" title="Saved">Your view is ready to share.</Alert>
      <Alert tone="warning" title="Review needed">One renewal is at risk.</Alert>
      <Alert tone="danger" title="Could not sync">Try again in a moment.</Alert>
    </div>
  );
}
