import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

interface LightboxImage {
  id: number;
  image: string;
  title: string;
  category?: string;
  video?: boolean;
  youtubeId?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    if (images.length === 0) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    if (images.length === 0) return;
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goNext, goPrev]);

  const img = images[index];
  if (!img) return null;

  const isVideo = !!img.video && !!img.youtubeId;
  const categoryLabel = img.category
    ? img.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Portfolio";
  const projectDescription =
    img.category === "wedding"
      ? "A timeless wedding story captured through natural emotion, elegant composition, and cinematic detail."
      : img.category === "corporate"
        ? "A professional corporate portrait and event story designed to present the brand with confidence and clarity."
        : img.category === "food"
          ? "A polished culinary presentation highlighting flavour, texture, atmosphere, and brand character."
          : "A curated visual story created with thoughtful composition and professional production.";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={img.title}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(47,134,216,0.16),transparent_32%),linear-gradient(135deg,#090e1a_0%,#111827_55%,#030712_100%)]" />
      <div
        className="relative h-full flex flex-col lg:flex-row p-3 sm:p-5 lg:p-8 gap-3 sm:gap-5 lg:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <aside className="order-2 lg:order-1 w-full lg:w-[340px] shrink-0 lg:h-full rounded-2xl border border-white/10 bg-slate-950/75 backdrop-blur-xl shadow-2xl px-5 py-4 sm:px-6 sm:py-5 flex lg:flex-col justify-between lg:justify-center">
          <div>
            <p className="text-[#6fb3ea] text-[10px] sm:text-xs uppercase tracking-[0.28em] font-semibold mb-2">
              {categoryLabel}
            </p>
            <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl leading-tight mb-2 lg:mb-4">
              {img.title}
            </h2>
            <p className="hidden lg:block text-slate-300 text-sm leading-7">
              {projectDescription}
            </p>
            <div className="hidden lg:grid grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Project</p>
                <p className="text-white text-sm font-medium mt-1">{categoryLabel}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Frame</p>
                <p className="text-white text-sm font-medium mt-1">{index + 1} / {images.length}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:absolute lg:bottom-14 lg:left-14">
            <button
              onClick={goPrev}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/[0.08] hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1f4fa8] hover:bg-[#2f86d8] text-white flex items-center justify-center transition-colors shadow-lg"
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </aside>

        <main className="order-1 lg:order-2 flex-1 min-h-0 min-w-0 relative flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-black/35 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-2.5 sm:p-3 bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.018)_25%,transparent_25%,transparent_75%,rgba(255,255,255,.018)_75%),linear-gradient(45deg,rgba(255,255,255,.018)_25%,transparent_25%,transparent_75%,rgba(255,255,255,.018)_75%)] bg-[length:28px_28px] bg-[position:0_0,14px_14px]" />

          {isVideo ? (
            <div className="relative z-10 w-[calc(100%-24px)] max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${img.youtubeId}?autoplay=1&rel=0`}
                title={img.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={img.image}
              alt={img.title}
              className="relative z-10 max-w-[calc(100%-24px)] max-h-[calc(100%-24px)] w-auto h-auto object-contain rounded-xl shadow-[0_24px_80px_rgba(0,0,0,.55)]"
            />
          )}
        </main>
      </div>
    </div>,
    document.body
  );
}
