// Type-level tests for AI Elements, checked by `pnpm typecheck`. The AI SDK's own types must be assignable
// to Larch's structural ones, so `useChat()` output drops straight into the components.
import type { ChatStatus as SdkChatStatus, DynamicToolUIPart, ReasoningUIPart, SourceUrlUIPart, ToolUIPart, UIMessage } from 'ai';
import {
  Bubble,
  ChatThread,
  Context,
  Marker,
  PromptInput,
  Reasoning,
  Sources,
  Tool,
  Trace,
  uniqueSources,
  type ChatStatus,
  type MessageLike,
  type ReasoningPart,
  type SourceUrlPart,
  type ToolPart,
} from '../src/ai/index.js';

declare const message: UIMessage;
declare const messages: UIMessage[];
declare const sdkStatus: SdkChatStatus;
declare const toolPart: ToolUIPart;
declare const dynamicTool: DynamicToolUIPart;
declare const reasoning: ReasoningUIPart;
declare const source: SourceUrlUIPart;

export const assignable = {
  message: message satisfies MessageLike,
  status: sdkStatus satisfies ChatStatus,
  tool: toolPart satisfies ToolPart,
  dynamicTool: dynamicTool satisfies ToolPart,
  reasoning: reasoning satisfies ReasoningPart,
  source: source satisfies SourceUrlPart,
};

export function Usage() {
  return (
    <>
      <ChatThread messages={messages} status={sdkStatus} renderText={(text) => text} />
      <Trace.Root>
        <Tool part={toolPart} streaming={sdkStatus === 'streaming'} />
        <Reasoning text={reasoning.text} running={reasoning.state === 'streaming'} />
        {/* @ts-expect-error `done` is expressed by omitting status */}
        <Trace.Line status="done" />
      </Trace.Root>
      <Sources sources={uniqueSources(message.parts)} />
      <PromptInput.Root onSubmit={({ text, files }) => [text, files]}>
        <PromptInput.Textarea />
        <PromptInput.Submit status={sdkStatus} onStop={() => {}} />
      </PromptInput.Root>
      <Bubble.Root variant="tinted" align="end" />
      {/* @ts-expect-error unknown bubble variant */}
      <Bubble.Root variant="loud" />
      <Marker.Root variant="separator" />
      <Context used={1200} limit={128000} />
    </>
  );
}
