import { useEffect, useState } from 'react';
import { Card, Kbd, useTheme } from '@mah-works/larch';
import { C } from '../docs/CodeBlock.js';
import { DocHeader, Prose } from '../docs/Prose.js';

const GROUPS = [
  {
    title: 'Surfaces',
    tokens: [
      ['canvas', 'App background behind cards'],
      ['surface', 'Cards, panels, inputs, tables'],
      ['sidebar', 'Sidebar and topbar'],
      ['head', 'Table header row'],
      ['hover', 'Hover fill for ghost controls'],
      ['row-hover', 'Table row hover'],
      ['selected', 'Selected table row'],
      ['selected-hover', 'Selected row hover'],
    ],
  },
  {
    title: 'Text',
    tokens: [
      ['ink', 'Headings and primary text'],
      ['strong', 'Emphasised cell text'],
      ['body', 'Table body text'],
      ['soft', 'Ghost button text'],
      ['muted', 'Descriptions'],
      ['label', 'Column headers, metric labels'],
      ['faint', 'Placeholders, captions'],
    ],
  },
  {
    title: 'Lines',
    tokens: [
      ['line', 'Card borders, dividers'],
      ['line-strong', 'Input and outline-button borders'],
      ['line-soft', 'Vertical cell dividers'],
    ],
  },
  {
    title: 'Accent & semantic',
    tokens: [
      ['blue', 'Primary, selection, focus'],
      ['blue-hover', 'Primary hover'],
      ['blue-border', 'Primary border'],
      ['blue-soft', 'Focus ring, icon tiles'],
      ['green', 'Positive trend'],
      ['red', 'Destructive, negative trend'],
      ['red-soft', 'Destructive hover fill'],
      ['amber', 'Warning'],
      ['violet', 'Secondary series'],
    ],
  },
];


// The CSS minifier shortens #ffffff to #fff; always show the full six-digit form.
const expandHex = (v: string) => (/^#[0-9a-f]{3}$/i.test(v) ? `#${[...v.slice(1)].map((c) => c + c).join('')}` : v);

function useResolvedTokens(names: string[]) {
  const { theme } = useTheme();
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(names.map((n) => [n, expandHex(style.getPropertyValue(`--${n}`).trim())])));
  }, [theme, names]);
  return values;
}

const ALL = GROUPS.flatMap((g) => g.tokens.map(([n]) => n));

export default function Tokens() {
  const values = useResolvedTokens(ALL);
  return (
    <div className="mx-auto w-full max-w-[1100px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader
        eyebrow="Foundations"
        title="Design tokens"
        description="Neutrals carry the interface; color is reserved for meaning. Values below are live — toggle the theme to see the dark palette."
      />

      {GROUPS.map((group) => (
        <section key={group.title} className="mb-10">
          <h2 className="mb-4 mt-0 text-lg font-[650] tracking-[-.03em] text-ink">{group.title}</h2>
          <div className="grid grid-cols-4 gap-3 narrow:grid-cols-3 mobile:grid-cols-2">
            {group.tokens.map(([name, use]) => (
              <Card key={name} className="overflow-hidden">
                <div className="h-14 border-b border-line" style={{ background: `var(--${name})` }} />
                <div className="p-3">
                  <div className="font-mono text-[11.5px] font-medium text-ink">--{name}</div>
                  <div className="mt-[2px] font-mono text-[10.5px] uppercase text-faint">{values[name]}</div>
                  <div className="mt-2 text-[11px] leading-snug text-muted">{use}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}

      <Prose>
        <h2>Using tokens in Tailwind</h2>
        <p>
          Each token is a Tailwind color: <C>bg-surface</C>, <C>text-ink</C>, <C>border-line-strong</C>, <C>bg-blue-soft</C>,
          <C>hover:bg-hover</C>. In plain CSS use the variable directly: <C>{'color: var(--muted)'}</C>.
        </p>

        <h2>Typography</h2>
        <p>
          Inter for UI, DM Mono (<C>font-mono</C>) for numerics. Sizes are deliberately small: 24px page titles, 14px panel titles,
          12px body, 11px labels, 10px captions. Headings use weight 650 with tight negative tracking.
        </p>

        <h2>Breakpoints</h2>
        <p>
          Max-width breakpoints — <C>narrow:</C> ≤ 980px, <C>tablet:</C> ≤ 900px, <C>mobile:</C> ≤ 680px — so layouts are
          written desktop-first, the way dense dashboards are designed.
        </p>

        <h2>Elevation & radius</h2>
        <p>
          <C>shadow-card</C> (barely there), <C>shadow-pop</C> (menus), <C>shadow-dialog</C>, <C>shadow-toast</C>. Radius: 10px
          cards, 7px tiles and inputs, 5–6px buttons, full pills for badges. Shortcuts render as <Kbd>⌘ K</Kbd>.
        </p>
      </Prose>
    </div>
  );
}
