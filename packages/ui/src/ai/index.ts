// Larch AI Elements — shadcn/ui's AI Elements rebuilt on Larch's Base UI parts and tokens.
// Not re-exported from the package root. Markdown (`./markdown`) and highlighting (`./highlight`) are
// separate entries because they load optional peers (Streamdown, Shiki).

// Types shaped like the AI SDK's UIMessage parts
export * from './types.js';

// Building blocks
export { MessageScroller, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility } from './message-scroller.js';
export type { MessageScrollerScrollOptions } from './message-scroller.js';
export { Message } from './message.js';
export { Bubble, BUBBLE_VARIANTS } from './bubble.js';
export { Marker } from './marker.js';
export { Attachment, type AttachmentState } from './attachment.js';
export { Trace, type TraceStatus } from './trace.js';
export { CodeBlock, type CodeBlockContentProps } from './code-block.js';
export { Questionnaire, type QuestionnaireItemDefinition, type QuestionnaireItemStatus } from './questionnaire.js';
export { StatusIcon, traceStatus, type StepStatus } from './status.js';

// Patterns
export { ChainOfThought, type ChainOfThoughtProps, type ThoughtStep } from './chain-of-thought.js';
export { Checkpoint, type CheckpointProps } from './checkpoint.js';
export { Confirmation, type ConfirmationProps } from './confirmation.js';
export { Context, type ContextProps } from './context.js';
export { FileTree, type FileTreeNode, type FileTreeProps, type FileChange } from './file-tree.js';
export { InlineCitation, type InlineCitationProps } from './inline-citation.js';
export { ModelSelector, type ModelSelectorContentProps } from './model-selector.js';
export { Plan, type PlanProps, type PlanStep } from './plan.js';
export {
  PromptInput,
  usePromptInput,
  type PromptFile,
  type PromptInputError,
  type PromptInputMessage,
  type PromptInputRootProps,
  type PromptInputSubmitProps,
} from './prompt-input.js';
export { Queue, type QueueProps, type QueueTodo } from './queue.js';
export { Reasoning, type ReasoningProps } from './reasoning.js';
export { Sources, hostname, uniqueSources, type SourcesProps } from './sources.js';
export { StackTrace, parseStack, type StackFrame, type StackTraceProps } from './stack-trace.js';
export { Subagent, type SubagentCall, type SubagentProps } from './subagent.js';
export { Suggestion } from './suggestion.js';
export { Task, type TaskProps, type TaskStep } from './task.js';
export { Terminal, type TerminalProps } from './terminal.js';
export { TestResults, type TestCase, type TestSuite } from './test-results.js';
export { Tool, type ToolProps } from './tool.js';

// Block
export { ChatThread, type ChatThreadProps, type PartContext } from './chat-thread.js';
