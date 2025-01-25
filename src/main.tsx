import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.tsx';
import { PostHogProvider } from 'posthog-js/react';

const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

if (!apiKey) {
  throw new Error('Missing PostHog API Key! Please set VITE_PUBLIC_POSTHOG_KEY in your .env file.');
}

const options = {
  api_host: apiHost,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider apiKey={apiKey} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>,
);
