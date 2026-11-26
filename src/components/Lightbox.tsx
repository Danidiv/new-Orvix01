import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

interface LightboxImage {
  id: number;
  image: string;
  title: string;
  description?: string;
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

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/90 overscroll-contain flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={img.title}
    >
      <div
        className="relative grid w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-2xl border border-white/10 bg-black shadow-2xl md:grid-cols-[0.85fr_1.15fr] md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-50 blur-sm"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/40" />

        <section className="relative z-10 order-2 flex flex-col justify-center px-6 py-8 text-white sm:px-10 md:order-1 md:px-12 md:py-12">
          <p className="text-xs uppercase tracking-[0.22em] text-[#6fb3ea]">
            {img.category ? img.category.replace("-", " ") : "Selected work"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{img.title}</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
            {img.description || "A carefully composed image from the Orvix Frame Media portfolio."}
          </p>
          <p className="mt-8 text-xs text-slate-500">
            {index + 1} of {images.length}
          </p>
        </section>

        <section className="relative z-10 order-1 flex h-[48vh] min-h-[260px] items-center justify-center bg-black px-10 py-8 sm:h-[58vh] md:order-2 md:h-[80vh] md:max-h-[760px] md:min-h-[420px]">
          {isVideo ? (
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${img.youtubeId}?autoplay=1&mute=1&rel=0`}
                title={img.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={img.image}
              alt={img.title}
              className="h-full w-full rounded-xl object-contain"
            />
          )}

          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            aria-label="Next image"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-30 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>,
    document.body
  );
}
