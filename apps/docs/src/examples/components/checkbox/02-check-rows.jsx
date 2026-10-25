import { CheckRow } from '@mah-works/larch';

export const title = 'Labelled options';
export const layout = 'padded';

export default function CheckRows() {
  return (
    <div>
      <CheckRow defaultChecked>Include archived clients</CheckRow>
      <CheckRow>Only overdue tasks</CheckRow>
      <CheckRow>Show billing in USD</CheckRow>
    </div>
  );
}
