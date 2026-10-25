import { useParams } from 'react-router-dom';
import { examplesFor } from '../docs/registry.js';

const PADDING = { center: 'flex flex-wrap items-center justify-center gap-3 p-8', padded: 'p-6', canvas: 'p-6', full: '', frame: '' };

/** Renders a single example on its own page — used by iframe previews and "Open in new tab". */
export default function Preview() {
  const { kind, slug, id } = useParams();
  const ex = examplesFor(kind, slug).find((e) => e.id === id);
  if (!ex) return <p className="p-6 text-sm text-muted">Example not found.</p>;
  const { Component, layout = 'center' } = ex;
  return (
    <div className={`min-h-screen bg-canvas ${PADDING[layout]}`}>
      <Component />
    </div>
  );
}
