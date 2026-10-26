// Tiny TSX/JS/CSS highlighter: good enough for docs snippets, zero dependencies.
const KEYWORDS =
  'import|from|export|default|const|let|var|function|return|if|else|for|of|in|new|async|await|true|false|null|undefined|typeof|type|interface|as|satisfies|extends|keyof';

const COLOR = {
  comment: 'var(--code-comment)',
  string: 'var(--code-string)',
  tag: 'var(--code-tag)',
  keyword: 'var(--code-keyword)',
  attr: 'var(--code-attr)',
  number: 'var(--code-attr)',
};

const RULES: [kind: keyof typeof COLOR, pattern: RegExp][] = [
  ['comment', /\/\*[\s\S]*?\*\/|\/\/[^\n]*|\{\/\*[\s\S]*?\*\/\}/],
  ['string', /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/],
  ['tag', /<\/?[A-Za-z][\w.]*|\/?>/],
  ['keyword', new RegExp(`\\b(?:${KEYWORDS})\\b`)],
  ['attr', /\b[a-zA-Z-]+(?==[{"'])/],
  ['number', /\b\d+(?:\.\d+)?\b/],
];

const MASTER = new RegExp(RULES.map(([, r]) => `(${r.source})`).join('|'), 'g');

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Returns HTML with <span style="color:…"> around recognised tokens. */
export function highlight(code: string): string {
  let out = '';
  let last = 0;
  for (const m of code.matchAll(MASTER)) {
    out += escape(code.slice(last, m.index));
    const kind = RULES[m.slice(1).findIndex((g) => g !== undefined)]![0];
    out += `<span style="color:${COLOR[kind]}">${escape(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + escape(code.slice(last));
}
