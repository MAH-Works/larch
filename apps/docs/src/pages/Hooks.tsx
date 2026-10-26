import { Link } from 'react-router-dom';
import { C, CodeBlock } from '../docs/CodeBlock.js';
import { PropsTable } from '../docs/PropsTable.js';
import { DocHeader, Prose } from '../docs/Prose.js';

const Code = ({ children }: { children: string }) => <CodeBlock className="my-4" code={children} />;

export default function Hooks() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader eyebrow="Foundations" title="Hooks" description="Small behaviour helpers the components use internally, exported for your own UI." />
      <Prose>
        <h2>useSelection</h2>
        <p>
          Set-based row selection. Pairs with <C>ClientsTable</C> and <C>SelectionToolbar</C> — see the{' '}
          <Link to="/blocks/data-table">data table block</Link>.
        </p>
      </Prose>
      <Code>{`const { selected, count, toggle, toggleAll, clear } = useSelection(['aperture']);

<Checkbox.Root checked={selected.has(row.id)} onCheckedChange={(checked) => toggle(row.id, checked)}>
  <Checkbox.Indicator />
</Checkbox.Root>`}</Code>
      <PropsTable
        name="useSelection(initial?)"
        props={[
          ['selected', 'Set<id>', '', 'Current selection.'],
          ['count', 'number', '', 'selected.size.'],
          ['toggle', '(id, checked) => void', '', 'Add / remove one id.'],
          ['toggleAll', '(ids, checked) => void', '', 'Add / remove many ids (a page).'],
          ['clear', '() => void', '', 'Empty the selection.'],
          ['setSelected', 'Dispatch<Set>', '', 'Escape hatch.'],
        ]}
      />

      <Prose>
        <h2>useHotkey</h2>
        <p>
          Runs a handler on <C>⌘</C>/<C>Ctrl</C> + key. The topbar uses it for <C>⌘ K</C> search.
        </p>
      </Prose>
      <Code>{`const searchRef = useRef(null);
useHotkey('k', () => searchRef.current?.focus());`}</Code>

      <Prose>
        <h2>useDismiss</h2>
        <p>
          While active, calls a handler on Escape and on a mousedown outside the given ref — for your own lightweight
          surfaces. Base UI popups (Menu, Popover, Dialog…) already handle dismissal, focus and Escape; don’t add this to them.
        </p>
      </Prose>
      <Code>{`const ref = useRef(null);
const close = useCallback(() => setOpen(false), []);
useDismiss(open, close, ref);`}</Code>
    </div>
  );
}
