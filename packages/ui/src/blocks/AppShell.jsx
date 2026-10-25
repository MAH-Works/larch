import { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';

/**
 * Sidebar + topbar frame. Pages scroll normally; with `fixed` the frame is pinned to the
 * viewport so a full-height child (e.g. a data table) handles its own scrolling.
 *
 * `sidebar` → props for <Sidebar>, `topbar` → props for <Topbar>. The mobile drawer is managed here.
 */
export function AppShell({ sidebar, topbar, fixed = false, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`flex bg-canvas text-ink ${fixed ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Sidebar {...sidebar} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className={`flex min-w-0 flex-1 flex-col ${fixed ? 'h-screen overflow-hidden' : ''}`}>
        <Topbar {...topbar} onOpenMenu={() => setMenuOpen(true)} />
        {children}
      </main>
    </div>
  );
}
