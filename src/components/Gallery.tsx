import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from "../data";

interface GalleryProps {
  initialFilter?: string;
}

export function Gallery({ initialFilter = "all" }: GalleryProps) {
  const [filter, setFilter] = useState(initialFilter);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? PORTFOLIO_IMAGES : PORTFOLIO_IMAGES.filter((i) => i.category === filter);

  const countFor = (key: string) =>
    key === "all" ? PORTFOLIO_IMAGES.length : PORTFOLIO_IMAGES.filter((i) => i.category === key).length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap gap-2"
      >
        {PORTFOLIO_CATEGORIES.map((cat) => {
          const active = filter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setFilter(cat.key);
                setLightbox(null);
              }}
              className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                active
                  ? "border-[#1f4fa8] text-white"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="gallery-pill"
                  className="absolute inset-0 rounded-full bg-[#1f4fa8]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                duration: 0.45,
                delay: Math.min(i * 0.025, 0.3),
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-shadow"
              onClick={() => setLightbox(i)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.video && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#1f4fa8] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-0.5" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                  {item.category.replace("-", " ")}
                  {item.video ? " · Video" : ""}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-slate-500 dark:text-slate-400 py-12"
        >
          No projects in this category yet — check back soon.
        </motion.p>
      )}

      {lightbox !== null && (
        <Lightbox images={filtered} currentIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
