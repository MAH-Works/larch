import { Link } from 'react-router-dom';
import * as Larch from '@mah-works/larch';
import { Icon } from '@mah-works/larch';
import { CodeBlock } from './CodeBlock.js';
import { Example } from './Example.js';
import { PropsTable } from './PropsTable.js';
import { DocHeader } from './Prose.js';
import { examplesFor, type BlockEntry, type ComponentEntry, type EntryKind } from './registry.js';

const importLine = (names: string[]) =>
  names.length > 4
    ? `import {\n${names.map((n) => `  ${n},`).join('\n')}\n} from '@mah-works/larch';`
    : `import { ${names.join(', ')} } from '@mah-works/larch';`;

// Base UI components import from a subpath that mirrors `@base-ui/react/<component>`.
const SUBPATH: Record<string, string> = { OTPField: 'otp-field', TextArea: 'input' };
const subpath = (name: string) => SUBPATH[name] ?? name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const baseImports = (names: string[]) => {
  const bySubpath: Record<string, string[]> = {};
  for (const n of names) (bySubpath[subpath(n)] ??= []).push(n);
  return Object.entries(bySubpath)
    .map(([path, list]) => `import { ${list.join(', ')} } from '@mah-works/larch/${path}';`)
    .join('\n');
};

/**
 * Which parts of a Larch export carry Larch styles, read from the library itself: styled parts are named
 * `<Export>.<Part>`; every other part is Base UI's own, passed through untouched.
 */
function partsOf(name: string) {
  const exp = (Larch as Record<string, unknown>)[name] as
    | ({ displayName?: string } & Record<string, { displayName?: string } | undefined>)
    | undefined;
  if (!exp) return null;
  if (exp.displayName === name) return { styled: [name], passthrough: [] };
  const parts = Object.keys(exp).filter((k) => /^[A-Z]/.test(k));
  const styled = parts.filter((k) => exp[k]?.displayName === `${name}.${k}`);
  return { styled, passthrough: parts.filter((k) => !styled.includes(k)) };
}

function BaseUiNote({ entry }: { entry: ComponentEntry & { base: string } }) {
  const parts = partsOf(entry.base);
  const href = `https://base-ui.com/react/components/${entry.baseUi}`;
  return (
    <section className="mb-10 rounded-[10px] border border-line bg-surface p-5 text-xs leading-relaxed text-body">
      <p className="m-0">
        <strong className="font-semibold text-ink">Base UI {entry.name}</strong>, styled by Larch. Parts, props, state attributes and
        behaviour are Base UI’s — see the{' '}
        <a href={href} target="_blank" rel="noreferrer" className="font-semibold text-blue no-underline hover:underline">
          Base UI API reference ↗
        </a>
        . Swap the import from <code className="font-mono text-[11px]">@base-ui/react/{subpath(entry.base)}</code> and the
        same code renders with Larch styles.
      </p>
      {parts && (
        <div className="mt-3 flex flex-wrap items-center gap-[6px]">
          <span className="text-[11px] text-muted">Styled parts:</span>
          {parts.styled.length ? (
            parts.styled.map((p) => (
              <Larch.Badge key={p} variant="blue">
                {p === entry.base ? p : `${entry.base}.${p}`}
              </Larch.Badge>
            ))
          ) : (
            <Larch.Badge variant="inactive">none — re-exported unchanged</Larch.Badge>
          )}
          {parts.passthrough.length > 0 && (
            <>
              <span className="ml-2 text-[11px] text-muted">Base UI as-is:</span>
              {parts.passthrough.map((p) => (
                <Larch.Badge key={p} variant="inactive">
                  {p}
                </Larch.Badge>
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
}

/** Shared template for a component or block page: header, import, examples, API, prev/next. */
type Entry = ComponentEntry | BlockEntry;

export function EntryPage({ kind, entry, prev, next }: { kind: EntryKind; entry: Entry; prev?: Entry; next?: Entry }) {
  const component = 'group' in entry ? entry : undefined;
  const baseName = component?.base;
  const tables = entry.props ?? component?.additions;
  const examples = examplesFor(kind, entry.slug);
  const base = kind === 'components' ? '/components' : '/blocks';

  return (
    <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,1fr)_180px] gap-10 px-[33px] pb-16 pt-[29px] narrow:grid-cols-1 tablet:px-5 mobile:px-[13px]">
      <article className="min-w-0">
        <DocHeader eyebrow={component?.group ?? 'Block'} title={entry.name} description={entry.description} />

        <CodeBlock className={baseName ? 'mb-4' : 'mb-10'} code={baseName ? baseImports(entry.imports) : importLine(entry.imports)} />
        {component && baseName && <BaseUiNote entry={{ ...component, base: baseName }} />}

        {examples.map((ex) => (
          <Example key={ex.id} {...ex} previewUrl={`${import.meta.env.BASE_URL}preview/${kind}/${entry.slug}/${ex.id}`} />
        ))}

        {tables && (
          <section id="api" className="scroll-mt-24">
            <h2 className="mb-1 mt-12 text-lg font-[650] tracking-[-.03em] text-ink">{baseName ? 'Larch additions' : 'API reference'}</h2>
            {baseName && (
              <p className="mb-4 mt-0 text-xs text-muted">Visual props and default content Larch adds. They never reach Base UI or the DOM.</p>
            )}
            {Object.entries(tables).map(([name, props]) => (
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
            {tables && (
              <li>
                <a href="#api" className="-ml-px block border-l border-transparent pl-3 text-muted no-underline hover:border-ink hover:text-ink">
                  {baseName ? 'Larch additions' : 'API reference'}
                </a>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}
