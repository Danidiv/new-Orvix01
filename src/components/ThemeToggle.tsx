import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("orvix-theme") as string | null;
    const pref = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(pref as "light" | "dark" | "system");
    const root = document.documentElement;
    const isDark = pref === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : pref === "dark";
    root.classList.toggle("dark", isDark);
    setResolved(isDark ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    let next: "light" | "dark" | "system";
    if (theme === "light") next = "dark";
    else if (theme === "dark") next = "system";
    else next = "light";
    setTheme(next);
    localStorage.setItem("orvix-theme", next);
    const root = document.documentElement;
    const isDark = next === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : next === "dark";
    root.classList.toggle("dark", isDark);
    setResolved(isDark ? "dark" : "light");
  }, [theme]);

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${className} border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800`}
    >
      {resolved === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span>{resolved === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
