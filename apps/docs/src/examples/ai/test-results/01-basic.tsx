import { TestResults } from '@mah-works/larch/ai';

export const title = 'Basic';
export const description = 'Only suites with a failure open by default.';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[480px]">
      <TestResults
        suites={[
          {
            name: 'billing.test.ts',
            tests: [
              { name: 'creates an invoice', status: 'passed', duration: '12ms' },
              { name: 'applies the tax rate', status: 'passed', duration: '8ms' },
            ],
          },
          {
            name: 'renewals.test.ts',
            tests: [
              { name: 'sends the 30-day reminder', status: 'passed' },
              { name: 'retries a failed charge', status: 'failed', message: 'Expected 2 charge attempts, received 1\n  at Object.<anonymous> (src/renewals.test.ts:58:22)' },
              { name: 'emails the new billing contact', status: 'skipped' },
            ],
          },
        ]}
      />
    </div>
  );
}
