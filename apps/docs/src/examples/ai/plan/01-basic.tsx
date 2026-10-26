import { Plan } from '@mah-works/larch/ai';

export const title = 'Basic';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[440px]">
      <Plan
        title="Migrate invoices to the new tax table"
        steps={[
          { title: 'Read the current invoice schema', status: 'done' },
          { title: 'Add a tax_rate column', status: 'done' },
          { title: 'Backfill rates for open invoices', status: 'running' },
          { title: 'Update the invoice PDF template', status: 'pending' },
          { title: 'Run the billing tests', status: 'pending' },
        ]}
      />
    </div>
  );
}
