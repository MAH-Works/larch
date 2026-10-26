import { StackTrace } from '@mah-works/larch/ai';
import { Toast } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'Your frames stay visible; node_modules frames fold into one line. File paths can open the file.';
export const layout = 'padded';

const STACK = `TypeError: Cannot read properties of undefined (reading 'email')
    at formatInvoice (app/lib/billing.ts:42:18)
    at sendRenewal (app/jobs/renewals.ts:17:9)
    at runJob (node_modules/@acme/queue/dist/index.js:88:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)`;

export default function Basic() {
  const toastManager = Toast.useToastManager();
  return (
    <div className="max-w-[520px]">
      <StackTrace stack={STACK} defaultOpen onFrameClick={(file, line) => toastManager.add({ title: `Open ${file}:${line}` })} />
    </div>
  );
}
