import { TESTIMONIALS } from "../data";
import { CTA, DISPLAY, HERO_TEXT_LIGHT } from "../components/common";
import { Star } from "lucide-react";

export function Testimonials({ onNavigate }: { onNavigate: (href: string) => void }) {
  const avgRating = (TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length).toFixed(1);
  const totalReviews = TESTIMONIALS.length;

  const stars = (rating: number) => (
    <div className="flex gap-1 text-yellow-500 text-xs">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`w-3 h-3 ${n <= rating ? "fill-yellow-500" : "text-slate-300"}`} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1
            className={`text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 ${HERO_TEXT_LIGHT}`}
            style={DISPLAY}
          >
            What they said
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-3xl font-bold text-slate-900 dark:text-white" style={DISPLAY}>{avgRating}</span>
            <div className="flex gap-1 text-yellow-500">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`w-4 h-4 ${n <= Math.floor(parseFloat(avgRating)) ? "fill-yellow-500" : "text-slate-300"}`}
                />
              ))}
            </div>
            <span className="text-slate-600 dark:text-slate-400">({totalReviews} reviews)</span>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real feedback from brands we have helped grow across social media, branding, and productions.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
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
      </section>

      <CTA
        title="Ready to be our next success story?"
        subtitle="Book a free discovery call and let's talk about your goals."
        buttonText="Get a Quote"
        buttonHref="/contact"
      />
    </div>
  );
}
