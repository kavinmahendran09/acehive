import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.tsx';
import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com', // Default PostHog API host
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider 
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY || 'YOUR_API_KEY'} 
      options={options}
    >
      <App />
    </PostHogProvider>
  </StrictMode>,
);
