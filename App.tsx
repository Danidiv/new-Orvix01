import { useState, useEffect, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import { Header } from "./src/components/Header";
import { Footer } from "./src/components/Footer";
import { WhatsAppButton } from "./src/components/WhatsAppButton";
import { ScrollToTop } from "./src/components/ScrollToTop";
import { Home } from "./src/pages/Home";
import { About } from "./src/pages/About";
import { Marketing } from "./src/pages/Marketing";
import { ServicePage } from "./src/pages/ServicePage";
import { Productions } from "./src/pages/Productions";
import { Portfolio } from "./src/pages/Portfolio";
import { CategoryPage } from "./src/pages/CategoryPage";
import { VideoPage } from "./src/pages/VideoPage";
import { Testimonials } from "./src/pages/Testimonials";
import { Contact } from "./src/pages/Contact";
import { NotFound } from "./src/pages/NotFound";

const ROUTES: Record<string, React.ComponentType<any>> = {
  "/": Home,
  "/about": About,
  "/marketing": Marketing,
  "/productions": Productions,
  "/portfolio": Portfolio,
  "/contact": Contact,
  "/testimonials": Testimonials,
};

const SERVICE_KEYS = [
  "social-media-marketing",
  "social-media-management",
  "branding",
  "ppc",
  "graphic-design",
  "website-development",
];

const VIDEO_KEYS = ["wedding-video", "food-video", "real-estate-video"];

function resolvePage(path: string): React.ComponentType<any> {
  if (ROUTES[path]) return ROUTES[path];

  const segments = path.split("/").filter(Boolean);
  const first = segments[0] || "";

  if (SERVICE_KEYS.indexOf(first) >= 0) {
    return (props: any) => <ServicePage {...props} params={{ key: first }} />;
  }

  if (first === "portfolio" && segments[1]) {
    return (props: any) => <CategoryPage {...props} params={{ key: segments[1] }} />;
  }

  if (VIDEO_KEYS.indexOf(first) >= 0) {
    return (props: any) => <VideoPage {...props} params={{ type: first.replace("-video", "") }} />;
  }

  return NotFound;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("orvix-theme");
    const pref = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const root = document.documentElement;
    const isDark = pref === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : pref === "dark";
    root.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onNavigate = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onNavigate);
    return () => window.removeEventListener("popstate", onNavigate);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  const Page = resolvePage(path);

  useEffect(() => {
    if (!mounted) return;
    document.title = "Orvix Frame Media — Creativity, strategy, and impact";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "Orvix Frame Media — a full-service creative agency for social media marketing, branding, and video production.");
  }, [path, mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-[#1f4fa8]"
      />
      <WhatsAppButton />
      <ScrollToTop />
      <Header onNavigate={navigate} path={path} />
      <main>
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Page onNavigate={navigate} />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
