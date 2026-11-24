import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Camera, Film } from "lucide-react";
import { SectionHeading, CTA, DISPLAY, HERO_TEXT_DARK, HERO_TEXT_LIGHT } from "../components/common";
import { PRODUCTION_SERVICES, SITE, STATS } from "../data";

const CATEGORY_TILES = [
  "https://images.unsplash.com/photo-1625415002553-f23e2d1c05a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8Mnx8d2VkZGluZyUyMGNvdXBsZSUyMG91dGRvb3IlMjBwb3J0cmFpdHxlbnwxfDB8fHwxNzk1Mjc2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&credit=anthonytran",
  "https://images.unsplash.com/photo-1621327017866-6fb07e6c96ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8Mnx8cGxhdGVkJTIwZ291cm1ldCUyMGRpc2glMjByZXN0YXVyYW50fGVufDF8MHx8fDE3OTUyNzYxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&credit=animavisual",
  "https://images.unsplash.com/photo-1582610116397-edb318620f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwdmlsbGElMjBleHRlcmlvciUyMHBvb2x8ZW58MXwwfHx8MTc5NTI3NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080&credit=bawva",
  "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8Mnx8ZXZlbnQlMjBnYWxhJTIwZXZlbmluZyUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXwwfHx8MTc5NTI3NjE5OHww&ixlib=rb-4.1.0&q=80&w=1080&credit=hamza01nsr",
];

export function Productions({ onNavigate }: { onNavigate: (href: string) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ scale: heroScale, y: heroY }}
            src="https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8ZmlsbSUyMHN0dWRpbyUyMGxpZ2h0cyUyMGNhbWVyYXxlbnwxfDB8fHwxNzk1Mjc4MDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&credit=brandsandpeople"
            alt="Orvix Frame Media production studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/65 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/45 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,79,168,0.22),transparent_60%)]" />
        </div>

        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[16%] right-[12%] w-64 h-64 rounded-full bg-[#1f4fa8]/20 blur-3xl -z-0 pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 mb-8 text-[11px] uppercase tracking-[0.25em] text-white/70"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f4fa8] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1f4fa8]" />
                </span>
                Productions · {SITE.city}
              </motion.div>

              <motion.h1
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6"
                style={DISPLAY}
              >
                {"Your One-Stop Creative Studio for Events, Food, Real Estate & More.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 40, rotateX: -30 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block mr-2 ${HERO_TEXT_DARK}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed"
              >
                Professional videography and photography that tells your story beautifully.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row sm:items-center gap-6"
              >
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/contact");
                  }}
                  onMouseEnter={() => setHoveredBtn("primary")}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="relative inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-7 py-3.5 rounded-full font-semibold hover:bg-[#1f4fa8] hover:text-white transition-colors overflow-hidden group"
                >
                  <span className="relative z-10">Get a Quote</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <motion.span
                    initial={{ x: "-100%" }}
                    animate={hoveredBtn === "primary" ? { x: "100%" } : { x: "-100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -z-0"
                  />
                </a>
                <a
                  href="/portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/portfolio");
                  }}
                  className="inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/40 pb-1 hover:border-[#1f4fa8] hover:text-[#1f4fa8] transition-colors"
                >
                  See our work <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-white/50"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-[#1f4fa8]">★★★★★</span>
                <span>4.9 / 5.0 rating</span>
                <span className="hidden sm:inline text-white/25">|</span>
                <span>120+ happy clients</span>
              </motion.div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-8 shadow-2xl"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  By the numbers
                </p>
                <div className="space-y-5">
                  {STATS.slice(0, 3).map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4">
                      <span className="text-3xl font-bold text-white" style={DISPLAY}>
                        {s.value}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-white/55 text-right">{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-white/60" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Est. 2017 · {SITE.city}
                  </span>
                  <span className="text-[#1f4fa8]">✦</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Scroll
          </span>
          <span className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Our Services" subtitle="Everything you need for your next production." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTION_SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#1f4fa8]/50 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1f4fa8]/10 flex items-center justify-center mb-4 group-hover:bg-[#1f4fa8] transition-colors">
                  {s.title === "Videography" ? (
                    <Film className="w-5 h-5 text-[#1f4fa8] group-hover:text-white" />
                  ) : (
                    <Camera className="w-5 h-5 text-[#1f4fa8] group-hover:text-white" />
                  )}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className={`text-3xl font-bold tracking-tight mb-6 ${HERO_TEXT_LIGHT}`} style={DISPLAY}>
                Categories
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Explore our portfolio by category. From weddings to real estate, we capture every moment with care.
              </p>
              <a
                href="/portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/portfolio");
                }}
                className="inline-flex items-center gap-1 text-[#1f4fa8] text-sm font-semibold hover:underline"
              >
                View full portfolio <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
              {CATEGORY_TILES.map((src, i) => (
                <div key={i} className="h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <img src={src} alt={`Portfolio category ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="We Are Social"
        subtitle="Follow us for behind-the-scenes content and latest work."
        buttonText="Follow on Instagram"
        buttonHref={SITE.instagram}
      />
    </div>
  );
}
