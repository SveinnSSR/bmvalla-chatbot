import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import WidgetStandalone from './WidgetStandalone.jsx';
import './index.css';

// Determine if we're in the iframe (embedded) mode or normal mode
const isEmbedded = window.location.pathname === '/' && window !== window.parent;

// Render the appropriate component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isEmbedded ? <WidgetStandalone /> : <App />}
  </React.StrictMode>,
);
