import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );
  } catch (err) {
    console.error('Root mount error:', err);
    rootElement.innerHTML =
      '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#020617;color:#f8fafc;font-family:sans-serif;padding:24px;text-align:center;"><div><h1 style="font-size:20px;font-weight:700;margin-bottom:8px;">Mahdin-International Ltd.</h1><p style="font-size:14px;color:#cbd5e1;">Failed to start application. Please reload the page.</p></div></div>';
  }
}

