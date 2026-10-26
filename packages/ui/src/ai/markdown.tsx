import { memo, type ReactNode } from 'react';
import { Streamdown, useIsCodeFenceIncomplete, type ExtraProps, type StreamdownProps } from 'streamdown';
import { merge } from '../base-ui/styled.js';
import { CodeBlock } from './code-block.js';

// Opt-in entry (`@mah-works/larch/ai/markdown`): the only Larch module that loads Streamdown, an optional
// peer. Streamdown ships Tailwind classes — add `@source "…/node_modules/streamdown/dist/*.js";` to your CSS.

/** A hook that turns code into one node per line, e.g. `useHighlightedCode` from `@mah-works/larch/ai/highlight`. */
export type HighlightHook = (code: string, language?: string) => ReactNode[];

type Element = NonNullable<ExtraProps['node']>;

const PROSE =
  'min-w-0 text-[13px] leading-relaxed text-body [overflow-wrap:anywhere] ' +
  '[&_a]:font-medium [&_a]:text-blue [&_a]:no-underline [&_a:hover]:underline ' +
  '[&_strong]:text-strong [&_h1]:text-base [&_h2]:text-[15px] [&_h3]:text-[13px] [&_h1,&_h2,&_h3]:font-[650] [&_h1,&_h2,&_h3]:tracking-[-.02em] [&_h1,&_h2,&_h3]:text-ink ' +
  '[&_blockquote]:border-l-2 [&_blockquote]:border-line-strong [&_blockquote]:pl-3 [&_blockquote]:text-muted ' +
  '[&_hr]:border-line [&_table]:text-xs [&_th]:bg-head [&_th]:text-label [&_td]:border-line [&_th]:border-line';

const INLINE_CODE = 'rounded-[4px] border border-line bg-head px-[5px] py-px font-mono text-[11.5px] text-strong';

function codeOf(node: Element | undefined): { code: string; language?: string } {
  const child = node?.children[0];
  if (!child || child.type !== 'element') return { code: '' };
  const className = child.properties.className;
  const language = (Array.isArray(className) ? className : [])
    .map(String)
    .find((c) => c.startsWith('language-'))
    ?.slice('language-'.length);
  const code = child.children.map((n: Element['children'][number]) => (n.type === 'text' ? n.value : '')).join('');
  return { code: code.replace(/\n$/, ''), language };
}

function FencedCode({ node, highlight }: { node?: Element; highlight?: HighlightHook }) {
  const { code, language } = codeOf(node);
  // `highlight` must be a stable hook (like useHighlightedCode); it is called on every render.
  const lines = highlight?.(code, language);
  const incomplete = useIsCodeFenceIncomplete();
  return (
    <CodeBlock.Root className="my-3">
      <CodeBlock.Header>
        <CodeBlock.Title>{language ?? 'text'}</CodeBlock.Title>
        <CodeBlock.Actions>
          <CodeBlock.CopyButton value={code} disabled={incomplete} />
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content className="max-h-[400px]">
        {lines ? lines.map((line, i) => <CodeBlock.Line key={i}>{line}</CodeBlock.Line>) : code}
      </CodeBlock.Content>
    </CodeBlock.Root>
  );
}

export type MarkdownProps = StreamdownProps & {
  /** Highlight fenced code, e.g. `highlight={useHighlightedCode}`. Plain text otherwise. */
  highlight?: HighlightHook;
};

/**
 * Streaming markdown for assistant replies, on Streamdown: incomplete syntax (an unclosed `**` or code
 * fence) renders sensibly mid-stream. Fenced code renders as a Larch CodeBlock with a copy button that
 * stays disabled until the closing fence arrives.
 */
export const Markdown = memo(function Markdown({ className, components, highlight, ...props }: MarkdownProps) {
  return (
    <Streamdown
      className={merge(PROSE, className)}
      components={{
        pre: ({ node }) => <FencedCode node={node} highlight={highlight} />,
        inlineCode: ({ node: _node, className: inlineClass, ...rest }) => <code className={merge(INLINE_CODE, inlineClass)} {...rest} />,
        ...components,
      }}
      {...props}
    />
  );
});
