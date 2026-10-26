import type { JSX } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { merge, type VariantProps, type Variants } from '../base-ui/styled.js';

type Tag = keyof JSX.IntrinsicElements;

export interface PartOptions<V extends Variants> {
  variants?: V;
  defaults?: VariantProps<V>;
  /** Fixed attributes, overridable by the consumer — e.g. `data-slot` for `has-*` selectors, `aria-hidden`. */
  attrs?: Record<string, string | boolean>;
  name?: string;
}

/** A Larch element with Base UI's `render` prop; variant props also become `data-<name>` attributes. */
export type Part<T extends Tag, V extends Variants = Record<never, never>> = {
  (props: useRender.ComponentProps<T> & VariantProps<V>): JSX.Element;
  displayName?: string;
};

/**
 * A plain Larch element (no Base UI behaviour) that composes like a Base UI part: it takes `render`,
 * merges `className` after its defaults with tailwind-merge, and exposes each variant prop as a data
 * attribute (`variant="ghost"` → `data-variant="ghost"`) so children can style against it.
 */
export function part<T extends Tag, V extends Variants = Record<never, never>>(
  tag: T,
  base: string,
  { variants, defaults, attrs, name }: PartOptions<V> = {},
): Part<T, V> {
  const keys = Object.keys(variants ?? {});

  function LarchPart({ render, className, ...rest }: Record<string, unknown>) {
    const props: Record<string, unknown> = { ...attrs, ...rest };
    const state: Record<string, unknown> = {};
    const extra = keys.map((key) => {
      const value = props[key] ?? defaults?.[key];
      delete props[key];
      if (value == null) return undefined;
      state[key] = value;
      return variants?.[key]?.[value as string];
    });
    return useRender({
      defaultTagName: tag,
      render: render as useRender.RenderProp | undefined,
      state,
      props: { ...props, className: merge(base, ...extra, className as string | undefined) },
    });
  }

  LarchPart.displayName = name;
  return LarchPart as unknown as Part<T, V>;
}
