import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatThread, Context, ModelSelector, PromptInput, Suggestion, type MessageLike } from '@mah-works/larch/ai';
import { Markdown } from '@mah-works/larch/ai/markdown';
import { useHighlightedCode } from '@mah-works/larch/ai/highlight';
import { Button } from '@mah-works/larch/button';
import { Tooltip } from '@mah-works/larch/tooltip';
import { Brand, Icon, Toast, useTheme, type IconName } from '@mah-works/larch';
import { useScriptedChat } from './agent.js';

const MODELS = { 'claude-opus-5-5': 'Claude Opus 5.5', 'claude-sonnet-5-5': 'Claude Sonnet 5.5' } as const;
type ModelId = keyof typeof MODELS;

const SUGGESTIONS = ['Which renewals are at risk?', 'Summarise this week’s activity'];

function Action({ label, icon, onClick }: { label: string; icon: IconName; onClick: () => void }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger variant="iconSm" aria-label={label} onClick={onClick}>
        <Icon name={icon} size="xs" />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={6}>
          <Tooltip.Popup>{label}</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const textOf = (message: MessageLike) =>
  message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('\n');

/** An agent chat assembled from Larch AI Elements, driven by a scripted stand-in for `useChat`. */
export default function AssistantApp() {
  const { messages, status, sendMessage, stop, regenerate } = useScriptedChat();
  const [model, setModel] = useState<ModelId>('claude-sonnet-5-5');
  const toastManager = Toast.useToastManager();
  const { isDark, toggleTheme } = useTheme();
  const used = messages.reduce((n, m) => n + textOf(m).length * 3 + 900, 0);

  return (
    <div className="flex h-screen flex-col bg-canvas text-ink">
      <header className="flex h-[61px] shrink-0 items-center gap-3 border-b border-line bg-sidebar px-5 mobile:px-[13px]">
        <Link to="/examples" aria-label="All examples" className="flex items-center gap-[10px] text-ink no-underline">
          <Brand suffix="assistant" />
        </Link>
        <div className="flex-1" />
        <Context used={used} limit={200_000} />
        <Button variant="icon" aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
          <Icon name={isDark ? 'moon' : 'sun'} />
        </Button>
      </header>

      <main className="min-h-0 flex-1">
        <ChatThread
          messages={messages}
          status={status}
          renderText={(text, { streaming }) => (
            <Markdown mode="streaming" isAnimating={streaming} highlight={useHighlightedCode}>
              {text}
            </Markdown>
          )}
          renderActions={(message, { streaming }) =>
            message.role === 'assistant' && !streaming ? (
              <>
                <Action
                  label="Copy"
                  icon="copy"
                  onClick={() => navigator.clipboard?.writeText(textOf(message)).then(() => toastManager.add({ title: 'Copied' }), () => {})}
                />
                <Action label="Retry" icon="refresh" onClick={regenerate} />
                <Action label="Good response" icon="thumbsUp" onClick={() => toastManager.add({ title: 'Thanks for the feedback' })} />
              </>
            ) : undefined
          }
          empty={
            <div className="flex flex-col items-center gap-2 pt-[12vh] text-center">
              <span className="grid size-11 place-items-center rounded-[12px] bg-blue-soft text-blue">
                <Icon name="sparkles" />
              </span>
              <h1 className="m-0 text-xl font-[650] tracking-[-.03em]">What should we look into?</h1>
              <p className="m-0 max-w-[420px] text-[13px] text-muted">
                The assistant can read your clients, renewals and activity. This demo is scripted — no model is called.
              </p>
            </div>
          }
        />
      </main>

      <div className="mx-auto w-full max-w-[760px] shrink-0 px-5 pb-5 mobile:px-[13px] mobile:pb-[13px]">
        {messages.length === 0 && (
          <Suggestion.Root className="mb-2" onSelect={(text) => sendMessage({ text })}>
            {SUGGESTIONS.map((s) => (
              <Suggestion.Item key={s} value={s} />
            ))}
          </Suggestion.Root>
        )}
        <PromptInput.Root
          accept="image/*,.pdf,.csv"
          maxFiles={4}
          onError={(error) => toastManager.add({ title: error.message })}
          onSubmit={({ text, files }) => sendMessage({ text: text || 'Sent with attachments', files })}
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
                    {Object.entries(MODELS).map(([id, name]) => (
                      <ModelSelector.Item key={id} value={id}>
                        {name}
                      </ModelSelector.Item>
                    ))}
                  </ModelSelector.RadioGroup>
                </ModelSelector.Content>
              </ModelSelector.Root>
            </PromptInput.Tools>
            <PromptInput.Submit status={status} onStop={stop} />
          </PromptInput.Footer>
        </PromptInput.Root>
      </div>
    </div>
  );
}
