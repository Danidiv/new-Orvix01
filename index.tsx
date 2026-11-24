import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Tailwind (CDN): class-based dark mode, so a toggle that adds the "dark" class works.
const tw = (window as any).tailwind;
if (tw) tw.config = { ...(tw.config || {}), darkMode: "class" };

// Safety net: if any <img> fails to load, show a soft gradient placeholder
// instead of a broken-image icon.
document.addEventListener(
  "error",
  (e) => {
    const t = e.target;
    if (t instanceof HTMLImageElement && !t.dataset.fallback) {
      t.dataset.fallback = "1";
      const label = (t.alt || "Image").replace(/[<>&"']/g, "");
      const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
        '<rect width="800" height="600" fill="#e2e8f0"/>' +
        '<text x="400" y="310" text-anchor="middle" font-family="sans-serif" font-size="32" fill="#64748b">' +
        label +
        "</text></svg>";
      t.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    }
  },
  true
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
