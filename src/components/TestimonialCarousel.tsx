import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const stars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`w-3 h-3 ${n <= rating ? "fill-yellow-500 text-yellow-500" : "text-slate-300"}`} />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What they said
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Real results from real brands we have helped grow.</p>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="min-w-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic mb-4">"{t.text}"</p>
                {stars(t.rating)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === i ? "bg-[#1f4fa8]" : "bg-slate-300 dark:bg-slate-700"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
