import { useMemo, useState } from 'react';
import { Icon } from '@compass/ui';
import { highlight } from './highlight.js';

/** Highlighted, scrollable code with a copy button. */
export function CodeBlock({ code, className = '', maxHeight = 520, bare = false }) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlight(code.trim()), [code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  return (
    <div className={`group relative ${bare ? '' : 'rounded-lg border border-line'} bg-[var(--code-bg)] ${className}`}>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 z-[1] inline-flex h-7 items-center gap-1 rounded-md border border-line-strong bg-surface px-2 text-[11px] text-soft opacity-0 transition hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
      >
        <Icon name={copied ? 'check' : 'copy'} size="xs" />
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        style={{ maxHeight }}
        className="m-0 overflow-auto p-4 font-mono text-[12px] leading-[1.65] text-[var(--code-ink)]"
      >
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

/** Inline `code`. */
export function C({ children }) {
  return (
    <code className="rounded-[4px] border border-line bg-[var(--code-bg)] px-[5px] py-px font-mono text-[11.5px] text-strong">
      {children}
    </code>
  );
}

/** Render `backtick` spans in a plain string as inline code. */
export function md(text) {
  if (typeof text !== 'string' || !text.includes('`')) return text;
  return text.split(/`([^`]+)`/).map((part, i) => (i % 2 ? <C key={i}>{part}</C> : part));
}
