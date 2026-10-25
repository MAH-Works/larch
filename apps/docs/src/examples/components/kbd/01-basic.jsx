import { Kbd } from '@larch/ui';

export const title = 'Shortcuts';

export default function Basic() {
  return (
    <div className="flex flex-col items-center gap-3 text-xs text-muted">
      <span>
        Press <Kbd>⌘ K</Kbd> to search
      </span>
      <span>
        <Kbd>Esc</Kbd> closes dialogs and menus
      </span>
      <span className="flex items-center gap-1">
        <Kbd>⇧</Kbd>+<Kbd>Enter</Kbd> to save and create another
      </span>
    </div>
  );
}
