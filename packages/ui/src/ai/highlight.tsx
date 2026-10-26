import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import type { HighlighterCore, ThemedToken } from 'shiki/core';

// Opt-in entry (`@mah-works/larch/ai/highlight`): it is the only Larch module that loads Shiki, which is
// an optional peer. Shiki's JavaScript regex engine is used, so no WASM is fetched.

/** Languages loaded on first use. Anything else renders as plain text; `ansi` renders terminal colours. */
const LANGUAGES: Record<string, () => Promise<unknown>> = {
  ts: () => import('shiki/langs/typescript.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  js: () => import('shiki/langs/javascript.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  bash: () => import('shiki/langs/bash.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  go: () => import('shiki/langs/go.mjs'),
  rust: () => import('shiki/langs/rust.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
};

const ALIASES: Record<string, string> = {
  typescript: 'ts',
  javascript: 'js',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  md: 'markdown',
  py: 'python',
  yml: 'yaml',
};

const THEMES = { light: 'github-light-default', dark: 'github-dark-default' } as const;

let highlighter: Promise<HighlighterCore> | undefined;
const loaded = new Map<string, Promise<void>>();

function getHighlighter() {
  highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]);
    return createHighlighterCore({
      themes: [import('shiki/themes/github-light-default.mjs'), import('shiki/themes/github-dark-default.mjs')],
      langs: [],
      engine: createJavaScriptRegexEngine(),
    });
  })();
  return highlighter;
}

/** The canonical language id, or null when Larch doesn't highlight it. */
const resolveLanguage = (language?: string) => {
  const id = language ? (ALIASES[language.toLowerCase()] ?? language.toLowerCase()) : '';
  return id === 'ansi' || id in LANGUAGES ? id : null;
};

async function tokenize(code: string, language?: string): Promise<ThemedToken[][] | null> {
  const lang = resolveLanguage(language);
  if (!lang) return null;
  const h = await getHighlighter();
  if (lang !== 'ansi') {
    if (!loaded.has(lang)) loaded.set(lang, h.loadLanguage(LANGUAGES[lang]!() as never));
    await loaded.get(lang);
  }
  return h.codeToTokens(code, { lang, themes: THEMES, defaultColor: false }).tokens;
}

// Each token carries both themes as CSS variables; Larch's dark variant picks the second.
const renderLine = (tokens: ThemedToken[]): ReactNode =>
  tokens.map((token, i) => (
    <span
      key={i}
      className="text-(--shiki-light) dark:text-(--shiki-dark)"
      style={token.htmlStyle as CSSProperties | undefined}
    >
      {token.content}
    </span>
  ));

const plainLines = (code: string): ReactNode[] => code.split('\n');

/**
 * Highlight `code` into one React node per line — render each inside a `CodeBlock.Line`. Async, so it
 * also works in React Server Components (keeping Shiki out of the client bundle).
 */
export async function highlightCode(code: string, language?: string): Promise<ReactNode[]> {
  const tokens = await tokenize(code, language);
  return tokens ? tokens.map(renderLine) : plainLines(code);
}

/**
 * Client hook: returns plain lines immediately, then highlighted ones once Shiki and the language have
 * loaded. While `code` streams in, lines that didn't change keep their node, so React skips them.
 */
export function useHighlightedCode(code: string, language?: string): ReactNode[] {
  const [result, setResult] = useState<{ code: string; lines: ReactNode[] } | null>(null);

  useEffect(() => {
    let cancelled = false;
    tokenize(code, language).then(
      (tokens) => {
        if (!cancelled && tokens) setResult({ code, lines: tokens.map(renderLine) });
      },
      () => {
        /* unknown grammar or load failure — keep plain lines */
      },
    );
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return useMemo(() => {
    if (result?.code === code) return result.lines;
    const plain = plainLines(code);
    if (!result) return plain;
    // While newer code is still being tokenized, reuse the highlighted lines it shares with the last
    // result. The last old line may have been cut mid-token, so it is only reused once it's complete.
    const previous = result.code.split('\n');
    return plain.map((line, i) => (previous[i] === line && i < previous.length - 1 ? result.lines[i] : line));
  }, [code, result]);
}
