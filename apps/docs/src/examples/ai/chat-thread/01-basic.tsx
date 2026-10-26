import { ChatThread, type MessageLike } from '@mah-works/larch/ai';
import { Markdown } from '@mah-works/larch/ai/markdown';
import { useHighlightedCode } from '@mah-works/larch/ai/highlight';

export const title = 'A finished conversation';
export const description =
  'Messages shaped like the AI SDK’s UIMessage: reasoning and tool parts stack into one Trace, text renders through Markdown, sources collect at the end.';
export const layout = 'padded';

const MESSAGES: MessageLike[] = [
  { id: 'u1', role: 'user', parts: [{ type: 'text', text: 'Why did the Harbor & Co. renewal get flagged?' }] },
  {
    id: 'a1',
    role: 'assistant',
    parts: [
      { type: 'reasoning', text: 'Check the account’s risk signals, then the billing history.', state: 'done' },
      { type: 'tool-getAccount', toolCallId: 't1', state: 'output-available', title: 'Harbor & Co. account', input: { id: 'harbor' }, output: { risk: 'high', reason: 'billing contact changed' } },
      {
        type: 'text',
        text: 'Harbor was flagged because its **billing contact changed** 9 days before renewal. Update the contact, then resend:\n\n```ts\nawait renewals.resend("harbor", { to: newContact });\n```',
      },
      { type: 'source-url', sourceId: 's1', url: 'https://example.com/accounts/harbor', title: 'Harbor & Co. — account' },
    ],
  },
];

export default function Basic() {
  return (
    <div className="h-[460px] overflow-hidden rounded-[10px] border border-line bg-canvas">
      <ChatThread messages={MESSAGES} renderText={(text) => <Markdown highlight={useHighlightedCode}>{text}</Markdown>} />
    </div>
  );
}
