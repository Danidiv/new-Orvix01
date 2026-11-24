import { useState } from "react";
import { Play } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from "../data";
import { LOCAL_PORTFOLIO_IMAGES } from "../data/localPortfolio";

interface GalleryProps {
  initialFilter?: string;
}

export function Gallery({ initialFilter = "all" }: GalleryProps) {
  const [filter, setFilter] = useState(initialFilter);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const portfolioImages = [...PORTFOLIO_IMAGES.slice(0, 15), ...LOCAL_PORTFOLIO_IMAGES];
  const filtered = filter === "all" ? portfolioImages : portfolioImages.filter((i) => i.category === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === cat.key
                ? "bg-[#1f4fa8] border-[#1f4fa8] text-white"
                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            onClick={() => setLightbox(i)}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.video && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1f4fa8] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                {item.category.replace("-", " ")}
                {item.video ? " · Video" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox images={filtered} currentIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
