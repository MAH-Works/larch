import type { ReactNode } from 'react';
import Icon from '../components/Icon.js';
import { Trace } from './trace.js';

export interface QueueTodo {
  id?: string;
  title: ReactNode;
  /** Optional detail; a todo with one becomes expandable. */
  description?: ReactNode;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface QueueProps {
  todos: QueueTodo[];
  /** In-progress todos only shimmer while the chat streams. */
  streaming?: boolean;
}

function Todo({ todo, streaming }: { todo: QueueTodo; streaming: boolean }) {
  const icon = todo.status === 'completed' ? 'circleCheck' : todo.status === 'in_progress' ? 'circleDot' : 'circle';
  const line = (
    <Trace.Line status={todo.status === 'in_progress' && streaming ? 'running' : undefined}>
      <Trace.Icon>
        <Icon name={icon} />
      </Trace.Icon>
      <Trace.Title>{todo.title}</Trace.Title>
    </Trace.Line>
  );
  if (!todo.description) return line;
  return (
    <Trace.Collapsible>
      <Trace.Trigger>{line}</Trace.Trigger>
      <Trace.Content className="text-muted">{todo.description}</Trace.Content>
    </Trace.Collapsible>
  );
}

/**
 * An agent's todo list, split into "to do" and "completed". With a `writeTodos`-style tool, read the
 * latest call whose input has finished streaming:
 *
 *   const todos = message.parts.filter((p) => p.type === 'tool-writeTodos' && p.state !== 'input-streaming').at(-1)?.input?.todos;
 */
export function Queue({ todos, streaming = false }: QueueProps) {
  const open = todos.filter((t) => t.status !== 'completed');
  const completed = todos.filter((t) => t.status === 'completed');
  const section = (label: string, icon: 'listTodo' | 'circleCheck', items: QueueTodo[], defaultOpen: boolean) =>
    items.length > 0 && (
      <Trace.Collapsible defaultOpen={defaultOpen}>
        <Trace.Trigger>
          <Trace.Line>
            <Trace.Icon>
              <Icon name={icon} />
            </Trace.Icon>
            <Trace.Title>{label}</Trace.Title>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content>
          <Trace.Root>
            {items.map((todo, i) => (
              <Todo key={todo.id ?? i} todo={todo} streaming={streaming} />
            ))}
          </Trace.Root>
        </Trace.Content>
      </Trace.Collapsible>
    );
  return (
    <Trace.Root>
      {section(`${open.length} to do`, 'listTodo', open, true)}
      {section(`${completed.length} completed`, 'circleCheck', completed, false)}
    </Trace.Root>
  );
}
