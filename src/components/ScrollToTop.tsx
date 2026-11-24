import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;
  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-20 right-4 z-50 w-10 h-10 rounded-full bg-[#1f4fa8] text-white flex items-center justify-center shadow-lg hover:bg-[#1b2a6b] transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
