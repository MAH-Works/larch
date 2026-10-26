import { useState } from 'react';
import { ICON_NAMES, Icon } from '@mah-works/larch';

export const title = 'Gallery';
export const description = 'Click an icon to copy its JSX.';
export const layout = 'padded';

export default function Gallery() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (name: string) => {
    navigator.clipboard?.writeText(`<Icon name="${name}" />`).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2">
      {ICON_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => copy(name)}
          className="flex flex-col items-center gap-2 rounded-[7px] border border-line bg-surface px-2 py-4 text-soft transition-colors hover:border-line-strong hover:bg-hover hover:text-ink"
        >
          <Icon name={name} />
          <span className="font-mono text-[10.5px]">{copied === name ? 'Copied!' : name}</span>
        </button>
      ))}
    </div>
  );
}
