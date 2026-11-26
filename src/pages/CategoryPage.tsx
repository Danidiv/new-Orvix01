import { Gallery } from "../components/Gallery";
import { CTA, DISPLAY, HERO_TEXT_LIGHT } from "../components/common";
import { PORTFOLIO_IMAGES } from "../data";

const CATEGORY_INFO: Record<string, { title: string; subtitle: string }> = {
  all: { title: "All Work", subtitle: "A curated collection of our favourite projects." },
  wedding: { title: "Weddings", subtitle: "Timeless moments, captured with love and elegance." },
  food: { title: "Food", subtitle: "Appetizing photography that makes mouths water." },
  "real-estate": { title: "Real Estate", subtitle: "Properties that shine, listings that sell." },
  product: { title: "Product", subtitle: "Clean, commercial shots for your brand." },
  corporate: { title: "Corporate Event", subtitle: "Professional imagery for modern businesses and corporate events." },
  yacht: { title: "Yacht", subtitle: "Luxury on the water, framed perfectly." },
  tourism: { title: "Tourism", subtitle: "Destinations that inspire wanderlust." },
  birthday: { title: "Birthday", subtitle: "Joyful celebrations worth remembering." },
  maternity: { title: "Maternity", subtitle: "Gentle portraits of new beginnings." },
  videography: { title: "Videography", subtitle: "Films and guides that bring your brand story to life." },
};

interface CategoryPageParams {
  key: string;
}

export function CategoryPage({ params }: { onNavigate: (href: string) => void; params: CategoryPageParams }) {
  const info = CATEGORY_INFO[params.key] || { title: "Gallery", subtitle: "A curated collection of our work." };
  const count = params.key === "all" ? PORTFOLIO_IMAGES.length : PORTFOLIO_IMAGES.filter((i) => i.category === params.key).length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1
            className={`text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 ${HERO_TEXT_LIGHT}`}
            style={DISPLAY}
          >
            {info.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">{info.subtitle}</p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mt-6">{count} projects</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Gallery initialFilter={params.key} />
        </div>
      </section>

      <CTA
        title="Like what you see?"
        subtitle="Book your own photoshoot or video production today."
        buttonText="Get a Quote"
        buttonHref="/contact"
      />
    </div>
  );
}
