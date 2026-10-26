import { useState } from 'react';
import { ModelSelector } from '@mah-works/larch/ai';

export const title = 'Model and reasoning effort';
export const description = 'Two menus side by side, as in a prompt footer. Arrow keys and type-ahead come from Base UI’s Menu.';
export const layout = 'padded';

const EFFORT = { low: 'Low', medium: 'Medium', high: 'High' } as const;

export default function Basic() {
  const [model, setModel] = useState('claude-opus-5-5');
  const [effort, setEffort] = useState<keyof typeof EFFORT>('medium');
  return (
    <div className="flex items-center gap-1 rounded-lg border border-line bg-surface p-1">
      <ModelSelector.Root>
        <ModelSelector.Trigger>{model === 'claude-opus-5-5' ? 'Claude Opus 5.5' : 'Claude Haiku 5.5'}</ModelSelector.Trigger>
        <ModelSelector.Content side="bottom">
          <ModelSelector.RadioGroup value={model} onValueChange={(v) => setModel(String(v))}>
            <ModelSelector.Item value="claude-opus-5-5">Claude Opus 5.5</ModelSelector.Item>
            <ModelSelector.Item value="claude-haiku-5-5">Claude Haiku 5.5</ModelSelector.Item>
          </ModelSelector.RadioGroup>
        </ModelSelector.Content>
      </ModelSelector.Root>
      <ModelSelector.Root>
        <ModelSelector.Trigger>{EFFORT[effort]} effort</ModelSelector.Trigger>
        <ModelSelector.Content side="bottom">
          <ModelSelector.RadioGroup value={effort} onValueChange={(v) => setEffort(v as keyof typeof EFFORT)}>
            <ModelSelector.Label>Reasoning effort</ModelSelector.Label>
            {Object.entries(EFFORT).map(([value, label]) => (
              <ModelSelector.Item key={value} value={value}>
                {label}
              </ModelSelector.Item>
            ))}
          </ModelSelector.RadioGroup>
        </ModelSelector.Content>
      </ModelSelector.Root>
    </div>
  );
}
