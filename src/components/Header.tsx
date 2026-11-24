import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { NAV } from "../data";

export function Header({ onNavigate, path }: { onNavigate: (href: string) => void; path: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback(
    (href: string) => {
      setMenuOpen(false);
      onNavigate(href);
    },
    [onNavigate]
  );

  const isActive = (href: string) => path === href;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go("/");
            }}
            className="flex items-center"
            aria-label="Orvix Frame Media — home"
          >
            <Logo />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={`text-xs uppercase tracking-wider font-medium transition-colors ${isActive(item.href) ? "text-[#1f4fa8]" : "text-slate-600 dark:text-slate-400 hover:text-[#1f4fa8]"}`}
              >
                {item.name}
              </a>
            ))}
            <ThemeToggle className="ml-2" />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle className="ml-1" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-[#1f4fa8]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <nav className="flex flex-col gap-4 text-sm uppercase tracking-wider font-medium">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className={`block transition-colors ${isActive(item.href) ? "text-[#1f4fa8]" : "text-slate-600 dark:text-slate-300 hover:text-[#1f4fa8]"}`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
