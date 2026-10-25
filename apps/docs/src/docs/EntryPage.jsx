import { Link } from 'react-router-dom';
import { Icon } from '@mah-works/larch';
import { CodeBlock } from './CodeBlock.jsx';
import { Example } from './Example.jsx';
import { PropsTable } from './PropsTable.jsx';
import { DocHeader } from './Prose.jsx';
import { examplesFor } from './registry.js';

const importLine = (names) =>
  names.length > 4
    ? `import {\n${names.map((n) => `  ${n},`).join('\n')}\n} from '@mah-works/larch';`
    : `import { ${names.join(', ')} } from '@mah-works/larch';`;

/** Shared template for a component or block page: header, import, examples, API, prev/next. */
export function EntryPage({ kind, entry, prev, next }) {
  const examples = examplesFor(kind, entry.slug);
  const base = kind === 'components' ? '/components' : '/blocks';

  return (
    <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,1fr)_180px] gap-10 px-[33px] pb-16 pt-[29px] narrow:grid-cols-1 tablet:px-5 mobile:px-[13px]">
      <article className="min-w-0">
        <DocHeader eyebrow={kind === 'components' ? entry.group : 'Block'} title={entry.name} description={entry.description} />

        <CodeBlock className="mb-10" code={importLine(entry.imports)} />

        {examples.map((ex) => (
          <Example key={ex.id} {...ex} previewUrl={`${import.meta.env.BASE_URL}preview/${kind}/${entry.slug}/${ex.id}`} />
        ))}

        {entry.props && (
          <section id="api" className="scroll-mt-24">
            <h2 className="mb-4 mt-12 text-lg font-[650] tracking-[-.03em] text-ink">API reference</h2>
            {Object.entries(entry.props).map(([name, props]) => (
              <PropsTable key={name} name={name} props={props} />
            ))}
          </section>
        )}

        <nav className="mt-14 flex justify-between gap-4 border-t border-line pt-6 text-xs">
          {prev ? (
            <Link to={`${base}/${prev.slug}`} className="group flex flex-col gap-1 no-underline">
              <span className="text-faint">Previous</span>
              <span className="inline-flex items-center gap-1 font-semibold text-ink group-hover:text-blue">
                <Icon name="chevronLeft" size="xs" /> {prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`${base}/${next.slug}`} className="group flex flex-col items-end gap-1 no-underline">
              <span className="text-faint">Next</span>
              <span className="inline-flex items-center gap-1 font-semibold text-ink group-hover:text-blue">
                {next.name} <Icon name="chevronRight" size="xs" />
              </span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="narrow:hidden">
        <div className="sticky top-6">
          <p className="mb-3 mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-label">On this page</p>
          <ul className="m-0 flex list-none flex-col gap-2 border-l border-line p-0 text-xs">
            {examples.map((ex) => (
              <li key={ex.id}>
                <a href={`#${ex.id}`} className="-ml-px block border-l border-transparent pl-3 text-muted no-underline hover:border-ink hover:text-ink">
                  {ex.title}
                </a>
              </li>
            ))}
            {entry.props && (
              <li>
                <a href="#api" className="-ml-px block border-l border-transparent pl-3 text-muted no-underline hover:border-ink hover:text-ink">
                  API reference
                </a>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}
