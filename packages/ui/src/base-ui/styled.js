import { createElement, forwardRef } from 'react';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge Larch's named shadows so `shadow-pop` + `shadow-dialog` resolve to the last one.
export const merge = extendTailwindMerge({
  extend: { theme: { shadow: ['card', 'pop', 'dialog', 'toast'] } },
});

const resolve = (value, state) => (typeof value === 'function' ? value(state) : value);

/**
 * Give a Base UI part Larch's default classes without changing its API.
 *
 * `base` is a class string (or `(state) => string`). The consumer's `className` — a string or Base UI's
 * `(state) => string` — is merged after it with tailwind-merge, so a conflicting utility always wins over
 * the default. Every other prop, the ref and `render` go straight to the Base UI part.
 *
 * `variants` adds purely visual props, e.g. `{ variant: { outline: '…', primary: '…' } }`. They are read
 * here and never reach Base UI; `defaults` picks the value used when a prop is omitted.
 *
 * `children` is default content (usually a Larch icon) rendered only when the consumer passes none.
 */
export function styled(Part, base, { variants = {}, defaults = {}, children, name } = {}) {
  const keys = Object.keys(variants);

  const Styled = forwardRef(function Styled({ className, ...props }, ref) {
    const extra = keys.map((key) => {
      const value = props[key] ?? defaults[key];
      delete props[key];
      return variants[key][value];
    });
    // Only add the key when there is a default: parts like Field.Error merge their own children under
    // the consumer's props, so an explicit `children: undefined` would blank them.
    if (props.children === undefined && children !== undefined) props.children = children;
    return createElement(Part, {
      ...props,
      ref,
      className: (state) => merge(resolve(base, state), ...extra, resolve(className, state)),
    });
  });

  Styled.displayName = name;
  return Styled;
}

/**
 * Build a Larch namespace: every Base UI part and helper is kept as-is (Root, Portal, Provider, hooks,
 * createHandle…) and the parts listed in `styles` are swapped for styled ones. A style is a class string,
 * a `(state) => string`, or `{ base, variants, defaults }`.
 */
export function theme(namespace, prefix, styles) {
  const parts = { ...namespace };
  for (const [part, style] of Object.entries(styles)) {
    const { base, ...options } = typeof style === 'object' ? style : { base: style };
    parts[part] = styled(namespace[part], base, { ...options, name: `${prefix}.${part}` });
  }
  return parts;
}
