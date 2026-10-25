import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@mah-works/larch';
import App from './App.jsx';
import './index.css';

// GitHub Pages redirects /route to /route/ (each route is a folder with index.html). Routes are
// matched without the trailing slash, so drop it before the router reads the URL.
const { pathname, search, hash } = window.location;
if (pathname.length > 1 && pathname.endsWith('/') && pathname !== import.meta.env.BASE_URL) {
  window.history.replaceState(null, '', pathname.slice(0, -1) + search + hash);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <ToastProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
