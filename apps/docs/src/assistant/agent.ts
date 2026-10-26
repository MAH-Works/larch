// A scripted stand-in for `useChat`, so the demo runs on static hosting. It emits the same shapes the
// AI SDK streams — reasoning, a tool call moving through its states, markdown text and sources — on timers.
import { useCallback, useRef, useState } from 'react';
import type { ChatStatus, MessageLike, MessagePart, ToolPart } from '@mah-works/larch/ai';

type Script = { reasoning: string; tool: { name: string; title: string; input: unknown; output: unknown }; text: string; sources: { url: string; title: string }[] };

const SCRIPTS: Script[] = [
  {
    reasoning: 'The user wants at-risk renewals. Query renewals in the next 30 days, then join the risk signals on each account.',
    tool: {
      name: 'queryRenewals',
      title: 'renewals due in 30 days',
      input: { days: 30, include: ['risk'] },
      output: [
        { account: 'Harbor & Co.', date: 'Nov 19', value: '$38.9k', risk: 'high' },
        { account: 'Aperture Labs', date: 'Nov 12', value: '$24.8k', risk: 'low' },
      ],
    },
    text:
      'Two renewals are due in the next 30 days, and **one is at risk**:\n\n' +
      '| Account | Date | Value | Risk |\n| --- | --- | --- | --- |\n| Harbor & Co. | Nov 19 | $38.9k | High |\n| Aperture Labs | Nov 12 | $24.8k | Low |\n\n' +
      'Harbor’s billing contact changed 9 days ago. To resend the reminder to the new contact:\n\n' +
      '```ts\nawait renewals.resend("harbor", { to: "dana@harbor.co" });\n```',
    sources: [
      { url: 'https://example.com/accounts/harbor', title: 'Harbor & Co. — account' },
      { url: 'https://example.com/renewals', title: 'Renewals calendar' },
    ],
  },
  {
    reasoning: 'Summarise activity from the last 7 days: completed tasks, new projects and contact changes.',
    tool: {
      name: 'listActivity',
      title: 'activity from the last 7 days',
      input: { since: '7d' },
      output: { tasks: 18, projects: 2, contacts: 3 },
    },
    text: 'This week the team closed **18 tasks**, started **2 projects** (Mobile app audit, Brand system) and updated **3 contacts**. Nothing is overdue.',
    sources: [{ url: 'https://example.com/activity', title: 'Activity feed' }],
  },
];

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => (clearTimeout(t), reject(new DOMException('Stopped', 'AbortError'))), { once: true });
  });

/** `{ messages, status, sendMessage, stop }`, like `useChat`, driven by a script instead of a model. */
export function useScriptedChat() {
  const [messages, setMessages] = useState<MessageLike[]>([]);
  const [status, setStatus] = useState<ChatStatus>('ready');
  const abort = useRef<AbortController | null>(null);
  const turn = useRef(0);

  const update = (id: string, parts: MessagePart[]) =>
    setMessages((all) => all.map((m) => (m.id === id ? { ...m, parts } : m)));

  const sendMessage = useCallback(async ({ text, files = [] }: { text: string; files?: File[] }) => {
    const n = turn.current++;
    const script = SCRIPTS[n % SCRIPTS.length]!;
    const fileParts: MessagePart[] = files.map((f) => ({ type: 'file', mediaType: f.type || 'application/octet-stream', filename: f.name, url: URL.createObjectURL(f) }));
    const id = `a${n}`;
    setMessages((all) => [...all, { id: `u${n}`, role: 'user', parts: [...fileParts, { type: 'text', text }] }]);
    setStatus('submitted');
    const controller = new AbortController();
    abort.current = controller;
    const { signal } = controller;

    const parts: MessagePart[] = [];
    try {
      await wait(700, signal);
      setMessages((all) => [...all, { id, role: 'assistant', parts: [] }]);
      setStatus('streaming');

      // Reasoning streams in.
      for (let i = 0; i <= script.reasoning.length; i += 5) {
        parts[0] = { type: 'reasoning', text: script.reasoning.slice(0, i), state: 'streaming' };
        update(id, [...parts]);
        await wait(30, signal);
      }
      parts[0] = { type: 'reasoning', text: script.reasoning, state: 'done' };

      // A tool call: input available → output available.
      const tool: ToolPart = { type: `tool-${script.tool.name}`, toolCallId: `${id}-tool`, title: script.tool.title, state: 'input-available', input: script.tool.input };
      parts[1] = tool;
      update(id, [...parts]);
      await wait(1400, signal);
      parts[1] = { ...tool, state: 'output-available', output: script.tool.output };

      // Text streams in.
      for (let i = 0; i <= script.text.length; i += 6) {
        parts[2] = { type: 'text', text: script.text.slice(0, i), state: 'streaming' };
        update(id, [...parts]);
        await wait(28, signal);
      }
      parts[2] = { type: 'text', text: script.text, state: 'done' };
      script.sources.forEach((s, i) => parts.push({ type: 'source-url', sourceId: `${id}-s${i}`, url: s.url, title: s.title }));
      update(id, [...parts]);
      setStatus('ready');
    } catch {
      // Stopped: keep what streamed so far; an unfinished tool call then reads as failed.
      update(id, parts.filter(Boolean));
      setStatus('ready');
    }
  }, []);

  const stop = useCallback(() => abort.current?.abort(), []);
  const regenerate = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    const text = lastUser?.parts.find((p): p is { type: 'text'; text: string } => p.type === 'text')?.text;
    if (text) sendMessage({ text });
  }, [messages, sendMessage]);

  return { messages, status, sendMessage, stop, regenerate, setMessages };
}
