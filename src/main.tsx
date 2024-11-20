import "@/shared/styles/global.scss";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./app";
import * as Sentry from "@sentry/react";
import "@/shared/styles/global.scss";
import { LanguageDetector } from "./features/languageDetector";

Sentry.init({
  dsn: "https://c6a6682b2d56289fed2664de13424875@o4506694926336000.ingest.us.sentry.io/4507152941711360",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/api.moneyswap\.online\/api/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageDetector />
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
