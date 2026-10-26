import { Collapsible } from '@base-ui/react/collapsible';
import { Button } from '../base-ui/button.js';
import { buttonClasses } from '../base-ui/classes.js';
import { merge } from '../base-ui/styled.js';
import Icon from '../components/Icon.js';

export type FileChange = 'added' | 'modified' | 'deleted';

export type FileTreeNode =
  | { type: 'folder'; name: string; path: string; children: FileTreeNode[] }
  | { type: 'file'; name: string; path: string; change?: FileChange; additions?: number; deletions?: number };

const CHANGE: Record<FileChange, [label: string, className: string]> = {
  added: ['A', 'text-green'],
  modified: ['M', 'text-amber'],
  deleted: ['D', 'text-red'],
};

const ROW = 'w-full justify-start gap-[7px] px-1.5 text-xs font-normal';

export interface FileTreeProps {
  nodes: FileTreeNode[];
  /** Called with a file's path when it's clicked. */
  onSelect?: (path: string) => void;
}

function Node({ node, onSelect }: { node: FileTreeNode; onSelect?: (path: string) => void }) {
  if (node.type === 'folder') {
    return (
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger className={merge(buttonClasses('ghost'), ROW, 'group/folder')}>
          <Icon name="chevronRight" size="xs" className="text-faint transition-transform group-data-panel-open/folder:rotate-90" />
          <Icon name="folder" size="xs" className="text-[#9197a0]" />
          {node.name}
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className="ml-[13px] flex flex-col border-l border-line-soft pl-1.5">
            {node.children.map((child) => (
              <Node key={child.path} node={child} onSelect={onSelect} />
            ))}
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    );
  }
  const change = node.change && CHANGE[node.change];
  return (
    <Button variant="ghost" className={`${ROW} pl-[21px]`} onClick={() => onSelect?.(node.path)}>
      <Icon name="file" size="xs" className="text-[#9197a0]" />
      <span className={`min-w-0 truncate ${node.change === 'deleted' ? 'line-through' : ''}`}>{node.name}</span>
      {(node.additions != null || node.deletions != null) && (
        <span className="ml-auto font-mono text-[10px]">
          {node.additions != null && <span className="text-green">+{node.additions}</span>}{' '}
          {node.deletions != null && <span className="text-red">−{node.deletions}</span>}
        </span>
      )}
      {change && (
        <span className={`${node.additions == null && node.deletions == null ? 'ml-auto' : ''} font-mono text-[10px] font-semibold ${change[1]}`} title={node.change}>
          {change[0]}
        </span>
      )}
    </Button>
  );
}

/**
 * The files an agent touched, as a folder tree. Folders start open. Larch adds an optional change marker
 * (A / M / D) and diff counts per file.
 */
export function FileTree({ nodes, onSelect }: FileTreeProps) {
  return (
    <div className="flex min-w-0 flex-col">
      {nodes.map((node) => (
        <Node key={node.path} node={node} onSelect={onSelect} />
      ))}
    </div>
  );
}
