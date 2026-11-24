import { useState } from "react";
import { Play, X } from "lucide-react";
import { SectionHeading, CTA, DISPLAY, HERO_TEXT_LIGHT } from "../components/common";

const VIDEOS = [
  { id: "wedding", title: "Wedding Highlight Film", thumbnail: "https://images.unsplash.com/photo-1772634734722-631b6978a6e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8M3x8d2VkZGluZyUyMGNvdXBsZSUyMG91dGRvb3IlMjBwb3J0cmFpdHxlbnwxfDB8fHwxNzk1Mjc2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&credit=rafasanfilippo" },
  { id: "food", title: "Food & Restaurant Film", thumbnail: "https://images.unsplash.com/photo-1625861910621-e9385ba1d993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8M3x8cGxhdGVkJTIwZ291cm1ldCUyMGRpc2glMjByZXN0YXVyYW50fGVufDF8MHx8fDE3OTUyNzYxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&credit=madebyswish" },
  { id: "real-estate", title: "Luxury Property Tour", thumbnail: "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTA4NDkzfDB8MXxzZWFyY2h8Mnx8bW9kZXJuJTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDF8MHx8fDE3OTUyNzYxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&credit=pipcke" },
];

interface VideoPageParams {
  type: string;
}

export function VideoPage({ params }: { onNavigate: (href: string) => void; params: VideoPageParams }) {
  const [open, setOpen] = useState<string | null>(null);

  const videos = VIDEOS.filter((v) => params.type === "all" || v.id === params.type);
  const list = videos.length ? videos : VIDEOS;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1
            className={`text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 ${HERO_TEXT_LIGHT}`}
            style={DISPLAY}
          >
            Video Productions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Cinematic films for weddings, food brands, and real estate.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Watch Our Work" subtitle="Select a film to play." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((v) => (
              <div
                key={v.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer"
                onClick={() => setOpen(v.id)}
              >
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#E8109A] flex items-center justify-center text-white">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full rounded-xl bg-slate-800 flex flex-col items-center justify-center text-center px-6">
              <Play className="w-10 h-10 text-[#E8109A] mb-4" />
              <p className="text-white font-semibold">Showreel coming soon</p>
              <p className="text-slate-400 text-sm mt-2">
                Our full film library lives on Instagram — get in touch and we will send the private link.
              </p>
            </div>
            <button
              onClick={() => setOpen(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-[#E8109A] transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <CTA
        title="Need a video for your brand?"
        subtitle="From concept to final cut, we handle everything."
        buttonText="Get a Quote"
        buttonHref="/contact"
      />
    </div>
  );
}
