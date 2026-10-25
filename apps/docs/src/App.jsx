import { Route, Routes } from 'react-router-dom';
import DocsLayout from './docs/DocsLayout.jsx';
import Introduction from './pages/Introduction.jsx';
import Installation from './pages/Installation.jsx';
import Theming from './pages/Theming.jsx';
import Tokens from './pages/Tokens.jsx';
import Hooks from './pages/Hooks.jsx';
import ComponentPage from './pages/ComponentPage.jsx';
import BlockPage from './pages/BlockPage.jsx';
import ExamplesIndex from './pages/ExamplesIndex.jsx';
import NotFound from './pages/NotFound.jsx';
import CrmApp from './crm/CrmApp.jsx';
import AuthApp from './auth/AuthApp.jsx';
import Preview from './pages/Preview.jsx';

export default function App() {
  return (
    <Routes>
      {/* Full-screen example app — renders its own AppShell. */}
      <Route path="/examples/crm/*" element={<CrmApp />} />
      <Route path="/examples/auth/*" element={<AuthApp />} />
      <Route path="/preview/:kind/:slug/:id" element={<Preview />} />

      <Route element={<DocsLayout />}>
        <Route index element={<Introduction />} />
        <Route path="/docs/installation" element={<Installation />} />
        <Route path="/docs/theming" element={<Theming />} />
        <Route path="/docs/tokens" element={<Tokens />} />
        <Route path="/docs/hooks" element={<Hooks />} />
        <Route path="/components/:slug" element={<ComponentPage />} />
        <Route path="/blocks/:slug" element={<BlockPage />} />
        <Route path="/examples" element={<ExamplesIndex />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
