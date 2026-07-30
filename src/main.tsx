import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix for 404 handling if using basic React Router (though we are SPA single page)
// In a true SPA without router, any path should just render the App,
// But Vercel handles rewrites to index.html for SPA anyway via cleanUrls.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
