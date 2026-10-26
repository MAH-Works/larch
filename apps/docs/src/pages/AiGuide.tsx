import { Link } from 'react-router-dom';
import { Alert } from '@mah-works/larch';
import { C, CodeBlock, md } from '../docs/CodeBlock.js';
import { DocHeader, Prose } from '../docs/Prose.js';

const Code = ({ children }: { children: string }) => <CodeBlock className="my-4" code={children} />;

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-[10px] border border-line bg-surface">
      <table className="w-full min-w-[620px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-head text-[11px] text-label">
            {head.map((h) => (
              <th key={h} className="h-9 border-b border-line px-[14px] font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="align-top [&:last-child>td]:border-b-0">
              {row.map((cell, i) => (
                <td key={i} className={`border-b border-line px-[14px] py-[10px] leading-relaxed ${i === 0 ? 'whitespace-nowrap font-mono text-[11.5px] text-strong' : 'text-body'}`}>
                  {md(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ENTRIES = [
  ['@mah-works/larch/ai', 'Every element, the `ChatThread` block and the AI SDK-shaped types.', '`@shadcn/react` (a dependency)'],
  ['@mah-works/larch/ai/markdown', '`Markdown` — streaming replies.', '`streamdown` (optional peer)'],
  ['@mah-works/larch/ai/highlight', '`useHighlightedCode`, `highlightCode`.', '`shiki` (optional peer, loaded lazily)'],
];

const NAMES = [
  ['ConversationContent · MessageScroller…', 'MessageScroller.Viewport / .Content / .Item'],
  ['MessageContent · MessageFooter', 'Message.Content / Message.Footer'],
  ['MessageResponse (Vercel)', '`<Markdown>` from `@mah-works/larch/ai/markdown`'],
  ['TraceLine · TraceCollapsibleTrigger', 'Trace.Line / Trace.Trigger'],
  ['PromptInputTextarea · PromptInputSubmit', 'PromptInput.Textarea / PromptInput.Submit'],
  ['ReasoningLine · ToolLine (shadcn pattern code)', '`<Reasoning text running />` · `<Tool part streaming />`'],
];

const NOT_REBUILT = [
  ['Artifact, Image, Snippet, Web Preview', 'Card, an `<img>`, an Input, an `<iframe>` — Larch’s Card, Input and Button compose these.'],
  ['Canvas, Node, Edge, Connection, Controls, Panel, Toolbar', 'React Flow with Larch Card and Toolbar.'],
  ['Audio Player, Mic / Voice Selector, Speech Input, Transcription, Persona', 'An `<audio>` element, Combobox, the Web Speech API, Buttons; Persona is a Rive animation.'],
  ['Environment Variables, Package Info, Schema Display, Sandbox, JSX Preview', 'Badge, Switch, Collapsible, Tabs and Code Block; a JSX parser for previews.'],
];

export default function AiGuide() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader
        eyebrow="Getting started"
        title="AI Elements"
        description="shadcn/ui’s AI Elements — the chat building blocks and the agent patterns made from them — rebuilt on Larch’s Base UI parts and tokens."
      />
      <Prose>
        <p>
          shadcn/ui shipped AI Elements in October 2026, replacing Vercel’s AI SDK Elements (deprecated at the end of November 2026).
          Larch recreates that catalog: <strong>building blocks</strong> (Message Scroller, Message, Bubble, Marker, Attachment, Trace,
          Code Block, Markdown, Questionnaire) and <strong>patterns</strong> built from them (Prompt Input, Reasoning, Tool, Plan,
          Sources…). Try them together in the <Link to="/examples/assistant">assistant example</Link>.
        </p>

        <h2>Install</h2>
      </Prose>
      <Code>{`pnpm add @mah-works/larch @base-ui/react
# Optional, only if you use them:
pnpm add streamdown   # @mah-works/larch/ai/markdown
pnpm add shiki        # @mah-works/larch/ai/highlight`}</Code>
      <Code>{`/* index.css — Streamdown ships Tailwind classes in its dist */
@import 'tailwindcss';
@import '@mah-works/larch/theme.css';
@source '../node_modules/streamdown/dist/*.js';`}</Code>
      <Prose>
        <p>
          AI Elements are <strong>not</strong> exported from the package root, so apps that don’t use them never load their
          dependencies. There are three entries:
        </p>
      </Prose>
      <Table head={['Import', 'Contains', 'Loads']} rows={ENTRIES} />

      <Prose>
        <h2>With the AI SDK</h2>
        <p>
          Elements accept the AI SDK’s shapes — <C>UIMessage</C> parts, <C>ChatStatus</C>, tool parts with their states — through
          structural types, so <C>useChat()</C> output drops straight in. Larch never imports <C>ai</C>; it’s an optional peer, and
          a type test keeps the shapes compatible.
        </p>
      </Prose>
      <Code>{`import { useChat } from '@ai-sdk/react';
import { ChatThread, PromptInput } from '@mah-works/larch/ai';
import { Markdown } from '@mah-works/larch/ai/markdown';
import { useHighlightedCode } from '@mah-works/larch/ai/highlight';

export function Assistant() {
  const { messages, status, sendMessage, stop } = useChat();
  return (
    <div className="flex h-screen flex-col">
      <ChatThread
        className="flex-1"
        messages={messages}
        status={status}
        renderText={(text, { streaming }) => (
          <Markdown mode="streaming" isAnimating={streaming} highlight={useHighlightedCode}>{text}</Markdown>
        )}
      />
      <PromptInput.Root onSubmit={({ text, files }) => sendMessage({ text, files })}>
        <PromptInput.Attachments />
        <PromptInput.Textarea placeholder="Ask anything" />
        <PromptInput.Footer>
          <PromptInput.AttachButton />
          <PromptInput.Submit status={status} onStop={stop} />
        </PromptInput.Footer>
      </PromptInput.Root>
    </div>
  );
}`}</Code>

      <Prose>
        <h2>Two kinds of element</h2>
        <ul>
          <li>
            <strong>Namespaces</strong> — the building blocks, Prompt Input, Model Selector and Suggestion — compose like Base UI:{' '}
            <C>{'<Trace.Line status="running">'}</C>. Every part takes <C>render</C>, merges your <C>className</C> after Larch’s
            defaults, and exposes its variants as data attributes (<C>variant="ghost"</C> → <C>data-variant="ghost"</C>).
          </li>
          <li>
            <strong>Data-driven components</strong> — Reasoning, Tool, Plan, Queue, Task, Chain of Thought, Sources, Stack Trace,
            Subagent, Terminal, Test Results, File Tree, Context, Confirmation, Checkpoint, Inline Citation. In shadcn these are
            snippets you copy; Larch ships them as typed components that take AI SDK data. Need something different? Compose{' '}
            <Link to="/ai/trace">Trace</Link> directly — they’re built the same way.
          </li>
        </ul>
        <p>
          <C>ChatThread</C> is the shadcn “Chat” and “Message” patterns as one block: Message Scroller, Message and Bubble, with each
          part mapped to its element. Use <C>renderPart</C> for your own data parts and <C>renderActions</C> for a footer.
        </p>

        <h2>Coming from shadcn or AI SDK Elements</h2>
        <p>Flat exports become namespaces, and pattern snippets become components:</p>
      </Prose>
      <Table head={['shadcn / AI SDK Elements', 'Larch']} rows={NAMES} />

      <Prose>
        <h2>Not rebuilt</h2>
        <p>
          Like shadcn, Larch didn’t rebuild AI SDK Elements that saw little use. Each is a small composition of existing components:
        </p>
      </Prose>
      <Table head={['AI SDK Elements', 'Build it from']} rows={NOT_REBUILT} />

      <Alert tone="info" title="Behaviour comes from libraries, not Larch">
        Scroll anchoring and the questionnaire come from <C>@shadcn/react</C>; menus, popovers, collapsibles and fields from Base UI;
        streaming markdown from Streamdown; highlighting from Shiki. Larch adds the styles, the AI SDK-shaped types and the patterns.
      </Alert>
    </div>
  );
}
