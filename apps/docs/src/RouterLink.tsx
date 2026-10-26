import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

/** Adapter so router-agnostic Larch blocks (which pass `href`) can use react-router. */
export function RouterLink({ href, ...props }: Omit<ComponentProps<typeof Link>, 'to'> & { href: string }) {
  return <Link to={href} {...props} />;
}
