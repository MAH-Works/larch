import { FileTree } from '@mah-works/larch/ai';
import { Toast } from '@mah-works/larch';

export const title = 'Changed files';
export const description = 'Folders start open. Larch adds A / M / D markers and diff counts.';
export const layout = 'padded';

export default function Basic() {
  const toastManager = Toast.useToastManager();
  return (
    <div className="max-w-[360px]">
      <FileTree
        onSelect={(path) => toastManager.add({ title: `Open ${path}` })}
        nodes={[
          {
            type: 'folder',
            name: 'app',
            path: 'app',
            children: [
              { type: 'file', name: 'billing.ts', path: 'app/billing.ts', change: 'modified', additions: 12, deletions: 3 },
              { type: 'file', name: 'tax.ts', path: 'app/tax.ts', change: 'added', additions: 48 },
              { type: 'folder', name: 'legacy', path: 'app/legacy', children: [{ type: 'file', name: 'rates.ts', path: 'app/legacy/rates.ts', change: 'deleted', deletions: 31 }] },
            ],
          },
          { type: 'file', name: 'package.json', path: 'package.json' },
        ]}
      />
    </div>
  );
}
