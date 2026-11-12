import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reasonMsg = String(
      (event.reason && (event.reason.message || event.reason)) || ''
    );
    if (
      reasonMsg.includes('WebSocket closed without opened') ||
      reasonMsg.includes('failed to connect to websocket')
    ) {
      event.preventDefault();
    }
  });

  const prevAuthFailure = (window as unknown as { gm_authFailure?: () => void }).gm_authFailure;
  (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
    if (typeof prevAuthFailure === 'function') {
      try {
        prevAuthFailure();
      } catch {
        // ignore
      }
    }
    window.dispatchEvent(new CustomEvent('gmp-map-error'));
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  };

  const origError = console.error;
  console.error = (...args: unknown[]) => {
    origError.apply(console, args);
    const msg = args.map((a) => String(a)).join(' ');
    if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      window.dispatchEvent(new CustomEvent('gmp-map-error'));
    } else if (
      msg.includes('InvalidKeyMapError') ||
      msg.includes('RefererNotAllowedMapError') ||
      msg.includes('ApiNotActivatedMapError') ||
      msg.includes('BillingNotEnabledMapError') ||
      msg.includes('ApiProjectMapError') ||
      msg.includes('Google Maps JavaScript API error')
    ) {
      window.dispatchEvent(new CustomEvent('gmp-map-error'));
    }
  };

  const rootEl = document.getElementById('root')!;
  if (rootEl.hasChildNodes()) {
    hydrateRoot(rootEl, <App />);
  } else {
    createRoot(rootEl).render(<App />);
  }
}

