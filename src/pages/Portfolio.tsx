import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Gallery } from "../components/Gallery";
import { SectionHeading, CTA, DISPLAY, HERO_TEXT_DARK, HERO_TEXT_LIGHT } from "../components/common";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from "../data";

const HERO_WORDS = "We make the invisible visible".split(" ");

const MARQUEE_WORDS = [
  "Weddings",
  "Corporate",
  "Food",
  "Real Estate",
  "Product",
  "Yacht",
  "Tourism",
  "Maternity",
  "Videography",
];

const FEATURED_KEYS = ["wedding", "corporate", "food", "real-estate"];

export function Portfolio({ onNavigate }: { onNavigate: (href: string) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const featured = FEATURED_KEYS.map((key) => {
    const img = PORTFOLIO_IMAGES.find((i) => i.category === key);
    const cat = PORTFOLIO_CATEGORIES.find((c) => c.key === key);
    return {
      key,
      label: cat ? cat.label : key,
      image: img ? img.image : "",
      count: PORTFOLIO_IMAGES.filter((i) => i.category === key).length,
    };
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ scale: heroScale, y: heroY }}
            src="/images/portfolio/wedding/IMG_1758.webp"
            alt="Orvix Frame Media portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/45 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,79,168,0.28),transparent_60%)]" />
        </div>

        <motion.div
          animate={{ y: [0, -28, 0], x: [0, 18, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[12%] w-64 h-64 rounded-full bg-[#1f4fa8]/20 blur-3xl pointer-events-none"
        />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 mb-8 text-[11px] uppercase tracking-[0.25em] text-white/70"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f4fa8] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1f4fa8]" />
            </span>
            Portfolio · Selected Work
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6 max-w-3xl"
            style={DISPLAY}
          >
            {HERO_WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0, y: 44, rotateX: -35 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block mr-2 ${HERO_TEXT_DARK}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-slate-300 max-w-xl leading-relaxed mb-10"
          >
            A curated selection of our favourite projects across industries and continents — weddings, brands, food and
            property, all shot in-house.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-6"
          >
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/contact");
              }}
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-7 py-3.5 rounded-full font-semibold hover:bg-[#1f4fa8] hover:text-white transition-colors group"
            >
              Start a project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/40 pb-1 hover:border-[#1f4fa8] hover:text-[#1f4fa8] transition-colors"
            >
              Browse the gallery <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-white/50"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-[#1f4fa8]">★★★★★</span>
            <span>{PORTFOLIO_IMAGES.length} projects</span>
            <span className="hidden sm:inline text-white/25">|</span>
            <span>{PORTFOLIO_CATEGORIES.length - 1} categories</span>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em] text-white/50"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Scroll
          </span>
          <span className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      <section className="py-8 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span
                key={i}
                className="flex items-center gap-12 text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 whitespace-nowrap"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {w}
                <span className="text-[#1f4fa8]">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Explore by Category" subtitle="Filter the gallery to see what you love." />
          <Gallery initialFilter="all" />
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Featured Collections" subtitle="Four of the stories we love telling most." />
          <div className="grid sm:grid-cols-2 gap-6">
            {featured.map((f, i) => (
              <motion.a
                key={f.key}
                href={`/portfolio/${f.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/portfolio/${f.key}`);
                }}
                initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
              >
                <img
                  src={f.image}
                  alt={f.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {f.count} projects
                    </p>
                    <h3 className="text-2xl font-bold text-white" style={DISPLAY}>
                      {f.label}
                    </h3>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white group-hover:bg-[#1f4fa8] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
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
