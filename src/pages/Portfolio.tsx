import { Gallery } from "../components/Gallery";
import { SectionHeading, CTA, DISPLAY, HERO_TEXT_LIGHT } from "../components/common";
import { TestimonialCarousel } from "../components/TestimonialCarousel";

export function Portfolio({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1615458508880-ec0521ce754f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8Y3JlYXRpdmUlMjBwaG90b2dyYXBoeSUyMHN0dWRpbyUyMHBvcnRmb2xpbyUyMGRpc3BsYXl8ZW58MXwwfHx8MTc5NTUyMzM5NXww&ixlib=rb-4.1.0&q=80&w=1080&credit=hcdigital"
            alt="Orvix Frame Media portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,16,154,0.25),transparent_60%)]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <span
            className="inline-block mb-5 text-[11px] uppercase tracking-[0.25em] text-white/70"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Portfolio · Selected Work
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 bg-gradient-to-b from-white via-[#e9f1ff] to-[#a9c8f6] bg-clip-text text-transparent"
            style={DISPLAY}
          >
            We make the invisible visible
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            A curated selection of our favorite projects across industries and continents.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Explore by Category" subtitle="Filter the gallery to see what you love." />
          <Gallery initialFilter="all" />
        </div>
      </section>

      <TestimonialCarousel />

      <CTA
        title="Ready for your next project?"
        subtitle="Let's capture your story in a way that moves people."
        buttonText="Start a Project"
        buttonHref="/contact"
      />
    </div>
  );
}
