import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, Globe, Share2, Mail } from "lucide-react";
import { SITE } from "../data";

/** Premium display serif used for every title across the site. */
export const DISPLAY = { fontFamily: "'Fraunces', serif" } as const;

/** Gradient title treatment for dark / photo backgrounds. */
export const HERO_TEXT_DARK =
  "bg-gradient-to-b from-white via-[#e9f1ff] to-[#a9c8f6] bg-clip-text text-transparent";

/** Gradient title treatment for light backgrounds. */
export const HERO_TEXT_LIGHT =
  "bg-gradient-to-b from-[#16255c] via-[#1f4fa8] to-[#5b93e0] bg-clip-text text-transparent";

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1f4fa8]/10 text-[#1f4fa8] border border-[#1f4fa8]/20">
        Orvix Frame Media
      </span>
      <h2
        className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${HERO_TEXT_LIGHT}`}
        style={DISPLAY}
      >
        {title}
      </h2>
      {subtitle && <p className="text-slate-600 dark:text-slate-400 text-lg">{subtitle}</p>}
    </motion.div>
  );
}

export function ServiceCard({ service }: { service: any }) {
  return (
    <a
      href={`/${service.key}`}
      className="group block p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#1f4fa8]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-[#1f4fa8]/10 flex items-center justify-center mb-4 group-hover:bg-[#1f4fa8] transition-colors">
        <span className="text-[#1f4fa8] group-hover:text-white font-bold text-lg">{service.title.charAt(0)}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{service.subtitle}</p>
      <div className="flex items-center gap-1 text-[#1f4fa8] text-xs font-semibold">
        Learn more <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </div>
    </a>
  );
}

export function StatCounter({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [seen, target]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
        style={DISPLAY}
      >
        {n}
        {suffix}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-slate-900 dark:text-white font-medium">{item.q}</span>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
            </button>
            {isOpen && <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

export function CTA({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}) {
  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <h2
          className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${HERO_TEXT_LIGHT}`}
          style={DISPLAY}
        >
          {title}
        </h2>
        {subtitle && <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">{subtitle}</p>}
        <a
          href={buttonHref}
          className="inline-block bg-[#1f4fa8] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b2a6b] transition-colors"
        >
          {buttonText}
        </a>
      </motion.div>
    </section>
  );
}

export function SocialLinks({ desktop = false }: { desktop?: boolean }) {
  const items = [
    { href: SITE.facebook, label: "Facebook", Icon: Globe },
    { href: SITE.linkedin, label: "LinkedIn", Icon: Share2 },
    { href: SITE.instagram, label: "Instagram", Icon: Mail },
  ];
  return (
    <div className={`flex flex-col gap-3 ${desktop ? "hidden md:flex" : "flex"}`}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#1f4fa8] transition-colors"
          aria-label={label}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
