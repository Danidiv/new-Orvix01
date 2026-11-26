import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Tailwind (CDN): class-based dark mode, so a toggle that adds the "dark" class works.
const tw = (window as any).tailwind;
if (tw) tw.config = { ...(tw.config || {}), darkMode: "class" };

// Hide failed images instead of showing a broken-image icon or placeholder.
document.addEventListener(
  "error",
  (e) => {
    const t = e.target;
    if (t instanceof HTMLImageElement && !t.dataset.fallback) {
      t.dataset.fallback = "1";
      t.style.display = "none";
    }
  },
  true
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
