import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
// tokens.css first: base.css reads its custom properties and deliberately does
// not @import them, leaving load order to the consuming app.
import './styles/tokens.css';
import './styles/base.css';

const el = document.getElementById('root');
if (!el) throw new Error('#root missing from index.html');

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
