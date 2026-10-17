import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { TripProvider } from "./context/TripContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <TripProvider>
        <App />
      </TripProvider>
    </HashRouter>
  </React.StrictMode>
);
