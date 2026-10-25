import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

/** Adapter so router-agnostic Larch blocks (which pass `href`) can use react-router. */
export const RouterLink = forwardRef(function RouterLink({ href, ...props }, ref) {
  return <Link ref={ref} to={href} {...props} />;
});
