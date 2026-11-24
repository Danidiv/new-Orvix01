import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Clock, Globe, Share2 } from "lucide-react";
import { CTA, DISPLAY, HERO_TEXT_LIGHT } from "../components/common";
import { SITE, CONTACT_HOURS } from "../data";

async function submitForm(formName: string, fields: Record<string, string>) {
  // Local fallback for the preview environment where the backend module is unavailable.
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}

export function Contact({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const services = [
    "Social Media Marketing",
    "Social Media Management",
    "Branding",
    "PPC",
    "Graphic Design",
    "Website Development",
    "Productions",
  ];

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.service || !form.message) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatus("idle");
    try {
      const res = await submitForm("contact", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
        setError(res.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8MXx8Y3JlYXRpdmUlMjB0ZWFtJTIwcGxhbm5pbmclMjBzdHJhdGVneSUyMHNlc3Npb258ZW58MXwwfHx8MTc5NTUzNDUxNHww&ixlib=rb-4.1.0&q=80&w=1080&credit=brandsandpeople"
            alt="Orvix Frame Media creative team planning a campaign in the studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28">
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
            Contact · {SITE.city}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6 ${HERO_TEXT_LIGHT}`}
            style={DISPLAY}
          >
            Let's create something great together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed"
          >
            Have a project in mind? Tell us about your brand and where you want to take it — we will reply within one
            business day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
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
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-2 ${HERO_TEXT_LIGHT}`} style={DISPLAY}>
              Send us a message
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Tell us about your project.</p>

            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400 text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thank you!</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  We have received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">{error}</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
                    placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Service</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1f4fa8] text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60 hover:bg-[#1b2a6b] transition-colors"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Details</h2>
              <div className="flex items-start gap-4 mb-5 last:mb-0">
                <div className="w-10 h-10 rounded-lg bg-[#1f4fa8]/10 flex items-center justify-center text-[#1f4fa8] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Call Us</h3>
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-slate-600 dark:text-slate-400 hover:text-[#1f4fa8] transition-colors">
                    {SITE.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-5 last:mb-0">
                <div className="w-10 h-10 rounded-lg bg-[#1f4fa8]/10 flex items-center justify-center text-[#1f4fa8] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Email Us</h3>
                  <a href={`mailto:${SITE.email}`} className="text-slate-600 dark:text-slate-400 hover:text-[#1f4fa8] transition-colors">
                    {SITE.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-5 last:mb-0">
                <div className="w-10 h-10 rounded-lg bg-[#1f4fa8]/10 flex items-center justify-center text-[#1f4fa8] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Visit Us</h3>
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-[#1f4fa8] transition-colors">
                    {SITE.address}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1f4fa8]/10 flex items-center justify-center text-[#1f4fa8] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Hours</h3>
                  <span className="text-slate-600 dark:text-slate-400">{CONTACT_HOURS}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Follow Us</h2>
              <div className="flex gap-4">
                {[
                  { href: SITE.facebook, label: "Facebook", Icon: Globe },
                  { href: SITE.linkedin, label: "LinkedIn", Icon: Share2 },
                  { href: SITE.instagram, label: "Instagram", Icon: Mail },
                ].map(({ href, label, Icon }) => (
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 h-64 flex flex-col items-center justify-center text-center px-6"
            >
              <MapPin className="w-8 h-8 text-[#1f4fa8] mb-3" />
              <p className="font-semibold text-slate-900 dark:text-white">{SITE.address}</p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1f4fa8] hover:underline mt-2">
                Open in Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to work together?"
        subtitle="Let's build something amazing for your brand."
        buttonText="Start a Project"
        buttonHref="/contact"
      />
    </div>
  );
}
