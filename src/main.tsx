import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./components/router/Router";
import { ErrorBoundary } from "react-error-boundary";
import { AppState } from "./contexts/AppState";

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={({ error }) => error.message}>
    <AppState>
      <Router />
    </AppState>
  </ErrorBoundary>
);
