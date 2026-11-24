import { ArrowRight } from "lucide-react";
import { DISPLAY, HERO_TEXT_LIGHT } from "../components/common";

export function NotFound({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-6">
      <div className="text-center">
        <h1
          className={`text-8xl md:text-9xl font-bold tracking-tight mb-4 ${HERO_TEXT_LIGHT}`}
          style={DISPLAY}
        >
          404
        </h1>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Page not found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs mx-auto">
          The page you are looking for does not exist. Let's get you back on track.
        </p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/");
          }}
          className="inline-flex items-center gap-2 bg-[#1f4fa8] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b2a6b] transition-colors"
        >
          Go Home <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
