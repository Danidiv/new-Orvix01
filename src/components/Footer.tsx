import { Globe, Share2, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE } from "../data";

export function Footer() {
  const socials = [
    { href: SITE.facebook, label: "Facebook", Icon: Globe },
    { href: SITE.linkedin, label: "LinkedIn", Icon: Share2 },
    { href: SITE.instagram, label: "Instagram", Icon: Mail },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              Creativity, strategy, and impact – that's the ORVIX way. We help brands grow with bold content and smart
              strategy.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1f4fa8] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "Social Media Marketing",
                "Social Media Management",
                "Branding",
                "PPC",
                "Graphic Design",
                "Website Development",
                "Productions",
              ].map((s) => (
                <li key={s}>
                  <a href="/marketing" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1f4fa8] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-900 dark:text-white font-medium">{SITE.phone}</div>
                  <a
                    href={`https://wa.me/${SITE.phone.replace(/\D/g, "")}?text=Hi Orvix Frame Media, I'd like to know more`}
                    className="text-[#1f4fa8] hover:underline text-xs"
                  >
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-slate-900 dark:text-white font-medium hover:text-[#1f4fa8] transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 dark:text-white font-medium hover:text-[#1f4fa8] transition-colors"
                >
                  {SITE.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">© 2025 Orvix Frame Media. All rights reserved.</p>
          <div className="flex gap-4">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#1f4fa8] transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
