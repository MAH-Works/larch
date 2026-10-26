import { useParams } from 'react-router-dom';
import { EntryPage } from '../docs/EntryPage.js';
import { COMPONENTS } from '../docs/registry.js';
import NotFound from './NotFound.js';

export default function ComponentPage() {
  const { slug } = useParams();
  const i = COMPONENTS.findIndex((c) => c.slug === slug);
  if (i < 0) return <NotFound />;
  return <EntryPage key={slug} kind="components" entry={COMPONENTS[i]} prev={COMPONENTS[i - 1]} next={COMPONENTS[i + 1]} />;
}
