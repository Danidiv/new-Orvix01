import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Camera, Heart, Compass } from "lucide-react";
import { SectionHeading, CTA, StatCounter, DISPLAY, HERO_TEXT_DARK, HERO_TEXT_LIGHT } from "../components/common";
import { SITE, TEAM, STATS } from "../data";

export function About({ onNavigate }: { onNavigate: (href: string) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const sideImgY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

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
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8dGVhbSUyYGNvbGxhYm9yYXRpb24lMjBzdHVkaW98ZW58MXwwfHx8MTc5NTI3ODA4M3ww&ixlib=rb-4.1.0&q=80&w=1600&credit=annie"
            alt="Orvix Frame Media creative team collaborating in the studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,79,168,0.22),transparent_60%)]" />
        </div>

        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[10%] w-64 h-64 rounded-full bg-[#1f4fa8]/20 blur-3xl pointer-events-none"
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
                About us · {SITE.city}
              </motion.div>

              <motion.h1
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6"
                style={DISPLAY}
              >
                {"The future of social media marketing is here".split(" ").map((word, i) => (
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
                Bold ideas, smart strategies, and real impact. That's how we help brands grow.
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
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-7 py-3.5 rounded-full font-semibold hover:bg-[#1f4fa8] hover:text-white transition-colors group"
                >
                  Start a project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                className="relative"
              >
                <motion.img
                  style={{ y: sideImgY }}
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8Y3JlYXRpdmUlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfDB8fHwxNzk1Mjc4MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&credit=fauxels"
                  alt="Creative team meeting"
                  className="w-full h-[420px] object-cover rounded-3xl border border-white/15 shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-5 shadow-2xl">
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Est. 2017
                  </p>
                  <p className="text-2xl font-bold text-white" style={DISPLAY}>
                    8+ years
                  </p>
                  <p className="text-xs text-white/60 mt-1">of creative impact</p>
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

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8YnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfDB8fHwxNzk1Mjc4MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&credit=cytonn"
              alt="Business team collaborating"
              className="w-full h-[420px] object-cover rounded-2xl shadow-2xl"
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8Y3JlYXRpdmUlMjBzdHVkaW8lMjBvZmZpY2V8ZW58MXwwfHx8MTc5NTI3ODA4NHww&ixlib=rb-4.1.0&q=80&w=1080&credit=leeclark"
              alt="Orvix studio interior"
              className="hidden sm:block absolute -bottom-10 -right-6 w-48 h-48 object-cover rounded-2xl border-4 border-white dark:border-slate-950 shadow-xl"
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
              title="Bold ideas. Smart strategies. Real impact."
              subtitle="A full-service creative agency built for brands that want to stand out."
            />
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We are a full-service creative agency built for brands that want to stand out. From social strategy to
              production, we handle every detail with precision and creativity.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Content. Community. Conversions. All in one place.
            </p>
            {navLink("/contact", "Start a project")}
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <StatCounter key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Vision & Mission" subtitle="What drives us every day." />
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <Compass className="w-8 h-8 text-[#1f4fa8] mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To be the most trusted creative partner for ambitious brands, helping them tell stories that matter and
                build communities that last.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <Sparkles className="w-8 h-8 text-[#1f4fa8] mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To deliver bold content, smart strategy, and measurable impact—every campaign, every platform, every
                client.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/3 w-full"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8YnVzaW5lc3N3b21hbiUyMHBvcnRydGFpdGVufDF8MHx8fDE3OTUyNzgwODR8MA&ixlib=rb-4.1.0&q=80&w=1080&credit=christina"
                alt="Founder of Orvix Frame Media"
                className="w-full h-[420px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
            <div className="lg:w-2/3 space-y-6">
              <h2
                className={`text-3xl font-bold tracking-tight ${HERO_TEXT_LIGHT}`}
                style={DISPLAY}
              >
                The Vision Behind the Brand
              </h2>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#1f4fa8]">"</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  We started Orvix Frame Media because great brands deserve great stories. Every pixel, every frame,
                  every post is an opportunity to connect.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{SITE.founder}, Founder & CEO</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Orvix Frame Media</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Meet the Team" subtitle="The people behind your success." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#1f4fa8]/20"
                />
                <h3 className="font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{member.role}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="What we believe" subtitle="The principles behind every frame we create." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                Icon: Camera,
                title: "Craft over shortcuts",
                text: "Every image, edit, and line of copy is made with care—never rushed, never generic.",
                img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8cGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8MHx8fDE3OTUyNzgwODV8MA&ixlib=rb-4.1.0&q=80&w=1080&credit=jakobowens1",
              },
              {
                Icon: Heart,
                title: "Partners, not vendors",
                text: "We treat your brand like our own and stay close from the first call to the final delivery.",
                img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8dGVhbSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXwwfHx8MTc5NTI3ODA4NXww&ixlib=rb-4.1.0&q=80&w=1080&credit=anistock",
              },
              {
                Icon: Sparkles,
                title: "Results that show",
                text: "Beautiful work is only half the job. We measure, report, and improve until it performs.",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8YW5hbGl0aWNzJTIwZGFzaGJvYXJkfGVufDF8MHx8fDE3OTUyNzgwODV8MA&ixlib=rb-4.1.0&q=80&w=1080&credit=lukechesser",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <v.Icon className="w-6 h-6 text-[#1f4fa8] mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to work together?"
        subtitle="Let's build something amazing for your brand."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </div>
  );
}
