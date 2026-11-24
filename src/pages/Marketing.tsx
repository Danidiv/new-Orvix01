import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading, ServiceCard, CTA, FAQ, DISPLAY, HERO_TEXT_DARK, HERO_TEXT_LIGHT } from "../components/common";
import { SERVICES, MARKETING_LIST, FAQ_ITEMS, STATS, WHY_ORVIX, SITE } from "../data";

const MARQUEE_WORDS = [
  "Social Strategy",
  "Brand Films",
  "Content Design",
  "Paid Social",
  "Photography",
  "Web Design",
];

export function Marketing({ onNavigate }: { onNavigate: (href: string) => void }) {
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
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ scale: heroScale, y: heroY }}
            src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8c29jaWFsJTIwbWVkaWElMjBzdHJhdGVneSUyMHNlc3Npb258ZW58MXwwfHx8MTc5NTI3ODA4M3ww&ixlib=rb-4.1.0&q=80&w=1080&credit=merakist"
            alt="Marketing strategy session"
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
                Social media marketing · {SITE.city}
              </motion.div>

              <motion.h1
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6"
                style={DISPLAY}
              >
                {"We offer fully-managed social media services, for you.".split(" ").map((word, i) => (
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
                Strategy, content, community, and ads—all handled by experts who care about your growth.
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

      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://picsum.photos/seed/social-media-content-creation-flat-lay-0/800/600"
              alt="Marketing deliverables"
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <SectionHeading
              title="What We Offer in Social Media Marketing"
              subtitle="Strategy-led services built for real growth."
            />
            <ul className="space-y-4">
              {MARKETING_LIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#1f4fa8] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {navLink("/contact", "Get a Quote")}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Why Orvix Frame Media" subtitle="Trusted by Lisbon's fastest-growing brands." />
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
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{w.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
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
              Results that speak for themselves
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white" style={DISPLAY}>
                  {s.value}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know." />
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <CTA
        title="Ready to grow your social media?"
        subtitle="Book a free discovery call and let's talk about your goals."
        buttonText="Get a Quote"
        buttonHref="/contact"
      />
    </div>
  );
}
