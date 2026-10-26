import { useState } from 'react';
import { ModelSelector, PromptInput, type ChatStatus } from '@mah-works/larch/ai';
import { Toast } from '@mah-works/larch';

export const title = 'With attachments and a model menu';
export const description =
  'Attach with the paperclip, drop files on the field or paste them. Enter sends; Shift+Enter adds a line. While a reply is in flight the send button becomes Stop.';
export const layout = 'padded';

const MODELS = { 'claude-opus-5-5': 'Claude Opus 5.5', 'claude-sonnet-5-5': 'Claude Sonnet 5.5', 'gpt-5': 'GPT-5' } as const;
type ModelId = keyof typeof MODELS;

export default function Basic() {
  const toastManager = Toast.useToastManager();
  const [model, setModel] = useState<ModelId>('claude-sonnet-5-5');
  const [status, setStatus] = useState<ChatStatus>('ready');

  return (
    <div className="max-w-[600px]">
      <PromptInput.Root
        accept="image/*,.pdf,.csv"
        maxFiles={4}
        maxFileSize={10 * 1024 ** 2}
        onError={(error) => toastManager.add({ title: error.message })}
        onSubmit={({ text, files }) => {
          toastManager.add({ title: `Sent to ${MODELS[model]}`, description: `${text || '(no text)'} · ${files.length} file(s)` });
          setStatus('streaming');
          setTimeout(() => setStatus('ready'), 2500);
        }}
      >
        <PromptInput.Attachments />
        <PromptInput.Textarea placeholder="Ask about clients, renewals or invoices…" />
        <PromptInput.Footer>
          <PromptInput.Tools>
            <PromptInput.AttachButton />
            <ModelSelector.Root>
              <ModelSelector.Trigger>{MODELS[model]}</ModelSelector.Trigger>
              <ModelSelector.Content>
                <ModelSelector.RadioGroup value={model} onValueChange={(v) => setModel(v as ModelId)}>
                  <ModelSelector.Label>Anthropic</ModelSelector.Label>
                  <ModelSelector.Item value="claude-opus-5-5" description="Most capable">
                    Claude Opus 5.5
                  </ModelSelector.Item>
                  <ModelSelector.Item value="claude-sonnet-5-5" description="Fast and balanced">
                    Claude Sonnet 5.5
                  </ModelSelector.Item>
                  <ModelSelector.Separator />
                  <ModelSelector.Label>OpenAI</ModelSelector.Label>
                  <ModelSelector.Item value="gpt-5">GPT-5</ModelSelector.Item>
                </ModelSelector.RadioGroup>
              </ModelSelector.Content>
            </ModelSelector.Root>
          </PromptInput.Tools>
          <PromptInput.Submit status={status} onStop={() => setStatus('ready')} />
        </PromptInput.Footer>
      </PromptInput.Root>
    </div>
  );
}
