// Structural types for agent UIs. They mirror the AI SDK's `UIMessage` shapes closely enough that the
// SDK's objects are assignable to them (see test/ai-sdk.tsx), but Larch never imports `ai` at runtime
// or in its published types, so apps without the AI SDK are unaffected.

/** Same values as the AI SDK's `ChatStatus` (what `useChat().status` returns). */
export type ChatStatus = 'submitted' | 'streaming' | 'ready' | 'error';

export type MessageRole = 'system' | 'user' | 'assistant';

/** Every state an AI SDK tool part moves through. */
export type ToolState =
  | 'input-streaming'
  | 'input-available'
  | 'approval-requested'
  | 'approval-responded'
  | 'output-available'
  | 'output-error'
  | 'output-denied';

export interface TextPart {
  type: 'text';
  text: string;
  state?: 'streaming' | 'done';
}

export interface ReasoningPart {
  type: 'reasoning';
  text: string;
  state?: 'streaming' | 'done';
}

export interface SourceUrlPart {
  type: 'source-url';
  sourceId: string;
  url: string;
  title?: string;
}

export interface FilePart {
  type: 'file';
  mediaType: string;
  filename?: string;
  url: string;
}

/** A static (`tool-<name>`) or dynamic tool call. `input` / `output` are left open on purpose. */
export interface ToolPart {
  type: `tool-${string}` | 'dynamic-tool';
  toolCallId: string;
  toolName?: string;
  title?: string;
  state: ToolState;
  input?: unknown;
  output?: unknown;
  errorText?: string;
  preliminary?: boolean;
  approval?: { id: string; approved?: boolean; reason?: string };
}

/** Any part Larch renders; other part types are passed through untouched by ChatThread. */
export type MessagePart = TextPart | ReasoningPart | SourceUrlPart | FilePart | ToolPart | { type: string };

/** The subset of the AI SDK's `UIMessage` that Larch reads. */
export interface MessageLike {
  id: string;
  role: MessageRole;
  parts: readonly MessagePart[];
  metadata?: unknown;
}

export const isToolPart = (part: { type: string }): part is ToolPart =>
  part.type === 'dynamic-tool' || part.type.startsWith('tool-');

/** `tool-runCommand` → `runCommand`; dynamic tools carry their name. */
export const toolName = (part: ToolPart): string =>
  part.type === 'dynamic-tool' ? (part.toolName ?? 'tool') : part.type.slice('tool-'.length);
