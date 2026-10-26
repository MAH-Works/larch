import { Suggestion } from '@mah-works/larch/ai';
import { Toast } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'Clicking sends the suggestion as the message — `sendMessage({ text: value })` with the AI SDK.';
export const layout = 'padded';

const SUGGESTIONS = ['Which renewals are at risk?', 'Summarise this week’s activity', 'Draft a reminder for Harbor & Co.', 'Show unpaid invoices'];

export default function Basic() {
  const toastManager = Toast.useToastManager();
  return (
    <Suggestion.Root className="max-w-[520px]" onSelect={(text) => toastManager.add({ title: `Sent: ${text}` })}>
      {SUGGESTIONS.map((s) => (
        <Suggestion.Item key={s} value={s} />
      ))}
    </Suggestion.Root>
  );
}
