import { Accordion } from '@mah-works/larch/accordion';

export const title = 'Basic';
export const description =
  'Hairline-separated items with a CSS chevron. Panel height animates from Base UI’s measured `--accordion-panel-height`, so put padding on the content inside it.';
export const layout = 'padded';

const ITEMS = [
  ['Who owns a renewal?', 'The account owner on the client record. Reassign it from the client’s Overview tab.'],
  ['When are reminders sent?', '30, 14 and 3 days before the renewal date, to the owner and anyone watching the account.'],
  ['Can I export renewal history?', 'Yes — Reports → Saved reports → Renewals exports every renewal as CSV.'],
];

export default function Basic() {
  return (
    <Accordion.Root defaultValue={[0]} className="max-w-[460px]">
      {ITEMS.map(([q, a], i) => (
        <Accordion.Item key={q} value={i}>
          <Accordion.Header>
            <Accordion.Trigger>{q}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            <p className="m-0 pb-3">{a}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
