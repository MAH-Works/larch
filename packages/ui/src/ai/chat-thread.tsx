import { Fragment, type ReactNode } from 'react';
import Icon from '../components/Icon.js';
import { Attachment } from './attachment.js';
import { Bubble } from './bubble.js';
import { Marker } from './marker.js';
import { Message } from './message.js';
import { MessageScroller } from './message-scroller.js';
import { Reasoning } from './reasoning.js';
import { Sources, uniqueSources } from './sources.js';
import { Tool } from './tool.js';
import { Trace } from './trace.js';
import {
  isToolPart,
  type ChatStatus,
  type FilePart,
  type MessageLike,
  type MessagePart,
  type ReasoningPart,
  type TextPart,
} from './types.js';

export interface PartContext {
  message: MessageLike;
  /** True while this message is the one being streamed. */
  streaming: boolean;
}

export interface ChatThreadProps {
  /** `useChat().messages` (or anything shaped like UIMessage). */
  messages: readonly MessageLike[];
  /** `useChat().status`. */
  status?: ChatStatus;
  /** Render a text part. Pass Larch's `Markdown` for assistant replies; defaults to pre-wrapped text. */
  renderText?: (text: string, ctx: PartContext & { part: TextPart }) => ReactNode;
  /** Render any other part (data parts, custom tool UIs). Return `undefined` to fall back to the default. */
  renderPart?: (part: MessagePart, ctx: PartContext) => ReactNode | undefined;
  /** A footer per message — copy, retry, feedback. */
  renderActions?: (message: MessageLike, ctx: { streaming: boolean }) => ReactNode;
  /** Shown when there are no messages. */
  empty?: ReactNode;
  /** Shown under the thread when `status` is `error`. */
  error?: ReactNode;
  className?: string;
}

const isTraceable = (part: MessagePart) => part.type === 'reasoning' || isToolPart(part);

function Files({ parts }: { parts: FilePart[] }) {
  if (parts.length === 0) return null;
  return (
    <Attachment.Group className="max-w-full">
      {parts.map((file, i) => (
        <Attachment.Root key={i} size="sm">
          <Attachment.Media variant={file.mediaType.startsWith('image/') ? 'image' : 'icon'}>
            {file.mediaType.startsWith('image/') ? <img src={file.url} alt="" /> : <Icon name="file" />}
          </Attachment.Media>
          <Attachment.Content>
            <Attachment.Title>{file.filename ?? 'Attachment'}</Attachment.Title>
            <Attachment.Description>{file.mediaType}</Attachment.Description>
          </Attachment.Content>
        </Attachment.Root>
      ))}
    </Attachment.Group>
  );
}

const plainText = (text: string) => <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-body">{text}</div>;

/** Consecutive reasoning and tool parts share one Trace so their rows stack as a single list. */
function groupParts(parts: readonly MessagePart[]): (MessagePart | MessagePart[])[] {
  const out: (MessagePart | MessagePart[])[] = [];
  for (const part of parts) {
    const last = out.at(-1);
    if (isTraceable(part) && Array.isArray(last)) last.push(part);
    else out.push(isTraceable(part) ? [part] : part);
  }
  return out;
}

function AssistantTurn({ message, streaming, renderText, renderPart }: { message: MessageLike; streaming: boolean } & Pick<ChatThreadProps, 'renderText' | 'renderPart'>) {
  const ctx = { message, streaming };
  const sources = uniqueSources(message.parts);
  return (
    <>
      {groupParts(message.parts).map((group, i) => {
        if (Array.isArray(group)) {
          return (
            <Trace.Root key={i} className="w-full">
              {group.map((part, j) => {
                const custom = renderPart?.(part, ctx);
                if (custom !== undefined) return <Fragment key={j}>{custom}</Fragment>;
                if (part.type === 'reasoning') {
                  const r = part as ReasoningPart;
                  return <Reasoning key={j} text={r.text} running={streaming && r.state === 'streaming'} />;
                }
                return isToolPart(part) ? <Tool key={j} part={part} streaming={streaming} /> : null;
              })}
            </Trace.Root>
          );
        }
        const custom = renderPart?.(group, ctx);
        if (custom !== undefined) return <Fragment key={i}>{custom}</Fragment>;
        if (group.type === 'text') {
          const part = group as TextPart;
          return <Fragment key={i}>{renderText ? renderText(part.text, { ...ctx, part }) : plainText(part.text)}</Fragment>;
        }
        return null;
      })}
      <Files parts={message.parts.filter((p): p is FilePart => p.type === 'file')} />
      <Sources sources={sources} />
    </>
  );
}

/**
 * A whole conversation: MessageScroller + Message + Bubble + Trace, mapping each UIMessage part to its
 * AI Element — text, reasoning, tool calls, sources and files. The person's turns are scroll anchors, so a
 * new question settles near the top and the reply streams in under it.
 *
 *   const { messages, status } = useChat();
 *   <ChatThread messages={messages} status={status} renderText={(text) => <Markdown>{text}</Markdown>} />
 */
export function ChatThread({ messages, status = 'ready', renderText, renderPart, renderActions, empty, error, className }: ChatThreadProps) {
  const last = messages.at(-1);
  const waiting = status === 'submitted' && last?.role === 'user';

  return (
    <MessageScroller.Provider autoScroll defaultScrollPosition="last-anchor">
      <MessageScroller.Root className={className}>
        <MessageScroller.Viewport aria-label="Conversation">
          <MessageScroller.Content>
            {messages.length === 0 && empty}
            {messages.map((message) => {
              const streaming = status === 'streaming' && message === last && message.role === 'assistant';
              const user = message.role === 'user';
              const actions = renderActions?.(message, { streaming });
              return (
                <MessageScroller.Item key={message.id} messageId={message.id} scrollAnchor={user}>
                  <Message.Root align={user ? 'end' : 'start'}>
                    <Message.Content className={user ? undefined : 'w-full gap-2'}>
                      {user ? (
                        <>
                          <Files parts={message.parts.filter((p): p is FilePart => p.type === 'file')} />
                          {message.parts
                            .filter((p): p is TextPart => p.type === 'text')
                            .map((part, i) => (
                              <Bubble.Root key={i} variant="muted" align="end">
                                <Bubble.Content className="whitespace-pre-wrap">{part.text}</Bubble.Content>
                              </Bubble.Root>
                            ))}
                        </>
                      ) : (
                        <AssistantTurn message={message} streaming={streaming} renderText={renderText} renderPart={renderPart} />
                      )}
                      {actions != null && <Message.Footer>{actions}</Message.Footer>}
                    </Message.Content>
                  </Message.Root>
                </MessageScroller.Item>
              );
            })}
            {waiting && (
              <Marker.Root role="status">
                <Marker.Icon>
                  <Icon name="loader" className="animate-spin" />
                </Marker.Icon>
                <Marker.Content className="shimmer-text">Thinking</Marker.Content>
              </Marker.Root>
            )}
            {status === 'error' && error != null && (
              <Marker.Root role="alert" className="text-red">
                <Marker.Icon className="text-red">
                  <Icon name="circleX" />
                </Marker.Icon>
                <Marker.Content>{error}</Marker.Content>
              </Marker.Root>
            )}
          </MessageScroller.Content>
        </MessageScroller.Viewport>
        <MessageScroller.Button aria-label="Scroll to the latest message" />
      </MessageScroller.Root>
    </MessageScroller.Provider>
  );
}
