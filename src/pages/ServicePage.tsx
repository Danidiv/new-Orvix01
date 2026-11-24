import { motion } from "framer-motion";
import { SectionHeading, CTA, FAQ, DISPLAY, HERO_TEXT_LIGHT } from "../components/common";
import { SERVICES, SITE, PROCESS_STEPS } from "../data";

interface ServicePageParams {
  key: string;
}

const RECENT_WORK = [
  "https://picsum.photos/seed/brand-campaign-photo-shoot-0/800/600",
  "https://picsum.photos/seed/social-media-content-grid-design-0/800/600",
  "https://picsum.photos/seed/creative-studio-project-review-0/800/600",
];

export function ServicePage({ onNavigate, params }: { onNavigate: (href: string) => void; params: ServicePageParams }) {
  const service = SERVICES.find((s) => s.key === params.key);
  if (!service) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-50 dark:opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white to-white/70 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950/70" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1f4fa8]/10 text-[#1f4fa8] border border-[#1f4fa8]/20">
            {service.title}
          </span>
          <h1
            className={`text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 ${HERO_TEXT_LIGHT}`}
            style={DISPLAY}
          >
            {service.heroTitle}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">{service.heroSubtitle}</p>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/contact");
            }}
            className="inline-block bg-[#1f4fa8] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b2a6b] transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Facts!" subtitle="Why this service works for your brand." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1f4fa8]/10 flex items-center justify-center mx-auto mb-4 text-[#1f4fa8] font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{b}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="What We Offer" subtitle="Our core deliverables for this service." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offers.map((o, i) => (
              <motion.div
                key={o}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1f4fa8]/10 text-[#1f4fa8] flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{o}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Our Process" subtitle="From discovery to results." />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#1f4fa8] text-white flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {step.step}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Recent Work" subtitle="Examples of what we have built." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_WORK.map((src, i) => (
              <div
                key={i}
                className="relative h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group"
              >
                <img
                  src={src}
                  alt={`${service.title} project ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold">View project</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading title="Frequently Asked Questions" subtitle="Common questions about this service." />
          <FAQ items={service.faq} />
        </div>
      </section>

      <CTA
        title={`When you're ready to grow, ${SITE.city}'s top agency is ready to lead.`}
        subtitle="Book a free discovery call and let's talk about your goals."
        buttonText="Get a Quote"
        buttonHref="/contact"
      />
    </div>
  );
}
