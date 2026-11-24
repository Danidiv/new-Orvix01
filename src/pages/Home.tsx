import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading, ServiceCard, StatCounter, CTA, DISPLAY, HERO_TEXT_DARK, HERO_TEXT_LIGHT } from "../components/common";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { SERVICES, SITE, STATS, WHY_ORVIX } from "../data";

const MARQUEE_WORDS = [
  "Social Strategy",
  "Brand Films",
  "Content Design",
  "Paid Social",
  "Photography",
  "Web Design",
];

const HeroHeading = ({ children }: { children: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6"
      style={DISPLAY}
    >
      {words.map((word, i) => (
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
  );
};

export function Home({ onNavigate }: { onNavigate: (href: string) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const navLink = (href: string, label: string) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      className="inline-flex items-center gap-1 text-[#1f4fa8] text-sm font-semibold hover:underline"
    >
      {label} <ArrowRight className="w-3 h-3" />
    </a>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-slate-950"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ scale: heroScale, y: heroY }}
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8Y3JlYXRpdmUlMjBhZ2VuY3klMjBzdHVkaW8lMjB0ZWFtJTIwd29ya2luZ3xlbnwxfDB8fHwxNzk1NTIwMDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&credit=anniespratt"
            alt="Orvix Frame Media creative team at work in the studio"
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
                Creative studio · {SITE.city}
              </motion.div>

              <HeroHeading>Grow your social media audience faster</HeroHeading>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed"
              >
                At Orvix Frame Media, we turn strategy into results with bold content, smart targeting, and consistent
                performance.
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
                  <span className="relative z-10">Get Started</span>
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
                <p
                  className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-6"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  By the numbers
                </p>
                <div className="space-y-5">
                  {STATS.slice(0, 3).map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4">
                      <span
                        className="text-3xl font-bold text-white"
                        style={DISPLAY}
                      >
                        {s.value}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-white/55 text-right">{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                  <span
                    className="text-[11px] uppercase tracking-[0.25em] text-white/60"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
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
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
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

      <section className="py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8Y3JlYXRpdmUlMjBzdHJhdGVneSUyMG1lZXRpbmclMjB0ZWFtfGVufDF8MHx8fDE3OTU0Njg5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&credit=mainermedia"
              alt="Strategy session"
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 space-y-8"
          >
            <SectionHeading
              title="The future of social media marketing is here"
              subtitle="Strategy-led content that builds communities and drives sales."
            />
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We combine creative storytelling with data-driven targeting to help your brand stand out on every
              platform. From the first post to the last click, we handle it all.
            </p>
            {navLink("/about", "Learn more about us")}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="All-in-one social media solution" subtitle="Everything your brand needs to grow online." />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.key}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceCard service={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${HERO_TEXT_LIGHT}`}
              style={DISPLAY}
            >
              Why Orvix Frame Media is trusted by {SITE.city}'s fastest-growing brands
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <StatCounter label={s.label} value={s.value} />
              </motion.div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {WHY_ORVIX.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{w.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{w.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <CTA
        title="Let's boost your social media"
        subtitle="Book a free discovery call and we will show you how we can grow your brand online."
        buttonText="Get a Free Quote"
        buttonHref="/contact"
      />
    </div>
  );
}
