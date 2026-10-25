import { useParams } from 'react-router-dom';
import { EntryPage } from '../docs/EntryPage.jsx';
import { BLOCKS } from '../docs/registry.js';
import NotFound from './NotFound.jsx';

export default function BlockPage() {
  const { slug } = useParams();
  const i = BLOCKS.findIndex((b) => b.slug === slug);
  if (i < 0) return <NotFound />;
  return <EntryPage key={slug} kind="blocks" entry={BLOCKS[i]} prev={BLOCKS[i - 1]} next={BLOCKS[i + 1]} />;
}
