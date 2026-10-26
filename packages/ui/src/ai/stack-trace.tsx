import Icon from '../components/Icon.js';
import { FOCUS_RING } from '../base-ui/classes.js';
import { Trace } from './trace.js';

export interface StackFrame {
  /** The raw line, e.g. "at formatInvoice (app/lib/billing.ts:42:7)". */
  raw: string;
  fn?: string;
  file?: string;
  line?: number;
  /** Frames from node_modules or node: internals. */
  framework: boolean;
}

// V8 ("at fn (file:line:col)" / "at file:line:col") and Firefox/Safari ("fn@file:line:col") frames.
const FRAME = /^(?:at\s+)?(?:(.*?)\s+\(|(.*?)@)?((?:[a-z]+:\/\/)?[^\s()]+?):(\d+)(?::\d+)?\)?$/i;

/** Split a stack string into its error line and frames. */
export function parseStack(stack: string): { error: string; frames: StackFrame[] } {
  const [error = '', ...rest] = stack.split('\n').map((l) => l.trim()).filter(Boolean);
  const frames = rest.map((raw): StackFrame => {
    const m = FRAME.exec(raw);
    const file = m?.[3];
    return {
      raw,
      fn: m?.[1] || m?.[2] || undefined,
      file,
      line: m?.[4] ? Number(m[4]) : undefined,
      framework: !file || /node_modules|^node:|^internal\//.test(file),
    };
  });
  return { error, frames };
}

export interface StackTraceProps {
  /** A raw stack — e.g. a tool part's `errorText` when your `onError` returns `error.stack`. */
  stack: string;
  /** Make file paths buttons that open the file at that line. */
  onFrameClick?: (file: string, line?: number) => void;
  defaultOpen?: boolean;
}

/** A failed call and its stack frames; framework frames collapse into one "N framework frames" line. */
export function StackTrace({ stack, onFrameClick, defaultOpen }: StackTraceProps) {
  const { error, frames } = parseStack(stack);
  const own = frames.filter((f) => !f.framework);
  const framework = frames.length - own.length;

  return (
    <Trace.Root>
      <Trace.Collapsible defaultOpen={defaultOpen}>
        <Trace.Trigger>
          <Trace.Line status="error">
            <Trace.Icon>
              <Icon name="circleX" />
            </Trace.Icon>
            <Trace.Title>Failed: {error}</Trace.Title>
          </Trace.Line>
        </Trace.Trigger>
        <Trace.Content>
          {/* The title truncates, so the full error is repeated above the frames. */}
          <div className="rounded-md border border-line bg-head p-2.5 font-mono text-[11px] leading-[1.6]">
            <p className="m-0 mb-1.5 whitespace-pre-wrap text-red">{error}</p>
            <ol className="m-0 flex list-none flex-col p-0">
              {own.map((frame, i) => (
                <li key={i} className="flex min-w-0 gap-2 text-strong">
                  <Icon name="fileCode" size="xs" className="mt-[3px] text-faint" />
                  <span className="min-w-0 truncate">
                    {frame.fn && <span>{frame.fn} </span>}
                    {frame.file && onFrameClick ? (
                      <button
                        type="button"
                        onClick={() => onFrameClick(frame.file!, frame.line)}
                        className={`rounded-xs text-blue hover:underline ${FOCUS_RING}`}
                      >
                        {frame.file}:{frame.line}
                      </button>
                    ) : (
                      <span className="text-muted">{frame.file ? `${frame.file}:${frame.line}` : frame.raw}</span>
                    )}
                  </span>
                </li>
              ))}
              {framework > 0 && (
                <li className="flex gap-2 text-faint">
                  <Icon name="layers" size="xs" className="mt-[3px]" />
                  {framework} framework {framework === 1 ? 'frame' : 'frames'}
                </li>
              )}
            </ol>
          </div>
        </Trace.Content>
      </Trace.Collapsible>
    </Trace.Root>
  );
}
