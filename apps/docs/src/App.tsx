import { Route, Routes } from 'react-router-dom';
import DocsLayout from './docs/DocsLayout.js';
import Introduction from './pages/Introduction.js';
import Installation from './pages/Installation.js';
import BaseUi from './pages/BaseUi.js';
import Theming from './pages/Theming.js';
import Tokens from './pages/Tokens.js';
import Hooks from './pages/Hooks.js';
import ComponentPage from './pages/ComponentPage.js';
import BlockPage from './pages/BlockPage.js';
import AiPage from './pages/AiPage.js';
import ExamplesIndex from './pages/ExamplesIndex.js';
import NotFound from './pages/NotFound.js';
import CrmApp from './crm/CrmApp.js';
import AuthApp from './auth/AuthApp.js';
import AssistantApp from './assistant/AssistantApp.js';
import AiGuide from './pages/AiGuide.js';
import Preview from './pages/Preview.js';

export default function App() {
  return (
    <Routes>
      {/* Full-screen example app — renders its own AppShell. */}
      <Route path="/examples/crm/*" element={<CrmApp />} />
      <Route path="/examples/auth/*" element={<AuthApp />} />
      <Route path="/examples/assistant" element={<AssistantApp />} />
      <Route path="/preview/:kind/:slug/:id" element={<Preview />} />

      <Route element={<DocsLayout />}>
        <Route index element={<Introduction />} />
        <Route path="/docs/installation" element={<Installation />} />
        <Route path="/docs/base-ui" element={<BaseUi />} />
        <Route path="/docs/ai-elements" element={<AiGuide />} />
        <Route path="/docs/theming" element={<Theming />} />
        <Route path="/docs/tokens" element={<Tokens />} />
        <Route path="/docs/hooks" element={<Hooks />} />
        <Route path="/components/:slug" element={<ComponentPage />} />
        <Route path="/blocks/:slug" element={<BlockPage />} />
        <Route path="/ai/:slug" element={<AiPage />} />
        <Route path="/examples" element={<ExamplesIndex />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
