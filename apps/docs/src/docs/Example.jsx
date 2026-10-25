import { useState } from 'react';
import { Icon } from '@compass/ui';
import { CodeBlock, md } from './CodeBlock.jsx';

// Example files export `title` / `description` metadata; hide those lines from the displayed source.
const clean = (source) =>
  source
    .replace(/^export const (title|description|layout) = [\s\S]*?;\n/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const PREVIEW = {
  center: 'flex min-h-[180px] flex-wrap content-center items-center justify-center gap-3 p-8 mobile:p-5',
  padded: 'p-6 mobile:p-4',
  canvas: 'bg-canvas p-6 mobile:p-4',
  full: 'bg-canvas',
};

/** Live preview + source tabs for one example module. `layout="frame"` renders it in an iframe at full viewport semantics. */
export function Example({ id, title, description, layout = 'center', Component, source, previewUrl }) {
  const [tab, setTab] = useState('preview');
  const tabClass = (on) =>
    `relative h-9 px-3 text-xs ${
      on
        ? 'font-semibold text-ink after:absolute after:inset-x-2 after:-bottom-px after:h-[2px] after:rounded-t-sm after:bg-blue'
        : 'text-[#9298a1] hover:text-ink'
    }`;

  return (
    <section id={id} className="mb-10 scroll-mt-24">
      {title && (
        <h3 className="mb-1 mt-0 text-[15px] font-[650] tracking-[-.02em] text-ink">
          <a href={`#${id}`} className="text-[inherit] no-underline hover:underline">
            {title}
          </a>
        </h3>
      )}
      {description && <p className="mb-3 mt-0 max-w-[68ch] text-[13px] leading-relaxed text-muted">{md(description)}</p>}

      <div className="overflow-hidden rounded-[10px] border border-line bg-surface shadow-card">
        <div role="tablist" className="flex items-center gap-1 border-b border-line px-2">
          <button type="button" role="tab" aria-selected={tab === 'preview'} className={tabClass(tab === 'preview')} onClick={() => setTab('preview')}>
            Preview
          </button>
          <button type="button" role="tab" aria-selected={tab === 'code'} className={tabClass(tab === 'code')} onClick={() => setTab('code')}>
            Code
          </button>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex h-7 items-center gap-1 rounded-md px-2 text-[11px] text-soft no-underline hover:bg-hover hover:text-ink"
            >
              Open in new tab <Icon name="arrowRight" size="xs" />
            </a>
          )}
        </div>
        {tab === 'code' ? (
          <CodeBlock code={clean(source)} bare maxHeight={640} />
        ) : layout === 'frame' ? (
          <iframe title={title} src={previewUrl} className="block h-[620px] w-full border-0 bg-canvas" />
        ) : (
          <div className={PREVIEW[layout]}>
            <Component />
          </div>
        )}
      </div>
    </section>
  );
}
