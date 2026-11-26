import { useState } from "react";
import { Play, X } from "lucide-react";
import { SectionHeading, CTA, DISPLAY, HERO_TEXT_LIGHT } from "../components/common";
import { SOCIAL_MEDIA_VIDEO_ID } from "../data";

const VIDEOS = [
  {
    id: "social-media",
    title: "Social Media Basics — Beginner's Guide",
    thumbnail: `https://img.youtube.com/vi/${SOCIAL_MEDIA_VIDEO_ID}/hqdefault.jpg`,
    youtubeId: SOCIAL_MEDIA_VIDEO_ID,
  },
];

interface VideoPageParams {
  type: string;
}

export function VideoPage({ params }: { onNavigate: (href: string) => void; params: VideoPageParams }) {
  const [open, setOpen] = useState<(typeof VIDEOS)[number] | null>(null);

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
            Watch our beginner-friendly guide to social media.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Social Media Guide" subtitle="Select the video to start watching." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((v) => (
              <div
                key={v.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer"
                onClick={() => setOpen(v)}
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
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${open.youtubeId}?autoplay=1&mute=1&rel=0`}
                title={open.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
