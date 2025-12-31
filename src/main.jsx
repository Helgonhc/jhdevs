import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from 'react';

// Simple Error Boundary to catch crashes
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff', background: '#09090b', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h2>
          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>{this.state.error?.toString()}</p>
          <button
            onClick={() => {
              // Nuke cache and reload
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function (registrations) {
                  for (let registration of registrations) { registration.unregister(); }
                });
              }
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload(true);
            }}
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#7c3aed', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Clear Cache & Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// FORCE UNREGISTER ANY SERVICE WORKER (Fixes the "Ctrl+Shift+R" issue)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister().then(() => console.log('SW Unregistered'));
      }
    });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
