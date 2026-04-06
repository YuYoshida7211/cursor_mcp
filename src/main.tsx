import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";

async function enableMocking(): Promise<void> {
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./mocks/browser.ts");
  await worker.start({
    onUnhandledRequest: "bypass",
    quiet: true,
  });
}

void enableMocking().then(() => {
  const rootEl = document.getElementById("root");
  if (!rootEl) {
    throw new Error("Root element #root not found");
  }
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
