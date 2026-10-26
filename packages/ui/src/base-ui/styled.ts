import { createElement, type ComponentProps, type JSX, type JSXElementConstructor, type ReactNode } from 'react';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge Larch's named shadows so `shadow-pop` + `shadow-dialog` resolve to the last one.
export const merge = extendTailwindMerge({
  extend: { theme: { shadow: ['card', 'pop', 'dialog', 'toast'] } },
});

/** A class string, or a function of the part's Base UI state (Base UI's own `className` contract). */
// The state type differs per part; `any` lets one style object serve every part it is applied to.
export type ClassValue = string | ((state: any) => string | undefined);

/** `{ variant: { outline: '…', primary: '…' } }` — prop name → value → classes. */
export type Variants = Record<string, Record<string, string>>;

/** The visual props a `Variants` map adds to a part. */
export type VariantProps<V extends Variants> = { [K in keyof V]?: keyof V[K] };

export interface StyleOptions<V extends Variants = Variants> {
  variants?: V;
  defaults?: VariantProps<V>;
  /** Default content (usually a Larch icon), rendered only when the consumer passes no children. */
  children?: ReactNode;
  /**
   * The part takes a plain string `className` (e.g. `@shadcn/react` parts) rather than Base UI's
   * `(state) => string`: classes are merged eagerly and state is styled through its data attributes.
   */
  plainClassName?: boolean;
  name?: string;
}

// Base UI parts are forwardRef components with different prop types; this is the widest constructor type.
type AnyComponent = JSXElementConstructor<any>;

/** A Base UI part with Larch's styles: the part's own props (ref included) plus any variant props. */
export type Styled<C extends AnyComponent, V extends Variants = Record<never, never>> = {
  (props: ComponentProps<C> & VariantProps<V>): JSX.Element;
  displayName?: string;
};

const resolve = (value: unknown, state: unknown): string | undefined =>
  typeof value === 'function' ? value(state) : (value as string | undefined);

/**
 * Layer extra default classes under a consumer `className` that may be a string or Base UI's
 * `(state) => string` — for composites that pass a className on to a styled part.
 */
export const extend =
  <State>(extra: string, className?: string | ((state: State) => string | undefined)) =>
  (state: State): string =>
    merge(extra, resolve(className, state));

/**
 * Give a Base UI part Larch's default classes without changing its API.
 *
 * `base` is a class string (or `(state) => string`). The consumer's `className` — a string or Base UI's
 * `(state) => string` — is merged after it with tailwind-merge, so a conflicting utility always wins over
 * the default. Every other prop, the ref (a plain prop in React 19) and `render` go straight to the part.
 *
 * `variants` adds purely visual props, e.g. `{ variant: { outline: '…', primary: '…' } }`. They are read
 * here and never reach Base UI; `defaults` picks the value used when a prop is omitted.
 */
export function styled<C extends AnyComponent, V extends Variants = Record<never, never>>(
  Part: C,
  base?: ClassValue,
  { variants, defaults, children, plainClassName, name }: StyleOptions<V> = {},
): Styled<C, V> {
  const keys = Object.keys(variants ?? {});

  function StyledPart({ className, ...rest }: Record<string, unknown>) {
    const props: Record<string, unknown> = { ...rest };
    const extra = keys.map((key) => {
      const value = props[key] ?? defaults?.[key];
      delete props[key];
      return value == null ? undefined : variants?.[key]?.[value as string];
    });
    // Only add the key when there is a default: parts like Field.Error merge their own children under
    // the consumer's props, so an explicit `children: undefined` would blank them.
    if (props.children === undefined && children !== undefined) props.children = children;
    return createElement(Part, {
      ...props,
      className: plainClassName
        ? merge(resolve(base, undefined), ...extra, resolve(className, undefined))
        : (state: unknown) => merge(resolve(base, state), ...extra, resolve(className, state)),
    });
  }

  StyledPart.displayName = name;
  return StyledPart as unknown as Styled<C, V>;
}

/** A part's style: classes, or classes plus variants / default children. */
export type Style = ClassValue | (StyleOptions & { base?: ClassValue });

type VariantsOf<S> = S extends { variants: infer V extends Variants } ? V : Record<never, never>;

/** A Base UI namespace with the parts named in `S` swapped for styled ones; everything else untouched. */
export type Themed<NS, S> = Omit<NS, keyof S> & {
  [K in keyof S & keyof NS]: NS[K] extends AnyComponent ? Styled<NS[K], VariantsOf<S[K]>> : NS[K];
};

/**
 * Build a Larch namespace: every Base UI part and helper is kept as-is (Root, Portal, Provider, hooks,
 * createHandle…) and the parts listed in `styles` are swapped for styled ones. A style is a class string,
 * a `(state) => string`, or `{ base, variants, defaults, children }`.
 */
export function theme<NS extends object, const S extends { [K in keyof NS]?: Style }>(
  namespace: NS,
  prefix: string,
  styles: S,
): Themed<NS, S> {
  const parts: Record<string, unknown> = { ...(namespace as Record<string, unknown>) };
  for (const [part, style] of Object.entries(styles) as [string, Style][]) {
    const { base, ...options } = typeof style === 'object' ? style : { base: style };
    parts[part] = styled((namespace as Record<string, AnyComponent>)[part], base, { ...options, name: `${prefix}.${part}` });
  }
  return parts as Themed<NS, S>;
}
