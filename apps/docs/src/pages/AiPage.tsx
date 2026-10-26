import { useParams } from 'react-router-dom';
import { EntryPage } from '../docs/EntryPage.js';
import { AI_ELEMENTS } from '../docs/registry.js';
import NotFound from './NotFound.js';

export default function AiPage() {
  const { slug } = useParams();
  const i = AI_ELEMENTS.findIndex((c) => c.slug === slug);
  if (i < 0) return <NotFound />;
  return <EntryPage key={slug} kind="ai" entry={AI_ELEMENTS[i]!} prev={AI_ELEMENTS[i - 1]} next={AI_ELEMENTS[i + 1]} />;
}
