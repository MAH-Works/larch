import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { merge, styled } from '../base-ui/styled.js';
import { button } from '../base-ui/classes.js';
import Icon from '../components/Icon.js';
import { part } from './part.js';

const Root = part(
  'div',
  'group/code relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-head text-body ' +
    'data-[variant=destructive]:border-[#ffd3d8] data-[variant=destructive]:bg-[#fff8f8] dark:data-[variant=destructive]:border-[#6b3039] dark:data-[variant=destructive]:bg-[#26171a]',
  {
    variants: { variant: { default: '', destructive: '' }, size: { default: '', sm: '' } },
    defaults: { variant: 'default', size: 'default' },
    attrs: { 'data-slot': 'code-block' },
    name: 'CodeBlock.Root',
  },
);

const Header = part('div', 'flex min-h-9 min-w-0 items-center gap-2 border-b border-line pl-3 pr-1.5 text-[11px] text-muted', {
  attrs: { 'data-slot': 'code-block-header' },
  name: 'CodeBlock.Header',
});

const Title = part('span', 'min-w-0 truncate font-medium text-strong', { name: 'CodeBlock.Title' });

// At the end of a header row; floats over the top-end corner when placed directly in the block.
const Actions = part(
  'div',
  'ms-auto flex shrink-0 items-center gap-0.5 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-1.5 [[data-slot=code-block]>&]:top-1.5 [[data-slot=code-block]>&]:z-1',
  { name: 'CodeBlock.Actions' },
);

const CopyAction = styled(BaseButton, undefined, { ...button('iconSm'), name: 'CodeBlock.CopyButton' });

/** Copies `value` (not the rendered text, so line numbers and diff markers never end up in the clipboard). */
function CopyButton({ value, onCopy, ...props }: ComponentProps<typeof CopyAction> & { value: string; onCopy?: () => void }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.();
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  return (
    <CopyAction aria-label={copied ? 'Copied' : 'Copy code'} onClick={copy} {...props}>
      <Icon name={copied ? 'check' : 'copy'} size="xs" />
      <span role="status" className="sr-only">
        {copied ? 'Copied' : ''}
      </span>
    </CopyAction>
  );
}
CopyButton.displayName = 'CodeBlock.CopyButton';

const CONTENT =
  'group/code-content m-0 min-w-0 overflow-auto p-3 font-mono text-[12px] leading-[1.6] [counter-reset:code-line_var(--start-line)] ' +
  'group-data-[size=sm]/code:p-2 group-data-[size=sm]/code:text-[11px] data-wrap:whitespace-pre-wrap data-wrap:break-words';

export type CodeBlockContentProps = ComponentProps<'pre'> & {
  /** Number each line (CSS counters, so numbers are never copied or read out). */
  lineNumbers?: boolean;
  /** First line number. */
  startLine?: number;
  /** Wrap long lines instead of scrolling sideways. */
  wrap?: boolean;
};

/**
 * The scrollable `<pre>`. Children are a string (cheap to stream into) or `CodeBlock.Line`s, e.g. the
 * output of `useHighlightedCode`. Numbered string content is split into lines for you.
 */
function Content({ children, lineNumbers, startLine = 1, wrap, className, style, ...props }: CodeBlockContentProps) {
  const lines =
    lineNumbers && typeof children === 'string'
      ? children.split('\n').map((text, i) => <Line key={i}>{text}</Line>)
      : children;
  return (
    <pre
      data-line-numbers={lineNumbers || undefined}
      data-wrap={wrap || undefined}
      dir="ltr"
      className={merge(CONTENT, className)}
      style={{ ['--start-line' as string]: startLine - 1, ...style }}
      {...props}
    >
      <code className="block min-w-full w-max group-data-wrap/code-content:w-auto">{lines}</code>
    </pre>
  );
}
Content.displayName = 'CodeBlock.Content';

const LINE_NUMBER =
  '[counter-increment:code-line] group-data-line-numbers/code-content:before:mr-4 group-data-line-numbers/code-content:before:inline-block group-data-line-numbers/code-content:before:w-[3ch] group-data-line-numbers/code-content:before:select-none group-data-line-numbers/code-content:before:text-right group-data-line-numbers/code-content:before:text-faint group-data-line-numbers/code-content:before:content-[counter(code-line)]';

const LineBase = part('span', `-mx-3 block min-h-[1.6em] px-3 ${LINE_NUMBER}`, {
  variants: {
    variant: {
      default: '',
      added: 'bg-[#e5f7ed] dark:bg-[#173c2e]',
      removed: 'bg-[#ffeaec] dark:bg-[#432129]',
      highlighted: 'bg-blue-soft',
    },
  },
  defaults: { variant: 'default' },
  name: 'CodeBlock.Line',
});

const MARK = { added: '+', removed: '−' } as const;

/** One line. `added` / `removed` also print a +/− marker, so a diff never relies on colour alone. */
function Line({ variant, children, ...props }: ComponentProps<typeof LineBase>) {
  const mark = variant === 'added' || variant === 'removed' ? MARK[variant] : null;
  return (
    <LineBase variant={variant} {...props}>
      {mark && (
        <span aria-hidden="true" className={`mr-2 inline-block w-[1ch] select-none ${variant === 'added' ? 'text-green' : 'text-red'}`}>
          {mark}
        </span>
      )}
      {children}
    </LineBase>
  );
}
Line.displayName = 'CodeBlock.Line';

const Footer = part('div', 'flex items-center justify-center gap-2 border-t border-line p-1.5', { name: 'CodeBlock.Footer' });

/**
 * Code, terminal output, logs and diffs: an optional header with a title and actions, line numbers,
 * wrapping and highlighted or diff lines. Highlighting is opt-in through `@mah-works/larch/ai/highlight`.
 */
export const CodeBlock = { Root, Header, Title, Actions, CopyButton, Content, Line, Footer };
