import { createRoot } from "react-dom/client";
import App from "./App";
import { Web3Provider } from "./components/Web3Provider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Web3Provider>
      <App />
    </Web3Provider>
  </ErrorBoundary>
);
